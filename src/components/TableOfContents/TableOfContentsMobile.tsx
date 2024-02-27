import React from "react"
import { useTranslation } from "next-i18next"
import { MdExpandMore } from "react-icons/md"
import {
  Box,
  chakra,
  Fade,
  Flex,
  Icon,
  List,
  useDisclosure,
  useToken,
} from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { outerListProps } from "@/lib/utils/toc"

import ItemsList from "./ItemsList"

export type TableOfContentsMobileProps = {
  items?: Array<ToCItem>
  maxDepth?: number
}

const Mobile = ({ items, maxDepth }: TableOfContentsMobileProps) => {
  const { t } = useTranslation("common")
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure({
    defaultIsOpen: false,
  })
  if (!items) {
    return null
  }

  return (
    <Box
      hideFrom={lgBp}
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
          {t("on-this-page")}
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
  )
}

export default Mobile
