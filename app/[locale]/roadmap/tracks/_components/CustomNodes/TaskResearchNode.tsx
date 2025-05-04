"use client"

import { Handle, Position } from "@xyflow/react"

type TaskResearchNodeProps = {
  data: {
    label: string
    percentage: number
    topNode: boolean
    leftNode: boolean
    rightNode: boolean
    bottomNode: boolean
  }
}

const TaskResearchNode = ({ data }: TaskResearchNodeProps) => {
  const { topNode, leftNode, rightNode, bottomNode, percentage } = data

  return (
    <>
      {topNode && (
        <Handle
          type="target"
          position={Position.Top}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableEnd={true}
        />
      )}
      {leftNode && (
        <Handle
          type="target"
          position={Position.Left}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableEnd={true}
        />
      )}
      {rightNode && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableStart={true}
        />
      )}
      {bottomNode && (
        <Handle
          type="source"
          position={Position.Bottom}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableStart={true}
        />
      )}
      <div className="relative z-0 flex w-44 max-w-44 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-primary px-8 py-3">
        {/* Progress background */}
        <div
          className="absolute left-0 top-0 z-0 h-full bg-primary-low-contrast"
          style={{
            width: `${percentage}%`,
          }}
        />
        <div className="z-10 text-center">
          <p className="text-xs font-bold">{data.label}</p>
        </div>
        <div className="z-10 rounded-full bg-background-medium px-2 py-1">
          <p className="text-xs">RESEARCH</p>
        </div>
      </div>
    </>
  )
}

export default TaskResearchNode
