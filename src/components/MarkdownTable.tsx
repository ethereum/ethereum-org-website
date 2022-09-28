import React from "react"
import { Table, TableContainer, Th } from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
}

const MarkdownTable: React.FC<IProps> = ({ children }) => (
  <TableContainer my={8}>
    <Table>
      <Th
        borderBottom={"1px solid"}
        borderColor={"border"}
        whiteSpace={"nowrap"}
      >
        {children}
      </Th>
    </Table>
  </TableContainer>
)

export default MarkdownTable
