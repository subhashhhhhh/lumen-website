export const GITHUB_URL = 'https://github.com/subhashhhhhh/Lumen'
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`

/**
 * Adds Lumen to Obtainium with its settings filled in: the APK matching the phone's processor
 * (arm64, armv7 or x86_64; the universal one stays a second choice). Obtainium's app-config link
 * (wiki.obtainium.imranr.dev/deep_links), straight to the app with no redirect through a
 * third-party page; it does nothing where Obtainium isn't installed.
 */
const obtainiumConfig = {
  id: 'com.subhashh.lumen',
  url: GITHUB_URL,
  author: 'subhashhhhhh',
  name: 'Lumen',
  additionalSettings: JSON.stringify({ autoApkFilterByArch: true }),
}
export const OBTAINIUM_URL = `obtainium://app/${encodeURIComponent(JSON.stringify(obtainiumConfig))}`
