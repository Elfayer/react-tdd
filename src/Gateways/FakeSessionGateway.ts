import { SessionGateway } from './SessionGateway'

export class FakeSessionGateway implements SessionGateway {
  login(login: string, password: string): Promise<void> {
    return Promise.resolve()
  }
}
