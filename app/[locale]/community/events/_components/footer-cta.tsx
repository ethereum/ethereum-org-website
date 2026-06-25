import type { MatomoEventOptions } from "@/lib/types"

import { ButtonLink } from "@/components/ui/buttons/Button"
import { Section } from "@/components/ui/section"

type FooterCTAProps = {
  id: string
  header: string
  paragraph: string
  href: string
  ctaLabel: string
  customEventOptions?: MatomoEventOptions
}

const FooterCTA = ({
  id,
  header,
  paragraph,
  href,
  ctaLabel,
  customEventOptions,
}: FooterCTAProps) => (
  <Section
    id={id}
    className="rounded-4xl border border-accent-a/20 bg-linear-to-b from-accent-a/5 to-accent-a/15 p-page-2x text-center dark:from-accent-a/10 dark:to-accent-a/20"
  >
    <h2>{header}</h2>
    <p className="mx-auto max-w-3xl">{paragraph}</p>
    <ButtonLink
      data-flow="cta"
      href={href}
      size="lg"
      className="max-md:w-full"
      customEventOptions={customEventOptions}
    >
      {ctaLabel}
    </ButtonLink>
  </Section>
)

export default FooterCTA
