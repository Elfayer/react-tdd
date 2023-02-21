export interface SessionGateway {
  login(login: string, password: string): Promise<void>
}
