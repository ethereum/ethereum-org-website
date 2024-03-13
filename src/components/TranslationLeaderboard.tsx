import React, { useState } from "react"
import { reverse, sortBy } from "lodash"
import { useTranslation } from "next-i18next"
import {
  Box,
  Button as ChakraButton,
  Flex,
  Img,
  useColorModeValue,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react"

import Emoji from "./Emoji"
import Text from "./OldText"

export type TranslationLeaderboardProps = {
  monthData: any
  quarterData: any
  allTimeData: any
}

const Button = (props) => {
  return (
    <ChakraButton
      display="flex"
      borderRadius="2rem"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="text"
      color="text"
      alignItems="center"
      py={4}
      px={6}
      m={2}
      h="full"
      cursor="pointer"
      bg="transparent"
      w={{ base: "full", lg: "initial" }}
      justifyContent="center"
      mx={{ base: "0", lg: "2" }}
      _hover={{
        color: "primary.base",
        borderColor: "primary.base",
      }}
      _focus={{}}
      _active={{}}
      {...props}
    />
  )
}

const RadioCard = (props) => {
  const shadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Button
      as="label"
      {...checkbox}
      _checked={{
        borderColor: "primary.base",
        color: "primary.base",
        boxShadow: shadow,
      }}
    >
      <input {...input} />
      <Text
        as="span"
        fontSize={{ base: "md", md: "lg" }}
        lineHeight="100%"
        textAlign="center"
        fontWeight={{ base: "semibold", md: "normal" }}
      >
        {props.children}
      </Text>
    </Button>
  )
}

const filterLeaderboardUsers = (item) => {
  const username = item.user.username.toLowerCase()
  const fullName = item.user.fullName?.toLowerCase() || ""

  const excludedUsernames = new Set([
    "ethdotorg",
    "finnish_sandberg",
    "norwegian_sandberg",
    "swedish_sandberg",
  ])

  return (
    !excludedUsernames.has(username) &&
    !username.includes("lqs_") &&
    !username.includes("removed_user") &&
    !username.includes("aco_") &&
    !fullName.includes("aco_") &&
    !username.includes("aco-") &&
    !fullName.includes("aco-") &&
    !username.includes("acc_") &&
    !fullName.includes("acc_")
  )
}

const sortAndFilterData = (data) => {
  return reverse(sortBy(data, ({ user }) => user.totalCosts)).filter(
    filterLeaderboardUsers
  )
}

const TranslationLeaderboard = ({
  monthData,
  quarterData,
  allTimeData,
}: TranslationLeaderboardProps) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const tableItemBoxShadow = useColorModeValue(
    "tableItemBox.light",
    "tableItemBox.dark"
  )

  const leaderboardData = {
    monthData: sortAndFilterData(monthData.data),
    quarterData: sortAndFilterData(quarterData.data),
    allTimeData: sortAndFilterData(allTimeData.data),
  }

  const [filterAmount, updateFilterAmount] = useState(10)
  const [dateRangeType, updateDateRangeType] = useState("monthData")

  const showLess = () => {
    updateFilterAmount(10)
  }

  const showMore = () => {
    updateFilterAmount(50)
  }

  const { getRadioProps } = useRadioGroup({
    name: "period selection",
    defaultValue: "monthData",
    onChange: updateDateRangeType,
  })

  const { t } = useTranslation(
    "page-contributing-translation-program-acknowledgements"
  )

  return (
    <Box>
      <Flex
        justifyContent="center"
        py={0}
        px={8}
        mb={8}
        flexDirection={{ base: "column", lg: "inherit" }}
        w="full"
      >
        <RadioCard key="monthData" {...getRadioProps({ value: "monthData" })}>
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view"
          )}
        </RadioCard>
        <RadioCard
          key="quarterData"
          {...getRadioProps({ value: "quarterData" })}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view"
          )}
        </RadioCard>
        <RadioCard
          key="allTimeData"
          {...getRadioProps({ value: "allTimeData" })}
        >
          {t(
            "page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view"
          )}
        </RadioCard>
      </Flex>
      <Box bg="background.base" boxShadow={tableBoxShadow} w="full" mb={8}>
        <Flex
          bg="grayBackground"
          textDecoration="none"
          justifyContent="space-between"
          alignItems="center"
          color="text"
          mb="1px"
          p={4}
          w="full"
        >
          <Flex>
            <Box w={10} opacity="0.4">
              #
            </Box>
            <Flex
              flexDirection="row"
              alignItems="center"
              me={8}
              overflowWrap="anywhere"
            >
              {t(
                "page-contributing-translation-program-acknowledgements-translator"
              )}
            </Flex>
          </Flex>
          <Flex minW="20%" flexDirection="row" alignItems="start">
            {t(
              "page-contributing-translation-program-acknowledgements-total-words"
            )}
          </Flex>
        </Flex>
        {leaderboardData[dateRangeType]
          .slice(0, filterAmount)
          .map((item, idx) => {
            const { user, languages } = item
            const sortedLanguages = reverse(
              sortBy(languages, ({ language }) => language.totalCosts)
            )

            let emoji: string | null = null
            if (idx === 0) {
              emoji = ":trophy:"
            } else if (idx === 1) {
              emoji = ":2nd_place_medal:"
            } else if (idx === 2) {
              emoji = ":3rd_place_medal:"
            }
            return (
              <Flex
                textDecoration="none"
                justifyContent="space-between"
                alignItems="center"
                color="text"
                boxShadow={tableItemBoxShadow}
                mb="1px"
                py={2}
                px={4}
                w="full"
                _hover={{
                  borderRadius: "base",
                  boxShadow: "tableItemBoxHover",
                  bg: "tableBackgroundHover",
                }}
                key={idx}
              >
                <Flex>
                  {emoji ? (
                    <Box w={10}>
                      <Emoji me={4} fontSize="2rem" text={emoji} />
                    </Box>
                  ) : (
                    <Box w={10} opacity="0.4">
                      {idx + 1}
                    </Box>
                  )}
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    me={8}
                    overflowWrap="anywhere"
                  >
                    <Img
                      me={4}
                      h={{ base: "30px", sm: 10 }}
                      w={{ base: "30px", sm: 10 }}
                      borderRadius="50%"
                      display={{ base: "none", s: "block" }}
                      src={user.avatarUrl}
                    />
                    <Box maxW={{ base: "100px", sm: "none" }}>
                      {user.username}
                      <Text m={0} display="block" fontSize="sm" opacity="0.6">
                        {sortedLanguages[0].language.name}
                      </Text>
                    </Box>
                  </Flex>
                </Flex>
                <Flex minW="20%" flexDirection="row" alignItems="start">
                  <Emoji
                    display={{ base: "none", sm: "block" }}
                    me={2}
                    fontSize="2xl"
                    text={":writing:"}
                  />
                  {user.totalCosts}
                </Flex>
              </Flex>
            )
          })}
      </Box>
      <Flex
        justifyContent="center"
        py={0}
        px={8}
        mb={8}
        flexDirection={{ base: "column", lg: "inherit" }}
        w="full"
      >
        <Button onClick={filterAmount === 10 ? showMore : showLess}>
          <Text
            as="span"
            fontSize={{ base: "md", md: "lg" }}
            lineHeight="100%"
            textAlign="center"
            fontWeight={{ base: "semibold", md: "normal" }}
          >
            {t(
              filterAmount === 10
                ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
            )}
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}

export default TranslationLeaderboard
