import { Container } from "@chakra-ui/react"

import Nav from "@/components/Nav"
import Footer from "@/components/Footer"

import { lightTheme as oldTheme } from "../theme"

export const RootLayout = ({ children }) => (
  <Container mx="auto" maxW={oldTheme.variables.maxPageWidth}>
    {/* TODO: get proper path value after setting i18n */}
    <Nav path="" />

    {children}

    <Footer />
  </Container>
)
