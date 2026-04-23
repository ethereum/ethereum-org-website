import { StaticImageData } from "next/image"
import type { BaseHTMLAttributes, ElementType, ReactNode } from "react"

import { Image } from "@/components/Image"
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
        "shadow-table hover:bg-background-highlight hover:shadow-table-box-hover focus:shadow-table-box-hover flex flex-col hover:scale-[1.02] hover:rounded hover:duration-100 focus:scale-[1.02] focus:rounded focus:duration-100 md:flex-row",
        className
      )}
      {...props}
    >
      <Flex
        className={cn(
          "from-accent-a/10 to-accent-c/10 flex h-[260px] flex-row bg-linear-to-r",
          isBottom ? "items-end" : "items-center",
          isRight ? "justify-end" : "justify-center"
        )}
      >
        <Image
          src={image}
          alt={alt || ""}
          width={imageWidth}
          className="max-h-full self-center object-cover p-4"
        />
      </Flex>
      <div className="flex flex-col justify-center p-6">
        <h3 className="mt-2 mb-4 text-2xl leading-snug font-semibold">
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
        <p className={"text-body/65 mb-0"}>{description}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </LinkBox>
  )
}

export default ActionCard
