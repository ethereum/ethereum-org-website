import { useTranslation } from "next-i18next"
import { Box, Flex, ListItem, Stack, Text } from "@chakra-ui/react"

import type { QuizzesSection } from "@/lib/types"

import { Button } from "../Buttons"
import { GreenTickIcon } from "../icons/quiz"
import Tag from "../Tag"
import Translation from "../Translation"

export type QuizzesListItemProps = Omit<QuizzesSection, "id"> & {
  isCompleted: boolean
  numberOfQuestions: number
  titleId: string
  handleStart: () => void
}

const QuizItem = ({
  level,
  isCompleted = false,
  titleId,
  numberOfQuestions,
  handleStart,
}: QuizzesListItemProps) => {
  const { t } = useTranslation("learn-quizzes")

  return (
    <ListItem
      color={isCompleted ? "body.medium" : "text"}
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
              color={isCompleted ? "body.medium" : "text"}
              _before={{
                content: 'counter(list-counter) ". "',
              }}
            >
              <Translation id={titleId} />
            </Text>

            {/* Show green tick if quizz was completed only */}
            {isCompleted && <GreenTickIcon />}
          </Flex>

          {/* Labels */}
          <Flex gap={3}>
            {/* number of questions - label */}
            <Tag
              label={t(`${numberOfQuestions} ${t("questions")}`)}
              ms={{ lg: -2 }}
            />

            {/* difficulty - label */}
            <Tag label={level.toUpperCase()} />
          </Flex>
        </Stack>

        {/* Start Button */}
        <Box w={{ base: "full", lg: "auto" }}>
          <Button
            variant="outline"
            w={{ base: "full", lg: "auto" }}
            onClick={handleStart}
          >
            <Translation id="learn-quizzes:start" />
          </Button>
        </Box>
      </Flex>
    </ListItem>
  )
}

export default QuizItem
