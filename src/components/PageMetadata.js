import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { Location } from "@reach/router"

import { getDefaultMessage, languageMetadata } from "../utils/translations"

const supportedLanguages = Object.keys(languageMetadata)

const PageMetadata = ({ description, meta, title, image }) => {
  const { site, ogImageDefault } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            author
            url
          }
        }
        ogImageDefault: file(relativePath: { eq: "home/hero.png" }) {
          childImageSharp {
            fixed(width: 1200) {
              src
            }
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

  const ogImage = image
    ? site.siteMetadata.url.concat(image)
    : site.siteMetadata.url.concat(ogImageDefault.childImageSharp.fixed.src)

  return (
    <Location>
      {({ location }) => {
        {
          /* Set canonocial URL w/ language path to avoid duplicate content */
          /* e.g. set ethereum.org/about/ to ethereum.org/en/about/ */
        }
        const { pathname } = location
        let canonicalPath = pathname
        const firstDirectory = canonicalPath.split("/")[1]
        if (!supportedLanguages.includes(firstDirectory)) {
          canonicalPath = `/en${pathname}`
        }
        const canonical = `${site.siteMetadata.url}${canonicalPath}`
        return (
          <Helmet
            htmlAttributes={{ lang: intl.locale }}
            title={title}
            titleTemplate={`%s | ${siteTitle}`}
            link={[{ rel: "canonical", key: canonical, href: canonical }]}
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
                content: `summary_large_image`,
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
                content: ogImage,
              },
              {
                property: `og:url`,
                content: site.siteMetadata.url,
              },
              {
                property: `og:image`,
                content: ogImage,
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
          </Helmet>
        )
      }}
    </Location>
  )
}

PageMetadata.defaultProps = {
  description: ``,
  meta: [],
  image: ``,
  title: ``,
}

PageMetadata.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default PageMetadata
