import React, { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdChevronRight } from "react-icons/md"

import type { ChildOnlyProp, TranslationKey } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import docLinks from "@/data/developer-docs-links.yaml"

import { Center, HStack } from "./ui/flex"
import { BaseLink, LinkProps } from "./ui/Link"
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
    <HStack className="w-full justify-between py-2 pe-8 ps-2 hover:bg-[ednBackground]">
      {children}
    </HStack>
  )
}

const SideNavLink = ({ children, ...props }: LinkProps) => {
  return (
    <BaseLink
      className="w-full text-body no-underline hover:text-primary"
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
      <div>
        <LinkContainer>
          {item.href && (
            <SideNavLink href={item.href} isPartiallyActive={false}>
              {t(item.id)}
            </SideNavLink>
          )}
          {!item.href && (
            <div
              className="w-full cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              {t(item.id)}
            </div>
          )}
          <motion.div
            className="flex cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <MdChevronRight className="h-6 w-6 text-body-medium" />
          </motion.div>
        </LinkContainer>
        <motion.div
          className="ps-4 text-sm font-normal leading-relaxed"
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial="closed"
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} toggle={toggle} />
          ))}
        </motion.div>
      </div>
    )
  }
  return (
    <div onClick={toggle}>
      <LinkContainer>
        <SideNavLink href={item.href} isPartiallyActive={false}>
          {t(item.id)}
        </SideNavLink>
      </LinkContainer>
    </div>
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
    <div className="sticky top-[75px] z-sticky h-auto w-full bg-background-highlight lg:hidden">
      <motion.div>
        <Center
          className="box-border cursor-pointer border-b bg-background-highlight px-8 py-4 font-medium text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div>{t(pageTitleId)}</div>
          <motion.div
            className="flex cursor-pointer"
            variants={dropdownIconContainerVariant}
            animate={isOpen ? "open" : "closed"}
          >
            <MdChevronRight className="h-6 w-6 text-body-medium" />
          </motion.div>
        </Center>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="max-h-[calc(100vh - 139px)] h-auto overflow-x-hidden overflow-y-scroll border-b p-2"
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
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  )
}

export default SideNavMobile
