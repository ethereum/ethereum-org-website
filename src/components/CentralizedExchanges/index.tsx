import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"

import type { ChildOnlyProp, Lang } from "@/lib/types"

import CardList from "@/components/CardList"
import Emoji from "@/components/Emoji"
import InlineLink from "@/components/ui/Link"

import { getLocaleTimestamp } from "@/lib/utils/time"

import { WEBSITE_EMAIL } from "@/lib/constants"

import Select from "../Select"

import { useCentralizedExchanges } from "@/hooks/useCentralizedExchanges"

const ListContainer = (props: ChildOnlyProp) => (
  <div className="mt-16 flex flex-col gap-4" {...props} />
)

const ResultsContainer = (props: ChildOnlyProp) => (
  <div
    className="flex w-full max-w-screen-md flex-wrap justify-center md:flex-nowrap first:md:me-6"
    {...props}
  />
)

const EmptyStateContainer = (props: ChildOnlyProp) => (
  <div className="mt-16 flex flex-col items-center justify-center" {...props} />
)

const SuccessContainer = (props: ChildOnlyProp) => (
  <div className="flex flex-col gap-4" {...props} />
)

const EmptyStateText = (props: ChildOnlyProp) => (
  <p className="m-8 max-w-[450px] text-center text-xl" {...props} />
)

const NoResults = ({ children }) => (
  <EmptyStateContainer>
    <Emoji text=":crying_face:" className="text-[80px]" />
    <EmptyStateText>
      {/* TODO: Fix `children` structure to include email link within i18n string */}
      {children}{" "}
      <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</InlineLink>.
    </EmptyStateText>
  </EmptyStateContainer>
)

const NoResultsSingle = ({ children }) => (
  <div className="mt-6 flex flex-col items-center justify-center">
    <p className="mb-16 max-w-[450px]">
      {/* TODO: Fix `children` structure to include email link within i18n string */}
      {children}{" "}
      <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>{WEBSITE_EMAIL}</InlineLink>.
    </p>
    <Emoji text=":crying_face:" className="text-[80px]" />
  </div>
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
    <div className="flex flex-col items-center">
      <h2 className="mb-4">{t("page-get-eth-exchanges-header")}</h2>
      <p className="mb-8 max-w-screen-md text-center">
        {t("page-get-eth-exchanges-intro")}
      </p>
      <div className="w-full max-w-screen-sm">
        <Select
          instanceId="eth-exchange-region"
          aria-label={t("page-get-eth-exchanges-header")}
          options={selectOptions}
          onChange={handleSelectChange}
          placeholder={placeholderString}
          isSearchable
          variant="outline"
        />
      </div>
      {!hasSelectedCountry && (
        <EmptyStateContainer>
          <Emoji text=":world_map:" className="text-[80px]" />
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
              <h3 className="text-xl font-semibold md:text-2xl">
                {t("page-get-eth-exchanges-header-exchanges")}
              </h3>
              {hasExchangeResults && (
                <SuccessContainer>
                  <p>{t("page-get-eth-exchanges-success-exchange")}</p>
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
          <p className="mt-16 max-w-screen-lg">
            {t("page-get-eth-exchanges-disclaimer")}{" "}
            <InlineLink href={`mailto:${WEBSITE_EMAIL}`}>
              {WEBSITE_EMAIL}
            </InlineLink>
            . {t("page-find-wallet-last-updated")}{" "}
            <strong>{lastUpdated}</strong>
          </p>
        </>
      )}
    </div>
  )
}

export default CentralizedExchanges
