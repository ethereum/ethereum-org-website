import { Edge, MarkerType, Node } from "@xyflow/react"

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

import { useTranslation } from "@/hooks/useTranslation"

const initialNodes = [
  {
    id: "group-1",
    position: { x: 20, y: 20 },
    style: {
      width: 200,
      height: 200,
      border: "1px solid hsla(var(--primary))",
      borderRadius: "10px",
      backgroundColor: "#B38DF01A",
    },
    type: "group",
    data: {
      label: "Group",
    },
  },
  {
    id: "1",
    position: { x: 20, y: 20 },
    type: "taskShipped",
    data: {
      label: "Warmup fork (Altair)",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
    parentNode: "group-1",
    extent: "parent" as const,
  },
  {
    id: "2",
    position: { x: 200, y: 125 },
    type: "taskShipped",
    data: {
      label: "2",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
    parentNode: "group-1",
    extent: "parent" as const,
  },
  {
    id: "3",
    position: { x: 20, y: 180 },
    type: "endGoal",
    data: {
      label: "Quantum-safe SNARKs (eg. STARKs)",
    },
  },
  {
    id: "4",
    position: { x: 400, y: 20 },
    type: "taskIdea",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
  },
  {
    id: "5",
    position: { x: 600, y: 20 },
    type: "taskResearch",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
      percentage: 80,
    },
  },
  {
    id: "6",
    position: { x: 600, y: 135 },
    type: "taskScheduled",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
  },
  {
    id: "7",
    position: { x: 600, y: 250 },
    type: "featureResearch",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
  },
  {
    id: "8",
    position: { x: 400, y: 135 },
    type: "featureScheduled",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
  },
  {
    id: "9",
    position: { x: 400, y: 315 },
    type: "featureShipped",
    data: {
      label: "SNARK for Verkle proofs",
      topNode: true,
      leftNode: true,
      rightNode: true,
      bottomNode: true,
    },
  },
]
const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--success))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--success))" },
  },
]

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
          nodes: initialNodes,
          edges: initialEdges,
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
          nodes: initialNodes,
          edges: initialEdges,
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
          nodes: initialNodes,
          edges: initialEdges,
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
          nodes: initialNodes,
          edges: initialEdges,
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
          nodes: initialNodes,
          edges: initialEdges,
        },
      },
    },
  ]
}
