import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../components/page'
import { formatDate, getReleases } from '../releases'

export const Route = createFileRoute('/changelog')({
  loader: () => getReleases(),
  head: () => ({ meta: [{ title: 'Changelog · Lumen' }] }),
  component: Changelog,
})

function Changelog() {
  const releases = Route.useLoaderData()
  return (
    <main>
      <PageHeader label="Changelog" title="What's new in Lumen." lede="Every release, newest first." />
      <section className="band band--tight">
        <div className="wrap">
          {releases.map((r, i) => (
            <article key={r.version} className="release">
              <div className="release__meta">
                <h2 className="release__version">{r.version}</h2>
                <p>{formatDate(r.date)}</p>
                {i === 0 && <p className="release__latest">Latest</p>}
              </div>
              <div className="release__notes prose-lumen" dangerouslySetInnerHTML={{ __html: r.notesHtml }} />
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
