// Libraries
import React, { useState } from "react"
import { reverse, sortBy } from "lodash"
import {
  Box,
  Button as ChakraButton,
  Flex,
  Img,
  Text,
  useColorModeValue,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react"

// Components
import Emoji from "./Emoji"
import Translation from "./Translation"

export interface IProps {
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
      ml={{ base: "0", lg: "2" }}
      mr={{ base: "0", lg: "2" }}
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

const TranslationLeaderboard: React.FC<IProps> = ({
  monthData,
  quarterData,
  allTimeData,
}) => {
  const tableBoxShadow = useColorModeValue("tableBox.light", "tableBox.dark")
  const tableItemBoxShadow = useColorModeValue(
    "tableItemBox.light",
    "tableItemBox.dark"
  )
  const leaderboardData = {
    monthData: reverse(sortBy(monthData.data, ({ user }) => user.totalCosts)),
    quarterData: reverse(
      sortBy(quarterData.data, ({ user }) => user.totalCosts)
    ),
    allTimeData: reverse(
      sortBy(allTimeData.data, ({ user }) => user.totalCosts)
    ),
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
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-month-view" />
        </RadioCard>
        <RadioCard
          key="quarterData"
          {...getRadioProps({ value: "quarterData" })}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-quarter-view" />
        </RadioCard>
        <RadioCard
          key="allTimeData"
          {...getRadioProps({ value: "allTimeData" })}
        >
          <Translation id="page-contributing-translation-program-acknowledgements-translation-leaderboard-all-time-view" />
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
              mr={8}
              overflowWrap="anywhere"
            >
              <Translation id="page-contributing-translation-program-acknowledgements-translator" />
            </Flex>
          </Flex>
          <Flex minW="20%" flexDirection="row" alignItems="left">
            <Translation id="page-contributing-translation-program-acknowledgements-total-words" />
          </Flex>
        </Flex>
        {/* // TODO: Remove specific user checks once Acolad has updated their usernames */}
        {leaderboardData[dateRangeType]
          .filter(
            (item) =>
              item.user.username !== "ethdotorg" &&
              !item.user.username.includes("LQS_") &&
              !item.user.username.includes("REMOVED_USER") &&
              !item.user.username.includes("Aco_") &&
              !item.user.fullName.includes("Aco_") &&
              !item.user.username.includes("Acc_") &&
              !item.user.fullName.includes("Acc_") &&
              item.user.username !== "Finnish_Sandberg" &&
              item.user.username !== "Norwegian_Sandberg" &&
              item.user.username !== "Swedish_Sandberg"
          )
          .filter((item, idx) => idx < filterAmount)
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
                      <Emoji mr={4} fontSize="2rem" text={emoji} />
                    </Box>
                  ) : (
                    <Box w={10} opacity="0.4">
                      {idx + 1}
                    </Box>
                  )}
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    mr={8}
                    overflowWrap="anywhere"
                  >
                    <Img
                      mr={4}
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
                <Flex minW="20%" flexDirection="row" alignItems="left">
                  <Emoji
                    display={{ base: "none", sm: "block" }}
                    mr={2}
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
            <Translation
              id={
                filterAmount === 10
                  ? "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-more"
                  : "page-contributing-translation-program-acknowledgements-translation-leaderboard-show-less"
              }
            />
          </Text>
        </Button>
      </Flex>
    </Box>
  )
}

export default TranslationLeaderboard
