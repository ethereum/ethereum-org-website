import {
  MergeIcon,
  PurgeIcon,
  ScourgeIcon,
  SplurgeIcon,
  SurgeIcon,
  VergeIcon,
} from "@/components/icons/roadmap"

import { useTranslation } from "@/hooks/useTranslation"

type Track = {
  key: string
  title: string
  icon: React.ReactNode
  contentData: {
    title: string
    goalDescription: string
    benefits: string[]
    nodes: []
  }
}

export const useTracks = (): Track[] => {
  const { t } = useTranslation("page-roadmap-tracks")

  return [
    {
      key: "merge",
      title: t("page-roadmap-tracks-merge-title"),
      icon: <MergeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-merge-content-title"),
        goalDescription: t("page-roadmap-tracks-merge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
    {
      key: "surge",
      title: t("page-roadmap-tracks-surge-title"),
      icon: <SurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-surge-content-title"),
        goalDescription: t("page-roadmap-tracks-surge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
    {
      key: "scourge",
      title: t("page-roadmap-tracks-scourge-title"),
      icon: <ScourgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-scourge-content-title"),
        goalDescription: t("page-roadmap-tracks-scourge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
    {
      key: "purge",
      title: t("page-roadmap-tracks-purge-title"),
      icon: <PurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-purge-content-title"),
        goalDescription: t("page-roadmap-tracks-purge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
    {
      key: "verge",
      title: t("page-roadmap-tracks-verge-title"),
      icon: <VergeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-verge-content-title"),
        goalDescription: t("page-roadmap-tracks-verge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
    {
      key: "splurge",
      title: t("page-roadmap-tracks-splurge-title"),
      icon: <SplurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-splurge-content-title"),
        goalDescription: t("page-roadmap-tracks-splurge-goal-description"),
        benefits: [],
        nodes: [],
      },
    },
  ]
}
