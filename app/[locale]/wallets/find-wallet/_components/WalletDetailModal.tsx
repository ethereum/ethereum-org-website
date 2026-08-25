"use client"

import { X } from "lucide-react"
import type { StaticImageData } from "next/image"
import { useRouter } from "next/navigation"
import type { ReactNode } from "react"

import { Image } from "@/components/Image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog-modal"

/**
 * Client shell for the intercepted detail route; closing pops the intercepted
 * route off history. Composes the dialog primitives directly, rather than the
 * `Modal` wrapper, to keep the close button in the same row as the title.
 */
const WalletDetailModal = ({
  title,
  image,
  description,
  closeLabel,
  children,
}: {
  title: string
  image: StaticImageData
  /** When absent, Radix's describedby warning is opted out. */
  description?: string
  closeLabel: string
  children: ReactNode
}) => {
  const router = useRouter()

  return (
    <Dialog
      open
      size="lg"
      onOpenChange={(open) => {
        if (!open) router.back()
      }}
    >
      <DialogContent
        {...(description ? {} : { "aria-describedby": undefined })}
      >
        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Image
              src={image}
              alt=""
              className="size-14 shrink-0 object-contain"
            />
            <DialogTitle className="mt-0 text-h3">{title}</DialogTitle>
          </div>
          <DialogClose
            aria-label={closeLabel}
            className="flex size-8 shrink-0 items-center justify-center rounded transition-colors hover:text-primary-hover"
          >
            <X size="20" />
          </DialogClose>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default WalletDetailModal
