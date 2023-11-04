import { join } from "path"
import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import ogImageDefault from "@/public/home/hero.png"
import ogImageDevelopers from "@/public/enterprise-eth.png"
import ogImageDapps from "@/public/doge-computer.png"
import ogImageUpgrades from "@/public/upgrades/upgrade_doge.png"
import { DEFAULT_LOCALE, SITE_URL } from "@/lib/constants"

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
  title: string
  description: string
  image?: string
  canonicalUrl?: string
  author?: string
}

const PageMetadata: React.FC<IProps> = ({
  description,
  title,
  image,
  canonicalUrl,
  author,
}) => {
  const { locale, asPath } = useRouter()
  const { t } = useTranslation()

  const desc = description || t("site-description")
  const siteTitle = t("site-title")
  const fullTitle = `${title} | ${siteTitle}`

  /* Set canonical URL w/ language path to avoid duplicate content */
  /* e.g. set ethereum.org/about/ to ethereum.org/en/about/ */
  const canonical = canonicalUrl || join(SITE_URL, DEFAULT_LOCALE, asPath)
  const url = locale ? join(SITE_URL, locale, asPath) : canonical

  /* Set fallback ogImage based on path */
  let ogImage = ogImageDefault.src

  if (asPath.includes("/developers/")) {
    ogImage = ogImageDevelopers.src
  }

  if (asPath.includes("/dapps/")) {
    ogImage = ogImageDapps.src
  }

  if (asPath.includes("/roadmap/")) {
    ogImage = ogImageUpgrades.src
  }

  if (image) {
    ogImage = image
  }

  const ogImageUrl = join(SITE_URL, ogImage)
  const metadata: Array<Meta> = [
    { name: `description`, content: desc },
    { name: `image`, content: ogImageUrl },
    { property: `og:title`, content: fullTitle },
    { property: `og:description`, content: desc },
    { property: `og:type`, content: `website` },
    { name: `twitter:card`, content: `summary_large_image` },
    { name: `twitter:creator`, content: author || siteTitle },
    { name: `twitter:site`, content: author || siteTitle },
    { name: `twitter:title`, content: fullTitle },
    { name: `twitter:description`, content: desc },
    { name: `twitter:image`, content: ogImageUrl },
    { property: `og:url`, content: url },
    { property: `og:image`, content: ogImageUrl },
    { property: `og:site_name`, content: siteTitle },
    { name: `docsearch:description`, content: desc },
  ]

  return (
    <Head>
      <title>{fullTitle}</title>
      {metadata.map((data) => (
        <meta
          key={(data as NameMeta).name || (data as PropMeta).property}
          {...data}
        />
      ))}
      <link rel="canonical" key={canonical} href={canonical} />
      {/* favicon */}
      <link rel="icon" type="image/x-icon" href="favicon.ico" />
      {/* TODO: Add manifest */}
      {/* <link rel="manifest" href="/manifest.json" /> */}
    </Head>
  )
}

export default PageMetadata
