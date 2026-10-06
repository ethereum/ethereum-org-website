import type { StaticImageData } from "next/image"
import { getTranslations } from "next-intl/server"

import PathwayCard from "@/components/cards/pathway-card"
import { Image } from "@/components/Image"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import enterpriseImg from "@/public/images/organizations/hero-enterprise.png"
import privacyImg from "@/public/images/organizations/hero-privacy.png"
import publicSectorImg from "@/public/images/organizations/hero-public-sector.png"
import smallBusinessImg from "@/public/images/organizations/hero-small-business.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import l2StackImg from "@/public/images/organizations/isometric-l2-stack.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"
import foundersImg from "@/public/images/upgrades/merge.png"

// Each image is the target page's hero image
const PATHWAYS = {
  "public-sector": {
    href: "/organizations/public-sector/",
    image: publicSectorImg,
  },
  enterprise: { href: "/organizations/enterprise/", image: enterpriseImg },
  // Same target as `enterprise`, with the copy the subpage row was designed with
  "enterprise-hub": {
    href: "/organizations/enterprise/",
    image: enterpriseImg,
  },
  "small-business": {
    href: "/organizations/small-business/",
    image: smallBusinessImg,
  },
  founders: { href: "/organizations/founders/", image: foundersImg },
  tokenization: {
    href: "/organizations/enterprise/tokenization/",
    image: tokenizationImg,
  },
  "onchain-finance": {
    href: "/organizations/enterprise/onchain-finance/",
    image: defiImg,
  },
  "enterprise-l2s": {
    href: "/organizations/enterprise/enterprise-l2s/",
    image: l2StackImg,
  },
  privacy: { href: "/organizations/enterprise/privacy/", image: privacyImg },
} satisfies Record<string, { href: string; image: StaticImageData }>

export type PathwayKey = keyof typeof PATHWAYS

const ENTERPRISE_SUBPAGES = [
  "privacy",
  "onchain-finance",
  "tokenization",
  "enterprise-l2s",
] as const satisfies PathwayKey[]

export type EnterpriseSubpage = (typeof ENTERPRISE_SUBPAGES)[number]

type OrganizationPathwaysProps = {
  id?: string
} & (
  | {
      /** Two onward pathways; the first is marked recommended */
      pathways: [PathwayKey, PathwayKey]
      current?: never
    }
  | {
      /** Enterprise subpage rendering the row: links the hub plus its siblings */
      current: EnterpriseSubpage
      pathways?: never
    }
)

const OrganizationPathways = async ({
  id = "keep-exploring",
  pathways,
  current,
}: OrganizationPathwaysProps) => {
  const t = await getTranslations("page-organizations")

  const keys: PathwayKey[] = current
    ? [
        "enterprise-hub",
        ...ENTERPRISE_SUBPAGES.filter((key) => key !== current),
      ]
    : pathways

  const cards = keys.map((key, idx) => (
    <PathwayCard
      key={key}
      href={PATHWAYS[key].href}
      title={t(`page-organizations-pathways-${key}-title`)}
      description={t(`page-organizations-pathways-${key}-description`)}
      badge={
        !current && idx === 0
          ? { label: t("page-organizations-pathways-recommended") }
          : undefined
      }
      banner={<Image src={PATHWAYS[key].image} alt="" sizes="160px" />}
      className={current ? "h-full" : "max-w-3xl"}
    />
  ))

  return (
    <Section id={id}>
      <h2>{t("page-organizations-pathways-title")}</h2>
      <p className="text-lg text-pretty text-body-medium">
        {current
          ? t("page-organizations-pathways-subpages-description")
          : t("page-organizations-pathways-description")}
      </p>
      {current ? (
        <Grid balanced={2} data-flow="cta" className="auto-rows-fr">
          {cards}
        </Grid>
      ) : (
        cards
      )}
    </Section>
  )
}

export default OrganizationPathways
