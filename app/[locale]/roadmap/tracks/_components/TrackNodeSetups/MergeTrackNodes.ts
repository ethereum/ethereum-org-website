import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"
const mergeNodes: Node[] = [
  {
    id: "1",
    position: { x: 20, y: 150 },
    type: "taskShipped",
    data: {
      label: "Beacon chain launch",
      track: "Merge",
      rightNode: true,
    },
  },
  {
    id: "2",
    position: { x: 250, y: 150 },
    type: "taskShipped",
    data: {
      label: "Warmup fork (Altair)",
      track: "Merge",
      leftNode: true,
      rightNode: true,
    },
  },
  {
    id: "3",
    position: { x: 480, y: 123.5 },
    type: "featureShipped",
    data: {
      label: "Merge!\nNo more PoW",
      track: "Merge",
      leftNode: true,
      rightNode: true,
    },
  },
  {
    id: "4",
    position: { x: 720, y: 123.5 },
    type: "taskShipped",
    data: {
      label: "Distributed validators",
      track: "Merge",
    },
  },
  {
    id: "5",
    position: { x: 720, y: 250 },
    type: "taskShipped",
    data: {
      label: "Withdrawals",
      track: "Merge",
      leftNode: true,
    },
  },
  {
    id: "6",
    position: { x: 950, y: 150 },
    type: "taskResearch",
    data: {
      label: "Per-slot participant selection",
      track: "Merge",
      rightNode: true,
      percentage: 45,
    },
  },
  {
    id: "7",
    position: { x: 950, y: 50 },
    type: "taskResearch",
    data: {
      label: "SSF specification",
      track: "Merge",
      rightNode: true,
      percentage: 30,
    },
  },
  {
    id: "8",
    position: { x: 950, y: 290 },
    type: "taskIdea",
    data: {
      label: "Implementation",
      track: "Merge",
      rightNode: true,
    },
  },
  {
    id: "9",
    position: { x: 1175, y: 133.2 },
    type: "featureResearch",
    data: {
      label: "Single slot finality (SSF)",
      track: "Merge",
      topNode: true,
      leftNode: true,
      bottomNode: true,
    },
  },
  {
    id: "10",
    position: { x: 1175, y: -30 },
    type: "taskResearch",
    data: {
      label: "Secret leader election",
      track: "Merge",
      percentage: 70,
    },
  },
  {
    id: "11",
    position: { x: 1400, y: 250 },
    type: "taskResearch",
    data: {
      label: "Increase validator count",
      track: "Merge",
      percentage: 50,
    },
  },
  {
    id: "12",
    position: { x: 1420, y: 70 },
    type: "endGoal",
    data: {
      label: "Increase validator count",
      track: "Merge",
    },
  },
]

const mergeEdges: Edge[] = [
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
    id: "e3-4",
    source: "3",
    target: "5",
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
    id: "e6-9",
    source: "6",
    target: "9",
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
    id: "e7-9",
    source: "7",
    target: "9",
    targetHandle: "top",
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
    id: "e8-9",
    source: "8",
    target: "9",
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
]

export { mergeEdges, mergeNodes }
