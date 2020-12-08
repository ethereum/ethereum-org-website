import React from "react"
import styled from "styled-components"

import Link from "./Link"
import Translation from "./Translation"

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: auto;
  margin: 2rem 0rem;
  border-radius: 2px;
  border: 1px solid ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  margin-bottom: 2rem;
  min-width: 640px;
`

const Cell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

const HeaderCell = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: ${(props) => props.theme.colors.text200};
`

const Header = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  display: flex;
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.text};
  background: ${(props) => props.theme.colors.ednBackground};
  margin-bottom: 1px;
  padding: 1rem;
  width: 100%;
`

const LinkRow = styled(Link)`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  display: flex;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.text};
  padding: 1rem;
  width: 100%;
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.primary200};
    color: ${(props) => props.theme.colors.black300};
  }
  &:after {
    color: ${(props) => props.theme.colors.primary};
  }
`

const Row = styled.div`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  text-decoration: none;
  display: flex;
  color: ${(props) => props.theme.colors.text};
  box-shadow: 0 1px 1px ${(props) => props.theme.colors.text};
  padding: 1rem;
  width: 100%;
  &:hover {
    box-shadow: 0 0 1px ${(props) => props.theme.colors.text};
    background: ${(props) => props.theme.colors.primary200};
    color: ${(props) => props.theme.colors.black300};
  }
  &:after {
    color: ${(props) => props.theme.colors.primary};
  }
`

const StyledImage = styled.img`
  width: 24px;
  margin-right: 1rem;
`

// TODO generalize this component - currently tailored for stablecoin market caps
const SimpleTable = ({ columns, content, hasError }) => {
  return (
    <Table>
      <Header>
        {columns.map((column, idx) => (
          <HeaderCell key={idx}>{column}</HeaderCell>
        ))}
      </Header>
      {hasError && (
        <Row>
          <Cell>
            <Translation id="page-stablecoin-table-error" />
          </Cell>
        </Row>
      )}
      {!hasError && content.length === 0 && (
        <Row>
          <Cell>
            <Translation id="page-stablecoin-table-loading" />
          </Cell>
        </Row>
      )}
      {content.map((row, idx) => {
        const { name, marketCap, image, type, url } = row
        const rowContent = (
          <>
            <Cell>
              {image && <StyledImage src={image} />}
              {name}
            </Cell>
            <Cell>{marketCap}</Cell>
            <Cell>{type}</Cell>
          </>
        )

        return url ? (
          <LinkRow key={idx} to={url}>
            {rowContent}
          </LinkRow>
        ) : (
          <Row key={idx}>{rowContent}</Row>
        )
      })}
    </Table>
  )
}

export default SimpleTable
