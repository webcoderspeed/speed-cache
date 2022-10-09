import { Express } from 'express';
import SpeedCache from '../../db';

const basePath = '/speed-cache';

const routes = (app: Express, cache: InstanceType<typeof SpeedCache>) => {
  app.get('/', (req, res, next) => {
    res.json({
      version: '1.0.0',
      name: 'Speed Cache',
    });
  });

  app.get(`${basePath}/cache`, (req, res, next) => {
    res.json(cache);
  });

  app.get(`${basePath}/cache/get/:key`, async (req, res, next) => {
    const { key } = req.params;
    const value = await cache.get(key);
    res.json(value);
  });

  app.post(`${basePath}/cache/add/:key`, (req, res, next) => {
    const { key } = req.params;
    const { value } = req.body;
    cache.set(key, value);
    res.json({ message: 'success' });
  });

  app.post(`${basePath}/cache/update/:key`, async (req, res, next) => {
    const { key } = req.params;
    const { value } = req.body;
    const oldValue = await cache.get(key);
    if (oldValue) {
      cache.set(key, value);
      return res.json({ message: 'success' });
    }
    res.json({ message: 'failed' });
  });

  app.delete(`${basePath}/cache/delete/:key`, async (req, res, next) => {
    const { key } = req.params;
    const value = await cache.get(key);
    if (value) {
      cache.del(key);
      return res.json({ message: 'success' });
    }
    res.json({ message: 'failed' });
  });
};

export default routes