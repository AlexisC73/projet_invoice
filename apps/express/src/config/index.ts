import {
  PrismaInvoiceRepository,
  PrismaUserRepository,
  JWTTokenService,
  MongoIdGenerator,
} from '@invoice/infrastructure'
import { PrismaClient } from '@invoice/domain'

export const prisma = new PrismaClient()

export const invoiceRepository = new PrismaInvoiceRepository(prisma)
export const userRepository = new PrismaUserRepository(prisma)
export const tokenService = new JWTTokenService(process.env.JWT_SECRET)
export const idGenerator = new MongoIdGenerator()
