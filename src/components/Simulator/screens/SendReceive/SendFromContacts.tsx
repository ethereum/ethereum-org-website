import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { FaQrcode } from "react-icons/fa"
import { PiMagnifyingGlass } from "react-icons/pi"
import { CategoryTabs } from "../../Wallet"
import { CONTACTS } from "../../data"
import { EthTokenIcon } from "../../icons"
import type { SimulatorStateProps } from "../../interfaces"

export const SendFromContacts: React.FC<SimulatorStateProps> = ({ state }) => (
  <>
    <Box py={8} px={6}>
      <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={8}>
        Choose recipient
      </Text>
      <Button
        variant="outline"
        isDisabled
        leftIcon={<Icon as={PiMagnifyingGlass} />}
        rightIcon={<Icon as={FaQrcode} />}
      >
        Address or contacts
      </Button>
    </Box>
    <Box py={8} px={6} bg="background.highlight" h="full">
      <CategoryTabs categories={["My contacts", "Recent"]} />
      <Flex direction="column" gap={4}>
        {CONTACTS.map(({ name, lastAction }, i) => (
          <Button
            key={name + i}
            leftIcon={<Icon as={EthTokenIcon} />}
            isDisabled={i > 0}
            gap={2}
            _disabled={{
              color: "body.base",
              bg: "blackAlpha.200",
              pointerEvents: "none",
            }}
            data-group
            onClick={state.progressStepper}
          >
            <Box as="span" flex={1}>
              <Text
                as="span"
                display="block"
                fontWeight="bold"
                textAlign="start"
              >
                {name}
              </Text>
              <Text
                as="span"
                display="block"
                color="whiteAlpha.700" /* TODO: Replace with color mode responsive token */
                textAlign="start"
                _groupDisabled={{ color: "blackAlpha.600" }}
              >
                {lastAction}
              </Text>
            </Box>
          </Button>
        ))}
      </Flex>
    </Box>
  </>
)
