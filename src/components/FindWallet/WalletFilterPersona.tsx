import { MdCircle } from "react-icons/md"
import { Box, Flex, Heading, Icon, Text, useDisclosure } from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getPersonaBorderColor } from "@/lib/utils/wallets"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

type WalletFilterPersonaProps = {
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<WalletFilter>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
}

const WalletFilterPersona = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}: WalletFilterPersonaProps) => {
  const personas = useWalletPersonas()
  const { isOpen: showMobileSidebar } = useDisclosure()

  return (
    <Flex
      direction={{ base: showMobileSidebar ? "row" : "column", lg: "row" }}
      gap={showMobileSidebar ? 2 : 4}
      mb={showMobileSidebar ? 10 : 2}
      wrap={showMobileSidebar ? "wrap" : "nowrap"}
    >
      {personas.map((persona, idx) => {
        return (
          <Flex
            key={persona.title}
            direction="column"
            alignItems="flex-start"
            padding={2}
            w={showMobileSidebar ? "49.4%" : "100%"}
            border="solid"
            borderColor={getPersonaBorderColor(selectedPersona, idx)}
            bg="background.highlight"
            borderRadius="base"
            cursor="pointer"
            transition="0.5s all"
            _hover={{
              borderColor: "primary.hover",
            }}
            role="group"
            onClick={() => {
              if (idx === selectedPersona) {
                resetFilters()
                trackCustomEvent({
                  eventCategory: "UserPersona",
                  eventAction: `${persona.title}`,
                  eventName: `${persona.title} false`,
                })
              } else {
                setSelectedPersona(idx)
                setFilters(persona.presetFilters)
                trackCustomEvent({
                  eventCategory: "UserPersona",
                  eventAction: `${persona.title}`,
                  eventName: `${persona.title} true`,
                })
              }
            }}
          >
            <Flex gap={2} mb={showMobileSidebar ? 0 : "0.2rem"} px={1.5}>
              <Box role="radio" aria-label={`${persona.title} filter`}>
                <Icon
                  as={MdCircle}
                  borderRadius="full"
                  boxSize={2.5}
                  my={0}
                  mx={1}
                  fill={
                    selectedPersona === idx
                      ? "primary.base"
                      : "rgba(0, 0, 0, 0)"
                  }
                  background={
                    selectedPersona === idx ? "primary.base" : "transparent"
                  }
                  outline="1.5px solid"
                  outlineColor="primary.base"
                  outlineOffset="3px"
                  fontSize={8}
                  _groupHover={{ outlineColor: "primary.hover" }}
                />
              </Box>

              <Heading
                as="h3"
                ms={0}
                fontSize={showMobileSidebar ? "md" : "lg"}
                fontWeight={showMobileSidebar ? "normal" : "bold"}
                py={0}
                pe={1}
                ps={0}
                lineHeight="1.7rem"
                color="primary.base"
              >
                {persona.title}
              </Heading>
            </Flex>

            <Text
              display={showMobileSidebar ? "none" : "block"}
              p="0.4rem"
              color={selectedPersona === idx ? "text" : "text200"}
              fontSize="0.9rem"
              fontWeight="normal"
              transition="0.5s all"
              lineHeight={1.3}
            >
              {persona.description}
            </Text>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default WalletFilterPersona
