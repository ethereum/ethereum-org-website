import React, { MutableRefObject } from "react"
import { BsToggleOff, BsToggleOn } from "react-icons/bs"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  GridItem,
  Heading,
  HStack,
  Icon,
  List,
  SimpleGrid,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react"
import { uniqueId } from "lodash"
import Checkbox from "../../Checkbox"
import { useWalletFilterSidebar } from "./useWalletFilterSidebar"
import { trackCustomEvent } from "../../../utils/matomo"

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

export interface WalletFilterSidebarProps {
  resetWalletFilter: MutableRefObject<() => void>
  filters: Record<string, boolean>
  updateFilterOption: (key: any) => void
  updateFilterOptions: (key: any, value: any) => void
}

const WalletFilterSidebar: React.FC<WalletFilterSidebarProps> = ({
  updateFilterOption,
  ...restProps
}) => {
  const { filterOptions, setShowOptions } = useWalletFilterSidebar(restProps)

  const filterPanelBg = useColorModeValue("primary100", "black400")
  return (
    <Accordion
      as={VStack}
      allowMultiple
      reduceMotion
      spacing={4}
      alignItems="normal"
      p={{ base: 4, sm: 0 }}
      // Workaround to not having a dedicated prop to all items open by default
      defaultIndex={Object.keys(filterOptions).map((key) => +key)}
    >
      {filterOptions.map((filterOption, idx) => {
        return (
          <AccordionItem
            key={uniqueId("walletFilterSidebarItem")}
            background={filterPanelBg}
            borderRadius="base"
            // Remove border color from global style
            borderColor="transparent"
            p={6}
          >
            {({ isExpanded }) => (
              <>
                <Heading
                  as="h3"
                  color="primary.base"
                  borderBottom={isExpanded ? "1px" : "none"}
                  borderColor="currentColor"
                  fontSize="2xl"
                  fontWeight={600}
                  lineHeight={1.4}
                  m={0}
                  pb={isExpanded ? 3 : 0}
                  px={4}
                >
                  <AccordionButton
                    color="inherit"
                    fontWeight="inherit"
                    fontSize="inherit"
                    p={0}
                    textAlign="initial"
                  >
                    <Box as="span" flex={1}>
                      {filterOption.title}
                    </Box>
                    <AccordionIcon color="primary.base" boxSize={9} />
                  </AccordionButton>
                </Heading>
                <AccordionPanel as={List} p={0} m={0}>
                  {filterOption.items.map((item, itemIdx) => {
                    const LabelIcon = item.icon
                    return (
                      <Box
                        borderBottom="1px"
                        borderColor="lightBorder"
                        pt="1.16rem"
                        px={3}
                        pb={3}
                        _last={{ border: "none" }}
                      >
                        <SimpleGrid
                          key={uniqueId("walletFilterSidebarItemPanel")}
                          templateColumns="28px auto 34px"
                          alignItems="center"
                          columnGap={2.5}
                          cursor="pointer"
                          onClick={
                            item.filterKey
                              ? () => {
                                  trackCustomEvent({
                                    eventCategory: "WalletFilterSidebar",
                                    eventAction: `${filterOption.title}`,
                                    eventName: `${item.filterKey} ${!restProps
                                      .filters[item.filterKey!]}`,
                                  })
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
                                    } ${!item.showOptions}`,
                                  })
                                }
                          }
                        >
                          <GridItem>
                            <LabelIcon
                              boxSize={7}
                              mt={0.5}
                              color="text"
                              aria-hidden
                            />
                          </GridItem>
                          <GridItem as="span" lineHeight="1.1rem">
                            {item.title}
                          </GridItem>
                          <GridItem>
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
                          </GridItem>
                          <GridItem
                            as="span"
                            color="text200"
                            fontSize="0.9rem"
                            lineHeight="1.1rem"
                            colStart={2}
                          >
                            {item.description}
                          </GridItem>
                        </SimpleGrid>
                        {item.options.length > 0 && item.showOptions && (
                          <HStack mt={3.5} spacing={2}>
                            {item.options.map((option) => {
                              const handleClick = () => {
                                let closeShowOptions = true

                                for (let filterOption of item.options) {
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
                                  aria-label={option.name}
                                  isChecked={
                                    restProps.filters[option.filterKey!]
                                  }
                                  size="md"
                                  width="full"
                                  onChange={handleClick}
                                >
                                  <Text as="p" aria-hidden="true" m={0}>
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
      })}
    </Accordion>
  )
}

export default WalletFilterSidebar
