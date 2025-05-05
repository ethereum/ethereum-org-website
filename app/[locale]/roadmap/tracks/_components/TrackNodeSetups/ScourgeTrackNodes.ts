import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"

const scourgeNodes: Node[] = [
  {
    id: "group-1",
    position: { x: 20, y: 20 },
    style: {
      width: 1390,
      height: 356,
      border: "1px solid hsla(var(--primary))",
      borderRadius: "10px",
      backgroundColor: "#B38DF01A",
    },
    type: "group",
    data: {
      label: "MEV Track",
    },
  },
  {
    id: "group-2",
    position: { x: 300, y: 410 },
    style: {
      width: 815,
      height: 164,
      border: "1px solid hsla(var(--primary))",
      borderRadius: "10px",
      backgroundColor: "#B38DF01A",
    },
    type: "group",
    data: {
      label: "Staking economics / experience track",
    },
  },
  {
    id: "1",
    position: { x: 40, y: 160 },
    type: "taskShipped",
    data: {
      label: "Extra-protocol MEV markets",
      rightNode: true,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "2",
    position: { x: 270, y: 169.5 },
    type: "taskResearch",
    data: {
      label: "Explore ePBS",
      leftNode: true,
      rightNode: true,
      percentage: 50,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "3",
    position: { x: 270, y: 70 },
    type: "taskResearch",
    data: {
      label: "Inclusion lists",
      rightNode: true,
      percentage: 90,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "4",
    position: { x: 500, y: 160 },
    type: "taskResearch",
    data: {
      label: "Explore MEV burn in ePBS",
      leftNode: true,
      rightNode: true,
      percentage: 30,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "5",
    position: { x: 720, y: 20 },
    type: "taskResearch",
    data: {
      label: "Distributed block building",
      rightNode: true,
      percentage: 20,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "6",
    position: { x: 720, y: 240 },
    type: "taskResearch",
    data: {
      label: "Explore execution tickets",
      rightNode: true,
      percentage: 20,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "7",
    position: { x: 950, y: 80 },
    type: "featureResearch",
    data: {
      label: "Explore execution tickets",
      leftNode: true,
      percentage: 20,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "8",
    position: { x: 1175, y: 40 },
    type: "taskResearch",
    data: {
      label: "App-layer MEV minimization",
      percentage: 20,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "9",
    position: { x: 1175, y: 200 },
    type: "taskResearch",
    data: {
      label: "Explore pre-confirmations",
      percentage: 20,
    },
    parentId: "group-1",
    extent: "parent" as const,
  },
  {
    id: "10",
    position: { x: 20, y: 45 },
    type: "taskScheduled",
    data: {
      label: "Raise max effective balance",
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "11",
    position: { x: 220, y: 45 },
    type: "taskResearch",
    data: {
      label: "Improve node operator usability",
      percentage: 80,
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "12",
    position: { x: 420, y: 45 },
    type: "taskResearch",
    data: {
      label: "Explore total stake capping",
      percentage: 20,
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
  {
    id: "13",
    position: { x: 620, y: 25 },
    type: "taskResearch",
    data: {
      label: "Explore solutions to liquid staking centralization",
      percentage: 60,
    },
    parentId: "group-2",
    extent: "parent" as const,
  },
]

const scourgeEdges: Edge[] = [
  {
    id: "1-2",
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
  {
    id: "2-4",
    source: "2",
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
    id: "3-7",
    source: "3",
    target: "7",
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
    id: "4-7",
    source: "4",
    target: "7",
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
    id: "5-7",
    source: "5",
    target: "7",
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
    id: "6-7",
    source: "6",
    target: "7",
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

export { scourgeEdges, scourgeNodes }
