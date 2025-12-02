import { NextRequest, NextResponse } from "next/server"
import createMiddleware from "next-intl/middleware"

import { routing } from "./src/i18n/routing"
import { DEFAULT_LOCALE } from "./src/lib/constants"

const handleI18nRouting = createMiddleware(routing)

// Build a strict locale matcher from configured locales
const LOCALE_ALTS = routing.locales.join("|")

// Define redirect patterns - these will work for both /path and /:locale/path
const redirectPatterns: { from: string; to: string }[] = [
  // Locale aliases
  { from: "/no/(.*)", to: "/nb/$1" },
  { from: "/ph/(.*)", to: "/fil/$1" },
  // Legacy redirects
  { from: "/discord", to: "https://discord.gg/ethereum-org" },
  { from: "/pdfs/(.*)", to: "/" },
  { from: "/brand", to: "/assets/" },
  { from: "/ethereum\\.html", to: "/what-is-ethereum/" },
  { from: "/ether", to: "/eth/" },
  { from: "/token", to: "/developers/" },
  { from: "/crowdsale", to: "/developers/" },
  { from: "/cli", to: "/developers/" },
  { from: "/greeter", to: "/developers/" },
  { from: "/roadmap/vision", to: "/roadmap/" },
  { from: "/search", to: "/" },
  { from: "/garden", to: "/roadmap/" },
  { from: "/download", to: "/developers/docs/nodes-and-clients/" },
  { from: "/how", to: "/guides/" },
  { from: "/content/(.*)", to: "/$1/" },
  { from: "/nfts", to: "/nft/" },
  { from: "/daos", to: "/dao/" },
  { from: "/layer2", to: "/layer-2/" },
  { from: "/grants", to: "/community/grants/" },
  { from: "/java", to: "/developers/docs/programming-languages/java/" },
  { from: "/python", to: "/developers/docs/programming-languages/python/" },
  {
    from: "/javascript",
    to: "/developers/docs/programming-languages/javascript/",
  },
  { from: "/golang", to: "/developers/docs/programming-languages/golang/" },
  { from: "/rust", to: "/developers/docs/programming-languages/rust/" },
  { from: "/dot-net", to: "/developers/docs/programming-languages/dot-net/" },
  { from: "/delphi", to: "/developers/docs/programming-languages/delphi/" },
  { from: "/dart", to: "/developers/docs/programming-languages/dart/" },
  { from: "/languages", to: "/community/language-resources/" },
  {
    from: "/developers/docs/mining",
    to: "/developers/docs/consensus-mechanisms/pow/mining/",
  },
  { from: "/beginners", to: "/what-is-ethereum/" },
  { from: "/build", to: "/developers/learning-tools/" },
  { from: "/eth2/beacon-chain", to: "/roadmap/beacon-chain/" },
  { from: "/eth2/the-beacon-chain", to: "/roadmap/beacon-chain/" },
  { from: "/upgrades/the-beacon-chain", to: "/roadmap/beacon-chain/" },
  { from: "/eth2/merge", to: "/roadmap/merge/" },
  { from: "/eth2/the-merge", to: "/roadmap/merge/" },
  { from: "/upgrades/the-merge", to: "/roadmap/merge/" },
  { from: "/eth2/docking", to: "/roadmap/merge/" },
  { from: "/upgrades/docking", to: "/roadmap/merge/" },
  { from: "/eth2/the-docking", to: "/roadmap/merge/" },
  { from: "/upgrades/the-docking", to: "/roadmap/merge/" },
  { from: "/eth2/shard-chains", to: "/roadmap/danksharding/" },
  { from: "/upgrades/shard-chains", to: "/roadmap/danksharding/" },
  { from: "/upgrades/sharding", to: "/roadmap/danksharding/" },
  { from: "/upgrades/merge", to: "/roadmap/merge/" },
  { from: "/upgrades/merge/issuance", to: "/roadmap/merge/issuance" },
  { from: "/upgrades/beacon-chain", to: "/roadmap/beacon-chain" },
  { from: "/upgrades/vision", to: "/roadmap/" },
  { from: "/upgrades", to: "/roadmap" },
  { from: "/upgrades/get-involved", to: "/contributing" },
  { from: "/eth2/staking", to: "/staking/" },
  { from: "/eth2/vision", to: "/roadmap/vision/" },
  { from: "/eth2/get-involved", to: "/upgrades/get-involved/" },
  { from: "/eth2/get-involved/bug-bounty", to: "/bug-bounty/" },
  { from: "/upgrades/get-involved/bug-bounty", to: "/bug-bounty/" },
  { from: "/eth2/deposit-contract", to: "/staking/deposit-contract/" },
  { from: "/eth2", to: "/upgrades/" },
  {
    from: "/developers/docs/scaling/layer-2-rollups",
    to: "/developers/docs/scaling",
  },
  { from: "/developers/docs/layer-2-scaling", to: "/layer-2/" },
  { from: "/about/web-developer", to: "/about/#open-jobs" },
  { from: "/about/product-designer", to: "/about/#open-jobs" },
  { from: "/use", to: "/apps/" },
  { from: "/dapps", to: "/apps/" },
  {
    from: "/contributing/translation-program/translation-guide",
    to: "/contributing/translation-program/faq/",
  },
  {
    from: "/contributing/translation-program/content-versions",
    to: "/contributing/translation-program/",
  },
  {
    from: "/contributing/translation-program/content-buckets",
    to: "/contributing/translation-program/",
  },
  {
    from: "/developers/docs/smart-contracts/source-code-verification",
    to: "/developers/docs/smart-contracts/verifying/",
  },
  {
    from: "/developers/docs/smart-contracts/upgrading-smart-contracts",
    to: "/developers/docs/smart-contracts/upgrading/",
  },
  { from: "/writing-cohort", to: "https://ethereumwriterscohort.carrd.co/" },
  { from: "/staking/withdraws", to: "/staking/withdrawals/" },
  {
    from: "/guides/how-to-register-an-ethereum-account",
    to: "/guides/how-to-create-an-ethereum-account/",
  },
  { from: "/deprecated-software", to: "/apps/" },
  { from: "/enterprise/private-ethereum", to: "/enterprise/" },
  { from: "/dashboards", to: "/resources" },
  { from: "/tds", to: "/trillion-dollar-security" },
  { from: "/10-years", to: "/10years" },
  { from: "/history", to: "/ethereum-forks" },
]

