"use client"

import type { UseCase } from "@/lib/types/use-cases"

import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

interface UseCaseCardProps {
  useCase: UseCase
  onClick: () => void
}

export function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  const totalItems =
    useCase.ideasCount + useCase.projectsCount + useCase.resourcesCount

  return (
    <Card
      className="cursor-pointer border border-body/10 bg-background transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="mb-2">
          <CardTitle className="text-lg">{useCase.title}</CardTitle>
          <span className="text-xs text-body-medium">{useCase.category}</span>
        </div>
        <CardParagraph variant="light" className="line-clamp-3 text-sm">
          {useCase.problemStatement}
        </CardParagraph>
        {totalItems > 0 && (
          <div className="mt-3 flex gap-3 text-xs text-body-medium">
            {useCase.ideasCount > 0 && <span>{useCase.ideasCount} ideas</span>}
            {useCase.projectsCount > 0 && (
              <span>{useCase.projectsCount} projects</span>
            )}
            {useCase.resourcesCount > 0 && (
              <span>{useCase.resourcesCount} resources</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
