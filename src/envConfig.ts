import * as dotenv from 'dotenv'
dotenv.config()
// {path: "../.env"}

export const { PORT, DB_USER, DB_PASSWORD, DB_DATABASE_NAME, JWT_SECRET, PAYPAL_CLINT_ID, SECRET } = process.env
