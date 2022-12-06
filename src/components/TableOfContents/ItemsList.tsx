import React from "react"
import { ChakraProps, List, ListItem } from "@chakra-ui/react"
import { Item } from "./utils"
import Link from "./TableOfContentsLink"

export interface IPropsItemsList extends ChakraProps {
  items?: Array<Item>
  depth: number
  maxDepth: number
  activeHash?: string
}

const ItemsList: React.FC<IPropsItemsList> = ({
  items,
  depth,
  maxDepth,
  activeHash,
  ...rest
}) => {
  if (depth > maxDepth || !items) {
    return null
  }

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} m={0} {...rest}>
          {item.title && (
            <Link depth={depth} item={item} activeHash={activeHash} />
          )}
          {item.items && (
            <List
              key={item.title}
              fontSize="sm"
              lineHeight={1.6}
              fontWeight={400}
              ps={4}
              pe={1}
              m={0}
            >
              <ItemsList
                items={item.items}
                depth={depth + 1}
                maxDepth={maxDepth}
                activeHash={activeHash}
              />
            </List>
          )}
        </ListItem>
      ))}
    </>
  )
}

ItemsList.displayName = "TocItemsList"

export default ItemsList
