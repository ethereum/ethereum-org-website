import { useTranslation } from "next-i18next"
import { FaGithub } from "react-icons/fa"
import {
  Box,
  BoxProps,
  calc,
  Flex,
  Icon,
  List,
  useToken,
} from "@chakra-ui/react"

import type { ToCItem } from "@/lib/types"

import { ButtonLink } from "@/components/Buttons"
import ItemsList from "@/components/TableOfContents/ItemsList"
import Mobile from "@/components/TableOfContents/TableOfContentsMobile"

import { outerListProps } from "@/lib/utils/toc"

import { useActiveHash } from "@/hooks/useActiveHash"

export type TableOfContentsProps = BoxProps & {
  items: Array<ToCItem>
  maxDepth?: number
  editPath?: string
  hideEditButton?: boolean
  isMobile?: boolean
}

const TableOfContents = ({
  items,
  maxDepth = 1,
  editPath,
  hideEditButton = false,
  isMobile = false,
  ...rest
}: TableOfContentsProps) => {
  const { t } = useTranslation("common")
  // TODO: Replace with direct token implementation after UI migration is completed
  const lgBp = useToken("breakpoints", "lg")

  const titleIds: Array<string> = []

  if (!isMobile) {
    const getTitleIds = (items: Array<ToCItem>, depth: number): void => {
      // Return early if maxDepth hit
      if (depth > maxDepth) return
      items?.forEach(({ url, items }) => {
        titleIds.push(url)
        items && getTitleIds(items, depth + 1)
      })
    }

    getTitleIds(items, 0)
  }

  const activeHash = useActiveHash(titleIds)

  if (!items) {
    return null
  }
  if (isMobile) {
    return <Mobile items={items} maxDepth={maxDepth} />
  }

  return (
    <Flex
      direction="column"
      align="start"
      gap={4}
      hideBelow={lgBp}
      as="aside"
      position="sticky"
      top="19" // Account for navbar
      p={4}
      pe={0}
      maxW="25%"
      minW={48}
      height={calc.subtract("100vh", "80px")}
      overflowY="auto"
      {...rest}
    >
      {!hideEditButton && editPath && (
        <ButtonLink
          leftIcon={<Icon as={FaGithub} />}
          href={editPath}
          variant="outline"
        >
          {t("edit-page")}
        </ButtonLink>
      )}
      <Box textTransform="uppercase" color="body.medium">
        {t("on-this-page")}
      </Box>
      <List m={0} spacing="2" {...outerListProps}>
        <ItemsList
          items={items}
          depth={0}
          maxDepth={maxDepth ? maxDepth : 1}
          activeHash={activeHash}
        />
      </List>
    </Flex>
  )
}

export default TableOfContents
