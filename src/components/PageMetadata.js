import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"

import { getDefaultMessage } from "../utils/translations"

const PageMetadata = ({ description, meta, title }) => {
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
          name: `twitter:site`,
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
        {
          property: `og:video`,
          content: `https://www.youtube.com/channel/UCNOfzGXD_C9YMYmnefmPH0g`,
        },
        {
          property: `og:site_name`,
          content: `ethereum.org`,
        },
      ].concat(meta)}
    >
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://ethereum.org",
          "email": "press@ethereum.org",
          "name": "Ethereum",
          "logo": "https://ethereum.org/og-image.png"
        }
      `}
      </script>
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
        async
      ></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
      />
    </Helmet>
  )
}

PageMetadata.defaultProps = {
  meta: [],
  description: ``,
  title: ``,
}

PageMetadata.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default PageMetadata
