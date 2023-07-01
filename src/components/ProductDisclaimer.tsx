import React from "react"
import InfoBanner from "./InfoBanner"
import Translation from "./Translation"

const ProductDisclaimer = () => (
  <InfoBanner emoji="⚠️" isWarning>
    <Translation id="product-disclaimer" />
  </InfoBanner>
)

export default ProductDisclaimer
