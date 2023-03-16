// Import libraries
import React, { FC } from "react"
import {
  Box,
  Flex,
  FlexProps,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react"
// Components
import Card from "../Card"
import Link from "../Link"
import Translation from "../Translation"
import ButtonLink from "../ButtonLink"

interface IProps extends FlexProps {}
const ShanghaiCapella: FC<IProps> = (props) => {
  return (
    <Flex
      gap={6}
      direction={{ base: "column", md: "row" }}
      position="relative"
      {...props}
    >
      <Card
        title={<Translation id="comp-shanghai-title" />}
        emoji="📜"
        children={
          <>
            <Text>
              <Translation id="comp-shanghai-p-1" />
            </Text>
            <Text>
              <Translation id="comp-shanghai-p-2" />
            </Text>
            <UnorderedList mb={0}>
              <ListItem>
                <Translation id="comp-shanghai-li-1" />
              </ListItem>
              <ListItem>
                <Translation id="comp-shanghai-li-2" />
              </ListItem>
              <ListItem>
                <Translation id="comp-shanghai-li-3" />
              </ListItem>
              <ListItem>
                <Translation id="comp-shanghai-li-4" />
              </ListItem>
            </UnorderedList>
          </>
        }
        flex={5}
      />
      <Card
        title={<Translation id="comp-capella-title" />}
        emoji="⛓️"
        children={
          <>
            <Text>
              <Translation id="comp-capella-p-1" />
            </Text>
            <Text>
              <Translation id="comp-capella-p-2" />
            </Text>
            <Text>
              <Translation id="subscribe-to-ef-blog" />
            </Text>
            <ButtonLink
              to="https://launchpad.ethereum.org/withdrawals"
              mt="auto"
              hideArrow
              whiteSpace="normal"
              textAlign="center"
              h="fit-content"
              py={3}
            >
              <Translation id="comp-capella-link" />
            </ButtonLink>
          </>
        }
        flex={3}
      />
      {/* Decorative connector line */}
      <Box
        w={{ base: 0, md: "full" }}
        h={{ base: "full", md: 0 }}
        position="absolute"
        inset={{ base: "0 50% auto auto", md: "50% 0 auto auto" }}
        border="1px"
        borderColor="lightBorder"
        zIndex={-1}
      />
    </Flex>
  )
}

export default ShanghaiCapella
