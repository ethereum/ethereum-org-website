import { cn } from "@/lib/utils/cn"

/**
 * Keycap legend. Neutral on purpose: a row of these has to read as a keyboard,
 * not as a row of links, so it borrows the code surface rather than a brand
 * color. The heavier bottom border is the keycap's edge.
 */
const KBD = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
  <kbd
    className={cn(
      "inline-flex min-w-6 items-center justify-center rounded-[0.3em] border border-b-2 bg-background-highlight px-2 py-0.5 align-middle leading-none text-body-medium",
      className
    )}
    {...props}
  />
)

export default KBD
