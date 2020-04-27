import { Router } from 'express';
import userRouter from './user.routes';
import smsRouter from './sms.routes';
import callRouter from './call.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/sms', smsRouter);
apiRouter.use('/calls', callRouter);

export default apiRouter;
