import React, { useState } from "react"
import { PhoneScreenProps } from "../../interfaces"
import { WordList, WordSelectorButtons } from "./index"
import { ProgressCta } from "../.."
import { Box, Text } from "@chakra-ui/react"

interface IProps extends PhoneScreenProps {
  words: Array<string>
}

export const InteractiveWordSelector: React.FC<IProps> = ({
  words,
  ctaLabel,
  state,
}) => {
  const { progressStepper } = state
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
      {wordsSelected < words.length ? (
        <WordSelectorButtons
          words={words}
          wordsSelected={wordsSelected}
          setWordsSelected={setWordsSelected}
        />
      ) : (
        <ProgressCta progressStepper={progressStepper}>{ctaLabel}</ProgressCta>
      )}
    </Box>
  )
}
