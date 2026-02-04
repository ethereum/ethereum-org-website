"use client"

import { useEffect, useState } from "react"

import { BaseLink } from "@/components/atoms/Link"
import RefreshCW from "@/components/icons/refresh-cw.svg"
import MainArticle from "@/components/molecules/MainArticle"
import { Button } from "@/components/ui/buttons/Button"
import Translation from "@/components/utilities/Translation"

import { cn } from "@/lib/utils/cn"

export default function Error({ error }: { error: Error; reset: () => void }) {
  const [refreshing, setRefreshing] = useState(false)
  const handleRefresh = () => {
    setRefreshing(true)
    window.location.reload()
  }

  useEffect(() => {
    // Scroll view to top on error
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    // TODO: log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <MainArticle className="mb-32 mt-24 w-full space-y-8 px-8 py-4 md:mb-48 md:mt-32">
      <h1>
        <Translation id="error-page-title" />
      </h1>
      <p className="mb-4">
        <Translation id="error-page-description" />
      </p>

      <Button onClick={handleRefresh}>
        <RefreshCW
          className={cn(
            "size-5",
            refreshing && "motion-safe:animate-spin motion-reduce:animate-pulse"
          )}
        />
        <Translation id="refresh" />
      </Button>

      <BaseLink href="/" className="block">
        <Translation id="error-page-home-link" />
      </BaseLink>
    </MainArticle>
  )
}
