import { join } from "path"

import Head from "next/head"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import { SITE_URL } from "@/lib/constants"

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
  const origin = process.env.NEXT_PUBLIC_SITE_URL || SITE_URL // TODO: Remove .env var usage after launch

  // Remove any query params (?) or hash links (#)
  const path = asPath.replace(/[\?\#].*/, "")
  const slug = path.split("/")

  /* Set canonical URL w/ language path to avoid duplicate content */
  /* e.g. set ethereum.org/about/ to ethereum.org/en/about/ */
  const url = new URL(join(locale!, path), origin).href
  const canonical = canonicalUrl || url

  /* Set fallback ogImage based on path */
  let ogImage = "/home/hero.png"

  if (slug.includes("developers")) {
    ogImage = "/enterprise-eth.png"
  }

  if (slug.includes("dapps")) {
    ogImage = "/doge-computer.png"
  }

  if (slug.includes("roadmap")) {
    ogImage = "/upgrades/upgrade_doge.png"
  }

  if (image) {
    ogImage = image
  }

  const ogImageUrl = new URL(ogImage, origin).href
  const metadata: Meta[] = [
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
    </Head>
  )
}

export default PageMetadata
