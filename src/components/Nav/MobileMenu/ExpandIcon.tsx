import { Minus, Plus } from "lucide-react"

const ExpandIcon = () => (
  <>
    <Minus className="hidden size-6 stroke-[3] p-1 group-hover:text-primary-hover group-data-[state=open]:block" />

    <Plus className="block size-6 stroke-[3] p-1 group-hover:text-primary-hover group-data-[state=open]:hidden" />
  </>
)

export default ExpandIcon
