import { getTranslations } from "next-intl/server"

import InlineLink from "@/components/ui/Link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { OPCODES } from "@/data/evm/opcodes"

type Cell = {
  label: string
  href?: string
}

const renderCell = (cell: Cell) => {
  if (cell.href) {
    return <InlineLink href={cell.href}>{cell.label}</InlineLink>
  }

  return cell.label
}

export default async function OpcodesTable() {
  const t = await getTranslations("component-opcodes-table")
  return (
    <Table className="min-w-[1100px]">
      <TableHeader>
        <TableRow>
          <TableHead>{t("opcode")}</TableHead>
          <TableHead>{t("name")}</TableHead>
          <TableHead>{t("gas")}</TableHead>
          <TableHead>{t("initial-stack")}</TableHead>
          <TableHead>{t("resulting-stack")}</TableHead>
          <TableHead>{t("mem-storage")}</TableHead>
          <TableHead>{t("notes")}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {OPCODES.map((opcode) => (
          <TableRow key={opcode.stack}>
            <TableCell>{opcode.stack}</TableCell>

            <TableCell>{opcode.name}</TableCell>

            <TableCell>{renderCell(opcode.gas)}</TableCell>

            <TableCell>{opcode.inputs.join(", ")}</TableCell>

            <TableCell>{opcode.outputs.join(", ")}</TableCell>

            <TableCell>{renderCell(opcode.memStorage)}</TableCell>

            <TableCell>{renderCell(opcode.notes)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}