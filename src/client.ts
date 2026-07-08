import { isResponseError, type ApiRoute } from './models/shared.ts'

export type ClientConfig = {
  auth: string
  baseUrl?: string
}

const PROD_BASE_URL = 'https://api.terros.com'

export class ApiCaller {
  constructor(private readonly config: ClientConfig) {}

  async call<Success>(route: ApiRoute, input: object): Promise<Success> {
    const response = await fetch(`${this.resolveBaseUrl()}/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: this.config.auth },
      body: JSON.stringify(input),
    })
    const output: unknown = await response.json()
    if (!response.ok) throw new Error(response.statusText)
    if (isResponseError(output)) throw new Error(output.message ?? output.error)
    return output as Success
  }

  private resolveBaseUrl(): string {
    return this.config.baseUrl ?? readProcessEnvBaseUrl() ?? PROD_BASE_URL
  }
}

function readProcessEnvBaseUrl(): string | undefined {
  if (typeof globalThis.process === 'undefined') return undefined
  return process.env.TERROS_SDK_BASE_URL
}
