import { PrismaInvoiceRepository } from '@invoice/infrastructure/src/invoice-repository/prisma.invoice.repository'
import { PrismaUserRepository } from '@invoice/infrastructure/src/user-repository/prisma-user.repository'
import { JWTTokenService } from '@invoice/infrastructure/src/token-service/jwt/jwt-token-service'
import { PrismaClient } from '@invoice/domain'

export const prisma = new PrismaClient()

export const invoiceRepository = new PrismaInvoiceRepository(prisma)
export const userRepository = new PrismaUserRepository(prisma)
export const tokenService = new JWTTokenService(process.env.JWT_SECRET)
