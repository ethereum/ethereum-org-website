import { Suspense } from "react"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import type { PageParams } from "@/lib/types"

import {
  getAppByIdFromData,
  getAppsByCategoryFromData,
  getCategoryByIdFromData,
} from "@/data-layer/fetchers/fetchDeveloperApps"

import { AppGrid } from "../_components/AppGrid"
import { AppModal } from "../_components/AppModal"
import { CategoryHeader } from "../_components/CategoryHeader"
import { ModalSkeleton } from "../_components/ModalSkeleton"

import { getDeveloperAppsData } from "@/lib/data"

interface CategoryPageProps {
  params: Promise<PageParams & { categoryId: string }>
  searchParams: Promise<{ app?: string }>
}

async function AppModalServer({ appId }: { appId: string }) {
  const data = await getDeveloperAppsData()
  if (!data) return null

  const app = getAppByIdFromData(data, appId)
  if (!app) return null

  const { content } = await compileMDX({
    source: app.description,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  })

  return (
    <AppModal title={app.title}>
      <div className="mb-4 flex flex-wrap gap-2">
        {app.website && (
          <a
            href={app.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-primary-low-contrast px-3 py-1 text-sm text-primary hover:bg-primary-hover"
          >
            Website
          </a>
        )}
        {app.github && (
          <a
            href={app.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-md bg-body-light px-3 py-1 text-sm text-body hover:bg-body-medium/20"
          >
            GitHub
          </a>
        )}
      </div>
      {content}
    </AppModal>
  )
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { locale, categoryId } = await params
  const { app: selectedAppId } = await searchParams
  setRequestLocale(locale)

  const data = await getDeveloperAppsData()
  if (!data) {
    notFound()
  }

  const category = getCategoryByIdFromData(data, categoryId)
  if (!category) {
    notFound()
  }

  const filteredApps = getAppsByCategoryFromData(data, categoryId)
  if (filteredApps.length === 0) {
    notFound()
  }

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-12">
      <CategoryHeader category={category} />
      <AppGrid apps={filteredApps} />
      {selectedAppId && (
        <Suspense fallback={<ModalSkeleton />}>
          <AppModalServer appId={selectedAppId} />
        </Suspense>
      )}
    </main>
  )
}
