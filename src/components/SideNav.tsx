"use client"

import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"

import { ChildOnlyProp } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import docLinks from "../data/developer-docs-links.yaml"

import { HStack } from "./ui/flex"
import { BaseLink, LinkProps } from "./ui/Link"

import { useTranslation } from "@/hooks/useTranslation"
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
    <HStack className="w-full justify-between py-2 ps-8 pe-4 hover:bg-background-highlight">
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
}

const normalizePath = (path: string) => path.replace(/\/$/, "")

const isPathMatch = (currentPath: string, targetPath?: string) => {
  if (!targetPath) return false

  const current = normalizePath(currentPath)
  const target = normalizePath(targetPath)

  return current === target || current.startsWith(`${target}/`)
}

const isItemInPath = (item: DeveloperDocsLink, path: string): boolean => {
  if (isPathMatch(path, item.href)) return true

  return item.items?.some((childItem) => isItemInPath(childItem, path)) ?? false
}

const NavLink = ({ item, path }: NavLinkProps) => {
  const { t } = useTranslation("page-developers-docs")
  const isLinkInPath = isItemInPath(item, path)
  const [isOpen, setIsOpen] = useState<boolean>(isLinkInPath)

  useEffect(() => {
    setIsOpen(isLinkInPath)
  }, [isLinkInPath])

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
            <ChevronRight className="h-6 w-6 text-body-medium" />
          </motion.div>
        </LinkContainer>
        <motion.div
          className="ms-4 text-sm leading-relaxed font-normal"
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

const SideNav = ({ path }: SideNavProps) => {
  const { t } = useTranslation("page-developers-docs")

  return (
    <nav
      className="sticky top-[4.75rem] hidden h-[calc(100vh-80px)] w-[calc((100%-1448px)/2+256px)] min-w-[256px] overflow-y-auto border-e bg-background pt-8 pb-16 shadow-[1px_0px_0px_rgba(0,0,0,0.1)] transition-transform duration-200 lg:block"
      aria-label={t("common:nav-developers-docs")}
    >
      {docLinks.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} />
      ))}
    </nav>
  )
}

export default SideNav
