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
import Link from "../Link"
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
          Current stakers
        </Tab>
        <Tab onClick={() => handleMatomoEvent("New stakers")}>
          New stakers (not yet deposited)
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <Heading as="h3">Current stakers</Heading>
          <UnorderedList>
            <ListItem>
              Some users may have provided a withdrawal address when initially
              setting up their staking deposit—these users have nothing more
              they need to do
            </ListItem>
            <ListItem>
              The majority of stakers did not provide a withdrawal address on
              initial deposit, and will need to update their withdrawal
              credentials. The{" "}
              <Link href="https://zhejiang.launchpad.ethereum.org/withdrawals">
                Zhejiang Testnet Launchpad
              </Link>{" "}
              has instructions on when and how to do this
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            You can enter your validator index number here to see if you still
            need to update your credentials{" "}
            <Text as="span" fontWeight="normal">
              (this can be found in your client logs):
            </Text>
          </Text>

          <WithdrawalCredentials />
        </TabPanel>

        <TabPanel>
          <Heading as="h3">New stakers (not yet deposited)</Heading>
          <UnorderedList>
            <ListItem>
              By default, new stakers looking to automatically enable reward
              payments and withdrawal functionality should provide an Ethereum
              withdrawal address they control when generating their validator
              keys using the Staking Deposit CLI tool
            </ListItem>
            <ListItem>
              This is not required at time of deposit, but will prevent the need
              to update these keys at a later date to unlock your funds
            </ListItem>
          </UnorderedList>
          <Text fontWeight="bold">
            The Staking Launchpad will guide you through staking onboarding.
          </Text>
          <ButtonLink to="https://launchpad.ethereum.org/" hideArrow>
            Visit Staking Launchpad
          </ButtonLink>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
}

export default WithdrawalsTabComparison
