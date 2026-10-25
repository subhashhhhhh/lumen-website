import { createFileRoute } from '@tanstack/react-router'
import { seo } from '../seo'
import { PageHeader } from '../components/page'
import { CERT_SHA256, formatDate, formatSize, getLatestRelease } from '../releases'
import { GITHUB_URL } from '../site'

export const Route = createFileRoute('/download')({
  loader: () => getLatestRelease(),
  head: () =>
    seo({
      title: 'Download Lumen',
      description: 'Get the latest Lumen for Android 11 and later: signed APKs with checksums, install steps and in-app updates. Free and open source.',
      path: '/download',
      card: 'download',
      alt: 'Download Lumen. It\'s free. With the Library and a person\'s page on two phones',
    }),
  component: Download,
})

const ABI_INFO: Record<string, string> = {
  'arm64-v8a': 'Almost every phone from the last eight years. Pick this one if you are not sure.',
  'armeabi-v7a': 'Older phones with a 32-bit processor.',
  x86_64: 'Emulators and Chromebooks. Subtitles do not work on this version.',
  universal: 'All of the above in one larger file.',
}

function Download() {
  const release = Route.useLoaderData()
  if (!release) return <Unavailable />
  const [main, ...others] = release.apks
  return (
    <main>
      <PageHeader
        label="Download"
        title={
          <>
            Lumen <em>{release.version}</em>
          </>
        }
        lede={
          <>
            Released {formatDate(release.date)}. Android 11 or later. <a className="inline-link" href="/changelog">What's new</a>
          </>
        }
      />

      <section className="band band--tight">
        <div className="wrap">
          <div className="dl-main">
            <div>
              <h2 className="h2">{main.abi}</h2>
              <p className="body">{ABI_INFO[main.abi]}</p>
            </div>
            <a className="button" href={main.url}>
              Download · {formatSize(main.size)}
            </a>
          </div>
          <div className="dl-list">
            {others.map((apk) => (
              <div key={apk.name} className="dl-row">
                <div>
                  <p className="dl-row__abi">{apk.abi}</p>
                  <p className="dl-row__info">{ABI_INFO[apk.abi]}</p>
                </div>
                <a className="button button--ghost" href={apk.url}>
                  {formatSize(apk.size)}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--deep band--tight">
        <div className="wrap doc">
          <h2 className="h2">Install it</h2>
          <ol className="steps">
            <li>Download the APK on your phone.</li>
            <li>Open it. If Android asks, allow your browser or file manager to install apps.</li>
            <li>Tap Install, then open Lumen and follow the first setup.</li>
          </ol>
          <h2 className="h2">Updates</h2>
          <p className="body">
            Lumen checks GitHub for a new version once a day and installs it when you agree, in Settings, then About,
            then Software Update. You can turn the check off. If you prefer, add{' '}
            <code>{GITHUB_URL.replace('https://', '')}</code> to Obtainium instead.
          </p>
          <p className="body">
            F-Droid, IzzyOnDroid and Google Play are on the <a className="inline-link" href="/roadmap/">roadmap</a>.
          </p>
        </div>
      </section>

      <section className="band band--tight">
        <div className="wrap doc">
          <h2 className="h2">Check that it is really Lumen</h2>
          <p className="body">
            Every release is signed with the same key. Before you install, you can check that the APK carries this
            certificate. Use AppVerifier on your phone, or <code>apksigner verify --print-certs</code> on a computer.
          </p>
          <pre className="code">SHA-256 {CERT_SHA256}</pre>
          <p className="body">To check that the file downloaded correctly, compare its SHA-256 checksum:</p>
          <div className="sums">
            {release.apks.map((apk) => (
              <div key={apk.name}>
                <span className="sums__name">{apk.name}</span>
                <span className="sums__hash">{apk.sha256 ?? 'see SHA256SUMS.txt on GitHub'}</span>
              </div>
            ))}
          </div>
          <p className="body body--small">
            Older versions and the source code are on <a className="inline-link" href={release.url}>GitHub</a>.
          </p>
        </div>
      </section>
    </main>
  )
}

/** GitHub couldn't be reached: send people straight to the releases page. */
function Unavailable() {
  return (
    <main>
      <PageHeader
        label="Download"
        title="Get Lumen on GitHub."
        lede={
          <>
            The release list didn't load just now. Every release, with its checksums, is on{' '}
            <a className="inline-link" href={`${GITHUB_URL}/releases/latest`}>
              GitHub
            </a>
            .
          </>
        }
      />
    </main>
  )
}
