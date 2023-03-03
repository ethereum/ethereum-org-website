import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import { useColorModeValue, Text } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"

import { Flex } from "@chakra-ui/react"

import { lightTheme, darkTheme } from "../theme"

import Footer from "./Footer"
import Link from "./Link"
import ZenMode from "./ZenMode"
import Nav from "./Nav"
import SideNav from "./SideNav"
import SideNavMobile from "./SideNavMobile"
import TranslationBanner from "./TranslationBanner"
import TranslationBannerLegal from "./TranslationBannerLegal"
import FeedbackWidget from "./FeedbackWidget"
import { SkipLink, SkipLinkAnchor } from "./SkipLink"
import DismissableBanner from "./Banners/DismissableBanner"

import { ZenModeContext } from "../contexts/ZenModeContext"

import { useKeyPress } from "../hooks/useKeyPress"

import { isLangRightToLeft } from "../utils/translations"
import { scrollIntoView } from "../utils/scrollIntoView"
import { isMobile } from "../utils/isMobile"

import type { Context } from "../types"

import client from "../apollo"

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
  // TODO: tmp - for backward compatibility with old theme
  const theme = useColorModeValue(lightTheme, darkTheme)

  const [isZenMode, setIsZenMode] = useState<boolean>(false)
  const [shouldShowSideNav, setShouldShowSideNav] = useState<boolean>(false)

  // Exit Zen Mode on 'esc' click
  useKeyPress(`Escape`, () => handleZenModeChange(false))

  useEffect(() => {
    if (path.includes("/docs/")) {
      setShouldShowSideNav(true)

      if (localStorage.getItem("zen-mode") !== null) {
        setIsZenMode(localStorage.getItem("zen-mode") === "true" && !isMobile())
      }
    } else {
      // isZenMode and shouldShowSideNav only applicable in /docs pages
      setIsZenMode(false)
      setShouldShowSideNav(false)
    }

    if (location.hash && !location.hash.includes("gatsby")) {
      const idTag = location.hash.split("#")
      scrollIntoView(idTag[1])
    }
  }, [path, location])

  const handleZenModeChange = (val?: boolean): void => {
    // Use 'val' param if provided. Otherwise toggle
    const newVal = val !== undefined ? val : !isZenMode

    setIsZenMode(newVal)
    if (localStorage) {
      localStorage.setItem("zen-mode", String(newVal))
    }
  }

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
      <ThemeProvider theme={theme}>
        <ZenModeContext.Provider value={{ isZenMode, handleZenModeChange }}>
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
              lg: lightTheme.variables.maxPageWidth,
            }}
          >
            <ZenMode>
              <Nav path={path} />
              {shouldShowSideNav && <SideNavMobile path={path} />}
            </ZenMode>
            <SkipLinkAnchor id="main-content" />
            <Flex flexDirection={{ base: "column", lg: "row" }}>
              {shouldShowSideNav && (
                <ZenMode>
                  <SideNav path={path} />
                </ZenMode>
              )}
              <Flex flexDirection="column" width="100%">
                <DismissableBanner storageKey="kzgCeremony">
                  <Text m={0} p={0}>
                    Ethereum needs help summoning a shared secret to continue to
                    scale. Make your contribution at the{" "}
                    {
                      <Link to="https://ceremony.ethereum.org/">
                        KZG ceremony
                      </Link>
                    }
                    !
                  </Text>
                </DismissableBanner>

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
            <ZenMode>
              <Footer />
            </ZenMode>
            <FeedbackWidget location={path} />
          </Flex>
        </ZenModeContext.Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default Layout
