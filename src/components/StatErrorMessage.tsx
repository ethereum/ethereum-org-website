import React from "react"
import { TypographyProps } from "styled-system"

import Translation from "./Translation"
import { IndicatorSpan } from "./StatLoadingMessage"

export interface IProps extends TypographyProps {}

const StatErrorMessage: React.FC<IProps> = (props) => (
  <IndicatorSpan fontSize="2rem" {...props}>
    <Translation id="loading-error-refresh" />
  </IndicatorSpan>
)

export default StatErrorMessage
