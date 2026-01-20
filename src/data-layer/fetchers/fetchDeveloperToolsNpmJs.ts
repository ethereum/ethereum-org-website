// TODO: Set up data-layer integration
import type { DeveloperApp } from "../../../app/[locale]/developers/apps/types"

// TODO: Move types to lib
type ParsedNpmUrl = {
  packageName: string
  originalHref: string
}

function parseNpmUrl(href: string): ParsedNpmUrl | null {
  try {
    const url = new URL(href)
    if (url.hostname !== "www.npmjs.com" && url.hostname !== "npmjs.com") {
      return null
    }

    const pathParts = url.pathname.split("/").filter(Boolean)
    if (pathParts[0] !== "package") return null

    let packageName: string
    if (pathParts[1]?.startsWith("@")) {
      // Scoped package: @scope/name
      packageName = `${pathParts[1]}/${pathParts[2]}`
    } else {
      // Unscoped package
      packageName = pathParts[1]
    }

    if (!packageName) return null
    return { packageName, originalHref: href }
  } catch {
    return null
  }
}

async function fetchSinglePackageDownloads(
  packageName: string
): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/last-week/${encodeURIComponent(packageName)}`
    )

    if (!response.ok) return null

    const data = await response.json()
    return data.downloads ?? null
  } catch {
    return null
  }
}

async function fetchBulkDownloads(
  packageNames: string[]
): Promise<Map<string, number>> {
  const results = new Map<string, number>()
  if (packageNames.length === 0) return results

  // Deduplicate package names
  const uniquePackages = Array.from(new Set(packageNames))

  // Separate scoped (@org/pkg) from unscoped packages
  // Scoped packages don't work well with bulk API, fetch them individually
  const scopedPackages = uniquePackages.filter((p) => p.startsWith("@"))
  const unscopedPackages = uniquePackages.filter((p) => !p.startsWith("@"))

  // Fetch scoped packages individually (in parallel with concurrency limit)
  const CONCURRENCY = 10
  for (let i = 0; i < scopedPackages.length; i += CONCURRENCY) {
    const batch = scopedPackages.slice(i, i + CONCURRENCY)
    const batchResults = await Promise.all(
      batch.map(async (pkg) => ({
        pkg,
        downloads: await fetchSinglePackageDownloads(pkg),
      }))
    )

    for (const { pkg, downloads } of batchResults) {
      if (downloads !== null) {
        results.set(pkg, downloads)
      }
    }
  }

  // Fetch unscoped packages in bulk
  const BATCH_SIZE = 50
  for (let i = 0; i < unscopedPackages.length; i += BATCH_SIZE) {
    const batch = unscopedPackages.slice(i, i + BATCH_SIZE)
    const packageList = batch.join(",")

    try {
      const response = await fetch(
        `https://api.npmjs.org/downloads/point/last-week/${packageList}`
      )

      if (!response.ok) {
        console.warn(
          `npm downloads API returned ${response.status} for unscoped batch`
        )
        continue
      }

      const data = await response.json()

      // Handle single-package response: { downloads: number, package: string }
      // vs multi-package response: { "pkg1": { downloads: n }, "pkg2": { downloads: m } }
      if ("downloads" in data && "package" in data) {
        results.set(data.package, data.downloads)
      } else {
        for (const [pkg, info] of Object.entries(data)) {
          if (info && typeof info === "object" && "downloads" in info) {
            results.set(pkg, (info as { downloads: number }).downloads)
          }
        }
      }
    } catch (err) {
      console.warn(`Failed to fetch bulk npm downloads for batch ${i}:`, err)
    }
  }

  return results
}

export async function fetchDeveloperToolsNpmJs(
  appData: DeveloperApp[]
): Promise<DeveloperApp[]> {
  // Collect all unique npm URLs and their package names
  const parsedUrls: ParsedNpmUrl[] = []
  const seenHrefs = new Set<string>()

  for (const app of appData) {
    for (const repo of app.repos) {
      if (seenHrefs.has(repo.href)) continue
      seenHrefs.add(repo.href)

      const parsed = parseNpmUrl(repo.href)
      if (parsed) {
        parsedUrls.push(parsed)
      }
    }
  }

  if (parsedUrls.length === 0) {
    return appData
  }

  console.log(`Fetching npm downloads for ${parsedUrls.length} packages`)

  const packageNames = parsedUrls.map((p) => p.packageName)
  const downloadsMap = await fetchBulkDownloads(packageNames)

  // Create lookup from original href to downloads
  const hrefToDownloads = new Map<string, number>()
  for (const { packageName, originalHref } of parsedUrls) {
    const downloads = downloadsMap.get(packageName)
    if (downloads !== undefined) {
      hrefToDownloads.set(originalHref, downloads)
    }
  }

  console.log(
    `Successfully fetched npm downloads for ${hrefToDownloads.size} packages`
  )

  // Enrich the existing data with downloads
  return appData.map((app) => ({
    ...app,
    repos: app.repos.map((repo) => {
      const downloads = hrefToDownloads.get(repo.href)
      return downloads !== undefined ? { ...repo, downloads } : repo
    }),
  }))
}
