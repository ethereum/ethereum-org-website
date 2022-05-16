// Libraries
import React from "react"
import styled from "styled-components"

//Styles
const Content = styled.div`
  margin-bottom: 1.45rem;

  ol {
    list-style: none;
    counter-reset: li-counter;
    padding-left: 2rem;
    margin-bottom: 0;
  }
  ol li {
    margin: 0 0 1rem 0;
    counter-increment: li-counter;
    position: relative;
  }
  ol li::before {
    content: counter(li-counter);
    position: absolute;
    top: -2px; /* adjusts circle + number up and down */
    left: -3rem;
    width: ${({ size }) => (size ? size : "35px")};
    aspect-ratio: 1;
    height: 2rem;
    padding-top: 7px; /* adjusts number up and down */
    line-height: 100%;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.grayBackground};
    text-align: center;
  }
`

// listData should be a list of strings, or HTML components
// ex: [<p>string<p>] or ['string']
const OrderedList = ({ listData, className }) => {
  return (
    <Content className={className}>
      <ol>
        {listData.map((data, idx) => {
          return <li key={idx}>{data}</li>
        })}
      </ol>
    </Content>
  )
}

export default OrderedList
