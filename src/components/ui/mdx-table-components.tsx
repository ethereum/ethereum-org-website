import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table"

export const mdxTableComponents = {
  table: Table,
  td: ({ align, ...rest }) => <TableCell align={align} {...rest} />,
  th: ({ align, ...rest }) => <TableHead align={align} {...rest} />,
  tr: (props) => <TableRow {...props} />,
  tbody: (props) => <TableBody {...props} />,
  thead: (props) => <TableHeader {...props} />,
}
