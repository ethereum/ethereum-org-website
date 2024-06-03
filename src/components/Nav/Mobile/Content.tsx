import { Stack } from "@chakra-ui/react"

import MenuBody from "./MenuBody"
import MenuFooter from "./MenuFooter"
import MenuHeader from "./MenuHeader"

type Props = {
  linkSections: any
  onToggle: () => void
  toggleColorMode: () => void
  toggleSearch: () => void
}

function Content({
  linkSections,
  onToggle,
  toggleColorMode,
  toggleSearch,
}: Props) {
  return (
    <Stack direction="column" bg="background.base" h="full" gap="0">
      {/* HEADER ELEMENTS: SITE NAME, CLOSE BUTTON */}
      <MenuHeader />

      {/* MAIN NAV ACCORDION CONTENTS OF MOBILE MENU */}
      <MenuBody linkSections={linkSections} onToggle={onToggle} />

      {/* FOOTER ELEMENTS: SEARCH, LIGHT/DARK, LANGUAGES */}
      <MenuFooter
        onToggle={onToggle}
        toggleSearch={toggleSearch}
        toggleColorMode={toggleColorMode}
      />
    </Stack>
  )
}

export default Content
