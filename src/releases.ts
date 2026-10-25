import { createServerFn } from '@tanstack/react-start'

// Releases come from GitHub on the Worker, when someone opens /download or /changelog, and stay
// in Cloudflare's cache for a few minutes: a new Lumen release shows up without a redeploy.
// Visitors' browsers never talk to GitHub. GITHUB_TOKEN (a Worker secret, read-only) lifts
// GitHub's low limit for unauthenticated requests, which Cloudflare's shared servers can hit.

export type Apk = { abi: string; name: string; size: number; url: string; sha256?: string }
export type Release = { version: string; date: string; url: string; notesHtml: string; apks: Apk[] }

/** The latest release; null when GitHub can't be reached (the page links to GitHub instead). */
export const getLatestRelease = createServerFn({ method: 'GET' }).handler(async (): Promise<Release | null> => {
  try {
    return await (await import('./releases.server')).latestRelease()
  } catch (e) {
    console.error(e)
    return null
  }
})

/** Every release, newest first; null when GitHub can't be reached. */
export const getReleases = createServerFn({ method: 'GET' }).handler(async (): Promise<Release[] | null> => {
  try {
    return await (await import('./releases.server')).allReleases()
  } catch (e) {
    console.error(e)
    return null
  }
})

export const CERT_SHA256 =
  '44:2F:3C:6C:65:E3:C1:25:A1:49:BB:85:72:60:5F:DF:96:61:7F:B2:5D:4A:EA:01:F5:18:5B:BB:BD:38:AB:BC'

export function formatSize(bytes: number) {
  return `${Math.round(bytes / 1_000_000)} MB`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
