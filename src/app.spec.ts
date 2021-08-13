import nock from 'nock';
import testRequest from 'supertest';
import { VISA_BASE_DOMAIN, VISA_CHARGE_URI } from './adapters/visa/visa.api';
import app from './app';
import { aValidRequest } from './controllers/charge/charge.validator.spec';
import { CardCompanies } from './domain';

describe('e2e', () => {
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
})