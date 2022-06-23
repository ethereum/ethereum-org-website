import React from "react"
import { motion } from "framer-motion"
import { Link } from "gatsby"
import styled from "styled-components"

const StyledTableOfContentsLink = styled(Link)`
  position: relative;
  display: inline-block;
  color: ${({ theme }) => theme.colors.text300};
  margin-bottom: 0.5rem !important;
`

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
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }
  // const isNested = depth === 2
  let classes = "nested"
  if (isActive) {
    classes += " active"
  }
  return (
    <StyledTableOfContentsLink to={url} className={classes}>
      {title}
    </StyledTableOfContentsLink>
  )
}

const OuterList = styled(motion.ul)`
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
  font-size: 1.25rem;
  text-align: right;
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const Aside = styled.aside`
  padding: 0rem;
  text-align: right;
  margin-bottom: 2rem;
  overflow-y: auto;
`

const ListItem = styled.li`
  margin: 0;
`

export interface IProps {
  items: Array<Item>
}

const StakingHomeTableOfContents: React.FC<IProps> = ({ items }) => {
  if (!items) return null

  return (
    <Aside>
      <OuterList>
        {items.map((item, index) => (
          <ListItem key={index}>
            <div>
              <TableOfContentsLink item={item} />
            </div>
          </ListItem>
        ))}
      </OuterList>
    </Aside>
  )
}

export default StakingHomeTableOfContents
