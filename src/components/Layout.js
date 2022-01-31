import React, { useState, useEffect } from "react"
import { ApolloProvider } from "@apollo/client"
import client from "../apollo"
import { ThemeProvider } from "styled-components"
import { IntlProvider, IntlContextProvider } from "gatsby-plugin-intl"
import styled from "styled-components"

import "../styles/layout.css"
import { lightTheme, darkTheme, GlobalStyle } from "../theme"

import Footer from "./Footer"
import VisuallyHidden from "./VisuallyHidden"
import Nav from "./Nav"
import SideNav from "./SideNav"
import SideNavMobile from "./SideNavMobile"
// TODO: Remove Feb 9 2022
import UpgradeBannerNotification from "./UpgradeBannerNotification"
import TranslationBanner from "./TranslationBanner"

import { ZenModeContext } from "../contexts/ZenModeContext"

import { useKeyPress } from "../hooks/useKeyPress"

import { isLangRightToLeft } from "../utils/translations"
import { isMobile } from "../utils/isMobile"
import SkipLink from "./SkipLink"

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

const Layout = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)
  const [isZenMode, setIsZenMode] = useState(false)
  const [shouldShowSideNav, setShouldShowSideNav] = useState(false)

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
    if (props.path.includes("/docs/")) {
      setShouldShowSideNav(true)

      if (localStorage.getItem("zen-mode") !== null) {
        setIsZenMode(localStorage.getItem("zen-mode") === "true" && !isMobile())
      }
    } else {
      // isZenMode and shouldShowSideNav only applicable in /docs pages
      setIsZenMode(false)
      setShouldShowSideNav(false)
    }

    if (props.location.hash && !props.location.hash.includes("gatsby")) {
      const idTag = props.location.hash.split("#")
      if (document.getElementById(idTag[1]) !== null) {
        document.getElementById(idTag[1]).scrollIntoView(false)
      }
    }
  }, [props.path, props.location])

  // TODO: Remove Feb 9 2022
  const isUpgradePage =
    props.path.includes("/upgrades/") || props.path.includes("/staking/")

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme)
    if (localStorage) {
      localStorage.setItem("dark-theme", !isDarkTheme)
    }
  }

  const handleZenModeChange = (val) => {
    // Use 'val' param if provided. Otherwise toggle
    const newVal = val !== undefined ? val : !isZenMode

    setIsZenMode(newVal)
    if (localStorage) {
      localStorage.setItem("zen-mode", newVal)
    }
  }

  // IntlProvider & IntlContextProvider appear to be necessary in order to pass context
  // into components that live outside page components (e.g. Nav & Footer).
  // https://github.com/wiziple/gatsby-plugin-intl/issues/116
  const intl = props.pageContext.intl
  const theme = isDarkTheme ? darkTheme : lightTheme

  const isPageLanguageEnglish = intl.language === intl.defaultLanguage
  const isPageContentEnglish = !!props.pageContext.isContentEnglish
  const isTranslationBannerIgnored = !!props.pageContext.ignoreTranslationBanner
  const isPageTranslationOutdated =
    !!props.pageContext.isOutdated ||
    !!props.data?.pageData?.frontmatter?.isOutdated
  const isPageRightToLeft = isLangRightToLeft(intl.language)

  const shouldShowTranslationBanner =
    (isPageTranslationOutdated ||
      (isPageContentEnglish && !isPageLanguageEnglish)) &&
    !isTranslationBannerIgnored

  const path = props.path

  return (
    <ApolloProvider client={client}>
      <IntlProvider
        locale={intl.language}
        defaultLocale={intl.defaultLanguage}
        messages={intl.messages}
      >
        <IntlContextProvider value={intl}>
          <ThemeProvider theme={theme}>
            <GlobalStyle isDarkTheme={isDarkTheme} />
            <SkipLink hrefId="#main-content" />
            <TranslationBanner
              shouldShow={shouldShowTranslationBanner}
              isPageContentEnglish={isPageContentEnglish}
              isPageRightToLeft={isPageRightToLeft}
              originalPagePath={intl.originalPath}
            />
            <ContentContainer isZenMode={isZenMode}>
              <VisuallyHidden isHidden={isZenMode}>
                <Nav
                  handleThemeChange={handleThemeChange}
                  isDarkTheme={isDarkTheme}
                  path={path}
                />
                {shouldShowSideNav && <SideNavMobile path={path} />}
              </VisuallyHidden>
              <MainContainer id="main-content">
                {shouldShowSideNav && (
                  <VisuallyHidden isHidden={isZenMode}>
                    <SideNav path={path} />
                  </VisuallyHidden>
                )}
                <MainContent>
                  <ZenModeContext.Provider
                    value={{ isZenMode, handleZenModeChange }}
                  >
                    {/* TODO: Remove Feb 9 2022 */}
                    {isUpgradePage && <UpgradeBannerNotification />}
                    <Main>{props.children}</Main>
                  </ZenModeContext.Provider>
                </MainContent>
              </MainContainer>
              <VisuallyHidden isHidden={isZenMode}>
                <Footer />
              </VisuallyHidden>
            </ContentContainer>
          </ThemeProvider>
        </IntlContextProvider>
      </IntlProvider>
    </ApolloProvider>
  )
}

export default Layout
