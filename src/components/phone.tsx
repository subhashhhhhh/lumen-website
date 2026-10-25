import { useEffect, useRef } from 'react'

// Screens are 1220×2712, captured on a Motorola Edge 50 in the demo profile. The frame is
// sized in em, so one font-size on .phone scales the whole thing (bezel, corners, camera).
export function Phone({ video, shot, poster, label }: { video?: string; shot?: string; poster?: string; label: string }) {
  return (
    <div className="phone" role="img" aria-label={label}>
      <div className="phone__camera" />
      <div className="phone__screen">{video ? <Clip src={video} poster={poster} /> : <img src={shot} alt="" />}</div>
    </div>
  )
}

// Plays only while on screen, so a page of clips doesn't decode them all at once.
function Clip({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.35 },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="metadata" />
}
