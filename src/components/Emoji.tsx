import { ComponentProps } from "react"
import dynamic from "next/dynamic"

import { cn } from "@/lib/utils/cn"
import { IS_DEV } from "@/lib/utils/env"

const Twemoji = dynamic(
  () => import("react-emoji-render").then((mod) => mod.Twemoji),
  { ssr: false }
)

export type EmojiProps = ComponentProps<typeof Twemoji>

const Emoji = ({ className, ...props }: EmojiProps) => (
  <Twemoji
    // The emoji lib is switching the protocol based on the existence of the
    // `location` object. That condition in DEV causes hydration mismatches.
    // https://github.com/tommoor/react-emoji-render/blob/master/src/index.js#L8
    // Hence, here we are defining how we want it to handle the protocol to
    // avoid differences in SSR
    options={{ protocol: IS_DEV ? "http" : "https" }}
    svg
    className={cn("inline-block leading-none [&>img]:!m-0", className)}
    {...props}
  />
)

export default Emoji
