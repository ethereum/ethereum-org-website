import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdChevronRight } from "react-icons/md"
import { Box, Center, HStack, Icon } from "@chakra-ui/react"

import type { ChildOnlyProp, TranslationKey } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink, LinkProps } from "@/components/Link"

import docLinks from "@/data/developer-docs-links.yaml"

import {
  dropdownIconContainerVariant,
  type NavLinkProps as SideNavLinkProps,
} from "./SideNav"

// Traverse all links to find page id
const getPageTitleId = (
  href: string,
  links: Array<DeveloperDocsLink>
): TranslationKey => {
  for (const link of links) {
    if (link.href === href) {
      return link.id
    }
    if (link.items) {
      const pageTitle = getPageTitleId(href, link.items)
      if (pageTitle) {
        return pageTitle
      }
    }
  }
  return "" as TranslationKey
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
      pe={8}
      ps={2}
      _hover={{
        bgColor: "ednBackground",
      }}
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
      _hover={{
        textDecoration: "none",
        color: "primary.base",
      }}
      _active={{
        color: "primary.base",
      }}
      {...props}
    >
      {children}
    </BaseLink>
  )
}

export type NavLinkProps = SideNavLinkProps & {
  toggle: () => void
}

const NavLink = ({ item, path, toggle }: NavLinkProps) => {
  const { t } = useTranslation("page-developers-docs")
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (item.items) {
    return (
      <Box>
        <LinkContainer>
          {item.href && (
            <SideNavLink href={item.href} isPartiallyActive={false}>
              {t(item.id)}
            </SideNavLink>
          )}
          {!item.href && (
            <Box w="full" cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
              {t(item.id)}
            </Box>
          )}
          <Box
            as={motion.div}
            cursor="pointer"
            display="flex"
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon as={MdChevronRight} boxSize={6} color="secondary" />
          </Box>
        </LinkContainer>
        <Box
          as={motion.div}
          fontSize="sm"
          lineHeight="tall"
          fontWeight="normal"
          ps={4}
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial="closed"
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} toggle={toggle} />
          ))}
        </Box>
      </Box>
    )
  }
  return (
    <Box onClick={toggle}>
      <LinkContainer>
        <SideNavLink href={item.href} isPartiallyActive={false}>
          {t(item.id)}
        </SideNavLink>
      </LinkContainer>
    </Box>
  )
}

export type SideNavMobileProps = {
  path: string
}

// TODO consolidate into SideNav
const SideNavMobile = ({ path }: SideNavMobileProps) => {
  const { t } = useTranslation("page-developers-docs")

  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Add trailing slash to path for docLinks match
  const pageTitleId =
    getPageTitleId(path + "/", docLinks) || ("Change page" as TranslationKey)

  return (
    <Box
      position="sticky"
      zIndex={2}
      top="75px"
      bgColor="ednBackground"
      height="auto"
      w="full"
      hideFrom="lg"
    >
      <Center
        as={motion.div}
        fontWeight="medium"
        color="primary.base"
        cursor="pointer"
        py={4}
        px={8}
        boxSizing="border-box"
        bg="ednBackground"
        borderBottom="1px solid"
        borderBottomColor="border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Box me={2}>{t(pageTitleId)}</Box>
        <Box
          as={motion.div}
          cursor="pointer"
          display="flex"
          variants={dropdownIconContainerVariant}
          animate={isOpen ? "open" : "closed"}
        >
          <Icon as={MdChevronRight} boxSize={6} color="secondary" />
        </Box>
      </Center>
      <AnimatePresence>
        {isOpen && (
          <Box
            as={motion.nav}
            h="auto"
            maxH="calc(100vh - 139px)" // full height minus primary nav
            overflowY="scroll"
            overflowX="hidden"
            borderBottom="1px solid"
            borderBottomColor="border"
            p={2}
            key="nav"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              display: "block",
              transition: {
                duration: 1,
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.4,
              },
            }}
          >
            {docLinks.map((item, idx) => (
              <NavLink
                item={item}
                path={path}
                key={idx}
                toggle={() => setIsOpen(false)}
              />
            ))}
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default SideNavMobile
