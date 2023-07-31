import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import { Flex } from "@chakra-ui/react"

import Footer from "./Footer"
import Nav from "./Nav"
import SideNav from "./SideNav"
import SideNavMobile from "./SideNavMobile"
import TranslationBanner from "./TranslationBanner"
import TranslationBannerLegal from "./TranslationBannerLegal"
import FeedbackWidget from "./FeedbackWidget"
import { SkipLink } from "./SkipLink"

import { lightTheme as oldTheme } from "../theme"

import { isLangRightToLeft } from "../utils/translations"
import { scrollIntoView } from "../utils/scrollIntoView"

import type { Context } from "../types"

import client from "../apollo"

import "../../static/fonts/inter-font-face.css"
import "../../static/fonts/ibm-plex-font-face.css"

export interface IProps {
  children?: React.ReactNode
  data?: {
    pageData?: {
      frontmatter?: {
        isOutdated: boolean
      }
    }
  }
  location: {
    hash: string
  }
  path: string
  pageContext: Context
}

const Layout: React.FC<IProps> = ({
  data,
  location,
  path,
  pageContext,
  children,
}) => {
  const [shouldShowSideNav, setShouldShowSideNav] = useState<boolean>(false)

  useEffect(() => {
    if (path.includes("/docs/")) {
      setShouldShowSideNav(true)
    } else {
      setShouldShowSideNav(false)
    }

    if (location.hash && !location.hash.includes("gatsby")) {
      const idTag = location.hash.split("#")
      scrollIntoView(idTag[1])
    }
  }, [path, location])

  const isPageLanguageEnglish = pageContext.isDefaultLang
  const isPageContentEnglish = !!pageContext.isContentEnglish
  const isLegal = !!pageContext.isLegal
  const isTranslationBannerIgnored = !!pageContext.ignoreTranslationBanner
  const isPageTranslationOutdated =
    !!pageContext.isOutdated || !!data?.pageData?.frontmatter?.isOutdated
  const isPageRightToLeft = isLangRightToLeft(pageContext.language)

  const shouldShowTranslationBanner =
    (isPageTranslationOutdated ||
      (isPageContentEnglish && !isPageLanguageEnglish)) &&
    !isTranslationBannerIgnored

  return (
    <ApolloProvider client={client}>
      <SkipLink hrefId="#main-content" />
      <TranslationBanner
        shouldShow={shouldShowTranslationBanner}
        isPageContentEnglish={isPageContentEnglish}
        isPageRightToLeft={isPageRightToLeft}
        originalPagePath={pageContext.i18n.originalPath || ""}
      />
      <TranslationBannerLegal
        shouldShow={isLegal}
        isPageRightToLeft={isPageRightToLeft}
        originalPagePath={pageContext.i18n.originalPath || ""}
      />

      <Flex
        position="relative"
        margin="0px auto"
        minHeight="100vh"
        flexFlow="column"
        maxW={{
          lg: oldTheme.variables.maxPageWidth,
        }}
      >
        <Nav path={path} />
        {shouldShowSideNav && <SideNavMobile path={path} />}
        <Flex
          flexDirection={{ base: "column", lg: "row" }}
          id="main-content"
          scrollMarginTop={20}
        >
          {shouldShowSideNav && <SideNav path={path} />}
          <Flex flexDirection="column" width="100%">
            <Flex
              justifyContent="space-around"
              alignItems="flex-start"
              overflow="visible"
              width="100%"
              flexGrow="1"
            >
              {children}
            </Flex>
          </Flex>
        </Flex>
        <Footer />
        <FeedbackWidget location={path} />
      </Flex>
    </ApolloProvider>
  )
}

export default Layout
