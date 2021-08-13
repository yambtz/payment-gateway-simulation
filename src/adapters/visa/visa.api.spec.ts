import nock from 'nock';
import { aValidRequest } from '../../controllers/charge/charge.validator.spec';
import { VISA_CHARGE_URI, VISA_BASE_DOMAIN, ChargeVisa } from './visa.api';
import { chargeRequestToVisaChargeRequest } from './visa.domain';
import Chance from 'chance'
import axios from 'axios';

const random = new Chance();

const axiosClient = axios.create();

describe("Visa API", () => {
  beforeEach(() => nock.cleanAll())

  it('should charge with Visa', async () => {
    const chargeRequest = aValidRequest();
    const merchantIdentifier = random.first()
    const visaRequest = chargeRequestToVisaChargeRequest(chargeRequest);

   nock(VISA_BASE_DOMAIN, {
     reqheaders: {
       'identifier': merchantIdentifier
     }
   })
      .post(VISA_CHARGE_URI, {...visaRequest})
      .reply(200, { chargeResult: 'Success' })

    const resp = await ChargeVisa({chargeRequest, merchantIdentifier}, axiosClient);
    expect(resp.success).toBe(true)
  })

  it('should handle charge failure', async () => {
    const chargeRequest = aValidRequest();
    const resultReason = random.sentence();
    const merchantIdentifier = random.first()
    const visaRequest = chargeRequestToVisaChargeRequest(chargeRequest);

    nock(VISA_BASE_DOMAIN)
      .post(VISA_CHARGE_URI, {...visaRequest})
      .reply(200, { chargeResult: 'Failure', resultReason })

    const resp = await ChargeVisa({chargeRequest, merchantIdentifier}, axiosClient);
    expect(resp.success).toBe(false)
    expect(resp.error).toBe(resultReason)
  })
})

