import { createFileRoute } from '@tanstack/react-router'
import { PageHeader } from '../components/page'
import { GITHUB_URL } from '../site'

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [{ title: 'Privacy policy · Lumen' }] }),
  component: Privacy,
})

const PERMISSIONS: [string, string][] = [
  ['Photos and videos', 'To show the photos and videos on your phone.'],
  ['All files access (optional)', 'To show hidden files and folders, and to change favorites quickly.'],
  ['Media management (optional)', 'To delete photos and mark favorites without a question from Android each time.'],
  ['Location in photos', 'To read where a photo was taken from the photo itself. Lumen never asks for your location.'],
  ['Notifications', 'To show the progress of a download or of indexing.'],
  ['Fingerprint or face', 'To unlock Hidden and App Lock. Android does the check; Lumen only gets the result.'],
  ['Install apps', 'To install a new version of Lumen from Software Update.'],
  ['Wallpaper', 'To set a photo as your wallpaper.'],
  ['Internet', 'Only for the three things in "When Lumen goes online".'],
]

function Privacy() {
  return (
    <main>
      <PageHeader
        label="Privacy policy"
        title={
          <>
            Lumen collects <em>nothing.</em>
          </>
        }
        lede="This page explains what Lumen keeps on your phone, the three times it goes online, and what this website does. Last updated 25 October 2026."
      />
      <section className="band band--tight">
        <div className="wrap doc">
          <h2 className="h2">The short version</h2>
          <p className="body">
            Lumen has no account, no ads, no analytics and no tracking. It does not send your photos, your faces, your
            search index or anything about how you use it to anyone, including the developer. There is no server that
            could receive it.
          </p>

          <h2 className="h2">What Lumen keeps on your phone</h2>
          <p className="body">
            To make search, Live Text and People work, Lumen stores these in its own private app storage:
          </p>
          <ul className="list">
            <li>A search index: numbers that describe what is in each photo and video.</li>
            <li>The text read from your photos and videos, and where each line is.</li>
            <li>Face data and the names you give to people.</li>
            <li>Captions you write, subtitles you make, and your settings.</li>
          </ul>
          <p className="body">
            Other apps cannot read this storage. Uninstalling Lumen, or clearing its storage in Android's settings,
            deletes all of it. Removing a smart feature in Settings deletes its model, and removing Faces also deletes the people and their names.
          </p>

          <h2 className="h2">When Lumen goes online</h2>
          <p className="body">Lumen connects to the internet for these three things only:</p>
          <dl className="specs specs--wide">
            <div>
              <dt>Hugging Face</dt>
              <dd>
                Downloads the smart feature models when you turn a feature on. Hugging Face sees your IP address and
                which files are downloaded. If you add a Hugging Face token in Settings, it is sent only to Hugging
                Face.
              </dd>
            </div>
            <div>
              <dt>OpenFreeMap</dt>
              <dd>
                Loads map tiles when you open a photo's map. The tile server sees your IP address and the map area
                shown. Turn off Maps in Settings, then Photos &amp; Videos, then Location, and Lumen never contacts it.
              </dd>
            </div>
            <div>
              <dt>GitHub</dt>
              <dd>
                Checks for a new version of Lumen once a day, and downloads it if you choose to install it. GitHub
                sees your IP address. Turn off Check Automatically in Settings, then About, to stop the daily check.
              </dd>
            </div>
          </dl>
          <p className="body">
            None of these requests include your photos or any information from them. Each service handles your IP
            address under its own privacy policy.
          </p>

          <h2 className="h2">Permissions</h2>
          <dl className="specs specs--wide">
            {PERMISSIONS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <h2 className="h2">This website</h2>
          <p className="body">
            lumen-photos.app sets no cookies and loads nothing from other websites: the fonts, images and videos all
            come from this site. It is hosted on Cloudflare, which processes each request to deliver the page and to
            protect the site from attacks. The download links go to GitHub.
          </p>

          <h2 className="h2">Children</h2>
          <p className="body">Lumen collects no data from anyone, including children.</p>

          <h2 className="h2">Changes and contact</h2>
          <p className="body">
            If this policy changes, the new version will be on this page with a new date. Lumen is open source, so you
            can check all of the above in the <a className="inline-link" href={GITHUB_URL}>source code</a>. For
            questions, open an issue on <a className="inline-link" href={`${GITHUB_URL}/issues`}>GitHub</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
