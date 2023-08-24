import React, { useState } from "react"
import { SimulatorStateProps } from "../../../../interfaces"
import { WordList, WordSelectorButtons } from "./index"
import { WORDS_REQUIRED } from "./constants"
import { ProgressCta } from "../.."
import { Box, Text } from "@chakra-ui/react"

interface IProps extends SimulatorStateProps {
  words: Array<string>
}

export const InteractiveWordSelector: React.FC<IProps> = ({ state, words }) => {
  const [wordsSelected, setWordsSelected] = useState<number>(0)
  return (
    <Box mt={8}>
      <Text
        display={{ base: "none", md: "block" }}
        fontSize="2xl"
        lineHeight={8}
        fontWeight="bold"
        px={{ base: 4, md: 8 }}
      >
        Repeat the words
      </Text>
      <WordList words={words} wordsSelected={wordsSelected} />
      {wordsSelected < WORDS_REQUIRED ? (
        <WordSelectorButtons
          words={words}
          wordsSelected={wordsSelected}
          setWordsSelected={setWordsSelected}
        />
      ) : (
        <ProgressCta state={state} />
      )}
    </Box>
  )
}
