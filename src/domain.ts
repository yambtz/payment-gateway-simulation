
export enum CardCompanies {
  VISA = 'visa',
  MASTERCARD = 'mastercard'
}

export interface ChargeRequest {
  fullName: string;
  creditCardNumber: string;
  creditCardCompany: CardCompanies;
  expirationDate: string;
  cvv: string;
  amount: number;
}

export interface ChargeResponse {
  success: boolean;
  error?: string;  
}
