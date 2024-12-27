import { StaticImageData } from "next/image"
import type { BaseHTMLAttributes, ElementType, ReactNode } from "react"

import { TwImage } from "@/components/Image"
import InlineLink from "@/components/ui/Link"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"

import { cn } from "@/lib/utils/cn"

import { Flex } from "./ui/flex"
export type ActionCardProps = Omit<
  BaseHTMLAttributes<HTMLDivElement>,
  "title"
> & {
  as?: ElementType
  children?: ReactNode
  href: string
  alt?: string
  image: StaticImageData
  imageWidth?: number
  title: ReactNode
  description?: ReactNode
  className?: string
  isRight?: boolean
  isBottom?: boolean
}

const ActionCard = ({
  href,
  alt,
  image,
  imageWidth = 220,
  title,
  description,
  children,
  className,
  isRight,
  isBottom = true,
  ...props
}: ActionCardProps) => {
  return (
    <LinkBox
      className={cn(
        "flex shadow-table hover:scale-[1.02] hover:rounded hover:bg-background-highlight hover:shadow-table-box-hover hover:duration-100 focus:scale-[1.02] focus:rounded focus:shadow-table-box-hover focus:duration-100",
        className
      )}
      {...props}
    >
      <Flex
        className={cn(
          "flex h-[260px] flex-row bg-gradient-to-r from-accent-a/10 to-accent-c/10",
          isBottom ? "items-end" : "items-center",
          isRight ? "justify-end" : "justify-center"
        )}
      >
        <TwImage
          src={image}
          alt={alt || ""}
          width={imageWidth}
          className="max-h-full object-cover p-4"
        />
      </Flex>
      <div className="flex flex-col justify-center p-6">
        <h3 className="mb-4 mt-2 text-2xl font-semibold leading-snug">
          <LinkOverlay asChild>
            <InlineLink
              href={href}
              hideArrow
              className="text-body no-underline"
            >
              {title}
            </InlineLink>
          </LinkOverlay>
        </h3>
        <p className={"mb-0 text-body/65"}>{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </LinkBox>
  )
}

export default ActionCard
