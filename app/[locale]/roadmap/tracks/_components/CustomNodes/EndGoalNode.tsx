"use client"

import { Handle, Position } from "@xyflow/react"

type EndGoalNodeProps = {
  data: {
    label: string
    leftNode?: boolean
  }
}

const EndGoalNode = ({ data }: EndGoalNodeProps) => {
  return (
    <>
      {data.leftNode && (
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
      <div className="flex h-36 max-h-36 w-36 max-w-36 items-center justify-center rounded-full bg-primary p-4 text-center">
        <p className="font-inter text-[14px] font-bold leading-[160%] text-body-inverse">
          {data.label}
        </p>
      </div>
    </>
  )
}

export default EndGoalNode
