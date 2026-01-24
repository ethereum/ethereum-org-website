"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

import { usePathname, useRouter } from "@/i18n/routing"

interface AppModalProps {
  title: string
  children: React.ReactNode
}

export function AppModal({ title, children }: AppModalProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push(pathname, { scroll: false })
    }
  }

  return (
    <Dialog open onOpenChange={handleOpenChange} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription asChild>
          <div className="prose prose-sm dark:prose-invert max-h-[70vh] overflow-y-auto">
            {children}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
