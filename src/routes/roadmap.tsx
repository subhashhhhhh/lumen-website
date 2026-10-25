import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../components/page'
import { GITHUB_URL } from '../site'

export const Route = createFileRoute('/roadmap')({
  head: () => ({ meta: [{ title: 'Roadmap · Lumen' }] }),
  component: Roadmap,
})

type Item = { title: string; text: string }

const GROUPS: { name: string; note: string; items: Item[] }[] = [
  {
    name: 'Next',
    note: 'What is being worked on now.',
    items: [
      {
        title: 'Offline edition',
        text: 'A second build with no internet permission at all. You download the model files on a computer, import them, and Lumen checks each one before use.',
      },
      {
        title: 'F-Droid and IzzyOnDroid',
        text: 'Lumen in the app stores that degoogled phones use, with reproducible builds.',
      },
      {
        title: 'Lumen AI 1.0 on Maven Central',
        text: 'Lumen\'s search, text, face and subtitle engines are a library other apps can use. It is on GitHub now, at an early stage.',
      },
      {
        title: 'More phones',
        text: 'Testing on Pixels with GrapheneOS, Samsung phones, Android 11 to 13, phones with less memory, and libraries of 50,000 photos or more.',
      },
    ],
  },
  {
    name: 'Planned',
    note: 'Decided, not started.',
    items: [
      {
        title: 'Spoken in Videos',
        text: 'Search what people say in your videos. A more accurate speech model also makes better subtitles.',
      },
      {
        title: 'Sounds',
        text: 'Find videos by the song in them. Lumen recognises the same song across your clips on the phone, and you name it once.',
      },
      {
        title: 'Lumen Lab',
        text: 'A benchmark app that tests how Lumen runs on your phone, including experimental NPU support. You can share the results, and see other phones on this site.',
      },
      {
        title: 'Google Play',
        text: 'For people who want updates through the Play Store. The GitHub and F-Droid builds stay.',
      },
    ],
  },
  {
    name: 'Later',
    note: 'Wanted, after the above.',
    items: [
      { title: 'Memories', text: 'Looking back at a day, a trip or a year.' },
      { title: 'Duplicates', text: 'Find duplicate photos and similar shots, and clean them up.' },
      { title: 'Basic editor', text: 'Crop, straighten and flip, saved as a copy or over the original.' },
      { title: 'Widget', text: 'A photo frame on your home screen with a photo from an album you choose.' },
      { title: 'App shortcuts', text: 'Long-press the icon to go straight to Search, Videos or Favorites.' },
      { title: 'Material 3 Expressive', text: 'An optional Android-style look, next to the current one.' },
      { title: 'Hindi and Telugu', text: 'Better search and text reading for Indian languages.' },
    ],
  },
]

const SHIPPED = [
  'Smart Search, text in photos and videos, People',
  'Live Text on photos and paused videos',
  'Offline subtitles',
  'Details sheet with maps',
  'Hidden, with encryption',
  'Scheduled indexing',
  'Liquid Glass and Reduce Blur settings',
  'In-app updates',
  'Lumen AI, the smart features as a library (early)',
]

function Roadmap() {
  return (
    <main>
      <PageHeader
        label="Roadmap"
        title={
          <>
            Where Lumen is <em>going.</em>
          </>
        }
        lede="Plans change, and there are no dates. If something matters to you, say so on GitHub."
      />
      <section className="band band--tight">
        <div className="wrap">
          {GROUPS.map((group) => (
            <div key={group.name} className="road">
              <div className="road__head">
                <h2 className="h2">{group.name}</h2>
                <p>{group.note}</p>
              </div>
              <div className="road__items">
                {group.items.map((item) => (
                  <article key={item.title} className="road__item">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
          <div className="road">
            <div className="road__head">
              <h2 className="h2">Shipped</h2>
              <p>
                In Lumen today. See the <a className="inline-link" href="/changelog">changelog</a>.
              </p>
            </div>
            <ul className="road__shipped">
              {SHIPPED.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <p className="body">
            Have an idea or need something? <a className="inline-link" href={`${GITHUB_URL}/issues`}>Open an issue</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
