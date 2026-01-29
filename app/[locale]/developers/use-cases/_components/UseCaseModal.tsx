"use client"

import { useTranslations } from "next-intl"

import type { UseCase } from "@/lib/types/use-cases"

import { Button, ButtonLink } from "@/components/ui/buttons/Button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog-modal"

interface UseCaseModalProps {
  useCase: UseCase | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UseCaseModal({
  useCase,
  open,
  onOpenChange,
}: UseCaseModalProps) {
  const t = useTranslations("page-use-cases")

  if (!useCase) return null

  const totalItems =
    useCase.ideasCount + useCase.projectsCount + useCase.resourcesCount

  return (
    <Dialog open={open} onOpenChange={onOpenChange} size="xl">
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div>
            <span className="text-sm text-body-medium">{useCase.category}</span>
            <DialogTitle className="text-2xl font-bold">
              {useCase.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-6">
            <div>
              <h4 className="mb-2 font-semibold">{t("modal-problem")}</h4>
              <p className="text-body">{useCase.problemStatement}</p>
            </div>

            {totalItems > 0 && (
              <div className="flex flex-wrap gap-4 rounded-lg bg-background-highlight p-4">
                {useCase.ideasCount > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {useCase.ideasCount}
                    </div>
                    <div className="text-sm text-body-medium">
                      {t("modal-ideas")}
                    </div>
                  </div>
                )}
                {useCase.projectsCount > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {useCase.projectsCount}
                    </div>
                    <div className="text-sm text-body-medium">
                      {t("modal-projects")}
                    </div>
                  </div>
                )}
                {useCase.resourcesCount > 0 && (
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {useCase.resourcesCount}
                    </div>
                    <div className="text-sm text-body-medium">
                      {t("modal-resources")}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-wrap gap-4 pt-4">
              <ButtonLink
                href={`https://explorer.usecaselab.org/${useCase.id}`}
                className="inline-flex"
              >
                {t("modal-explore")}
              </ButtonLink>
              <DialogClose asChild>
                <Button variant="outline" isSecondary>
                  {t("modal-close")}
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
