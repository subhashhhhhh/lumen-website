import { HeadContent, Link, Scripts, createRootRoute } from '@tanstack/react-router'
import appCss from '../styles.css?url'
import { GITHUB_URL } from '../site'


export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
      { name: 'theme-color', content: '#1b2644' },
      // Each page sets its own title and preview card (src/seo.ts).
      { property: 'og:site_name', content: 'Lumen' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      { rel: 'icon', type: 'image/png', href: '/brand/app-icon.png' },
      { rel: 'apple-touch-icon', href: '/brand/app-icon.png' },
    ],
    scripts: [
      {
        defer: true,
        src: 'https://analytics.fastlytics.app/script.js',
        'data-website-id': 'a753c0f1-1970-4274-9334-5fab910ea4c6',
      },
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
          <a href="/ai/">Lumen AI</a>
          <a href="/roadmap/">Roadmap</a>
          <a href="/changelog">Changelog</a>
          <a className="nav__icon" href={GITHUB_URL} data-umami-event="github" data-umami-event-place="nav" aria-label="Lumen on GitHub" title="GitHub">
            <GitHubMark />
          </a>
          <a className="nav__cta" href="/download" data-umami-event="download-cta" data-umami-event-place="nav">
            Download
          </a>
          <details className="nav__menu">
            <summary aria-label="Menu">
              <span />
              <span />
            </summary>
            <div className="nav__sheet">
              <a href="/#features">Features</a>
              <a href="/ai/">Lumen AI, for developers</a>
              <a href="/roadmap/">Roadmap</a>
              <a href="/changelog">Changelog</a>
              <a href="/privacy/">Privacy policy</a>
              <a href={GITHUB_URL} data-umami-event="github" data-umami-event-place="menu">GitHub</a>
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
          <a href="/roadmap/">Roadmap</a>
          <a href="/ai/">Lumen AI</a>
          <a href="/privacy/">Privacy policy</a>
          <a href={GITHUB_URL} data-umami-event="github" data-umami-event-place="footer">Source code</a>
          <a href={`${GITHUB_URL}/issues`} data-umami-event="report-bug">Report a bug</a>
        </p>
        <p className="footer__fine">
          Google Photos is a trademark of Google LLC. iPhone is a trademark of Apple Inc. Lumen is not affiliated
          with either.
        </p>
      </div>
    </footer>
  )
}

/** GitHub's mark (path from Simple Icons, CC0), in the nav's text colour. */
function GitHubMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}
