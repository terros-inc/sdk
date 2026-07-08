export * from './models/index.ts'
export * from './clients/index.ts'

import { AccountClient, CalendarClient, UserClient } from './clients/index.ts'
import { ApiCaller, type ClientConfig } from './client.ts'

export { ApiCaller, type ClientConfig }

export class SdkClient {
  readonly user: UserClient
  readonly account: AccountClient
  readonly calendar: CalendarClient

  constructor(config: ClientConfig) {
    const api = new ApiCaller(config)
    this.user = new UserClient(api)
    this.account = new AccountClient(api)
    this.calendar = new CalendarClient(api)
  }
}

export function createClient(config: ClientConfig): SdkClient {
  return new SdkClient(config)
}
