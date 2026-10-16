import type { BuilderResourcesCatalogResource } from "@/lib/types"

import { parallelBatch } from "@/data-layer/fetchers/fetchRetry"
import { uploadToS3 } from "@/data-layer/s3"

import { fetchBuilderResources } from "./fetchBuilderResources"
import { fetchGitHub } from "./fetchGitHub"
import { fetchNpmJs } from "./fetchNpmJs"
import { rankDeveloperToolsResources } from "./ranking"
import type { DeveloperToolsDataEnvelope } from "./utils"

// Re-export types for consumers
export type { DeveloperToolsDataEnvelope } from "./utils"

const IMAGE_UPLOAD_CONCURRENCY = 10

async function uploadToolImages(
  resources: BuilderResourcesCatalogResource[]
): Promise<BuilderResourcesCatalogResource[]> {
  return parallelBatch(
    resources,
    async (resource) => {
      const uploadedThumbnail = resource.thumbnail_url
        ? await uploadToS3(resource.thumbnail_url, "tools/thumbnails")
        : undefined
      const uploadedBanner = resource.banner_url
        ? await uploadToS3(resource.banner_url, "tools/banners")
        : undefined

      // Drop images that failed to upload rather than falling back to the
      // source URL: its host is usually not in next.config images.remotePatterns,
      // so /_next/image answers 400 and the page ships a broken image (e.g.
      // .ico favicons). Cards render their fallback icon instead.
      return {
        ...resource,
        thumbnail_url: uploadedThumbnail ?? undefined,
        banner_url: uploadedBanner ?? undefined,
      }
    },
    IMAGE_UPLOAD_CONCURRENCY
  )
}

/** Log per-stage wall clock so a timed-out run shows which stage grew. */
async function timed<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  try {
    return await fn()
  } finally {
    const seconds = ((Date.now() - start) / 1000).toFixed(1)
    console.log(`[developer-tools] ${label}: ${seconds}s`)
  }
}

function trimResourceForFrontend(
  resource: BuilderResourcesCatalogResource
): BuilderResourcesCatalogResource {
  const repos = resource.repos.map((repoEntry) => {
    if (typeof repoEntry === "string") {
      return { href: repoEntry }
    }
    return {
      href: repoEntry.href,
      stargazers: repoEntry.stargazers,
    }
  })

  const packages = (resource.packages || []).map((packageEntry) => {
    if (typeof packageEntry === "string") {
      return { href: packageEntry }
    }
    return {
      href: packageEntry.href,
      downloads: packageEntry.downloads,
    }
  })

  return {
    name: resource.name,
    description: resource.description,
    ...(resource.thumbnail_url
      ? { thumbnail_url: resource.thumbnail_url }
      : {}),
    ...(resource.banner_url ? { banner_url: resource.banner_url } : {}),
    ...(resource.twitter ? { twitter: resource.twitter } : {}),
    repos,
    ...(packages.length > 0 ? { packages } : {}),
    tags: resource.tags,
    ...(resource.website ? { website: resource.website } : {}),
    subcategory_id: resource.subcategory_id,
    ...(resource.crops_native === true ? { crops_native: true } : {}),
    ...(typeof resource.resource_score === "number"
      ? { resource_score: resource.resource_score }
      : {}),
  }
}

export async function fetchDeveloperTools(): Promise<DeveloperToolsDataEnvelope> {
  const { resources, taxonomy } = await timed("catalog", fetchBuilderResources)
  const resourcesWithPackageDefaults = resources.map((resource) => ({
    ...resource,
    packages: resource.packages ?? [],
  }))

  // Disjoint fields (`repos` / `packages`), so the two rate-limited passes run in parallel
  const [withGitHubData, withNpmData] = await Promise.all([
    timed("github", () => fetchGitHub(resourcesWithPackageDefaults)),
    timed("npm", () => fetchNpmJs(resourcesWithPackageDefaults)),
  ])
  const enrichedResources = withGitHubData.map((resource, index) => ({
    ...resource,
    packages: withNpmData[index].packages,
  }))

  const { resources: rankedResources } = await timed("ranking", () =>
    rankDeveloperToolsResources(enrichedResources)
  )
  const resourcesWithUploadedImages = await timed("images", () =>
    uploadToolImages(rankedResources)
  )

  return {
    taxonomy,
    resources: resourcesWithUploadedImages.map(trimResourceForFrontend),
  }
}
