import { ChargeRequest } from "../../domain";

export interface MasterCardChargeRequest {
  first_name: string;
  last_name: string;
  card_number: string;
  expiration: string;
  cvv: string;
  charge_amount: number;
}

export interface MasterCardChargeResponse {
  decline_reason: string;
}

export const chargeRequestToMasterCardChargeRequest = ({fullName, creditCardNumber, expirationDate, cvv, amount}: ChargeRequest): MasterCardChargeRequest => {
  const nameParts = fullName.split(' ')
  return {
    first_name: nameParts.slice(0, -1).join(' '),
    last_name: nameParts[nameParts.length -1],
    card_number: creditCardNumber,
    expiration: expirationDate,
    cvv,
    charge_amount: amount
  }
}
