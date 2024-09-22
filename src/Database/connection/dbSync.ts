import db from './dbCon'
import UserModel from '../models/User'
import ProductModel from '../models/Product'


const User = UserModel;
const Product = ProductModel;

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err) => console.log('Unable to connect to the database: ', err))

db.sync()
  .then(() => {
    console.log('connected successfully')
  })
  .catch((error) => {
    console.log('Somthig went worng ' + error)
  })


export default db;