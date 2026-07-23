import { cn } from "@/lib/utils/cn"

const styles = [
  "bg-tint-accent-c border-accent-c/10",
  "bg-tint-accent-b border-accent-b/10",
  "bg-tint-accent-a border-accent-a/10",
].map((className) => cn(className, "bg-background gradient-reverse"))

// duplicate 1 2 3, 1 2 3 to fix mobile slider bug where styles are not applied
const adoptionStyles = Array.from({ length: 2 }).flatMap(() => styles)

export { adoptionStyles }
