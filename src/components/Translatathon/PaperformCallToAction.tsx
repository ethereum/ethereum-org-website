import type { ReactNode } from "react"

import { Button } from "@/components/ui/buttons/Button"

import { cn } from "@/lib/utils/cn"

import PaperformModal from "./PaperformModal"

interface PaperformCallToActionProps {
  content: ReactNode
  variant: "solid" | "outline"
  className?: string
}

export const PaperformCallToAction = ({
  content,
  variant,
  className,
}: PaperformCallToActionProps) => {
  const buttonProps = {
    variant,
    isSecondary: variant === "outline",
    className: cn("flex-[1] md:flex-[initial]", className),
  }

  return (
    <PaperformModal
      trigger={<Button {...buttonProps}>{content}</Button>}
      title="Apply to Translate"
    />
  )
}

export default PaperformCallToAction
