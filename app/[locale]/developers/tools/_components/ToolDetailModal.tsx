"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import Modal from "@/components/ui/dialog-modal"

/**
 * Client shell for the intercepted tool-detail route. The detail content is
 * server-rendered and passed as `children`; closing the modal pops the
 * intercepted route off the history stack, returning to the catalog.
 */
const ToolDetailModal = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => {
  const router = useRouter()

  return (
    <Modal
      open
      size="lg"
      variant="media"
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      // Visible name lives in the detail content; this gives the dialog its
      // accessible name without duplicating the heading.
      title={<span className="sr-only">{title}</span>}
    >
      {children}
    </Modal>
  )
}

export default ToolDetailModal
