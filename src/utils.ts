import jwt from 'jsonwebtoken'
import User from './Database/models/User'
import { JWT_SECRET } from './envConfig'
import { Request, Response, NextFunction } from 'express'

interface DecodedToken {
  _id: string
  name: string
  email: string
  isAdmin: boolean
  iat: number // issued at timestamp
  exp: number // expiration timestamp
}

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
    const decoded = jwt.verify(
      token,
      (JWT_SECRET as string) || 'secretkeyforjwtinecommerce'
    )
    next()
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired' })
  }
}

export const getUserId = (req: Request, res: Response) => {
  const token = req.cookies?.jwt

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }

  try {
    // Verify the token if needed
    const decoded = jwt.verify(
      token,
      (JWT_SECRET as string) || 'secretkeyforjwtinecommerce'
    ) as DecodedToken
    return decoded._id
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired' })
  }
}
