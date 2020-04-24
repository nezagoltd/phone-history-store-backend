import express from 'express';
import wlcmRouter from './api/welcome.routes';
import apiRouter from './api/index';

const allRoutes = express.Router();

allRoutes.use('/', wlcmRouter);
allRoutes.use('/api', apiRouter);

export default allRoutes;
