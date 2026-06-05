import type { BuilderResourcesCatalogResource } from "@/lib/types"

import { uploadToS3 } from "@/data-layer/s3"

import { fetchBuilderResources } from "./fetchBuilderResources"
import { fetchGitHub } from "./fetchGitHub"
import { fetchNpmJs } from "./fetchNpmJs"
import { rankDeveloperToolsResources } from "./ranking"
import type { DeveloperToolsDataEnvelope } from "./utils"

// Re-export types for consumers
export type { DeveloperToolsDataEnvelope } from "./utils"

async function uploadToolImages(
  resources: BuilderResourcesCatalogResource[]
): Promise<BuilderResourcesCatalogResource[]> {
  return Promise.all(
    resources.map(async (resource) => {
      const uploadedThumbnail = resource.thumbnail_url
        ? await uploadToS3(resource.thumbnail_url, "tools/thumbnails")
        : undefined
      const uploadedBanner = resource.banner_url
        ? await uploadToS3(resource.banner_url, "tools/banners")
        : undefined

      return {
        ...resource,
        thumbnail_url: uploadedThumbnail ?? resource.thumbnail_url,
        banner_url: uploadedBanner ?? resource.banner_url,
      }
    })
  )
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
    ...(typeof resource.resource_score === "number"
      ? { resource_score: resource.resource_score }
      : {}),
  }
}

export async function fetchDeveloperTools(): Promise<DeveloperToolsDataEnvelope> {
  const { resources, taxonomy } = await fetchBuilderResources()
  const resourcesWithPackageDefaults = resources.map((resource) => ({
    ...resource,
    packages: resource.packages ?? [],
  }))
  const withGitHubData = await fetchGitHub(resourcesWithPackageDefaults)
  const enrichedResources = await fetchNpmJs(withGitHubData)
  const { resources: rankedResources } =
    await rankDeveloperToolsResources(enrichedResources)
  const resourcesWithUploadedImages = await uploadToolImages(rankedResources)

  return {
    taxonomy,
    resources: resourcesWithUploadedImages.map(trimResourceForFrontend),
  }
}
