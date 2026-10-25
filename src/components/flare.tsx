// The icon's lens flare, stretched into a divider: a tapered streak with a warm core and the
// two small lens reflections (amber, blue). Flat shapes only, no blur or glow.
export function Streak({ className = '' }: { className?: string }) {
  return (
    <svg className={`streak ${className}`} viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,12 Q500,9.6 1000,12 Q500,14.4 0,12 Z" fill="#FFF3D9" />
    </svg>
  )
}
