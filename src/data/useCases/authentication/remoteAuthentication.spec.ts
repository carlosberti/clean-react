import { HttpPostClientSpy } from '../../test/mockHttpClient'
import RemoteAuthentication from './remoteAuthentication'

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct URL', async () => {
    const url = 'any_url'
    const httpPostClientSpy = new HttpPostClientSpy()
    const sut = new RemoteAuthentication(url, httpPostClientSpy)
    await sut.auth()
    expect(httpPostClientSpy.url).toBe(url)
  })
})
