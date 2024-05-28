import { useTranslation } from "next-i18next"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
} from "@chakra-ui/react"

import { ChildOnlyProp } from "@/lib/types"
import { DeveloperDocsLink } from "@/lib/interfaces"

import { BaseLink, LinkProps } from "@/components/Link"

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

  if (item.items) {
    return (
      <Accordion allowToggle defaultIndex={isTopLevel ? [0] : []}>
        <AccordionItem>
          <h2>
            <AccordionButton
              _hover={{
                bg: "primary.lowContrast",
                color: "primary.highContrast",
              }}
              _expanded={{
                bg: "none",
                color: "primary.highContrast",
              }}
            >
              <Box as="span" flex="1" textAlign="left">
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
          <AccordionPanel p={0} ps={8} pb={isTopLevel ? 4 : 0} fontSize="md">
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

export interface SideNavProps {
  path: string
  docLinks: DeveloperDocsLink[]
}

// TODO set tree state based on if current path is a child
// of the given parent. Currently all `path` items default to open
// and they only collapse when clicked on.
const SideNav = ({ path, docLinks }: SideNavProps) => {
  const { t } = useTranslation("page-developers-docs")

  return (
    <Flex
      as="nav"
      flexDir="column"
      position="sticky"
      top="19"
      pt={8}
      pb={16}
      h="calc(100vh - 80px)" // TODO take footer into account for height?
      w="calc((100% - 1448px) / 2 + 256px)"
      minW="256px"
      overflowY="auto"
      bgColor="background.base"
      boxShadow="1px 0px 0px rgba(0, 0, 0, 0.1)"
      borderInlineEnd="1px solid"
      borderInlineEndColor="border"
      // TODO: do this on the parent container
      // display={{ base: "none", lg: "block" }}
      aria-label={t("common:nav-developers-docs")}
      gap={2}
    >
      {docLinks.map((item, idx) => (
        <NavLink item={item} path={path} key={idx} isTopLevel />
      ))}
    </Flex>
  )
}

export default SideNav
