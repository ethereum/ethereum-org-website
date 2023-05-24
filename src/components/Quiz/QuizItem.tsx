import React, { useState } from "react"
import { Box, Flex, ListItem, Stack, Text } from "@chakra-ui/react"

import Button from "../Button"
import Translation from "../Translation"

import { GreenTickIcon } from "../icons/quiz"

import { CompletedQuizzes, QuizzesListItem } from "../../types"
// Raw quizzes data
import allQuizzesData from "../../data/quizzes"

const QuizItem = (props: QuizzesListItem) => {
  const { title, id, level, next, quizHandler, nextHandler, modalHandler } =
    props
  const numberOfQuestions = allQuizzesData[id].questions.length

  // Create an object that contains quiz id as key and a boolean flag to indicate if its completed
  // Initialize all quizzes as not completed
  const INITIAL_COMPLETED_QUIZZES: CompletedQuizzes = Object.keys(
    allQuizzesData
  ).reduce((object, key) => ({ ...object, [key]: false }), {})

  const [completedQuizzes, setCompletedQuizzes] = useState(
    INITIAL_COMPLETED_QUIZZES
  )

  const isCompleted = completedQuizzes[id]

  return (
    <Flex
      justifyContent="space-between"
      alignItems={{ base: "flex-start", lg: "center" }}
      direction={{ base: "column", lg: "row" }}
      px={{ base: 0, lg: 4 }}
      py={4}
      color="text"
      borderBottom="1px solid"
      borderColor="gray.300"
      _first={{ borderTopRadius: "sm" }}
      _last={{ borderBottomRadius: "sm" }}
    >
      <Stack ml={4} mb={{ base: 5, lg: 0 }}>
        <Flex gap={2} alignItems="center">
          <ListItem fontWeight="bold" mb={0}>
            <Text color={isCompleted ? "gray.500" : "text"} fontWeight="bold">
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
