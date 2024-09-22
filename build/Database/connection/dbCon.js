"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envConfig_1 = require("../../envConfig");
const sequelize_1 = require("sequelize");
if (!envConfig_1.DB_DATABASE_NAME || !envConfig_1.DB_PASSWORD || !envConfig_1.DB_USER) {
    // for testing
    console.log(`error in .env`);
    process.exit(1);
}
const dbName = String(envConfig_1.DB_DATABASE_NAME);
const dbPass = String(envConfig_1.DB_PASSWORD);
const dbUserName = String(envConfig_1.DB_USER);
// console.log(dbName)
const db = new sequelize_1.Sequelize(dbName, dbUserName, dbPass, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
});
exports.default = db;
