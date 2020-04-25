import { Router } from 'express';
import SmsController from '../../controllers/sms.controller';
import ValidateAuth from '../../middlewares/authValidate';
import ValidateSmsUpdate from '../../middlewares/updateSmsValidate';
import ValidateSmsDelete from '../../middlewares/deleteSmsValidate';
import ValidateAllSmsRetrieve from '../../middlewares/retrieveAllSmsValidate';

const { isUserLoggedInAndVerified } = new ValidateAuth();
const { validateSmsUpdateData } = new ValidateSmsUpdate();
const { validateSmsDeleteData } = new ValidateSmsDelete();
const { validateAllSmsRetrieve } = new ValidateAllSmsRetrieve();

const smsRouter = Router();
const {
  saveNewSms,
  retrieveMySms,
  retrieveAllSms,
  updateSms,
  temporaryDeleteSms,
} = SmsController;

smsRouter.post('/save-sms', isUserLoggedInAndVerified, saveNewSms);
smsRouter.get('/read-my-sms', isUserLoggedInAndVerified, retrieveMySms);
smsRouter.get('/read-all-sms', isUserLoggedInAndVerified, validateAllSmsRetrieve, retrieveAllSms);
smsRouter.patch('/edit-sms/:smsId', isUserLoggedInAndVerified, validateSmsUpdateData, updateSms);
smsRouter.delete('/delete-sms/:smsId', isUserLoggedInAndVerified, validateSmsDeleteData, temporaryDeleteSms);

export default smsRouter;
