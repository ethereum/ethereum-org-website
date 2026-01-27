import * as React from "react"
import { cva, VariantProps } from "class-variance-authority"
import { AppWindowMac } from "lucide-react"

import type { MatomoEventOptions } from "@/lib/types"

import { Image } from "@/components/Image"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag, TagProps, TagsInlineText } from "@/components/ui/tag"
import TruncatedText from "@/components/ui/TruncatedText"

import { cn } from "@/lib/utils/cn"

// Outer wrapper variants (hover behavior)
const appCardVariants = cva("group/appcard rounded-xl p-2 text-body", {
  variants: {
    hover: {
      highlight: "hover:bg-background-highlight",
      none: "",
    },
  },
  defaultVariants: {
    hover: "highlight",
  },
})

const layoutVariants = cva("flex gap-3", {
  variants: {
    layout: {
      horizontal: "",
      vertical: "flex-col",
    },
    defaultVariant: {
      layout: "vertical",
    },
  },
})

// Image size variants
const imageSizeVariants = cva("flex shrink-0 overflow-hidden rounded-xl", {
  variants: {
    size: {
      xs: "size-10", // 40px
      small: "size-12", // 48px
      thumbnail: "size-14", // 56px
      medium: "size-16", // 64px
      large: "size-24", // 96px
    },
  },
  defaultVariants: {
    size: "medium",
  },
})

type ImageSize = "xs" | "small" | "thumbnail" | "medium" | "large"

// Map size to pixel values for Image component
const imageSizePixels: Record<ImageSize, number> = {
  xs: 40,
  small: 48,
  thumbnail: 56,
  medium: 64,
  large: 96,
}

export interface AppCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof appCardVariants>,
    VariantProps<typeof imageSizeVariants>,
    VariantProps<typeof layoutVariants> {
  // Content
  name: string
  description?: string
  thumbnail?: string
  category?: string
  categoryTagStatus?: TagProps["status"]
  tags?: string[]

  // Link
  href?: string

  // Layout options
  imageSize?: ImageSize

  // Tracking (optional)
  customEventOptions?: MatomoEventOptions
  descriptionTracking?: MatomoEventOptions

  // Styling
  fallbackIcon?: React.ReactNode
}

const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  (
    {
      // Content
      name,
      description,
      thumbnail,
      category,
      categoryTagStatus,
      tags,
      // Link
      href,
      // Layout
      layout,
      hover,
      imageSize,
      // Tracking
      customEventOptions,
      descriptionTracking,
      // Styling
      className,
      fallbackIcon = <AppWindowMac className="size-12" />,
      ...props
    },
    ref
  ) => {
    const innerContent = (
      <div className={cn(layoutVariants({ layout }))}>
        {/* Image or fallback */}
        {(thumbnail || fallbackIcon) && (
          <div
            className={cn(
              imageSizeVariants({ size: imageSize }),
              !thumbnail && fallbackIcon && "grid place-items-center border"
            )}
          >
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={name}
                className="size-full object-contain"
                width={imageSize ? imageSizePixels[imageSize] : 64}
                height={imageSize ? imageSizePixels[imageSize] : 64}
              />
            ) : (
              fallbackIcon
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1.5">
          {/* Category tag - shown if category is provided */}
          {category && (
            <Tag size="small" className="w-fit py-0" status={categoryTagStatus}>
              {category}
            </Tag>
          )}

          {/* Name - hover effect triggers when inside a group (LinkBox) */}
          <p className="text-lg font-bold leading-none text-body group-hover/appcard:text-primary-hover group-hover:text-primary-hover">
            {name}
          </p>

          {/* Description - shown if description is provided */}
          {description && (
            <TruncatedText
              className="text-body"
              matomoEvent={descriptionTracking}
            >
              {description}
            </TruncatedText>
          )}

          {/* Tags */}
          {tags && tags.length > 0 && (
            <TagsInlineText list={tags} variant="light" />
          )}
        </div>
      </div>
    )

    // Static card (no link) - no wrapper padding, just the content
    if (!href) {
      return (
        <div
          ref={ref}
          className={cn("group/appcard text-body", className)}
          {...props}
        >
          {innerContent}
        </div>
      )
    }

    // Linked card - uses hover prop
    return (
      <LinkBox
        ref={ref}
        className={cn(appCardVariants({ hover }), className)}
        {...props}
      >
        <LinkOverlay
          href={href}
          scroll={href?.startsWith("?") ? false : undefined}
          className="no-underline"
          matomoEvent={customEventOptions}
        >
          {innerContent}
        </LinkOverlay>
      </LinkBox>
    )
  }
)
AppCard.displayName = "AppCard"

export default AppCard
