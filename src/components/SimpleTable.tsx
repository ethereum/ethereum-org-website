import React from "react"

import Translation from "./Translation"
import {
  Image,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToken,
} from "@chakra-ui/react"

export interface TableRow {
  name: string
  marketCap: string
  image?: string
  type: string
  url?: string
}

export interface IProps {
  columns: Array<string>
  content: Array<TableRow>
  hasError: boolean
}

// TODO generalize this component - currently tailored for stablecoin market caps
const SimpleTable: React.FC<IProps> = ({ columns, content, hasError }) => {
  const [textColor] = useToken("colors", ["text"])

  return (
    <Table
      variant="unstyled"
      my={8}
      borderRadius="2px"
      border={`1px solid ${textColor}`}
      bg="background"
      mb={8}
      minW="720px"
    >
      <Thead bg="ednBackground" color="text200">
        <Tr boxShadow={`0 1px 1px ${textColor}`} mb="1px">
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
              ↗
            </Th>
          )}
        </Tr>
      </Thead>
      <Tbody>
        {hasError && (
          <Tr p={4}>
            <Td colSpan={4}>
              <Translation id="page-stablecoins-table-error" />
            </Td>
          </Tr>
        )}
        {!hasError && content.length === 0 && (
          <Tr p={4}>
            <Td colSpan={4}>
              <Translation id="page-stablecoins-table-loading" />
            </Td>
          </Tr>
        )}

        {content.map(({ name, marketCap, image, type, url }, idx) => (
          <Tr
            as={url ? Link : Tr}
            display="table-row"
            href={url}
            key={idx}
            color="white"
            textDecoration="none"
            boxShadow={`0 1px 1px ${textColor}`}
            _hover={{
              textDecoration: "none",
              boxShadow: `0 0 1px ${textColor}`,
              bg: "primary200",
              color: "black300",
              cursor: url ? "pointer" : "default",
            }}
            _focus={{
              boxShadow: `0 0 1px ${textColor}`,
              bg: "primary200",
              color: "black300",
            }}
          >
            <Td display="flex" alignItems="center">
              {image && <Image src={image} alt="" mr={4} boxSize={6} />}
              {name}
            </Td>
            <Td>{marketCap}</Td>
            <Td>{type}</Td>
            {url && (
              <Td color="primary" textAlign="end">
                ↗
              </Td>
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
export default SimpleTable
