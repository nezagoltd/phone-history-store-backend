import { Router } from 'express';
import wlcmRouter from './api/welcome.routes';
import apiRouter from './api/index';

const allRoutes = Router();

allRoutes.use('/', wlcmRouter);
allRoutes.use('/api', apiRouter);

export default allRoutes;
