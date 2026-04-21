import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils/cn"

import Emoji from "../Emoji"
import { Center, Flex, Stack } from "../ui/flex"
import InlineLink from "../ui/Link"
import { LinkBox, LinkOverlay } from "../ui/link-box"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export type DocLinkProps = {
  children?: React.ReactNode
  href: string
  isExternal?: boolean
}

const DocLink = ({ href, children, isExternal = false }: DocLinkProps) => {
  const { isRtl } = useRtlFlip()

  return (
    <LinkBox
      className={cn(
        "flex rounded-xs border p-4 text-current no-underline",
        "hover:bg-background-highlight hover:rounded hover:no-underline",
        "group hover:shadow-primary hover:shadow-[0_0_1px]"
      )}
    >
      <Flex className="flex-1 justify-between">
        <Center>
          <Emoji className="text-md me-4" text=":page_with_curl:" />
        </Center>
        <Stack className="flex-1">
          <LinkOverlay asChild>
            <InlineLink href={href} hideArrow className="no-underline">
              <p className="font-bold text-gray-600 dark:text-gray-200">
                {children}
              </p>
            </InlineLink>
          </LinkOverlay>
        </Stack>

        <ArrowRight
          className={cn(
            "mx-6 h-6 w-6 self-center",
            "group-hover:text-primary transition-transform duration-100 group-hover:scale-[1.2]",
            isExternal ? "-rotate-45" : "rotate-0",
            isRtl && isExternal ? "-rotate-[135deg]" : "",
            isRtl && !isExternal ? "-rotate-[180deg]" : ""
          )}
        />
      </Flex>
    </LinkBox>
  )
}

export default DocLink
