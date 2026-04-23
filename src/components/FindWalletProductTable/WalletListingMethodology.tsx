import { getTranslations } from "next-intl/server"

import InlineLink from "@/components/ui/Link"
import { UnorderedList } from "@/components/ui/list"
import { Section } from "@/components/ui/section"

import CollapsibleCard from "./CollapsibleCard"

type WalletListingMethodologyProps = {
  lastUpdated: string
}

const WalletListingMethodology = async ({
  lastUpdated,
}: WalletListingMethodologyProps) => {
  const t = await getTranslations("page-wallets-find-wallet")

  const criteriaKeys = [
    "methodology-criterion-security",
    "methodology-criterion-track-record",
    "methodology-criterion-maintenance",
    "methodology-criterion-honest-info",
    "methodology-criterion-contact",
    "methodology-criterion-eip1559",
    "methodology-criterion-ux",
    "methodology-criterion-ethereum-focused",
  ] as const

  return (
    <Section
      id="how-we-evaluate-wallets"
      aria-labelledby="methodology-heading"
      className="border-body-light mt-12 border-t pt-12 md:mt-16 md:pt-16"
    >
      <div className="flex w-full flex-col gap-6 px-4 pb-16 md:w-2/3 lg:w-3/5">
        <h2 id="methodology-heading" className="text-3xl font-bold md:text-4xl">
          {t("page-find-wallet-methodology-title")}
        </h2>

        <p className="text-body-medium text-lg leading-relaxed">
          {t("page-find-wallet-methodology-intro")}
        </p>

        <p className="text-base">
          <InlineLink href="/contributing/adding-wallets/">
            {t("page-find-wallet-methodology-full-criteria-link")}
          </InlineLink>
        </p>

        <div className="text-body-medium flex flex-col gap-1 text-base">
          <p>
            <strong>{t("page-find-wallet-methodology-attribution")}</strong>
          </p>
          <p>
            {t("page-find-wallet-methodology-last-update")} {lastUpdated}
          </p>
        </div>

        <CollapsibleCard
          title={t("page-find-wallet-methodology-details-title")}
          preview={t("page-find-wallet-methodology-details-preview")}
          moreLabel={t("page-find-wallet-methodology-more")}
          lessLabel={t("page-find-wallet-methodology-less")}
        >
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              {t("page-find-wallet-methodology-must-haves-label")}
            </p>

            <UnorderedList className="space-y-2 text-lg leading-relaxed">
              {criteriaKeys.map((key) => (
                <li key={key}>{t(`page-find-wallet-${key}`)}</li>
              ))}
            </UnorderedList>

            <p className="text-lg leading-relaxed">
              {t("page-find-wallet-methodology-verification")}
            </p>

            <p className="text-lg leading-relaxed">
              {t("page-find-wallet-methodology-filters")}
            </p>

            <div className="text-body-medium border-body-light mt-6 space-y-2 border-t pt-6 text-sm">
              <p>{t("page-find-wallet-footnote-1")}</p>
              <p>{t("page-find-wallet-footnote-2")}</p>
            </div>
          </div>
        </CollapsibleCard>
      </div>
    </Section>
  )
}

export default WalletListingMethodology
