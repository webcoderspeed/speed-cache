export interface Database<K, T> {
  get(id: K): Promise<T>;
  set(id: K, value: T): Promise<void>;
  setEx(id: K, value: T, expiry: number): Promise<void>;
  del(id: K): Promise<void>;
  setDB(): Promise<void>
}

export type DBKeyType = string | number | symbol;

