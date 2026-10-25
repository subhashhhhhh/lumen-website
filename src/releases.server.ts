// Server only (loaded by the handlers in releases.ts): fetching and caching GitHub's releases.
import { env } from 'cloudflare:workers'
import { marked } from 'marked'
import type { Release } from './releases'

const REPO = 'subhashhhhhh/Lumen'
const ABI_ORDER = ['arm64-v8a', 'armeabi-v7a', 'x86_64', 'universal']

type GhAsset = { name: string; size: number; browser_download_url: string }
type GhRelease = { tag_name: string; published_at: string; html_url: string; body: string; draft: boolean; assets: GhAsset[] }

const CacheSeconds = 600

/** [url]'s body, from Cloudflare's cache when it's there (keyed without the token). */
async function cached(url: string, accept: string): Promise<string> {
  const cache = (globalThis as { caches?: { default?: Cache } }).caches?.default
  const key = new Request(`https://lumen-photos.app/__github-cache?url=${encodeURIComponent(url)}`)
  const hit = await cache?.match(key)
  if (hit) return hit.text()
  const headers: Record<string, string> = { 'User-Agent': 'lumen-photos.app', Accept: accept }
  if (env.GITHUB_TOKEN) headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`
  const res = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`)
  const body = await res.text()
  await cache?.put(key, new Response(body, { headers: { 'Cache-Control': `max-age=${CacheSeconds}` } }))
  return body
}

async function gh<T>(url: string): Promise<T> {
  return JSON.parse(await cached(url, 'application/vnd.github+json')) as T
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
    const text = await cached(sumsAsset.browser_download_url, 'text/plain')
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

export async function latestRelease(): Promise<Release> {
  return toRelease(await gh<GhRelease>(`https://api.github.com/repos/${REPO}/releases/latest`), true)
}

export async function allReleases(): Promise<Release[]> {
  const all = await gh<GhRelease[]>(`https://api.github.com/repos/${REPO}/releases?per_page=50`)
  return Promise.all(all.filter((r) => !r.draft).map((r) => toRelease(r, false)))
}
