import logger from './utils/logger';
import SpeedCache from './utils/db';
import createServer from './utils/server/createServer'


logger.info(`Connected to Speed Cache`);

export { SpeedCache, createServer };
