import { Minus, Plus } from "lucide-react"

type ExpandIconProps = {
  isOpen: boolean
}

const ExpandIcon = ({ isOpen }: ExpandIconProps) =>
  isOpen ? (
    <Minus className="size-6 stroke-[3] p-1 group-hover:text-primary-hover" />
  ) : (
    <Plus className="size-6 stroke-[3] p-1 group-hover:text-primary-hover" />
  )

export default ExpandIcon
