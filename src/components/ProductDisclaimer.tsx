import React from "react"
import InfoBanner from "./InfoBanner"

const ProductDisclaimer = () => (
  <InfoBanner emoji="⚠️" isWarning>
    Products and services are listed as a convenience for the Ethereum
    community. Inclusion of a product or service{" "}
    <strong>does not represent an endorsement</strong> from the ethereum.org
    website team, or the Ethereum Foundation.
  </InfoBanner>
)

export default ProductDisclaimer
