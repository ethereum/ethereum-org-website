import { QuizStatus } from "@/lib/types"

import Modal from "../Modal"
import { Center } from "../ui/flex"

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
  // TODO: remove bang in utility class names when Modal is migrated
  const getStatusColorClass = () => {
    if (quizStatus === "neutral") {
      return "!bg-background"
    }

    if (quizStatus === "success") {
      return "!bg-success-neutral"
    }

    return "!bg-error"
  }

  return (
    <Modal
      isOpen={isQuizModalOpen}
      onClose={onQuizModalClose}
      size={{ base: "full", md: "xl" }}
      contentProps={{ className: getStatusColorClass() }}
      {...props}
    >
      <Center className={getStatusColorClass()}>{children}</Center>
    </Modal>
  )
}

export default QuizzesModal
