import * as React from "react"
import {
  Table as ChakraTable,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  ThemingProps,
  Tr,
} from "@chakra-ui/react"

/*
 * TODO: Currently, there are cell spacing issues with some table content.
 * Prefer `layout="fixed"` in the future when content has been addressed
 * to provide equal cell widths.
 */

interface TableProps extends ThemingProps<"Table"> {
  children: React.ReactNode
}

const Table = (props: TableProps) => {
  const { variant, ...rest } = props
  return (
    <TableContainer whiteSpace="normal" position="relative">
      <ChakraTable variant={variant} {...rest} />
    </TableContainer>
  )
}

export const mdxTableComponents = {
  table: Table,
  th: ({ align, ...rest }) => <Th textAlign={align} {...rest} />,
  td: ({ align, ...rest }) => <Td textAlign={align} {...rest} />,
  tr: (props) => <Tr {...props} />,
  tbody: (props) => <Tbody {...props} />,
  thead: (props) => <Thead {...props} />,
}

export default Table
