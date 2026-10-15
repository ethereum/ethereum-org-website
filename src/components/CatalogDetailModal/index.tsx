"use client"

import {
  type ComponentProps,
  type ReactNode,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react"
import { X } from "lucide-react"
import type { StaticImageData } from "next/image"

import { Image } from "@/components/Image"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog-modal"

/**
 * Shell for a product catalog's detail modal (find-wallet, developer tools).
 * Composes the dialog primitives directly, rather than the `Modal` wrapper, to
 * keep the close button in the same row as the title.
 */
const CatalogDetailModal = ({
  title,
  image,
  fallbackIcon,
  description,
  closeLabel,
  onClose,
  onCloseAutoFocus,
  children,
}: {
  title: string
  image?: string | StaticImageData | null
  /** Fills the logo slot for a listing that ships no image. */
  fallbackIcon?: ReactNode
  /** When absent, Radix's describedby warning is opted out. */
  description?: string
  closeLabel: string
  onClose: () => void
  onCloseAutoFocus?: ComponentProps<typeof DialogContent>["onCloseAutoFocus"]
  children: ReactNode
}) => {
  return (
    <Dialog
      open
      size="lg"
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <DialogContent
        // Rows rather than the default auto-flow so the header stays put and
        // only the body scrolls once the content outgrows the viewport.
        className="max-h-[calc(100dvh-2rem)] grid-rows-[auto_minmax(0,1fr)]"
        onCloseAutoFocus={onCloseAutoFocus}
        {...(description ? {} : { "aria-describedby": undefined })}
      >
        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            {image ? (
              <Image
                src={image}
                alt=""
                width={56}
                height={56}
                className="size-14 shrink-0 rounded-lg object-contain"
              />
            ) : (
              fallbackIcon
            )}
            <DialogTitle className="mt-0 text-h3">{title}</DialogTitle>
          </div>
          <DialogClose
            aria-label={closeLabel}
            className="flex size-8 shrink-0 items-center justify-center rounded transition-colors hover:text-primary-hover"
          >
            <X size="20" />
          </DialogClose>
        </div>
        <div className="min-h-0 overflow-y-auto">{children}</div>
      </DialogContent>
    </Dialog>
  )
}

/** Which catalog item's modal is open, with a history entry so Back closes it. */
export const useCatalogModal = () => {
  const [openId, setOpenId] = useState<string | null>(null)

  // The click paints immediately; the Dialog mounts in a transition.
  const open = useCallback(
    (id: string) => startTransition(() => setOpenId(id)),
    []
  )

  const close = useCallback(() => {
    setOpenId(null)
    // Drop the entry we pushed, or Back would have to be pressed twice.
    if (window.history.state?.catalogModal) window.history.back()
  }, [])

  // Pushed a frame late (pushState inside the click costs +500ms INP) via the
  // native method (Next patches the other).
  useEffect(() => {
    if (!openId) return
    const frame = requestAnimationFrame(() => {
      History.prototype.pushState.call(
        window.history,
        { ...window.history.state, catalogModal: openId },
        "",
        window.location.href
      )
    })
    const onPopState = () => setOpenId(null)
    window.addEventListener("popstate", onPopState)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("popstate", onPopState)
    }
  }, [openId])

  return { openId, open, close }
}

export default CatalogDetailModal
