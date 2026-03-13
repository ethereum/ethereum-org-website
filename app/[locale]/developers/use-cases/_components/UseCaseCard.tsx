"use client"

import type { LucideIcon } from "lucide-react"
import {
  Bot,
  Briefcase,
  Building2,
  Cpu,
  CreditCard,
  Database,
  Factory,
  Film,
  Flame,
  Gavel,
  Globe,
  GraduationCap,
  HandCoins,
  Handshake,
  Heart,
  Home,
  Landmark,
  Leaf,
  Lightbulb,
  Megaphone,
  MessageCircle,
  Monitor,
  Plane,
  Rocket,
  Scale,
  Shield,
  ShoppingCart,
  Sprout,
  Truck,
  Users,
  Wallet,
  Wheat,
} from "lucide-react"

import type { UseCase } from "@/lib/types/use-cases"

import {
  Card,
  CardContent,
  CardParagraph,
  CardTitle,
} from "@/components/ui/card"

// Map each use case title to a contextual icon
const USE_CASE_ICONS: Record<string, LucideIcon> = {
  "Advocacy & Rights": Scale,
  "Global Governance": Globe,
  Education: GraduationCap,
  "Law & Regulation": Gavel,
  "Public Administration": Landmark,
  "Philanthropy & Social Services": Heart,
  "Security & Defense": Shield,
  "Science & Research": Lightbulb,
  "Alternative Money": Wallet,
  "Credit & Capital Formation": CreditCard,
  Insurance: HandCoins,
  "Public Finance & Procurement": Building2,
  "Retail & eCommerce": ShoppingCart,
  "Services & Tasks": Briefcase,
  Travel: Plane,
  Social: MessageCircle,
  "Media & Entertainment": Film,
  "Business Ops": Factory,
  "Supply Chain": Truck,
  "Transport & Logistics": Rocket,
  "Productivity & Collaboration": Handshake,
  "Intellectual Property": Megaphone,
  "Marketing & Advertising": Megaphone,
  AI: Bot,
  Data: Database,
  "IT Infrastructure": Monitor,
  "Hardware & IoT": Cpu,
  Energy: Flame,
  "Food & Agriculture": Wheat,
  "Real Estate & Housing": Home,
  "Sustainability & Regeneration": Leaf,
  "Health & Bio": Sprout,
}

function getUseCaseIcon(title: string): LucideIcon {
  return USE_CASE_ICONS[title] || Users
}

interface UseCaseCardProps {
  useCase: UseCase
  onClick: () => void
}

export function UseCaseCard({ useCase, onClick }: UseCaseCardProps) {
  const totalItems =
    useCase.ideasCount + useCase.projectsCount + useCase.resourcesCount

  const Icon = getUseCaseIcon(useCase.title)

  return (
    <Card
      className="cursor-pointer border border-body/10 bg-background transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="mb-2 flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg">{useCase.title}</CardTitle>
            <span className="text-xs text-body-medium">{useCase.category}</span>
          </div>
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
