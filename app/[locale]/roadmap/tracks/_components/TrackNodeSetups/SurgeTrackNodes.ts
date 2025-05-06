import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"

const surgeNodes: Node[] = [
  {
    id: "1",
    position: { x: 20, y: 150 },
    type: "taskShipped",
    data: {
      label: "EIP-4844 specification",
      track: "Surge",
      rightNode: true,
    },
  },
  {
    id: "2",
    position: { x: 250, y: 150 },
    type: "taskShipped",
    data: {
      label: "EIP-4844 implementation",
      track: "Surge",
      leftNode: true,
      rightNode: true,
    },
  },
  {
    id: "3",
    position: { x: 480, y: 123.5 },
    type: "featureShipped",
    data: {
      label: "Basic rollup scaling",
      track: "Surge",
      leftNode: true,
      bottomNode: true,
    },
  },
  {
    id: "4",
    position: { x: 700, y: 100 },
    type: "taskResearch",
    data: {
      label: "peerDAS",
      track: "Surge",
      rightNode: true,
      percentage: 65,
    },
  },
  {
    id: "5",
    position: { x: 700, y: 200 },
    type: "taskResearch",
    data: {
      label: "Efficient DA self-healing",
      track: "Surge",
      rightNode: true,
      percentage: 25,
    },
  },
  {
    id: "6",
    position: { x: 940, y: 100 },
    type: "featureResearch",
    data: {
      label: "Full rollup scaling",
      track: "Surge",
      leftNode: true,
      bottomNode: true,
    },
  },
  {
    id: "7",
    position: { x: 1165, y: 100 },
    type: "endGoal",
    data: {
      label: "Q-safe, no setup commitments",
      track: "Surge",
    },
  },
  {
    id: "8",
    position: { x: 1150, y: 260 },
    type: "taskResearch",
    data: {
      label: "Improve cross-rollup standards + interop",
      track: "Surge",
      percentage: 25,
    },
  },
  {
    id: "9",
    position: { x: 555, y: 320 },
    type: "rollupStage",
    data: {
      label: "Optimistic rollup fraud provers",
      stage: "STAGE 0 & 1",
      track: "Surge",
      percentage: 65,
      rightNode: true,
    },
  },
  {
    id: "10",
    position: { x: 555, y: 380 },
    type: "rollupStage",
    data: {
      label: "ZK-EVMs",
      stage: "STAGE 0",
      track: "Surge",
      percentage: 50,
      rightNode: true,
    },
  },
  {
    id: "11",
    position: { x: 1150, y: 440 },
    type: "track",
    data: {
      label: "The Verge",
      sublabel: "SNARK for L1 EVM",
      track: "Verge",
      topNode: true,
    },
  },
]

const surgeEdges: Edge[] = [
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
    id: "e4-6",
    source: "4",
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
    id: "e5-6",
    source: "5",
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
    id: "e9-6",
    source: "9",
    target: "6",
    targetHandle: "bottom",
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
    id: "e10-6",
    source: "10",
    target: "6",
    targetHandle: "bottom",
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
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))", strokeDasharray: "5,5" },
  },
]

export { surgeEdges, surgeNodes }
