import React from "react"
import {
  Box,
  Flex,
  FlexProps,
  LinkBox,
  LinkOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react"

import Link from "./Link"
import Emoji from "./Emoji"
import Translation from "./Translation"

import docLinks from "../data/developer-docs-links.yaml"
import { DeveloperDocsLink } from "../types"
import { TranslationKey } from "../utils/translations"
import { trackCustomEvent } from "../utils/matomo"

const TextDiv: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    direction="column"
    justify="space-between"
    maxW="166px"
    h="100%"
    wordWrap="break-word"
    p={4}
    lineHeight={4}
    {...props}
  >
    {children}
  </Flex>
)

export interface DocsArrayProps {
  to: string
  id: TranslationKey
}

const CardLink = (props: {
  docData: DocsArrayProps
  isPrev?: boolean
  isNext?: boolean
}) => {
  const { docData, isPrev, isNext } = props

  const xPadding = {
    ...(isPrev && { ps: "0" }),
    ...(isNext && { pe: "0" }),
  }
  return (
    <LinkBox
      as={Flex}
      alignItems="center"
      mt={4}
      w="262px"
      h="82px"
      bg="background.base"
      border="1px"
      borderColor="border"
      borderRadius={1}
      justify={isPrev ? "flex-start" : "flex-end"}
    >
      <Box textDecoration="none" p={4} h="100%" order={isPrev ? 0 : 1}>
        <Emoji
          text={isPrev ? ":point_left:" : ":point_right:"}
          fontSize="5xl"
        />
      </Box>
      <TextDiv {...xPadding} {...(isNext && { textAlign: "right" })}>
        <Text textTransform="uppercase" m="0">
          <Translation id={isPrev ? "previous" : "next"} />
        </Text>
        <LinkOverlay
          as={Link}
          href={docData.to}
          textAlign={isPrev ? "start" : "end"}
          rel={isPrev ? "prev" : "next"}
          onClick={() => {
            trackCustomEvent({
              eventCategory: "next/previous article DocsNav",
              eventAction: "click",
              eventName: isPrev ? "previous" : "next",
            })
          }}
        >
          <Translation id={docData.id} />
        </LinkOverlay>
      </TextDiv>
    </LinkBox>
  )
}

export interface IProps {
  relativePath: string
}

const DocsNav: React.FC<IProps> = ({ relativePath }) => {
  // Construct array of all linkable documents in order recursively
  const docsArray: DocsArrayProps[] = []
  const getDocs = (links: Array<DeveloperDocsLink>): void => {
    for (let item of links) {
      // If object has 'items' key
      if (item.items) {
        // And if item has a 'to' key
        // Add 'to' path and 'id' to docsArray
        item.to && docsArray.push({ to: item.to, id: item.id })
        // Then recursively add sub-items
        getDocs(item.items)
      } else {
        // If object has no further 'items', add and continue
        docsArray.push({ to: item.to, id: item.id })
      }
    }
  }

  // Initiate recursive loop with full docLinks yaml
  getDocs(docLinks)

  // Find index that matches current page
  let currentIndex = 0
  for (let i = 0; i < docsArray.length; i++) {
    if (relativePath.indexOf(docsArray[i].to) > -1) {
      currentIndex = i
    }
  }

  // Extract previous and next doc based on current index +/- 1
  const previousDoc = currentIndex - 1 > 0 ? docsArray[currentIndex - 1] : null
  const nextDoc =
    currentIndex + 1 < docsArray.length ? docsArray[currentIndex + 1] : null

  return (
    <Flex
      as="nav"
      aria-label="Paginate to document"
      direction={{ base: "column-reverse", md: "row" }}
      justify="space-between"
      alignItems={{ base: "center", md: "flex-start" }}
    >
      {previousDoc ? <CardLink docData={previousDoc} isPrev /> : <Spacer />}
      {nextDoc ? <CardLink docData={nextDoc} isNext /> : <Spacer />}
    </Flex>
  )
}

export default DocsNav
