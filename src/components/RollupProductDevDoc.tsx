import React from "react"
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react"

import type { TranslationKey } from "@/lib/types"

import _rollups from "../data/layer-2/layer-2.json"

import InlineLink from "./Link"
import Text from "./OldText"
import Translation from "./Translation"

type RollupType = "optimistic" | "zk"

interface Rollup {
  name: string
  website: string
  developerDocs: string
  l2beat: string
  bridge: string
  bridgeWallets: Array<string>
  blockExplorer: string
  ecosystemPortal: string
  tokenLists: string
  noteKey: TranslationKey
  purpose: Array<string>
  descriptionKey: string
  imageKey: string
  background: string
}

type Rollups = { [type in RollupType]: Array<Rollup> }

const rollups = _rollups as Rollups

export interface IProps {
  rollupType: RollupType
}

const RollupProductDevDoc: React.FC<IProps> = ({ rollupType }) => {
  return (
    <Box>
      {rollups[rollupType].map(
        ({ name, noteKey, website, developerDocs, l2beat }, idx) => {
          return (
            <Flex key={idx} my={4} background="rollupDevDocList">
              <Box p={4} pb={0}>
                <Box>
                  <Heading
                    as="h4"
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight="500"
                    lineHeight="1.4"
                    my={4}
                  >
                    {name}
                  </Heading>
                  {noteKey.length > 0 && (
                    <Text>
                      * <Translation id={`page-layer-2:${noteKey}`} />
                    </Text>
                  )}
                  <UnorderedList>
                    <ListItem>
                      <InlineLink to={website}>
                        <Translation id="rollup-component-website" />
                      </InlineLink>
                    </ListItem>
                    <ListItem>
                      <InlineLink to={developerDocs}>
                        <Translation id="rollup-component-developer-docs" />
                      </InlineLink>
                    </ListItem>
                    <ListItem>
                      <InlineLink to={l2beat}>
                        <Translation id="rollup-component-technology-and-risk-summary" />
                      </InlineLink>
                    </ListItem>
                  </UnorderedList>
                </Box>
              </Box>
            </Flex>
          )
        }
      )}
    </Box>
  )
}

export default RollupProductDevDoc
