import { useEffect, useState } from "react"
import { useTranslation } from "next-i18next"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  FlexProps,
} from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink, LinkProps } from "@/components/Link"

import { useRtlFlip } from "@/hooks/useRtlFlip"

export const dropdownIconContainerVariant = {
  open: {
    rotate: 90,
    transition: {
      duration: 0.4,
    },
  },
  closed: { rotate: 0 },
}

const LinkContainer = ({ children }: ChildOnlyProp) => {
  return (
    <Box
      py="2"
      px={{ base: "2", md: "4" }}
      _hover={{
        bg: "primary.lowContrast",
        color: "primary.highContrast",
      }}
    >
      {children}
    </Box>
  )
}

const SideNavLink = ({ children, ...props }: LinkProps) => {
  return (
    <BaseLink
      color="body.base"
      textDecoration="none"
      _hover={{ textDecoration: "none", color: "primary.highContrast" }}
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
  const { isRtl } = useRtlFlip()

  const isLinkInPath = path.includes(item.to) || path.includes(item.path)
  const [isOpen, setIsOpen] = useState(isTopLevel || isLinkInPath)

  useEffect(() => {
    if (isLinkInPath) {
      setIsOpen(true)
    }
  }, [isLinkInPath])

  if (item.items) {
    return (
      <Accordion
        allowToggle
        index={isOpen ? [0] : []}
        onChange={() => setIsOpen(!isOpen)}
      >
        <AccordionItem>
          <h2>
            <AccordionButton
              sx={{
                svg: {
                  transform: isRtl ? "rotate(90deg)" : "rotate(270deg)",
                },
              }}
              _expanded={{
                bg: "none",
                color: "primary.highContrast",
                svg: {
                  transform: "rotate(180deg)",
                },
              }}
              _hover={{
                bg: "primary.lowContrast",
                color: "primary.highContrast",
              }}
            >
              <Box as="span" flex="1" textAlign={isRtl ? "right" : "left"}>
                {item.to && (
                  <SideNavLink href={item.to} isPartiallyActive={false}>
                    {t(item.id)}
                  </SideNavLink>
                )}
                {!item.to && t(item.id)}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            as={Flex}
            direction="column"
            gap="2"
            fontSize="md"
            p="0"
            ps="2"
          >
            {item.items.map((childItem, idx) => (
              <NavLink item={childItem} path={path} key={idx} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    )
  }
  return (
    <LinkContainer>
      <SideNavLink href={item.to} isPartiallyActive={false} display="block">
        {t(item.id)}
      </SideNavLink>
    </LinkContainer>
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
      flexDir="column"
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
