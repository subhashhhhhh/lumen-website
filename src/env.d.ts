// Worker secrets (npx wrangler secret put NAME); optional ones may be missing.
declare namespace Cloudflare {
  interface Env {
    /** Read-only GitHub token for the release list (see src/releases.ts). */
    GITHUB_TOKEN?: string
  }
}
