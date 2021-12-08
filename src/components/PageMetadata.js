import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useIntl } from "gatsby-plugin-intl"
import { Location } from "@reach/router"

import { translateMessageId, languageMetadata } from "../utils/translations"

const supportedLanguages = Object.keys(languageMetadata)

const PageMetadata = ({ description, meta, title, image, canonicalUrl }) => {
  const {
    site,
    ogImageDefault,
    ogImageDevelopers,
    ogImageDapps,
    ogImageEthtwo,
  } = useStaticQuery(
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
        ogImageDevelopers: file(relativePath: { eq: "enterprise-eth.png" }) {
          childImageSharp {
            fixed(width: 1200) {
              src
            }
          }
        }
        ogImageDapps: file(relativePath: { eq: "doge-computer.png" }) {
          childImageSharp {
            fixed(width: 1200) {
              src
            }
          }
        }
        ogImageEthtwo: file(relativePath: { eq: "eth2/eth2_doge.png" }) {
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

  const desc = description || translateMessageId("site-description", intl)

  const siteTitle = translateMessageId("site-title", intl)

  return (
    <Location>
      {({ location }) => {
        /* Set canonocial URL w/ language path to avoid duplicate content */
        /* e.g. set ethereum.org/about/ to ethereum.org/en/about/ */
        const { pathname } = location
        let canonicalPath = pathname
        const firstDirectory = canonicalPath.split("/")[1]
        if (!supportedLanguages.includes(firstDirectory)) {
          canonicalPath = `/en${pathname}`
        }
        const canonical =
          canonicalUrl || `${site.siteMetadata.url}${canonicalPath}`

        /* Set fallback ogImage based on path */
        const siteUrl = site.siteMetadata.url
        let ogImage = ogImageDefault.childImageSharp.fixed.src
        if (pathname.includes("/developers/")) {
          ogImage = ogImageDevelopers.childImageSharp.fixed.src
        }
        if (pathname.includes("/dapps/")) {
          ogImage = ogImageDapps.childImageSharp.fixed.src
        }
        if (pathname.includes("/eth2/")) {
          ogImage = ogImageEthtwo.childImageSharp.fixed.src
        }
        if (image) {
          ogImage = image
        }
        const ogImageUrl = siteUrl.concat(ogImage)

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
                content: ogImageUrl,
              },
              {
                property: `og:url`,
                content: siteUrl,
              },
              {
                property: `og:image`,
                content: ogImageUrl,
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
