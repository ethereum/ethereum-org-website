import React from "react"
import styled from "styled-components"
import { typography, TypographyProps } from "styled-system"

import Translation from "./Translation"

export interface IProps extends TypographyProps {}

export const IndicatorSpan = styled.span<IProps>`
  ${typography}
`

const StatLoadingMessage: React.FC<IProps> = (props) => (
  <IndicatorSpan fontSize="2rem" {...props}>
    <Translation id="loading" />
  </IndicatorSpan>
)

export default StatLoadingMessage