// Build regex patterns for both non-prefixed and locale-prefixed paths
const redirects: {
  from: RegExp
  to: string
  type: number
}[] = redirectPatterns.flatMap(({ from, to }) => {
  return [
    // Non-prefixed version (e.g., /cli)
    {
      from: new RegExp(`^${from}/?$`),
      to,
      type: 301,
    },
    // Locale-prefixed version (e.g., /es/cli)
    {
      // from: new RegExp(`^/(\\w+)${from}/?$`),
      from: new RegExp(`^/(${LOCALE_ALTS})${from}/?$`),
      to: `/$1${to}`,
      type: 301,
    },
  ]
})

export default function middleware(request: NextRequest) {
  // Normalize to lowercase paths site-wide (URLs are case-insensitive by spec,
  // but our routes are defined in lowercase). Do this BEFORE i18n routing.
  const originalPath = request.nextUrl.pathname
  const lowerPath = originalPath.toLowerCase()
  if (originalPath !== lowerPath) {
    const url = request.nextUrl.clone()
    url.pathname = lowerPath
    return NextResponse.redirect(url, 301)
  }

  // Apply custom redirects BEFORE i18n routing
  for (const rule of redirects) {
    if (rule.from.test(lowerPath)) {
      const replaced = lowerPath.replace(rule.from, rule.to)

      // External targets (e.g., discord invite)
      if (replaced.startsWith("http://") || replaced.startsWith("https://")) {
        return NextResponse.redirect(replaced, rule.type)
      }

      // Internal targets
      const url = request.nextUrl.clone()
      url.pathname = replaced
      return NextResponse.redirect(url, rule.type)
    }
  }

  const response = handleI18nRouting(request)

  // Upgrade default-locale strip redirects from 307 to 301 for SEO
  if (response.status === 307) {
    const pathname = request.nextUrl.pathname
    const defaultPrefix = `/${DEFAULT_LOCALE}`
    if (
      pathname === defaultPrefix ||
      pathname.startsWith(`${defaultPrefix}/`)
    ) {
      return new NextResponse(null, { status: 301, headers: response.headers })
    }
  }

  return response
}

// Simplified matcher pattern
export const config = {
  matcher: ["/((?!api|_next|_vercel|.well-known|.*\\.(?!html$)[^/]+$).*)"],
}
