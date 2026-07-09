type TerrosHeaderMetadata = {
  'Terros-Platform'?: string
  'Terros-Platform-Version'?: string
  'Terros-Bundle-Identifier'?: string
  'Terros-SDK-Version'?: string
}

let cachedHeaders: Promise<TerrosHeaderMetadata> | undefined

export function getAnalyticsHeaders(): Promise<TerrosHeaderMetadata> {
  cachedHeaders ??= computeAnalyticsHeaders()
  return cachedHeaders
}

async function computeAnalyticsHeaders(): Promise<TerrosHeaderMetadata> {
  if (typeof globalThis.process === 'undefined') return {}

  try {
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const { platform, release } = await import('node:os')
    const { readFile } = await import('node:fs/promises')

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const packageJson = JSON.parse(await readFile(join(__dirname, '../package.json'), 'utf8')) as {
      version?: string
    }

    return {
      'Terros-Platform': platform(),
      'Terros-Platform-Version': release(),
      'Terros-Bundle-Identifier': 'com.terros.sdk',
      'Terros-SDK-Version': packageJson.version,
    }
  } catch {
    return {}
  }
}
