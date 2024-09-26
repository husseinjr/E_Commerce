import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { isAuth } from '../utils'
import Order from '../Database/models/Order'
import ShippingAddress from '../Database/models/ShippingAddress'
import PaymentResult from '../Database/models/PaymentResult'
import OrderItem from '../Database/models/Order_Item'
export const orderRouter = express.Router()
orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      userID,
    } = req.body

    if (orderItems.length === 0) {
      res.status(400).json({ message: 'Cart is empty' })
      return 
    }

    
    try {
      const createdShippingAddress = await ShippingAddress.create({
        fullName: shippingAddress.fullName,
        address: shippingAddress.address,
        city: shippingAddress.city,
        postalCode: shippingAddress.postalCode,
        country: shippingAddress.country,
        lat: shippingAddress.lat,
        lng: shippingAddress.lng,
      })

      const createdPaymentResult = await PaymentResult.create({
        paymentId: paymentResult.paymentId,
        status: paymentResult.status,
        update_time: new Date(),
        email_address: paymentResult.email_address,
      })

      const createdOrder = await Order.create({
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        userId: userID, 
        shippingAddressId: createdShippingAddress.id,
        paymentResultId: createdPaymentResult.id,
      })

      
      const createdOrderItems = await Promise.all(
        orderItems.map(async (item: any) => {
          return await OrderItem.create({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            productId: item.productId, 
            orderId: createdOrder.id, 
          })
        })
      )

      
      res.status(201).json({
        order: createdOrder,
        orderItems: createdOrderItems,
        shippingAddress: createdShippingAddress,
        paymentResult: createdPaymentResult,
      })
    } catch (error) {
      res.status(500).json({ message: 'Order creation failed', error })
    }
  })
)
