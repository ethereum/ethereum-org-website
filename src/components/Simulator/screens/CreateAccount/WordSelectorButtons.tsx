import { Button, Grid } from "@chakra-ui/react"
import React from "react"
import { useMemo } from "react"

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
  const wordIndices: Array<{ word: string; index: number }> = words.map(
    (word, index) => ({ word, index })
  )
  const randomizedWords = useMemo(
    () => wordIndices.sort(() => Math.random() - 0.5),
    [words]
  )
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
      {randomizedWords.map(({ word, index }) => (
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
