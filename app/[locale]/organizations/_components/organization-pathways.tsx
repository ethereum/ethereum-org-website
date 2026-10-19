import { omit } from "lodash"
import { getTranslations } from "next-intl/server"

import PathwayCard from "@/components/cards/pathway-card"
import { Image } from "@/components/Image"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { organizationPages } from "../_lib/pages"

// Public sector is reached from the hub only, never as an onward pathway
const PATHWAYS = {
  ...omit(organizationPages, "public-sector"),
  // Same target as `enterprise`, with the copy the subpage row was designed with
  "enterprise-hub": organizationPages.enterprise,
}

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
