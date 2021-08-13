import nock from 'nock';
import testRequest from 'supertest';
import { VISA_BASE_DOMAIN, VISA_CHARGE_URI } from './adapters/visa/visa.api';
import app from './app';
import { aValidRequest } from './controllers/charge/charge.validator.spec';
import { CardCompanies } from './domain';
import Chance from 'chance'

const random = new Chance();

describe('e2e', () => {
  beforeEach(() => nock.cleanAll())

  it('should charge a card',(done) => {
    const request = aValidRequest();
    request.creditCardCompany = CardCompanies.VISA;

    nock(VISA_BASE_DOMAIN, {
      reqheaders: {
        'identifier': 'foo'
      }
    })
       .post(VISA_CHARGE_URI)
       .reply(200, { chargeResult: 'Success' })
 
    testRequest(app)
      .post('/api/charge')
      .set('merchant-identifier', 'foo')
      .send(request)
      .expect(200, done)
  })

  it('should return error reasone', (done) => {
    const request = aValidRequest();
    request.creditCardCompany = CardCompanies.VISA;
    const resultReason = random.string();
    const identifier = random.name();

    nock(VISA_BASE_DOMAIN, {
      reqheaders: {
        'identifier': identifier
      }
    })
       .post(VISA_CHARGE_URI)
       .reply(200, { chargeResult: 'Failure', resultReason })

    testRequest(app)
       .post('/api/charge')
       .set('merchant-identifier', identifier)
       .send(request)
       .expect(200)
       .expect(JSON.stringify({error: resultReason}), done)
  })

  it('should count error reasons', done => {
    const request = aValidRequest();
    request.creditCardCompany = CardCompanies.VISA;
    const resultReason = random.string();
    const identifier = random.name();

    nock(VISA_BASE_DOMAIN, {
      reqheaders: {
        'identifier': identifier
      }
    })
       .post(VISA_CHARGE_URI)
       .reply(200, { chargeResult: 'Failure', resultReason })

    const agent = testRequest(app);
    agent.post('/api/charge')
      .set('merchant-identifier', identifier)
      .send(request)
      .end(() => 
        agent.get('/api/chargeStatuses')
          .set('merchant-identifier', identifier)
          .send()
          .expect(200)
          .expect([{reason: resultReason, count: 1}], done)
      );
  })
})