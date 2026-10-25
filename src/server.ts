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

  const out = new Headers(asset.headers)
  out.set('Accept-Ranges', 'bytes')
  const match = range && request.method === 'GET' ? /^bytes=(\d*)-(\d*)$/.exec(range.trim()) : null
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
