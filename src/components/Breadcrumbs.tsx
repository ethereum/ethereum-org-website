import React from "react"
import styled from "styled-components"
import { useIntl } from "react-intl"

import Link from "./Link"
import { isLang, supportedLanguages } from "../utils/languages"
import { isTranslationKey, translateMessageId } from "../utils/translations"

const ListContainer = styled.nav`
  margin-bottom: 2rem;
  list-style-type: none;
  /* Avoid header overlap: */
  position: relative;
  z-index: 1;
`

const List = styled.ol`
  margin: 0;
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
`

const ListItem = styled.li`
  margin: 0;
  margin-right: 0.5rem;
  font-size: 0.875rem;
  line-height: 140%;
  letter-spacing: 0.04em;
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

export interface IProps {
  slug: string
  startDepth?: number
}

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
const Breadcrumbs: React.FC<IProps> = ({
  slug,
  startDepth = 0,
  ...restProps
}) => {
  const intl = useIntl()

  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item).slice(startDepth)

  const crumbs = sliced.map((path, idx) => {
    // If homepage (e.g. "en"), set text to "home" translation
    const text = isLang(path)
      ? translateMessageId("page-index-meta-title", intl)
      : isTranslationKey(path)
      ? translateMessageId(path, intl)
      : ""

    return {
      fullPath: slugChunk.slice(0, idx + 2 + startDepth).join("/") + "/",
      text: text.toUpperCase(),
    }
  })

  return (
    <ListContainer aria-label="Breadcrumb" dir="auto" {...restProps}>
      <List>
        {crumbs.map((crumb, idx) => (
          <ListItem key={idx}>
            <CrumbLink
              to={crumb.fullPath}
              isPartiallyActive={slug === crumb.fullPath}
            >
              {crumb.text}
            </CrumbLink>
            {idx < crumbs.length - 1 && <Slash>/</Slash>}
          </ListItem>
        ))}
      </List>
    </ListContainer>
  )
}

export default Breadcrumbs
