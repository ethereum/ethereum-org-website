import { Button, Grid } from "@chakra-ui/react"
import React from "react"
import { useMemo } from "react"
import { WORDS_REQUIRED } from "./constants"

interface WordIndex {
  word: string
  index: number
}
type WordsWithIndex = Array<WordIndex>

interface IProps {
  words: Array<string>
  wordsSelected: number
  setWordsSelected: (value: React.SetStateAction<number>) => void
}

export const WordSelectorButtons: React.FC<IProps> = ({
  words,
  wordsSelected,
  setWordsSelected,
}) => {
  const wordIndices: WordsWithIndex = words.map((word, index) => ({
    word,
    index,
  }))
  const pseudoRandomizedWords = useMemo<WordsWithIndex>(() => {
    const answers = wordIndices.slice(0, WORDS_REQUIRED)
    const rest = wordIndices.slice(WORDS_REQUIRED)
    const restRandom = rest.sort(() => Math.random() - 0.5)
    const pseudoRandom: WordsWithIndex = answers.reduce((acc, item) => {
      const ANSWER_POSITION_MAX = WORDS_REQUIRED + 4
      const randIndex = (Math.random() * 1e3) % ANSWER_POSITION_MAX
      return [...acc.slice(0, randIndex), item, ...acc.slice(randIndex)]
    }, restRandom)
    return pseudoRandom
  }, [words])
  const incrementWordsSelected = () => {
    setWordsSelected((prev) => prev + 1)
  }
  return (
    <Grid
      templateColumns="repeat(4, 1fr)"
      gap={2}
      whiteSpace="nowrap"
      p={4}
      pb={{ base: 6, md: 4 }}
      bg="background.highlight"
      h={{ base: 120, md: 187 }}
      overflow="hidden"
      position="absolute"
      bottom={0}
      w="full"
    >
      {pseudoRandomizedWords.map(({ word, index }) => (
        <Button
          key={word + index}
          variant="solid"
          onClick={incrementWordsSelected}
          bg="primary.hover"
          color="background.base"
          px={1}
          borderRadius="xl"
          isDisabled={index !== wordsSelected}
          _disabled={{
            bg: "body.light",
            color: "body.base",
            pointerEvents: "none",
          }}
        >
          {word}
        </Button>
      ))}
    </Grid>
  )
}
