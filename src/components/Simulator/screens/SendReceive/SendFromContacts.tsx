import React from "react"
import { PiMagnifyingGlass } from "react-icons/pi"
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react"

import { SimulatorNavProps } from "@/lib/types"

import { EthTokenIconGrayscale, QrCodeIcon } from "../../icons"
import { NotificationPopover } from "../../NotificationPopover"
import { CategoryTabs } from "../../WalletHome/CategoryTabs"

import { CONTACTS } from "./constants"

type SendFromContactsProps = SimulatorNavProps & {
  setRecipient: (name: string) => void
}
export const SendFromContacts = ({
  nav,
  setRecipient,
}: SendFromContactsProps) => {
  const handleSelection = (name: string) => {
    setRecipient(name)
    nav.progressStepper()
  }
  return (
    <>
      <Box py={8} px={6}>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" mb={8}>
          Choose recipient
        </Text>
        <NotificationPopover
          title="Example walkthrough"
          content={`Choose ${CONTACTS[0].name} from recent contacts`}
        >
          <Button
            variant="outline"
            leftIcon={<Icon as={PiMagnifyingGlass} />}
            rightIcon={<Icon as={QrCodeIcon} />}
            color="disabled"
            py={4}
            w="full"
            _hover={{
              color: "disabled",
              borderColor: "disabled",
            }}
            cursor="auto"
          >
            <Text as="span" me="auto">
              Address or contacts
            </Text>
          </Button>
        </NotificationPopover>
      </Box>
      <Box py={8} px={6} bg="background.highlight" h="full">
        <CategoryTabs
          categories={["My contacts", "Recent"]}
          activeIndex={1}
          mb={4}
        />
        <Flex direction="column" gap={4}>
          {CONTACTS.map(({ name, lastAction }, i) => (
            <Button
              key={name + i}
              leftIcon={
                <Icon
                  as={EthTokenIconGrayscale}
                  fill="black"
                  w="30px"
                  h="30px"
                />
              }
              isDisabled={i > 0}
              gap={2}
              _disabled={{
                color: "body.base",
                bg: "background.base",
                pointerEvents: "none",
              }}
              data-group
              onClick={() => handleSelection(name)}
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
}
