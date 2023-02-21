import { SessionGateway } from './SessionGateway'

export class ApiSessionGateway implements SessionGateway {
  login(login: string, password: string): Promise<void> {
    return Promise.resolve()
  }
}
