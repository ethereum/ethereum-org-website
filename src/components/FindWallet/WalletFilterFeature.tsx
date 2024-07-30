import React, { Fragment, MutableRefObject } from "react"
import { uniqueId } from "lodash"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Checkbox,
  Flex,
  GridItem,
  Heading,
  HStack,
  Icon,
  List,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import { LanguageSupportFilter } from "@/components/FindWallet/LanguageSupportFilter"

import { trackCustomEvent } from "@/lib/utils/matomo"

import { useWalletFilterFeature } from "@/hooks/useWalletFilterFeature"

const FilterToggle = ({
  ariaLabel,
  conditionItem,
}: {
  ariaLabel: string
  conditionItem: boolean
}) => (
  <Box
    as="span"
    aria-label={ariaLabel}
    role="checkbox"
    aria-checked={conditionItem ? "true" : "false"}
  >
    <Icon
      as={conditionItem ? BsToggleOn : BsToggleOff}
      color="primary.base"
      boxSize="1.875rem"
    />
  </Box>
)

export type WalletFilterFeatureProps = {
  filters: WalletFilter
  resetWalletFilter: MutableRefObject<() => void>
  updateFilterOption: (key: unknown) => void
  updateFilterOptions: (key: unknown, value: unknown) => void
}

const WalletFilterFeature = ({
  updateFilterOption,
  ...restProps
}: WalletFilterFeatureProps) => {
  const { filterOptions, setShowOptions } = useWalletFilterFeature(restProps)
  // Workaround to not having a dedicated prop to all items open by default
  // Adds `null` value to extend the filter options array by one, so `LanguageSupportFilter` starts expanded too
  const openAllItemsByDefault = [...Object.keys(filterOptions), null].map(
    (_, idx) => idx
  )

  return (
    <Accordion
      as={VStack}
      allowMultiple
      reduceMotion
      spacing={2}
      alignItems="normal"
      defaultIndex={openAllItemsByDefault}
    >
      {filterOptions.map((filterOption, idx) => {
        const FilterItem = () => (
          <AccordionItem
            background="background.highlight"
            borderRadius="base"
            // Remove border color from global style
            borderColor="transparent"
            p={6}
          >
            {({ isExpanded }) => (
              <>
                <Heading
                  as="h3"
                  borderBottom={isExpanded ? "1px" : "none"}
                  borderColor="body.light"
                  fontSize="lg"
                  fontWeight={600}
                  lineHeight={1.4}
                  py={1}
                  ps={4}
                  pe={2.5}
                  borderRadius={1}
                  _hover={{ color: "primary.hover" }}
                >
                  <AccordionButton
                    color="inherit"
                    fontWeight="inherit"
                    fontSize="inherit"
                    px={0}
                    py={0}
                    textAlign="initial"
                    _hover={{ background: "transparent" }}
                  >
                    <Text as="span" flex={1}>
                      {filterOption.title}
                    </Text>

                    <AccordionIcon
                      color="primary.base"
                      boxSize={9}
                      _hover={{ color: "primary.hover" }}
                      transform="rotate(0deg)"
                    />
                  </AccordionButton>
                </Heading>

                <AccordionPanel as={List} p={0} m={0}>
                  {filterOption.items.map((item, itemIdx) => {
                    const LabelIcon = item.icon

                    return (
                      <Box
                        key={itemIdx}
                        borderBottom="1px"
                        borderColor="lightBorder"
                        pt="1.16rem"
                        px={3}
                        pb={3}
                        _last={{ border: "none" }}
                      >
                        <SimpleGrid
                          key={uniqueId("walletFilterSidebarItemPanel")}
                          templateColumns="28px auto"
                          alignItems="center"
                          columnGap={2.5}
                          cursor="pointer"
                          onClick={
                            item.filterKey
                              ? () => {
                                  // Track 'gas_fee_customization' filter separately when selected
                                  if (
                                    item.filterKey === "gas_fee_customization"
                                  ) {
                                    trackCustomEvent({
                                      eventCategory: "WalletFilterSidebar",
                                      eventAction: `advanced_features`,
                                      eventName: "gas_fee_customization true",
                                    })
                                  } else {
                                    trackCustomEvent({
                                      eventCategory: "WalletFilterSidebar",
                                      eventAction: `${filterOption.title}`,
                                      eventName: `${item.filterKey} ${!restProps
                                        .filters[item.filterKey!]}`,
                                    })
                                  }

                                  updateFilterOption(item.filterKey)
                                }
                              : () => {
                                  setShowOptions(
                                    idx,
                                    itemIdx,
                                    !item.showOptions
                                  )
                                  trackCustomEvent({
                                    eventCategory: "WalletFilterSidebar",
                                    eventAction: `${filterOption.title}`,
                                    eventName: `Toggle ${
                                      item.title
                                    } to ${item.showOptions}`,
                                  })
                                }
                          }
                        >
                          <GridItem>
                            <LabelIcon boxSize={7} mt={0.5} aria-hidden />
                          </GridItem>

                          <GridItem as="span" lineHeight="1.1rem">
                            <Flex
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              {item.title}

                              <>
                                {item.filterKey && (
                                  <FilterToggle
                                    ariaLabel={item.title}
                                    conditionItem={
                                      restProps.filters[item.filterKey]
                                    }
                                  />
                                )}
                                {item.showOptions !== undefined && (
                                  <FilterToggle
                                    ariaLabel={item.title}
                                    conditionItem={item.showOptions}
                                  />
                                )}
                              </>
                            </Flex>
                          </GridItem>

                          <GridItem
                            as="span"
                            color="body.medium"
                            fontSize="0.9rem"
                            lineHeight="1.1rem"
                            colStart={2}
                          >
                            {item.description}
                          </GridItem>
                        </SimpleGrid>

                        {item.options.length > 0 && item.showOptions && (
                          <HStack mt={3.5} spacing={2}>
                            {item.options.map((option, optionIdx) => {
                              const handleClick = () => {
                                let closeShowOptions = true

                                for (const filterOption of item.options) {
                                  if (filterOption.name === option.name) {
                                    if (
                                      !restProps.filters[
                                        filterOption.filterKey!
                                      ]
                                    ) {
                                      closeShowOptions = false
                                      break
                                    }
                                  } else {
                                    if (
                                      restProps.filters[filterOption.filterKey!]
                                    ) {
                                      closeShowOptions = false
                                      break
                                    }
                                  }
                                }

                                if (closeShowOptions) {
                                  setShowOptions(
                                    idx,
                                    itemIdx,
                                    !item.showOptions
                                  )
                                }

                                trackCustomEvent({
                                  eventCategory: "WalletFilterSidebar",
                                  eventAction: `${filterOption.title}`,
                                  eventName: `${option.filterKey} ${!restProps
                                    .filters[option.filterKey!]}`,
                                })
                                updateFilterOption(option.filterKey)
                              }
                              return (
                                <Checkbox
                                  key={optionIdx}
                                  aria-label={option.name}
                                  isChecked={
                                    restProps.filters[option.filterKey!]
                                  }
                                  width="full"
                                  onChange={handleClick}
                                >
                                  <Text as="p" aria-hidden="true">
                                    {option.name}
                                  </Text>
                                </Checkbox>
                              )
                            })}
                          </HStack>
                        )}
                      </Box>
                    )
                  })}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        )

        // Insert `LanguageSupportFilter` in the 2nd position before `Buy crypto / Sell for fiat` filter
        if (idx === 1) {
          return (
            // `Fragment` needed here to be able to pass a key prop (https://react.dev/reference/react/Fragment#caveats)
            <Fragment key={uniqueId("walletFilterSidebarLanguageSupport")}>
              <LanguageSupportFilter />

              {/* Buy crypto / Sell for fiat filter, originally in the 2nd position  */}
              <FilterItem />
            </Fragment>
          )
        } else {
          return <FilterItem key={uniqueId("walletFilterSidebarItem")} />
        }
      })}
    </Accordion>
  )
}

export default WalletFilterFeature
