import React, { useMemo } from "react"
import {
  Box,
  chakra,
  Circle,
  Flex,
  RadioProps,
  Text,
  useRadio,
  useRadioGroup,
  useToken,
} from "@chakra-ui/react"

import type { Question } from "../../lib/interfaces"
// TODO: Re-enable after intl implemented
// import { useTranslation } from "gatsby-plugin-react-i18next"
// import Translation from "../Translation"
import type { TranslationKey } from "../../lib/types"

interface CustomRadioProps extends RadioProps {
  index: number
  label: string
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
  // const { t } = useTranslation()
  const { getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleSelection,
  })
  const { prompt, answers, correctAnswerId } = questionData

  // Memoized values
  const explanation = useMemo<TranslationKey>(() => {
    if (!selectedAnswer) return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
  }, [answers, selectedAnswer])
  const isSelectedCorrect = useMemo<boolean>(
    () => correctAnswerId === selectedAnswer,
    [correctAnswerId, selectedAnswer]
  )

  // Custom radio button component
  const CustomRadio: React.FC<CustomRadioProps> = ({
    index,
    label,
    ...radioProps
  }) => {
    const { state, getInputProps, getCheckboxProps, htmlProps } =
      useRadio(radioProps)

    // Memoized values
    const buttonBg = useMemo<string>(() => {
      if (!state.isChecked) return "body.inverted"
      if (!showAnswer) return "primary.base"
      if (!isSelectedCorrect) return "error.base"
      return "success.base"
    }, [state.isChecked])

    const primaryBaseColor = useToken("colors", "primary.base")

    // Render CustomRadio component
    return (
      <chakra.label {...htmlProps} cursor="pointer" data-group w="100%">
        <input {...getInputProps({})} hidden />
        <Flex
          {...getCheckboxProps()}
          w="100%"
          p={2}
          alignItems="center"
          bg={buttonBg}
          color={state.isChecked ? "white" : "text"}
          borderRadius="base"
          _hover={{
            boxShadow: showAnswer ? "none" : "primary.base",
            outline: showAnswer ? "none" : `1px solid ${primaryBaseColor}`,
            cursor: showAnswer ? "default" : "pointer",
          }}
        >
          <Circle
            size="25px"
            bg={
              showAnswer
                ? "white"
                : state.isChecked
                ? "primary.pressed"
                : "disabled"
            }
            _groupHover={{
              bg: showAnswer ? "white" : "primary.pressed",
            }}
            me={2}
          >
            <Text
              m="0"
              fontWeight="700"
              fontSize="lg"
              color={
                !showAnswer
                  ? "white"
                  : isSelectedCorrect
                  ? "success.base"
                  : "error.base"
              }
            >
              {String.fromCharCode(97 + index).toUpperCase()}
            </Text>
          </Circle>
          {label}
        </Flex>
      </chakra.label>
    )
  }

  // Render QuizRadioGroup
  return (
    <Flex {...getRootProps()} direction="column" w="100%">
      <Text
        textAlign={{ base: "center", md: "left" }}
        fontWeight="700"
        fontSize="2xl"
        mb={6}
      >
        {/* TODO: Re-enable once intl implemented; remove placeholder */}
        {/* {t(prompt)} */}
        prompt
      </Text>

      <Flex direction="column" gap={4}>
        {answers.map(({ id, label }, index) => {
          const display =
            !showAnswer || id === selectedAnswer ? "inline-flex" : "none"
          return (
            <CustomRadio
              key={id}
              display={display}
              index={index}
              // TODO: Re-enable once intl implemented; remove placeholder
              // label={t(label)}
              label={label}
              {...getRadioProps({ value: id })}
            />
          )
        })}
      </Flex>

      {showAnswer && (
        <Box mt={5}>
          <Text fontWeight="bold" mt={0} mb={2}>
            {/* TODO: Re-enable once intl implemented; remove placeholder */}
            {/* <Translation id="explanation" /> */}
            Explanation
          </Text>
          {/* TODO: Re-enable once intl implemented; remove placeholder */}
          {/* <Text m={0}>{t(explanation)}</Text> */}
          <Text m={0}>{explanation}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default QuizRadioGroup
