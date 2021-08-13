import { ChargeResponse, ChargeRequest, CardCompanies } from "../..//domain";
import { ChargeMasterCard } from '../mastercard/mastercard.api';
import { ChargeVisa } from "../visa/visa.api";
import logger from '../../util/logger';
import axios from 'axios';
import axiosRetry from 'axios-retry';

export const chargeByCompany = ({
  chargeRequest,
  merchantIdentifier,
}:{
  chargeRequest: ChargeRequest,
  merchantIdentifier: string,
}): Promise<ChargeResponse> => {
  logger.info('chargeByCompany');

  const client = axios.create()
  axiosRetry(client, {retries: 3, retryDelay: c => c**2*1000})

  switch (chargeRequest.creditCardCompany) {
    case CardCompanies.VISA:
      return ChargeVisa({chargeRequest, merchantIdentifier}, client);
    case CardCompanies.MASTERCARD:
      return ChargeMasterCard({chargeRequest, merchantIdentifier}, client);
  }
}