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
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = generateToken(user);
        res
          .cookie('jwt', token, {
            maxAge: maxAge * 1000,
            httpOnly: true,
          })
          .status(200)
          .json({ message: 'Logged in successfully' });
        return; // Add this return to prevent further execution
      } else {
        res.status(404).json({ message: 'Invalid Email or Password' });
      }
    }

    res.status(404).json({ message: 'Invalid Email or Password' });
  })
);

userRouter.post(
  '/signup',
  asyncHandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body
    try {
      const user = await User.create({
        name,
        email,
        password,
        isAdmin: false,
      } as User)
      if(!user) {
        res.status(401).json({ message: 'error in credintial' })
      }
      const token = generateToken(user)
      res.cookie('jwt', token, {
        maxAge: maxAge * 1000,
        httpOnly: true,
      })
      res.status(200).json({ message: 'signup successfully' })
    } catch (error) {
      
      res.status(400).json(error)
    }
    
  })
)
