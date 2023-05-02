import React, { ReactNode } from "react"
import styled from "@emotion/styled"
import { IGatsbyImageData } from "gatsby-plugin-image"
import {
  Box,
  BoxProps,
  Flex,
  HStack,
  LinkBox,
  StackProps,
  useColorModeValue,
} from "@chakra-ui/react"
import { ButtonSecondary } from "./SharedStyledComponents"

export type QuizzesListItem = {
  title?: ReactNode
  description?: ReactNode
  caption?: ReactNode
  link?: string
  id?: string
  image?: IGatsbyImageData
  alt?: string
}

export interface IProps extends BoxProps {
  content: Array<QuizzesListItem>
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const StyledButtonSecondary = styled(ButtonSecondary)`
  margin-top: 0;
`

const QuizzesContainer = (props: StackProps) => {
  return (
    <HStack
      spacing={4}
      p={4}
      color="text"
      border="1px solid"
      borderColor="border"
      _hover={{
        borderRadius: "base",
        boxShadow: "0 0 1px var(--eth-colors-primary)",
        background: "tableBackgroundHover",
      }}
      {...props}
    />
  )
}

const Quiz = (props: QuizzesListItem & Omit<StackProps, "title" | "id">) => {
  const { title, description, caption, link, image, alt, ...rest } = props

  return (
    <QuizzesContainer {...rest} cursor="pointer">
      <Flex justifyContent="space-between">
        <Box>{title}</Box>

        <Box>end</Box>
      </Flex>
    </QuizzesContainer>
  )
}

const QuizzesList: React.FC<IProps> = ({
  content,
  quizHandler,
  modalHandler,
  ...rest
}) => (
  <Box bg="background" w="full" {...rest}>
    {content.map((listItem, idx) => {
      const { link, id } = listItem
      const isLink = !!link

      return isLink ? (
        <LinkBox key={id || idx}>
          <Quiz {...listItem} />
        </LinkBox>
      ) : (
        <Quiz
          key={idx}
          onClick={() => {
            quizHandler(listItem.id!)
            modalHandler(true)
          }}
          mb={4}
          {...listItem}
        />
      )
    })}
  </Box>
)

export default QuizzesList
