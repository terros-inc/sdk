type TerrosHeaderMetadata = {
  'Terros-Platform'?: string
  'Terros-Platform-Version'?: string
  'Terros-Bundle-Identifier'?: string
  'Terros-SDK-Version'?: string
}

export async function getAnalyticsHeaders(): Promise<TerrosHeaderMetadata> {
  if (typeof globalThis.process === 'undefined') return {}

  try {
    const { fileURLToPath } = await import('node:url')
    const { dirname, join } = await import('node:path')
    const { platform, release } = await import('node:os')
    const { readFileSync } = await import('node:fs')

    const __filename = fileURLToPath(import.meta.url)
    const __dirname = dirname(__filename)
    const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf8')) as {
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
