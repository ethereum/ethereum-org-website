import React from "react"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "../DismissableBanner"
import Link from "../../Link"

import { supportedLanguages } from "../../../utils/languages"

interface IProps {
  pathname: string
}

const WritersCohortBanner: React.FC<IProps> = ({ pathname }) => {
  const pattern = supportedLanguages.join("|")
  const strippedPathname = pathname.replace(new RegExp(`^/(${pattern})/`), "/")

  if (
    pathname.includes("contributing") ||
    pathname.includes("community") ||
    strippedPathname === "/"
  ) {
    return (
      <DismissableBanner storageKey="writersCohort">
        <Text m={0}>
          🎉 Join the 2nd edition of ethereum.org's Writers Cohort, starting
          October 20th.{" "}
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
