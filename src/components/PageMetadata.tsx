import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useI18next, useTranslation } from "gatsby-plugin-react-i18next"
import { useLocation } from "@reach/router"
import { getSrc } from "gatsby-plugin-image"

import { isLang } from "../utils/languages"

type NameMeta = {
  name: string
  content: string
}

type PropMeta = {
  property: string
  content: string
}

export type Meta = NameMeta | PropMeta

export interface IProps {
  description?: string | null
  meta?: Array<Meta>
  image?: string
  title: string
  canonicalUrl?: string | null
}

const PageMetadata: React.FC<IProps> = ({
  description,
  meta = [],
  title,
  image,
  canonicalUrl,
}) => {
  if (!description) console.warn(`Missing PageMetadata description: ${title}`)
  const {
    site,
    ogImageDefault,
    ogImageDevelopers,
    ogImageDapps,
    ogImageUpgrades,
  } = useStaticQuery(
    graphql`
      {
        site {
          siteMetadata {
            author
            url
          }
        }
        ogImageDefault: file(relativePath: { eq: "home/hero.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FIXED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        ogImageDevelopers: file(relativePath: { eq: "enterprise-eth.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FIXED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        ogImageDapps: file(relativePath: { eq: "doge-computer.png" }) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FIXED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
        ogImageUpgrades: file(
          relativePath: { eq: "upgrades/upgrade_doge.png" }
        ) {
          childImageSharp {
            gatsbyImageData(
              width: 1200
              layout: FIXED
              placeholder: BLURRED
              quality: 100
            )
          }
        }
      }
    `
  )

  const location = useLocation()

  const { t } = useTranslation()
  const { language } = useI18next()

  const desc = description || t("site-description")

  const siteTitle = t("site-title")

  /* Set canonical URL w/ language path to avoid duplicate content */
  /* e.g. set ethereum.org/about/ to ethereum.org/en/about/ */
  const { pathname } = location
  let canonicalPath = pathname
  const firstDirectory = canonicalPath.split("/")[1]
  if (!isLang(firstDirectory)) {
    canonicalPath = `/en${pathname}`
  }
  const canonical = canonicalUrl || `${site.siteMetadata.url}${canonicalPath}`

  /* Set fallback ogImage based on path */
  const siteUrl = site.siteMetadata.url
  let ogImage = getSrc(ogImageDefault)
  if (pathname.includes("/developers/")) {
    ogImage = getSrc(ogImageDevelopers)
  }
  if (pathname.includes("/dapps/")) {
    ogImage = getSrc(ogImageDapps)
  }
  if (pathname.includes("/roadmap/")) {
    ogImage = getSrc(ogImageUpgrades)
  }
  if (image) {
    ogImage = image
  }
  const ogImageUrl = `${siteUrl}${ogImage}`

  return (
    <Helmet
      htmlAttributes={{ lang: language }}
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
        {
          name: `docsearch:description`,
          content: desc,
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
}

PageMetadata.defaultProps = {
  description: ``,
  meta: [],
  image: ``,
  title: ``,
}

PageMetadata.propTypes = {
  description: PropTypes.string,
  meta: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
      PropTypes.shape({
        property: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      }),
    ]).isRequired
  ),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default PageMetadata
