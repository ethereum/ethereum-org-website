"use client"

import { Handle, Position } from "@xyflow/react"

type TaskScheduledNodeProps = {
  data: {
    label: string
    topNode: boolean
    leftNode: boolean
    rightNode: boolean
    bottomNode: boolean
  }
}

const TaskScheduledNode = ({ data }: TaskScheduledNodeProps) => {
  const { topNode, leftNode, rightNode, bottomNode } = data

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
      <div className="z-0 flex w-44 max-w-44 flex-col items-center justify-center gap-2 rounded-lg border border-primary bg-primary-low-contrast px-8 py-3">
        <div className="text-center">
          <p className="text-xs font-bold">{data.label}</p>
        </div>
        <div className="rounded-full bg-warning px-2 py-1">
          <p className="text-xs">SCHEDULED</p>
        </div>
      </div>
    </>
  )
}

export default TaskScheduledNode
