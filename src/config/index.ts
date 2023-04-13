import { AppDataSource } from '../data-source'
import { MongoInvoice } from '../entity/Invoice'
import { MongoUser } from '../entity/User'
import { MongoUserRepository } from '../infrastructure/mongo-user.repository'
import { MongoInvoiceRepository } from '../infrastructure/mongo.invoice.repository'
import { JWTTokenService } from '../infrastructure/jwt-token-service'

export const invoiceRepository = new MongoInvoiceRepository(AppDataSource.getRepository(MongoInvoice))
export const userRepository = new MongoUserRepository(AppDataSource.getRepository(MongoUser))
export const tokenService = new JWTTokenService(process.env.JWT_SECRET)
