import React from "react"
import { Box, Center, chakra, Flex } from "@chakra-ui/react"

import CardList from "../CardList"
import InlineLink from "../Link"
import Emoji from "../Emoji"
import Translation from "../Translation"
import { StyledSelect as Select } from "../SharedStyledComponents"
import Text from "../OldText"
import OldHeading from "../OldHeading"

import { ChildOnlyProp } from "../../types"
import { useEthExchanges } from "./use-eth-exchanges"

const ListContainer = (props: ChildOnlyProp) => (
  <Box mt={16} flex={{ base: "1 1 100%", md: "1 1 50%" }} {...props} />
)

const ResultsContainer = (props: ChildOnlyProp) => (
  <Flex
    justify="center"
    w="full"
    maxWidth="876px"
    flexWrap={{ base: "wrap", md: "initial" }}
    sx={{
      "& > *": {
        _first: {
          mr: { base: 0, md: 6 },
        },
      },
    }}
    {...props}
  />
)

const EmptyStateContainer = (props: ChildOnlyProp) => (
  <Center flexDir="column" mt={16} {...props} />
)

const SuccessContainer = (props: ChildOnlyProp) => (
  <Flex flexDir="column" mt={4} {...props} />
)

const EmptyStateText = (props: ChildOnlyProp) => (
  <Text m={8} fontSize="xl" maxW="450px" textAlign="center" {...props} />
)

const StyledSelect = chakra(Select, {
  baseStyle: {
    maxW: "container.sm",
  },
})

const NoResults = ({ children }) => (
  <EmptyStateContainer>
    <Emoji text=":crying_face:" fontSize="80px" />
    <EmptyStateText>
      {children}{" "}
      <InlineLink to="mailto:website@ethereum.org">
        website@ethereum.org
      </InlineLink>
      .
    </EmptyStateText>
  </EmptyStateContainer>
)

const NoResultsSingle = ({ children }) => (
  <Center flexDir="column" mt={6}>
    <Text maxW="450px" mb={16}>
      {children}{" "}
      <InlineLink to="mailto:website@ethereum.org">
        website@ethereum.org
      </InlineLink>
      .
    </Text>
    <Emoji text=":crying_face:" fontSize="80px" />
  </Center>
)

// TODO move component into get-eth.js page?
const EthExchanges = () => {
  const {
    exchangesByCountry,
    handleSelectChange,
    hasSelectedCountry,
    placeholderString,
    t,
    hasExchangeResults,
    filteredExchanges,
    lastUpdated,
  } = useEthExchanges()

  return (
    <Flex flexDir="column" align="center" w="full">
      <OldHeading
        fontSize={{ base: "2xl", md: "2rem" }}
        fontWeight={600}
        lineHeight={1.4}
      >
        <Translation id="page-get-eth-exchanges-header" />
      </OldHeading>
      <Text maxW="container.sm" mb={8} lineHeight={1.4} textAlign="center">
        <Translation id="page-get-eth-exchanges-intro" />
      </Text>
      <StyledSelect
        aria-label={t("page-get-eth-exchanges-header")}
        className="react-select-container"
        classNamePrefix="react-select"
        options={exchangesByCountry}
        onChange={handleSelectChange}
        placeholder={placeholderString}
      />
      {!hasSelectedCountry && (
        <EmptyStateContainer>
          <Emoji text=":world_map:" fontSize="80px" />
          <EmptyStateText>
            <Translation id="page-get-eth-exchanges-empty-state-text" />
          </EmptyStateText>
        </EmptyStateContainer>
      )}
      {/* No results */}
      {hasSelectedCountry && !hasExchangeResults && (
        <ResultsContainer>
          <NoResults>
            <Translation id="page-get-eth-exchanges-no-exchanges-or-wallets" />
          </NoResults>
        </ResultsContainer>
      )}
      {/* Has results */}
      {hasExchangeResults && (
        <>
          <ResultsContainer>
            <ListContainer>
              <OldHeading
                as="h3"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={600}
                lineHeight={1.4}
              >
                <Translation id="page-get-eth-exchanges-header-exchanges" />
              </OldHeading>
              {hasExchangeResults && (
                <SuccessContainer>
                  <Text>
                    <Translation id="page-get-eth-exchanges-success-exchange" />
                  </Text>
                  <CardList items={filteredExchanges} />
                </SuccessContainer>
              )}
              {!hasExchangeResults && (
                <NoResultsSingle>
                  <Translation id="page-get-eth-exchanges-no-exchanges" />
                </NoResultsSingle>
              )}
            </ListContainer>
          </ResultsContainer>
          <Text w="full" maxW="876px" mt={16} mb={0}>
            <Translation id="page-get-eth-exchanges-disclaimer" />{" "}
            <InlineLink to="mailto:website@ethereum.org">
              website@ethereum.org
            </InlineLink>
            . <Translation id="page-find-wallet-last-updated" />{" "}
            <strong>{lastUpdated}</strong>
          </Text>
        </>
      )}
    </Flex>
  )
}

export default EthExchanges
