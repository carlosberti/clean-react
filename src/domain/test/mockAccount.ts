import faker from 'faker'

import { AccountModel } from '@/domain/models/'
import { AuthenticationParams } from '@/domain/useCases/authentication'

export const mockAuthentication = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.random.uuid(),
})
