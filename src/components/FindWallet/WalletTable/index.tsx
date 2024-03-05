import { ReactNode } from "react"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdExpandLess, MdExpandMore } from "react-icons/md"
import {
  Box,
  calc,
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

import { ChildOnlyProp, WalletFilter } from "@/lib/types"

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
} from "@/lib/utils/wallets"

import { WalletData } from "@/data/wallets/wallet-data"

import {
  NAV_BAR_PX_HEIGHT,
  NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN,
} from "@/lib/constants"

import { SupportedLanguagesTooltip } from "./SupportedLanguagesTooltip"
import { WalletEmptyState } from "./WalletEmptyState"

import { useLanguagesList } from "@/hooks/useLanguagesList"
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

const WalletContainer = (props: ChildOnlyProp) => (
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
    templateColumns={{
      base: "auto",
      sm: "60% auto 0% 0% 5%",
      md: "40% auto auto auto 5%",
    }}
    rowGap={{ base: 4, sm: 0 }}
    p={2}
    position="sticky"
    top={{
      base: calc(NAV_BAR_PX_HEIGHT).add("4rem").toString(),
      lg: NAV_BAR_PX_HEIGHT,
    }}
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
        fontSize: "1.2rem",
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
}

const WalletTable = ({
  filters,
  resetFilters,
  resetWalletFilter,
  walletData,
}: WalletTableProps) => {
  const { t } = useTranslation("page-wallets-find-wallet")
  const { locale } = useRouter()
  const {
    featureDropdownItems,
    filteredWallets,
    updateMoreInfo,
    walletCardData,
  } = useWalletTable({ filters, t, walletData })
  const languagesList = useLanguagesList()

  return (
    <Container>
      <WalletContentHeader>
        <Th sx={{ textAlign: "start !important" }}>
          {filteredWallets.length === walletCardData.length ? (
            <Text as="span">
              {t("page-find-wallet-showing-all-wallets")} (
              <strong>{walletCardData.length}</strong>)
            </Text>
          ) : (
            <Text as="span">
              {t("page-find-wallet-showing")}{" "}
              <strong>
                {filteredWallets.length} / {walletCardData.length}
              </strong>{" "}
              {t("page-find-wallet-wallets")}
            </Text>
          )}
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
          // Supported languages
          const supportedLanguages = getSupportedLanguages(
            wallet.languages_supported,
            languagesList,
            locale!
          )
          const numberOfSupportedLanguages = supportedLanguages.length
          const rest = numberOfSupportedLanguages - 5
          const restText = `${rest > 0 ? "+" : ""} ${rest > 0 ? rest : ""}`
          const sliceSize = NUMBER_OF_SUPPORTED_LANGUAGES_SHOWN
          const formattedSupportedLanguages = formatSupportedLanguages(
            supportedLanguages,
            sliceSize
          )

          return (
            <WalletContainer key={wallet.key}>
              <Wallet
                onClick={() => {
                  updateMoreInfo(wallet.key)
                  // Log "more info" event only on expanding
                  wallet.moreInfo &&
                    trackCustomEvent({
                      eventCategory: "WalletMoreInfo",
                      eventAction: `More info wallet`,
                      eventName: `More info ${wallet.name}`,
                    })
                }}
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
                      {/* Wallet image */}
                      <Box
                        w={{ base: "24px", md: "56px" }}
                        mb={deviceLabels.length > 0 ? 0 : 36}
                      >
                        <Image
                          src={wallet.image}
                          alt=""
                          objectFit="contain"
                          boxSize={{ base: "24px", md: "56px" }}
                        />
                      </Box>

                      <Box w={{ base: "100%", md: "auto" }}>
                        <Stack>
                          <Box mb={3}>
                            <Text lineHeight={1.2} fontSize="xl !important">
                              {wallet.name}
                            </Text>
                          </Box>

                          {/* Wallet Personas supported */}
                          <Flex
                            gap={1.5}
                            wrap="wrap"
                            mb={walletPersonas.length > 0 ? 0 : 8}
                          >
                            {walletPersonas.map((persona) => (
                              <Tag
                                key={persona}
                                label={t(persona).toUpperCase()}
                              />
                            ))}
                          </Flex>

                          <Stack gap={2} mb={{ base: 0, md: 3 }}>
                            {/* Device labels */}
                            <Flex
                              alignItems="center"
                              gap={3}
                              display={
                                deviceLabels.length > 0 ? "flex" : "none"
                              }
                            >
                              <Icon as={DevicesIcon} fontSize="2xl" />

                              <Text
                                fontSize="1rem !important"
                                fontWeight="normal !important"
                              >
                                {deviceLabels.join(" · ")}
                              </Text>
                            </Flex>

                            {/* Supported languages */}
                            <Flex alignItems="center" gap={3}>
                              <Icon as={LanguagesIcon} fontSize="2xl" />

                              <Text
                                fontSize="1rem !important"
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
                          <Box display={{ base: "none", md: "block" }} w="auto">
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
                />
              )}
            </WalletContainer>
          )
        })}
    </Container>
  )
}

export default WalletTable
