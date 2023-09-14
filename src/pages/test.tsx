import { Center } from "@chakra-ui/react"

import InlineLink, { BaseLink } from "@/components/Link"
import ButtonLink from "@/components/ButtonLink"

export default function Test() {
  return (
    <Center w="full" h="100vh" display="flex" flexDirection="column" gap={4}>
      <BaseLink href="/">Test</BaseLink>
      <InlineLink to="/">Test inline</InlineLink>
      <BaseLink href="https://www.google.com/">External</BaseLink>
      <BaseLink href="https://www.google.com/" hideArrow>
        External (hide arrow)
      </BaseLink>
      <BaseLink href="/discord/">Discord</BaseLink>
      <ButtonLink href="/" variant="outline" isSecondary>
        button link
      </ButtonLink>
    </Center>
  )
}
