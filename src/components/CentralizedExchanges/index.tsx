import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { Box, Center, chakra, Flex } from "@chakra-ui/react"

import type { ChildOnlyProp, Lang } from "@/lib/types"

import CardList from "@/components/CardList"
import Emoji from "@/components/Emoji"
import InlineLink from "@/components/Link"
import OldHeading from "@/components/OldHeading"
import Text from "@/components/OldText"
import { StyledSelect } from "@/components/SharedStyledComponents"

import { getLocaleTimestamp } from "@/lib/utils/time"

import { WEBSITE_EMAIL } from "@/lib/constants"

import { useCentralizedExchanges } from "@/hooks/useCentralizedExchanges"

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
          me: { base: 0, md: 6 },
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

const Select = chakra(StyledSelect, {
  baseStyle: { maxW: "container.sm" },
})

const NoResults = ({ children }) => (
  <EmptyStateContainer>
    <Emoji text=":crying_face:" fontSize="80px" />
    <EmptyStateText>
      {/* TODO: Fix `children` structure to include email link within i18n string */}
      {children}{" "}
      <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</InlineLink>.
    </EmptyStateText>
  </EmptyStateContainer>
)

const NoResultsSingle = ({ children }) => (
  <Center flexDir="column" mt={6}>
    <Text maxW="450px" mb={16}>
      {/* TODO: Fix `children` structure to include email link within i18n string */}
      {children}{" "}
      <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</InlineLink>.
    </Text>
    <Emoji text=":crying_face:" fontSize="80px" />
  </Center>
)

type CentralizedExchangesProps = { lastDataUpdateDate: string }

const CentralizedExchanges = ({
  lastDataUpdateDate,
}: CentralizedExchangesProps) => {
  const { t } = useTranslation("page-get-eth")
  const { locale } = useRouter()
  const {
    selectOptions,
    handleSelectChange,
    hasSelectedCountry,
    placeholderString,
    hasExchangeResults,
    filteredExchanges,
  } = useCentralizedExchanges()

  const lastUpdated = getLocaleTimestamp(locale as Lang, lastDataUpdateDate)

  return (
    <Flex flexDir="column" align="center" w="full">
      <OldHeading
        fontSize={{ base: "2xl", md: "2rem" }}
        fontWeight={600}
        lineHeight={1.4}
      >
        {t("page-get-eth-exchanges-header")}
      </OldHeading>
      <Text maxW="container.sm" mb={8} lineHeight={1.4} textAlign="center">
        {t("page-get-eth-exchanges-intro")}
      </Text>
      <Select
        aria-label={t("page-get-eth-exchanges-header")}
        className="react-select-container"
        classNamePrefix="react-select"
        options={selectOptions}
        onChange={handleSelectChange as any} // TODO: Fix typing
        placeholder={placeholderString}
      />
      {!hasSelectedCountry && (
        <EmptyStateContainer>
          <Emoji text=":world_map:" fontSize="80px" />
          <EmptyStateText>
            {t("page-get-eth-exchanges-empty-state-text")}
          </EmptyStateText>
        </EmptyStateContainer>
      )}
      {/* No results */}
      {hasSelectedCountry && !hasExchangeResults && (
        <ResultsContainer>
          <NoResults>
            {t("page-get-eth-exchanges-no-exchanges-or-wallets")}
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
                {t("page-get-eth-exchanges-header-exchanges")}
              </OldHeading>
              {hasExchangeResults && (
                <SuccessContainer>
                  <Text>{t("page-get-eth-exchanges-success-exchange")}</Text>
                  <CardList items={filteredExchanges} />
                </SuccessContainer>
              )}
              {!hasExchangeResults && (
                <NoResultsSingle>
                  {t("page-get-eth-exchanges-no-exchanges")}
                </NoResultsSingle>
              )}
            </ListContainer>
          </ResultsContainer>
          <Text w="full" maxW="876px" mt={16} mb={0}>
            {t("page-get-eth-exchanges-disclaimer")}{" "}
            <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>
              {WEBSITE_EMAIL}
            </InlineLink>
            . {t("page-find-wallet-last-updated")}{" "}
            <strong>{lastUpdated}</strong>
          </Text>
        </>
      )}
    </Flex>
  )
}

export default CentralizedExchanges
