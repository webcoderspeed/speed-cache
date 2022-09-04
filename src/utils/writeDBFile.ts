import fs from 'fs';
import path from 'path';
import logger from './logger';

const __dirname = path.resolve();

const dir = __dirname + '/db';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const writeDBFile = (dbData: string) => {
  fs.writeFile('db/db.json', dbData, (error) => {
    if (error) throw error;

    logger.info('Data stored successfully');
  });
};

export default writeDBFile;
