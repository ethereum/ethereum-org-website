import React from "react"

import InfoBanner from "./InfoBanner"
import Translation from "./Translation"

const EnvWarningBanner = () => (
  <InfoBanner isWarning>
    <Translation id="page-tutorials-env-banner" />
  </InfoBanner>
)

export default EnvWarningBanner
