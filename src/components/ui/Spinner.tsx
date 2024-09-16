import type { IconType } from "react-icons"
import { ImSpinner2 } from "react-icons/im"

import { cn } from "@/lib/utils/cn"

const Spinner: IconType = ({ className, ...props }) => (
  <ImSpinner2 className={cn("animate-spin text-3xl", className)} {...props} />
)

export default Spinner
