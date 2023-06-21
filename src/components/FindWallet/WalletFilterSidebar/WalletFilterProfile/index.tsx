// Libraries
import React from "react"
import {
  Box,
  Flex,
  Heading,
  ListItem,
  UnorderedList,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react"

// Components
import Translation from "../../../Translation"

// Icons
import { MdCircle } from "react-icons/md"

// Utils
import { trackCustomEvent } from "../../../../utils/matomo"
import { useWalletFilterProfile } from "./useWalletFilterProfile"

const WalletFilterProfile = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const { personas } = useWalletFilterProfile()

  const getContainerBg = (idx: number) =>
    useColorModeValue(
      selectedPersona === idx ? "primary200" : "primary100",
      selectedPersona === idx ? "primary900" : "black400"
    )
  const getContainerHoverBg = (idx: number) =>
    useColorModeValue(
      "primary200",
      selectedPersona === idx ? "primary900" : "black500"
    )

  return (
    <Flex direction="column" gap={4} p={{ base: 4, sm: 0 }}>
      <Box
        as="span"
        m={0}
        fontWeight="normal"
        fontSize="sm"
        p="0 1.2rem"
        lineHeight="1.3rem"
        textAlign="center"
        color="secondary"
      >
        <Translation id="page-find-wallet-persona-desc" />
      </Box>
      {personas.map((persona, idx) => {
        return (
          <Flex
            key={persona.title}
            direction="column"
            alignItems="flex-start"
            padding={6}
            background={getContainerBg(idx)}
            borderRadius="base"
            cursor="pointer"
            transition="0.5s all"
            _hover={{
              background: getContainerHoverBg(idx),
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
            <Flex alignItems="center" gap={2} mb="0.6rem" pt={2} pb={0} px={2}>
              <Box
                boxSize="1.3rem"
                role="checkbox"
                aria-label={`${persona.title} filter`}
              >
                <Icon
                  as={MdCircle}
                  borderRadius="full"
                  boxSize={4}
                  my={0}
                  mx={1}
                  fill={
                    selectedPersona === idx
                      ? "primary.base"
                      : "rgba(0, 0, 0, 0)"
                  }
                  background={
                    selectedPersona === idx
                      ? "primary.base"
                      : "priceCardBackground"
                  }
                  outline="1.5px solid"
                  outlineColor={
                    selectedPersona === idx ? "primary.base" : "text"
                  }
                  outlineOffset="3px"
                  fontSize={8}
                />
              </Box>
              <Heading
                as="h3"
                ml={2}
                my={0}
                fontSize="1.3rem"
                py={0}
                pr={1}
                pl={0}
                lineHeight="1.7rem"
                color="text"
              >
                {persona.title}
              </Heading>
            </Flex>
            <Box
              as="span"
              m="0.5rem 0 0.8rem 0"
              p="0.7rem 0.6rem 0"
              color={selectedPersona === idx ? "text" : "text200"}
              fontSize="0.9rem"
              fontWeight="normal"
              transition="0.5s all"
              lineHeight={1.3}
              borderTop="1px solid"
              borderTopColor="lightBorder"
            >
              {persona.description}
            </Box>
            <UnorderedList
              m={0}
              display="grid"
              gridTemplateColumns="50% 50%"
              width="full"
              columnGap="0.2rem"
              rowGap={2}
              aria-label={`${persona.title} filters`}
            >
              {persona.featureHighlight.map((feature) => (
                <ListItem
                  display="flex"
                  gap="0.2rem"
                  fontSize="0.85rem"
                  lineHeight="0.95rem"
                  margin="0.1rem"
                  alignItems="center"
                  sx={{
                    p: {
                      mb: 0,
                      color: selectedPersona === idx ? "primary.base" : "text",
                    },
                    svg: {
                      width: 7,
                      height: 7,
                      path: {
                        fill: "text",
                        stroke: "text",
                      },
                    },
                  }}
                >
                  <span aria-hidden="true">{feature.icon}</span>
                  <span>{feature.label}</span>
                </ListItem>
              ))}
            </UnorderedList>
          </Flex>
        )
      })}
    </Flex>
  )
}

export default WalletFilterProfile
