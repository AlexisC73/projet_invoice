import * as dotenv from 'dotenv-safe'
dotenv.config()

import * as express from 'express'
import * as cors from 'cors'
import { AppDataSource } from './data-source'
import * as cookieParser from 'cookie-parser'

import * as session from 'express-session'
import * as passport from 'passport'

import invoiceRoute from './express/route/invoice'
import userRoute from './express/route/user'

AppDataSource.initialize()
  .then(_ => {
    console.log('Database connected')
  })
  .catch(error => console.log(error))

const PORT = process.env.PORT || 5500

const corsOrigin = {
  origin: ['http://localhost:3000', 'http://invoice.alexis-comte.com'],
  credentials: true,
}

const app = express()
app.use(cors(corsOrigin))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'cats',
    resave: false,
    cookie: { secure: false },
    saveUninitialized: true,
  })
)
app.use(passport.authenticate('session'))

app.use('/invoice', invoiceRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log('Server started on port =>', PORT)
})
