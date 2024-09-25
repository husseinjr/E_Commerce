import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import db from '../Database/connection/dbSync'
export const productRouter = express.Router()

productRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response) => {
    const products = await db.models.Product.findAll()
    res.status(201).json(products)
  })
)

productRouter.get(
  '/slug/:slug',
  asyncHandler(async (req: Request, res: Response) => {
    const { slug } = req.params
    const products = await db.models.Product.findAll({
      where: {
        slug,
      },
    })
    if (products) {
      res.status(201).json(products)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)
