import React from "react"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "./DismissableBanner"
import Link from "../Link"

export const TranslatathonBanner = () => {
  return (
    <DismissableBanner storageKey="translatathon">
      <Text m={0}>
        ✨ Join the first Ethereum.org Translatathon: help translate our website
        and compete for prizes in a hackathon-style online event.{" "}
        <Link to="/contributing/translation-program/translatathon">
          Apply until August 15th
        </Link>
        .
      </Text>
    </DismissableBanner>
  )
}

export default TranslatathonBanner
