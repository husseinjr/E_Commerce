import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../Database/connection/dbSync'
import { products } from '../data'
import { users } from '../data'
export const seedRouter = express.Router()

seedRouter.post(
  '/products',
  asyncHandler(async (req: Request, res: Response) => {
    const Product = db.models.Product
    await Product.destroy({ where: {} })
    const createdProducts = await Product.bulkCreate(products)
    res.json({ createdProducts })
  })
)

seedRouter.post(
  '/users',
  asyncHandler(async (req: Request, res: Response) => {
    const UserModel = db.models.User
    await UserModel.destroy({ where: {} })
    const createUsers =await UserModel.bulkCreate(users)
    res.json({ createUsers })
  })
)

// console.log('Products created:');

// console.error('Error creating products:');
