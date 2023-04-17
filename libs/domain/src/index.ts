import { PrismaClient } from '@prisma/client'
import {
  CreateGoogleUserCommand,
  CreateGoogleUserUsecase,
} from './user/usecases/create-google-user.usecase'
import {
  ConnectGoogleUserCommand,
  ConnectGoogleUserUsecase,
} from './user/usecases/connect-google-user.usecase'

const usecases = {
  CreateGoogleUserUsecase,
  ConnectGoogleUserUsecase,
}

export { PrismaClient, usecases }
