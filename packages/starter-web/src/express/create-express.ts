import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const createExpress = (): Express => {
  const app: Express = express();

  app.use(cors());
  app.options('*', cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  return app;
};

export { createExpress };
