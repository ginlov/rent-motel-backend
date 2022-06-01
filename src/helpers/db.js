import { Sequelize } from 'sequelize';
import {} from '../';
const db = {};

db.sequelize = new Sequelize(
  process.env.DATABASE_DB,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: process.env.DATABSE_DIALECT,
    host: process.env.DATABASE_HOST,
    logging: false,
  },
);

db.Sequelize = Sequelize;

export default db;
