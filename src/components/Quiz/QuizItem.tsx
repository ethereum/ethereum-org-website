import React, { useContext } from "react"
import { Box, Flex, ListItem, Stack, Text } from "@chakra-ui/react"

import Button from "../Button"
import Translation from "../Translation"
import { GreenTickIcon } from "../icons/quiz"

import { QuizzesHubContext } from "./context"

import { QuizzesListItem } from "../../types"

import allQuizzesData from "../../data/quizzes"

const QuizItem: React.FC<QuizzesListItem> = (props) => {
  const { title, id, level, next, quizHandler, nextHandler, modalHandler } =
    props
  const { completed } = useContext(QuizzesHubContext)
  const numberOfQuestions = allQuizzesData[id].questions.length

  const isCompleted = JSON.parse(completed)[id]

  return (
    <Flex
      justifyContent="space-between"
      alignItems={{ base: "flex-start", lg: "center" }}
      direction={{ base: "column", lg: "row" }}
      px={{ base: 0, lg: 4 }}
      py={4}
      color="text"
      borderBottom="1px solid"
      borderColor="disabled"
      _first={{ borderTopRadius: "sm" }}
      _last={{ borderBottomRadius: "sm" }}
    >
      <Stack ml={4} mb={{ base: 5, lg: 0 }}>
        <Flex gap={2} alignItems="center">
          <ListItem
            color={isCompleted ? "bodyMedium" : "text"}
            fontWeight="bold"
            mb={0}
          >
            <Text color={isCompleted ? "bodyMedium" : "text"} fontWeight="bold">
              {title}
            </Text>
          </ListItem>

          {/* Show green tick if quizz was completed only */}
          <Box display={isCompleted ? "flex" : "none"}>
            <GreenTickIcon />
          </Box>
        </Flex>

        {/* Labels */}
        <Flex gap={3}>
          {/* number of questions - label */}
          <Text
            fontWeight="light"
            fontSize="xs"
            bg="ednBackground"
            borderRadius="full"
            border="none"
            casing="uppercase"
            px={2}
            py={1}
            ml={-6}
            mb={0}
          >
            {numberOfQuestions} {<Translation id="questions" />}
          </Text>

          {/* difficulty - label */}
          <Text
            fontWeight="light"
            fontSize="xs"
            bg="ednBackground"
            borderRadius="full"
            border="none"
            px={2}
            py={1}
            mb={0}
          >
            {level.toUpperCase()}
          </Text>
        </Flex>
      </Stack>

      {/* Start Button */}
      <Box w={{ base: "full", lg: "auto" }}>
        <Button
          variant="outline-color"
          w={{ base: "full", lg: "auto" }}
          onClick={() => {
            quizHandler(id)
            nextHandler(next)
            modalHandler(true)
          }}
        >
          <Translation id="start" />
        </Button>
      </Box>
    </Flex>
  )
}

export default QuizItem
