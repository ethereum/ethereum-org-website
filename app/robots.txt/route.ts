import { IS_PRODUCTION_DEPLOY, SITE_URL } from "@/lib/constants"

export const dynamic = "force-static"

// Hand-rolled rather than Next's robots.ts metadata route: MetadataRoute.Robots
// has no field for Content-Signal directives.
//
// The sitemap is sharded per locale via generateSitemaps() (app/sitemaps/sitemap.ts)
// and indexed by a <sitemapindex> at /sitemap.xml (app/sitemap.xml/route.ts). Point
// crawlers at that single index; it enumerates every per-locale shard.
const PRODUCTION = `User-Agent: *
Allow: /

# Content Signals (https://contentsignals.org). Site content is MIT-licensed,
# so every declared use is permitted.
Content-Signal: ai-train=yes, search=yes, ai-input=yes

Host: ${SITE_URL}
Sitemap: ${SITE_URL}/sitemap.xml
`

const NON_PRODUCTION = `User-Agent: *
Disallow: /

Host: ${SITE_URL}
`

export const GET = () =>
  new Response(IS_PRODUCTION_DEPLOY ? PRODUCTION : NON_PRODUCTION, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  })
