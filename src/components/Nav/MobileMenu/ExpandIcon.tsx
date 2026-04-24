import { Minus, Plus } from "lucide-react"

const ExpandIcon = () => (
  <>
    <Minus className="group-hover/menu:text-primary-hover hidden size-6 stroke-[3] p-1 group-data-[state=open]/menu:block" />

    <Plus className="group-hover/menu:text-primary-hover block size-6 stroke-[3] p-1 group-data-[state=open]/menu:hidden" />
  </>
)

export default ExpandIcon
