import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { GITHUB_URL } from '../site'

const TITLE = 'Lumen: the smart gallery for Android'
const DESCRIPTION =
  'Search your photos by describing them, select text in any photo, and find people. Everything runs on your phone. No account, no Google, no cloud.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { title: TITLE },
      { name: 'description', content: DESCRIPTION },
      { name: 'theme-color', content: '#1b2644' },
      { property: 'og:title', content: TITLE },
      { property: 'og:description', content: DESCRIPTION },
      { property: 'og:image', content: 'https://lumen-photos.app/og.jpg' },
      { property: 'og:url', content: 'https://lumen-photos.app' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/brand/app-icon.png' },
      { rel: 'apple-touch-icon', href: '/brand/app-icon.png' },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Before first paint, so .reveal elements start hidden instead of flashing in and out. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <HeadContent />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Scripts />
      </body>
    </html>
  )
}

function Nav() {
  return (
    <header className="nav">
      <div className="nav__inner">
        <Link to="/" className="nav__brand">
          <img src="/brand/icon-96.png" alt="" width={30} height={30} />
          Lumen
        </Link>
        <nav className="nav__links">
          <a href="/#features">Features</a>
          <a href="/ai">Lumen AI</a>
          <a href="/roadmap">Roadmap</a>
          <a href="/changelog">Changelog</a>
          <a href={GITHUB_URL}>GitHub</a>
          <a className="nav__cta" href="/download">
            Download
          </a>
          <details className="nav__menu">
            <summary aria-label="Menu">
              <span />
              <span />
            </summary>
            <div className="nav__sheet">
              <a href="/#features">Features</a>
              <a href="/ai">Lumen AI, for developers</a>
              <a href="/roadmap">Roadmap</a>
              <a href="/changelog">Changelog</a>
              <a href="/privacy">Privacy policy</a>
              <a href={GITHUB_URL}>GitHub</a>
            </div>
          </details>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p>
          Lumen is free and open source under the Apache License 2.0. Made by{' '}
          <a href="https://github.com/subhashhhhhh">Subhash Gottumukkala</a>.
        </p>
        <p className="footer__links">
          <a href="/download">Download</a>
          <a href="/changelog">Changelog</a>
          <a href="/roadmap">Roadmap</a>
          <a href="/ai">Lumen AI</a>
          <a href="/privacy">Privacy policy</a>
          <a href={GITHUB_URL}>Source code</a>
          <a href={`${GITHUB_URL}/issues`}>Report a bug</a>
        </p>
        <p className="footer__fine">
          Google Photos is a trademark of Google LLC. iPhone is a trademark of Apple Inc. Lumen is not affiliated
          with either.
        </p>
      </div>
    </footer>
  )
}
