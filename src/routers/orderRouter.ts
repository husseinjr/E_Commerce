import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import { getUserId, isAuth } from '../utils'
import Order from '../Database/models/Order'
import ShippingAddress from '../Database/models/ShippingAddress'
import PaymentResult from '../Database/models/PaymentResult'
import OrderItem from '../Database/models/Order_Item'
import { verify } from 'crypto'
export const orderRouter = express.Router()


orderRouter.get('/mine', isAuth, asyncHandler( async (req: Request, res: Response) => {
  const userID = await getUserId(req, res);
  const orders = await Order.findAll({ where: {
    userId: userID
  }})
res.json(orders)
}))

orderRouter.get(
  // http://localhost:5000/api/orders/:id
  '/:id',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findByPk(req.params.id)
    if (order) {
      res.json(order)
    } else {
      res.status(404).json({ message: 'Order Not Found' })
    }
  })
)

orderRouter.post(
  '/',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const userID = getUserId(req, res)
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
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

orderRouter.put(
  '/:id/pay',
  isAuth,
  asyncHandler(async (req: Request, res: Response) => {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    })
    const orderPayment = await PaymentResult.findOne({
      where: { orderId: req.params.id },
    })
    if (order && orderPayment) {
      order.isPaid = true
      order.paidAt = new Date(Date.now())
      ;(orderPayment.paymentId = req.body.id),
        (orderPayment.status = req.body.status),
        (orderPayment.update_time = req.body.update_time),
        (orderPayment.email_address = req.body.email_address)
      try {
        orderPayment.save().then(() => {
          order.save
        })
      } catch (error) {
        res.status(404).send({ message: 'Unable to save the order' })
      }
      res.send({ message: 'Order has been paid successfully' })
    } else {
      res.status(404).send({ message: 'Unable to find the order' })
    }
  })
)
