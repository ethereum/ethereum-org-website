import {
  type ComponentType,
  Fragment,
  type ReactNode,
  type SVGProps,
} from "react"
import { AppWindowMac, Code } from "lucide-react"
import { getTranslations } from "next-intl/server"

import type { CatalogItem, CatalogItemLinkKind } from "@/lib/types"

import ChainImages, { getRenderableChains } from "@/components/ChainImages"
import { ChevronNext } from "@/components/Chevron"
import ContentFeedback from "@/components/ContentFeedback"
import Discord from "@/components/icons/discord.svg"
import Farcaster from "@/components/icons/farcaster.svg"
import GitHub from "@/components/icons/github.svg"
import Reddit from "@/components/icons/reddit.svg"
import Telegram from "@/components/icons/telegram.svg"
import X from "@/components/icons/twitter.svg"
import { Image } from "@/components/Image"
import MainArticle from "@/components/MainArticle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ButtonLink } from "@/components/ui/buttons/Button"
import { LinkBox, LinkOverlay } from "@/components/ui/link-box"
import { Tag } from "@/components/ui/tag"

import CatalogItemDescription from "./Description"
import ExpandableDescription from "./ExpandableDescription"
import CatalogItemGallery from "./Gallery"

const COLLAPSE_AFTER_CHARS = 600
const MAX_CHAINS = 8

const LINKS: Record<
  CatalogItemLinkKind,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; platform?: string }
> = {
  x: { Icon: X, platform: "X" },
  discord: { Icon: Discord, platform: "Discord" },
  telegram: { Icon: Telegram, platform: "Telegram" },
  reddit: { Icon: Reddit, platform: "Reddit" },
  farcaster: { Icon: Farcaster, platform: "Farcaster" },
  github: { Icon: GitHub, platform: "GitHub" },
  code: { Icon: Code },
}
const LINK_ORDER = Object.keys(LINKS) as CatalogItemLinkKind[]

const detailEvent = (item: CatalogItem, eventName: string) => ({
  eventCategory: "detail",
  eventAction: `${item.kind} name ${item.name}`,
  eventName,
})

export const CatalogItemLinks = async ({ item }: { item: CatalogItem }) => {
  const t = await getTranslations("component-catalog-item")
  const links = [...item.socialLinks].sort(
    (a, b) => LINK_ORDER.indexOf(a.kind) - LINK_ORDER.indexOf(b.kind)
  )
  if (!item.primaryLink && links.length === 0) return null

  return (
    <div className="flex flex-wrap gap-4">
      {item.primaryLink && (
        <ButtonLink
          href={item.primaryLink.href}
          hideArrow
          className="w-full sm:w-fit"
          customEventOptions={detailEvent(item, "visit")}
        >
          {item.primaryLink.label}
        </ButtonLink>
      )}
      {links.map(({ kind, href }) => {
        const { Icon, platform = t("catalog-item-source-code") } = LINKS[kind]
        return (
          <ButtonLink
            key={href}
            href={href}
            variant="outline"
            isSecondary
            hideArrow
            aria-label={t("catalog-item-link-label", {
              name: item.name,
              platform,
            })}
            customEventOptions={detailEvent(item, kind)}
          >
            <Icon />
          </ButtonLink>
        )
      })}
    </div>
  )
}

