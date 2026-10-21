import type { ComponentPropsWithoutRef } from "react"

import { htmlElements } from "@/components/MdComponents"

import { cn } from "@/lib/utils/cn"

import { renderSimpleMarkdown } from "@/lib/md/renderSimple"

type CatalogItemDescriptionProps = {
  description: string
  className?: string
}

/**
 * Descriptions are markdown (plain text is valid markdown), and some are
 * community-submitted: if one holds something MDX can't parse (a stray `<` or
 * `{`), fall back to the raw text so a single bad entry can't break the page.
 */
const CatalogItemDescription = async ({
  description,
  className,
}: CatalogItemDescriptionProps) => {
  try {
    const content = await renderSimpleMarkdown(description, {
      // Headings sit under the "About {name}" h2, so nothing may outrank an h3.
      h1: htmlElements.h3,
      h2: htmlElements.h3,
      h3: htmlElements.h4,
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
    return (
      <div
        dir="auto"
        className={cn("flow [&_h3]:text-h5 [&_h4]:text-h6", className)}
      >
        {content}
      </div>
    )
  } catch {
    return (
      <p dir="auto" className={cn("whitespace-pre-line", className)}>
        {description}
      </p>
    )
  }
}

export default CatalogItemDescription
