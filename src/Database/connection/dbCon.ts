import { DB_USER, DB_PASSWORD, DB_DATABASE_NAME } from '../../envConfig'

import { Sequelize } from 'sequelize'

if (!DB_DATABASE_NAME || !DB_PASSWORD || !DB_USER) {
  // for testing
  console.log(`error in .env`)
  process.exit(1)
}
const dbName = String(DB_DATABASE_NAME)
const dbPass = String(DB_PASSWORD)
const dbUserName = String(DB_USER)
// console.log(dbName)
const db = new Sequelize(dbName, dbUserName, dbPass, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
})

export default db
