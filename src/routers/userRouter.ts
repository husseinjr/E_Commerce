import express, { Request, Response } from 'express'
import asyncHandler from 'express-async-handler'
import User from '../Database/models/User'
import bcrypt from 'bcrypt'
import { generateToken } from '../utils'
export const userRouter = express.Router()

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
        res.json({
          _id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
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
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    })
  })
)
