import React, { ReactNode } from "react"
import { useRouter } from "next/router"
import { Box, Text, VStack } from "@chakra-ui/react"

import Heading from "@/components/Heading"
import InlineLink from "@/components/Link"
import Tooltip, { type TooltipProps } from "@/components/Tooltip"
import Translation from "@/components/Translation"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { cleanPath } from "@/lib/utils/url"

type GlossaryTooltipProps = Omit<TooltipProps, "content"> & {
  children: ReactNode
  termKey: string
}

const GlossaryTooltip = ({
  children,
  termKey,
  ...props
}: GlossaryTooltipProps) => {
  const { asPath } = useRouter()

  return (
    <Box as="span" display="inline-block">
      <Tooltip
        {...props}
        content={
          <VStack spacing={2} align="stretch" textAlign="start">
            <Heading as="h6">
              <Translation
                id={termKey + "-term"}
                options={{ ns: "glossary-tooltip" }}
                // Override the default `a` tag transformation to avoid circular
                // dependency issues
                transform={{ a: InlineLink }}
              />
            </Heading>
            {/**
             * `as="span"` prevents hydration warnings for strings that contain
             * elements that cannot be nested inside `p` tags, like `ul` tags
             * (found in some Glossary definition).
             * TODO: Develop a better solution to handle this case.
             */}
            <Text as="span">
              <Translation
                id={termKey + "-definition"}
                options={{ ns: "glossary-tooltip" }}
                // Override the default `a` tag transformation to avoid circular
                // dependency issues
                transform={{ a: InlineLink }}
              />
            </Text>
          </VStack>
        }
        onBeforeOpen={() => {
          trackCustomEvent({
            eventCategory: "Glossary Tooltip",
            eventAction: cleanPath(asPath),
            eventName: termKey,
          })
        }}
      >
        <Text
          as="u"
          textDecorationStyle="dotted"
          textUnderlineOffset="3px"
          _hover={{
            textDecorationColor: "primary.hover",
            color: "primary.hover",
          }}
          cursor="help"
        >
          {children}
        </Text>
      </Tooltip>
    </Box>
  )
}

export default GlossaryTooltip
