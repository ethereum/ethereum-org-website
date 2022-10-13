// Libraries
import React from "react"
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"

// Components
import Link from "./Link"
import Translation from "./Translation"

// Data
import _rollups from "../data/layer-2/layer-2.json"

import { TranslationKey } from "../utils/translations"

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
        ({ name, noteKey, website, developerDocs, l2beat }) => {
          return (
            <Flex m="1rem 0" background="rollupDevDocList">
              <Box p="1rem 1rem 0 1rem">
                <Box>
                  <Heading
                    as="h4"
                    fontSize={{ base: "md", md: "xl" }}
                    fontWeight="500"
                    lineHeight="1.4"
                    m="1rem 0"
                  >
                    {name}
                  </Heading>
                  {noteKey.length > 0 && (
                    <Text>
                      * <Translation id={noteKey} />
                    </Text>
                  )}
                  <UnorderedList>
                    <ListItem>
                      <Link to={website}>
                        <Translation id="rollup-component-website" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={developerDocs}>
                        <Translation id="rollup-component-developer-docs" />
                      </Link>
                    </ListItem>
                    <ListItem>
                      <Link to={l2beat}>
                        <Translation id="rollup-component-technology-and-risk-summary" />
                      </Link>
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
