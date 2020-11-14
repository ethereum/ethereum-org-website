// TODO figure out case, Netlify is case sensitive
// https://community.netlify.com/t/support-guide-netlify-app-builds-locally-but-fails-on-deploy-case-sensitivity/10754
import React from "react"
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
      ? props.theme.variables.navBannerHeightDesktop
      : props.theme.variables.navHeight};
`

const BannerWrapper = styled.div`
  display: flex;
  flex-direction: column;
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

// TODO `Layout` renders twice on page load - why?
class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkTheme: false,
    }
  }

  // set isDarkTheme based on browser/app user preferences
  componentDidMount = () => {
    if (localStorage && localStorage.getItem("dark-theme") !== null) {
      this.setState({
        isDarkTheme: localStorage.getItem("dark-theme") === "true",
      })
    } else {
      this.setState({
        isDarkTheme: window.matchMedia("(prefers-color-scheme: dark)").matches,
      })
    }
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addListener(({ matches }) => {
        if (localStorage && localStorage.getItem("dark-theme") === null) {
          this.setState({ isDarkTheme: matches })
        }
      })
  }

  componentWillUnmount = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeListener(({ matches }) => {
        if (localStorage && localStorage.getItem("dark-theme") === null) {
          this.setState({ isDarkTheme: matches })
        }
      })
  }

  handleThemeChange = () => {
    const isDarkTheme = !this.state.isDarkTheme
    this.setState({ isDarkTheme: isDarkTheme })
    if (localStorage) {
      localStorage.setItem("dark-theme", isDarkTheme)
    }
  }

  render() {
    // IntlProvider & IntlContextProvider appear to be necessary in order to pass context
    // into components that live outside page components (e.g. Nav & Footer).
    // https://github.com/wiziple/gatsby-plugin-intl/issues/116
    const intl = this.props.pageContext.intl
    const theme = this.state.isDarkTheme ? darkTheme : lightTheme

    const path = this.props.path
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
            <GlobalStyle isDarkTheme={this.state.isDarkTheme} />
            <ContentContainer>
              <Nav
                handleThemeChange={this.handleThemeChange}
                isDarkTheme={this.state.isDarkTheme}
                path={path}
              />

              <MainContainer
                shouldShowBanner={shouldShowBanner}
                shouldShowSubNav={shouldShowSubNav}
                shouldShowSideNav={shouldShowSideNav}
              >
                {shouldShowSideNav && <SideNav path={path} />}
                {shouldShowSideNav && <SideNavMobile path={path} />}
                <BannerWrapper>
                  <StyledBannerNotification shouldShow={shouldShowBanner}>
                    Staking has arrived! If you're looking to stake your ETH,{" "}
                    <Link to="/eth2/deposit-contract/">
                      confirm the deposit contract address
                    </Link>
                    .
                  </StyledBannerNotification>
                  <Main>{this.props.children}</Main>
                </BannerWrapper>
              </MainContainer>
              <Footer />
            </ContentContainer>
          </ThemeProvider>
        </IntlContextProvider>
      </IntlProvider>
    )
  }
}
export default Layout
