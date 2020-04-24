import express from 'express';
import userRouter from './user.routes';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);

export default apiRouter;
