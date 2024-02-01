import { ReactNode, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdExpandMore } from "react-icons/md"
import { Box, HStack, Icon } from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink, LinkProps } from "@/components/Link"

import docLinks from "../data/developer-docs-links.yaml"

export const dropdownIconContainerVariant = {
  open: {
    rotate: 0,
    y: 3,
    transition: {
      duration: 0.4,
    },
  },
  closed: { rotate: -90, y: 0 },
}

const innerLinksVariants = {
  open: {
    opacity: 1,
    display: "block",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const LinkContainer = ({ children }: ChildOnlyProp) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      py={2}
      pe={4}
      ps={8}
      _hover={{ bgColor: "ednBackground" }}
    >
      {children}
    </HStack>
  )
}

const SideNavLink = ({ children, ...props }: LinkProps) => {
  return (
    <BaseLink
      w="full"
      textDecoration="none"
      color="text"
      fontWeight="normal"
      _hover={{ textDecoration: "none", color: "primary.base" }}
      _active={{ color: "primary.base" }}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

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
        <LinkContainer>
          {item.to && (
            <SideNavLink to={item.to} isPartiallyActive={false}>
              {t(item.id)}
            </SideNavLink>
          )}
          {!item.to && (
            <Box w="full" cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
              {t(item.id)}
            </Box>
          )}
          <Box
            as={motion.div}
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
            cursor="pointer"
          >
            <Icon as={MdExpandMore} boxSize={6} color="secondary" />
          </Box>
        </LinkContainer>
        <Box
          as={motion.div}
          fontSize="sm"
          lineHeight="tall"
          fontWeight="normal"
          ms={4}
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial={isOpen ? "open" : "closed"}
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} />
          ))}
        </Box>
      </Box>
    )
  }
  return (
    <Box>
      <LinkContainer>
        <SideNavLink to={item.to} isPartiallyActive={false}>
          {t(item.id)}
        </SideNavLink>
      </LinkContainer>
    </Box>
  )
}

export interface SideNavProps {
  path: string
}

// TODO set tree state based on if current path is a child
// of the given parent. Currently all `path` items default to open
// and they only collapse when clicked on.
const SideNav = ({ path }: SideNavProps) => {
  const { t } = useTranslation("page-developers-docs")

  return (
    <Box
      as="nav"
      position="sticky"
      top="7.25rem"
      pt={8}
      pb={16}
      h="calc(100vh - 80px)" // TODO take footer into account for height?
      w="calc((100% - 1448px) / 2 + 298px)"
      minW="298px"
      overflowY="auto"
      transition="transform 0.2s ease"
      bgColor="background.base"
      boxShadow="1px 0px 0px rgba(0, 0, 0, 0.1)"
      borderInlineEnd="1px solid"
      borderInlineEndColor="border"
      display={{ base: "none", lg: "block" }}
      aria-label={t("common:nav-developers-docs")}
    >
      {docLinks.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} isTopLevel />
      ))}
    </Box>
  )
}

export default SideNav
