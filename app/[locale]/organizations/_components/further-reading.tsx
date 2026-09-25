import { getTranslations } from "next-intl/server"

import PathwayCard from "@/components/cards/pathway-card"
import { Image } from "@/components/Image"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import enterpriseImg from "@/public/images/organizations/hero-enterprise.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import l2StackImg from "@/public/images/organizations/isometric-l2-stack.png"
import privacyImg from "@/public/images/organizations/isometric-privacy.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"

/**
 * Always the first card: the hub every one of these pages sits under.
 *
 * Isometric line art like its three siblings. `ethereum-city.png` is an opaque
 * full-colour illustration, so as a card banner it read as a photo dropped into
 * a row of transparent line drawings.
 */
const HUB = {
  key: "enterprise",
  href: "/organizations/enterprise/",
  image: enterpriseImg,
} as const

/** The four enterprise subpages, in the order the design lists them. */
const SUBPAGES = [
  {
    key: "privacy",
    href: "/organizations/enterprise/privacy/",
    image: privacyImg,
  },
  {
    key: "onchain-finance",
    href: "/organizations/enterprise/onchain-finance/",
    image: defiImg,
  },
  {
    key: "tokenization",
    href: "/organizations/enterprise/tokenization/",
    image: tokenizationImg,
  },
  {
    // TODO(content): title and description written for this PR, not from Figma
    // -- the design's four-card row left this page out, so it carries no copy.
    // The title matches what the enterprise hub calls this page.
    key: "enterprise-l2s",
    href: "/organizations/enterprise/enterprise-l2s/",
    image: l2StackImg,
  },
] as const

export type EnterpriseSubpage = (typeof SUBPAGES)[number]["key"]

type FurtherReadingProps = {
  id?: string
  /** The page rendering this section; its own card is dropped from the row. */
  current: EnterpriseSubpage
}

/**
 * "Further reading" cross-links between the enterprise pages: the hub, then
 * the three sibling subpages. `current` is required rather than optional so a
 * page cannot link to itself -- with four subpages and a fixed hub card, the
 * row is always four cards wide whichever page renders it.
 *
 * Strings live in the `page-organizations` namespace.
 */
const FurtherReading = async ({
  id = "further-reading",
  current,
}: FurtherReadingProps) => {
  const t = await getTranslations("page-organizations")

  const reading = [HUB, ...SUBPAGES.filter(({ key }) => key !== current)]

  return (
    <Section id={id}>
      <h2>{t("page-organizations-further-reading-title")}</h2>
      {/* `1fr` auto-rows so the second row matches the first: the grid
          otherwise sizes each row to its own tallest card, and these four
          descriptions run one to three lines. */}
      <Grid balanced={2} data-flow="cta" className="[grid-auto-rows:1fr]">
        {reading.map(({ key, href, image }) => (
          <PathwayCard
            key={key}
            href={href}
            title={t(`page-organizations-further-reading-${key}-title`)}
            description={t(
              `page-organizations-further-reading-${key}-description`
            )}
            banner={<Image src={image} alt="" sizes="160px" />}
            // The grid track already stretches; without this the card sits at
            // its own content height inside it, so the four descriptions --
            // which run one to three lines -- gave four different card heights.
            className="h-full"
          />
        ))}
      </Grid>
    </Section>
  )
}

export default FurtherReading
