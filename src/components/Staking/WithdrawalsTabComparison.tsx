import { useTranslation } from "next-i18next"
import {
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react"

import { ButtonLink } from "@/components/Buttons"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

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
    <Tabs>
      <TabList>
        <Tab onClick={() => handleMatomoEvent("Current stakers")}>
          {t("comp-withdrawal-comparison-current-title")}
        </Tab>
        <Tab onClick={() => handleMatomoEvent("New stakers")}>
          {t("comp-withdrawal-comparison-new-title")}
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OldHeading as="h3">
            {t("comp-withdrawal-comparison-current-title")}
          </OldHeading>
          <UnorderedList>
            <ListItem>
              <Translation id="page-staking:comp-withdrawal-comparison-current-li-1" />{" "}
            </ListItem>
            <ListItem>
              <Translation id="page-staking:comp-withdrawal-comparison-current-li-2" />
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            <Translation id="page-staking:comp-withdrawal-comparison-current-p" />
          </Text>

          <WithdrawalCredentials />
        </TabPanel>

        <TabPanel>
          <OldHeading as="h3">
            {t("comp-withdrawal-comparison-new-title")}
          </OldHeading>
          <UnorderedList>
            <ListItem>{t("comp-withdrawal-comparison-new-li-1")}</ListItem>
            <ListItem>{t("comp-withdrawal-comparison-new-li-2")}</ListItem>
          </UnorderedList>
          <Text fontWeight="bold">{t("comp-withdrawal-comparison-new-p")}</Text>
          <ButtonLink href="https://launchpad.ethereum.org/" hideArrow>
            {t("comp-withdrawal-comparison-new-link")}
          </ButtonLink>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default WithdrawalsTabComparison
