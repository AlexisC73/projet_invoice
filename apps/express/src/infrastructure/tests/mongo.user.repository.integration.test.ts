import { DataSource } from 'typeorm'
import * as path from 'path'
import { ObjectId } from 'mongodb'
import { mongoUserToUser } from '../../utils'
import DockerCompose, { IDockerComposeOptions } from 'docker-compose'
import { MongoUser } from '../../entity/User'
import { MongoUserRepository } from '../mongo-user.repository'
import { userBuilder } from '../../domain/user/tests/userBuilder'
import { ConnectGoogleUserUsecase } from '../../domain/user/usecases/connect-google-user.usecase'
import { JWTTokenService } from '../jwt-token-service'
import { CreateGoogleUserUsecase } from '../../domain/user/usecases/create-google-user.usecase'

describe('integration mongodb', () => {
  let composeOptions: IDockerComposeOptions
  let dataSource: DataSource

  beforeAll(async () => {
    composeOptions = { config: path.join(__dirname + '../../../../docker-compose.yaml') }
    await DockerCompose.upOne('mongo')
  }, 10000)

  beforeEach(async () => {
    dataSource = new DataSource({
      type: 'mongodb',
      url: 'mongodb://127.0.0.1:27017',
      useNewUrlParser: true,
      database: 'invoice',
      synchronize: true,
      logging: true,
      entities: [MongoUser],
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
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const createGoogleUserUsecase = new CreateGoogleUserUsecase(mongoUserRepository)

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

    const inDbUser = await userRepository.findOne({ where: { _id: new ObjectId(userId) as any } })
    expect(mongoUserToUser(inDbUser).data).toEqual(savedUser.data)

    const inDbInvoices = await userRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })

  test('should connect google user', async () => {
    const userRepository = dataSource.getRepository(MongoUser)
    const mongoUserRepository = new MongoUserRepository(userRepository)
    const tokenService = new JWTTokenService('secret-key')
    const connectGoogleUserUsecase = new ConnectGoogleUserUsecase(mongoUserRepository, tokenService)

    const userId = new ObjectId().toString() as any
    const existingUser = userBuilder()
      .withId(userId)
      .withLinkedAccounts({ google: { id: 'google-id' } })
      .buildGoogleUser()

    await mongoUserRepository.save(existingUser)

    const token = await connectGoogleUserUsecase.handle({
      googleId: 'google-id',
    })

    expect(tokenService.decode(token)).toEqual(expect.objectContaining({ id: userId }))

    const inDbInvoices = await userRepository.find()
    expect(inDbInvoices.length).toEqual(1)
  })
})
