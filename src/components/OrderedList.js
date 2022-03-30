// Libraries
import React from "react"
import styled from "styled-components"

//Styles
const Content = styled.div`
  margin-bottom: 1.45rem;
`

const ListItem = styled.div`
  padding: 0.25rem 0;
  display: flex;
`

const NumberCircle = styled.div`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 50%;
  line-height: ${({ size }) => size};
  text-align: center;
  background: ${({ theme }) => theme.colors.grayBackground};
`

const Data = styled.div`
  height: ${({ size }) => size};
  line-height: ${({ size }) => size};
  margin-left: 0.5rem;
`

// listData should be a list of strings, or HTML components
// ex: [<p>string<p>] or ['string']
const OrderedList = ({ listData, size = "35px", className }) => {
  return (
    <Content className={className}>
      {listData.map((data, idx) => {
        return (
          <ListItem>
            <NumberCircle size={size}>{idx + 1}</NumberCircle>
            <Data size={size}>{data}</Data>
          </ListItem>
        )
      })}
    </Content>
  )
}

export default OrderedList
