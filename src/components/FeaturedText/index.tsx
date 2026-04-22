import type { ChildOnlyProp } from "@/lib/types"

function FeaturedText({ children }: ChildOnlyProp) {
  return (
    <div className="border-primary -ms-4 border border-dashed ps-4">
      {children}
    </div>
  )
}

export default FeaturedText
