import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useTranslation } from "next-i18next"
import { MdChevronRight } from "react-icons/md"

import { ChildOnlyProp } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import docLinks from "../data/developer-docs-links.yaml"

import { HStack } from "./ui/flex"
import { BaseLink, LinkProps } from "./ui/Link"

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
    display: "block",
  },
  closed: {
    opacity: 0,
    display: "none",
  },
}

const LinkContainer = ({ children }: ChildOnlyProp) => {
  return (
    <HStack className="w-full justify-between py-2 pe-4 ps-8 hover:bg-background-highlight">
      {children}
    </HStack>
  )
}

const SideNavLink = ({ children, ...props }: LinkProps) => {
  return (
    <BaseLink
      className="w-full font-normal text-body no-underline hover:text-primary"
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
    isTopLevel || path.includes(item.href) || path.includes(item.path)
  const [isOpen, setIsOpen] = useState<boolean>(isLinkInPath)

  useEffect(() => {
    // Only set on items that contain a link
    // Otherwise items w/ `path` would re-open every path change
    if (item.href) {
      const shouldOpen = path.includes(item.href) || path.includes(item.path)
      setIsOpen(shouldOpen)
    }
  }, [path, item.path, item.href])

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
          className="ms-4 text-sm font-normal leading-relaxed"
          key={item.id}
          animate={isOpen ? "open" : "closed"}
          variants={innerLinksVariants}
          initial={isOpen ? "open" : "closed"}
        >
          {item.items.map((childItem, idx) => (
            <NavLink item={childItem} path={path} key={idx} />
          ))}
        </motion.div>
      </div>
    )
  }
  return (
    <div>
      <LinkContainer>
        <SideNavLink href={item.href} isPartiallyActive={false}>
          {t(item.id)}
        </SideNavLink>
      </LinkContainer>
    </div>
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
    <nav
      className="sticky top-[4.75rem] hidden h-[calc(100vh-80px)] w-[calc((100%-1448px)/2+256px)] min-w-[256px] overflow-y-auto border-e bg-background pb-16 pt-8 shadow-[1px_0px_0px_rgba(0,0,0,0.1)] transition-transform duration-200 lg:block"
      aria-label={t("common:nav-developers-docs")}
    >
      {docLinks.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} isTopLevel />
      ))}
    </nav>
  )
}

export default SideNav
