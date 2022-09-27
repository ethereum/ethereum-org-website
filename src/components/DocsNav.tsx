import React from "react"
import { Flex, FlexProps, Text } from "@chakra-ui/react"

import Link from "./Link"
import Emoji from "./Emoji"
import Translation from "./Translation"

import docLinks from "../data/developer-docs-links.yaml"
import { DeveloperDocsLink } from "../types"
import { TranslationKey } from "../utils/translations"

// TODO make entire card a link
const Card: React.FC<FlexProps> = ({ children, ...props }) => (
  <Flex
    alignItems="center"
    mt={4}
    w="262px"
    h="82px"
    bg="background"
    border="1px"
    borderColor="border"
    borderRadius={1}
    {...props}
  >
    {children}
  </Flex>
)

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
      direction={{ base: "column-reverse", m: "row" }}
      justify="space-between"
      alignItems={{ base: "center", m: "flex-start" }}
    >
      {previousDoc ? (
        <Card justify="flex-start">
          <Link to={previousDoc.to} textDecoration="none" p={4} h="100%">
            <Emoji text=":point_left:" fontSize="5xl" />
          </Link>
          <TextDiv ps="0">
            <Text textTransform="uppercase" m="0">
              <Translation id="previous" />
            </Text>
            <Link to={previousDoc.to} textAlign="start">
              <Translation id={previousDoc.id} />
            </Link>
          </TextDiv>
        </Card>
      ) : (
        <Flex />
      )}
      {nextDoc ? (
        <Card justify="flex-end">
          <TextDiv alignItems="flex-end" pe="0">
            <Text textTransform="uppercase" m="0">
              <Translation id="next" />
            </Text>
            <Link to={nextDoc.to} textAlign="end">
              <Translation id={nextDoc.id} />
            </Link>
          </TextDiv>
          <Link to={nextDoc.to} textDecoration="none" p={4} h="100%">
            <Emoji text=":point_right:" fontSize="5xl" />
          </Link>
        </Card>
      ) : (
        <Flex />
      )}
    </Flex>
  )
}

export default DocsNav
