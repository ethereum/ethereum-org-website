import { SkeletonLines } from "@/components/ui/skeleton"

const SandwichAttackLoading = () => (
  <div className="rounded-base border p-4 md:p-6">
    <SkeletonLines noOfLines={8} />
  </div>
)

export default SandwichAttackLoading
