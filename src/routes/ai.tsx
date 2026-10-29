import { createFileRoute } from '@tanstack/react-router'
import { seo } from '../seo'
import { PageHeader } from '../components/page'

export const Route = createFileRoute('/ai')({
  head: () =>
    seo({
      title: 'Lumen AI · Smart photo features for Android apps',
      description: 'An Android library for on-device search by description, text in photos and videos, people and subtitles. On Maven Central, Apache 2.0.',
      path: '/ai/',
      card: 'ai',
      alt: 'Lumen AI: smart photo features for your Android app, with a code example',
    }),
  component: LumenAiGuide,
})

const REPO = 'https://github.com/subhashhhhhh/lumen-ai'

function Code({ children }: { children: string }) {
  return <pre className="code code--block">{children.trim()}</pre>
}

const SECTIONS = [
  ['setup', 'Set up'],
  ['models', 'Models'],
  ['indexing', 'Indexing'],
  ['search', 'Search'],
  ['live-text', 'Live Text'],
  ['people', 'People'],
  ['labels', 'Labels and suggestions'],
  ['subtitles', 'Subtitles'],
  ['host', 'Full control'],
  ['engine', 'The engine'],
  ['privacy', 'Privacy and permissions'],
] as const

function LumenAiGuide() {
  return (
    <main>
      <PageHeader
        label="Lumen AI"
        title={
          <>
            Smart photo features for <em>your Android app.</em>
          </>
        }
        lede={
          <>
            Search by description, text in photos and videos, people, labels and subtitles. All of it runs on the
            phone. Lumen AI is the engine of Lumen, as a library. It is at an early stage: the API can change before
            version 1.0.
          </>
        }
      />
      <section className="band band--tight">
        <div className="wrap guide">
          <nav className="guide__toc" aria-label="On this page">
            <p className="guide__toc-title">On this page</p>
            {SECTIONS.map(([id, name]) => (
              <a key={id} href={`#${id}`}>
                {name}
              </a>
            ))}
            <p className="guide__toc-title">More</p>
            <a href="/ai/reference/">API reference</a>
            <a href={REPO}>Source code</a>
            <a href={`${REPO}/tree/main/sample`}>Sample app</a>
          </nav>

          <div className="doc guide__body">
            <h2 className="h2" id="setup">Set up</h2>
            <p className="body">Lumen AI is on Maven Central. Add it to the build file of your app:</p>
            <Code>{`
dependencies {
    implementation("app.lumen-photos:lumen-ai:0.1.7")
}
`}</Code>
            <p className="body">
              Then install Lumen AI in <code>Application.onCreate</code>. Background work starts in its own process,
              so install it before any other code runs. With no settings, Lumen AI indexes every photo and video on the
              phone.
            </p>
            <Code>{`
class App : Application() {
    override fun onCreate() {
        super.onCreate()
        LumenAi.install(this)
        LumenAi.indexing.start(this)
    }
}
`}</Code>
            <p className="body">Change any default in the install block:</p>
            <Code>{`
LumenAi.install(this) {
    searchModel = SearchModel.Fast          // 240 MB instead of 670 MB
    indexSchedule = IndexSchedule(60, 420)  // 1:00 to 7:00, plugged in or not
    notificationIcon = R.drawable.ic_notification
    library = { context -> myOwnMediaList(context) }
}
`}</Code>
            <p className="body">
              Your app asks for the media permissions itself (<code>READ_MEDIA_IMAGES</code>,{' '}
              <code>READ_MEDIA_VIDEO</code>, and <code>POST_NOTIFICATIONS</code> for progress).
            </p>

            <h2 className="h2" id="models">Models</h2>
            <p className="body">
              The library does not include the models. Each feature downloads its own when the user turns it on, from a
              fixed commit on Hugging Face. Lumen AI checks every file with SHA-256 before it uses it. A download
              shows a progress notification, and indexing starts when it is done.
            </p>
            <dl className="specs specs--wide">
              <div>
                <dt>ModelPack.Search</dt>
                <dd>Smart Search, labels and suggestions. 670 MB (Accurate) or 240 MB (Fast).</dd>
              </div>
              <div>
                <dt>ModelPack.Text</dt>
                <dd>Text in photos and videos, and Live Text. 23 MB.</dd>
              </div>
              <div>
                <dt>ModelPack.Faces</dt>
                <dd>People. 15 MB (EdgeFace), or AdaFace on a Snapdragon NPU.</dd>
              </div>
              <div>
                <dt>ModelPack.Subtitles</dt>
                <dd>Subtitles. 18 MB. ARM phones only.</dd>
              </div>
            </dl>
            <Code>{`
LumenAi.models.download(context, ModelPack.Search)            // Wi-Fi only by default
LumenAi.models.status(context, ModelPack.Search)              // NotDownloaded, Queued, Downloading, Ready…
LumenAi.models.progress.collect { state -> /* show it */ }
LumenAi.models.remove(context, ModelPack.Faces)               // also deletes people and names
`}</Code>

            <h2 className="h2" id="indexing">Indexing</h2>
            <p className="body">
              Lumen AI indexes the library in the background: while the phone charges by default, or in the hours you
              set. It works in short jobs and stops when the phone gets warm or the battery is low. After the first
              index, it only reads new photos and videos.
            </p>
            <Code>{`
LumenAi.indexing.start(context)      // make sure it is scheduled; call at app start
LumenAi.indexing.runNow(context)     // index the newest items now
LumenAi.indexing.progress.collect { status ->
    // status.search, status.text, status.faces: indexed of total, or null
}
`}</Code>

            <h2 className="h2" id="search">Search</h2>
            <p className="body">
              One call searches the library the way Lumen does. It uses the features that are downloaded.
            </p>
            <Code>{`
val results = LumenAi.search(context, "cat sleeping on a chair")
results.items          // media ids, best first, each once
results.people         // people whose names match: show them as a row
results.unnamedSubject // a person not named yet who is in most matches
`}</Code>
            <ul className="list">
              <li>
                Words in quotes, like <code>"so baby come light me up"</code>, find that exact phrase in the text of
                photos and videos.
              </li>
              <li>
                Two or more names, like <code>mai and daniel</code>, find the photos with all of those people.
              </li>
              <li>Other searches show photos whose text has the words first, then Smart Search's matches.</li>
            </ul>

            <h2 className="h2" id="live-text">Live Text</h2>
            <p className="body">
              Get the lines of text in a photo, with the position of each line and character, to let users select and
              copy words. Indexed photos return at once. Other photos are read now, in about a second, and kept.
            </p>
            <Code>{`
val text = LumenAi.liveText(context, item) ?: return   // null: no text
for (line in text.lines) {
    line.text      // "Crispy Arancini"
    line.corners   // the line's four corners, in pixels of text.width × text.height
}
val frame = LumenAi.liveText(context, video, atMs = 12_500)   // a paused video
`}</Code>

            <h2 className="h2" id="people">People</h2>
            <p className="body">
              Lumen AI finds the faces in photos and videos and groups them into people. Users can name, merge and hide
              them.
            </p>
            <Code>{`
val people = LumenAi.people.all(context)
val avatar = LumenAi.people.faceImage(context, people.first())   // a JPEG file
LumenAi.people.name(context, person, "Mai")
LumenAi.people.merge(context, keep = mai, gone = duplicate)
LumenAi.people.inMedia(context, mediaId)
`}</Code>

            <h2 className="h2" id="labels">Labels and suggestions</h2>
            <p className="body">
              Labels are words that describe a photo. Suggestions are things the library has many photos of, for a
              search screen. Both need Smart Search.
            </p>
            <Code>{`
LumenAi.labels(context, mediaId)       // ["cat", "sofa"]
LumenAi.suggestions(context)           // [Suggestion("tennis", coverId), …]
`}</Code>

            <h2 className="h2" id="subtitles">Subtitles</h2>
            <p className="body">
              Make subtitles for a video. The flow sends all cues so far as each part is done, and made parts are
              kept.
            </p>
            <Code>{`
LumenAi.subtitles(context, video).collect { cues -> show(cues) }
val srt = cues.toSrt()
val vtt = cues.toVtt()
`}</Code>

            <h2 className="h2" id="host">Full control</h2>
            <p className="body">
              For full control, implement <code>LumenAiHost</code> and install it instead. Lumen does this to read its
              settings live and to give Lumen AI its encrypted Hidden videos.
            </p>
            <Code>{`
LumenAi.install(object : LumenAiHost {
    override suspend fun library(context: Context): List<MediaRef> = …
    override fun videoSource(context: Context, item: MediaRef): MediaDataSource? = …
    override val settings: AiSettings = …
    override val notifications: AiNotifications = …
})
`}</Code>

            <h2 className="h2" id="engine">The engine</h2>
            <p className="body">
              The stores, indexers and readers behind these calls are public, but marked{' '}
              <code>@LumenAiEngine</code>. To use them, opt in. Their API can change in any release.
            </p>
            <Code>{`
kotlin {
    compilerOptions { optIn.add("com.subhashh.lumen.ai.LumenAiEngine") }
}
`}</Code>

            <h2 className="h2" id="privacy">Privacy and permissions</h2>
            <p className="body">
              Lumen AI does all of its work on the phone. It goes online only to download models, from Hugging Face. It
              does not use Google Play services, and it removes the telemetry provider of ONNX Runtime. It adds these
              permissions for downloads: <code>INTERNET</code>, <code>ACCESS_NETWORK_STATE</code>,{' '}
              <code>RUN_USER_INITIATED_JOBS</code>, <code>FOREGROUND_SERVICE</code> and{' '}
              <code>FOREGROUND_SERVICE_DATA_SYNC</code>. An app that imports models by hand can remove them with{' '}
              <code>tools:node="remove"</code>.
            </p>
            <p className="body">
              Lumen AI is free and open source under the Apache License 2.0. The models have their own licenses:
              see the <a className="inline-link" href={`${REPO}#credits`}>credits</a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
