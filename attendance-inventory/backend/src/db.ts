import { Sequelize } from "sequelize";

import dotenv from "dotenv";
import path from "path";
dotenv.config();

export const sequelize = new Sequelize(
  "attendance-inventory-phase1",
  // "db",
  process.env.DBUSER ? process.env.DBUSER : "",
  process.env.PASSWORD ? process.env.PASSWORD : "",
  {
    // dialect: "sqlite",
    host: process.env.DBHOST ? process.env.DBHOST : "localhost",
    dialect: "mysql",
    // storage: path.join(__dirname + "/db/db.sqlite"),
    // storage: path.join(__dirname + "/db/db.sql"),
    logging: false,
  }
);
