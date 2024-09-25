import jwt from 'jsonwebtoken'
import User from './Database/models/User'
import { JWT_SECRET } from './envConfig'

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
