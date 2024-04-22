import { Center, ModalContentProps } from "@chakra-ui/react"

import { QuizStatus } from "@/lib/types"

import Modal from "../Modal"

type QuizzesModalProps = {
  isQuizModalOpen: boolean
  onQuizModalClose: () => void
  children: React.ReactNode
  quizStatus: QuizStatus
}

const QuizzesModal = ({
  children,
  quizStatus,
  isQuizModalOpen,
  onQuizModalClose,
  ...props
}: QuizzesModalProps) => {
  const getStatusColor = (): ModalContentProps["bg"] => {
    if (quizStatus === "neutral") {
      return "background.base"
    }
    if (quizStatus === "success") {
      return "success.neutral"
    }
    return "error.neutral"
  }

  return (
    <Modal
      isOpen={isQuizModalOpen}
      onClose={onQuizModalClose}
      size={{ base: "full", md: "xl" }}
      contentProps={{ bg: getStatusColor() }}
      {...props}
    >
      <Center m={0} bg={getStatusColor()} py="16">
        {children}
      </Center>
    </Modal>
  )
}

export default QuizzesModal
