"use client"

import { useCallback, useEffect, useState } from "react"
import { Search, X } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Input from "@/components/ui/input"

import { cn } from "@/lib/utils/cn"

interface SearchInputProps {
  placeholder?: string
  className?: string
}

export default function SearchInput({
  placeholder = "Search events...",
  className,
}: SearchInputProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)

  // Update URL with debounce
  const updateUrl = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set("q", value)
      } else {
        params.delete("q")
      }
      const newUrl = params.toString() ? `${pathname}?${params}` : pathname
      router.push(newUrl, { scroll: false })
    },
    [pathname, router, searchParams]
  )

  // Debounce URL updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== initialQuery) {
        updateUrl(query)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query, initialQuery, updateUrl])

  // Sync with URL changes (e.g., browser back/forward)
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleClear = () => {
    setQuery("")
    updateUrl("")
  }

  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-body-medium" />
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-body-medium hover:text-body"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  )
}
