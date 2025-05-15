"use client"

import { useEffect } from "react"

import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { BaseLink } from "@/components/ui/Link"

export default function Error({ error }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // TODO: log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto mb-0 mt-16 flex w-full flex-col items-center">
      <MainArticle className="my-8 w-full space-y-8 px-8 py-4">
        <h1>
          <Translation id="error-page-title" />
        </h1>
        <p className="mb-4">
          <Translation id="error-page-description" />
        </p>
        <p>
          <BaseLink href="/">
            <Translation id="error-page-home-link" />
          </BaseLink>
        </p>
      </MainArticle>
    </div>
  )
}
