import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { MongoInvoice } from './entity/Invoice'
import { MongoUser } from './entity/User'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  url: process.env.MONGO_URL || null,
  useNewUrlParser: true,
  database: 'invoice',
  synchronize: true,
  logging: true,
  entities: [MongoInvoice, MongoUser],
  useUnifiedTopology: true,
  dropSchema: false,
})
