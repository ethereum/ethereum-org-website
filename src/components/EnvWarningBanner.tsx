import React from "react"
import { FlexProps } from "@chakra-ui/react"
import InfoBanner from "./InfoBanner"
import Translation from "./Translation"

const EnvWarningBanner: React.FC<FlexProps> = ({ ...flexProps }) => (
  <InfoBanner isWarning {...flexProps}>
    <Translation id="page-tutorials-env-banner" />
  </InfoBanner>
)

export default EnvWarningBanner
