import faker from 'faker'

import { HttpPostClientSpy } from '@/data/test/mockHttpClient'
import RemoteAuthentication from './remoteAuthentication'
import { mockAuthentication } from '@/domain/test/mockAuthentication'
import { InvalidCredentialsError } from '@/domain/errors/invalidCredentialsError'
import { HttpStatusCode } from '@/data/protocols/http/httpResponse'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy()
  const sut = new RemoteAuthentication(url, httpPostClientSpy) // sut = System Under Test

  return { sut, httpPostClientSpy }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthentication())
    expect(httpPostClientSpy.url).toBe(url)
  })

  it('should call HttpClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const authenticationParams = mockAuthentication()
    await sut.auth(authenticationParams)
    expect(httpPostClientSpy.body).toEqual(authenticationParams)
  })

  it('should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    }
    const promise = sut.auth(mockAuthentication())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
