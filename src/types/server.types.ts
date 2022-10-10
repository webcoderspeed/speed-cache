import SpeedCache from '../utils/db'

export interface ICreateServer {
  cache: InstanceType<typeof SpeedCache>
  options?: {
    port?: number
  }
}
