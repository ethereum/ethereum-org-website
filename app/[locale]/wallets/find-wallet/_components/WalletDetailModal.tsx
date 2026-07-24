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
 * Client shell for the intercepted wallet-detail route. The detail content is
 * server-rendered and passed as `children`; closing the modal pops the
 * intercepted route off the history stack, returning to the catalog.
 *
 * Composes the dialog primitives directly (rather than the `Modal` wrapper) so
 * the wallet icon, name, and close button share one flex row — keeping the
 * close button aligned with the visible title.
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
  /** Accessible description; when absent, Radix's describedby warning is opted out. */
  description?: string
  /** Localized "close" label, built on the server. */
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
