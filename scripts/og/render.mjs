// Renders the link-preview cards (Open Graph, 1200×630) into public/og/, in the site's look:
// night blue, the app icon, Instrument Sans, real Lumen screens. Run `npm run og`, then commit.
// WhatsApp skips images over ~300 KB, so they're JPEGs at quality 82.
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const root = join(here, '..', '..')
const dataUrl = (path, type) => `data:${type};base64,${readFileSync(path).toString('base64')}`
const font = dataUrl(join(root, 'node_modules/@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2'), 'font/woff2')
const icon = dataUrl(join(root, 'public/brand/app-icon.png'), 'image/png')
const shot = (name) => dataUrl(join(here, `${name}.jpg`), 'image/jpeg')

const css = `
@font-face { font-family: Sans; src: url(${font}) format('woff2'); font-weight: 100 900; }
* { box-sizing: border-box; margin: 0; }
body { width: 1200px; height: 630px; overflow: hidden; background: #1b2644; color: #f4efe6; font-family: Sans; }
.card { position: relative; width: 1200px; height: 630px; padding: 64px 72px; display: flex; flex-direction: column; }
.brand { display: flex; align-items: center; gap: 16px; font-size: 32px; font-weight: 600; letter-spacing: -0.02em; }
.brand img { width: 56px; height: 56px; border-radius: 13px; box-shadow: 0 0 0 1.5px #3a4d7a; }
.label { font-size: 22px; letter-spacing: 0.05em; text-transform: uppercase; color: rgba(244,239,230,0.6); }
h1 { margin-top: auto; font-size: 76px; line-height: 1.0; font-weight: 600; letter-spacing: -0.045em; max-width: 11.5em; }
h1 em { font-style: normal; color: #fff3d9; }
.sub { margin-top: 26px; font-size: 28px; color: rgba(244,239,230,0.66); letter-spacing: -0.01em; }
.url { position: absolute; right: 72px; top: 80px; font-size: 22px; color: rgba(244,239,230,0.5); }
.streak { position: absolute; left: 0; bottom: 0; width: 1200px; height: 14px; display: block; }
.narrow h1 { max-width: 520px; font-size: 66px; }
.narrow .sub { max-width: 500px; font-size: 26px; }
.flare { position: absolute; right: 40px; top: 120px; width: 520px; height: 390px; }
.text h1, .text .sub { max-width: 640px; }
.phones { position: absolute; right: 64px; top: 70px; display: flex; gap: 26px; align-items: flex-start; }
.phone { width: 250px; padding: 7px; background: #05070c; border-radius: 34px; box-shadow: 0 0 0 1.5px #3a4d7a; }
.phone.low { margin-top: 70px; }
.phone div { aspect-ratio: 1220 / 2712; border-radius: 28px; overflow: hidden; }
.phone img { width: 100%; height: 100%; object-fit: cover; display: block; }
.code { margin-top: 30px; padding: 22px 26px; background: #212d50; border: 1.5px solid #3a4d7a; border-radius: 18px;
  font-family: ui-monospace, Menlo, monospace; font-size: 23px; line-height: 1.55; color: #f4efe6; white-space: pre; width: fit-content; }
.code b { color: #ffb34d; font-weight: 400; }
`

const flare = `<svg class="flare" viewBox="12 28 84 54" aria-hidden="true"><path d="M15,54 Q54,50.6 93,54 Q54,57.4 15,54 Z" fill="#FFF3D9"/><path d="M54,31 Q51.9,54 54,77 Q56.1,54 54,31 Z" fill="#FFF3D9"/><circle cx="54" cy="54" r="7" fill="#FFF3D9"/><circle cx="72" cy="70" r="2.8" fill="#FFB34D"/><circle cx="79.5" cy="77" r="1.7" fill="#6FA8FF"/></svg>`
const streak = `<svg class="streak" viewBox="0 0 1000 24" preserveAspectRatio="none"><path d="M0,12 Q500,8 1000,12 Q500,16 0,12 Z" fill="#FFF3D9"/></svg>`
const brand = (label = 'Lumen') => `<div class="brand"><img src="${icon}">${label}</div>`
const phone = (name, cls = '') => `<div class="phone ${cls}"><div><img src="${shot(name)}"></div></div>`

const cards = {
  home: `<div class="card narrow">${brand()}
      <h1>Your photos, smarter. <em>Nothing leaves your phone.</em></h1>
      <p class="sub">The private smart gallery for Android. Free and open source.</p>
      <div class="phones">${phone('search')}${phone('library', 'low')}</div>${streak}</div>`,
  download: `<div class="card narrow">${brand()}
      <h1>Download Lumen. <em>It's free.</em></h1>
      <p class="sub">Signed APKs for Android 11 and later, with checksums.</p>
      <div class="phones">${phone('library')}${phone('person', 'low')}</div>${streak}</div>`,
  ai: `<div class="card">${brand('Lumen AI')}
      <h1 style="max-width: 15em">Smart photo features for <em>your Android app.</em></h1>
      <div class="code">implementation(<b>"app.lumen-photos:lumen-ai:0.1.0"</b>)
LumenAi.search(context, <b>"cat sleeping on a chair"</b>)</div>
      <span class="url">lumen-photos.app/ai</span>${streak}</div>`,
  roadmap: `<div class="card text">${brand()}${flare}
      <h1>Where Lumen is <em>going.</em></h1>
      <p class="sub">Offline edition, F-Droid, Spoken in Videos, Sounds and more.</p>
      <span class="url">lumen-photos.app/roadmap</span>${streak}</div>`,
  changelog: `<div class="card text">${brand()}${flare}
      <h1>What's new <em>in Lumen.</em></h1>
      <p class="sub">Every release, newest first.</p>
      <span class="url">lumen-photos.app/changelog</span>${streak}</div>`,
  privacy: `<div class="card text">${brand()}${flare}
      <h1>Lumen collects <em>nothing.</em></h1>
      <p class="sub">No account, no analytics, no tracking. Three connections, all optional.</p>
      <span class="url">lumen-photos.app/privacy</span>${streak}</div>`,
}

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
for (const [name, html] of Object.entries(cards)) {
  await page.setContent(`<!doctype html><style>${css}</style>${html}`, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: join(root, 'public/og', `${name}.jpg`), type: 'jpeg', quality: 82 })
  console.log(`public/og/${name}.jpg`)
}
await browser.close()
