import { Streak } from './flare'

// The top of every inner page: a mono label, a big title, a short lede, then the flare streak.
export function PageHeader({ label, title, lede }: { label: string; title: React.ReactNode; lede?: React.ReactNode }) {
  return (
    <header className="page-head">
      <div className="wrap">
        <p className="label">{label}</p>
        <h1 className="page-head__title">{title}</h1>
        {lede && <p className="lede">{lede}</p>}
      </div>
      <Streak className="page-head__streak" />
    </header>
  )
}
