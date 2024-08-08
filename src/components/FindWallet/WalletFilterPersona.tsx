import { MdCheckBox } from "react-icons/md"
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"

import { WalletFilter, WalletPersonas } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getPersonaBorderColor } from "@/lib/utils/wallets"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

type WalletFilterPersonaProps = {
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<WalletFilter>>
  selectedPersona: number[]
  setSelectedPersona: React.Dispatch<React.SetStateAction<number[]>>
  showMobileSidebar: boolean
  resetWalletFilter: React.MutableRefObject<() => void>
}

const computeFilters = (
  selectedPersonas: number[],
  personas: WalletPersonas[]
) => {
  if (selectedPersonas.length === 0) return {}

  const firstPersona = personas[selectedPersonas[0]]
  const initialFilters = firstPersona.presetFilters
  return selectedPersonas
    .slice(1)
    .reduce((filters: { [key: string]: boolean }, personaId) => {
      const persona = personas[personaId]
      if (!persona) return filters

      return Object.fromEntries(
        Object.entries(filters).map(([key, value]) => {
          return [key, value || persona.presetFilters[key]]
        })
      )
    }, initialFilters)
}

const WalletFilterPersona = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
  showMobileSidebar,
  resetWalletFilter,
}: WalletFilterPersonaProps) => {
  const personas = useWalletPersonas()
  const handleSelectPersona = (idx: number, persona: WalletPersonas) => {
    let newSelectedPersonas
    if (selectedPersona.includes(idx)) {
      newSelectedPersonas = selectedPersona.filter((persona) => persona !== idx)
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: `${persona.title}`,
        eventName: `${persona.title} false`,
      })
      setSelectedPersona(newSelectedPersonas)
      if (newSelectedPersonas.length < 1) {
        resetFilters()
        resetWalletFilter.current()
      } else {
        const newFilters = computeFilters(newSelectedPersonas, personas)
        setFilters((prevFilters) => {
          const combinedFilters = Object.fromEntries(
            Object.entries(prevFilters).map(([key]) => {
              return [key, newFilters[key]]
            })
          )
          return combinedFilters as WalletFilter
        })
      }
    } else {
      newSelectedPersonas = [...selectedPersona, idx]
      trackCustomEvent({
        eventCategory: "UserPersona",
        eventAction: `${persona.title}`,
        eventName: `${persona.title} true`,
      })
      setSelectedPersona(newSelectedPersonas)
      const newFilters = computeFilters(newSelectedPersonas, personas)
      setFilters((prevFilters) => {
        const combinedFilters = Object.fromEntries(
          Object.entries(prevFilters).map(([key, value]) => {
            return [key, value || newFilters[key]]
          })
        )
        return combinedFilters as WalletFilter
      })
    }
  }

  return (
    <Grid
      gap={showMobileSidebar ? 2 : 4}
      autoColumns={{ base: "200px", lg: "minmax(0, 1fr)" }}
      templateColumns={
        showMobileSidebar
          ? "repeat(2, 1fr)"
          : { base: "200px", lg: "minmax(0, 1fr)" }
      }
      mb={showMobileSidebar ? 4 : 2}
      overflowX="auto"
    >
      {personas.map((persona, idx) => {
        return (
          <GridItem
            key={persona.title}
            gridRow={showMobileSidebar ? "auto" : 1}
          >
            <Flex
              tabIndex={0}
              h="100%"
              direction="column"
              alignItems="flex-start"
              padding={2}
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
              onClick={() => handleSelectPersona(idx, persona)}
              onKeyUp={(e) => {
                if (e.key === "Enter") handleSelectPersona(idx, persona)
              }}
            >
              <Flex gap={2} mb={showMobileSidebar ? 0 : 1} px={1.5}>
                <Box role="radio" aria-label={`${persona.title} filter`}>
                  <Icon
                    as={MdCheckBox}
                    boxSize={2.5}
                    my={0}
                    mx={1}
                    fill={
                      selectedPersona.includes(idx)
                        ? "primary.base"
                        : "transparent"
                    }
                    background={
                      selectedPersona.includes(idx)
                        ? "primary.base"
                        : "transparent"
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
                  fontSize={showMobileSidebar ? "md" : "xl"}
                  fontWeight="bold"
                  py={0}
                  pe={1}
                  ps={0}
                  lineHeight="1.7rem"
                  color="primary.base"
                  _groupHover={{
                    color: "primary.hover",
                  }}
                >
                  {persona.title}
                </Heading>
              </Flex>

              {!showMobileSidebar && (
                <Text
                  p="0.4rem"
                  color={
                    selectedPersona.includes(idx) ? "body.base" : "body.medium"
                  }
                  fontSize="sm"
                  fontWeight="normal"
                  transition="0.5s all"
                  lineHeight={1.3}
                >
                  {persona.description}
                </Text>
              )}
            </Flex>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default WalletFilterPersona
