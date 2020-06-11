import React from "react"
import { createGlobalStyle } from "styled-components"
import { IntlProvider } from "gatsby-plugin-intl"

import "./layout.css"

import Nav from "./Nav"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => (props.isDarkTheme ? "gray" : "white")};
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
    // IntlProvider appears to be necessary in order to pass context into components
    // that live outside page components (e.g. Nav & Footer). See:
    // https://github.com/wiziple/gatsby-plugin-intl/issues/116
    const intl = this.props.pageContext.intl

    return (
      <IntlProvider
        locale={intl.language}
        defaultLocale={intl.defaultLocale}
        messages={intl.messages}
      >
        <Nav handleThemeChange={this.handleThemeChange} />
        <GlobalStyle isDarkTheme={this.state.isDarkTheme} />
        {this.props.children}
      </IntlProvider>
    )
  }
}
export default Layout
