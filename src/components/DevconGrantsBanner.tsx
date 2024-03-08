import { Text } from "@chakra-ui/react"

import DismissableBanner from "@/components/Banners/DismissableBanner"
import Emoji from "@/components/Emoji"
import Link from "@/components/Link"

type DevconGrantsBannerProps = {
  pathname: string
}

const DevconGrantsBanner = ({ pathname }: DevconGrantsBannerProps) => {
  if (pathname.includes("community") && pathname.includes("events")) {
    return (
      <DismissableBanner storageKey="devconGrants">
        <Text m={0}>
          The Road to Devcon Grants support Ethereum education initiatives in
          and close to Southeast Asia <Emoji text="🦄" /> <Emoji text="🌏" />{" "}
          Learn more{" "}
          <Link href="https://esp.ethereum.foundation/devcon-grants">
            here.
          </Link>
        </Text>
      </DismissableBanner>
    )
  }

  return null
}

export default DevconGrantsBanner
