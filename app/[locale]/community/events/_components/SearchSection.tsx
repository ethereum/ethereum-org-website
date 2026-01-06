"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils/cn"

interface SearchSectionProps {
  title: string
  subtitle: string
  placeholder: string
  locale: string
  defaultValue?: string
  className?: string
}

export default function SearchSection({
  title,
  subtitle,
  placeholder,
  locale,
  defaultValue = "",
  className,
}: SearchSectionProps) {
  const [query, setQuery] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(
        `/${locale}/community/events?q=${encodeURIComponent(query.trim())}`
      )
    }
  }

  return (
    <section
      className={cn(
        "rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-primary-low-contrast/20 px-6 py-12 md:px-12 md:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-3 text-3xl font-bold">{title}</h2>
        <p className="mb-8 text-body-medium">{subtitle}</p>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-body-medium" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-full border border-body-light bg-background py-4 pl-12 pr-6 text-lg outline-none transition-colors focus:border-primary"
            />
          </div>
        </form>
      </div>
    </section>
  )
}
