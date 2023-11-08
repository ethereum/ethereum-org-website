import React, { useRef } from "react"
import { Box, List, ListItem } from "@chakra-ui/react"
import { BaseLink } from "./Link"
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
    <BaseLink
      to={url}
      className={classes}
      position="relative"
      display="inline-block"
      // `li :last-child` global selector wants to override this without `!important`
      mb="1rem !important"
      textDecoration="none"
      color="body.medium"
      fontWeight="normal"
      fontSize="xl"
      _hover={{
        color: "primary.hover",
        textDecoration: "none",
      }}
      _visited={{}}
    >
      {trimmedTitle(item.title)}
    </BaseLink>
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
      overflowY="auto"
      display={{ base: "none", l: "block" }}
    >
      <List m={0} py={0} lineHeight="1.4">
        <ItemsList items={items} depth={0} maxDepth={maxDepth} />
      </List>
    </Box>
  )
}

export default UpgradeTableOfContents
