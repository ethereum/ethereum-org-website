import type { MDXRemoteProps } from "next-mdx-remote/rsc"
import { MDXRemote } from "next-mdx-remote/rsc"

import { htmlElements } from "@/components/MdComponents"

interface TranscriptContentProps {
  source: string
}

const TranscriptContent = ({ source }: TranscriptContentProps) => {
  return (
    <MDXRemote
      source={source}
      components={{
        ...(htmlElements as unknown as MDXRemoteProps["components"]),
        h1: htmlElements.h2,
      }}
    />
  )
}

export default TranscriptContent
