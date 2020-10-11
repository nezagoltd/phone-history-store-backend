import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import allRoutes from './routes/index';
import statusCodes from './helpers/statusCodes';
import customMessages from './helpers/customMessages';
import ResponseHandlers from './helpers/responseHandlers';
import { serve, setup } from 'swagger-ui-express';

dotenv.config();

const { PORT } = process.env;
const server = express();

server.use(express.json());
server.use(morgan('combined'));
server.use(allRoutes);

server.use((req, res, next) => {
  const resHandler = new ResponseHandlers();
  resHandler.res = res;
  resHandler.errorResponse(resHandler.res, statusCodes.notFound, customMessages.resourceNotFound);
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Phone History Store is running on port ${PORT}`);
});

export default server;
