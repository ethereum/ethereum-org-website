import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import { IntlProvider } from "react-intl"
import { LocaleProvider } from "gatsby-theme-i18n"

import { lightTheme, darkTheme, GlobalStyle } from "../theme"

import Footer from "./Footer"
import VisuallyHidden from "./VisuallyHidden"
import Nav from "./Nav"
import SideNav from "./SideNav"
import SideNavMobile from "./SideNavMobile"
import TranslationBanner from "./TranslationBanner"
import TranslationBannerLegal from "./TranslationBannerLegal"
import FeedbackWidget from "./FeedbackWidget"
import { SkipLink, SkipLinkAnchor } from "./SkipLink"

import { ZenModeContext } from "../contexts/ZenModeContext"

import { useKeyPress } from "../hooks/useKeyPress"

import { isLangRightToLeft } from "../utils/translations"
import { scrollIntoView } from "../utils/scrollIntoView"
import { isMobile } from "../utils/isMobile"

import type { Context } from "../types"

import "../styles/layout.css"
import client from "../apollo"

const ContentContainer = styled.div`
  position: relative;
  margin: 0px auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: ${(props) => props.theme.variables.maxPageWidth};
  }
`

const MainContainer = styled.div`
  display: flex;
  @media (max-width: ${(props) => props.theme.breakpoints.l}) {
    flex-direction: column;
  }
`

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Main = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow: visible;
  width: 100%;
  flex-grow: 1;
`

export interface IProps {
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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false)
  const [isZenMode, setIsZenMode] = useState<boolean>(false)
  const [shouldShowSideNav, setShouldShowSideNav] = useState<boolean>(false)

  const locale = pageContext.locale
  const messages = require(`../intl/${locale}.json`)

  // Exit Zen Mode on 'esc' click
  useKeyPress(`Escape`, () => handleZenModeChange(false))

  // set isDarkTheme based on browser/app user preferences
  useEffect(() => {
    if (localStorage && localStorage.getItem("dark-theme") !== null) {
      setIsDarkTheme(localStorage.getItem("dark-theme") === "true")
    } else {
      setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }
  }, [])

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

  const handleThemeChange = (): void => {
    setIsDarkTheme(!isDarkTheme)
    if (localStorage) {
      localStorage.setItem("dark-theme", String(!isDarkTheme))
    }
  }

  const handleZenModeChange = (val?: boolean): void => {
    // Use 'val' param if provided. Otherwise toggle
    const newVal = val !== undefined ? val : !isZenMode

    setIsZenMode(newVal)
    if (localStorage) {
      localStorage.setItem("zen-mode", String(newVal))
    }
  }

  const theme = isDarkTheme ? darkTheme : lightTheme

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
    <LocaleProvider pageContext={pageContext}>
      <IntlProvider locale={locale!} key={locale} messages={messages}>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <SkipLink hrefId="#main-content" />
            <TranslationBanner
              shouldShow={shouldShowTranslationBanner}
              isPageContentEnglish={isPageContentEnglish}
              isPageRightToLeft={isPageRightToLeft}
              originalPagePath={pageContext.originalPath!}
            />
            <TranslationBannerLegal
              shouldShow={isLegal}
              isPageRightToLeft={isPageRightToLeft}
              originalPagePath={pageContext.originalPath!}
            />
            <ContentContainer>
              <VisuallyHidden isHidden={isZenMode}>
                <Nav
                  handleThemeChange={handleThemeChange}
                  isDarkTheme={isDarkTheme}
                  path={path}
                />
                {shouldShowSideNav && <SideNavMobile path={path} />}
              </VisuallyHidden>
              <SkipLinkAnchor id="main-content" />
              <MainContainer>
                {shouldShowSideNav && (
                  <VisuallyHidden isHidden={isZenMode}>
                    <SideNav path={path} />
                  </VisuallyHidden>
                )}
                <MainContent>
                  <ZenModeContext.Provider
                    value={{ isZenMode, handleZenModeChange }}
                  >
                    <Main>{children}</Main>
                  </ZenModeContext.Provider>
                </MainContent>
              </MainContainer>
              <VisuallyHidden isHidden={isZenMode}>
                <Footer />
              </VisuallyHidden>
              <FeedbackWidget />
            </ContentContainer>
          </ThemeProvider>
        </ApolloProvider>
      </IntlProvider>
    </LocaleProvider>
  )
}

export default Layout
