import React, { useContext } from "react"
import { Link as GatsbyLink } from "gatsby"

import ButtonLink from "./ButtonLink"
import Translation from "./Translation"
import { useActiveHash } from "../hooks/useActiveHash"

import { ZenModeContext } from "../contexts/ZenModeContext"
import {
  Box,
  calc,
  chakra,
  ChakraProps,
  cssVar,
  Fade,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  List,
  ListItem,
  ListProps,
  Show,
  Switch,
  SystemStyleObject,
  useDisclosure,
} from "@chakra-ui/react"
import { MdExpandMore } from "react-icons/md"
import { FaGithub } from "react-icons/fa"
import Link from "./Link"

const customIdRegEx = /^.+(\s*\{#([A-Za-z0-9\-_]+?)\}\s*)$/
const emojiRegEx = /<Emoji [^/]+\/>/g

const slugify = (s: string): string =>
  encodeURIComponent(String(s).trim().toLowerCase().replace(/\s+/g, "-"))

const getCustomId = (title: string): string => {
  const match = customIdRegEx.exec(title)
  if (match) {
    return match[2].toLowerCase()
  }
  console.warn("Missing custom ID on header: ", title)
  return slugify(title)
}

const trimmedTitle = (title: string): string => {
  const match = customIdRegEx.exec(title)
  const trimmedTitle = match ? title.replace(match[1], "").trim() : title

  // Removes Twemoji components from title
  const emojiMatch = emojiRegEx.exec(trimmedTitle)
  return emojiMatch ? trimmedTitle.replaceAll(emojiRegEx, "") : trimmedTitle
}

export interface Item {
  title: string
  items?: Array<Item>
}

export interface IPropsTableOfContentsLink {
  depth: number
  item: Item
  activeHash?: string
}

const TableOfContentsLink: React.FC<IPropsTableOfContentsLink> = ({
  depth,
  item,
  activeHash,
}) => {
  const url = `#${getCustomId(item.title)}`
  const isActive = activeHash === url
  const isNested = depth === 2
  let classes = ""
  if (isActive) {
    classes += " active"
  }
  if (isNested) {
    classes += " nested"
  }

  const $dotBg = cssVar("dot-bg")

  const hoverOrActiveStyle: SystemStyleObject = {
    color: "primary",
    _after: {
      content: `""`,
      background: $dotBg.reference,
      border: "1px",
      borderColor: "primary",
      borderRadius: "50%",
      boxSize: 2,
      position: "absolute",
      left: "-1.29rem",
      top: "50%",
      mt: -1,
    },
  }

  return (
    <Link
      as={GatsbyLink}
      to={url}
      className={classes}
      textDecoration="none"
      display="inline-block"
      position="relative"
      color="textTableOfContents"
      mb="0.5rem !important"
      width={{ base: "100%", lg: "auto" }}
      _hover={{
        ...hoverOrActiveStyle,
      }}
      sx={{
        [$dotBg.variable]: "colors.background",
        "&.active": {
          [$dotBg.variable]: "colors.primary",
          ...hoverOrActiveStyle,
        },
        "&.nested": {
          _before: {
            content: `"⌞"`,
            opacity: 0.5,
            display: "inline-flex",
            position: "absolute",
            left: "-14px",
            top: -1,
          },
          "&.active, &:hover": {
            _after: {
              left: "-2.29rem",
            },
          },
        },
      }}
    >
      {trimmedTitle(item.title)}
    </Link>
  )
}

export interface IPropsItemsList extends ChakraProps {
  items?: Array<Item>
  depth: number
  maxDepth: number
  activeHash?: string
}

const ItemsList: React.FC<IPropsItemsList> = ({
  items,
  depth,
  maxDepth,
  activeHash,
  ...rest
}) => {
  if (depth > maxDepth || !items) {
    return null
  }

  return (
    <>
      {items.map((item, index) => (
        <ListItem key={index} m={0} {...rest}>
          {item.title && (
            <TableOfContentsLink
              depth={depth}
              item={item}
              activeHash={activeHash}
            />
          )}
          {item.items && (
            <List
              key={item.title}
              fontSize="sm"
              lineHeight={1.6}
              fontWeight={400}
              ps={4}
              pe={1}
              m={0}
            >
              <ItemsList
                items={item.items}
                depth={depth + 1}
                maxDepth={maxDepth}
                activeHash={activeHash}
              />
            </List>
          )}
        </ListItem>
      ))}
    </>
  )
}

const outerListProps: ListProps = {
  borderStart: "1px solid",
  borderStartColor: "dropdownBorder",
  borderTop: 0,
  fontSize: "sm",
  lineHeight: 1.6,
  fontWeight: 400,
  m: 0,
  mt: 20,
  mb: 12,
  ps: 4,
  pe: 1,
  pt: 0,
  sx: {
    // TODO: Flip to object syntax with `lg` token after completion of Chakra migration
    "@media (max-width: 1024px)": {
      borderStart: 0,
      borderTop: "1px",
      borderTopColor: "primary300",
      ps: 0,
      pt: 4,
    },
  },
}

export interface IPropsTableOfContentsMobile {
  items?: Array<Item>
  maxDepth?: number
  className?: string
}

const TableOfContentsMobile: React.FC<IPropsTableOfContentsMobile> = ({
  items,
  maxDepth,
  className,
}) => {
  const { getButtonProps, getDisclosureProps, isOpen } = useDisclosure({
    defaultIsOpen: false,
  })
  if (!items) {
    return null
  }

  return (
    <Box
      as="aside"
      background="background"
      border="1px"
      borderColor="border"
      borderRadius="4px"
      py={2}
      px={4}
      className={className}
    >
      <Flex
        color="text200"
        cursor="pointer"
        alignItems="center"
        justify="space-between"
        {...getButtonProps()}
      >
        <chakra.span flex={1} fontWeight={500}>
          <Translation id="on-this-page" />
        </chakra.span>
        <Icon
          as={MdExpandMore}
          transform={isOpen ? "rotate(0)" : "rotate(-90deg)"}
          boxSize={6}
          transition="transform .4s"
        />
      </Flex>
      <Fade
        in={isOpen}
        {...getDisclosureProps()}
        transition={{ enter: { duration: 0.6 } }}
      >
        <List {...outerListProps}>
          <ItemsList
            items={items}
            depth={0}
            maxDepth={maxDepth ? maxDepth : 1}
          />
        </List>
      </Fade>
    </Box>
  )
}

export interface IProps extends ChakraProps {
  items: Array<Item>
  maxDepth?: number
  className?: string
  slug?: string
  editPath?: string
  hideEditButton?: boolean
  isMobile?: boolean
}

const TableOfContents: React.FC<IProps> = ({
  items,
  maxDepth = 1,
  className,
  slug,
  editPath,
  hideEditButton = false,
  isMobile = false,
  ...rest
}) => {
  const { isZenMode, handleZenModeChange } = useContext(ZenModeContext)

  const titleIds: Array<string> = []

  if (!isMobile) {
    const getTitleIds = (items: Array<Item>, depth: number): void => {
      if (depth > (maxDepth ? maxDepth : 1)) return

      items?.forEach((item) => {
        if (item.items && Array.isArray(item.items)) {
          if (item.title) titleIds.push(getCustomId(item.title))
          getTitleIds(item.items, depth + 1)
        } else {
          titleIds.push(getCustomId(item.title))
        }
      })
    }

    getTitleIds(items, 0)
  }

  const activeHash = useActiveHash(titleIds)

  // Exclude <h1> from TOC
  if (items?.length === 1) {
    items = items[0].items!
  }
  if (!items) {
    return null
  }
  if (isMobile) {
    return (
      // TODO: Switch to `below="lg"` after completion of Chakra Migration
      <Show breakpoint="(max-width: 1024px)">
        <TableOfContentsMobile
          items={items}
          maxDepth={maxDepth}
          className={className}
        />
      </Show>
    )
  }

  const shouldShowZenModeToggle = slug?.includes("/docs/")

  return (
    // TODO: Switch to `above="lg"` after completion of Chakra Migration
    <Show breakpoint="(min-width: 1025px)">
      <Box
        as="aside"
        position="sticky"
        top="7.25rem" // Account for navbar
        p={4}
        pe={0}
        maxW="25%"
        minW={48}
        height={calc.subtract("100vh", "80px")}
        overflowY="auto"
        {...rest}
      >
        <List {...outerListProps}>
          {!hideEditButton && (
            <ListItem mb={2}>
              <ButtonLink to={editPath} variant="outline" hideArrow mt={0}>
                <Flex alignItems="center">
                  <Icon as={FaGithub} color="text" boxSize={6} me={2} />
                  <Translation id="edit-page" />
                </Flex>
              </ButtonLink>
            </ListItem>
          )}
          {shouldShowZenModeToggle && (
            <Flex
              as={ListItem}
              alignItems="center"
              mb={2}
              py="2px"
              opacity={0.8}
              fontSize="sm"
            >
              <FormControl as={Flex} alignItems="center">
                <FormLabel htmlFor="zen-mode" mb={0} me={2}>
                  <Translation id="zen-mode" />
                </FormLabel>
                <Switch
                  id="zen-mode"
                  sx={{
                    "& .chakra-switch__track": {
                      background: "transparent",
                      border: "2px solid",
                      borderColor: "secondary",
                      p: 0,
                      "&[data-checked]": {
                        background: "secondary",
                      },
                    },
                    "& .chakra-switch__thumb": {
                      background: "ednBackground",
                      outline: "2px solid",
                      outlineColor: "secondary",
                    },
                  }}
                  isChecked={isZenMode}
                  onChange={() => handleZenModeChange()}
                />
              </FormControl>
            </Flex>
          )}
          <ListItem>
            <Box mb={2} textTransform="uppercase">
              <Translation id="on-this-page" />
            </Box>
            <List m={0}>
              <ItemsList
                items={items}
                depth={0}
                maxDepth={maxDepth ? maxDepth : 1}
                activeHash={activeHash}
              />
            </List>
          </ListItem>
        </List>
      </Box>
    </Show>
  )
}

export default TableOfContents
