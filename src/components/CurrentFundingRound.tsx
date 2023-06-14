import React from "react"
import { Text } from "@chakra-ui/react"
import type { TextProps } from "@chakra-ui/react"
import Link from "./Link"

type RoundInterface = "explorer" | "builder"

interface IProps extends TextProps {
  roundInterface: RoundInterface
}

const CurrentFundingRound: React.FC<IProps> = ({
  children,
  roundInterface,
}) => {
  const contractAddress = process.env.GATSBY_CURRENT_FUNDING_ROUND
  const href =
    roundInterface === "explorer"
      ? `https://explorer.gitcoin.co/#/round/10/${contractAddress}`
      : roundInterface === "builder"
      ? `https://builder.gitcoin.co/#/chains/10/rounds/${contractAddress}`
      : ""
  const addressRegEx = /^0x[0-9a-f]{40}$/
  if (!contractAddress || !addressRegEx.test(contractAddress) || !href)
    return (
      <em>
        <Text as="span" textStyle="italic">
          (no funding round currently available)
        </Text>
      </em>
    )
  return <Link href={href}>{children}</Link>
}

export default CurrentFundingRound
