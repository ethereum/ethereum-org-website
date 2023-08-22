import {
  Box,
  Button,
  Flex,
  Grid,
  type GridProps,
  Icon,
  ListItem,
  type ListItemProps,
  type ListProps,
  OrderedList,
  Spinner,
  Text,
} from "@chakra-ui/react"
import React, { useEffect, useMemo, useState } from "react"
import { SimulatorStateProps } from "../../../interfaces"
import { generateSeedWithoutChecksum } from "../../../utils/generateSeedWithoutChecksum"
import { HomeScreen } from "../HomeScreen"
import { EthGlyphIcon } from "../icons"
import { ProgressCta } from "../ProgressCta"
import { motion } from "framer-motion"
import { PiCheckThin } from "react-icons/pi"

const WORDS_REQUIRED = 2 as const

const MotionFlex = motion(Flex)

const FadeInFlex = (props) => (
  <MotionFlex initial={{ opacity: 0 }} animate={{ opacity: 1 }} {...props} />
)

const GeneratingKeysComponent: React.FC<SimulatorStateProps> = ({ state }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const { progressStepper } = state

  // Show spinner for 2100ms, switching "loading" state to false when complete
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 2100)
    return () => {
      clearTimeout(timeout)
    }
  }, [])

  // After loading is complete, wait another 1600ms before calling progressStepper
  useEffect(() => {
    if (loading) return
    const timeout = setTimeout(progressStepper, 1600)
    return () => {
      clearTimeout(timeout)
    }
  }, [loading])

  const ICON_SIZE = "4.5rem" as const
  return (
    <Grid placeItems="center" h="full" bg="background.highlight">
      <Flex direction="column" alignItems="center" pt={8} gap={4}>
        {loading ? (
          <Spinner w={ICON_SIZE} h={ICON_SIZE} />
        ) : (
          <Icon
            as={PiCheckThin}
            w={ICON_SIZE}
            h={ICON_SIZE}
            transform="rotate(-10deg)"
          />
        )}
        <Text textAlign="center" px={{ base: 4, md: 8 }}>
          {loading ? "Generating your recovery phrase" : "Account created"}
        </Text>
      </Flex>
    </Grid>
  )
}

const wordStyleVariants = {
  display: {
    borderBottom: "1px",
    borderColor: "body.medium",
    mt: 4,
    zIndex: 1,
  },
  complete: {
    borderRadius: "md",
    bg: "background.base",
    color: "body.base",
    border: "1px",
    borderColor: "body.base",
    px: 2,
  },
  active: {
    borderRadius: "md",
    bg: "background.base",
    color: "primary.base",
    border: "1px",
    borderColor: "primary.base",
    px: 2,
  },
  incomplete: {
    borderRadius: "md",
    bg: "background.base",
    color: "body.base",
    border: "1px",
    borderColor: "body.light",
    px: 2,
  },
  disabled: {
    borderRadius: "md",
    bg: "body.light",
    color: "body.medium",
    px: 2,
  },
} as const

type WordStyleVariant = keyof typeof wordStyleVariants

interface WordDisplayProps extends Pick<ListItemProps, "children"> {
  variant: WordStyleVariant
}

const WordDisplay: React.FC<WordDisplayProps> = ({ children, variant }) => (
  <Box {...wordStyleVariants[variant]}>
    <ListItem fontSize="sm" lineHeight={9} mb={0} listStylePos="inside">
      {children}
    </ListItem>
  </Box>
)

interface WordListProps {
  words: Array<string>
  wordsSelected?: number
}

