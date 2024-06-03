import dynamic from "next/dynamic"
import type { RefObject } from "react"
import { type ButtonProps } from "@chakra-ui/react"

import CSSDrawer from "@/components/CSSDrawer"

import type { NavSections } from "../types"

const Content = dynamic(() => import("./Content"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
})

type MobileNavMenuProps = ButtonProps & {
  isOpen: boolean
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
  linkSections: NavSections
  fromPageParameter: string
  drawerContainerRef: RefObject<HTMLElement | null>
}

const MobileNavMenu = ({
  isOpen,
  onToggle,
  toggleColorMode,
  toggleSearch,
  linkSections,
  fromPageParameter,
  drawerContainerRef,
  ...props
}: MobileNavMenuProps) => {
  return (
    <CSSDrawer>
      <Content
        linkSections={linkSections}
        onToggle={onToggle}
        toggleColorMode={toggleColorMode}
        toggleSearch={toggleSearch}
      />
    </CSSDrawer>
  )
}

export default MobileNavMenu
