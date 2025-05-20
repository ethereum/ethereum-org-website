"use client"

import { Handle, Position } from "@xyflow/react"

type FeatureResearchNodeProps = {
  data: {
    label: string
    topNode: boolean
    leftNode: boolean
    rightNode: boolean
    bottomNode: boolean
  }
}

const FeatureResearchNode = ({ data }: FeatureResearchNodeProps) => {
  const { topNode, leftNode, rightNode, bottomNode } = data

  return (
    <>
      {topNode && (
        <Handle
          id="top"
          type="target"
          position={Position.Top}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableStart={true}
          isConnectableEnd={true}
        />
      )}
      {topNode && (
        <Handle
          id="top-source"
          type="source"
          position={Position.Top}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
          }}
          isConnectable={true}
          isConnectableStart={true}
          isConnectableEnd={true}
        />
      )}
      {leftNode && (
        <Handle
          id="left"
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
          id="right"
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
          id="bottom"
          type="target"
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
      <div className="z-0 flex w-44 max-w-44 flex-col items-center justify-center gap-2 rounded-lg border border-primary bg-primary-low-contrast p-8">
        <div className="text-center">
          <p className="text-md font-bold">{data.label}</p>
        </div>
        <div className="rounded-full bg-background-medium px-2 py-1">
          <p className="text-xs">RESEARCH</p>
        </div>
      </div>
    </>
  )
}

export default FeatureResearchNode
