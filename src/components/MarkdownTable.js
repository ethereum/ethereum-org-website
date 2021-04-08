import React from "react"
import styled from "styled-components"

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 2rem 0;

  th {
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    white-space: nowrap;
  }
`

const MarkdownTable = ({ children }) => (
  <TableContainer>
    <table>{children}</table>
  </TableContainer>
)

export default MarkdownTable
