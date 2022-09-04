import { Database, DBKeyType } from '../types/db.types';
class SpeedCache<K extends DBKeyType, T> implements Database<K, T> {
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

export default SpeedCache;
