import { Minus, Plus } from "lucide-react"

const ExpandIcon = () => (
  <>
    <Minus className="hidden size-6 stroke-[3] p-1 group-hover/menu:text-primary-hover group-data-[state=open]/menu:block" />

    <Plus className="block size-6 stroke-[3] p-1 group-hover/menu:text-primary-hover group-data-[state=open]/menu:hidden" />
  </>
)

export default ExpandIcon
