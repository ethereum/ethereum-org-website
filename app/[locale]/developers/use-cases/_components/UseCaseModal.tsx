"use client"

import { useMemo } from "react"
import type { LucideIcon } from "lucide-react"
import {
  BookOpen,
  ExternalLink,
  Lightbulb,
  Rocket,
  Sparkles,
} from "lucide-react"
import { useTranslations } from "next-intl"

import type { UseCase } from "@/lib/types/use-cases"

import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

interface ParsedSection {
  heading: string
  items: Array<{ title: string; description: string; url?: string }>
  paragraphs: string[]
}

const SECTION_ICONS: Record<string, LucideIcon> = {
  "The Opportunity": Sparkles,
  Ideas: Lightbulb,
  "What You Could Build": Lightbulb,
  Examples: Rocket,
  Resources: BookOpen,
}

const SECTION_DISPLAY_NAMES: Record<string, string> = {
  Ideas: "What You Could Build",
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&mdash;/g, "\u2014")
    .replace(/&ndash;/g, "\u2013")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "\u2019")
    .replace(/&lsquo;/g, "\u2018")
    .replace(/&rdquo;/g, "\u201C")
    .replace(/&ldquo;/g, "\u201D")
    .replace(/&hellip;/g, "\u2026")
    .replace(/&nbsp;/g, "\u00A0")
}

function parseMarkdown(raw: string): ParsedSection[] {
  const cleaned = decodeHtmlEntities(
    raw
      .replace(/^---[\s\S]*?---\n*/, "")
      .replace(/^#\s+.*\n/, "")
      .trim()
  )

  const sectionRegex = /^## (.+)$/gm
  const sections: ParsedSection[] = []
  let lastIndex = 0
  let lastHeading = ""
  let match: RegExpExecArray | null

  while ((match = sectionRegex.exec(cleaned)) !== null) {
    if (lastHeading) {
      const content = cleaned.slice(lastIndex, match.index).trim()
      sections.push(parseSection(lastHeading, content))
    }
    lastHeading = match[1]
    lastIndex = match.index + match[0].length
  }

  if (lastHeading) {
    const content = cleaned.slice(lastIndex).trim()
    sections.push(parseSection(lastHeading, content))
  }

  return sections
}

function parseSection(heading: string, content: string): ParsedSection {
  const lines = content.split("\n").filter((l) => l.trim())
  const items: ParsedSection["items"] = []
  const paragraphs: string[] = []

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("- ")) {
      const itemText = trimmed.slice(2)

      // Linked item with optional (year) and description:
      // [Name](url) (2024) - description  OR  [Name](url) - description
      const linkWithDesc = itemText.match(
        /^\[([^\]]+)\]\(([^)]+)\)\s*(?:\(\d{4}\)\s*)?[-–—]\s*(.+)$/
      )
      if (linkWithDesc) {
        items.push({
          title: linkWithDesc[1],
          description: linkWithDesc[3],
          url: linkWithDesc[2],
        })
        continue
      }

      // Linked item with optional (year) but no description:
      // [Name](url) (2024)  OR  [Name](url)
      const linkOnly = itemText.match(
        /^\[([^\]]+)\]\(([^)]+)\)\s*(?:\(\d{4}\))?\s*$/
      )
      if (linkOnly) {
        items.push({
          title: linkOnly[1],
          description: "",
          url: linkOnly[2],
        })
        continue
      }

      // Plain item: "Title - Description"
      const dashSplit = itemText.match(/^(.+?)\s[-–—]\s(.+)$/)
      if (dashSplit) {
        items.push({ title: dashSplit[1], description: dashSplit[2] })
      } else {
        items.push({ title: itemText, description: "" })
      }
    } else {
      paragraphs.push(trimmed)
    }
  }

  return { heading, items, paragraphs }
}

interface UseCaseModalProps {
  useCase: UseCase | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UseCaseModal({
  useCase,
  open,
  onOpenChange,
}: UseCaseModalProps) {
  const t = useTranslations("page-use-cases")

  const sections = useMemo(() => {
    if (!useCase?.markdown) return null
    return parseMarkdown(useCase.markdown)
  }, [useCase?.markdown])

  if (!useCase) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <DialogContent className="max-h-[90vh] overflow-y-auto overflow-x-hidden">
        <DialogHeader>
          <div>
            <span className="text-sm text-body-medium">{useCase.category}</span>
            <DialogTitle className="text-3xl font-bold">
              {useCase.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="min-w-0 space-y-12 border-t border-body/10 pt-6">
            {sections ? (
              sections.map((section) => {
                const displayName =
                  SECTION_DISPLAY_NAMES[section.heading] || section.heading
                const Icon =
                  SECTION_ICONS[displayName] || SECTION_ICONS[section.heading]

                return (
                  <div key={section.heading} className="min-w-0">
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
                      {Icon && <Icon className="h-5 w-5 text-primary" />}
                      {displayName}
                    </h3>

                    {/* Paragraphs */}
                    {section.paragraphs.length > 0 && (
                      <div className="space-y-2">
                        {section.paragraphs.map((p, i) => (
                          <p
                            key={i}
                            className="text-sm leading-relaxed text-body-medium"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Ideas: purple-tinted numbered cards or empty state */}
                    {section.heading === "Ideas" &&
                      (section.items.length > 0 ? (
                        <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
                          {[...section.items]
                            .sort((a, b) => {
                              if (a.description && !b.description) return -1
                              if (!a.description && b.description) return 1
                              return 0
                            })
                            .map((item, i) => (
                              <div
                                key={i}
                                className="flex min-h-[72px] gap-3 rounded-lg border border-primary/10 bg-primary/5 p-4 transition-colors hover:border-primary/25 hover:bg-primary/10"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                  {i + 1}
                                </span>
                                <div className="min-w-0">
                                  <p className="font-bold leading-snug">
                                    {item.title}
                                  </p>
                                  {item.description && (
                                    <p className="mt-1 text-sm leading-relaxed text-body-medium">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <p className="text-sm italic text-body-medium">
                          No ideas yet — be the first to contribute!
                        </p>
                      ))}

                    {/* Examples & Resources: linked list or empty state */}
                    {section.heading !== "Ideas" &&
                      (section.items.length > 0 ? (
                        <div className="space-y-2">
                          {section.items.map((item, i) => (
                            <div key={i} className="text-sm">
                              {item.url ? (
                                <>
                                  <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                                  >
                                    {item.title}
                                    <ExternalLink className="h-3 w-3 shrink-0" />
                                  </a>
                                  {item.description && (
                                    <span className="text-body-medium">
                                      {" — "}
                                      {item.description}
                                    </span>
                                  )}
                                </>
                              ) : (
                                <>
                                  <span className="font-medium">
                                    {item.title}
                                  </span>
                                  {item.description && (
                                    <span className="text-body-medium">
                                      {" — "}
                                      {item.description}
                                    </span>
                                  )}
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        section.paragraphs.length === 0 && (
                          <p className="text-sm italic text-body-medium">
                            No {section.heading.toLowerCase()} yet — be the
                            first to contribute!
                          </p>
                        )
                      ))}
                  </div>
                )
              })
            ) : (
              <div>
                <h4 className="mb-2 font-semibold">{t("modal-problem")}</h4>
                <p className="text-body">{useCase.problemStatement}</p>
              </div>
            )}

            <div className="pt-4">
              <ButtonLink
                href={`https://explorer.usecaselab.org/${useCase.id}`}
                className="inline-flex"
              >
                {t("modal-explore")}
              </ButtonLink>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
