import { MdCircle } from "react-icons/md"
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react"

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

  return (
    <Flex direction={{ base: "column", lg: "row" }} gap={4} mb={2}>
      {personas.map((persona, idx) => {
        return (
          <Flex
            key={persona.title}
            direction="column"
            alignItems="flex-start"
            padding={2}
            w="100%"
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
            <Flex alignItems="center" gap={2} mb="0.2rem" px={2}>
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
                  outlineColor={
                    selectedPersona === idx ? "primary.base" : "body.light"
                  }
                  outlineOffset="3px"
                  fontSize={8}
                  _groupHover={{ outlineColor: "primary.hover" }}
                />
              </Box>

              <Heading
                as="h3"
                ms={0}
                fontSize="1.2rem"
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
