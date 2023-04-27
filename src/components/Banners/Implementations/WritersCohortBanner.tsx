import React from "react"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "../DismissableBanner"
import Link from "../../Link"

interface IProps {
  pathname: string
}

const WritersCohortBanner = ({ pathname }) => {
  if (pathname.includes("contributing") || pathname.includes("community")) {
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
