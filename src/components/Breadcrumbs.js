import React from "react"
import styled from "styled-components"
import { useIntl } from "gatsby-plugin-intl"

import Link from "./Link"
import { translateMessageId, supportedLanguages } from "../utils/translations"

const Crumb = styled.h4`
  margin: 0;
  font-size: 14px;
  line-height: 140%;
  letter-spacing: 0.04em;
  font-weight: normal;
`

const List = styled.ul`
  margin: 0;
  margin-bottom: 2rem;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  /* Avoid header overlap: */
  position: relative;
  z-index: 1;
`

const ListItem = styled.li`
  margin: 0;
  margin-right: 0.5rem;
`

const Slash = styled.span`
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.textTableOfContents};
`

const CrumbLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.textTableOfContents};
  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }
  &.active {
    color: ${(props) => props.theme.colors.primary};
  }
`

// Generate crumbs from slug
// e.g. "/en/eth2/proof-of-stake/" will generate:
// [
//   { fullPath: "/en/", text: "HOME" },
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
// `startDepth` will trim breadcrumbs
// e.g. startDepth=1 will generate:
// [
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
const Breadcrumbs = ({ slug, startDepth = 0, className }) => {
  const intl = useIntl()

  const split = slug.split("/")
  const sliced = split.filter((item) => !!item).slice(startDepth)

  const crumbs = sliced.map((path, idx) => {
    // If homepage (e.g. "en"), set text to "home" translation
    const text = supportedLanguages.includes(path)
      ? translateMessageId("page-index-meta-title", intl)
      : translateMessageId(path, intl)

    return {
      fullPath: split.slice(0, idx + 2 + startDepth).join("/") + "/",
      text: text.toUpperCase(),
    }
  })

  return (
    <List className={className}>
      {crumbs.map((crumb, idx) => (
        <ListItem key={idx}>
          <Crumb>
            <CrumbLink
              to={crumb.fullPath}
              isPartiallyActive={slug === crumb.fullPath}
            >
              {crumb.text}
            </CrumbLink>
            {idx < crumbs.length - 1 && <Slash>/</Slash>}
          </Crumb>
        </ListItem>
      ))}
    </List>
  )
}

export default Breadcrumbs
