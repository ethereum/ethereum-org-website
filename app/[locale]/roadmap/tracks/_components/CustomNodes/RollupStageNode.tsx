"use client"

import { Handle, Position } from "@xyflow/react"

type RollupStageNodeProps = {
  data: {
    label: string
    stage: string
    percentage: number
    rightNode: boolean
  }
}

const RollupStageNode = ({ data }: RollupStageNodeProps) => {
  const { rightNode, percentage, stage, label } = data

  return (
    <>
      {rightNode && (
        <Handle
          type="source"
          position={Position.Right}
          style={{
            width: "14px",
            height: "14px",
            border: "2px solid hsla(var(--primary))",
            backgroundColor: "hsla(var(--background))",
            zIndex: 10,
          }}
          isConnectable={true}
          isConnectableStart={true}
        />
      )}
      <div className="relative z-0 flex w-80 max-w-80 flex-row items-center justify-end gap-2 overflow-hidden rounded-full border border-primary p-2">
        <div
          className="absolute left-0 top-0 z-0 h-full bg-primary-low-contrast"
          style={{
            width: `${percentage}%`,
          }}
        />
        <div className="z-10 text-center">
          <p className="text-xs font-bold">{label}</p>
        </div>
        <div className="z-10 rounded-full bg-primary-high-contrast px-2 py-1">
          <p className="text-xs text-body-inverse">{stage}</p>
        </div>
      </div>
    </>
  )
}

export default RollupStageNode
