import { Request, Response } from 'express';
import { ChargeRequest } from '../../domain';
import { chargeByCompany } from '../../adapters/chargeByCompany/chargeByCompany';
import logger from '../../util/logger';
import { isValidChargeRequest } from './charge.validator';
import { addStatus } from '../../adapters/chargeStatuses/chargeStatuses';

const chargeController = {
    post: async (req: Request, res: Response) => {
        logger.info('chargeStatuses');

        if(!isValidChargeRequest(req)) {
          res.sendStatus(400);
          return;
        }
        
        try {
          const merchantIdentifier = req.header('merchant-identifier');
          const chargeRequest: ChargeRequest = req.body;
          const resp = await chargeByCompany({merchantIdentifier, chargeRequest})
          if(resp.error) {
            addStatus(merchantIdentifier, resp.error)
          }
          res.status(200).send({ error: resp.error });
        } catch (e) {
          logger.error(e.message)
          res.sendStatus(500)
        }
    },
};


export default chargeController;
