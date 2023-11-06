import * as React from "react"
import { Heading } from "@chakra-ui/react"
import Translation from "../../Translation"

export const StandaloneQuizHeading = () => (
  <Heading
    as="h2"
    textAlign="center"
    scrollBehavior="smooth"
    scrollMarginTop={24}
    id="quiz"
  >
    <Translation id="test-your-knowledge" />
  </Heading>
)
