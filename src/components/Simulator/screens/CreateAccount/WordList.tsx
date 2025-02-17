import React from "react"
import { motion } from "framer-motion"

import { OrderedList } from "@/components/ui/list"

import { cn } from "@/lib/utils/cn"

import {
  DELAY_MULTIPLIER_MS,
  EXTRA_DELAY_MS,
  WORDS_REQUIRED,
} from "./constants"
import { WordDisplay, type WordStyleVariantProps } from "./WordDisplay"

type WordListProps = {
  words: Array<string>
  wordsSelected?: number
}

// ?: Consider not generating
// ?: Keep in mind translations... English only? BIP39 Langs only?
export const WordList = ({ words, wordsSelected }: WordListProps) => {
  const sharedClasses = "m-0 flex flex-col gap-y-3 gap-x-8"

  const classVariants = {
    initial: "gap-y-0",
  }

  const styles = cn(
    sharedClasses,
    classVariants[typeof wordsSelected === "undefined" ? "initial" : ""]
  )

  const splitIndex = Math.floor(words.length / 2)

  const wordMapping = (word: string, index: number): React.ReactElement => {
    const initialWordDisplay = typeof wordsSelected === "undefined"
    const variant: WordStyleVariantProps["variant"] = initialWordDisplay
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
        className={`[--display-delay:${numToMsString(getDelayFromIndex(index))}] delay-(--display-delay)`}
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
                className="absolute inset-0 backdrop-blur-[2px]"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{
                  duration: 0.25,
                  delay: getDelayFromIndex(index, true) * 1e-3,
                }}
              />
            )}
          </>
        )}
      </WordDisplay>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-x-7 whitespace-nowrap bg-background px-4 md:px-8">
      <OrderedList className={styles} start={1}>
        {words.map(wordMapping).slice(0, splitIndex)}
      </OrderedList>
      <OrderedList className={styles} start={splitIndex + 1}>
        {words.map(wordMapping).slice(splitIndex)}
      </OrderedList>
    </div>
  )
}
