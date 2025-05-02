"use client"

type EndGoalNodesProps = {
  data: {
    label: string
  }
}

const EndGoalNodes = ({ data }: EndGoalNodesProps) => {
  return (
    <div className="flex h-36 max-h-36 w-36 max-w-36 items-center justify-center rounded-full bg-primary p-4 text-center">
      <p className="font-inter text-[14px] font-bold leading-[160%] text-body-inverse">
        {data.label}
      </p>
    </div>
  )
}

export default EndGoalNodes
