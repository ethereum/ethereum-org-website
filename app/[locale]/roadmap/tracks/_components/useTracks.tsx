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
}

export const useTracks = (): Track[] => {
  const { t } = useTranslation("page-roadmap-tracks")

  return [
    {
      key: "merge",
      title: t("page-roadmap-tracks-merge-title"),
      icon: <MergeIcon />,
    },
    {
      key: "surge",
      title: t("page-roadmap-tracks-surge-title"),
      icon: <SurgeIcon />,
    },
    {
      key: "scourge",
      title: t("page-roadmap-tracks-scourge-title"),
      icon: <ScourgeIcon />,
    },
    {
      key: "purge",
      title: t("page-roadmap-tracks-purge-title"),
      icon: <PurgeIcon />,
    },
    {
      key: "verge",
      title: t("page-roadmap-tracks-verge-title"),
      icon: <VergeIcon />,
    },
    {
      key: "splurge",
      title: t("page-roadmap-tracks-splurge-title"),
      icon: <SplurgeIcon />,
    },
  ]
}
