import nock from 'nock';
import { aValidRequest } from '../../controllers/charge/charge.validator.spec';
import { MASTERCARD_CHARGE_URI, MASTERCARD_BASE_DOMAIN, ChargeMasterCard } from './mastercard.api';
import { chargeRequestToMasterCardChargeRequest } from './mastercard.domain';
import Chance from 'chance';
import axios from 'axios';

const random = new Chance();

const axiosClient = axios.create();

describe("MasterCard API", () => {
  beforeEach(() => nock.cleanAll())

  it('should charge with MasterCard', async () => {
    const chargeRequest = aValidRequest();
    const merchantIdentifier = random.first()
    const mcRequest = chargeRequestToMasterCardChargeRequest(chargeRequest);

   nock(MASTERCARD_BASE_DOMAIN, {
     reqheaders: {
       'identifier': merchantIdentifier
     }
   })
      .post(MASTERCARD_CHARGE_URI, {...mcRequest})
      .reply(200)

    const resp = await ChargeMasterCard({chargeRequest, merchantIdentifier}, axiosClient);
    expect(resp.success).toBe(true)
  })

  it('should handle charge failure', async () => {
    const chargeRequest = aValidRequest();
    const decline_reason = random.sentence();
    const merchantIdentifier = random.first()
    const mcRequest = chargeRequestToMasterCardChargeRequest(chargeRequest);

    nock(MASTERCARD_BASE_DOMAIN)
      .post(MASTERCARD_CHARGE_URI, {...mcRequest})
      .reply(400, { decline_reason })

    const resp = await ChargeMasterCard({chargeRequest, merchantIdentifier}, axiosClient);
    expect(resp.success).toBe(false)
    expect(resp.error).toBe(decline_reason)
  })

  it('should throw if unknown error', async () => {
    const chargeRequest = aValidRequest();
    const merchantIdentifier = random.first()
    const mcRequest = chargeRequestToMasterCardChargeRequest(chargeRequest);

    const scope = nock(MASTERCARD_BASE_DOMAIN)
      .post(MASTERCARD_CHARGE_URI, {...mcRequest})
      .reply(500)

    expect(ChargeMasterCard({chargeRequest, merchantIdentifier}, axiosClient)).rejects.toThrow();
  })
})

