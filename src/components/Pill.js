import React from "react"
import styled from "styled-components"

const Primary = styled.div`
  display: flex;
  background: ${(props) =>
    props.color
      ? props.theme.colors[props.color]
      : props.theme.colors.primary100};
  color: ${(props) => props.theme.colors.black300};
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
`
const Secondary = styled.div`
  display: flex;
  border: 1px solid ${(props) => props.theme.colors.primary100};
  color: ${(props) => props.theme.colors.text};
  text-transform: uppercase;
  text-align: center;
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
`

const Pill = ({ children, className, isSecondary, color }) => {
  return isSecondary ? (
    <Secondary className={className}>{children}</Secondary>
  ) : (
    <Primary color={color} className={className}>
      {children}
    </Primary>
  )
}

export default Pill
