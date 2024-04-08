import { ReactNode, useContext } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import {
  Box,
  ContainerProps,
  Flex,
  FlexProps,
  forwardRef,
  Icon,
  keyframes,
  SimpleGrid,
  SimpleGridProps,
  Stack,
  Table,
  TableProps,
  Td,
  Text,
  Th,
  Tr,
} from "@chakra-ui/react"

import { ChildOnlyProp, WalletData, WalletFilter } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import { WalletMoreInfo } from "@/components/FindWallet/WalletTable/WalletMoreInfo"
import { DevicesIcon, LanguagesIcon } from "@/components/icons/wallets"
import { Image } from "@/components/Image"
import Tag from "@/components/Tag"

import { trackCustomEvent } from "@/lib/utils/matomo"
import {
  formatSupportedLanguages,
  getSupportedLanguages,
  getWalletPersonas,
  walletsListingCount,
} from "@/lib/utils/wallets"

import {
  DEFAULT_LOCALE,
  NAV_BAR_PX_HEIGHT,
  NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN,
} from "@/lib/constants"

import { SupportedLanguagesTooltip } from "./SupportedLanguagesTooltip"
import { WalletEmptyState } from "./WalletEmptyState"

import { WalletSupportedLanguageContext } from "@/contexts/WalletSupportedLanguageContext"
import { useWalletTable } from "@/hooks/useWalletTable"

const Container = (props: TableProps) => (
  <Table
    w="full"
    sx={{
      th: {
        fontWeight: "normal",
        p: {
          fontSize: "0.9rem",
        },
      },
    }}
    {...props}
  />
)

const WalletContainer = (props: ChildOnlyProp & ContainerProps) => (
  <Container
    borderBottom="1px"
    borderColor="lightBorder"
    _hover={{ bg: "background.highlight", transition: "0.5s all" }}
    {...props}
  />
)

const Grid = forwardRef<SimpleGridProps, "tr">((props, ref) => (
  <SimpleGrid
    as={Tr}
    ref={ref}
    templateColumns={{
      base: "60% auto 0% 0% 5%",
      md: "100% auto auto auto auto",
    }}
    w="full"
    columnGap={2}
    alignItems="center"
    {...props}
  />
))

const WalletContentHeader = (props: ChildOnlyProp) => (
  <Grid
    bg="background.base"
    borderBottom="1px"
    borderColor="primary.base"
    templateColumns="auto"
    rowGap={{ base: 4, sm: 0 }}
    p={2}
    position="sticky"
    top={NAV_BAR_PX_HEIGHT}
    zIndex={1}
    sx={{
      th: {
        p: 0,
        borderBottom: "none",
        color: "currentColor",
        fontSize: "0.9rem",
        lineHeight: "revert",
        letterSpacing: "revert",
        textAlign: "revert",
        textTransform: "revert",
        "&:nth-of-type(2)": {
          display: { base: "flex", sm: "revert" },
          alignItems: "center",
          gap: 4,
        },
        "&:nth-of-type(3), &:nth-of-type(4)": {
          hideBelow: "md",
        },
      },
    }}
    {...props}
  />
)

const Wallet = forwardRef<ChildOnlyProp, "tr">((props, ref) => (
  <Grid
    tabIndex={0}
    ref={ref}
    cursor="pointer"
    py={4}
    px={{ base: 4, lg: 1 }}
    sx={{
      p: {
        m: 0,
      },
      td: {
        padding: 0,
        borderBottom: "none",
        height: "full",
      },
      "td:nth-of-type(3), td:nth-of-type(4)": {
        hideBelow: "md",
      },
    }}
    templateColumns="auto"
    {...props}
  />
))

