import React from "react"
import { OrderedList } from "@chakra-ui/react"

import QuizItem from "./QuizItem"

import { QuizzesSection } from "../../types"

interface IProps {
  content: Array<QuizzesSection>
  quizHandler: (id: string) => void
  modalHandler: (isModalOpen: boolean) => void
}

const QuizzesList: React.FC<IProps> = ({
  content,
  quizHandler,
  modalHandler,
}) => (
  <OrderedList m={0} listStyleType="none" sx={{ counterReset: "list-counter" }}>
    {content.map((listItem) => {
      const { id, level, next } = listItem

      return (
        <QuizItem
          key={id}
          id={id}
          level={level}
          next={next}
          quizHandler={quizHandler}
          modalHandler={modalHandler}
        />
      )
    })}
  </OrderedList>
)

export default QuizzesList
