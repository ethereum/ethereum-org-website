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
  useToken,
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
  const [textColor] = useToken("colors", ["text"])
  const { flipForRtl } = useRtlFlip()
  const { t } = useTranslation("page-stablecoins")

  const stablecoinsType = {
    FIAT: t("page-stablecoins-stablecoins-table-type-fiat-backed"),
    CRYPTO: t("page-stablecoins-stablecoins-table-type-crypto-backed"),
    ASSET: t("page-stablecoins-stablecoins-table-type-precious-metals-backed"),
    ALGORITHMIC: t("page-stablecoins-algorithmic"),
  }

  return (
    <Table
      variant="unstyled"
      my={8}
      borderRadius="sm"
      border={`1px solid ${textColor}`}
      bg="background.base"
      mb={8}
      minW="720px"
    >
      <Thead bg="ednBackground" color="text200">
        <Tr borderBottom={`1px solid ${textColor}`} mb="1px">
          {columns.map((column, idx) => (
            <Th
              key={idx}
              py={5}
              fontSize="md"
              fontWeight="normal"
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
            borderBottom={`1px solid ${textColor}`}
            _hover={{
              textDecoration: "none",
              borderBottom: `1px solid ${textColor}`,
              bg: "primary200",
              color: "black300",
            }}
            _focus={{
              borderBottom: `1px solid ${textColor}`,
              bg: "primary200",
              color: "black300",
            }}
          >
            <Td>
              <Flex align="center">
                {image && <Image src={image} alt="" me={4} boxSize={6} />}
                <>{name}</>
              </Flex>
            </Td>
            <Td>
              <Flex align="center">{marketCap}</Flex>
            </Td>
            <Td>
              <Flex align="center">{stablecoinsType[type]}</Flex>
            </Td>
            {url && (
              <Td textAlign="end">
                <ButtonLink to={url} size="sm">
                  Go to {name}
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
