import express from 'express';
import logger from '../logger';
import { errorHandler, notFound } from './middlewares/error.middlewares';
import routes from './routes/routes';


const createServer = (cache: unknown) => {
  const app = express();

  // setting up body parser
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));


  const PORT = 12996

  app.listen(PORT, async () => {
    logger.info(`Speed Cache is running at port http://localhost:${PORT} is live`);


    routes(app, cache);

    // error handler
    app.use(notFound);
    app.use(errorHandler);
  });
}

export default createServer;