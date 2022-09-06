import React from "react"
import { Box, Link, ListItem, UnorderedList } from "@chakra-ui/react"

import type { Item as ItemTableOfContents } from "./TableOfContents"

const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/

const slugify = (s: string): string =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

const getCustomId = (title: string): string => {
  const match = customIdRegEx.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  return match ? title.replace(match[1], "").trim() : title
}

export interface Item extends ItemTableOfContents {}

interface IPropsTableOfContentsLink {
  depth: number
  item: Item
}

const TableOfContentsLink: React.FC<IPropsTableOfContentsLink> = ({
  depth,
  item,
}: {
  depth: number
  item: Item
}) => {
  const url = `#${getCustomId(item.title)}`
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }
  const isNested: boolean = depth === 2
  let classes = ""
  if (isActive) {
    classes += " active"
  }
  if (isNested) {
    classes += " nested"
  }
  return (
    <Link
      href={url}
      className={classes}
      position="relative"
      display="inline-block"
      mb={2}
      color="text300"
    >
      {trimmedTitle(item.title)}
    </Link>
  )
}

interface IPropsItemsList {
  items: Array<Item>
  depth: number
  maxDepth: number
}

const ItemsList: React.FC<IPropsItemsList> = ({
  items,
  depth,
  maxDepth,
}: {
  items: Array<Item>
  depth: number
  maxDepth: number
}) => {
  if (depth > maxDepth || !items) {
    return null
  }

  return (
    <>
      {items.map((item, index) => (
        <ListItem margin={0} key={index}>
          <div>
            <TableOfContentsLink depth={depth} item={item} />
          </div>
        </ListItem>
      ))}
    </>
  )
}

export interface IProps {
  items: Array<Item>
  maxDepth?: number
  className?: string
}

const UpgradeTableOfContents: React.FC<IProps> = ({
  items,
  maxDepth = 1,
  className,
}) => {
  if (!items) {
    return null
  }
  // Exclude <h1> from TOC
  if (items.length === 1) {
    items = [items[0]]
  }

  return (
    <Box
      as="aside"
      className={className}
      p={0}
      mb={8}
      textAlign="end"
      overflowY="auto"
      display={{ base: "none", l: "block" }}
    >
      <UnorderedList
        m={0}
        py={0}
        ps={4}
        pe={1}
        fontSize="1.25rem"
        fontWeight="normal"
        lineHeight="1.6"
        styleType="none"
      >
        <ItemsList items={items} depth={0} maxDepth={maxDepth} />
      </UnorderedList>
    </Box>
  )
}

export default UpgradeTableOfContents
