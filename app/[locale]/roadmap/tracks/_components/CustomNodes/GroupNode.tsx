type GroupNodeProps = {
  data: {
    label: string
  }
}

const GroupNode = ({ data }: GroupNodeProps) => {
  return (
    <div className="relative h-full w-full border-primary">
      <p className="absolute m-0 font-bold">{data.label}</p>
    </div>
  )
}

export default GroupNode
