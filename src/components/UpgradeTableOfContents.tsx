import React, { useRef } from "react"
import { Box, List, ListItem } from "@chakra-ui/react"
import Link from "./Link"
import { Item as TableOfContentsItem } from "./TableOfContents"

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

export interface Item extends TableOfContentsItem {
  id?: string
}

const TableOfContentsLink: React.FC<{ item: Item }> = (props) => {
  const { item } = props

  const idString = useRef("")

  if (!!item.id) {
    idString.current = item.id
  } else {
    idString.current = item.title
  }

  const url = `#${getCustomId(idString.current)}`

  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }

  let classes = ""
  if (isActive) {
    classes += " active"
  }

  return (
    <Link
      to={url}
      className={classes}
      position="relative"
      display="inline-block"
      // `li :last-child` global selector wants to override this without `!important`
      mb="0.5rem !important"
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

const ItemsList: React.FC<IPropsItemsList> = ({ items, depth, maxDepth }) => {
  if (depth > maxDepth || !items) {
    return null
  }
  return (
    <>
      {items.map((item, index) => (
        <ListItem m={0} key={index}>
          <TableOfContentsLink item={item} />
        </ListItem>
      ))}
    </>
  )
}

function UpgradeTableOfContents(props: {
  items: Array<{ id: string; title: string }>
}): JSX.Element
function UpgradeTableOfContents(props: {
  maxDepth: number
  items: Array<TableOfContentsItem>
}): JSX.Element
function UpgradeTableOfContents(props: {
  maxDepth?: number
  items: Array<Item>
}) {
  const { items, maxDepth = 1 } = props

  return (
    <Box
      as="nav"
      p={0}
      mb={8}
      textAlign="end"
      overflowY="auto"
      display={{ base: "none", l: "block" }}
    >
      <List
        m={0}
        py={0}
        ps={4}
        pe={1}
        fontSize="xl"
        fontWeight="normal"
        lineHeight="1.6"
        styleType="none"
      >
        <ItemsList items={items} depth={0} maxDepth={maxDepth} />
      </List>
    </Box>
  )
}

export default UpgradeTableOfContents
