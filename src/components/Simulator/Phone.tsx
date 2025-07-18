import type { ChildOnlyProp } from "@/lib/types"

export const Phone = ({ children }: ChildOnlyProp) => (
  <figure className="mx-auto min-w-[min(100%,322px)] max-w-[min(100%,322px)]">
    {/* Phone frame */}
    <div className="relative z-0 h-[480px] max-h-full w-full overflow-hidden rounded-3xl border-[5px] border-body-medium bg-background md:h-[600px]">
      {children}
    </div>
    {/* Phone drop shadow */}
    <div className="relative -z-[1] -mb-6 h-6 w-full rounded-full bg-black opacity-40 blur-[14px] filter" />
  </figure>
)
