import * as dotenv from 'dotenv-safe'
dotenv.config()

import * as express from 'express'
import * as cors from 'cors'
import { AppDataSource } from './data-source'
import * as cookieParser from 'cookie-parser'

import { createServer } from 'https'

import * as fs from 'fs'

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

const option = process.env.NODE_ENV === 'production' && {
  key: fs.readFileSync('/etc/letsencrypt/live/alexis-comte.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/alexis-comte.com/fullchain.pem'),
}

const corsOrigin = {
  origin: ['http://localhost:3000', 'https://invoice.alexis-comte.com'],
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
    cookie: { secure: true },
    saveUninitialized: true,
  })
)
app.use(passport.authenticate('session'))

app.use('/invoice', invoiceRoute)
app.use('/user', userRoute)

process.env.NODE_ENV === 'production'
  ? createServer(option, app).listen(PORT, () => {
      console.log('Server started on port =>', PORT)
    })
  : app.listen(PORT, () => {
      console.log('Server started on port =>', PORT)
    })
