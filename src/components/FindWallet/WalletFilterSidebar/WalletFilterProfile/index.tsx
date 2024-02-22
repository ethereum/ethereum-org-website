import React from "react"
import { MdCircle } from "react-icons/md"
import {
  Box,
  Flex,
  Heading,
  Icon,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react"

import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useWalletFilterProfile } from "./useWalletFilterProfile"

const WalletFilterProfile = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
}) => {
  const { personas } = useWalletFilterProfile()

  const getContainerBg = (idx: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue(
      selectedPersona === idx ? "primary100" : "chakra-subtle-bg",
      selectedPersona === idx ? "primary900" : "black400"
    )
  const getContainerHoverBg = (idx: number) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useColorModeValue(
      "primary100",
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
        <Translation id="page-wallets-find-wallet:page-find-wallet-persona-desc" />
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
            <Flex alignItems="center" gap={2} mb="0.2rem" pt={0} pb={0} px={2}>
              <Box
                boxSize="1.3rem"
                role="checkbox"
                aria-label={`${persona.title} filter`}
              >
                <Icon
                  as={MdCircle}
                  borderRadius="full"
                  boxSize={3}
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
                    selectedPersona === idx ? "primary.base" : "primary.base"
                  }
                  outlineOffset="3px"
                  fontSize={8}
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
            <Box
              as="span"
              m="0.8rem 0 0.8rem 0"
              p="0.8rem 0.6rem 0"
              color={selectedPersona === idx ? "text" : "text200"}
              fontSize="0.9rem"
              fontWeight="normal"
              transition="0.5s all"
              lineHeight={1.3}
              borderTop="1px solid"
              borderTopColor="primary.base"
            >
              {persona.description}
            </Box>
            <UnorderedList
              m={0}
              display="grid"
              width="full"
              columnGap="0.2rem"
              rowGap="0.4rem"
              aria-label={`${persona.title} filters`}
            >
              {persona.featureHighlight.map((feature, idx) => (
                <ListItem
                  key={idx}
                  display="flex"
                  gap="0.2rem"
                  fontSize="0.85rem"
                  lineHeight="0.95rem"
                  margin="0.1rem"
                  alignItems="center"
                  wordBreak={"break-word"}
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
