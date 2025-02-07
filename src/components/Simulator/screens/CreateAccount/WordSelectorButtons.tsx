import React, { useCallback, useEffect } from "react"
import { useMemo } from "react"
import isChromatic from "chromatic"
import { LiaHandPointerSolid } from "react-icons/lia"

import { Button } from "@/components/ui/buttons/Button"

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
    const restRandom = !isChromatic()
      ? rest.sort(() => Math.random() - 0.5)
      : rest
    const pseudoRandom: WordsWithIndex = answers.reduce((acc, item) => {
      const ANSWER_POSITION_MAX = WORDS_REQUIRED + 4
      const randIndex = (Math.random() * 1e3) % ANSWER_POSITION_MAX
      return !isChromatic()
        ? [...acc.slice(0, randIndex), item, ...acc.slice(randIndex)]
        : [...acc, item]
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
    <div
      className="absolute bottom-0 w-full bg-background-highlight p-4"
      data-testid="word-selector-buttons"
    >
      <div className="grid h-[90px] w-full grid-cols-4 gap-2 overflow-hidden whitespace-nowrap md:h-[152px]">
        {pseudoRandomizedWords.map(({ word, index }) => (
          <Button
            key={word + index}
            variant="solid"
            onClick={incrementWordsSelected}
            disabled={index !== wordsSelected}
            className="group relative rounded-xl bg-primary-hover px-1 text-background disabled:bg-body-light disabled:text-body"
          >
            <>
              {word}
              {index === wordsSelected && (
                <LiaHandPointerSolid className="absolute start-[65%] top-[65%] z-popover fill-body transition-opacity duration-200 group-hover:opacity-0 group-hover:transition-opacity group-hover:duration-200" />
              )}
            </>
          </Button>
        ))}
      </div>
    </div>
  )
}
