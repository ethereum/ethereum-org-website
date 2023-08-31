import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"
import React from "react"
import { PiMagnifyingGlass } from "react-icons/pi"
import { CategoryTabs } from "../../Wallet"
import { CONTACTS } from "../../data"
import { EthTokenIconGrayscale, QrCodeIcon } from "../../icons"
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
        rightIcon={<Icon as={QrCodeIcon} />}
        _disabled={{ color: "body.medium" }}
        py={4}
        pointerEvents="none"
        fontSize="sm"
        w="full"
      >
        <Text as="span" me="auto">
          Address or contacts
        </Text>
      </Button>
    </Box>
    <Box py={8} px={6} bg="background.highlight" h="full">
      <CategoryTabs categories={["My contacts", "Recent"]} />
      <Flex direction="column" gap={4}>
        {CONTACTS.map(({ name, lastAction }, i) => (
          <Button
            key={name + i}
            leftIcon={
              <Icon as={EthTokenIconGrayscale} fill="black" w="30px" h="30px" />
            }
            isDisabled={i > 0}
            gap={2}
            _disabled={{
              color: "body.base",
              bg: "background.base",
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
                color="body.light"
                textAlign="start"
                _groupDisabled={{ color: "body.medium" }}
                fontSize="sm"
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
