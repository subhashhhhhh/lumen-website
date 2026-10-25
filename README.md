# lumen-photos.app

The website of [Lumen](https://github.com/subhashhhhhh/Lumen), the private smart gallery for
Android, and of [Lumen AI](https://github.com/subhashhhhhh/lumen-ai), its on-device AI library.

Live at **https://lumen-photos.app**.

## How it is made

- [TanStack Start](https://tanstack.com/start) with React, on [Cloudflare Workers](https://developers.cloudflare.com/workers/).
- Most pages are rendered to plain HTML when the site is built.
- The Download and Changelog pages render on the Worker. They read Lumen's releases from GitHub
  and keep them in Cloudflare's cache for 10 minutes, so a new release shows up without a new
  deploy.
- The site sets no cookies and loads nothing from other websites. The fonts, images and videos
  all come from the site itself.

## Run it

You need Node.js 22 or later.

```sh
npm install
npm run dev        # http://localhost:3000
npm run build      # the production build
```

Each push to `main` deploys to Cloudflare through Workers Builds.

## Lumen AI's API reference

The pages in `public/ai/reference` are made by Dokka from the Lumen AI source code. To update them
after a Lumen AI release, put the `lumen-ai` repository next to this one, then run:

```sh
npm run ai-reference
```

Commit the result.

## License

The code is under the Apache License 2.0. The screenshots, videos and photos show Lumen and its
demo library. The demo photos are CC0 (Wikimedia Commons) and the Pexels license.
