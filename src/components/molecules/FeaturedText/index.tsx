import type { ChildOnlyProp } from "@/lib/types"

function FeaturedText({ children }: ChildOnlyProp) {
  return (
    <div className="-ms-4 border border-dashed border-primary ps-4">
      {children}
    </div>
  )
}

export default FeaturedText
