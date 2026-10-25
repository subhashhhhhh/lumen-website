const SITE = 'https://lumen-photos.app'

/**
 * A page's title and link preview (Open Graph and X): what WhatsApp, Telegram, Signal and others
 * show when its address is shared. Cards are 1200×630, made by `npm run og`.
 */
export function seo({ title, description, path, card, alt }: { title: string; description: string; path: string; card: string; alt: string }) {
  const url = SITE + path
  const image = `${SITE}/og/${card}.jpg`
  return {
    meta: [
      { title },
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: image },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: alt },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      { name: 'twitter:image:alt', content: alt },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}
