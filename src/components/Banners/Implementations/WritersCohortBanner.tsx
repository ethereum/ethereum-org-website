import React from "react"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "../DismissableBanner"

const WritersCohortBanner = () => {
  if (
    typeof window !== `undefined` &&
    window.location.pathname.includes("contributing")
  ) {
    return (
      <DismissableBanner storageKey="writersCohort">
        <Text m={0}>Hello world</Text>
      </DismissableBanner>
    )
  }

  return null
}

export default WritersCohortBanner
