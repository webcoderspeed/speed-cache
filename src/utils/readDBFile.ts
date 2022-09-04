import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

const dir = __dirname + '/db';
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let dbData: unknown;

const readDBFile = () => {
  fs.readFile('db/db.json', 'utf8', (error, data) => {
    if (error) throw error;

    dbData = JSON.parse(data);
  });

  return dbData;
};

export default readDBFile;
