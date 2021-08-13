import { ChargeRequest, ChargeResponse } from "../../domain";
import { chargeRequestToVisaChargeRequest, VisaChargeResponse } from "./visa.domain";
import logger from '../../util/logger';
import { AxiosInstance } from "axios";

export const VISA_BASE_DOMAIN = 'https://interview.riskxint.com/visa';
export const VISA_CHARGE_URI = '/api/chargeCard';

export const ChargeVisa = ({
  chargeRequest,
  merchantIdentifier,
}:{
  chargeRequest: ChargeRequest,
  merchantIdentifier: string,
}, axiosClient: AxiosInstance): Promise<ChargeResponse> => {
  logger.info('chargeVisa')

  return axiosClient.post<VisaChargeResponse>(
    `${VISA_BASE_DOMAIN}${VISA_CHARGE_URI}`,
    chargeRequestToVisaChargeRequest(chargeRequest), {
       headers: {
      'identifier': merchantIdentifier
    }
    }).then(resp => {
      return {
        success: resp.data.chargeResult === 'Success',
        error: resp.data.resultReason || undefined,
      }
    })
} 