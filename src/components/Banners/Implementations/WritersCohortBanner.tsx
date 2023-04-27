import React from "react"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "../DismissableBanner"
import Link from "../../Link"

const WritersCohortBanner = () => {
  if (
    typeof window !== `undefined` &&
    window.location.pathname.includes("contributing")
  ) {
    return (
      <DismissableBanner storageKey="writersCohort">
        <Text m={0}>
          Join the first-ever ethereum.org Writers Cohort, starting May 11th.{" "}
          <Link to="https://ethereumwriterscohort.carrd.co/">
            Sign up here!
          </Link>
        </Text>
      </DismissableBanner>
    )
  }

  return null
}

export default WritersCohortBanner
