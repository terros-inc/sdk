import { isResponseError, type ApiRoute } from './models/index.ts'
import { AccountClient, CalendarClient, UserClient } from './clients/index.ts'

export type ClientConfig = {
  apiKey?: string
  baseUrl?: string
}

const PROD_BASE_URL = 'https://api.terros.com'

export class ApiCaller {
  private readonly baseUrl: string
  private readonly auth: string

  constructor(config: ClientConfig) {
    this.baseUrl = config.baseUrl ?? readProcessEnv('TERROS_SDK_BASE_URL') ?? PROD_BASE_URL
    const auth = config.apiKey ?? readProcessEnv('TERROS_API_KEY')
    if (!auth) throw new Error('No auth provided: set TERROS_API_KEY or pass config.auth')
    this.auth = auth
  }

  async call<Success>(route: ApiRoute, input: object): Promise<Success> {
    let response: Response
    try {
      response = await fetch(`${this.baseUrl}/${route}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: `ApiKey ${this.auth}` },
        body: JSON.stringify(input),
      })
    } catch (cause) {
      throw new Error(`Request to ${route} failed`, { cause })
    }
    if (!response.ok) throw new Error(response.statusText)
    const output: unknown = await response.json()
    if (isResponseError(output)) throw new Error(output.message ?? output.error)
    return output as Success
  }
}

function readProcessEnv(key: string): string | undefined {
  if (typeof globalThis.process === 'undefined') return undefined
  return globalThis.process.env[key]
}

export class TerrosClient {
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