export const CatalogItemInfo = async ({
  rows,
}: {
  rows: CatalogItem["infoRows"]
}) => {
  if (rows.length === 0) return null
  const t = await getTranslations("component-catalog-item")

  return (
    <div className="flex h-fit w-full flex-col gap-4 rounded-base border bg-background p-8 md:w-56">
      <h3 className="text-lg">{t("catalog-item-info-title")}</h3>
      <dl className="flex flex-col gap-4">
        {rows.map(({ label, value }) => (
          <div key={label}>
            <dt className="text-sm text-body-medium">{label}</dt>
            <dd className="text-sm">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

const CatalogItemNext = async ({ item }: { item: CatalogItem }) => {
  if (!item.next) return null
  const t = await getTranslations("component-catalog-item")

  return (
    <LinkBox className="group flex shrink-0 flex-row items-center gap-2 self-end rounded-lg p-3 hover:bg-background-highlight sm:self-start">
      <div className="flex flex-col text-end">
        <p className="text-sm text-nowrap text-body-medium">
          {t("catalog-item-see-next")}
        </p>
        <LinkOverlay
          href={item.next.href}
          className="text-primary no-underline group-hover:text-primary-hover"
          matomoEvent={detailEvent(item, "see_next")}
        >
          {item.next.name}
        </LinkOverlay>
      </div>
      <ChevronNext className="size-8 text-body-medium group-hover:text-primary" />
    </LinkBox>
  )
}

const CatalogItemHero = ({ item }: { item: CatalogItem }) => (
  <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
    <div className="flex min-w-0 flex-col gap-6 lg:flex-row lg:gap-10">
      {item.logo ? (
        <Image
          src={item.logo}
          alt=""
          width={128}
          height={128}
          className="size-16 shrink-0 rounded-xl object-contain xl:size-32"
        />
      ) : (
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-background-highlight xl:size-32">
          <AppWindowMac className="size-8 text-body-medium xl:size-12" />
        </div>
      )}
      <div className="flex min-w-0 flex-col gap-4">
        <div className="flex flex-col gap-2">
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {item.tags.map(({ label, status }) => (
                <Tag key={label} status={status ?? "tag"}>
                  {label}
                </Tag>
              ))}
            </div>
          )}
          <h1 className="mt-0 line-clamp-2">{item.name}</h1>
          {item.subtitle && (
            <p className="text-sm text-body-medium">{item.subtitle}</p>
          )}
          {getRenderableChains(item.chains).length > 0 && (
            <ChainImages chains={item.chains} max={MAX_CHAINS} />
          )}
        </div>
        <CatalogItemLinks item={item} />
      </div>
    </div>
    <CatalogItemNext item={item} />
  </div>
)

export const RelatedCatalogItems = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <section className="flex flex-col items-center gap-8 rounded-base bg-tint-accent-a px-4 py-12 md:px-8">
    <h2>{title}</h2>
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-3">
      {children}
    </div>
  </section>
)

/**
 * Shared detail page for apps, developer tools and wallets. `children` fills
 * the About panel between the description and the gallery; `related` is a
 * `RelatedCatalogItems`, which the page omits when there is nothing related.
 */
const CatalogItemLayout = async ({
  item,
  children,
  related,
}: {
  item: CatalogItem
  children?: ReactNode
  related?: ReactNode
}) => {
  const t = await getTranslations("component-catalog-item")
  const description = item.description && (
    <CatalogItemDescription description={item.description} />
  )

  return (
    <>
      <div className="px-page py-hero lg:py-hero-2x">
        <Breadcrumb>
          <BreadcrumbList>
            {item.breadcrumbs.map(({ label, href }) => (
              <Fragment key={href}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="ms-[0.625rem] me-[0.625rem] text-gray-400">
                  /
                </BreadcrumbSeparator>
              </Fragment>
            ))}
            <BreadcrumbItem>
              <BreadcrumbPage>{item.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <main className="px-page pb-page">
        <MainArticle className="flex flex-col gap-10">
          {item.banner && (
            <Image
              src={item.banner}
              alt=""
              preload
              width={1200}
              height={300}
              className="h-40 w-full rounded-base object-cover sm:h-56"
            />
          )}

          <CatalogItemHero item={item} />

          <div className="grid grid-cols-1 gap-10 rounded-2xl bg-background-highlight px-4 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:px-8">
            <div className="flex min-w-0 flex-col gap-6">
              <h2 className="text-h4">
                {t("catalog-item-about-title", { name: item.name })}
              </h2>
              {item.description &&
              item.description.length > COLLAPSE_AFTER_CHARS ? (
                <ExpandableDescription>{description}</ExpandableDescription>
              ) : (
                description
              )}
              {children}
              {item.screenshots.length > 0 && (
                <div className="flex flex-col gap-4">
                  <h3 className="text-2xl">
                    {t("catalog-item-gallery-title")}
                  </h3>
                  <CatalogItemGallery
                    screenshots={item.screenshots}
                    name={item.name}
                    kind={item.kind}
                  />
                </div>
              )}
            </div>
            <CatalogItemInfo rows={item.infoRows} />
          </div>

          {related}
        </MainArticle>

        <ContentFeedback />
      </main>
    </>
  )
}

export default CatalogItemLayout
