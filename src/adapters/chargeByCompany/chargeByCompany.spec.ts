import * as VisaApi from '../visa/visa.api'
import * as MastercardApi from '../mastercard/mastercard.api'
import { aValidRequest } from '../../controllers/charge/charge.validator.spec'
import { CardCompanies } from '../../domain'
import { chargeByCompany } from './chargeByCompany'

describe('chargeByCompany', () => {
  it('should call Visa', async () => {
    const chargeRequest = aValidRequest();
    chargeRequest.creditCardCompany = CardCompanies.VISA;

    const visaSpy = jest.spyOn(VisaApi, 'ChargeVisa').mockResolvedValue({success: true});

    await chargeByCompany({chargeRequest, merchantIdentifier: 'foo'})

    expect(visaSpy).toHaveBeenCalled();
  })

  it('should call MasterCard', async () => {
    const chargeRequest = aValidRequest();
    chargeRequest.creditCardCompany = CardCompanies.MASTERCARD;

    const mcSpy = jest.spyOn(MastercardApi, 'ChargeMasterCard').mockResolvedValue({success: true});

    await chargeByCompany({chargeRequest, merchantIdentifier: 'foo'})

    expect(mcSpy).toHaveBeenCalled();
  })
})