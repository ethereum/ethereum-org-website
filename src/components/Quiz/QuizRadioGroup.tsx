// Import libraries
import React, { useMemo } from "react"
import {
  Box,
  chakra,
  Circle,
  Flex,
  RadioProps,
  Text,
  useColorMode,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react"

// Import types
import { Question } from "../../types"

export interface IProps {
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
  const { prompt, answers, correctAnswerId } = questionData
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === "dark"

  // Custom radio button component
  interface CustomRadioProps extends RadioProps {
    index: number
    label: string
  }
  const CustomRadio: React.FC<CustomRadioProps> = ({
    index,
    label,
    ...radioProps
  }) => {
    const { state, getInputProps, getCheckboxProps, htmlProps } =
      useRadio(radioProps)
    const iconBackgroundDark = state.isActive ? "orange.800" : "gray.500"
    const iconBackgroundLight = state.isActive ? "blue.300" : "gray.400"

    // Memoized values
    const buttonBg = useMemo<string>(() => {
      if (!showAnswer) return "primary"
      return correctAnswerId === selectedAnswer ? "green.500" : "red.500"
    }, [questionData, selectedAnswer, showAnswer])
    const circleBg = useMemo<string>(
      () =>
        showAnswer
          ? "white"
          : isDarkMode
          ? iconBackgroundDark
          : iconBackgroundLight,
      [showAnswer, isDarkMode]
    )

    // Render CustomRadio
    return (
      <chakra.label {...htmlProps} cursor="pointer" data-group w="100%">
        <input {...getInputProps({})} hidden />
        <Flex
          {...getCheckboxProps()}
          w="100%"
          p={2}
          alignItems="center"
          bg={state.isChecked ? buttonBg : "quizButton"}
          color={state.isChecked ? "white" : "text"}
          borderRadius="base"
          _hover={
            showAnswer
              ? {
                  boxShadow: "none",
                  cursor: "default",
                }
              : {
                  outline: "1px solid var(--eth-colors-primary)",
                  boxShadow: "primary",
                }
          }
        >
          <Circle
            size={"25px"}
            bg={circleBg}
            _groupHover={
              showAnswer
                ? {
                    bg: "white",
                    cursor: "default",
                  }
                : {
                    bg: isDarkMode ? "orange.700" : "blue.300",
                  }
            }
            me={2}
          >
            <Text m="0" fontWeight={"700"} fontSize={"lg"} color={letterColor}>
              {String.fromCharCode(97 + index).toUpperCase()}
            </Text>
          </Circle>
          {label}
        </Flex>
      </chakra.label>
    )
  }

  const handleChange = (value: string): void => {
    handleSelection(value)
  }

  const { getRadioProps, getRootProps } = useRadioGroup({
    onChange: handleChange,
  })

  // Memoized values
  const explanation = useMemo<string>(() => {
    if (!selectedAnswer) return ""
    return answers.filter(({ id }) => id === selectedAnswer)[0].explanation
  }, [selectedAnswer])
  const letterColor = useMemo<string>(() => {
    if (!showAnswer) return "white"
    return correctAnswerId === selectedAnswer ? "green.500" : "red.500"
  }, [questionData, selectedAnswer, showAnswer])

  // Render QuizRadioGroup
  return (
    <Flex {...getRootProps()} direction="column" w="100%">
      <Text fontWeight={"700"} fontSize={"2xl"} mb={6}>
        {prompt}
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
              label={label}
              {...getRadioProps({ value: id })}
            />
          )
        })}
      </Flex>
      {showAnswer && (
        <Box mt={5}>
          <Text fontWeight="bold" mt={0} mb={2}>
            Explanation
          </Text>
          <Text m={0}>{explanation}</Text>
        </Box>
      )}
    </Flex>
  )
}

export default QuizRadioGroup
