// Libraries
import React from "react"
import styled from "styled-components"

// Components
import Icon from "./Icon"

// Styles
const Item = styled.div`
  display: flex;
  width: 100%;
  padding: 0.5rem 0;
  align-items: center;
`

const StyledIcon = styled(Icon)`
  padding-right: 0.75rem;
`

const SocialListItem = ({ children, socialIcon }) => {
  return (
    <Item>
      <div>
        <StyledIcon name={socialIcon} size={"2.5rem"} color={true} />
      </div>
      <div>{children}</div>
    </Item>
  )
}

export default SocialListItem
