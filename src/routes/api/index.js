import { Router } from 'express';
import userRouter from './user.routes';
import smsRouter from './sms.routes';

const apiRouter = Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/sms', smsRouter);

export default apiRouter;
