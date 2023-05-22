// remove green tick if test not passed
// refactor components
// remove unused imports
// reorder imports

import React, { useContext } from "react"
import {
  Box,
  BoxProps,
  Flex,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react"
import Button from "../Button"
import { GreenTickIcon } from "../icons/quiz"

// Raw quizzes data
import allQuizzesData from "../../data/quizzes"

export type QuizzesListItem = {
  title: string
  id: string
  level: string
  next?: string
  quizHandler: (id: string) => void
  nextHandler: (next?: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

export interface IProps extends BoxProps {
  content: Array<QuizzesListItem>
  quizHandler: (id: string) => void
  nextHandler: (next?: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizItem = (props: QuizzesListItem) => {
  const { title, id, level, next, quizHandler, nextHandler, modalHandler } =
    props
  const numberOfQuestions = allQuizzesData[id].questions.length

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
            <Text fontWeight="bold">{title}</Text>
          </ListItem>

          {/* TODO: hide green tick if not passed */}
          <GreenTickIcon />
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
            px={2}
            py={1}
            ml={-6}
            mb={0}
          >
            {/* TODO: add to translations */}
            {numberOfQuestions} QUESTIONS
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
            {/* TODO: add to translations */}
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
          {/* TODO: move to translations */}
          Start
        </Button>
      </Box>
    </Flex>
  )
}

const QuizzesList: React.FC<IProps> = ({
  content,
  quizHandler,
  nextHandler,
  modalHandler,
}) => (
  <OrderedList m={0}>
    {content.map((listItem) => {
      const { id, title, level, next } = listItem

      return (
        <QuizItem
          key={id}
          id={id}
          title={title}
          level={level}
          next={next}
          quizHandler={quizHandler}
          nextHandler={nextHandler}
          modalHandler={modalHandler}
        />
      )
    })}
  </OrderedList>
)

export default QuizzesList
