import { createServerFn } from '@tanstack/react-start'
import { marked } from 'marked'

// Releases come from GitHub when the site is built (pages are prerendered), so a new Lumen
// release needs a redeploy of the site. Visitors' browsers never talk to GitHub.

export type Apk = { abi: string; name: string; size: number; url: string; sha256?: string }
export type Release = { version: string; date: string; url: string; notesHtml: string; apks: Apk[] }

const REPO = 'subhashhhhhh/Lumen'
const ABI_ORDER = ['arm64-v8a', 'armeabi-v7a', 'x86_64', 'universal']

type GhAsset = { name: string; size: number; browser_download_url: string }
type GhRelease = { tag_name: string; published_at: string; html_url: string; body: string; draft: boolean; assets: GhAsset[] }

async function gh<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { 'User-Agent': 'lumen-photos.app', Accept: 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`)
  return res.json() as Promise<T>
}

// The release notes end with a "Which file to download" table and the certificate. The site
// shows those on /download, so the changelog keeps only what changed.
function changesOnly(body: string) {
  const cut = body.search(/^## Which file/m)
  return (cut >= 0 ? body.slice(0, cut) : body).trim()
}

async function toRelease(r: GhRelease, withSums: boolean): Promise<Release> {
  let sums = new Map<string, string>()
  const sumsAsset = r.assets.find((a) => a.name === 'SHA256SUMS.txt')
  if (withSums && sumsAsset) {
    const text = await (await fetch(sumsAsset.browser_download_url, { headers: { 'User-Agent': 'lumen-photos.app' } })).text()
    sums = new Map(
      text
        .split('\n')
        .map((line) => line.trim().split(/\s+/))
        .filter((p) => p.length === 2)
        .map(([hash, file]) => [file.replace(/^\*/, ''), hash]),
    )
  }
  const apks = r.assets
    .filter((a) => a.name.endsWith('.apk'))
    .map((a) => ({
      abi: ABI_ORDER.find((abi) => a.name.includes(`-${abi}.`)) ?? a.name,
      name: a.name,
      size: a.size,
      url: a.browser_download_url,
      sha256: sums.get(a.name),
    }))
    .sort((a, b) => ABI_ORDER.indexOf(a.abi) - ABI_ORDER.indexOf(b.abi))
  return {
    version: r.tag_name.replace(/^v/, ''),
    date: r.published_at,
    url: r.html_url,
    notesHtml: await marked.parse(changesOnly(r.body ?? '')),
    apks,
  }
}

export const getLatestRelease = createServerFn({ method: 'GET' }).handler(async () => {
  return toRelease(await gh<GhRelease>(`https://api.github.com/repos/${REPO}/releases/latest`), true)
})

export const getReleases = createServerFn({ method: 'GET' }).handler(async () => {
  const all = await gh<GhRelease[]>(`https://api.github.com/repos/${REPO}/releases?per_page=50`)
  return Promise.all(all.filter((r) => !r.draft).map((r) => toRelease(r, false)))
})

export const CERT_SHA256 =
  '44:2F:3C:6C:65:E3:C1:25:A1:49:BB:85:72:60:5F:DF:96:61:7F:B2:5D:4A:EA:01:F5:18:5B:BB:BD:38:AB:BC'

export function formatSize(bytes: number) {
  return `${Math.round(bytes / 1_000_000)} MB`
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
}
