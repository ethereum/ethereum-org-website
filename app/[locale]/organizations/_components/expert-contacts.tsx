import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import {
  Card,
  CardButtonFake,
  CardContent,
  CardFooter,
  CardHeader,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import SectionIntro from "./section-intro"

import eeaLogo from "@/public/images/organizations/logos/enterprise-ethereum-alliance.png"
import etherealizeLogo from "@/public/images/organizations/logos/etherealize.png"
import ethereumInstitutionalLogo from "@/public/images/organizations/logos/ethereum-institutional.png"
import ethsystemsLogo from "@/public/images/organizations/logos/ethsystems.png"

const EXPERTS = {
  "ethereum-institutional": {
    href: "https://www.ethereuminstitutional.org/",
    logo: ethereumInstitutionalLogo,
  },
  ethsystems: {
    href: "https://ethsystems.org/",
    logo: ethsystemsLogo,
  },
  etherealize: {
    href: "https://www.etherealize.com/",
    logo: etherealizeLogo,
  },
  eea: {
    href: "https://entethalliance.org/",
    logo: eeaLogo,
  },
} as const

export type ExpertKey = keyof typeof EXPERTS

const ALL_EXPERTS = Object.keys(EXPERTS) as ExpertKey[]

type ExpertContactsProps = {
  id?: string
  /** Subset (and order) of organizations to show; defaults to all four */
  experts?: ExpertKey[]
}

/**
 * "Contact enterprise experts" section shared by the enterprise pages: a grid
 * of link cards, one per organization that helps institutions evaluate
 * Ethereum. Strings live in the `page-organizations` namespace.
 */
const ExpertContacts = async ({
  id = "experts",
  experts = ALL_EXPERTS,
}: ExpertContactsProps) => {
  const t = await getTranslations("page-organizations")

  return (
    <Section id={id}>
      <SectionIntro
        title={t("page-organizations-experts-title")}
        description={t("page-organizations-experts-description")}
      />
      <Grid balanced={2} data-flow="cta" className="gap-8 text-start">
        {experts.map((key) => {
          const { href, logo } = EXPERTS[key]
          return (
            <Card key={key} href={href} size="lg">
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={logo}
                  alt=""
                  className="size-16 shrink-0 rounded-full"
                  sizes="64px"
                />
                <CardTitle>
                  {t(`page-organizations-experts-${key}-name`)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardParagraph>
                  {t(`page-organizations-experts-${key}-description`)}
                </CardParagraph>
              </CardContent>
              <CardFooter buttons="compact">
                <CardButtonFake>
                  {t("page-organizations-experts-cta")}
                </CardButtonFake>
              </CardFooter>
            </Card>
          )
        })}
      </Grid>
    </Section>
  )
}

export default ExpertContacts
