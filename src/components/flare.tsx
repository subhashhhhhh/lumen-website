// The icon's lens flare, stretched into a divider: a tapered streak with a warm core and the
// two small lens reflections (amber, blue). Flat shapes only, no blur or glow.
export function Streak({ className = '' }: { className?: string }) {
  return (
    <svg className={`streak ${className}`} viewBox="0 0 1000 24" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,12 Q500,9.6 1000,12 Q500,14.4 0,12 Z" fill="#FFF3D9" />
    </svg>
  )
}

export function FlareMark({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="12 28 84 54" aria-hidden="true">
      <path d="M15,54 Q54,50.6 93,54 Q54,57.4 15,54 Z" fill="#FFF3D9" />
      <path d="M54,31 Q51.9,54 54,77 Q56.1,54 54,31 Z" fill="#FFF3D9" />
      <circle cx="54" cy="54" r="7" fill="#FFF3D9" />
      <circle cx="72" cy="70" r="2.8" fill="#FFB34D" />
      <circle cx="79.5" cy="77" r="1.7" fill="#6FA8FF" />
    </svg>
  )
}
