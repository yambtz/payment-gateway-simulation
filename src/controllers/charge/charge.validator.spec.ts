import Chance from 'chance';
import { CardCompanies, ChargeRequest } from "../../domain";
import { isValidChargeRequestBody } from "./charge.validator";

const random = new Chance();

export const aValidRequest = (): ChargeRequest => ({
  fullName: random.name(),
  creditCardNumber: random.cc({type: random.pickone(['Mastercard', 'Visa'])}),
  creditCardCompany: random.pickone([CardCompanies.VISA, CardCompanies.MASTERCARD]),
  expirationDate: '12/12',
  cvv: random.string({numeric: true, length: 3}),
  amount: random.floating()
})

describe('charge request validator', () => {

  describe('fullName', () => {
    it('should fail if fullName is not a string', () => {
      const request = aValidRequest();
      request.fullName = random.pickone([123, null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  
    it('should fail if fullName is missing', () => {
      const request = aValidRequest();
      delete request.fullName

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  describe('creditCardNumber', () => {
    it('should fail if card number is not a string', () => {
      const request = aValidRequest();
      request.creditCardNumber = random.pickone([123, null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if card number is missing', () => {
      const request = aValidRequest();
      delete request.creditCardNumber;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  describe('creditCardCompany', () => {
    it('should fail if card company is not a visa or mastercard', () => {
      const request = aValidRequest();
      request.creditCardCompany = random.string() as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if card company is not a string', () => {
      const request = aValidRequest();
      request.creditCardCompany = random.pickone([123, null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if card company is missing', () => {
      const request = aValidRequest();
      delete request.creditCardCompany;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  describe('expirationDate', () => {
    it('should fail if expiration date is not a string', () => {
      const request = aValidRequest();
      request.expirationDate = random.pickone([123, null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if date os out of range', () => {
      const request = aValidRequest();
      request.expirationDate = '13/24'

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if format is invalid', () => {
      const request = aValidRequest();
      request.expirationDate = random.string();

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if expiration date is missing', () => {
      const request = aValidRequest();
      delete request.expirationDate;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  describe('cvv', () => {
    it('should fail if cvv is not a string', () => {
      const request = aValidRequest();
      request.cvv = random.pickone([123, null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if cvv is missing', () => {
      const request = aValidRequest();
      delete request.cvv;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  describe('amount', () => {
    it('should fail if amount is not a number', () => {
      const request = aValidRequest();
      request.amount = random.pickone(['123', null, true]) as any;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })

    it('should fail if amount is missing', () => {
      const request = aValidRequest();
      delete request.amount;

      expect(isValidChargeRequestBody(request)).toBe(false)
    })
  })

  it('should pass for valid request', () => {
    const request = aValidRequest();
    expect(isValidChargeRequestBody(request)).toBe(true)
  })
})