import * as React from "react"
import {
  Box,
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
    <Box px={5} py={4}>
      <TableContainer whiteSpace="normal">
        <ChakraTable layout="fixed" variant={variant} {...rest} />
      </TableContainer>
    </Box>
  )
}

export default Table
