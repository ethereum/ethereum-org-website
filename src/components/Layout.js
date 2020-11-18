// TODO figure out case, Netlify is case sensitive
// https://community.netlify.com/t/support-guide-netlify-app-builds-locally-but-fails-on-deploy-case-sensitivity/10754
import React, { useState, useEffect } from "react"
import { ThemeProvider } from "styled-components"
import { IntlProvider, IntlContextProvider } from "gatsby-plugin-intl"
import styled from "styled-components"

import "../styles/layout.css"
import { lightTheme, darkTheme, GlobalStyle } from "../theme"

import BannerNotification from "./BannerNotification"
import Footer from "./Footer"
import Link from "./Link"
import Nav from "./Nav"
import SideNav from "./SideNav"
import SideNavMobile from "./SideNavMobile"

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

  /* Adjust margin-top depending nav, subnav & banner */
  margin-top: ${(props) =>
    props.shouldShowSubNav
      ? props.theme.variables.navSubNavHeightDesktop
      : props.theme.variables.navHeight};
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

const StyledBannerNotification = styled(BannerNotification)`
  text-align: center;
`

const Layout = (props) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false)

  useEffect(() => {
    if (localStorage && localStorage.getItem("dark-theme") !== null) {
      setIsDarkTheme(localStorage.getItem("dark-theme") === "true")
    } else {
      setIsDarkTheme(window.matchMedia("(prefers-color-scheme: dark)").matches)
    }

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches }) => {
        if (localStorage && localStorage.getItem("dark-theme") === null) {
          setIsDarkTheme(matches)
        }
      })

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", ({ matches }) => {
          if (localStorage && localStorage.getItem("dark-theme") === null) {
            setIsDarkTheme(matches)
          }
        })
    }
  }, [])

  const handleThemeChange = () => {
    setIsDarkTheme(!isDarkTheme)
    if (localStorage) {
      localStorage.setItem("dark-theme", isDarkTheme)
    }
  }

  // IntlProvider & IntlContextProvider appear to be necessary in order to pass context
  // into components that live outside page components (e.g. Nav & Footer).
  // https://github.com/wiziple/gatsby-plugin-intl/issues/116
  const intl = props.pageContext.intl
  const theme = isDarkTheme ? darkTheme : lightTheme

  const path = props.path
  const shouldShowSideNav = path.includes("/docs/")
  const shouldShowSubNav = path.includes("/developers/")
  const shouldShowBanner =
    path.includes("/eth2/") && !path.includes("/eth2/deposit-contract/")

  return (
    <IntlProvider
      locale={intl.language}
      defaultLocale={intl.defaultLocale}
      messages={intl.messages}
    >
      <IntlContextProvider value={intl}>
        <ThemeProvider theme={theme}>
          <GlobalStyle isDarkTheme={isDarkTheme} />
          <ContentContainer>
            <Nav
              handleThemeChange={handleThemeChange}
              isDarkTheme={isDarkTheme}
              path={path}
            />

            <MainContainer
              shouldShowBanner={shouldShowBanner}
              shouldShowSubNav={shouldShowSubNav}
              shouldShowSideNav={shouldShowSideNav}
            >
              {shouldShowSideNav && <SideNav path={path} />}
              {shouldShowSideNav && <SideNavMobile path={path} />}
              <MainContent>
                <StyledBannerNotification shouldShow={shouldShowBanner}>
                  Staking has arrived! If you're looking to stake your ETH,{" "}
                  <Link to="/eth2/deposit-contract/">
                    confirm the deposit contract address
                  </Link>
                  .
                </StyledBannerNotification>
                <Main>{props.children}</Main>
              </MainContent>
            </MainContainer>
            <Footer />
          </ContentContainer>
        </ThemeProvider>
      </IntlContextProvider>
    </IntlProvider>
  )
}

export default Layout
