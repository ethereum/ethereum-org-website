import React from "react"
import { FlexProps } from "@chakra-ui/react"
import InfoBanner from "./InfoBanner"
import Translation from "./Translation"

export interface IProps extends FlexProps {}

const EnvWarningBanner: React.FC<IProps> = () => (
  <InfoBanner isWarning>
    <Translation id="page-tutorials-env-banner" />
  </InfoBanner>
)

export default EnvWarningBanner
