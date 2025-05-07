import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"

const splurgeNodes: Node[] = [
  {
    id: "group-1",
    position: { x: 20, y: 20 },
    style: {
      width: 615,
      height: 150,
      border: "1px solid hsla(var(--primary))",
      borderRadius: "10px",
      backgroundColor: "#B38DF01A",
    },
    type: "group",
    data: {
      label: "EVM Improvements Track",
      rightNode: true,
    },
  },
  {
    id: "1",
    position: { x: 20, y: 40 },
    type: "taskResearch",
    data: {
      label: "EOF",
      track: "Splurge",
      percentage: 90,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "2",
    position: { x: 220, y: 30 },
    type: "taskResearch",
    data: {
      label: "Big modular arithmetic",
      track: "Splurge",
      percentage: 75,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "3",
    position: { x: 420, y: 30 },
    type: "taskResearch",
    data: {
      label: "Futher EVM improvements",
      track: "Splurge",
      percentage: 30,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "4",
    position: { x: 700, y: 19 },
    type: "featureResearch",
    data: {
      label: "Endgame EVM",
      track: "Splurge",
      leftNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "group-2",
    position: { x: 20, y: 214 },
    style: {
      width: 615,
      height: 150,
      border: "1px solid hsla(var(--primary))",
      borderRadius: "10px",
      backgroundColor: "#B38DF01A",
    },
    type: "group",
    data: {
      label: "Account Abstraction Track",
      rightNode: true,
      leftNode: true,
    },
  },
  {
    id: "5",
    position: { x: 20, y: 40 },
    type: "taskShipped",
    data: {
      label: "ERC-4337 rollout",
      track: "Splurge",
      rightNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      releaseLabel: "TODO",
      releasePageURL: "/",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "6",
    position: { x: 220, y: 30 },
    type: "taskScheduled",
    data: {
      label: "Voluntary EOA conversion",
      track: "Splurge",
      leftNode: true,
      rightNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "7",
    position: { x: 420, y: 30 },
    type: "taskScheduled",
    data: {
      label: "In-protocol enshrining",
      track: "Splurge",
      leftNode: true,
      rightNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "8",
    position: { x: 700, y: 200 },
    type: "featureScheduled",
    data: {
      label: "Endgame account abstraction",
      track: "Splurge",
      leftNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "9",
    position: { x: -220, y: 239 },
    type: "taskShipped",
    data: {
      label: "EIP-4337 specification",
      track: "Splurge",
      rightNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      releaseLabel: "TODO",
      releasePageURL: "/",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "10",
    position: { x: 700, y: 410 },
    type: "taskResearch",
    data: {
      label: "Endgame EIP-1559",
      track: "Splurge",
      leftNode: true,
      percentage: 30,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "11",
    position: { x: 460, y: 410 },
    type: "taskShipped",
    data: {
      label: "EIP-1559",
      track: "Splurge",
      rightNode: true,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      releaseLabel: "TODO",
      releasePageURL: "/",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "12",
    position: { x: 930, y: 240 },
    type: "taskResearch",
    data: {
      label: "Explore delay-encrypted mempools",
      track: "Splurge",
      percentage: 10,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "13",
    position: { x: 930, y: 390 },
    type: "taskResearch",
    data: {
      label: "VDFs",
      track: "Splurge",
      percentage: 30,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "14",
    position: { x: 930, y: 90 },
    type: "taskResearch",
    data: {
      label: "Explore deep-crypto (eg. obfuscation)",
      track: "Splurge",
      percentage: 10,
      description: ["TODO: Add description", "TODO: Add description"],
      releaseDate: "TODO",
      benefits: ["TODO: Add benefits", "TODO: Add benefits"],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
]

const splurgeEdges: Edge[] = [
  {
    id: "e-group-1-4",
    source: "group-1",
    sourceHandle: "right",
    target: "4",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
  {
    id: "e-group-2-8",
    source: "group-2",
    sourceHandle: "right",
    target: "8",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
  {
    id: "e-9-group-2",
    source: "9",
    target: "group-2",
    targetHandle: "left-target",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--success))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--success))" },
  },
  {
    id: "e-11-10",
    source: "11",
    target: "10",
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

export { splurgeEdges, splurgeNodes }
