import { IDatabase, IDBKeyType } from '../../types/db.types';
import dotenv from 'dotenv'
import fs from 'fs'
import logger from '../logger'
class SpeedCache<K extends IDBKeyType, T> implements IDatabase<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>;

  constructor() {
    dotenv.config()
    const path = process.env.JSON_PATH;
    if(!path){
        logger.error(null, 'JSON_PATH was not find.')
        throw Error()
    }

    if(fs.existsSync(path)){
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                logger.error(err, 'File read failed')
                return;
            }
            Object.entries(JSON.parse(data)).forEach(ent  => {
                this.db[ent[0] as K] = ent[1] as T
            })
        })
    } else {
        fs.writeFile(path, '{}', 'utf-8', err => {
            if (err) {
                logger.error(err, 'Error writing file')
                throw Error()
            }
        })
    }
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

  async getKeys(): Promise<[string] | undefined> {
    const keys = Object.keys(this.db);
    if (keys.length) {
      return keys as [string];
    }

    return undefined;
  }
}

export default SpeedCache