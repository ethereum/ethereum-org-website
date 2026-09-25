import { getTranslations } from "next-intl/server"

import PathwayCard from "@/components/cards/pathway-card"
import { Image } from "@/components/Image"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import enterpriseImg from "@/public/images/organizations/hero-enterprise.png"
import defiImg from "@/public/images/organizations/isometric-defi.png"
import privacyImg from "@/public/images/organizations/isometric-privacy.png"
import tokenizationImg from "@/public/images/organizations/isometric-tokenization.png"

const READING = [
  {
    key: "enterprise",
    // Isometric line art like its three siblings. `ethereum-city.png` is an
    // opaque full-colour illustration, so as a card banner it read as a photo
    // dropped into a row of transparent line drawings.
    href: "/organizations/enterprise/",
    image: enterpriseImg,
  },
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
] as const

type FurtherReadingProps = {
  id?: string
}

/**
 * "Further reading" cross-links between the enterprise pages. The design
 * shows all four cards on every page (including the current one), so this
 * component does the same; strings live in the `page-organizations` namespace.
 */
const FurtherReading = async ({
  id = "further-reading",
}: FurtherReadingProps) => {
  const t = await getTranslations("page-organizations")

  return (
    <Section id={id}>
      <h2>{t("page-organizations-further-reading-title")}</h2>
      {/* `1fr` auto-rows so the second row matches the first: the grid
          otherwise sizes each row to its own tallest card, and these four
          descriptions run one to three lines. */}
      <Grid balanced={2} data-flow="cta" className="[grid-auto-rows:1fr]">
        {READING.map(({ key, href, image }) => (
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
