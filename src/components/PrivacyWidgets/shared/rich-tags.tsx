import type { ReactNode } from "react"

import TooltipLink from "@/components/TooltipLink"
import Link from "@/components/ui/Link"

type Chunks = ReactNode

export interface RichTagOptions {
  /** href for a <link> tag (relative for internal pages, absolute for sources) */
  link?: string
  link1?: string
  link2?: string
  /** Glossary anchor id for a <glossary> tag, e.g. "mempool" */
  glossary?: string
}

/**
 * Handlers for the attribute-free tags used in the lesson and widget copy.
 * Pass to `t.rich(key, richTags({ link: "/run-a-node/" }))`. Works in server
 * and client components.
 */
export const richTags = ({
  link,
  link1,
  link2,
  glossary,
}: RichTagOptions = {}) => ({
  strong: (chunks: Chunks) => <strong>{chunks}</strong>,
  em: (chunks: Chunks) => <em>{chunks}</em>,
  code: (chunks: Chunks) => (
    <code dir="ltr" className="font-mono">
      {chunks}
    </code>
  ),
  link: (chunks: Chunks) => (link ? <Link href={link}>{chunks}</Link> : chunks),
  link1: (chunks: Chunks) =>
    link1 ? <Link href={link1}>{chunks}</Link> : chunks,
  link2: (chunks: Chunks) =>
    link2 ? <Link href={link2}>{chunks}</Link> : chunks,
  glossary: (chunks: Chunks) =>
    glossary ? (
      <TooltipLink href={`/glossary/#${glossary}`}>{chunks}</TooltipLink>
    ) : (
      chunks
    ),
})

/** Technical values (addresses, IPs, hashes, hosts) keep LTR order in RTL text */
export const Ltr = ({ children }: { children: ReactNode }) => (
  // <bdi> isolates the value so neighbouring RTL text can't reorder it
  <bdi dir="ltr" className="font-mono">
    {children}
  </bdi>
)
