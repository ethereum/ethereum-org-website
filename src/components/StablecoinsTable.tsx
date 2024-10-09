import { useTranslation } from "next-i18next"

import { ButtonLink } from "./ui/buttons/Button"
import { Flex } from "./ui/flex"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/Table"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export interface TableRow {
  name: string
  marketCap: string
  image?: string
  type: string
  url?: string
}

export type StablecoinsTableProps = {
  columns: Array<string>
  content: Array<TableRow>
  hasError: boolean
}

const StablecoinsTable = ({
  columns,
  content,
  hasError,
}: StablecoinsTableProps) => {
  const { flipForRtl } = useRtlFlip()
  const { t } = useTranslation("page-stablecoins")

  const stablecoinsType = {
    FIAT: t("page-stablecoins-stablecoins-table-type-fiat-backed"),
    CRYPTO: t("page-stablecoins-stablecoins-table-type-crypto-backed"),
    ASSET: t("page-stablecoins-stablecoins-table-type-precious-metals-backed"),
    ALGORITHMIC: t("page-stablecoins-algorithmic"),
  }

  return (
    <Table className="my-8 min-w-[720px] bg-background">
      <TableHeader>
        <TableRow>
          {columns.map((column, idx) => (
            <TableHead key={idx}>{column}</TableHead>
          ))}

          {content && content[0]?.url && (
            <TableHead className="text-right font-normal">
              <span className="inline-block" style={{ transform: flipForRtl }}>
                ↗
              </span>
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {hasError && (
          <TableRow className="p-4">
            <TableCell colSpan={4}>
              {t("page-stablecoins-table-error")}
            </TableCell>
          </TableRow>
        )}

        {content.map(({ name, marketCap, image, type, url }, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Flex>
                {image && <img src={image} alt="" className="me-4 h-6 w-6" />}
                <>{name}</>
              </Flex>
            </TableCell>
            <TableCell>{marketCap}</TableCell>
            <TableCell>{stablecoinsType[type]}</TableCell>
            {url && (
              <TableCell className="text-right">
                <ButtonLink href={url} size="sm">
                  {t("page-stablecoins-go-to")} {name}
                </ButtonLink>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default StablecoinsTable
