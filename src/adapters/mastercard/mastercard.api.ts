import { ChargeRequest, ChargeResponse } from "../../domain";
import { chargeRequestToMasterCardChargeRequest, MasterCardChargeResponse } from "./mastercard.domain";
import { AxiosInstance } from "axios";

export const MASTERCARD_BASE_DOMAIN = 'https://interview.riskxint.com/mastercard';
export const MASTERCARD_CHARGE_URI = '/capture_card';
import logger from '../../util/logger';

export const ChargeMasterCard = ({
  chargeRequest,
  merchantIdentifier,
}:{
  chargeRequest: ChargeRequest,
  merchantIdentifier: string,
},
axiosClient: AxiosInstance
): Promise<ChargeResponse> => {
  logger.info('chargeMasterCard')

  return axiosClient.post<MasterCardChargeResponse>(
    `${MASTERCARD_BASE_DOMAIN}${MASTERCARD_CHARGE_URI}`,
    chargeRequestToMasterCardChargeRequest(chargeRequest),
    {
      headers: {
        'identifier': merchantIdentifier
      }
    }
  ).then(resp => ({success: true}))
    .catch(errorResponse => {
      if(errorResponse.response?.status === 400) {
        return {
          success: false,
          error: errorResponse.response?.data?.decline_reason,
        }
      } else {
        logger.error(errorResponse.response)
        throw errorResponse
      }
    })
} 