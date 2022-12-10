import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import { Box, UnorderedList, ListItem } from "@chakra-ui/react"

import Link from "./Link"
import { isLang } from "../utils/languages"
import { isTranslationKey } from "../utils/translations"

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
  const { t } = useTranslation()

  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item).slice(startDepth)

  const crumbs = sliced.map((path, idx) => {
    // If homepage (e.g. "en"), set text to "home" translation
    const text = isLang(path)
      ? t("page-index-meta-title")
      : isTranslationKey(path)
      ? t(path)
      : ""

    return {
      fullPath: slugChunk.slice(0, idx + 2 + startDepth).join("/") + "/",
      text: text.toUpperCase(),
    }
  })

  return (
    <Box
      aria-label="Breadcrumb"
      dir="auto"
      {...restProps}
      as="nav"
      marginBottom={8}
      listStyleType="none"
      position="relative"
      zIndex={1}
    >
      <UnorderedList
        display="flex"
        flexWrap="wrap"
        listStyleType="none"
        margin={0}
      >
        {crumbs.map((crumb, idx) => (
          <ListItem
            key={idx}
            margin={0}
            marginRight={2}
            fontSize="sm"
            lineHeight="140%"
            letterSpacing="wider"
          >
            <Link
              to={crumb.fullPath}
              isPartiallyActive={slug === crumb.fullPath}
              textDecoration="none"
              color="textTableOfContents"
              _hover={{ color: "primary", textDecor: "none" }}
              _active={{ color: "primary" }}
            >
              {crumb.text}
            </Link>
            {idx < crumbs.length - 1 && (
              <Box as="span" marginLeft={2} color="textTableOfContents">
                /
              </Box>
            )}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  )
}

export default Breadcrumbs
