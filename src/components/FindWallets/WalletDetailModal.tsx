"use client"

import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import Modal from "@/components/ui/dialog-modal"

// Client shell for the intercepted wallet-detail route. The detail body is
// server-rendered and passed as children; closing pops the intercepted route
// off the history stack, returning to the list.
const WalletDetailModal = ({
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
      size="xl"
      title={<span className="sr-only">{title}</span>}
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
      contentProps={{ className: "max-h-[90vh] overflow-y-auto" }}
    >
      {children}
    </Modal>
  )
}

export default WalletDetailModal
