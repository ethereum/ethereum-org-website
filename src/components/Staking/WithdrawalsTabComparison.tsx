"use client"

import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import Translation from "@/components/Translation"
import { ListItem, UnorderedList } from "@/components/ui/list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { Strong } from "../IntlStringElements"
import { ButtonLink } from "../ui/buttons/Button"
import InlineLink from "../ui/Link"

import { useTranslation } from "@/hooks/useTranslation"

const WithdrawalsTabComparison = () => {
  const { t } = useTranslation("page-staking")
  const handleMatomoEvent = (name: string): void => {
    trackCustomEvent({
      eventCategory: `Staker tabs`,
      eventAction: name,
      eventName: `click`,
    })
  }

  return (
    <Tabs defaultValue="current">
      <TabsList className="p-0">
        <TabsTrigger
          value="current"
          onClick={() => handleMatomoEvent("Current stakers")}
        >
          {t("comp-withdrawal-comparison-current-title")}
        </TabsTrigger>
        <TabsTrigger
          value="new"
          onClick={() => handleMatomoEvent("New stakers")}
        >
          {t("comp-withdrawal-comparison-new-title")}
        </TabsTrigger>
      </TabsList>

      <TabsContent
        value="current"
        className="space-y-4 bg-background-highlight"
      >
        <h3>{t("comp-withdrawal-comparison-current-title")}</h3>
        <UnorderedList>
          <ListItem>
            <Translation id="page-staking:comp-withdrawal-comparison-current-li-1" />{" "}
          </ListItem>
          <ListItem>
            <Translation id="page-staking:comp-withdrawal-comparison-current-li-2" />
          </ListItem>
        </UnorderedList>
        <p>
          {t.rich("page-staking.comp-withdrawal-comparison-current-p", {
            strong: Strong,
            // Intentionally kept in English to match Beaconcha.in destination
            depositsTab: '"Deposits"',
            withdrawalAddressLabel: '"Withdrawal Address"',
            beaconchain: (chunks) => (
              <InlineLink href="https://beaconcha.in">{chunks}</InlineLink>
            ),
            prefix: (chunks) => (
              <span className="font-mono font-bold text-warning-border dark:text-warning">
                {chunks}
              </span>
            ),
          })}
        </p>

        <WithdrawalCredentials />
      </TabsContent>

      <TabsContent value="new" className="space-y-4 bg-background-highlight">
        <h3>{t("comp-withdrawal-comparison-new-title")}</h3>
        <UnorderedList>
          <ListItem>{t("comp-withdrawal-comparison-new-li-1")}</ListItem>
          <ListItem>{t("comp-withdrawal-comparison-new-li-2")}</ListItem>
        </UnorderedList>
        <p className="font-bold">{t("comp-withdrawal-comparison-new-p")}</p>
        <ButtonLink href="https://launchpad.ethereum.org/" hideArrow>
          {t("comp-withdrawal-comparison-new-link")}
        </ButtonLink>
      </TabsContent>
    </Tabs>
  )
}

export default WithdrawalsTabComparison
