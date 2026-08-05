import type { ComponentPropsWithoutRef } from "react"

import { htmlElements } from "@/components/MdComponents"

import { cn } from "@/lib/utils/cn"

import { renderSimpleMarkdown } from "@/lib/md/renderSimple"

type ToolDescriptionProps = {
  description: string
  className?: string
}

/**
 * Tool descriptions in the builder-resources catalog are authored in markdown
 * (bold, lists, links, the occasional heading), so render them as MDX to keep
 * that formatting. The catalog is community-submitted: if a description holds
 * something MDX can't parse (a stray `<` or `{`), fall back to the raw text so
 * a single bad entry can't break the page.
 */
const ToolDescription = async ({
  description,
  className,
}: ToolDescriptionProps) => {
  try {
    const content = await renderSimpleMarkdown(description, {
      // Demote any headings: the tool name owns the page's heading hierarchy,
      // and anchored headings don't belong inside a description block.
      h1: htmlElements.h2,
      // Description images come from external repos with no known dimensions.
      // The default MarkdownImage feeds those into next/image, which throws on
      // the resulting NaN width — so render a plain responsive <img> instead.
      img: ({ src, alt }: ComponentPropsWithoutRef<"img">) =>
        typeof src === "string" ? (
          // eslint-disable-next-line @next/next/no-img-element -- external, unsized markdown image
          <img
            src={src}
            alt={alt ?? ""}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="mx-auto h-auto max-w-full rounded-sm"
          />
        ) : null,
    })
    return <div className={cn("flow", className)}>{content}</div>
  } catch {
    return <p className={cn("whitespace-pre-line", className)}>{description}</p>
  }
}

export default ToolDescription
