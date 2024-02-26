import React from "react"
import {
  Box,
  Checkbox,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react"

// import Translation from "@/components/Translation"
import { trackCustomEvent } from "@/lib/utils/matomo"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

const WalletFilterPersona = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const personas = useWalletPersonas()

  // TODO: remove
  const getContainerBg = (idx: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue(
      selectedPersona === idx ? "primary100" : "chakra-subtle-bg",
      selectedPersona === idx ? "primary900" : "black400"
    )

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      p={{ base: 4, sm: 0 }}
    >
      {personas.map((persona, idx) => {
        return (
          <Flex
            key={persona.title}
            role="group"
            direction="column"
            alignItems="flex-start"
            padding={2}
            mb={2}
            background={getContainerBg(idx)}
            borderRadius="base"
            border="1px solid"
            borderColor="lightBorder"
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
                // TODO: fix on click check
                // isChecked={persona.presetFilters[option.filterKey!]}
                width="full"
                // onChange={handleClick}
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
        )
      })}
    </Flex>
  )
}

export default WalletFilterPersona
