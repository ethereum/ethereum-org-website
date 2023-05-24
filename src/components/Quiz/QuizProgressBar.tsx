import React from "react"
import { Box, Container } from "@chakra-ui/react"

import { Question } from "../../types"

export interface IProps {
  progressBarBackground: (index: number) => string
  questions: Question[]
}

const QuizProgressBar: React.FC<IProps> = ({
  progressBarBackground,
  questions,
}) => {
  const PROGRESS_BAR_GAP = "4px"

  return (
    <Box gap={PROGRESS_BAR_GAP}>
      {questions.map(({ id }, index) => {
        /* Calculate width percent based on number of questions */
        const width = `calc(${Math.floor(
          100 / questions.length
        )}% - ${PROGRESS_BAR_GAP})`
        return (
          <Container
            key={id}
            bg={progressBarBackground(index)}
            h="4px"
            w={width}
            maxW={`min(${width}, 2rem)`}
            marginInline={0}
            p={0}
          />
        )
      })}
    </Box>
  )
}

export default QuizProgressBar
