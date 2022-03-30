// Libraries
import React from "react"
import styled from "styled-components"

const Content = styled.div`
  margin-bottom: 1.45rem;
`

const ListItem = styled.div`
  padding: 0.25rem 0;
  display: flex;
`

const NumberCircle = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  line-height: 35px;
  text-align: center;
  background: ${(props) => props.theme.colors.grayBackground};
`

const Data = styled.div`
  height: 35px;
  line-height: 35px;
  margin-left: 0.5rem;
`

const OrderedList = ({ listData }) => {
  return (
    <Content>
      {listData.map((data, idx) => {
        return (
          <ListItem>
            <NumberCircle>{idx + 1}</NumberCircle>
            <Data>{data}</Data>
          </ListItem>
        )
      })}
    </Content>
  )
}

export default OrderedList
