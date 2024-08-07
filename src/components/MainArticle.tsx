import { HTMLAttributes } from "react"
import { Box, type BoxProps } from "@chakra-ui/react"

import { cn } from "@/lib/utils/cn"

import { MAIN_CONTENT_ID } from "@/lib/constants"

/**
 * DEPRECATED: Use `TWMainArticle` instead
 *
 * TODO: Remove this component once all components are using Tailwind
 *
 * @deprecated
 */
const MainArticle = (props: BoxProps) => (
  <Box as="article" id={MAIN_CONTENT_ID} scrollMarginTop={24} {...props} />
)

/**
 * Tailwind version of `MainArticle`
 */
export const TWMainArticle = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => (
  <article
    id={MAIN_CONTENT_ID}
    className={cn("scroll-mt-24", className)}
    {...props}
  />
)

export default MainArticle
