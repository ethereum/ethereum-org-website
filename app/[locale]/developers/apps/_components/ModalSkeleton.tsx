"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog-modal"
import { Skeleton } from "@/components/ui/skeleton"

export function ModalSkeleton() {
  return (
    <Dialog open size="xl">
      <DialogContent>
        <DialogHeader>
          <Skeleton className="h-8 w-48" />
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="mt-4 h-6 w-32" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
