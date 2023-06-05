import React, { useContext } from "react"
import { Box, Flex, ListItem, Stack, Text } from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Button from "../Button"
import Translation from "../Translation"
import Tag from "../Tag"
import { GreenTickIcon } from "../icons/quiz"

import { QuizzesHubContext } from "./context"

import { trackCustomEvent } from "../../utils/matomo"

import { QuizzesListItem } from "../../types"

import allQuizzesData from "../../data/quizzes"

const QuizItem: React.FC<QuizzesListItem> = (props) => {
  const { id, level, quizHandler, modalHandler } = props
  const {
    userStats: { completed },
  } = useContext(QuizzesHubContext)
  const numberOfQuestions = allQuizzesData[id].questions.length
  const isCompleted = JSON.parse(completed)[id][0]

  const { t } = useTranslation()

  const handleStart = () => {
    quizHandler(id)
    modalHandler(true)

    trackCustomEvent({
      eventCategory: "quiz_hub_events",
      eventAction: "quizzes click",
      eventName: `${id}`,
    })
  }

  return (
    <ListItem
      color={isCompleted ? "bodyMedium" : "text"}
      fontWeight="bold"
      px={{ base: 0, lg: 4 }}
      py={4}
      borderBottom="1px solid"
      borderColor="disabled"
      mb={0}
      sx={{ counterIncrement: "list-counter" }}
    >
      <Flex
        justifyContent="space-between"
        alignItems={{ base: "flex-start", lg: "center" }}
        direction={{ base: "column", lg: "row" }}
      >
        <Stack mb={{ base: 5, lg: 0 }}>
          <Flex gap={2} alignItems="center">
            <Text
              color={isCompleted ? "bodyMedium" : "text"}
              fontWeight="bold"
              mb={0}
              _before={{
                content: 'counter(list-counter) ". "',
              }}
            >
              <Translation id={allQuizzesData[id].title} />
            </Text>

            {/* Show green tick if quizz was completed only */}
            <Box display={isCompleted ? "flex" : "none"}>
              <GreenTickIcon />
            </Box>
          </Flex>

          {/* Labels */}
          <Flex gap={3}>
            {/* number of questions - label */}
            <Tag
              label={t(`${numberOfQuestions} ${t("questions")}`)}
              ml={{ lg: -2 }}
            />

            {/* difficulty - label */}
            <Tag label={level.toUpperCase()} />
          </Flex>
        </Stack>

        {/* Start Button */}
        <Box w={{ base: "full", lg: "auto" }}>
          <Button
            variant="outline-color"
            w={{ base: "full", lg: "auto" }}
            onClick={handleStart}
          >
            <Translation id="start" />
          </Button>
        </Box>
      </Flex>
    </ListItem>
  )
}

export default QuizItem
