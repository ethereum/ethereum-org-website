import React, { useMemo } from "react"
import {
  Box,
  chakra,
  Circle,
  Flex,
  FlexProps,
  RadioProps,
  SquareProps,
  Stack,
  Text,
  TextProps,
  useRadio,
  useRadioGroup,
  useToken,
} from "@chakra-ui/react"
import { useTranslation } from "gatsby-plugin-react-i18next"

import Translation from "../Translation"

import { TranslationKey } from "../../utils/translations"

import { Question } from "../../types"

interface CustomRadioProps extends RadioProps {
  index: number
  label: string
  showAnswer: boolean
  isSelectedCorrect: boolean
}

const CustomRadio: React.FC<CustomRadioProps> = ({
  index,
  label,
  showAnswer,
  isSelectedCorrect,
  ...radioProps
}) => {
  const { state, getInputProps, getRadioProps, htmlProps } =
    useRadio(radioProps)

  // Memoized values
  const buttonBg = useMemo<string>(() => {
    if (!state.isChecked) return "body.inverted"
    if (!showAnswer) return "primary.base"
    if (!isSelectedCorrect) return "error.base"
    return "success.base"
  }, [state.isChecked, showAnswer, isSelectedCorrect])

  const primaryBaseColor = useToken("colors", "primary.base")

  const focusProps: FlexProps = {
    outline: showAnswer ? "none" : `1px solid ${primaryBaseColor}`,
  }

  const controlFocusProps: SquareProps = {
    bg: showAnswer ? "white" : "primary.pressed",
  }

  const getRadioControlBg = (): SquareProps["bg"] => {
    if (showAnswer) return "white"

    if (state.isChecked) return "primary.pressed"

    return "disabled"
  }

  const getControlLabelColor = (): TextProps["color"] => {
    if (!showAnswer) return "white"

    if (isSelectedCorrect) return "success.base"

    return "error.base"
  }

  // Render CustomRadio component
  return (
    <chakra.label {...htmlProps} cursor="pointer" w="100%">
      <input {...getInputProps()} />
      <Flex
        {...getRadioProps()}
        w="100%"
        p={2}
        alignItems="center"
        bg={buttonBg}
        color={state.isChecked ? "white" : "text"}
        borderRadius="base"
        _hover={{ ...focusProps, cursor: showAnswer ? "default" : "pointer" }}
        _focus={focusProps}
        data-group
      >
        <Circle
          size="25px"
          bg={getRadioControlBg()}
          _groupHover={controlFocusProps}
          _groupFocus={controlFocusProps}
          me={2}
        >
          <Text
            m="0"
            fontWeight="700"
            fontSize="lg"
            color={getControlLabelColor()}
          >
            {String.fromCharCode(97 + index).toUpperCase()}
          </Text>
        </Circle>
        {label}
      </Flex>
    </chakra.label>
  )
}

interface IProps {
  questionData: Question
  showAnswer: boolean
  handleSelection: (answerId: string) => void
  selectedAnswer: string | null
}

const QuizRadioGroup: React.FC<IProps> = ({
  questionData,
  showAnswer,
  handleSelection,
  selectedAnswer,
}) => {
  const { t } = useTranslation()
  const { getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleSelection,
  })
  const { prompt, answers, correctAnswerId } = questionData

  // Memoized values
  const explanation = useMemo<TranslationKey>(() => {
    if (!selectedAnswer) return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
  }, [selectedAnswer])
  const isSelectedCorrect = useMemo<boolean>(
    () => correctAnswerId === selectedAnswer,
    [selectedAnswer]
  )

  // Render QuizRadioGroup
  return (
    <Stack spacing="6" {...getRootProps()} w="100%">
      <Text
        textAlign={{ base: "center", md: "left" }}
        fontWeight="700"
        size="2xl"
      >
        {t(prompt)}
      </Text>

      <Stack gap="4">
        {answers.map(({ id, label }, index) => {
          const display =
            !showAnswer || id === selectedAnswer ? "inline-flex" : "none"
          return (
            <CustomRadio
              key={id}
              display={display}
              index={index}
              label={t(label)}
              showAnswer={showAnswer}
              isSelectedCorrect={isSelectedCorrect}
              {...getRadioProps({ value: id })}
            />
          )
        })}
      </Stack>

      {showAnswer && (
        <Box>
          <Text fontWeight="bold" mt={0} mb={2}>
            <Translation id="explanation" />
          </Text>
          <Text m={0}>{t(explanation)}</Text>
        </Box>
      )}
    </Stack>
  )
}

export default QuizRadioGroup
