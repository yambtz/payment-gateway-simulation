import { Router } from 'express';
import chargeController from '../controllers/charge/charge.controller';

const router = Router();
router.post('/', chargeController.post);

export default router;
