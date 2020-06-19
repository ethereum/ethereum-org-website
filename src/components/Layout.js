import React from "react"
import { ThemeProvider } from "styled-components"
import { IntlProvider, IntlContextProvider } from "gatsby-plugin-intl"
import styled from "styled-components"

import "../styles/layout.css"
import { lightTheme, darkTheme, GlobalStyle } from "./Theme"

import Nav from "./Nav"
import Footer from "./Footer"

const ContentContainer = styled.div`
  margin: 0px auto;
  min-height: 100vh;
  display: flex;
  flex-flow: column;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    max-width: ${(props) => props.theme.breakpoints.xl};
  }
`

const UpperContent = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  overflow: visible;
  flex-grow: 1;
  padding-top: 6rem;

  @media (min-width: ${(props) => props.theme.breakpoints.l}) {
    padding-top: 8rem;
  }
`

class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isDarkTheme: false, // TODO set based on browser preference
    }
  }

  handleThemeChange = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme })
  }

  render() {
    // IntlProvider & IntlContextProvider appear to be necessary in order to pass context
    // into components that live outside page components (e.g. Nav & Footer).
    // https://github.com/wiziple/gatsby-plugin-intl/issues/116
    const intl = this.props.pageContext.intl
    const theme = this.state.isDarkTheme ? darkTheme : lightTheme

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
              />
              <UpperContent>{this.props.children}</UpperContent>
              <Footer />
            </ContentContainer>
          </ThemeProvider>
        </IntlContextProvider>
      </IntlProvider>
    )
  }
}
export default Layout
