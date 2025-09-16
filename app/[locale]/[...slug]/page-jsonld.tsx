import { Frontmatter } from "@/lib/types"

import PageJsonLD from "@/components/PageJsonLD"

import { normalizeUrlForJsonLd } from "@/lib/utils/url"

export default async function SlugJsonLD({
  locale,
  slug,
  frontmatter,
}: {
  locale: string
  slug: string
  frontmatter: Frontmatter
}) {
  const url = normalizeUrlForJsonLd(locale, `/${slug}`)

  // Generate breadcrumb items for the slug path
  const breadcrumbItems = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `https://ethereum.org/${locale}/`,
    },
  ]

  // Add breadcrumb items for each part of the slug path
  const slugParts = slug.split("/").filter(Boolean)
  let currentPath = ""

  slugParts.forEach((part, index) => {
    currentPath += "/" + part
    breadcrumbItems.push({
      "@type": "ListItem",
      position: index + 2,
      name: part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " "),
      item: normalizeUrlForJsonLd(locale, currentPath),
    })
  })

  // JSON-LD structured data for the slug page
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url,
    name: frontmatter.title,
    description: frontmatter.description,
    url: url,
    inLanguage: locale,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    isPartOf: {
      "@type": "WebSite",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbItems,
    },
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
  }

  // JSON-LD for the article content
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image
      ? `https://ethereum.org${frontmatter.image}`
      : undefined,
    author: [
      {
        "@type": "Organization",
        name: "ethereum.org",
        url: "https://ethereum.org",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
    },
    reviewedBy: {
      "@type": "Organization",
      name: "ethereum.org",
      url: "https://ethereum.org",
      logo: {
        "@type": "ImageObject",
        url: "https://ethereum.org/favicon-32x32.png",
      },
    },
    dateModified: frontmatter.published,
    mainEntityOfPage: url,
    about: {
      "@type": "Thing",
      name: frontmatter.title,
      description: frontmatter.description,
    },
  }

  return <PageJsonLD structuredData={[webPageJsonLd, articleJsonLd]} />
}
