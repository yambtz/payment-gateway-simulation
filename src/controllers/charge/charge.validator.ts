import { Request } from 'express';
import { ChargeRequest } from "../../domain";

export const isValidChargeRequest  = (request: Request): boolean => {
  const merchantIdentifier = request.header('merchant-identifier');
  return (
    merchantIdentifier
    && isValidChargeRequestBody(request.body))
}

export const isValidChargeRequestBody = (body: any): body is ChargeRequest => {
  return (
    typeof body.fullName === "string"
    && typeof body.creditCardNumber === 'string'
    && isValidCardNumber(body.creditCardNumber)
    && ['visa', 'mastercard'].includes(body.creditCardCompany)
    && isValidExpirationDate(body?.expirationDate)
    && typeof body.cvv === 'string'
    && typeof body.amount === "number"
    );
}

export const isValidExpirationDate = (expirationDate: string): boolean =>  {
  return /^(((0)[0-9])|((1)[0-2]))(\/)\d{2}$/.test(expirationDate)
}

export const isValidCardNumber = (creditCardNumber: string): boolean =>  {
  return /^[0-9]{16,19}$/.test(creditCardNumber)
}