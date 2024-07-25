import { AiOutlineArrowRight } from "react-icons/ai"
import {
  Box,
  Flex,
  Icon,
  LinkBox,
  LinkOverlay,
  useToken,
} from "@chakra-ui/react"

import Emoji from "./Emoji"
import { BaseLink } from "./Link"
import Text from "./OldText"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export type DocLinkProps = {
  children?: React.ReactNode
  href: string
  isExternal?: boolean
}

const DocLink = ({ href, children, isExternal = false }: DocLinkProps) => {
  const linkBoxShadowColor = useToken("colors", "primary.base")
  const { flipForRtl } = useRtlFlip()

  return (
    <LinkBox
      padding={4}
      borderRadius="sm"
      color="text"
      border="1px"
      borderStyle="solid"
      borderColor="border"
      _hover={{
        background: "tableBackgroundHover",
        borderRadius: "base",
        boxShadow: `0 0 1px ${linkBoxShadowColor}`,
      }}
    >
      <Flex
        zIndex={1}
        display="flex"
        flexDirection="row"
        flex={1}
        justifyContent="space-between"
        data-group
      >
        <Flex align="center">
          <Emoji fontSize="md" me={4} text=":page_with_curl:" />
        </Flex>
        <Box flex={1} flexDirection="column">
          <LinkOverlay
            href={href}
            as={BaseLink}
            isExternal={isExternal}
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
            hideArrow
          >
            <Text color="text300" fontWeight="semibold" margin={0}>
              {children}
            </Text>
          </LinkOverlay>
        </Box>
        <Icon
          as={AiOutlineArrowRight}
          alignSelf="center"
          minWidth={8}
          boxSize={6}
          marginX={6}
          _groupHover={{
            fill: "primary.base",
            transition: "transform 0.1s",
            transform: `${flipForRtl} scale(1.2)`,
            rotate: isExternal ? "-45deg" : "0",
          }}
          transform={flipForRtl}
        />
      </Flex>
    </LinkBox>
  )
}

export default DocLink
