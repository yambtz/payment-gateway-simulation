import { ChargeRequest } from "../../domain";

export interface VisaChargeRequest {
  fullName: string;
  number: string;
  expiration: string;
  cvv: string;
  totalAmount: number;
}

export interface VisaChargeResponse {
  chargeResult: 'Success' | 'Failure';
  resultReason: string;
}

export const chargeRequestToVisaChargeRequest = ({fullName, creditCardNumber, expirationDate, cvv, amount}: ChargeRequest): VisaChargeRequest => {
  return {fullName,
  number: creditCardNumber,
  expiration: expirationDate,
  cvv,
  totalAmount: amount
  }
}
