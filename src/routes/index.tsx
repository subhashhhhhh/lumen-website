import { createFileRoute } from '@tanstack/react-router'
import { Phone } from '../components/phone'
import { useReveal } from '../components/reveal'
import { DOWNLOAD_URL, GITHUB_URL } from '../site'

export const Route = createFileRoute('/')({ component: Home })

const PEOPLE = ['Mai', 'Daniel', 'Ananya', 'Sofia']

function Home() {
  useReveal()
  return (
    <main>
      <Hero />
      <Search />
      <LiveText />
      <People />
      <More />
      <Privacy />
      <Film />
      <GetIt />
    </main>
  )
}

function Hero() {
  return (
    <section className="hero">
      <p className="eyebrow reveal">Lumen for Android</p>
      <h1 className="hero__title reveal">
        The smart gallery
        <br />
        that stays on your phone.
      </h1>
      <p className="hero__lede reveal">
        Find a photo by describing it. Copy the text in any picture. See everyone you know, grouped by face. All of
        it runs on your phone, with no account and no cloud.
      </p>
      <div className="actions reveal">
        <a className="button" href={DOWNLOAD_URL}>
          Download
        </a>
        <a className="more-link" href={GITHUB_URL}>
          View the source code
        </a>
      </div>
      <p className="hero__meta reveal">Android 11 and later · Free · Open source</p>
      <div className="hero__phone">
        <Phone video="/media/library.mp4" poster="/media/library.jpg" label="Lumen's photo library, scrolling" />
      </div>
    </section>
  )
}

function Search() {
  return (
    <section id="search" className="band band--dark">
      <div className="center">
        <p className="eyebrow reveal">Smart Search</p>
        <h2 className="title reveal">Find any photo by describing it.</h2>
        <p className="query reveal" aria-hidden="true">
          <span className="query__text">cat sleeping on a chair</span>
        </p>
      </div>
      <div className="split split--phone-right">
        <div className="split__copy">
          <p className="body reveal">
            Type what you remember. Lumen looks at what is in each photo, not at its file name, so a few words find the
            picture you mean. The search model runs on your phone's graphics chip, and your photos stay where they are.
          </p>
          <ul className="tips reveal">
            <li>
              <code>"so baby come light me up"</code>
              <span>Quotes find the exact words in photos and videos.</span>
            </li>
            <li>
              <code>mai and daniel</code>
              <span>Two names find the photos with both people.</span>
            </li>
            <li>
              <code>djokovic</code>
              <span>Famous faces work with no setup.</span>
            </li>
          </ul>
        </div>
        <div className="split__phone">
          <Phone video="/media/search.mp4" poster="/media/search.jpg" label="Searching for 'cat sleeping on a chair'" />
        </div>
      </div>
    </section>
  )
}

function LiveText() {
  return (
    <section className="band band--gray">
      <div className="split split--phone-left">
        <div className="split__phone">
          <Phone video="/media/livetext.mp4" poster="/media/livetext.jpg" label="Selecting text on a restaurant menu" />
        </div>
        <div className="split__copy">
          <p className="eyebrow reveal">Live Text</p>
          <h2 className="title title--left reveal">Select the words in any photo.</h2>
          <p className="body reveal">
            Long-press a word, drag to select more, then copy, search or share it. Links, phone numbers and email
            addresses open with a tap. Pause a video and you can select its text too.
          </p>
          <p className="body body--quiet reveal">
            Lumen reads the text in your photos while your phone charges, so Live Text is ready the moment you open
            one. The same text makes your screenshots, receipts and signs searchable.
          </p>
        </div>
      </div>
    </section>
  )
}

function People() {
  return (
    <section className="band">
      <div className="split split--phone-right">
        <div className="split__copy">
          <p className="eyebrow reveal">People</p>
          <h2 className="title title--left reveal">Everyone you know. Found on your phone.</h2>
          <p className="body reveal">
            Lumen groups the faces in your photos and videos into people. Give someone a name once, and every photo of
            them is one tap or one search away. Their faces are never uploaded anywhere.
          </p>
          <ul className="faces reveal">
            {PEOPLE.map((name, i) => (
              <li key={name} style={{ transitionDelay: `${120 + i * 70}ms` }}>
                <img src={`/faces/${i}.jpg`} alt="" width={120} height={120} />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="split__phone">
          <Phone video="/media/people.mp4" poster="/media/people.jpg" label="Opening Mai's page from Collections" />
        </div>
      </div>
    </section>
  )
}

const MORE = [
  { title: 'Details, one swipe up', text: 'Camera, lens, time zone, a map of where it was taken, and the people in it.' },
  { title: 'Film strip', text: 'Skim through everything with a strip of thumbnails under the photo.' },
  { title: 'Subtitles, made offline', text: 'Tap CC on a video to make subtitles. Copy them or save them as SRT.' },
  { title: 'Hidden and encrypted', text: 'Hide private photos behind a lock, and encrypt them on your storage.' },
  { title: 'Indexes while you sleep', text: 'Choose overnight hours, and Lumen does its work while you are not using your phone.' },
  { title: 'Liquid Glass', text: 'Glass buttons and bars that bend the photo behind them. Turn it off any time.' },
]

function More() {
  return (
    <section className="band band--gray">
      <div className="center">
        <h2 className="title reveal">And a lot more.</h2>
      </div>
      <div className="grid">
        {MORE.map((card, i) => (
          <article key={card.title} className="card reveal" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

const NETWORK = [
  { what: 'Smart feature models', where: 'Hugging Face', when: 'Once, when you turn a feature on' },
  { what: 'Map tiles', where: 'OpenFreeMap', when: 'When you open a map. You can turn maps off.' },
  { what: 'Update check', where: 'GitHub', when: 'Once a day. You can turn it off.' },
]

function Privacy() {
  return (
    <section id="privacy" className="band band--dark">
      <div className="center">
        <p className="eyebrow reveal">Privacy</p>
        <div className="statements">
          <p className="reveal">No account.</p>
          <p className="reveal">No Google.</p>
          <p className="reveal">No cloud.</p>
          <p className="reveal statements__last">Nothing leaves your phone.</p>
        </div>
        <p className="body body--center reveal">
          Lumen does not use Google Play services, so it works on GrapheneOS, CalyxOS and phones without Google apps.
          It has no ads, analytics or tracking. It goes online only for these three things:
        </p>
      </div>
      <div className="network reveal">
        {NETWORK.map((row) => (
          <div key={row.what} className="network__row">
            <span className="network__what">{row.what}</span>
            <span className="network__where">{row.where}</span>
            <span className="network__when">{row.when}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Film() {
  return (
    <section className="band">
      <div className="center">
        <h2 className="title reveal">See it move.</h2>
      </div>
      <div className="film reveal">
        <video src="/media/launch.mp4" poster="/media/launch.jpg" controls playsInline preload="none" />
      </div>
    </section>
  )
}

function GetIt() {
  return (
    <section className="band band--gray get">
      <img className="get__icon reveal" src="/brand/app-icon.png" alt="" width={120} height={120} />
      <h2 className="title reveal">Get Lumen.</h2>
      <p className="body body--center reveal">
        Download the APK from GitHub. Lumen checks for updates itself, and every release is signed with the same key.
      </p>
      <div className="actions reveal">
        <a className="button" href={DOWNLOAD_URL}>
          Download for Android
        </a>
        <a className="more-link" href={GITHUB_URL}>
          View on GitHub
        </a>
      </div>
    </section>
  )
}
