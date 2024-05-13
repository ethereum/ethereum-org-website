import React, { useCallback, useEffect } from "react"
import { useMemo } from "react"
import { LiaHandPointerSolid } from "react-icons/lia"
import { Box, Button, Grid, Icon } from "@chakra-ui/react"

import { DELAY_MULTIPLIER_MS, WORDS_REQUIRED } from "./constants"

interface WordIndex {
  word: string
  index: number
}
type WordsWithIndex = Array<WordIndex>

type WordSelectorButtonsProps = {
  words: Array<string>
  wordsSelected: number
  setWordsSelected: (value: React.SetStateAction<number>) => void
}

export const WordSelectorButtons = ({
  words,
  wordsSelected,
  setWordsSelected,
}: WordSelectorButtonsProps) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const incrementWordsSelected = useCallback(() => {
    setWordsSelected((prev) => prev + 1)
  }, [setWordsSelected])

  const autocomplete = useCallback(() => {
    const interval = setInterval(() => {
      incrementWordsSelected()
      if (wordsSelected >= words.length) {
        clearInterval(interval)
      }
    }, DELAY_MULTIPLIER_MS)
  }, [incrementWordsSelected, words.length, wordsSelected])

  useEffect(() => {
    if (wordsSelected === WORDS_REQUIRED) {
      autocomplete()
    }
  }, [autocomplete, wordsSelected])

  return (
    <Box
      p={4}
      position="absolute"
      bottom={0}
      w="full"
      bg="background.highlight"
    >
      <Grid
        templateColumns="repeat(4, 1fr)"
        gap={2}
        whiteSpace="nowrap"
        h={{ base: 90, md: 152 }}
        overflow="hidden"
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
            position="relative"
            data-group
          >
            <>
              {word}
              {index === wordsSelected && (
                <Icon
                  as={LiaHandPointerSolid}
                  position="absolute"
                  top="65%"
                  insetInlineStart="65%"
                  fill="body.base"
                  zIndex="popover"
                  transition="opacity 0.2s"
                  _groupHover={{ opacity: 0, transition: "opacity 0.2s" }}
                />
              )}
            </>
          </Button>
        ))}
      </Grid>
    </Box>
  )
}
