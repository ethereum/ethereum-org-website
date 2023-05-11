import React from "react"
import { Table, TableContainer } from "@chakra-ui/react"

export interface IProps {
  children?: React.ReactNode
}

const MarkdownTable: React.FC<IProps> = ({ children }) => (
  <TableContainer position="relative" my={8}>
    <Table
      sx={{
        th: {
          borderBottom: "1px solid",
          borderColor: "border",
          whiteSpace: "nowrap",
          px: 2,
        },
      }}
    >
      {children}
    </Table>
  </TableContainer>
)

export default MarkdownTable
