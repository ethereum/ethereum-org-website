import * as React from "react"
import {
  Table as ChakraTable,
  TableContainer,
  ThemingProps,
} from "@chakra-ui/react"

interface TableProps extends ThemingProps<"Table"> {
  children: React.ReactNode
}

const Table = (props: TableProps) => {
  const { variant, ...rest } = props
  return (
    <TableContainer whiteSpace="normal">
      <ChakraTable layout="fixed" variant={variant} {...rest} />
    </TableContainer>
  )
}

export default Table
