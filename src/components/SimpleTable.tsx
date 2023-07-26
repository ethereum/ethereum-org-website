import React from "react"

import Translation from "./Translation"
import {
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToken,
} from "@chakra-ui/react"
import ButtonLink from "./ButtonLink"

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
                {image && <Image src={image} alt="" mr={4} boxSize={6} />}
                <>{name}</>
              </Flex>
            </Td>
            <Td>
              <Flex align="center">{marketCap}</Flex>
            </Td>
            <Td>
              <Flex align="center">{type}</Flex>
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
export default SimpleTable
