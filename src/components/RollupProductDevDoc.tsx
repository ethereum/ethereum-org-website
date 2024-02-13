import React from "react"
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/react"

import { layer2Data, Rollups, RollupType } from "@/data/layer-2/layer-2"

import InlineLink from "./Link"
import Text from "./OldText"
import Translation from "./Translation"

const rollups = layer2Data as Rollups

export type RollupProductDevDocProps = {
  rollupType: RollupType
}

const RollupProductDevDoc = ({ rollupType }: RollupProductDevDocProps) => {
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
