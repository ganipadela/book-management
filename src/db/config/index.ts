import * as dotenv from "dotenv";
dotenv.config();

import config from '../../config';

export default {
  [config.env]: {
    dialect: 'postgres',
    url: config.dbUri,
    migrationStorageTableName: '_migrations'
  }
}
