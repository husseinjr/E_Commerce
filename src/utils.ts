import jwt from 'jsonwebtoken'
import User from './Database/models/User'
import { JWT_SECRET } from './envConfig'
import { Request, Response, NextFunction } from 'express'

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    (JWT_SECRET as string) || 'secretkeyforjwtinecommerce',
    {
      expiresIn: '30d',
    }
  )
}

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    // Verify the token if needed
    const decoded = jwt.verify(token, 'your-secret-key')
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired' })
  }
}
