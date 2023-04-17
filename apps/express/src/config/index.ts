import { AppDataSource } from '../data-source'
import { MongoInvoiceRepository } from '@invoice/infrastructure/dist/invoice-repository/mongo.invoice.repository'
import { MongoUserRepository } from '@invoice/infrastructure/dist/user-repository/mongo-user.repository'
import { JWTTokenService } from '@invoice/infrastructure/dist/token-service/jwt/jwt-token-service'
import { TypeormMongoInvoice, TypeormMongoUser } from '@invoice/infrastructure'

export const invoiceRepository = new MongoInvoiceRepository(AppDataSource.getRepository(TypeormMongoInvoice))
export const userRepository = new MongoUserRepository(AppDataSource.getRepository(TypeormMongoUser))
export const tokenService = new JWTTokenService(process.env.JWT_SECRET)
