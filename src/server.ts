import express, { Request, Response } from 'express'
import { sampleProducts } from './data'
import { PORT, DB_USER, DB_PASSWORD, DB_DATABASE_NAME } from './envConfig'

const app = express()

const port = PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Home page')
})

app.get('/api/products', (req: Request, res: Response) => {
  res.status(200).send(sampleProducts)
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
