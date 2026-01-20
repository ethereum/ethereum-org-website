"use client"

import { usePathname, useRouter } from "next/navigation"

import Modal from "@/components/ui/dialog-modal"
import { type ModalProps } from "@/components/ui/dialog-modal"

const AppModalWrapper = (props: ModalProps) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Modal
      onOpenChange={(open) => {
        if (open) return
        router.replace(pathname, { scroll: false })
      }}
      contentProps={{
        className: "[&_.lucide-x]:!stroke-[3] [&_.lucide-x]:!text-body-inverse",
      }}
      {...props}
    />
  )
}

export default AppModalWrapper
