import { Handle, Position } from "@xyflow/react"

type GroupNodeProps = {
  data: {
    label: string
  }
}

const GroupNode = ({ data }: GroupNodeProps) => {
  return (
    <>
      <div className="relative h-full w-full border-primary">
        <p className="absolute m-0 font-bold">{data.label}</p>
      </div>
      <Handle
        id="left"
        type="source"
        position={Position.Left}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        isConnectable={true}
        isConnectableStart={true}
        isConnectableEnd={true}
      />
      <Handle
        id="left-target"
        type="target"
        position={Position.Left}
        style={{
          backgroundColor: "transparent",
          border: "none",
        }}
        isConnectable={true}
        isConnectableStart={true}
        isConnectableEnd={true}
      />
      <Handle
        id="right"
        type="source"
        position={Position.Right}
        style={{ backgroundColor: "transparent", border: "none" }}
        isConnectable={true}
        isConnectableStart={true}
        isConnectableEnd={true}
      />
    </>
  )
}

export default GroupNode
