import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { MdChevronRight } from "react-icons/md"
import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Icon,
  StackProps,
} from "@chakra-ui/react"

import { DeveloperDocsLink } from "@/lib/interfaces"

import * as url from "@/lib/utils/url"

export const dropdownIconContainerVariant = {
  open: {
    rotate: 90,
    transition: {
      duration: 0.4,
    },
  },
  closed: { rotate: 0 },
}

const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "flex",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const AccordionButton = ({
  href,
  ...props
}: { href?: string } & StackProps) => {
  const { asPath } = useRouter()

  const commonStyles = {
    w: "full",
    justify: "space-between",
    py: "2",
    px: "4",
    color: "body.base",
    _hover: { color: "primary.hover", bg: "background.highlight" },
  }

  if (href) {
    const isActive = url.isHrefActive(href, asPath, false)

    return (
      <HStack
        as={NextLink}
        href={href}
        textDecoration="none"
        {...commonStyles}
        _hover={{ ...commonStyles._hover, textDecoration: "none" }}
        {...(isActive && { color: "primary.base", bg: "background.highlight" })}
        {...props}
      />
    )
  }

  return <HStack as="button" textAlign="start" {...commonStyles} {...props} />
}

const AccordionPanel = ({
  isOpen,
  ...props
}: { isOpen: boolean } & FlexProps) => (
  <Flex
    as={motion.div}
    direction="column"
    gap="2"
    p="0"
    ps="2"
    my="2"
    animate={isOpen ? "open" : "closed"}
    variants={innerLinksVariants}
    initial={isOpen ? "open" : "closed"}
    {...props}
  />
)

export type NavLinkProps = {
  item: DeveloperDocsLink
  path: string
  isTopLevel?: boolean
}

const NavLink = ({ item, path, isTopLevel }: NavLinkProps) => {
  const { t } = useTranslation("page-developers-docs")
  const isLinkInPath =
    isTopLevel || path.includes(item.to) || path.includes(item.path)
  const [isOpen, setIsOpen] = useState<boolean>(isLinkInPath)

  useEffect(() => {
    // Only set on items that contain a link
    // Otherwise items w/ `path` would re-open every path change
    if (item.to) {
      const shouldOpen = path.includes(item.to) || path.includes(item.path)
      setIsOpen(shouldOpen)
    }
  }, [path, item.path, item.to])

  if (item.items) {
    return (
      <Box>
        <AccordionButton href={item.to} onClick={() => setIsOpen(!isOpen)}>
          <Box>{t(item.id)}</Box>
          <Flex
            as={motion.div}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon as={MdChevronRight} boxSize={6} color="body.base" />
          </Flex>
        </AccordionButton>

        {/* AccordionPanel */}
        <AccordionPanel isOpen={isOpen}>
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} />
          ))}
        </AccordionPanel>
      </Box>
    )
  }
  return (
    <AccordionButton href={item.to}>
      <span>{t(item.id)}</span>
    </AccordionButton>
  )
}

export type SideNavProps = FlexProps & {
  path: string
  docLinks: DeveloperDocsLink[]
}

// TODO set tree state based on if current path is a child
// of the given parent. Currently all `path` items default to open
// and they only collapse when clicked on.
const SideNav = ({ path, docLinks, ...props }: SideNavProps) => {
  const { t } = useTranslation("page-developers-docs")

  return (
    <Flex
      as="nav"
      direction="column"
      position="sticky"
      top="19"
      gap="4"
      pt="8"
      pb="16"
      overflowY="auto"
      aria-label={t("common:nav-developers-docs")}
      {...props}
    >
      {docLinks.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} isTopLevel />
      ))}
    </Flex>
  )
}

export default SideNav
