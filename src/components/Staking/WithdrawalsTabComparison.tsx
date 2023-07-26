import React from "react"
import {
  Heading,
  ListItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
import WithdrawalCredentials from "./WithdrawalCredentials"
import ButtonLink from "../ButtonLink"
import Translation from "../Translation"
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
          <Heading as="h3">
            <Translation id="comp-withdrawal-comparison-current-title" />
          </Heading>
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
          <Heading as="h3">
            <Translation id="comp-withdrawal-comparison-new-title" />
          </Heading>
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
