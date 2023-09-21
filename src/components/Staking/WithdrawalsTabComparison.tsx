import React from "react"
import {
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  UnorderedList,
} from "@chakra-ui/react"
import WithdrawalCredentials from "./WithdrawalCredentials"
import { ButtonLink } from "../Buttons"
import Translation from "../Translation"
import Text from "../OldText"
import OldHeading from "../OldHeading"
import { trackCustomEvent } from "../../utils/matomo"

interface IProps {}
const WithdrawalsTabComparison: React.FC<IProps> = () => {
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
          <Translation id="comp-withdrawal-comparison-current-title" />
        </Tab>
        <Tab onClick={() => handleMatomoEvent("New stakers")}>
          <Translation id="comp-withdrawal-comparison-new-title" />
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <OldHeading as="h3">
            <Translation id="comp-withdrawal-comparison-current-title" />
          </OldHeading>
          <UnorderedList>
            <ListItem>
              <Translation id="comp-withdrawal-comparison-current-li-1" />
            </ListItem>
            <ListItem>
              <Translation id="comp-withdrawal-comparison-current-li-2" />
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            <Translation id="comp-withdrawal-comparison-current-p" />
          </Text>

          <WithdrawalCredentials />
        </TabPanel>

        <TabPanel>
          <OldHeading as="h3">
            <Translation id="comp-withdrawal-comparison-new-title" />
          </OldHeading>
          <UnorderedList>
            <ListItem>
              <Translation id="comp-withdrawal-comparison-new-li-1" />
            </ListItem>
            <ListItem>
              <Translation id="comp-withdrawal-comparison-new-li-2" />
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            <Translation id="comp-withdrawal-comparison-new-p" />
          </Text>
          <ButtonLink to="https://launchpad.ethereum.org/" hideArrow>
            <Translation id="comp-withdrawal-comparison-new-link" />
          </ButtonLink>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default WithdrawalsTabComparison
