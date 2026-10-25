import { createFileRoute } from '@tanstack/react-router'
import { Streak } from '../components/flare'
import { Phone } from '../components/phone'
import { useReveal } from '../components/reveal'
import { GITHUB_URL } from '../site'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  useReveal()
  return (
    <main>
      <Hero />
      <Wall />
      <Search />
      <LiveText />
      <People />
      <More />
      <Privacy />
      <Film />
      <Faq />
      <GetIt />
    </main>
  )
}

// A section's label row: number and name in mono, then a hairline to the edge.
function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="label reveal">
      <span className="label__n">{n}</span>
      {children}
    </p>
  )
}

// The facts under a feature, in mono, like a spec sheet.
function Specs({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="specs reveal">
      {rows.map(([k, v]) => (
        <div key={k}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="label reveal">A gallery for Android</p>
          <h1 className="hero__title reveal">
            Your photos, <em>smarter.</em> And they never leave your phone.
          </h1>
          <p className="lede reveal">
            Lumen finds a photo when you describe it, reads the text in your pictures, and groups the people in them.
            Google Photos does this on Google's servers. Lumen does it on your phone.
          </p>
          <div className="actions reveal">
            <a className="button" href="/download">
              Download the APK
            </a>
            <a className="button button--ghost" href={GITHUB_URL}>
              Source code
            </a>
          </div>
          <p className="hero__meta reveal">Android 11+ · Apache 2.0 · No Google Play services</p>
        </div>
        <div className="hero__phone">
          <Phone video="/media/library.mp4" poster="/media/library.jpg" label="Lumen's photo library, scrolling" />
        </div>
      </div>
      <Streak className="hero__streak" />
    </section>
  )
}

// Two rows of real photos drifting in opposite directions: the library the rest of the page searches.
function Wall() {
  const photos = Array.from({ length: 19 }, (_, i) => `/wall/${i}.jpg`)
  const rows = [photos.slice(0, 10), photos.slice(9)]
  return (
    <section className="wall" aria-hidden="true">
      {rows.map((row, r) => (
        <div key={r} className={`wall__row ${r ? 'wall__row--back' : ''}`}>
          {[...row, ...row].map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" width={180} height={180} />
          ))}
        </div>
      ))}
    </section>
  )
}

function Search() {
  return (
    <section id="features" className="band">
      <div className="wrap">
        <Label n="01">Smart Search</Label>
        <div className="split">
          <div className="split__copy">
            <h2 className="title reveal">
              Find any photo by <em>describing</em> it.
            </h2>
            <p className="query reveal" aria-hidden="true">
              <span className="query__text">cat sleeping on a chair</span>
            </p>
            <p className="body reveal">
              Type what you remember. Lumen looks at what is in each photo, not at its name, so a few words find the
              picture you mean.
            </p>
            <ul className="tips reveal">
              <li>
                <code>"so baby come light me up"</code> exact words, in photos and videos
              </li>
              <li>
                <code>mai and daniel</code> photos with both of them
              </li>
              <li>
                <code>djokovic</code> famous faces, no setup
              </li>
            </ul>
            <Specs
              rows={[
                ['Model', 'SigLIP 2, or CLIP on smaller phones'],
                ['Runs on', "Your phone's GPU"],
                ['Sends', 'Nothing'],
              ]}
            />
          </div>
          <div className="split__phone">
            <Phone video="/media/search.mp4" poster="/media/search.jpg" label="Searching for 'cat sleeping on a chair'" />
          </div>
        </div>
      </div>
    </section>
  )
}

function LiveText() {
  return (
    <section className="band band--paper">
      <div className="wrap">
        <Label n="02">Live Text</Label>
        <div className="split split--flip">
          <div className="split__phone">
            <Phone video="/media/livetext.mp4" poster="/media/livetext.jpg" label="Selecting text on a restaurant menu" />
          </div>
          <div className="split__copy">
            <h2 className="title reveal">
              Select the words in <em>any</em> photo.
            </h2>
            <p className="body reveal">
              Long-press a word, drag to select more, then copy, search or share it. Links, phone numbers and email
              addresses open with a tap. Pause a video and its text is selectable too.
            </p>
            <p className="body reveal">
              The same text makes your screenshots, receipts and signs searchable. Put words in quotes to find an exact
              phrase.
            </p>
            <Specs
              rows={[
                ['Model', 'PP-OCRv6'],
                ['Reads', 'While your phone charges, once'],
                ['Sends', 'Nothing'],
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

const PEOPLE = ['Mai', 'Daniel', 'Ananya', 'Sofia']

function People() {
  return (
    <section className="band">
      <div className="wrap">
        <Label n="03">People</Label>
        <div className="split">
          <div className="split__copy">
            <h2 className="title reveal">
              Everyone you know, found <em>on your phone.</em>
            </h2>
            <p className="body reveal">
              Lumen groups the faces in your photos and videos into people. Name someone once, and every photo of them
              is one tap or one search away.
            </p>
            <ul className="faces reveal">
              {PEOPLE.map((name, i) => (
                <li key={name} style={{ transitionDelay: `${120 + i * 70}ms` }}>
                  <img src={`/faces/${i}.jpg`} alt="" width={120} height={120} />
                  <span>{name}</span>
                </li>
              ))}
            </ul>
            <Specs
              rows={[
                ['Models', 'YuNet and SFace'],
                ['Faces stored', 'On your phone only'],
                ['Sends', 'Nothing'],
              ]}
            />
          </div>
          <div className="split__phone">
            <Phone video="/media/people.mp4" poster="/media/people.jpg" label="Opening Mai's page from Collections" />
          </div>
        </div>
      </div>
    </section>
  )
}

const MORE = [
  { title: 'Details, one swipe up', text: 'Camera, lens, time zone, a map of where it was taken, and who is in it.' },
  { title: 'Film strip', text: 'Skim through everything with a strip of thumbnails under the photo.' },
  { title: 'Subtitles, made offline', text: 'Tap CC on a video to make subtitles. Copy them or save them as SRT.' },
  { title: 'Hidden and encrypted', text: 'Keep private photos behind a lock, encrypted on your storage.' },
  { title: 'Indexes while you sleep', text: 'Pick overnight hours, and Lumen does its work while the phone is idle.' },
  { title: 'Liquid Glass', text: 'Glass buttons and bars that bend the photo behind them. Turn it off any time.' },
]

function More() {
  return (
    <section className="band band--deep">
      <div className="wrap">
        <Label n="04">And the rest</Label>
        <h2 className="title title--wide reveal">
          Everything a gallery should do, <em>without the cloud.</em>
        </h2>
        <div className="grid">
          {MORE.map((card, i) => (
            <article key={card.title} className="card reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
              <span className="card__n">{String(i + 1).padStart(2, '0')}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const NETWORK = [
  { host: 'huggingface.co', what: 'Smart feature models', when: 'once, when you turn a feature on' },
  { host: 'tiles.openfreemap.org', what: 'Map tiles', when: 'when you open a map (can be turned off)' },
  { host: 'github.com', what: 'Update check', when: 'once a day, and the update itself if you install it (can be turned off)' },
]

function Privacy() {
  return (
    <section id="privacy" className="band">
      <div className="wrap">
        <Label n="05">Privacy</Label>
        <p className="statements reveal">
          No account. No Google. No cloud. <em>Nothing leaves your phone.</em>
        </p>
        <div className="split split--even">
          <div className="split__copy">
            <p className="body reveal">
              Lumen does not use Google Play services, so it works on GrapheneOS, CalyxOS and phones without Google
              apps. It has no ads, no analytics and no tracking.
            </p>
            <p className="body reveal">Lumen goes online for three things, each of which you can see and control. There are no others.</p>
          </div>
          <div className="log reveal" role="table" aria-label="Everything Lumen goes online for">
            <p className="log__head">
              <span>Goes online for</span>
              <span>3 things</span>
            </p>
            {NETWORK.map((row) => (
              <div key={row.host} className="log__row" role="row">
                <span className="log__host" role="cell">
                  {row.host}
                </span>
                <span className="log__what" role="cell">
                  {row.what}, {row.when}
                </span>
              </div>
            ))}
            <p className="log__foot">Your photos, faces and search index: never.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Film() {
  return (
    <section className="band band--deep">
      <div className="wrap">
        <Label n="06">The film</Label>
        <div className="film reveal">
          <video src="/media/launch.mp4" poster="/media/launch.jpg" controls playsInline preload="none" />
        </div>
      </div>
    </section>
  )
}

const FAQ: [string, React.ReactNode][] = [
  [
    'Is it on F-Droid or Google Play?',
    <>
      Not yet. Lumen is on GitHub today, and it updates itself. F-Droid and IzzyOnDroid come first, then Google Play.
      See the <a className="inline-link" href="/roadmap">roadmap</a>.
    </>,
  ],
  [
    'Does it work on GrapheneOS and CalyxOS?',
    'It should: Lumen does not need Google Play services or any Google app. It has not been tested on a Pixel yet. If the smart features cannot use the graphics chip there, they fall back to the processor, which is slower. Please report what you see.',
  ],
  [
    'How much space do the smart features take?',
    'Each one is optional. All of them together are about 340 MB with the Fast search model, or 770 MB with the Accurate one. The app download itself is about 70 MB.',
  ],
  [
    'Will it drain my battery?',
    'No. By default Lumen reads your library only while the phone charges, or in overnight hours you choose, and it stops when the phone gets warm. After the first time, it only reads new photos.',
  ],
  [
    'Does it change or move my photos?',
    'No. Lumen shows the photos and videos already on your phone, in their folders. Favorites use Android\'s own favorite flag, so other gallery apps see them too.',
  ],
  ['Is there an iPhone version?', 'No. Lumen is made for Android.'],
  [
    'How is it free?',
    'Lumen is a personal open-source project under the Apache License 2.0. There are no ads, no paid tier and nothing to sell. It costs nothing to run because there is no server.',
  ],
  [
    'Can I use these features in my own app?',
    <>
      Yes. The search, text, face and subtitle engines are a separate library, <a className="inline-link" href="/ai">Lumen AI</a>,
      under the same license. It is at an early stage.
    </>,
  ],
]

function Faq() {
  return (
    <section className="band">
      <div className="wrap">
        <Label n="07">Questions</Label>
        <div className="faq">
          {FAQ.map(([q, a]) => (
            <details key={q} className="faq__item reveal">
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function GetIt() {
  return (
    <section className="band get">
      <div className="wrap get__inner">
        <img className="get__icon reveal" src="/brand/app-icon.png" alt="" width={112} height={112} />
        <div>
          <h2 className="title reveal">
            Get Lumen. <em>It's free.</em>
          </h2>
          <p className="body reveal">
            Download the APK from GitHub. Lumen updates itself, and every release is signed with the same key.
          </p>
          <div className="actions reveal">
            <a className="button" href="/download">
              Download the APK
            </a>
            <a className="button button--ghost" href={GITHUB_URL}>
              View on GitHub
            </a>
          </div>
        </div>
      </div>
      <Streak className="get__streak" />
    </section>
  )
}
