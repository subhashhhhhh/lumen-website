import { OBTAINIUM_URL } from '../site'

/**
 * Obtainium's own "Get it on Obtainium" badge, hosted here as their wiki asks
 * (assets/graphics/badge_obtainium.png from github.com/ImranR98/Obtainium, padding trimmed).
 */
export function ObtainiumBadge() {
  return (
    <a className="badge" href={OBTAINIUM_URL} title="Adds Lumen to Obtainium, set to the right APK for your phone">
      <img src="/badges/obtainium.png" alt="Get it on Obtainium" width={161} height={48} />
    </a>
  )
}
