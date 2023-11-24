import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  type BreadcrumbProps as ChakraBreadcrumbProps,
} from "@chakra-ui/react"

import { BaseLink } from "@/components/Link"
import Translation from "@/components/Translation"

export type BreadcrumbsProps = ChakraBreadcrumbProps & {
  slug: string
  startDepth?: number
}

type Crumb = {
  fullPath: string
  text: string
}

// Generate crumbs from slug
// e.g. "/en/eth2/proof-of-stake/" will generate:
// [
//   { fullPath: "/en/", text: "HOME" },
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
// `startDepth` will trim breadcrumbs
// e.g. startDepth=1 will generate:
// [
//   { fullPath: "/en/eth2/", text: "ETH2" },
//   { fullPath: "/en/eth2/proof-of-stake/", text: "PROOF OF STAKE" },
// ]
const Breadcrumbs = ({
  slug: originalSlug,
  startDepth = 0,
  ...props
}: BreadcrumbsProps) => {
  const { t } = useTranslation("page-index")
  const { locale, asPath } = useRouter()

  const hasHome = asPath !== "/"
  const slug = originalSlug.replace(`/${locale}/`, "/")
  const slugChunk = slug.split("/")
  const sliced = slugChunk.filter((item) => !!item)

  const crumbs = [
    // If homepage (e.g. "en"), set text to "home" translation
    ...(hasHome
      ? [
          {
            fullPath: "/",
            text: <Translation id="page-index-meta-title" />,
          },
        ]
      : []),
    ,
    ...sliced.map((path, idx) => {
      return {
        fullPath: slugChunk.slice(0, idx + 2).join("/") + "/",
        text: t(path), // TODO: fix i18n strings for path breadcrumbs
      }
    }),
  ]
    .filter((item): item is Crumb => !!item)
    .slice(startDepth)

  return (
    <Breadcrumb dir="auto" {...props}>
      {crumbs.map(({ fullPath, text }) => {
        const isCurrentPage = slug === fullPath
        return (
          <BreadcrumbItem key={fullPath} isCurrentPage={isCurrentPage}>
            <BreadcrumbLink
              as={BaseLink}
              to={fullPath}
              isPartiallyActive={isCurrentPage}
              textTransform="uppercase"
            >
              {text}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default Breadcrumbs
