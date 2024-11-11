import { QuizStatus } from "@/lib/types"

import { cn } from "@/lib/utils/cn"

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
  const getStatusClass = () => {
    if (quizStatus === "neutral") {
      return "bg-background"
    }
    if (quizStatus === "success") {
      return "bg-success"
    }
    return "bg-error"
  }

  const size = useBreakpointValue<ModalProps["size"]>({ base: "xl", md: "md" })!

  return (
    <Modal
      open={isQuizModalOpen}
      onOpenChange={onQuizModalOpenChange}
      size={size}
      contentProps={{
        className: getStatusClass(),
      }}
      {...props}
    >
      <Center className={cn("m-0", getStatusClass())}>{children}</Center>
    </Modal>
  )
}

export default QuizzesModal
