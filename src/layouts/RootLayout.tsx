import { Box } from "@chakra-ui/react"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

export const RootLayout = ({ children }) => (
  <Box px={20}>
    {/* TODO: get proper path value after setting i18n */}
    <Nav path="" />

    {children}

    <Box px={2}>
      <Footer />
    </Box>
  </Box>
)
