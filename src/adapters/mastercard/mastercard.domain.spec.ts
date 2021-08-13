import { aValidRequest } from "../../controllers/charge/charge.validator.spec"
import { chargeRequestToMasterCardChargeRequest } from "./mastercard.domain";
import Chance from 'chance';

const random = new Chance();

describe ('VISA api domain', () => {
  it('should convert ChargeRequest to visa API', () => {
    const request = aValidRequest();
    const first_name = random.first()
    const last_name = random.last();
    request.fullName = `${first_name} ${last_name}`

    expect(chargeRequestToMasterCardChargeRequest(request)).toEqual({
      first_name,
      last_name,
      card_number: request.creditCardNumber,
      expiration: request.expirationDate,
      cvv: request.cvv,
      charge_amount: request.amount
    })
  })
})