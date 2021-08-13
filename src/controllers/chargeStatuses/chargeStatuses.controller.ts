import { Request, Response } from 'express';
import { getStatuses } from '../../adapters/chargeStatuses/chargeStatuses';
import logger from '../../util/logger';

const chargeStatusesController = {
    get: async (req: Request, res: Response) => {
        logger.info('chargeStatuses');
        const merchantIdentifier = req.header('merchant-identifier');

        res.status(200).send(getStatuses(merchantIdentifier))
    },
};


export default chargeStatusesController;
