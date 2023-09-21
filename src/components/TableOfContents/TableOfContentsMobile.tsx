import {
  useDisclosure,
  chakra,
  Box,
  Fade,
  Flex,
  Icon,
  List,
  Show,
  useToken,
} from "@chakra-ui/react"
import React from "react"
import { MdExpandMore } from "react-icons/md"
import Translation from "../Translation"
import ItemsList from "./ItemsList"
import { Item, outerListProps } from "./utils"

export interface IPropsTableOfContentsMobile {
  items?: Array<Item>
  maxDepth?: number
}

const Mobile: React.FC<IPropsTableOfContentsMobile> = ({ items, maxDepth }) => {
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure({
    defaultIsOpen: false,
  })
  if (!items) {
    return null
  }

  return (
    <Show below={lgBp}>
      {/* TODO: switch `l` to `lg` after UI migration and use `hideBelow` prop */}
      <Box
        as="aside"
        background="background.base"
        border="1px"
        borderColor="border"
        borderRadius="4px"
        py={2}
        px={4}
      >
        <Flex
          color="text200"
          cursor="pointer"
          alignItems="center"
          justify="space-between"
          {...getButtonProps()}
        >
          <chakra.span flex={1} fontWeight={500}>
            <Translation id="on-this-page" />
          </chakra.span>
          <Icon
            as={MdExpandMore}
            transform={isOpen ? "rotate(0)" : "rotate(-90deg)"}
            boxSize={6}
            transition="transform .4s"
          />
        </Flex>
        <Fade
          in={isOpen}
          {...getDisclosureProps()}
          transition={{ enter: { duration: 0.6 } }}
        >
          <List {...outerListProps}>
            <ItemsList
              items={items}
              depth={0}
              maxDepth={maxDepth ? maxDepth : 1}
            />
          </List>
        </Fade>
      </Box>
    </Show>
  )
}

export default Mobile
