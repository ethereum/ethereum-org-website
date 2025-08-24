import { cva, type VariantProps } from "class-variance-authority"

import type { ToCItem } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

import { BaseLink } from "../ui/Link"

const variants = cva(
  "group relative inline-block w-full text-body-medium no-underline lg:w-auto",
  {
    variants: {
      variant: {
        docs: "py-0.5",
        beginner: "[&_[data-label='marker']]:!hidden inline leading-base",
        left: "",
      },
    },
    defaultVariants: {
      variant: "docs",
    },
  }
)

export type TableOfContentsLinkProps = {
  depth: number
  item: ToCItem
  activeHash?: string
} & VariantProps<typeof variants>

const Link = ({
  depth,
  item: { title, url },
  activeHash,
  variant,
}: TableOfContentsLinkProps) => {
  const isActive = activeHash === url

  return (
    <BaseLink
      data-state-active={isActive}
      href={url}
      className={variants({
        variant,
        className: isActive && "visited text-primary",
      })}
    >
      <div
        data-label="marker"
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
