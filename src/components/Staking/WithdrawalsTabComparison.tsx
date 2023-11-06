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
// TODO: Re-enable after i18n implemented
// import Translation from "@/components/Translation"
import Text from "@/components/OldText"
import WithdrawalCredentials from "@/components/Staking/WithdrawalCredentials"

import { trackCustomEvent } from "@/lib/utils/matomo"

interface IProps {}
const WithdrawalsTabComparison: React.FC<IProps> = () => {
  const handleMatomoEvent = (name: string): void => {
    trackCustomEvent({
      eventCategory: `Staker tabs`,
      eventAction: name,
      eventName: `click`,
    })
  }
  // TODO: Re-enable <Translation> components after i18n implemented, removed placeholders
  return (
    <Tabs>
      <TabList>
        <Tab onClick={() => handleMatomoEvent("Current stakers")}>
          {/* <Translation id="comp-withdrawal-comparison-current-title" /> */}
          comp-withdrawal-comparison-current-title
        </Tab>
        <Tab onClick={() => handleMatomoEvent("New stakers")}>
          {/* <Translation id="comp-withdrawal-comparison-new-title" /> */}
          comp-withdrawal-comparison-new-title
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OldHeading as="h3">
            {/* <Translation id="comp-withdrawal-comparison-current-title" /> */}
            comp-withdrawal-comparison-current-title
          </OldHeading>
          <UnorderedList>
            <ListItem>
              {/* <Translation id="comp-withdrawal-comparison-current-li-1" /> */}
              comp-withdrawal-comparison-current-li-1
            </ListItem>
            <ListItem>
              {/* <Translation id="comp-withdrawal-comparison-current-li-2" /> */}
              comp-withdrawal-comparison-current-li-2
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            {/* <Translation id="comp-withdrawal-comparison-current-p" /> */}
            comp-withdrawal-comparison-current-p
          </Text>

          <WithdrawalCredentials />
        </TabPanel>

        <TabPanel>
          <OldHeading as="h3">
            {/* <Translation id="comp-withdrawal-comparison-new-title" /> */}
            comp-withdrawal-comparison-new-title
          </OldHeading>
          <UnorderedList>
            <ListItem>
              {/* <Translation id="comp-withdrawal-comparison-new-li-1" /> */}
              comp-withdrawal-comparison-new-li-1
            </ListItem>
            <ListItem>
              {/* <Translation id="comp-withdrawal-comparison-new-li-2" /> */}
              comp-withdrawal-comparison-new-li-2
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            {/* <Translation id="comp-withdrawal-comparison-new-p" /> */}
            comp-withdrawal-comparison-new-p
          </Text>
          <ButtonLink to="https://launchpad.ethereum.org/" hideArrow>
            {/* <Translation id="comp-withdrawal-comparison-new-link" /> */}
            comp-withdrawal-comparison-new-link
          </ButtonLink>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default WithdrawalsTabComparison
