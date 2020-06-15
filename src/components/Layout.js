import React from "react"
import { ThemeProvider } from "styled-components"
import { IntlProvider } from "gatsby-plugin-intl"

import "../styles/layout.css"
import { lightTheme, darkTheme, GlobalStyle } from "./Theme"

import Nav from "./Nav"
import Footer from "./Footer"

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
    // IntlProvider appears to be necessary in order to pass context into components
    // that live outside page components (e.g. Nav & Footer). See:
    // https://github.com/wiziple/gatsby-plugin-intl/issues/116
    const intl = this.props.pageContext.intl
    const theme = this.state.isDarkTheme ? darkTheme : lightTheme

    return (
      <IntlProvider
        locale={intl.language}
        defaultLocale={intl.defaultLocale}
        messages={intl.messages}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle isDarkTheme={this.state.isDarkTheme} />
          <Nav handleThemeChange={this.handleThemeChange} />
          {this.props.children}
          <Footer />
        </ThemeProvider>
      </IntlProvider>
    )
  }
}
export default Layout
