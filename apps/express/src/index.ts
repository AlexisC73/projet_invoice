import * as dotenv from 'dotenv-safe'
import path = require('path')
const envPath = path.join(__dirname, '../../../.env')
dotenv.config({ path: envPath })

import * as express from 'express'
import * as cors from 'cors'
import * as cookieParser from 'cookie-parser'

import { createServer } from 'https'

import * as fs from 'fs'

import * as session from 'express-session'
import * as passport from 'passport'

import invoiceRoute from './route/invoice'
import userRoute from './route/user'

const PORT = process.env.PORT || 5500

const option = process.env.NODE_ENV === 'production' && {
  key: fs.readFileSync('/etc/letsencrypt/live/alexis-comte.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/alexis-comte.com/fullchain.pem'),
}

const corsOrigin = {
  origin: process.env.NODE_ENV === 'production' ? ['https://invoice.alexis-comte.com'] : ['http://localhost:3000'],
  credentials: true,
}

const app = express()
app.use(cors(corsOrigin))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    cookie: { secure: process.env.NODE_ENV === 'production' ? true : false },
    saveUninitialized: true,
  })
)
app.use(passport.authenticate('session'))

app.use('/invoice', invoiceRoute)
app.use('/user', userRoute)

process.env.NODE_ENV === 'production'
  ? createServer(option, app).listen(PORT, () => {
      console.log('Server started in production mode on port =>', PORT)
    })
  : app.listen(PORT, () => {
      console.log('Server started on development mode on port =>', PORT)
    })
