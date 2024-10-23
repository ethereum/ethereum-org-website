import DismissableBanner from "@/components/Banners/DismissableBanner"
import Emoji from "@/components/Emoji"

import { BaseLink } from "./ui/Link"

type DevconGrantsBannerProps = {
  pathname: string
}

const DevconGrantsBanner = ({ pathname }: DevconGrantsBannerProps) => {
  if (pathname.includes("community") && pathname.includes("events")) {
    return (
      <DismissableBanner storageKey="devconGrants">
        <p>
          The Road to Devcon Grants support Ethereum education initiatives in
          and close to Southeast Asia <Emoji text="🦄" /> <Emoji text="🌏" />{" "}
          Learn more{" "}
          <BaseLink href="https://esp.ethereum.foundation/devcon-grants">
            here.
          </BaseLink>
        </p>
      </DismissableBanner>
    )
  }

  return null
}

export default DevconGrantsBanner
