import { MAIN_CONTENT_ID } from "@/lib/constants"

import { BaseLink } from "./ui/Link"

export const SkipLink = ({ children }: { children: string }) => (
  <div className="bg-primary-low-contrast focus-within:p-4">
    <BaseLink
      href={"#" + MAIN_CONTENT_ID}
      className="absolute -top-14 rounded border bg-primary px-4 py-2 leading-8 text-background no-underline hover:no-underline focus:static"
    >
      {children}
    </BaseLink>
  </div>
)
