import dynamic from "next/dynamic"

import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils/cn"

import type { Feature } from "../types"

const FallbackIcon = () => <Skeleton className="size-16" />

const IconComponents = {
  ExtraSecurity: dynamic(
    () => import("@/components/icons/extra-security.svg"),
    { loading: () => <FallbackIcon /> }
  ),
  FutureProofing: dynamic(
    () => import("@/components/icons/future-proofing.svg"),
    { loading: () => <FallbackIcon /> }
  ),
  BetterUX: dynamic(() => import("@/components/icons/better-ux.svg"), {
    loading: () => <FallbackIcon />,
  }),
  CheaperTransactions: dynamic(
    () => import("@/components/icons/cheaper-transactions.svg"),
    { loading: () => <FallbackIcon /> }
  ),
}

type IconComponent = keyof typeof IconComponents

const FeatureCard = ({
  feature: { header, content, iconName },
  className,
}: {
  feature: Feature
  className?: string
}) => {
  const Icon = IconComponents[iconName as IconComponent]
  return (
    <Card
      key={header}
      className={cn(
        "space-y-4 rounded-4xl border bg-background px-6 py-8 shadow-window-box",
        className
      )}
    >
      <Icon className="text-7xl text-primary" />
      <h3 className="text-xl">{header}</h3>
      {content.map((p, i) => (
        <p key={i} className="mb-8 text-body-medium last:mb-0">
          {p}
        </p>
      ))}
    </Card>
  )
}

export default FeatureCard
