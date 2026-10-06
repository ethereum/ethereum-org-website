import { getTranslations } from "next-intl/server"

import { Image } from "@/components/Image"
import { ButtonLink } from "@/components/ui/buttons/Button"
import {
  CalloutBanner,
  CalloutButtons,
  CalloutContent,
  CalloutDescription,
  CalloutMain,
  CalloutRoot,
  CalloutTitle,
} from "@/components/ui/callout"
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

import EthSystemsLogo from "./ethsystems-logo.svg"
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
  /** Lead override, e.g. when a page lists a single organization */
  description?: string
}

const ExpertContacts = async ({
  id = "experts",
  experts = ALL_EXPERTS,
  description,
}: ExpertContactsProps) => {
  const t = await getTranslations("page-organizations")

  const intro = (
    <SectionIntro
      title={t("page-organizations-experts-title")}
      description={description ?? t("page-organizations-experts-description")}
    />
  )

  if (experts.length === 1) {
    const [key] = experts
    return (
      <Section id={id}>
        {intro}
        <CalloutRoot data-flow="cta">
          {key === "ethsystems" && (
            <CalloutBanner>
              <EthSystemsLogo
                aria-hidden="true"
                className="h-48 w-auto text-body @3xl/callout:h-56"
              />
            </CalloutBanner>
          )}
          <CalloutMain>
            <CalloutContent>
              <CalloutTitle as="h3">
                {t(`page-organizations-experts-${key}-name`)}
              </CalloutTitle>
              <CalloutDescription>
                {t(`page-organizations-experts-${key}-description`)}
              </CalloutDescription>
            </CalloutContent>
            <CalloutButtons>
              <ButtonLink href={EXPERTS[key].href}>
                {t("page-organizations-experts-cta")}
              </ButtonLink>
            </CalloutButtons>
          </CalloutMain>
        </CalloutRoot>
      </Section>
    )
  }

  return (
    <Section id={id}>
      {intro}
      <Grid balanced={4} data-flow="cta" className="text-start">
        {experts.map((key) => {
          const { href, logo } = EXPERTS[key]
          return (
            <Card
              key={key}
              href={href}
              size="lg"
              className="row-span-3 grid grid-rows-subgrid gap-0"
            >
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
              <CardFooter>
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
