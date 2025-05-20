import { Edge, Node } from "@xyflow/react"

import {
  BetterUserExperienceIcon,
  CheaperTransactionsIcon,
  EnergyEfficiencyIcon,
  ExtraSecurityIcon,
  FutureProofingIcon,
  GeneralImprovementsIcon,
  GreenBlockchainIcon,
  MergeIcon,
  PurgeIcon,
  ScourgeIcon,
  SplurgeIcon,
  SurgeIcon,
  VergeIcon,
} from "@/components/icons/roadmap"

import { mergeEdges, mergeNodes } from "./TrackNodeSetups/MergeTrackNodes"
import { purgeEdges, purgeNodes } from "./TrackNodeSetups/PurgeTrackNodes"
import { scourgeEdges, scourgeNodes } from "./TrackNodeSetups/ScourgeTrackNodes"
import { splurgeEdges, splurgeNodes } from "./TrackNodeSetups/SplurgeTrackNodes"
import { surgeEdges, surgeNodes } from "./TrackNodeSetups/SurgeTrackNodes"
import { vergeEdges, vergeNodes } from "./TrackNodeSetups/VergeTrackNodes"

import { useTranslation } from "@/hooks/useTranslation"

type Track = {
  key: string
  title: string
  icon: React.ReactNode
  contentData: {
    title: string
    goalDescription: string
    benefits: { icon: React.ReactNode; title: string }[]
    nodes: { nodes: Node[]; edges: Edge[] }
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
        benefits: [
          {
            icon: <EnergyEfficiencyIcon />,
            title: t("page-roadmap-tracks-energy-efficiency"),
          },
          {
            icon: <GreenBlockchainIcon />,
            title: t("page-roadmap-tracks-green-blockchain"),
          },
        ],
        nodes: {
          nodes: mergeNodes,
          edges: mergeEdges,
        },
      },
    },
    {
      key: "surge",
      title: t("page-roadmap-tracks-surge-title"),
      icon: <SurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-surge-content-title"),
        goalDescription: t("page-roadmap-tracks-surge-goal-description"),
        benefits: [
          {
            icon: <CheaperTransactionsIcon />,
            title: t("page-roadmap-tracks-cheaper-transactions"),
          },
        ],
        nodes: {
          nodes: surgeNodes,
          edges: surgeEdges,
        },
      },
    },
    {
      key: "scourge",
      title: t("page-roadmap-tracks-scourge-title"),
      icon: <ScourgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-scourge-content-title"),
        goalDescription: t("page-roadmap-tracks-scourge-goal-description"),
        benefits: [
          {
            icon: <ExtraSecurityIcon />,
            title: t("page-roadmap-tracks-extra-security"),
          },
        ],
        nodes: {
          nodes: scourgeNodes,
          edges: scourgeEdges,
        },
      },
    },
    {
      key: "purge",
      title: t("page-roadmap-tracks-purge-title"),
      icon: <PurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-purge-content-title"),
        goalDescription: t("page-roadmap-tracks-purge-goal-description"),
        benefits: [
          {
            icon: <FutureProofingIcon />,
            title: t("page-roadmap-tracks-future-proofing"),
          },
        ],
        nodes: {
          nodes: purgeNodes,
          edges: purgeEdges,
        },
      },
    },
    {
      key: "verge",
      title: t("page-roadmap-tracks-verge-title"),
      icon: <VergeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-verge-content-title"),
        goalDescription: t("page-roadmap-tracks-verge-goal-description"),
        benefits: [
          {
            icon: <BetterUserExperienceIcon />,
            title: t("page-roadmap-tracks-better-user-experience"),
          },
        ],
        nodes: {
          nodes: vergeNodes,
          edges: vergeEdges,
        },
      },
    },
    {
      key: "splurge",
      title: t("page-roadmap-tracks-splurge-title"),
      icon: <SplurgeIcon />,
      contentData: {
        title: t("page-roadmap-tracks-splurge-content-title"),
        goalDescription: t("page-roadmap-tracks-splurge-goal-description"),
        benefits: [
          {
            icon: <GeneralImprovementsIcon />,
            title: t("page-roadmap-tracks-general-improvements"),
          },
        ],
        nodes: {
          nodes: splurgeNodes,
          edges: splurgeEdges,
        },
      },
    },
  ]
}
