// Libraries
import React from "react"
import { useTranslation } from "gatsby-plugin-react-i18next"
import Select from "react-select"
import { FaDiscord, FaGlobe, FaTwitter } from "react-icons/fa"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  chakra,
  Flex,
  HStack,
  Icon,
  Img,
  keyframes,
  List,
  ListItem,
  SimpleGrid,
  SkipNavContent,
  useToken,
  VisuallyHidden,
  StackItem,
} from "@chakra-ui/react"

// Components
import InlineLink, { IProps as LinkProps } from "../../Link"
import { WalletMoreInfo } from "./WalletMoreInfo"
import GatsbyImage from "../../GatsbyImage"
import Text from "../../OldText"

// Icons
import {
  GreenCheckProductGlyphIcon,
  WarningProductGlyphIcon,
} from "../../icons/staking"

// Utils
import { useWalletTable } from "./useWalletTable"
import { trackCustomEvent } from "../../../utils/matomo"
import { getImage } from "../../../utils/image"
import { WalletData } from "../../../data/wallets/wallet-data"
import {
  COMPARE_FEATURES_SKIP_LINK,
  FILTERED_RESULTS_SKIP_LINK,
} from "../../../pages/wallets/find-wallet"
import { ChildOnlyProp } from "../../../types"
import { NAV_BAR_PX_HEIGHT } from "../../../constants"

const ChakraSelect = chakra((props: { className?: string }) => (
  <Select {...props} />
))
const StyledSelect = (props) => (
  <ChakraSelect
    w="full"
    sx={{
      ".react-select": {
        "&__control": {
          bg: "searchBackground",
          border: "1px",
          borderColor: "text",
          cursor: "pointer",
          pe: "0.3rem",
          transition: "0.5s all",

          ".react-select__value-container": {
            ".react-select__single-value": {
              color: "text",
            },
          },

          ".react-select__indicators": {
            ".react-select__indicator-separator": {
              bg: "none",
            },
            ".react-select__indicator": {
              color: "text",
              p: 0,
            },
          },

          "&:hover, &--is-focused": {
            bg: "primary.base",
            borderColor: "primary.base",

            ".react-select__value-container": {
              ".react-select__single-value": {
                color: "background.base",
              },
            },

            ".react-select__indicators": {
              ".react-select__indicator": {
                color: "background.base",
              },
            },
          },
        },

        "&__placeholder": {
          color: "text200",
        },

        "&__single-value, &__menu, &__input": {
          color: "text",
        },

        "&__menu": {
          bg: "searchBackground",
        },

        "&__option": {
          "&:hover, &--is-focused": {
            bg: "selectHover",
          },
          _active: {
            bg: "selectActive",
            color: "buttonColor !important",
          },

          "&--is-selected": {
            bg: "primary.base",
            color: "buttonColor",
            _hover: {
              bg: "primary.base",
            },
          },
        },
      },
    }}
    {...props}
  />
)

