import React from "react"
import { motion } from "framer-motion"
import {
  Grid,
  type GridProps,
  type ListProps,
  OrderedList,
} from "@chakra-ui/react"

import {
  DELAY_MULTIPLIER_MS,
  EXTRA_DELAY_MS,
  WORDS_REQUIRED,
} from "./constants"
import { WordDisplay, type WordStyleVariant } from "./WordDisplay"

type WordListProps = {
  words: Array<string>
  wordsSelected?: number
}

// ?: Consider not generating
// ?: Keep in mind translations... English only? BIP39 Langs only?
export const WordList = ({ words, wordsSelected }: WordListProps) => {
  const sharedStyles = {
    display: "flex",
    flexDirection: "column",
    columnGap: 8,
    rowGap: 3,
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
      : index === wordsSelected
        ? "active"
        : index < wordsSelected
          ? "complete"
          : index < 2
            ? "incomplete"
            : "disabled"
    const showLabel = initialWordDisplay || variant === "complete"

    const getDelayFromIndex = (index: number, isInitial?: boolean): number => {
      if (isInitial) return index * DELAY_MULTIPLIER_MS
      if (index < WORDS_REQUIRED) return 0
      return index * DELAY_MULTIPLIER_MS + EXTRA_DELAY_MS
    }
    const numToMsString = (x: number): string => `${x}ms`
    return (
      <WordDisplay
        key={word + index}
        variant={variant}
        transition={`
          color 1s ease-in-out,
          background-color 1s ease-in-out,
          border-color 1s ease-in-out
        `}
        transitionDelay={numToMsString(getDelayFromIndex(index))}
        position="relative"
      >
        {showLabel && (
          <>
            <motion.span
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: initialWordDisplay ? getDelayFromIndex(index, true) : 0,
              }}
            >
              {word}
            </motion.span>
            {initialWordDisplay && (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                  delay: getDelayFromIndex(index, true) * 1e-3,
                }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backdropFilter: "blur(2px)",
                }}
              />
            )}
          </>
        )}
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
