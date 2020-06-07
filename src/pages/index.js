import React from "react"
// import { useIntl, Link, FormattedMessage } from "gatsby-plugin-intl"
import { Link, FormattedMessage } from "gatsby-plugin-intl"

const Home = () => {
  // const intl = useIntl()

  return (
    <div>
      {/* <SEO title={intl.formatMessage({ id: "title" })} /> */}
      <h1>
        <FormattedMessage id="page-home-section-beginners-item-one" />
      </h1>
      <p>
        <Link to="/what-is-ethereum/">
          <FormattedMessage id="page-home-section-beginners-item-two" />
        </Link>
      </p>
    </div>
  )
}

export default Home
