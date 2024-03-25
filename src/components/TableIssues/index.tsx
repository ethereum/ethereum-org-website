import { useEffect, useState } from "react"
import { Flex, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"

import InlineLink from "../Link"
import Table from "../Table"
import Tag from "../Tag"

import { fetchGFIs } from "@/lib/api/fetchGFIs"

const removeEmojis = (text: string) =>
  text.replace(/:[^:\s]*(?:::[^:\s]*)*:/g, "")

const statusMap = {
  bug: "error",
  content: "warning",
  design: "tag",
  dev: "success",
}

const LABELS_TO_SEARCH = [
  "content",
  "design",
  "dev",
  "doc",
  "translation",
  "bug",
]

const LABELS_TO_TEXT = {
  content: "content",
  design: "design",
  dev: "dev",
  doc: "docs",
  translation: "translation",
  bug: "bug",
}

const rawLabelsToLabels = (labels: string[]) => {
  return labels
    .map((label) => {
      const labelIndex = LABELS_TO_SEARCH.findIndex((l) =>
        label.toLocaleLowerCase().includes(l)
      )

      if (labelIndex === -1) {
        return
      }

      const labelMatched = LABELS_TO_SEARCH[labelIndex]
      return LABELS_TO_TEXT[labelMatched]
    })
    .filter(Boolean)
}

type TableIssuesProps = {}

const TableIssues = (props: TableIssuesProps) => {
  const [issues, setIssues] = useState<Awaited<ReturnType<typeof fetchGFIs>>>(
    []
  )

  useEffect(() => {
    async function fetchIssues() {
      const janFirst = new Date(new Date().getFullYear(), 0, 1)
      const issues = await fetchGFIs(janFirst.toISOString())
      setIssues(issues)
    }

    fetchIssues()
  }, [])

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Raised by</Th>
          <Th>Labels</Th>
        </Tr>
      </Thead>
      <Tbody>
        {issues.map((issue) => (
          <Tr key={issue.title}>
            <Td>
              <InlineLink href={issue.html_url}>{issue.title}</InlineLink>
            </Td>
            <Td>{issue.user.login}</Td>
            <Td as={Flex} flexWrap="wrap" gap="1">
              {rawLabelsToLabels(issue.labels.map((label) => label.name)).map(
                (label) => {
                  const status = statusMap[label] || "normal"
                  return (
                    <Tag
                      key={label}
                      label={removeEmojis(label)}
                      status={status}
                    />
                  )
                }
              )}
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default TableIssues
