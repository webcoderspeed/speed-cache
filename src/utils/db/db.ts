import { IDatabase, IDBKeyType } from '../../types/db.types';
import logger from '../logger';
export class SpeedCache<K extends IDBKeyType, T> implements IDatabase<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>;

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

  async getKeys(): Promise<[string] | undefined> {
    const keys = Object.keys(this.db);
    if (keys.length) {
      return keys as [string];
    }

    return undefined;
  }
}

const SpeedCacheClient = async () => {
  const { set, get, setEx, del } = new SpeedCache();

  logger.info(`Connected to Speed Cache`);
  return {
    set,
    get,
    setEx,
    del,
  };
};

export default SpeedCacheClient;
