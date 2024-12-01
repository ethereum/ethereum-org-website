import { ChakraProps, List, ListItem } from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import ToCLink from "@/components/TableOfContents/TableOfContentsLink"

export type ItemsListProps = ChakraProps & {
  items: Array<ToCItem>
  depth: number
  maxDepth: number
  activeHash?: string
}

const ItemsList = ({
  items,
  depth,
  maxDepth,
  activeHash,
  ...rest
}: ItemsListProps) => {
  if (depth > maxDepth) return null

  return (
    <>
      {items.map((item, index) => {
        const { title, items } = item
        return (
          <ListItem key={index} m={0} {...rest}>
            <ToCLink depth={depth} item={item} activeHash={activeHash} />
            {items && (
              <List key={title} fontSize="sm" ps="2" m="0" mt="2" spacing="2">
                <ItemsList
                  items={items}
                  depth={depth + 1}
                  maxDepth={maxDepth}
                  activeHash={activeHash}
                />
              </List>
            )}
          </ListItem>
        )
      })}
    </>
  )
}

ItemsList.displayName = "TocItemsList"

export default ItemsList
