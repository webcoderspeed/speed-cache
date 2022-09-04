import { Express } from 'express';

const basePath = '/speed-cache';

const routes = (app: Express, cache: unknown) => {
  app.get('/', (req, res, next) => {
    res.json({
      version: '1.0.0',
      name: 'Speed Cache',
    });
  });

  app.get(`${basePath}/cache`, (req, res, next) => {
    res.json(cache);
  });
};

export default routes