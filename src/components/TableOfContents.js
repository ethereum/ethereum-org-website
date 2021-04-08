import React, { useState } from "react"
import { motion } from "framer-motion"
import { useIntl } from "gatsby-plugin-intl"
import { Link } from "gatsby"
import styled from "styled-components"

import ButtonLink from "./ButtonLink"
import Icon from "./Icon"
import Translation from "./Translation"
import { dropdownIconContainerVariant } from "./SharedStyledComponents"

const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/

const Aside = styled.aside`
  position: sticky;
  top: 7.25rem; /* account for navbar */
  padding: 1rem 0 1rem 1rem;
  max-width: 25%;
  min-width: 12rem;
  height: calc(100vh - 80px);
  overflow-y: auto;
  transition: all 0.2s ease-in-out;
  transition: transform 0.2s ease;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const OuterList = styled(motion.ul)`
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0 0 3rem;
  border-left: 1px solid ${(props) => props.theme.colors.dropdownBorder};
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;

  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    border-left: 0;
    border-top: 1px solid ${(props) => props.theme.colors.primary300};
    padding-top: 1rem;
    padding-left: 0rem;
  }
`

const InnerList = styled.ul`
  list-style-type: none;
  list-style-image: none;
  padding: 0;
  margin: 0;
  font-size: ${(props) => props.theme.fontSizes.s};
  line-height: 1.6;
  font-weight: 400;
  padding-right: 0.25rem;
  padding-left: 1rem;
`

const ListItem = styled.li`
  margin: 0;
`

const Header = styled(ListItem)`
  margin-bottom: 0.5rem;
  text-transform: uppercase;
`

const StyledTableOfContentsLink = styled(Link)`
  text-decoration: none;
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.textTableOfContents};
  margin-bottom: 0.5rem !important;
  /* Add left border bullet on hover */
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      content: "";
      background-color: ${(props) => props.theme.colors.background};
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: -1.29rem;
      top: 50%;
      margin-top: -0.25rem;
    }
  }
  /* Add left solid bullet when active */
  &.active {
    color: ${(props) => props.theme.colors.primary};
    &:after {
      content: "";
      background-color: ${(props) => props.theme.colors.primary};
      border: 1px solid ${(props) => props.theme.colors.primary};
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      position: absolute;
      left: -1.29rem;
      top: 50%;
      margin-top: -0.25rem;
    }
  }
  /* Extend bullet position when nested */
  &.nested {
    &:before {
      content: "⌞";
      opacity: 0.5;
      display: inline-flex;
      position: absolute;
      left: -14px;
      top: -4px;
    }
    &:hover {
      &:after {
        left: -2.29rem;
      }
    }
    &.active {
      &:after {
        left: -2.29rem;
      }
    }
  }
  /* Mobile styles */
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    width: 100%;
  }
`

const ButtonContainer = styled(ListItem)`
  margin-bottom: 1.5rem;
`

const ButtonContent = styled.div`
  display: flex;
  align-items: center;
`

const GithubIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text};
  margin-right: 0.5rem;
`

// Mobile styles

const AsideMobile = styled.aside`
  padding: 0.5rem 1rem;
  margin-top: 0rem;
  border-radius: 4px;
  background: ${(props) => props.theme.colors.background};
  border: 1px solid ${(props) => props.theme.colors.border};
  /* TODO find better way - this accounts for huge header margin top */
  /* but if doc DOESN'T start w/ header, it overlaps, e.g. /docs/accounts/  */
  /* margin-bottom: -10rem; */
  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    display: none;
  }
`

const HeaderMobile = styled.div`
  color: ${(props) => props.theme.colors.text200};
  cursor: pointer;
  display: flex;
  align-items: center;
  display: flex;
  justify-content: space-between;
`

const HeaderText = styled.span`
  width: 100%;
  font-weight: 500;
`

const IconContainer = styled(motion.div)`
  cursor: pointer;
`

const MobileIcon = styled(Icon)`
  fill: ${(props) => props.theme.colors.text200};

  &:hover {
    fill: ${(props) => props.theme.colors.text200};
  }
`

const slugify = (s) =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

const getCustomId = (title) => {
  const match = customIdRegEx.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

const trimmedTitle = (title) => {
  const match = customIdRegEx.exec(title)
  return match ? title.replace(match[1], "").trim() : title
}

const TableOfContentsLink = ({ depth, item }) => {
  const url = `#${getCustomId(item.title)}`
  let isActive = false
  if (typeof window !== `undefined`) {
    isActive = window.location.hash === url
  }
  const isNested = depth === 2
  let classes = ""
  if (isActive) {
    classes += " active"
  }
  if (isNested) {
    classes += " nested"
  }
  return (
    <StyledTableOfContentsLink to={url} className={classes}>
      {trimmedTitle(item.title)}
    </StyledTableOfContentsLink>
  )
}

const ItemsList = ({ items, depth, maxDepth }) => {
  if (depth > maxDepth || !items) {
    return null
  }
  return items.map((item, index) => (
    <ListItem key={index}>
      <div>
        <TableOfContentsLink depth={depth} item={item} />
        {item.items && (
          <InnerList key={item.title}>
            <ItemsList
              items={item.items}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          </InnerList>
        )}
      </div>
    </ListItem>
  ))
}

const TableOfContentsMobile = ({ items, maxDepth, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  if (!items) {
    return null
  }

  return (
    <AsideMobile className={className}>
      <HeaderMobile onClick={() => setIsOpen(!isOpen)}>
        <HeaderText>
          <Translation id="on-this-page" />
        </HeaderText>
        <IconContainer
          variants={dropdownIconContainerVariant}
          animate={isOpen ? "open" : "closed"}
        >
          <MobileIcon name="chevronDown" />
        </IconContainer>
      </HeaderMobile>
      <OuterList
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            display: "block",
            transition: {
              duration: 0.6,
            },
          },
          closed: {
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          },
        }}
        initial="closed"
      >
        <ItemsList items={items} depth={0} maxDepth={maxDepth ? maxDepth : 1} />
      </OuterList>
    </AsideMobile>
  )
}

const TableOfContents = ({
  items,
  maxDepth,
  className,
  editPath,
  isMobile = false,
}) => {
  const intl = useIntl()
  if (!items) {
    return null
  }
  // Exclude <h1> from TOC
  if (items.length === 1) {
    items = items[0].items
  }
  if (isMobile) {
    return (
      <TableOfContentsMobile
        items={items}
        maxDepth={maxDepth}
        className={className}
      />
    )
  }

  const shouldShowEditButtom = editPath && intl.locale === "en"
  return (
    <Aside className={className}>
      <OuterList>
        {shouldShowEditButtom && (
          <ButtonContainer>
            <ButtonLink to={editPath} isSecondary={true} mt={0}>
              <ButtonContent>
                <GithubIcon name="github" />{" "}
                <span>
                  <Translation id="edit-page" />
                </span>
              </ButtonContent>
            </ButtonLink>
          </ButtonContainer>
        )}
        <Header>
          <Translation id="on-this-page" />
        </Header>
        <ItemsList items={items} depth={0} maxDepth={maxDepth ? maxDepth : 1} />
      </OuterList>
    </Aside>
  )
}

export default TableOfContents
