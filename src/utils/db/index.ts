import dotenv from 'dotenv'
import fs from 'fs'
import { IDatabase, IDBKeyType } from '../../types/db.types'
import logger from '../logger'
class SpeedCache<K extends IDBKeyType, T> implements IDatabase<K, T> {
  protected db: Record<K, T> = {} as Record<K, T>
  protected jsonPath: string

  constructor() {
    dotenv.config()
    const path = process.env.JSON_PATH
    if (!path) {
      logger.error(null, 'JSON_PATH was not find.')
      throw Error()
    }
    this.jsonPath = path
    this.readJsonFile()
  }

  private readJsonFile() {
    if (fs.existsSync(this.jsonPath)) {
      fs.readFile(this.jsonPath, 'utf-8', (err, data) => {
        if (err) {
          logger.error(err, 'Error reading file')
          return
        }
        this.setDbEntries(data)
      })
    } else {
      fs.writeFile(this.jsonPath, '{}', 'utf-8', (err) => {
        if (err) {
          logger.error(err, 'Error writing file')
          throw Error()
        }
      })
    }
  }

  private setDbEntries(data: string): void {
    Object.entries(JSON.parse(data)).forEach((ent) => {
      this.db[ent[0] as K] = ent[1] as T
    })
  }

  private writeFile() {
    fs.writeFile(this.jsonPath, JSON.stringify(this.db), 'utf-8', (err) => {
      if (err) {
        logger.error(err, 'Error writing file')
        throw Error()
      }
    })
  }

  async get(key: K): Promise<T> {
    return this.db[key]
  }

  /**
   *
   * @param key key of the record
   * @param value value of the record
   * @param expiry expiry time in seconds
   */
  async set(key: K, value: T, expiry = 0) {
    if (expiry !== 0) {
      setTimeout(async () => {
        await this.del(key)
      }, expiry * 1000)
    }
    this.db[key] = value
    this.writeFile()
  }

  async del(key: K): Promise<void> {
    delete this.db[key]
    this.writeFile()
  }

  protected async getKeys(): Promise<[string] | undefined> {
    const keys = Object.keys(this.db)
    if (keys.length) {
      return keys as [string]
    }

    return undefined
  }
}

export default SpeedCache
