"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import Modal from "@/components/ui/dialog-modal"
import { type ModalProps } from "@/components/ui/dialog-modal"

import { cn } from "@/lib/utils/cn"

const ToolModalWrapper = (props: ModalProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <Modal
      size="lg"
      onOpenChange={(open) => {
        if (open) return
        // Remove modal params, preserve any other active query state.
        const params = new URLSearchParams(searchParams.toString())
        params.delete("tool")
        params.delete("toolId")
        const queryString = params.toString()
        router.replace(`${pathname}${queryString ? `?${queryString}` : ""}`, {
          scroll: false,
        })
      }}
      contentProps={{
        className: cn(
          "relative flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-lg !gap-0 !p-0",
          "[&>div:first-child]:absolute [&>div:first-child]:end-0 [&>div:first-child]:top-0 [&>div:first-child]:z-10",
          "[&>div:last-child]:min-h-0 [&>div:last-child]:flex-1 [&>div:last-child]:overflow-hidden",
          "[&_button:has(.lucide-x)]:m-2 [&_button:has(.lucide-x)]:p-1 [&_button:has(.lucide-x)]:rounded",
          "hover:[&_button:has(.lucide-x)]:text-primary-hover [&_button:has(.lucide-x)]:bg-background/75 hover:[&_button:has(.lucide-x)]:bg-background",
          "[&_.lucide-x]:!stroke-[3]"
        ),
      }}
      {...props}
    />
  )
}

export default ToolModalWrapper
