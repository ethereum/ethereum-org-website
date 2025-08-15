"use client"

import { useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-modal"

import { PAPERFORM_ID } from "./constants"

interface PaperformModalProps {
  trigger: React.ReactNode
  title?: string
}

export const PaperformModal = ({
  trigger,
  title = "Apply to Translate",
}: PaperformModalProps) => {
  const [isOpen, setIsOpen] = useState(false)

  // Use direct form URL without embed parameters for better scrolling
  const paperformUrl = `https://${PAPERFORM_ID}.paperform.co/`

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex h-[90vh] max-w-4xl flex-col p-0">
        <DialogHeader className="flex-shrink-0 border-b px-6 py-4">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="min-h-0 flex-1">
          <iframe
            src={paperformUrl}
            className="h-full w-full border-0"
            title="Translatathon Application Form"
            loading="lazy"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PaperformModal
