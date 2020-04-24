/* eslint-disable no-underscore-dangle */
import { readdirSync } from 'fs';
import path from 'path';
import sequelizeObj from 'sequelize';
import dotenv from 'dotenv';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

dotenv.config();
const { basename: _basename, join } = path;
const __dirname = path.resolve('src/database/models');
const __filename = fileURLToPath(import.meta.url);
const { Sequelize } = sequelizeObj;
const require = createRequire(import.meta.url);
const basename = _basename(__filename);
const env = process.env.NODE_ENV;
const config = require('../config.cjs')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

readdirSync(__dirname)
  .filter((file) => {
    const isTrue = (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-4) === '.cjs');
    return isTrue;
  })
  .forEach((file) => {
    const model = sequelize.import(join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
