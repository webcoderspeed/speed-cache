import { Database, DBKeyType } from '../types/db.types';
import readDBFile from './readDBFile';
import logger from './logger'

class SpeedCache<K extends DBKeyType, T> implements Database<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>;

  constructor() {
    logger.info(`Connected to Speed Cache`);
  }

  async get(id: K): Promise<T> {
    return this.db[id];
  }

  async set(id: K, value: T): Promise<void> {
    this.db[id] = value;
  }

  async setEx(id: K, value: T, expiry: number): Promise<void> {
    this.set(id, value);
    setTimeout(() => {
      delete this.db[id];
    }, expiry);
  }

  async del(id: K): Promise<void> {
    delete this.db[id];
  }

  async setDB(): Promise<void> {
    this.db = readDBFile() as Record<K, T>;
  }
}

export default SpeedCache