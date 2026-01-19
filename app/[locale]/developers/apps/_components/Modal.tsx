"use client"

import { usePathname, useRouter } from "next/navigation"

import Modal from "@/components/ui/dialog-modal"

type AppModalProps = {
  open: boolean
  children: React.ReactNode
}

const AppModal = ({ open, children }: AppModalProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Modal
      open={open}
      onOpenChange={(open) => {
        if (open) return
        router.replace(pathname, { scroll: false })
      }}
    >
      {children}
    </Modal>
  )
}

export default AppModal
