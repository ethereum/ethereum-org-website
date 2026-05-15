"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { OPCODES } from "@/data/evm/opcodes"

const renderCell = (cell?: { label: string; href?: string }) => {
  if (!cell) return ""

  if (cell.href) {
    return (
      <a
        href={cell.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        {cell.label}
      </a>
    )
  }

  return cell.label
}

export default function OpcodesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Opcode</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Gas</TableHead>
          <TableHead>Inputs</TableHead>
          <TableHead>Outputs</TableHead>
          <TableHead>Mem / Storage</TableHead>
          <TableHead>Notes</TableHead>
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
