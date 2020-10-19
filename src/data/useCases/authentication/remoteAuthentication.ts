import { HttpPostClient } from '../../protocols/http/httpPostClient'

class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth(): Promise<void> {
    await this.httpPostClient.post(this.url)
  }
}

export default RemoteAuthentication
