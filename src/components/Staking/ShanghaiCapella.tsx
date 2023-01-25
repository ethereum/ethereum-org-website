// Import libraries
import React, { FC } from "react"
import {
  Flex,
  Text,
  UnorderedList,
  ListItem,
  FlexProps,
} from "@chakra-ui/react"
// Components
import ButtonLink from "../ButtonLink"
import Card from "../Card"

interface IProps extends FlexProps {}
const ShanghaiCapella: FC<IProps> = (props) => {
  const upgrades = [
    {
      heading: "Shanghai",
      emoji: "📜",
      content: (
        <>
          <Text>
            Withdrawal functionality will be enabled in the upcoming Shanghai upgrade
            planned for Q1/Q2 2023 (as with any upgrade, timing subject to
            change). This enables previously staked ETH to be deposited into
            execution layer accounts, closing the loop on staking liquidity, and
            taking one more step on Ethereum’s journey towards building a
            sustainable, scalable, secure decentralized ecosystem.
          </Text>
          <Text>
            Shanghai marks the end of an undefined lock-up period for ETH
            staking. Users will be free to:
          </Text>
          <UnorderedList mb={0}>
            <ListItem>stake their ETH</ListItem>
            <ListItem>
              earn ETH rewards that will be distributed automatically
            </ListItem>
            <ListItem>
              un-stake their ETH to regain full access to their entire balance
            </ListItem>
            <ListItem>
              and of course, re-stake to sign back up and start earning more
              rewards
            </ListItem>
          </UnorderedList>
        </>
      ),
      cardProps: {
        flex: 5,
      },
    },
    {
      heading: "Capella",
      emoji: "⛓️",
      content: (
        <>
          <Text>
            For the Shanghai upgrade to take effect, a simultaneous upgrade to
            the Beacon Chain must take place named Capella. Node operating
            stakers should stay tuned to client communication channels to be
            alerted of upcoming client updates planned for Q1 2023.
          </Text>
          <Text>
            Stakers who need to update their validator withdrawal keys can
            broadcast this message once the Capella upgrade has taken place.
          </Text>
          <ButtonLink
            to="https://launchpad.ethereum.org/withdrawals"
            mt="auto"
            hideArrow
          >
            Visit Launchpad
          </ButtonLink>
        </>
      ),
      cardProps: {
        flex: 3,
      },
    },
  ]
  return (
    <Flex gap={6} direction={{ base: "column", md: "row" }} {...props}>
      {upgrades.map(({ heading, emoji, content, cardProps }) => (
        <Card
          key={heading}
          title={heading}
          emoji={emoji}
          children={content}
          {...cardProps}
        />
      ))}
    </Flex>
  )
}

export default ShanghaiCapella
