import pino from 'pino';
import {format} from 'date-fns';

const logger = pino({
  transport: {
    target: 'pino-pretty',
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"time":" ${format(new Date(), 'PPPPpppp')}"`,
});

logger.info('hi')

export default logger;
