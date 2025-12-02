import { getLocale, getTranslations } from "next-intl/server"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { formatSmallUSD } from "@/lib/utils/numbers"

const GasTable = async () => {
  const t = await getTranslations({
    namespace: "page-what-is-ether",
  })
  const locale = await getLocale()

  const etherscanApiKey = process.env.ETHERSCAN_API_KEY

  const gwei = await fetch(
    `https://api.etherscan.io/v2/api?chainid=1&module=gastracker&action=gasoracle&apikey=${etherscanApiKey}`
  ).then((res) => res.json())
  const ethPrice = await fetch(
    `https://api.etherscan.io/v2/api?chainid=1&module=stats&action=ethprice&apikey=${etherscanApiKey}`
  ).then((res) => res.json())

  // Calculate transaction costs in USD
  const gasPrice = parseFloat(gwei.result.ProposeGasPrice) // Gas price in gwei
  const ethPriceUSD = parseFloat(ethPrice.result.ethusd) // ETH price in USD

  const calculateCost = (gasUnits: number) => {
    const costInETH = gasUnits * gasPrice * 1e-9 // Convert gwei to ETH
    const costInUSD = costInETH * ethPriceUSD
    return formatSmallUSD(costInUSD, locale)
  }

  return (
    <Table variant="highlight-first-column">
      <TableHeader>
        <TableRow>
          <TableHead>
            {t("page-what-is-ether-gas-table-transaction-type")}
          </TableHead>
          <TableHead>
            {t("page-what-is-ether-gas-table-typical-cost-range")}
          </TableHead>
          <TableHead>
            {t("page-what-is-ether-gas-table-estimated-gas-units")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{t("page-what-is-ether-gas-table-row-1-1")}</TableCell>
          <TableCell>{calculateCost(21000)}</TableCell>
          <TableCell>21,000 gas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("page-what-is-ether-gas-table-row-2-1")}</TableCell>
          <TableCell>
            {calculateCost(125000)} - {calculateCost(150000)}
          </TableCell>
          <TableCell>100,000 - 150,000 gas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>{t("page-what-is-ether-gas-table-row-3-1")}</TableCell>
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
