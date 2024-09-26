import express, { Request, Response, urlencoded } from 'express'
import { PORT } from './envConfig'
import UserValidator from './validators/index'
// import middleware from './middlewares/index'
import db from './Database/connection/dbSync'
import { productRouter } from './routers/productRouter'
import { userRouter } from './routers/userRouter'
import { seedRouter } from './routers/seedRouters'
import path from 'path'
import cookieParser from 'cookie-parser'

db

const app = express()

// view engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))

const port = PORT || 3000

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Home page')
})

app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/test/data', seedRouter)

app.use((req, res, next) => {
  res.status(404).render('404')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})
