import express from 'express'
import { PAYPAL_CLINT_ID } from '../envConfig'
export const keyRouter = express.Router()

keyRouter.get('/paypal', (req, res) => {
  res.json({ clientId: PAYPAL_CLINT_ID as string || 'sb' })
})
