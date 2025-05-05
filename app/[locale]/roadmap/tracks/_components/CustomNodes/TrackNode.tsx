"use client"

import { Handle, Position } from "@xyflow/react"

type TrackNodeProps = {
  data: {
    label: string
    sublabel: string
    topNode: boolean
    leftNode: boolean
    rightNode: boolean
    bottomNode: boolean
  }
}

const TrackNode = ({ data }: TrackNodeProps) => {
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
      <div className="z-0 flex w-44 max-w-44 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-primary px-3 py-4">
        <div className="text-center">
          <p className="text-xs font-bold">{data.label}</p>
          <p className="text-2xs">{data.sublabel}</p>
        </div>
      </div>
    </>
  )
}

export default TrackNode
