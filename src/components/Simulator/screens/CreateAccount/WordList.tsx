import {
  Grid,
  type GridProps,
  type ListProps,
  OrderedList,
} from "@chakra-ui/react"
import React from "react"
import { WordDisplay, type WordStyleVariant } from "./index"
import { WORDS_REQUIRED } from "./constants"
interface WordListProps {
  words: Array<string>
  wordsSelected?: number
}

// ?: Consider not generating
// ?: Keep in mind translations... English only? BIP39 Langs only?
export const WordList: React.FC<WordListProps> = ({ words, wordsSelected }) => {
  const sharedStyles = {
    display: "flex",
    flexDirection: "column",
    columnGap: 8,
    rowGap: 3,
    pb: 5,
    m: 0,
  } as const
  const styleVariants = {
    initial: {
      rowGap: 0,
    },
  } as const

  const variantStyles: GridProps =
    styleVariants[typeof wordsSelected === "undefined" ? "initial" : ""] ?? {}
  const styles = { ...sharedStyles, ...variantStyles } as ListProps
  const splitIndex = Math.floor(words.length / 2)

  const wordMapping = (word: string, index: number): React.ReactElement => {
    const initialWordDisplay = typeof wordsSelected === "undefined"
    const variant: WordStyleVariant = initialWordDisplay
      ? "initial"
      : wordsSelected >= WORDS_REQUIRED
      ? "complete"
      : index === wordsSelected
      ? "active"
      : index < wordsSelected
      ? "complete"
      : index < 2
      ? "incomplete"
      : "disabled"
    const showLabel = initialWordDisplay || variant === "complete"
    return (
      <WordDisplay
        key={word + index}
        variant={variant}
        transition={`
          color 1s ease-in-out,
          background-color 1s ease-in-out,
          border-color 1s ease-in-out
        `}
        transitionDelay={`${index * 100}ms`}
      >
        {showLabel && word}
      </WordDisplay>
    )
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      columnGap={7}
      whiteSpace="nowrap"
      px={{ base: 4, md: 8 }}
      bg="background.base"
    >
      <OrderedList {...styles} start={1}>
        {words.map(wordMapping).slice(0, splitIndex)}
      </OrderedList>
      <OrderedList {...styles} start={splitIndex + 1}>
        {words.map(wordMapping).slice(splitIndex)}
      </OrderedList>
    </Grid>
  )
}
