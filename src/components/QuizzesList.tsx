// remove green tick if test not passed
// refactor components
// remove unused imports
// reorder imports

import React from "react"
import {
  Box,
  BoxProps,
  Flex,
  ListItem,
  OrderedList,
  Stack,
  Text,
} from "@chakra-ui/react"
import Button from "./Button"
import { GreenTickIcon } from "./icons/quiz/"

export type QuizzesListItem = {
  title: string
  id: string
  numberOfQuizzes: number
  level: string
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

export interface IProps extends BoxProps {
  content: Array<QuizzesListItem>
  numberOfQuizzes: number
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizItem = (props: QuizzesListItem) => {
  const { title, id, numberOfQuizzes, level, quizHandler, modalHandler } = props

  return (
    <Flex
      justifyContent="space-between"
      alignItems={{ base: "flex-start", md: "center" }}
      direction={{ base: "column", md: "row" }}
      px={{ base: 0, md: 4 }}
      py={4}
      color="text"
      borderBottom="1px solid"
      borderColor="gray.300"
      _first={{ borderTopRadius: "sm" }}
      _last={{ borderBottomRadius: "sm" }}
    >
      <Stack ml={4} mb={{ base: 5, md: 0 }}>
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
            {numberOfQuizzes} QUESTIONS
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
      <Box w={{ base: "full", md: "auto" }}>
        <Button
          variant="outline-color"
          w={{ base: "full", md: "auto" }}
          onClick={() => {
            quizHandler(id)
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
  numberOfQuizzes,
  quizHandler,
  modalHandler,
}) => (
  <OrderedList m={0}>
    {content.map((listItem) => {
      const { id, title, level } = listItem

      return (
        <QuizItem
          key={id}
          id={id}
          title={title}
          numberOfQuizzes={numberOfQuizzes}
          level={level}
          quizHandler={quizHandler}
          modalHandler={modalHandler}
        />
      )
    })}
  </OrderedList>
)

export default QuizzesList
