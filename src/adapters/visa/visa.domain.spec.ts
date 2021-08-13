import { aValidRequest } from "../../controllers/charge/charge.validator.spec"
import { chargeRequestToVisaChargeRequest } from "./visa.domain";

describe ('VISA api domain', () => {
  it('should convert ChargeRequest to visa API', () => {
    const request = aValidRequest();

    expect(chargeRequestToVisaChargeRequest(request)).toEqual({
      fullName: request.fullName,
      number: request.creditCardNumber,
      expiration: request.expirationDate,
      cvv: request.cvv,
      totalAmount: request.amount
    })
  })
})