import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../Database/models/User'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils'
export const userRouter = express.Router()

const maxAge = 30 * 24 * 60 * 60 // 30d
// POST /api/users/signin
userRouter.post(
  '/signin',
  asyncHandler(async (req: Request, res: Response) => {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    })
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user)
        res.cookie('jwt', token, {
          maxAge: maxAge * 1000,
          httpOnly: true,
        })
        return
      }
    }
    res.status(404).json({ message: 'Invalid Email or Password' })
  })
)

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    const user = await User.create({
      name,
      email,
      password,
      isAdmin: false,
    } as User)
    const token = generateToken(user)
    res.cookie('jwt', token, {
      maxAge: maxAge * 1000,
      httpOnly: true,
    })
  })
)
