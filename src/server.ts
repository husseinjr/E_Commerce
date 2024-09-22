import express, { Request, Response, urlencoded } from 'express'
import { PORT } from './envConfig'
// import { sampleProducts } from './data'
// import UserValidator from './validators/index'
// import middleware from './middlewares/index'
import { productRouter } from './routers/productRouter'
import db from './Database/connection/dbSync';


db

const app = express()

app.use(express.json())
app.use(urlencoded({ extended: false }))

const port = PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Home page')
})

app.get('/api/products', productRouter)


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
