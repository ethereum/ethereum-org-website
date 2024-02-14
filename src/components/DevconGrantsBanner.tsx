import Emoji from "react-emoji-render"
import { Text } from "@chakra-ui/react"

import DismissableBanner from "./Banners/DismissableBanner"
import Link from "./Link"

interface IProps {
  pathname: string
}

const DevconGrantsBanner: React.FC<IProps> = ({ pathname }) => {
  if (pathname.includes("community") && pathname.includes("events")) {
    return (
      <DismissableBanner storageKey="devconGrants">
        <Text m={0}>
          The Road to Devcon Grants support Ethereum education initiatives in
          and close to Southeast Asia <Emoji text="🌏🦄" />{" "}
          Learn more{" "}
          <Link to="https://esp.ethereum.foundation/devcon-grants">here.</Link>
        </Text>
      </DismissableBanner>
    )
  }

  return null
}

export default DevconGrantsBanner
