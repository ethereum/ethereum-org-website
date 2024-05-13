import dynamic from "next/dynamic"
import type { BaseProps } from "react-emoji-render"
import { Box, type BoxProps } from "@chakra-ui/react"

import { IS_DEV } from "@/lib/utils/env"

const Twemoji = dynamic(
  () => import("react-emoji-render").then((mod) => mod.Twemoji),
  { ssr: false }
)

export type EmojiProps = Omit<BoxProps, "children"> & BaseProps

const Emoji = (props: EmojiProps) => (
  <Box
    as={Twemoji}
    // The emoji lib is switching the protocol based on the existence of the
    // `location` object. That condition in DEV causes hydration mismatches.
    // https://github.com/tommoor/react-emoji-render/blob/master/src/index.js#L8
    // Hence, here we are defining how we want it to handle the protocol to
    // avoid differences in SSR
    options={{ protocol: IS_DEV ? "http" : "https" }}
    svg
    display="inline-block"
    lineHeight="none"
    sx={{
      "& > img": {
        margin: "0 !important",
        display: "initial",
      },
    }}
    {...props}
  />
)

export default Emoji
