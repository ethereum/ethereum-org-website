import { AiOutlineArrowRight } from "react-icons/ai"

import { cn } from "@/lib/utils/cn"

import { Center, Flex, Stack } from "./ui/flex"
import { BaseLink } from "./ui/Link"
import Emoji from "./Emoji"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export type DocLinkProps = {
  children?: React.ReactNode
  href: string
  isExternal?: boolean
}

const DocLink = ({ href, children, isExternal = false }: DocLinkProps) => {
  const { flipForRtl } = useRtlFlip()

  return (
    <BaseLink
      className={cn(
        "flex rounded-sm border p-4 text-current no-underline",
        "hover:rounded hover:bg-background-highlight hover:no-underline",
        "group hover:shadow-[0_0_1px] hover:shadow-primary"
      )}
      href={href}
    >
      <Flex className="flex-1 justify-between">
        <Center>
          <Emoji className="me-4 text-md" text=":page_with_curl:" />
        </Center>
        <Stack className="flex-1">
          <p className="font-semibold text-[#4c4c4c] dark:text-[#cccccc]">
            {children}
          </p>
        </Stack>

        <AiOutlineArrowRight
          className={cn(
            "mx-6 h-6 w-6 self-center",
            "transition-transform duration-100 group-hover:scale-[1.2] group-hover:fill-primary",
            isExternal ? "-rotate-45" : "rotate-0",
            flipForRtl && isExternal ? "-rotate-[135deg]" : ""
          )}
        />
      </Flex>
    </BaseLink>
  )
}

export default DocLink
