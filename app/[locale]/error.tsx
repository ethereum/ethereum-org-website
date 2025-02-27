"use client"

import { useEffect } from "react"

import MainArticle from "@/components/MainArticle"
import Translation from "@/components/Translation"
import { Button } from "@/components/ui/buttons/Button"

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {
    // TODO: log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="mx-auto mb-0 mt-16 flex w-full flex-col items-center">
      <MainArticle className="my-8 w-full space-y-8 px-8 py-4">
        <h1>
          <Translation id="we-couldnt-find-that-page" />
        </h1>
        <p>Something went wrong.</p>
        <Button onClick={() => reset()}>Try again</Button>
      </MainArticle>
    </div>
  )
}
