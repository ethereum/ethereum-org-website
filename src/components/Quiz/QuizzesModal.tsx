import { QuizStatus } from "@/lib/types"

import Modal, { type ModalProps } from "../ui/dialog-modal"
import { Center } from "../ui/flex"

import { useBreakpointValue } from "@/hooks/useBreakpointValue"

type QuizzesModalProps = {
  isQuizModalOpen: boolean
  onQuizModalOpenChange: (open: boolean) => void
  children: React.ReactNode
  quizStatus: QuizStatus
}

const QuizzesModal = ({
  children,
  quizStatus,
  isQuizModalOpen,
  onQuizModalOpenChange,
  ...props
}: QuizzesModalProps) => {
  // TODO: remove bang in utility class names when Modal is migrated
  const getStatusColorClass = () => {
    if (quizStatus === "neutral") return "!bg-background"
    if (quizStatus === "success")
      return "!bg-success-light dark:!bg-success-dark"
    return "!bg-error-light dark:!bg-error-dark"
  }

  const size = useBreakpointValue<ModalProps["size"]>({ base: "xl", md: "md" })!

  return (
    <Modal
      open={isQuizModalOpen}
      onOpenChange={onQuizModalOpenChange}
      size={size}
      contentProps={{ className: getStatusColorClass() }}
      {...props}
    >
      <Center>{children}</Center>
    </Modal>
  )
}

export default QuizzesModal
