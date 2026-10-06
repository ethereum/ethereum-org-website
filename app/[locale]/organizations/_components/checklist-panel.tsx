import type { ReactNode } from "react"

import { CheckCircle } from "@/components/icons/CheckCircle"
import { Card, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Section } from "@/components/ui/section"

import { cn } from "@/lib/utils/cn"

export type ChecklistItem = {
  title: ReactNode
  description: ReactNode
}

type ChecklistPanelProps = {
  id: string
  title: ReactNode
  description?: ReactNode
  items: ChecklistItem[]
  /** Which theme color washes the panel background */
  tint?: "primary" | "success"
}

const ChecklistPanel = ({
  id,
  title,
  description,
  items,
  tint = "primary",
}: ChecklistPanelProps) => (
  <Section
    id={id}
    className={cn(
      "rounded-4xl px-page py-space-3x text-center",
      // `/12` lifts the wash so the nested card doesn't vanish into it in dark mode
      tint === "success" ? "bg-tint-success/12" : "bg-tint-primary/12"
    )}
  >
    <h2>{title}</h2>
    {description && (
      <p className="mx-auto max-w-3xl text-lg text-pretty text-body-medium">
        {description}
      </p>
    )}
    <Card variant="nested" border size="lg" className="mx-auto max-w-4xl">
      <CardContent>
        <Grid balanced={2} className="gap-8 text-start">
          {items.map(({ title, description }, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <CheckCircle className="shrink-0" />
              <div>
                <h3 className="text-h5">{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </Grid>
      </CardContent>
    </Card>
  </Section>
)

export default ChecklistPanel
