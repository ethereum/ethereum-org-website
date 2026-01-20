"use client"

import { usePathname, useRouter } from "next/navigation"

import Modal from "@/components/ui/dialog-modal"
import { type ModalProps } from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"

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
        className: cn(
          "[&_button:has(.lucide-x)]:m-2 [&_button:has(.lucide-x)]:p-1 [&_button:has(.lucide-x)]:rounded",
          "hover:[&_button:has(.lucide-x)]:text-primary-hover [&_button:has(.lucide-x)]:bg-background/75 hover:[&_button:has(.lucide-x)]:bg-background",
          "[&_.lucide-x]:!stroke-[3]"
        ),
      }}
      {...props}
    />
  )
}

export default AppModalWrapper
