import { DataSource } from 'typeorm'
import * as path from 'path'
import DockerCompose, { IDockerComposeOptions } from 'docker-compose'
import { TypeormMongoUser } from '../../mongo/entity/User'
import { MongoUserRepository } from '../mongo-user.repository'
import { CreateGoogleUserUsecase } from '@invoice/domain/dist/user/usecases/create-google-user.usecase'
import { ConnectGoogleUserUsecase } from '@invoice/domain/dist/user/usecases/connect-google-user.usecase'
import { JWTTokenService } from '../../token-service/jwt/jwt-token-service'
import { userBuilder } from '@invoice/domain/dist/user/tests/userBuilder'
import { ObjectId } from 'mongodb'
import 'reflect-metadata'

describe('integration mongodb', () => {
  let composeOptions: IDockerComposeOptions
  let dataSource: DataSource

  beforeAll(async () => {
    composeOptions = {
      config: path.join(__dirname + '../../../../docker-compose.yaml'),
    }
    await DockerCompose.upOne('mongo', composeOptions)
  }, 10000)

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017',
      useNewUrlParser: true,
      database: 'invoice',
      synchronize: true,
      logging: true,
      entities: [TypeormMongoUser],
      useUnifiedTopology: true,
      dropSchema: true,
    })
    await dataSource.initialize()
  }, 10000)

  afterEach(async () => {
    await dataSource.destroy()
  })

  afterAll(async () => {
    await DockerCompose.down(composeOptions)
  }, 10000)

  test('should save google user', async () => {
    const typeOrmRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(typeOrmRepository)
    const createGoogleUserUsecase = new CreateGoogleUserUsecase(
      mongoUserRepository
    )

    const userId = new ObjectId().toString() as any
    const savedUser = userBuilder()
      .withId(userId)
      .withEmail('test@test.fr')
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()

    await createGoogleUserUsecase.handle({
      id: userId,
      googleId: savedUser.linkedAccounts.google.id,
      email: savedUser.email,
    })

    const inDbUser = await typeOrmRepository.findOne({
      where: { _id: new ObjectId(userId) as any },
    })
    expect(inDbUser?.toDomainUser().data).toEqual(savedUser.data)

    const inDbInvoices = await typeOrmRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should connect google user', async () => {
    const typeOrmRepository = dataSource.getRepository(TypeormMongoUser)
    const mongoUserRepository = new MongoUserRepository(typeOrmRepository)
    const tokenService = new JWTTokenService('secret-key')
    const connectGoogleUserUsecase = new ConnectGoogleUserUsecase(
      mongoUserRepository,
      tokenService
    )

    const userId = new ObjectId().toString() as any
    const existingUser = userBuilder()
      .withId(userId)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()

    await mongoUserRepository.save(existingUser)

    const token = await connectGoogleUserUsecase.handle({
      googleId: 'google-id',
    })

    expect(tokenService.decode(token)).toEqual(
      expect.objectContaining({ id: userId })
    )

    const inDbInvoices = await typeOrmRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })
})