const FlexInfo = (props: FlexProps) => (
  <Flex
    gap={4}
    ps="0.3rem"
    sx={{
      p: {
        p: 0,
        fontSize: "xl",
        fontWeight: "bold",
        "& + p": {
          mt: "0.1rem",
          fontSize: "0.9rem",
          lineHeight: 5,
          fontWeight: "normal",
        },
      },
    }}
    {...props}
  />
)

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const FlexInfoCenter = (props: { children: ReactNode; className?: string }) => (
  <FlexInfo
    animation={`${fadeIn} 0.375s`}
    cursor="pointer"
    justifyContent="center"
    height="full"
    mt={{ base: 10, md: 0 }}
    sx={{
      "&.fade": {
        animation: `${fadeOut} 0.375s`,
      },
    }}
    {...props}
  />
)

export type WalletTableProps = {
  filters: WalletFilter
  resetFilters: () => void
  resetWalletFilter: React.MutableRefObject<() => void>
  walletData: WalletData[]
  onOpen: () => void
}

const WalletTable = ({
  filters,
  resetFilters,
  resetWalletFilter,
  walletData,
  onOpen,
}: WalletTableProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()
  const {
    featureDropdownItems,
    filteredWallets,
    updateMoreInfo,
    walletCardData,
  } = useWalletTable({ filters, t, walletData })

  // Context API
  const { supportedLanguage } = useContext(WalletSupportedLanguageContext)

  return (
    <Container>
      <WalletContentHeader>
        <Th sx={{ textAlign: "start !important" }}>
          <Flex justifyContent="space-between" px={{ base: 2.5, md: 0 }}>
            {/* Displayed on mobile only */}
            <Text
              hideFrom="lg"
              lineHeight={1.6}
              fontSize="md"
              color="primary.base"
              textTransform="uppercase"
              cursor="pointer"
              onClick={onOpen}
              as="button"
            >
              {`${t("page-find-wallet-filters")} (${
                walletsListingCount(filters) +
                (supportedLanguage === DEFAULT_LOCALE ? 0 : 1)
              })`}
            </Text>

            {filteredWallets.length === walletCardData.length ? (
              <Text ps={{ base: 2, md: 0 }} as="span">
                {t("page-find-wallet-showing-all-wallets")} (
                <strong>{walletCardData.length}</strong>)
              </Text>
            ) : (
              <Text ps={{ base: 2, md: 0 }} as="span">
                {t("page-find-wallet-showing")}{" "}
                <strong>
                  {filteredWallets.length} / {walletCardData.length}
                </strong>{" "}
                {t("page-find-wallet-wallets")}
              </Text>
            )}
          </Flex>
        </Th>
      </WalletContentHeader>
      {filteredWallets.length === 0 && (
        <WalletEmptyState
          resetFilters={resetFilters}
          resetWalletFilter={resetWalletFilter}
        />
      )}

      {filteredWallets.length > 0 &&
        filteredWallets.map((wallet, idx) => {
          const deviceLabels: Array<string> = []

          wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
          wallet.android && deviceLabels.push(t("page-find-wallet-android"))
          wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
          wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
          wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
          wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
          wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
          wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))

          const walletPersonas = getWalletPersonas(wallet)
          const hasPersonasLabels = walletPersonas.length > 0
          const hasDeviceLabels = deviceLabels.length > 0
          const hasAllLabels = hasPersonasLabels && hasDeviceLabels

          // Supported languages
          const supportedLanguages = getSupportedLanguages(
            wallet.languages_supported,
            locale!
          )
          const numberOfSupportedLanguages = supportedLanguages.length
          const sliceSize = NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
          const rest = numberOfSupportedLanguages - sliceSize
          const restText = `${rest > 0 ? "+" : ""} ${rest > 0 ? rest : ""}`

          const formattedSupportedLanguages = formatSupportedLanguages(
            supportedLanguages,
            sliceSize
          )

          const showMoreInfo = (wallet) => {
            updateMoreInfo(wallet.key)
            // Log "more info" event only on expanding
            wallet.moreInfo &&
              trackCustomEvent({
                eventCategory: "WalletMoreInfo",
                eventAction: `More info wallet`,
                eventName: `More info ${wallet.name}`,
              })
          }

          return (
            <WalletContainer
              key={wallet.key}
              bg={wallet.moreInfo ? "background.highlight" : "transparent"}
            >
              <Wallet
                // Make wallets more info section open on 'Enter'
                onKeyUp={(e) => {
                  if (e.key === "Enter") showMoreInfo(wallet)
                }}
                onClick={() => showMoreInfo(wallet)}
              >
                <Td lineHeight="revert">
                  <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                  >
                    <FlexInfo
                      w={{ base: "100%", md: "auto" }}
                      ps={{ base: 0, md: 1.5 }}
                    >
                      <Box w={{ base: "100%", md: "auto" }}>
                        <Flex alignItems="start">
                          {/* Wallet image */}
                          <Stack
                            w={{ base: "24px", md: "56px" }}
                            h={{ base: "24px", md: "56px" }}
                            me={4}
                          >
                            <Image
                              src={wallet.image}
                              alt=""
                              height={56}
                              objectFit="contain"
                            />
                          </Stack>

                          <Text lineHeight={1.2} fontSize="xl !important">
                            {wallet.name}
                          </Text>
                        </Flex>

                        <Stack mt={{ base: 2, md: -6 }} ms={{ md: "72px" }}>
                          {/* Wallet Personas supported */}
                          {hasPersonasLabels && (
                            <Flex gap={1.5} wrap="wrap">
                              {walletPersonas.map((persona) => (
                                <Tag key={persona} label={t(persona)} />
                              ))}
                            </Flex>
                          )}

                          <Stack gap={2} mb={{ base: 0, md: 3 }}>
                            {/* Device labels */}
                            {hasDeviceLabels && (
                              <Flex
                                alignItems="center"
                                gap={3}
                                display={hasDeviceLabels ? "flex" : "none"}
                              >
                                <Icon as={DevicesIcon} fontSize="2xl" />

                                <Text
                                  fontSize="md !important"
                                  fontWeight="normal !important"
                                >
                                  {deviceLabels.join(" · ")}
                                </Text>
                              </Flex>
                            )}

                            {/* Supported languages */}
                            <Flex alignItems="center" gap={3}>
                              <Icon as={LanguagesIcon} fontSize="2xl" />

                              <Text
                                fontSize="md !important"
                                fontWeight="normal !important"
                              >
                                {/* Show up to 5 supported languages and use a tooltip for the rest */}
                                {`${formattedSupportedLanguages}`}{" "}
                                {rest > 0 && (
                                  <SupportedLanguagesTooltip
                                    supportedLanguages={supportedLanguages}
                                    restText={restText}
                                  />
                                )}
                              </Text>
                            </Flex>
                          </Stack>

                          {/* Wallet Website Button (desktop) */}
                          <Box display={{ base: "none", md: "block" }}>
                            <ButtonLink
                              to={wallet.url}
                              variant="outline"
                              w="auto"
                              isExternal
                              size="sm"
                            >
                              {t("page-find-wallet-visit-website")}
                            </ButtonLink>
                          </Box>
                        </Stack>
                      </Box>
                    </FlexInfo>

                    <FlexInfoCenter>
                      <Box>
                        <Icon
                          as={wallet.moreInfo ? MdExpandLess : MdExpandMore}
                          color="primary.base"
                          fontSize={{ base: "5xl", md: "4xl" }}
                        />
                      </Box>
                    </FlexInfoCenter>
                  </Flex>
                  {/* Wallet Website Button (mobile) */}
                  <Box display={{ base: "block", md: "none" }} mt={6} w="100%">
                    <ButtonLink
                      to={wallet.url}
                      variant="outline"
                      w="100%"
                      isExternal
                      size="sm"
                    >
                      {t("page-find-wallet-visit-website")}
                    </ButtonLink>
                  </Box>
                </Td>
              </Wallet>

              {wallet.moreInfo && (
                <WalletMoreInfo
                  wallet={wallet}
                  filters={filters}
                  idx={idx}
                  featureDropdownItems={featureDropdownItems}
                  hasAllLabels={hasAllLabels}
                />
              )}
            </WalletContainer>
          )
        })}
    </Container>
  )
}

export default WalletTable