const FeatureIconCol = ({
  className,
  featSelect,
  name,
}: {
  className: string
  featSelect: object
  name: string
}) => (
  <Box
    className={className}
    animation={`${fadeIn} 0.375s`}
    placeSelf="center"
    sx={{
      "&.fade": {
        animation: `${fadeOut} 0.375s`,
      },
      [`&.${secondCol}, &.${thirdCol}`]: {
        hideBelow: "md",
      },
    }}
    aria-label={`Chosen feature ${name} is ${
      featSelect ? "included." : "not included."
    }`}
  >
    {featSelect ? <GreenCheckProductGlyphIcon /> : <WarningProductGlyphIcon />}
  </Box>
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

const StretchedStackItem = (props: ChildOnlyProp) => (
  <StackItem flex={1} {...props} />
)

const SocialLink = (props: LinkProps) => (
  <InlineLink
    display="flex"
    height={8}
    alignItems="center"
    verticalAlign="middle"
    transform="scale(1)"
    transition="transform 0.1s"
    _hover={{
      transform: "scale(1.15)",
    }}
    {...props}
  />
)

// Constants
const firstCol = "firstCol"
const secondCol = "secondCol"
const thirdCol = "thirdCol"

export interface WalletTableProps {
  data: Record<string, any>
  filters: Record<string, boolean>
  walletData: WalletData[]
}

const WalletTable = ({ data, filters, walletData }: WalletTableProps) => {
  const { t } = useTranslation()
  const {
    featureDropdownItems,
    filteredFeatureDropdownItems,
    filteredWallets,
    setFirstFeatureSelect,
    setSecondFeatureSelect,
    setThirdFeatureSelect,
    updateDropdown,
    updateMoreInfo,
    firstFeatureSelect,
    secondFeatureSelect,
    thirdFeatureSelect,
    walletCardData,
  } = useWalletTable({ filters, t, walletData })

  const outlineShadowStyle = useToken("shadows", "outline")

  return (
    <Box w="full">
      {/* Feature comparison dropdowns */}
      <SkipNavContent id={COMPARE_FEATURES_SKIP_LINK}>
        <SimpleGrid
          bg="background"
          borderBottom="1px"
          borderColor="primary"
          fontSize="0.9rem"
          fontWeight="normal"
          templateColumns={{
            base: "auto",
            sm: "60% auto 5%",
            md: "40% auto 5%",
          }}
          w="full"
          rowGap={{ base: 4, sm: 0 }}
          columnGap={2}
          alignItems="center"
          p={2}
          position="sticky"
          top={0}
          zIndex="docked"
        >
          <Box textAlign="center" aria-hidden>
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
          </Box>
          <VisuallyHidden id="feature-dropdowns-desc">
            {t("page-find-wallet-compare-feature-dropdowns-desc")}
          </VisuallyHidden>
          <HStack
            aria-describedby="feature-dropdowns-desc"
            m={0}
            sx={{
              "& > *": {
                "&:nth-of-type(2), &:nth-of-type(3)": {
                  hideBelow: "md",
                },
              },
            }}
          >
            <StretchedStackItem>
              <HStack>
                <Text as="span" hideFrom="sm" fontSize="md" whiteSpace="nowrap">
                  {t("page-find-wallet-choose-features")}
                </Text>
                <StyledSelect
                  className="react-select-container"
                  classNamePrefix="react-select"
                  options={[
                    {
                      label: t("page-find-choose-to-compare"),
                      options: [...filteredFeatureDropdownItems],
                    },
                  ]}
                  onChange={(selectedOption) => {
                    updateDropdown(
                      selectedOption,
                      setFirstFeatureSelect,
                      firstCol
                    )
                  }}
                  defaultValue={firstFeatureSelect}
                  isSearchable={false}
                />
              </HStack>
            </StretchedStackItem>
            <StretchedStackItem>
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                options={[
                  {
                    label: t("page-find-choose-to-compare"),
                    options: [...filteredFeatureDropdownItems],
                  },
                ]}
                onChange={(selectedOption) => {
                  updateDropdown(
                    selectedOption,
                    setSecondFeatureSelect,
                    secondCol
                  )
                }}
                defaultValue={secondFeatureSelect}
                isSearchable={false}
              />
            </StretchedStackItem>
            <StretchedStackItem>
              <StyledSelect
                className="react-select-container"
                classNamePrefix="react-select"
                options={[
                  {
                    label: t("page-find-choose-to-compare"),
                    options: [...filteredFeatureDropdownItems],
                  },
                ]}
                onChange={(selectedOption) => {
                  updateDropdown(
                    selectedOption,
                    setThirdFeatureSelect,
                    thirdCol
                  )
                }}
                defaultValue={thirdFeatureSelect}
                isSearchable={false}
              />
            </StretchedStackItem>
          </HStack>
        </SimpleGrid>
      </SkipNavContent>
      <SkipNavContent id={FILTERED_RESULTS_SKIP_LINK}>
        {/* Filtered Wallet List */}
        <Accordion
          as={List}
          aria-label={t("page-find-wallet-filtered-results")}
          m={0}
          allowMultiple
        >
          {filteredWallets.map((wallet, idx) => {
            const deviceLabels: Array<string> = []

            wallet.ios && deviceLabels.push(t("page-find-wallet-iOS"))
            wallet.android && deviceLabels.push(t("page-find-wallet-android"))
            wallet.linux && deviceLabels.push(t("page-find-wallet-linux"))
            wallet.windows && deviceLabels.push(t("page-find-wallet-windows"))
            wallet.macOS && deviceLabels.push(t("page-find-wallet-macOS"))
            wallet.chromium && deviceLabels.push(t("page-find-wallet-chromium"))
            wallet.firefox && deviceLabels.push(t("page-find-wallet-firefox"))
            wallet.hardware && deviceLabels.push(t("page-find-wallet-hardware"))
            return (
              <AccordionItem
                key={idx}
                as={ListItem}
                borderTop="none"
                borderBottom="1px"
                borderColor="lightBorder"
                m={0}
                _hover={{ bg: "boxShadow", transition: "0.5s all" }}
                sx={{
                  h2: {
                    m: 0,
                  },
                }}
              >
                <h2>
                  <AccordionButton
                    onClick={() => {
                      updateMoreInfo(wallet.key)
                      trackCustomEvent({
                        eventCategory: "WalletMoreInfo",
                        eventAction: `More info wallet`,
                        eventName: `More info ${wallet.name} ${wallet.moreInfo}`,
                      })
                    }}
                    py={6}
                    px={{ base: 4, lg: 1 }}
                    _focusVisible={{
                      // Part of original style but modified to be "inset" for better visibility
                      boxShadow: `inset ${outlineShadowStyle}`,
                    }}
                  >
                    <SimpleGrid
                      templateColumns={{
                        base: "60% auto 5%",
                        md: "40% auto auto auto 5%",
                      }}
                      w="full"
                      sx={{
                        ".chakra-text": {
                          m: 0,
                          textAlign: "initial",
                        },
                      }}
                    >
                      <HStack
                        spacing={4}
                        pl="0.3rem"
                        sx={{
                          "& .chakra-text": {
                            _first: {
                              fontSize: "1.2rem",
                              fontWeight: "bold",
                            },
                            _notFirst: {
                              mt: "0.1rem",
                              fontSize: "0.9rem",
                              lineHeight: 4,
                            },
                          },
                        }}
                      >
                        <Box>
                          <Img
                            as={GatsbyImage}
                            image={getImage(data[wallet.image_name])!}
                            alt=""
                            objectFit="contain"
                            boxSize="56px"
                          />
                        </Box>
                        <Box>
                          <Text>{wallet.name}</Text>
                          <Text
                            hideBelow="sm"
                            color="text200"
                            fontSize="0.7rem"
                            lineHeight="0.85rem"
                          >
                            <VisuallyHidden>
                              {t("page-find-wallet-availble-for")}
                            </VisuallyHidden>
                            {deviceLabels.join(" | ")}
                          </Text>
                          {deviceLabels.map((label) => (
                            <Text
                              key={label}
                              hideFrom="md"
                              fontSize="0.7rem"
                              lineHeight="0.85rem"
                              color="text200"
                            >
                              {label}
                            </Text>
                          ))}
                          <Box mt={4}>
                            <Flex
                              as={List}
                              aria-label="available social media sites"
                              gap="0.8rem"
                              m={0}
                            >
                              <ListItem>
                                <SocialLink
                                  to={wallet.url}
                                  hideArrow
                                  customEventOptions={{
                                    eventCategory: "WalletExternalLinkList",
                                    eventAction: `Go to wallet`,
                                    eventName: `${wallet.name} ${idx}`,
                                    eventValue: JSON.stringify(filters),
                                  }}
                                  aria-label={`${wallet.name} website`}
                                >
                                  <Icon as={FaGlobe} fontSize="2xl" />
                                </SocialLink>
                              </ListItem>

                              {wallet.twitter && (
                                <ListItem>
                                  <SocialLink
                                    to={wallet.twitter}
                                    hideArrow
                                    customEventOptions={{
                                      eventCategory: "WalletExternalLinkList",
                                      eventAction: `Go to wallet`,
                                      eventName: `${wallet.name} ${idx}`,
                                      eventValue: JSON.stringify(filters),
                                    }}
                                    aria-label={`${wallet.name} twitter`}
                                  >
                                    <Icon
                                      as={FaTwitter}
                                      color="#1da1f2"
                                      fontSize="2xl"
                                    />
                                  </SocialLink>
                                </ListItem>
                              )}
                              {wallet.discord && (
                                <ListItem>
                                  <SocialLink
                                    to={wallet.discord}
                                    hideArrow
                                    customEventOptions={{
                                      eventCategory: "WalletExternalLinkList",
                                      eventAction: `Go to wallet`,
                                      eventName: `${wallet.name} ${idx}`,
                                      eventValue: JSON.stringify(filters),
                                    }}
                                    aria-label={`${wallet.name} discord`}
                                  >
                                    <Icon
                                      as={FaDiscord}
                                      color="#7289da"
                                      fontSize="2xl"
                                    />
                                  </SocialLink>
                                </ListItem>
                              )}
                            </Flex>
                          </Box>
                        </Box>
                      </HStack>
                      <FeatureIconCol
                        className={firstCol}
                        featSelect={wallet[firstFeatureSelect.filterKey!]}
                        name={firstFeatureSelect.label}
                      />
                      <FeatureIconCol
                        className={secondCol}
                        featSelect={wallet[secondFeatureSelect.filterKey!]}
                        name={secondFeatureSelect.label}
                      />
                      <FeatureIconCol
                        className={thirdCol}
                        featSelect={wallet[thirdFeatureSelect.filterKey!]}
                        name={thirdFeatureSelect.label}
                      />
                      <AccordionIcon
                        color="primary"
                        fontSize="2xl"
                        placeSelf="center"
                      />
                    </SimpleGrid>
                  </AccordionButton>
                </h2>
                <AccordionPanel p={0} pr={4}>
                  <WalletMoreInfo
                    wallet={wallet}
                    filters={filters}
                    idx={idx}
                    featureDropdownItems={featureDropdownItems}
                  />
                </AccordionPanel>
              </AccordionItem>
            )
          })}
        </Accordion>
      </SkipNavContent>
    </Box>
  )
}

export default WalletTable
