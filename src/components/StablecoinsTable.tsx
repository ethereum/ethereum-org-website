import { useTranslation } from "next-i18next"
import {
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"

import { ButtonLink } from "./Buttons"

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
    <Table variant="unstyled" my={8} bg="background.base" mb={8} minW="720px">
      <Thead bg="background.highlight" color="body.medium">
        <Tr>
          {columns.map((column, idx) => (
            <Th
              key={idx}
              fontWeight="bold"
              fontSize="md"
              verticalAlign="inherit"
              letterSpacing="normal"
            >
              {column}
            </Th>
          ))}

          {content && content[0]?.url && (
            <Th p={5} fontSize="md" fontWeight="normal" textAlign="end">
              <Text as="span" display="inline-block" transform={flipForRtl}>
                ↗
              </Text>
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {hasError && (
          <Tr p={4}>
            <Td colSpan={4}>{t("page-stablecoins-table-error")}</Td>
          </Tr>
        )}

        {content.map(({ name, marketCap, image, type, url }, idx) => (
          <Tr
            key={idx}
            color="text"
            _hover={{
              textDecoration: "none",
              bg: "background.highlight",
            }}
            _focus={{
              bg: "background.base",
              color: "body.base",
            }}
          >
            <Td verticalAlign="middle">
              <Flex>
                {image && <Image src={image} alt="" me={4} boxSize={6} />}
                <>{name}</>
              </Flex>
            </Td>
            <Td verticalAlign="middle">{marketCap}</Td>
            <Td verticalAlign="middle">{stablecoinsType[type]}</Td>
            {url && (
              <Td textAlign="end">
                <ButtonLink href={url} size="sm">
                  {t("page-stablecoins-go-to")} {name}
                </ButtonLink>
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
export default StablecoinsTable
