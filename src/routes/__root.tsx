import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { DOWNLOAD_URL, GITHUB_URL } from '../site'

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
      { name: 'theme-color', content: '#ffffff' },
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
          <img src="/brand/app-icon.png" alt="" width={22} height={22} />
          Lumen
        </Link>
        <nav className="nav__links">
          <a href="/#search">Features</a>
          <a href="/#privacy">Privacy</a>
          <a href={GITHUB_URL}>GitHub</a>
          <a className="nav__cta" href={DOWNLOAD_URL}>
            Download
          </a>
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
          <a href={GITHUB_URL}>Source code</a>
          <a href={`${GITHUB_URL}/issues`}>Report a bug</a>
          <a href={DOWNLOAD_URL}>Releases</a>
        </p>
        <p className="footer__fine">
          Google Photos is a trademark of Google LLC. iPhone is a trademark of Apple Inc. Lumen is not affiliated
          with either.
        </p>
      </div>
    </footer>
  )
}
