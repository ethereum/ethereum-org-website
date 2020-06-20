import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../utils/translations"

const SEO = ({ description, meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            url
            image
          }
        }
      }
    `
  )

  const intl = useIntl()

  const desc =
    description ||
    intl.formatMessage({
      id: "site-description",
      defaultMessage: getDefaultMessage("site-description"),
    })

  const siteTitle = intl.formatMessage({
    id: "site-title",
    defaultMessage: getDefaultMessage("site-title"),
  })

  return (
    <Helmet
      htmlAttributes={{ lang: intl.locale }}
      title={title}
      titleTemplate={`%s | ${siteTitle}`}
      meta={[
        {
          name: `description`,
          content: desc,
        },
        {
          name: `image`,
          content: site.siteMetadata.image,
        },
        {
          property: `og:title`,
          content: `${title} | ${siteTitle}`,
        },
        {
          property: `og:description`,
          content: desc,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: `${title} | ${siteTitle}`,
        },
        {
          name: `twitter:description`,
          content: desc,
        },
        {
          name: `twitter:image`,
          content: "https://ethereum.org/og-image-twitter.png",
        },
        {
          property: `og:url`,
          content: site.siteMetadata.url,
        },
        {
          property: `og:image`,
          content: site.siteMetadata.image,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  meta: [],
  description: ``,
  title: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
