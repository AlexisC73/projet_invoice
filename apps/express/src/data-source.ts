import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { TypeormMongoInvoice } from '@invoice/infrastructure/src/mongo/entity/Invoice'
import { TypeormMongoUser } from '@invoice/infrastructure/src/mongo/entity/User'

export const AppDataSource =
  process.env.NODE_ENV === 'production'
    ? new DataSource({
        type: 'mongodb',
        url: process.env.MONGO_URL || null,
        useNewUrlParser: true,
        database: 'invoice',
        synchronize: true,
        logging: true,
        entities: [TypeormMongoInvoice, TypeormMongoUser],
        useUnifiedTopology: true,
        dropSchema: false,
      })
    : new DataSource({
        type: 'mongodb',
        url: process.env.MONGO_URL || null,
        useNewUrlParser: true,
        database: 'testing',
        synchronize: true,
        logging: true,
        entities: [TypeormMongoInvoice, TypeormMongoUser],
        useUnifiedTopology: true,
        dropSchema: true,
      })
