import { Router } from 'express';
import chargeStatusesController from '../controllers/chargeStatuses/chargeStatuses.controller';

const router = Router();
router.get('/', chargeStatusesController.get);

export default router;
