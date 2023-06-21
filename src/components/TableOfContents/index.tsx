import React, { useContext } from "react"

import {
  Box,
  BoxProps,
  calc,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  List,
  ListItem,
  Show,
  Switch,
  useToken,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"
import { useActiveHash } from "../../hooks/useActiveHash"
import { ZenModeContext } from "../../contexts/ZenModeContext"
import ButtonLink from "../ButtonLink"
import Translation from "../Translation"

import Mobile from "./TableOfContentsMobile"
import ItemsList from "./ItemsList"
import { getCustomId, Item, outerListProps } from "./utils"
import { trackCustomEvent } from "../../utils/matomo"

export { Item }

export interface IProps extends BoxProps {
  items: Array<Item>
  maxDepth?: number
  slug?: string
  editPath?: string
  hideEditButton?: boolean
  isMobile?: boolean
}

const TableOfContents: React.FC<IProps> = ({
  items,
  maxDepth = 1,
  slug,
  editPath,
  hideEditButton = false,
  isMobile = false,
  ...rest
}) => {
  const { isZenMode, handleZenModeChange } = useContext(ZenModeContext)
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const titleIds: Array<string> = []

  if (!isMobile) {
    const getTitleIds = (items: Array<Item>, depth: number): void => {
      if (depth > (maxDepth ? maxDepth : 1)) return

      items?.forEach((item) => {
        if (item.items && Array.isArray(item.items)) {
          if (item.title) titleIds.push(getCustomId(item.title))
          getTitleIds(item.items, depth + 1)
        } else {
          titleIds.push(getCustomId(item.title))
        }
      })
    }

    getTitleIds(items, 0)
  }

  const activeHash = useActiveHash(titleIds)

  // Exclude <h1> from TOC
  if (items?.length === 1) {
    items = items[0].items!
  }
  if (!items) {
    return null
  }
  if (isMobile) {
    return <Mobile items={items} maxDepth={maxDepth} />
  }

  const shouldShowZenModeToggle = slug?.includes("/docs/")

  return (
    // TODO: Switch to `above="lg"` after completion of Chakra Migration
    <Show above={lgBp}>
      <Box
        as="aside"
        position="sticky"
        top="7.25rem" // Account for navbar
        p={4}
        pe={0}
        maxW="25%"
        minW={48}
        height={calc.subtract("100vh", "80px")}
        overflowY="auto"
        {...rest}
      >
        <List {...outerListProps}>
          {!hideEditButton && (
            <ListItem mb={2}>
              <ButtonLink to={editPath} variant="outline" hideArrow mt={0}>
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  <Translation id="edit-page" />
                </Flex>
              </ButtonLink>
            </ListItem>
          )}
          {shouldShowZenModeToggle && (
            <Flex
              as={ListItem}
              alignItems="center"
              mb={2}
              py="2px"
              opacity={0.8}
              fontSize="sm"
            >
              <FormControl as={Flex} alignItems="center">
                <FormLabel htmlFor="zen-mode" mb={0} me={2} fontSize="sm">
                  <Translation id="zen-mode" />
                </FormLabel>
                <Switch
                  id="zen-mode"
                  size="sm"
                  // TODO: Consider moving the below styling to the custom Chakra Theme
                  sx={{
                    "& .chakra-switch__track": {
                      background: "transparent",
                      border: "2px solid",
                      borderColor: "secondary",
                      p: 0,
                      "&[data-checked]": {
                        background: "secondary",
                      },
                    },
                    "& .chakra-switch__thumb": {
                      background: "ednBackground",
                      outline: "2px solid",
                      outlineColor: "secondary",
                    },
                  }}
                  isChecked={isZenMode}
                  onChange={() => {
                    handleZenModeChange()
                    trackCustomEvent({
                      eventCategory: "zen mode",
                      eventAction: "click",
                      eventName: isZenMode ? "activate" : "deactivate",
                    })
                  }}
                />
              </FormControl>
            </Flex>
          )}
          <ListItem>
            <Box mb={2} textTransform="uppercase">
              <Translation id="on-this-page" />
            </Box>
            <List m={0}>
              <ItemsList
                items={items}
                depth={0}
                maxDepth={maxDepth ? maxDepth : 1}
                activeHash={activeHash}
              />
            </List>
          </ListItem>
        </List>
      </Box>
    </Show>
  )
}

export default TableOfContents
