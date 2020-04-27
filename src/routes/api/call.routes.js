import { Router } from 'express';
import CallController from '../../controllers/call.controller';
import ValidateAuth from '../../middlewares/authValidate';
import ValidateAllLogsRetrieve from '../../middlewares/retrieveAllLogsValidate';
import ValidateCallDelete from '../../middlewares/deleteCallValidate';

const callRouter = Router();

const { isUserLoggedInAndVerified } = new ValidateAuth();
const { validateAllLogsRetrieve } = new ValidateAllLogsRetrieve();
const { validateCallDeleteData } = new ValidateCallDelete();
const {
  saveNewCall,
  retrieveMyCall,
  retrieveAllCall,
  temporaryDeleteCall,
} = CallController;

callRouter.post('/save-call', isUserLoggedInAndVerified, saveNewCall);
callRouter.get('/read-my-calls', isUserLoggedInAndVerified, retrieveMyCall);
callRouter.get('/read-all-calls', isUserLoggedInAndVerified, validateAllLogsRetrieve, retrieveAllCall);
callRouter.delete('/delete-call/:callId', isUserLoggedInAndVerified, validateCallDeleteData, temporaryDeleteCall);

export default callRouter;
