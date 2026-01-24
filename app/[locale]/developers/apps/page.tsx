import { Suspense } from "react"
import { setRequestLocale } from "next-intl/server"
import { compileMDX } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"

import type { PageParams } from "@/lib/types"

import {
  getAllAppsFromData,
  getAppByIdFromData,
} from "@/data-layer/fetchers/fetchDeveloperApps"

import { AppGrid } from "./_components/AppGrid"
import { AppModal } from "./_components/AppModal"
import { ModalSkeleton } from "./_components/ModalSkeleton"

import { getDeveloperAppsData } from "@/lib/data"

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

export default async function DeveloperAppsPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>
  searchParams: Promise<{ app?: string }>
}) {
  const { locale } = await params
  const { app: selectedAppId } = await searchParams
  setRequestLocale(locale)

  const data = await getDeveloperAppsData()
  const apps = data ? getAllAppsFromData(data) : []

  return (
    <main className="mx-auto max-w-screen-xl px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-4 text-4xl font-bold">Developer Apps</h1>
        <p className="text-lg text-body-medium">
          Explore tools and libraries for building on Ethereum
        </p>
      </div>
      <AppGrid apps={apps} />
      {selectedAppId && (
        <Suspense fallback={<ModalSkeleton />}>
          <AppModalServer appId={selectedAppId} />
        </Suspense>
      )}
    </main>
  )
}
