import React from "react"
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getPersonaBorderColor } from "@/lib/utils/wallets"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

const WalletFilterPersona = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const personas = useWalletPersonas()
  const filterBg = useColorModeValue("chakra-subtle-bg", "black400")

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={4}>
      {personas.map((persona, idx) => {
        return (
          <CheckboxGroup key={persona.title}>
            <Flex
              role="group"
              direction="column"
              alignItems="flex-start"
              padding={2}
              mb={2}
              bg={filterBg}
              w="100%"
              borderRadius="base"
              border="1px solid"
              borderColor={getPersonaBorderColor(selectedPersona, idx)}
              cursor="pointer"
              transition="0.5s all"
              _hover={{
                borderColor: "primary.hover",
              }}
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
              <Flex alignItems="center" gap={2} px={2}>
                <Checkbox
                  key={persona.title}
                  aria-label={persona.title}
                  isChecked={selectedPersona === idx}
                  width="full"
                >
                  <Heading
                    as="h3"
                    ms={0}
                    fontSize="1.2rem"
                    py={0}
                    pe={1}
                    ps={0}
                    lineHeight="1.7rem"
                    color="primary.base"
                    transition="0.5s all"
                    _groupHover={{ color: "primary.hover" }}
                  >
                    {persona.title}
                  </Heading>
                </Checkbox>
              </Flex>
              <Box
                as="span"
                p="0.5rem"
                color={selectedPersona === idx ? "text" : "text200"}
                fontSize="0.9rem"
                fontWeight="normal"
                transition="0.5s all"
                lineHeight={1.3}
              >
                {persona.description}
              </Box>
            </Flex>
          </CheckboxGroup>
        )
      })}
    </Flex>
  )
}

export default WalletFilterPersona
