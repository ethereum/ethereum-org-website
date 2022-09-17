// Libraries
import React from "react"
import { Box, Text, useColorMode } from "@chakra-ui/react"

// Types
export interface IProps {
  questionData: any
}

const QuizQuestion: React.FC<IProps> = ({ questionData }) => {
  const { colorMode } = useColorMode()
  const { answers, question } = questionData
  return (
    <Box>
      <Text fontWeight={"700"} fontSize={"2xl"}>
        {question}
      </Text>
      {Object.keys(answers).map((key) => {
        return (
          <Box
            display={"flex"}
            background={colorMode === "dark" ? "gray.700" : "gray.100"}
            marginBottom={"16px"}
            padding={"10px"}
          >
            <Box marginRight={"5px"}>
              <Text m="0">{key}</Text>
            </Box>
            <Box marginLeft={"5px"}>
              <Text m="0">{answers[key].label}</Text>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default QuizQuestion
