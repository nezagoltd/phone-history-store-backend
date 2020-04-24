import { Router } from 'express';
import customMessages from '../../helpers/customMessages';
import statusCode from '../../helpers/statusCodes';

const wlcmRouter = Router();
const { welcomeToPhoneHistoryStore } = customMessages;
const { ok } = statusCode;

wlcmRouter.get('/', (req, res) => {
  res.status(ok).json({ message: welcomeToPhoneHistoryStore });
});

export default wlcmRouter;
