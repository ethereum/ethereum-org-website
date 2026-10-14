import type { ReactNode } from "react"

import Link from "@/components/ui/Link"

import { cn } from "@/lib/utils/cn"

/** Wraps a technical value (address, IP) in Unicode isolates so it keeps LTR order inside translated text */
export const isolate = (value: string) => `⁦${value}⁩`

export interface SourceLink {
  text: ReactNode
  href: string
}

/** An "On the record" card: a documented case with its sources */
export const RecordCard = ({
  label,
  sourcesLabel,
  sources,
  children,
}: {
  label: string
  sourcesLabel: string
  sources: SourceLink[]
  children: ReactNode
}) => (
  <aside className="space-y-3 rounded-base border border-s-4 border-s-leak bg-background-highlight p-4 md:p-6">
    <p className="m-0 text-sm font-bold tracking-wide text-leak-high-contrast uppercase">
      {label}
    </p>
    <div className="space-y-3">{children}</div>
    <div className="text-sm text-body-medium">
      <p className="m-0 font-semibold">{sourcesLabel}</p>
      <ul className="m-0 list-none space-y-1">
        {sources.map(({ text, href }) => (
          <li key={href}>
            <Link href={href}>{text}</Link>
          </li>
        ))}
      </ul>
    </div>
  </aside>
)

/** Pointer to Part II for the leaks this chapter showed */
export const FixNote = ({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) => (
  <aside className="space-y-2 rounded-base border border-primary/30 bg-primary-low-contrast/40 p-4 md:p-6">
    <p className="m-0 text-sm font-bold tracking-wide uppercase">
      <Link href="#fixes" className="text-primary-high-contrast">
        {label}
      </Link>
    </p>
    <p className="m-0">{children}</p>
  </aside>
)

/** Link to the following chapter, with its kicker and one-line summary */
export const NextChapter = ({
  href,
  label,
  blurb,
  title,
}: {
  href: string
  label: string
  blurb: string
  title?: string
}) => (
  <nav className="pt-space">
    {title && <h3>{title}</h3>}
    <Link
      href={href}
      className="block rounded-base border p-4 no-underline hover:border-primary hover:bg-background-highlight md:p-6"
    >
      <span className="block font-bold text-primary">{label}</span>
      <span className="block text-body-medium">{blurb}</span>
    </Link>
  </nav>
)

/** Optional technical detail, closed by default */
export const TechDetails = ({
  summary,
  children,
  className,
}: {
  summary: string
  children: ReactNode
  className?: string
}) => (
  <details
    className={cn(
      "group rounded-base border bg-background p-4 [&_p]:mb-0 [&>div]:mt-3",
      className
    )}
  >
    <summary className="cursor-pointer font-semibold">{summary}</summary>
    <div className="space-y-3">{children}</div>
  </details>
)
