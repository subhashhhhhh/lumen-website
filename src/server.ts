import handler, { createServerEntry } from '@tanstack/react-start/server-entry'
import { env } from 'cloudflare:workers'

export default createServerEntry({
  fetch(request) {
    if (new URL(request.url).pathname.startsWith('/media/')) return serveMedia(request)
    return handler.fetch(request)
  },
})

/**
 * Static assets answer a Range request with the whole file (200). Chrome and Firefox play that,
 * but Safari won't play a video unless it gets 206 slices, so /media/* runs through here first
 * (run_worker_first in wrangler.jsonc) and gets its ranges cut from the asset.
 */
async function serveMedia(request: Request): Promise<Response> {
  const range = request.headers.get('Range')
  const headers = new Headers(request.headers)
  headers.delete('Range')
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: request.method, headers }))
  if (!asset.ok) return asset

  // The edge cache answers Range requests itself, so after the first visit Safari's slices come
  // straight from it instead of reading the whole file per slice. Keyed by ETag, so a new deploy
  // of a clip never serves the old one.
  if (request.method === 'GET' && asset.headers.get('ETag')) {
    const key = new Request(`${request.url.split('?')[0]}?v=${encodeURIComponent(asset.headers.get('ETag')!)}`)
    // DOM's CacheStorage type (the page code shares this tsconfig) hides Workers' default cache.
    const cache = (caches as unknown as { default: Cache }).default
    const cached = await cache.match(new Request(key, { headers: request.headers }))
    if (cached) {
      await asset.body?.cancel()
      return cached
    }
    const toCache = new Response(asset.body, asset)
    toCache.headers.set('Cache-Control', 'public, max-age=86400')
    toCache.headers.set('Accept-Ranges', 'bytes')
    await cache.put(key, toCache.clone())
    const fresh = await cache.match(new Request(key, { headers: request.headers }))
    if (fresh) {
      await toCache.body?.cancel()
      return fresh
    }
    return slice(toCache, range)
  }
  return slice(asset, range)
}

/** Cuts the requested range out of the full file, for when the edge cache isn't there (local preview). */
async function slice(asset: Response, range: string | null): Promise<Response> {
  const out = new Headers(asset.headers)
  out.set('Accept-Ranges', 'bytes')
  const match = range && asset.body ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null
  if (!match || (!match[1] && !match[2])) return new Response(asset.body, { status: asset.status, headers: out })

  const body = await asset.arrayBuffer()
  const size = body.byteLength
  // "bytes=a-b", "bytes=a-" or the last-n-bytes form "bytes=-n".
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]))
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1
  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${size}` } })
  }
  out.set('Content-Range', `bytes ${start}-${end}/${size}`)
  out.set('Content-Length', String(end - start + 1))
  return new Response(body.slice(start, end + 1), { status: 206, headers: out })
}
