// Libraries
import React, { useMemo } from "react"
import { Box, Flex, Text } from "@chakra-ui/react"
import { useIntl } from "react-intl"

export interface IProps {
  correctCount: number
  questionCount: number
}

const QuizSummary: React.FC<IProps> = ({ correctCount, questionCount }) => {
  const { locale } = useIntl()
  const percentCorrect = useMemo<number>(
    () => correctCount / questionCount,
    [correctCount, questionCount]
  )
  const options = {
    style: "percent",
    maximumFractionDigits: 0,
  }
  const numberToPercent = (num: number): string =>
    new Intl.NumberFormat(locale, options).format(num)

  return (
    <Box w="full" mb={10}>
      <Text fontWeight={"700"} fontSize="2xl" textAlign="center">
        {percentCorrect >= 65 ? "You passed the quiz!" : "Your results"}
      </Text>
      <Flex
        p={4}
        justify="center"
        boxShadow="dropShadow"
        bg="background"
        mx="auto"
        w="fit-content"
      >
        <Flex
          direction="column"
          p={4}
          alignItems="center"
          borderRight="1px"
          borderColor="disabled"
        >
          <Text fontWeight="700" fontSize="2xl" mb={2}>
            {numberToPercent(percentCorrect)}
          </Text>
          <Text fontSize="s" m={0} color="disabled">
            Score
          </Text>
        </Flex>
        <Flex
          direction="column"
          p={4}
          alignItems="center"
          borderRight="1px"
          borderColor="disabled"
        >
          <Text fontWeight="700" fontSize="2xl" mb={2}>
            +{correctCount}
          </Text>
          <Text fontSize="s" m={0} color="disabled">
            Correct
          </Text>
        </Flex>
        <Flex direction="column" p={4} alignItems="center">
          <Text fontWeight="700" fontSize="2xl" mb={2}>
            {questionCount}
          </Text>
          <Text fontSize="s" m={0} color="disabled">
            Total
          </Text>
        </Flex>
      </Flex>
    </Box>
  )
}

export default QuizSummary
