"use client"

import { ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/buttons/Button"

import { scrollIntoView } from "@/lib/utils/scrollIntoView"

type GoToTopButtonProps = {
  label: string
}

const GoToTopButton = ({ label }: GoToTopButtonProps) => {
  return (
    <Button
      variant="outline"
      isSecondary
      onClick={() => scrollIntoView("body")}
      data-testid="footer-go-to-top"
    >
      <ChevronUp /> {label}
    </Button>
  )
}

export default GoToTopButton
