import React from "react"
import { Link as GatsbyLink } from "gatsby"
import { Box, List, ListItem } from "@chakra-ui/react"
import Link from "../Link"

interface Item {
  id: string
  title: string
}

interface ITableOfContentsLinkProps {
  item: Item
}

const TableOfContentsLink: React.FC<ITableOfContentsLinkProps> = ({
  item: { id, title },
}) => {
  const url = `#${id}`

  return (
    <Link
      as={GatsbyLink}
      to={url}
      position="relative"
      display="inline-block"
      color="text300"
      // `li :last-child` global selector wants to override this without `!important`
      mb="0.5rem !important"
    >
      {title}
    </Link>
  )
}

export interface IProps {
  items: Array<Item>
}

const StakingHomeTableOfContents: React.FC<IProps> = ({ items }) => {
  if (!items) return null

  return (
    <Box as="nav" p={0} textAlign="right" mb={8} overflowY="auto">
      <List fontSize="xl" lineHeight={1.6} fontWeight={400} ps={4} pe={1} m={0}>
        {items.map((item, index) => (
          <ListItem key={index} m={0}>
            <div>
              <TableOfContentsLink item={item} />
            </div>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default StakingHomeTableOfContents
