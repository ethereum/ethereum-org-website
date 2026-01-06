"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import Input from "@/components/ui/input"
import { Section } from "@/components/ui/section"

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
    <Section
      className={cn(
        "rounded-t-[4rem] bg-gradient-banner px-6 py-12 md:px-12 md:py-16",
        className
      )}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-2">{title}</h2>
        <p className="mb-6">{subtitle}</p>
        <form onSubmit={handleSubmit} className="relative">
          <div className="relative">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="w-full max-w-xl"
            />
          </div>
        </form>
      </div>
    </Section>
  )
}
