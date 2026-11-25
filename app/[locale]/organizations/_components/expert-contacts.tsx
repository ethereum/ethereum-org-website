import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import {
  Card,
  CardBanner,
  CardContent,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import SectionIntro from "./section-intro"

import eeaBanner from "@/public/images/organizations/experts/enterprise-ethereum-alliance-banner.png"
import etherealizeBanner from "@/public/images/organizations/experts/etherealize-banner.jpg"
import ethereumInstitutionalBanner from "@/public/images/organizations/experts/ethereum-institutional-banner.png"
import ethsystemsBanner from "@/public/images/organizations/experts/ethsystems-banner.png"

const EXPERTS = {
  "ethereum-institutional": {
    href: "https://www.ethereuminstitutional.org/",
    banner: ethereumInstitutionalBanner,
  },
  ethsystems: { href: "https://ethsystems.org/", banner: ethsystemsBanner },
  etherealize: {
    href: "https://www.etherealize.com/",
    banner: etherealizeBanner,
  },
  eea: { href: "https://entethalliance.org/", banner: eeaBanner },
} as const

type ExpertKey = keyof typeof EXPERTS

export const ExpertCard = async ({
  id,
  sizes = "(max-width: 768px) calc(100vw - 2rem), 300px",
}: {
  id: ExpertKey
  sizes?: string
}) => {
  const t = await getTranslations("page-organizations")
  const { href, banner } = EXPERTS[id]

  return (
    <Card href={href} variant="ghost" size="sm">
      <CardHeader>
        <CardBanner size="sm">
          <Image src={banner} alt="" sizes={sizes} />
        </CardBanner>
      </CardHeader>
      <CardContent>
        <CardTitle size="sm" asChild>
          <h3>{t(`page-organizations-experts-${id}-name`)}</h3>
        </CardTitle>
        <CardParagraph size="sm">
          {t(`page-organizations-experts-${id}-description`)}
        </CardParagraph>
      </CardContent>
    </Card>
  )
}

const ExpertContacts = async () => {
  const t = await getTranslations("page-organizations")

  return (
    <Section id="experts">
      <SectionIntro
        title={t("page-organizations-experts-title")}
        description={t("page-organizations-experts-description")}
      />
      <Grid balanced={4} data-flow="cta" className="text-start">
        {(Object.keys(EXPERTS) as ExpertKey[]).map((key) => (
          <ExpertCard key={key} id={key} />
        ))}
      </Grid>
    </Section>
  )
}

export default ExpertContacts