const WordList: React.FC<WordListProps> = ({ words, wordsSelected }) => {
  const sharedStyles = {
    m: 0,
    display: "flex",
    flexDirection: "column",
    h: "calc(6 * (16px + 37px))",
    columnGap: 8,
    rowGap: 3,
  } as const
  const styleVariants = {
    display: {
      rowGap: 0,
    },
  } as const

  const variantStyles: GridProps =
    styleVariants[typeof wordsSelected === "undefined" ? "display" : ""] ?? {}
  const styles = { ...sharedStyles, ...variantStyles } as ListProps
  const splitIndex = Math.floor(words.length / 2)

  const wordMapping = (word: string, index: number): React.ReactElement => {
    const initialWordDisplay = typeof wordsSelected === "undefined"
    const variant: WordStyleVariant = initialWordDisplay
      ? "display"
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
    return <WordDisplay variant={variant}>{showLabel && word}</WordDisplay>
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

interface WordsSelectorButtonsProps {
  words: Array<string>
  wordsSelected: number
  setWordsSelected: (value: React.SetStateAction<number>) => void
}
const WordSelectorButtons: React.FC<WordsSelectorButtonsProps> = ({
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
    <Flex
      gap={2}
      whiteSpace="nowrap"
      flexWrap="wrap"
      justify="space-between"
      px={{ base: 4, md: 8 }}
      bg="background.highlight"
    >
      {randomizedWords.map(({ word, index }) => {
        const isCurrent = index === wordsSelected
        return (
          <Button
            variant="solid"
            onClick={incrementWordsSelected}
            bg="primary.hover"
            color="background.base"
            w="fit-content"
            px={2}
            borderRadius="xl"
            isDisabled={!isCurrent}
            _disabled={{
              bg: "body.light",
              color: "body.base",
              pointerEvents: "none",
            }}
          >
            {word}
          </Button>
        )
      })}
    </Flex>
  )
}

interface WordSelectorProps extends SimulatorStateProps {
  words: Array<string>
}
const InteractiveWordSelector: React.FC<WordSelectorProps> = ({
  state,
  words,
}) => {
  const [wordsSelected, setWordsSelected] = useState<number>(0)
  return (
    <>
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
    </>
  )
}

export const CreateAccountScreens: React.FC<SimulatorStateProps> = ({
  state,
}) => {
  const { step } = state
  const words = useMemo<Array<string>>(generateSeedWithoutChecksum, [])
  return (
    <>
      {[0, 1].includes(step) && <HomeScreen state={state} />}
      {[2].includes(step) && (
        <FadeInFlex
          direction="column"
          alignItems="center"
          pt={8}
          h="full"
          bg="background.highlight"
        >
          <Icon
            as={EthGlyphIcon}
            color="body.base"
            height="190px"
            w="auto"
            my={4}
          />
          <Text
            fontSize="2xl"
            textAlign="center"
            px={{ base: 4, md: 8 }}
            lineHeight={8}
          >
            Welcome to{" "}
            <Text as="span" fontWeight="bold">
              wallet simulator
            </Text>
          </Text>
        </FadeInFlex>
      )}
      {[3].includes(step) && <GeneratingKeysComponent state={state} />}
      {[4].includes(step) && (
        <Box py={8} px={{ base: 4, md: 8 }} h="full" bg="background.highlight">
          <Text fontSize="2xl" lineHeight={8} fontWeight="bold">
            Recovery phrase
          </Text>
          <Text>Ethereum accounts are controlled by recovery phrase.</Text>
          <Text>
            Any person knowing this secret recovery phrase can make transactions
            on behalf of your account.
          </Text>
          <Text>
            Wallet app providers do not have access to your account—only you do.
          </Text>
        </Box>
      )}
      {[5].includes(step) && (
        <Box bg="background.highlight">
          <Box py={8}>
            <Text
              fontSize="2xl"
              lineHeight={8}
              fontWeight="bold"
              px={{ base: 4, md: 8 }}
            >
              Recovery phrase example
            </Text>
          </Box>
          <WordList words={words} />
        </Box>
      )}
      {[6].includes(step) && (
        <Box my={8}>
          <Text
            fontSize="2xl"
            lineHeight={8}
            fontWeight="bold"
            px={{ base: 4, md: 8 }}
          >
            Repeat the words
          </Text>
          <InteractiveWordSelector state={state} words={words} />
        </Box>
      )}
      {[0, 1, 2, 4, 5, 7].includes(step) && (
        <ProgressCta
          state={state}
          bg={[5].includes(step) ? "background.base" : "background.highlight"}
        />
      )}
    </>
  )
}
