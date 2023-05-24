import React from "react"
import { OrderedList } from "@chakra-ui/react"

import QuizItem from "./QuizItem"

import { QuizzesSection } from "../../types"

interface IProps {
  content: Array<QuizzesSection>
  quizHandler: (id: string) => void
  nextHandler: (next?: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList: React.FC<IProps> = ({
  content,
  quizHandler,
  nextHandler,
  modalHandler,
}) => (
  <OrderedList m={0}>
    {content.map((listItem) => {
      const { id, title, level, next } = listItem

      return (
        <QuizItem
          key={id}
          id={id}
          title={title}
          level={level}
          next={next}
          quizHandler={quizHandler}
          nextHandler={nextHandler}
          modalHandler={modalHandler}
        />
      )
    })}
  </OrderedList>
)

export default QuizzesList
