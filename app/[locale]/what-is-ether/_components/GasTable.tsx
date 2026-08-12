"use client"

import { useEffect, useState } from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatSmallUSD } from "@/lib/utils/numbers"

interface GasTableLabels {
  transactionType: string
  typicalCostRange: string
  estimatedGasUnits: string
  row1: string
  row2: string
  row3: string
}

interface GasEthPriceData {
  gasPrice: number
  ethPriceUSD: number
}

interface GasTableProps {
  labels: GasTableLabels
  locale: string
  initialData: GasEthPriceData | null
}

const GasTable = ({ labels, locale, initialData }: GasTableProps) => {
  const [data, setData] = useState<GasEthPriceData | null>(initialData)

  useEffect(() => {
    fetch("/api/gas-eth-price")
      .then((res) => {
        if (!res.ok) return
        return res.json()
      })
      .then((fresh) => {
        if (fresh) setData(fresh)
      })
      .catch((err) => console.warn("Failed to refresh gas/ETH price", err))
  }, [])

  const calculateCost = (gasUnits: number) => {
    if (!data) return "—"
    const costInETH = gasUnits * data.gasPrice * 1e-9
    const costInUSD = costInETH * data.ethPriceUSD
    return formatSmallUSD(costInUSD, locale)
  }

  return (
    <Table variant="highlight-first-column">
      <TableHeader>
        <TableRow>
          <TableHead>{labels.transactionType}</TableHead>
          <TableHead>{labels.typicalCostRange}</TableHead>
          <TableHead>{labels.estimatedGasUnits}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{labels.row1}</TableCell>
          <TableCell>{calculateCost(21000)}</TableCell>
          <TableCell>21,000 gas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{labels.row2}</TableCell>
          <TableCell>
            {calculateCost(125000)} - {calculateCost(150000)}
          </TableCell>
          <TableCell>100,000 - 150,000 gas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{labels.row3}</TableCell>
          <TableCell>
            {calculateCost(200000)} - {calculateCost(500000)}
          </TableCell>
          <TableCell>200,000 - 500,000 gas</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default GasTable
