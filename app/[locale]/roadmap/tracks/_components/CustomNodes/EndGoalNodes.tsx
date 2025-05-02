"use client"

type EndGoalNodesProps = {
  data: {
    label: string
  }
}

const EndGoalNodes = ({ data }: EndGoalNodesProps) => {
  return (
    <div className="flex max-h-36 max-w-36 items-center justify-center rounded-full bg-primary p-8 text-center">
      <p className="font-inter text-sm text-body-inverse">{data.label}</p>
    </div>
  )
}

export default EndGoalNodes
