import type { ToCItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { BaseLink } from "../ui/Link"

export type TableOfContentsLinkProps = {
  depth: number
  item: ToCItem
  activeHash?: string
}

const Link = ({
  depth,
  item: { title, url },
  activeHash,
}: TableOfContentsLinkProps) => {
  const isActive = activeHash === url

  return (
    <BaseLink
      href={url}
      className={cn(
        "group relative inline-block w-full p-2 ps-0 text-body-medium no-underline lg:w-auto",
        isActive && "visited"
      )}
    >
      <div
        className={cn(
          "absolute top-1/2 -mt-1 hidden h-2 w-2 rounded-full border border-primary-hover bg-background group-hover:inline-block",
          isActive && "inline-block"
        )}
        style={{
          insetInlineStart: `calc(-16px - 8px * ${depth} - 4px - 1px)`,
        }}
      />
      {title}
    </BaseLink>
  )
}

export default Link
