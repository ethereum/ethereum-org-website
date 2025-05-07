import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"

const vergeNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 400 },
    type: "taskShipped",
    data: {
      label: "Most serious EVM DoS issues solved",
      track: "Verge",
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
    id: "2",
    position: { x: 220, y: 390 },
    type: "taskShipped",
    data: {
      label: "Basic light client support (sync committees)",
      track: "Verge",
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
    id: "3",
    position: { x: 460, y: 400 },
    type: "taskResearch",
    data: {
      label: "SNARK-based light clients",
      track: "Verge",
      leftNode: true,
      rightNode: true,
      percentage: 80,
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
    id: "4",
    position: { x: 700, y: 390 },
    type: "taskIdea",
    data: {
      label: "SNARK for consensus state transition",
      track: "Verge",
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
  },
  {
    id: "5",
    position: { x: 700, y: 248.5 },
    type: "taskIdea",
    data: {
      label: "SNARK for Verkle proofs",
      track: "Verge",
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
  },
  {
    id: "6",
    position: { x: 460, y: 235 },
    type: "featureResearch",
    data: {
      label: "Verkle trees",
      track: "Verge",
      leftNode: true,
      rightNode: true,
      topNode: true,
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
    id: "7",
    position: { x: 220, y: 248.5 },
    type: "taskResearch",
    data: {
      label: "Transition spec + impl",
      track: "Verge",
      rightNode: true,
      percentage: 80,
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
    id: "8",
    position: { x: 220, y: 100 },
    type: "taskResearch",
    data: {
      label: "Verkle trees spec + impl",
      track: "Verge",
      rightNode: true,
      percentage: 80,
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
    position: { x: 460, y: 100 },
    type: "taskResearch",
    data: {
      label: "Code chunking + gas cost update",
      track: "Verge",
      bottomNode: true,
      percentage: 50,
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
    id: "10",
    position: { x: 700, y: 120 },
    type: "taskIdea",
    data: {
      label: "SNARK for L1 EVM",
      track: "Verge",
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
  },
  {
    id: "11",
    position: { x: 950, y: 209 },
    type: "featureResearch",
    data: {
      label: "Fully SNARKed Ethereum",
      track: "Verge",
      rightNode: true,
      leftNode: true,
      topNode: true,
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
    id: "12",
    position: { x: 700, y: 0 },
    type: "track",
    data: {
      label: "The Scourge",
      sublabel: "Improve operator node usability",
      track: "Scourge",
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
  },
  {
    id: "13",
    position: { x: 950, y: 430 },
    type: "taskResearch",
    data: {
      label: "SNARK / STARK ASICs",
      track: "Verge",
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
    position: { x: 1180, y: 80 },
    type: "taskIdea",
    data: {
      label: "Explore EVM verification precompile",
      track: "Verge",
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
    id: "15",
    position: { x: 1200, y: 226 },
    type: "endGoal",
    data: {
      label: "Quantum-safe SNARKs (eg. STARKs)",
      track: "Verge",
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
]

const vergeEdges: Edge[] = [
  {
    id: "e2-3",
    source: "2",
    target: "3",
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
    id: "e3-4",
    source: "3",
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
    id: "e7-6",
    source: "7",
    target: "6",
    targetHandle: "left",
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
    id: "e8-6",
    source: "8",
    target: "6",
    targetHandle: "left",
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
    id: "e9-6",
    source: "9",
    target: "6",
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
    id: "e10-11",
    source: "10",
    target: "11",
    targetHandle: "left",
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
    id: "e5-11",
    source: "5",
    target: "11",
    targetHandle: "left",
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
    id: "e4-11",
    source: "4",
    target: "11",
    targetHandle: "left",
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
    id: "e11-12",
    source: "11",
    sourceHandle: "top-source",
    target: "12",
    targetHandle: "right",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))", strokeDasharray: "5,5" },
  },
  {
    id: "e6-12",
    source: "6",
    sourceHandle: "right",
    target: "12",
    targetHandle: "left",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))", strokeDasharray: "5,5" },
  },
  {
    id: "e6-5",
    source: "6",
    sourceHandle: "right",
    target: "5",
    targetHandle: "left",
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
    id: "e11-15",
    source: "11",
    sourceHandle: "right",
    target: "15",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
]

export { vergeEdges, vergeNodes }
