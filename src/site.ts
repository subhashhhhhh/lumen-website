export const GITHUB_URL = 'https://github.com/subhashhhhhh/Lumen'
export const DOWNLOAD_URL = `${GITHUB_URL}/releases/latest`

/**
 * Opens Obtainium's Add App screen with Lumen's releases filled in. Straight to the app (no
 * redirect through a third-party page); does nothing where Obtainium isn't installed.
 */
export const OBTAINIUM_URL = `obtainium://add/${GITHUB_URL}`
