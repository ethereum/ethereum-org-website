import React, { ReactNode, useState } from "react"
import { Box, Center, HStack, Icon } from "@chakra-ui/react"

import { motion, AnimatePresence } from "framer-motion"
import { MdExpandMore } from "react-icons/md"

import Link, { IProps as ILinkProps } from "./Link"
import Translation from "./Translation"
import { isLang } from "../utils/languages"
import { dropdownIconContainerVariant } from "./SharedStyledComponents"
import { IPropsNavLink as INavLinkProps } from "./SideNav"

import docLinks from "../data/developer-docs-links.yaml"
import { DeveloperDocsLink } from "../types"
import { TranslationKey } from "../utils/translations"

// Traverse all links to find page id
const getPageTitleId = (
  to: string,
  links: Array<DeveloperDocsLink>
): TranslationKey => {
  for (const link of links) {
    if (link.to === to) {
      return link.id
    }
    if (link.items) {
      let pageTitle = getPageTitleId(to, link.items)
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

const LinkContainer: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <HStack
      w="full"
      justify="space-between"
      py={2}
      pr={8}
      pl={2}
      _hover={{
        bgColor: "ednBackground",
      }}
    >
      {children}
    </HStack>
  )
}

const SideNavLink: React.FC<ILinkProps> = ({ children, ...props }) => {
  return (
    <Link
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
    </Link>
  )
}

export interface IPropsNavLink extends INavLinkProps {
  toggle: () => void
}

const NavLink: React.FC<IPropsNavLink> = ({ item, path, toggle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  if (item.items) {
    return (
      <Box>
        <LinkContainer>
          {item.to && (
            <SideNavLink to={item.to} isPartiallyActive={false}>
              <Translation id={item.id} />
            </SideNavLink>
          )}
          {!item.to && (
            <Box w="full" cursor="pointer" onClick={() => setIsOpen(!isOpen)}>
              <Translation id={item.id} />
            </Box>
          )}
          <Box
            as={motion.div}
            cursor="pointer"
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <Icon as={MdExpandMore} boxSize={6} color="secondary" />
          </Box>
        </LinkContainer>
        <Box
          as={motion.div}
          fontSize="sm"
          lineHeight="tall"
          fontWeight="normal"
          pl={4}
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
        <SideNavLink to={item.to} isPartiallyActive={false}>
          <Translation id={item.id} />
        </SideNavLink>
      </LinkContainer>
    </Box>
  )
}

export interface IProps {
  path: string
}

// TODO consolidate into SideNav
const SideNavMobile: React.FC<IProps> = ({ path }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // Strip language path
  let pagePath = path
  if (isLang(pagePath.split("/")[1])) {
    pagePath = pagePath.substring(3)
  }
  let pageTitleId = getPageTitleId(pagePath, docLinks)
  if (!pageTitleId) {
    console.warn(`No id found for "pagePath": `, pagePath)
    pageTitleId = `Change page` as TranslationKey
  }
  return (
    <Box
      position="sticky"
      zIndex={2}
      top="75px"
      bgColor="ednBackground"
      height="auto"
      w="full"
      display={{ base: "block", lg: "none" }}
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
        <Box mr={2}>
          <Translation id={pageTitleId} />
        </Box>
        <Box
          as={motion.div}
          cursor="pointer"
          variants={dropdownIconContainerVariant}
          animate={isOpen ? "open" : "closed"}
        >
          <Icon as={MdExpandMore} boxSize={6} color="secondary" />
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
