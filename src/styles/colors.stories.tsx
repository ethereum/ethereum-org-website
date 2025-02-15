import { type ReactNode } from "react"
import type { Meta, StoryObj } from "@storybook/react/"

import { HStack, Stack, VStack } from "@/components/ui/flex"

const meta = {
  title: "Design System/ShadCN Colors",
  parameters: {
    // Do not create snapshots for any stories in the file.
    chromatic: { disableSnapshot: true },
  },
} satisfies Meta

export default meta

/**
 * Get all CSS Variables in the document.
 *
 * Used to search CSS Variables and retrieve their values.
 *
 * NOTE: Function created with AI assistance
 */
const getCSSCustomPropIndex = () => {
  const rootStyles = document.styleSheets
  const variables = {}

  for (const sheet of rootStyles) {
    for (const rule of sheet.cssRules) {
      // Check for CSSStyleRule type as `selectorText` might not always be available
      if (rule instanceof CSSStyleRule && rule.selectorText === ":root") {
        for (const style of rule.style) {
          if (style.startsWith("--")) {
            variables[style] = rule.style.getPropertyValue(style).trim()
          }
        }
      }
    }
  }
  return variables as Record<string, string>
}
const primitiveColorKeys = ["gray", "purple"] as const
export const Primitives: StoryObj = {
  render: () => {
    const cssVarsEntries = Object.entries(getCSSCustomPropIndex())

    return (
      <Stack className="gap-16">
        {primitiveColorKeys.map((color) => (
          <ColorGroupWrapper key={color} color={color}>
            <HStack className="justify-between gap-4">
              {cssVarsEntries
                .filter(([key]) => key.startsWith(`--${color}`))
                .map(([tokenKey, value]) => (
                  <VStack key={`${tokenKey}-${value}`}>
                    <div>
                      <div
                        className="size-20"
                        style={{ background: `hsla(var(${tokenKey}))` }}
                      />
                    </div>
                    <Stack>
                      <span>{value}</span>
                      <span>{tokenKey}</span>
                    </Stack>
                  </VStack>
                ))}
            </HStack>
          </ColorGroupWrapper>
        ))}
      </Stack>
    )
  },
}

const ColorGroupWrapper = ({
  color,
  children,
}: {
  color: (typeof primitiveColorKeys)[number]
  children: ReactNode
}) => (
  <div
    key={color}
    className="bg-gradient-to-t from-[#1b1b1b] from-65% to-white to-35% p-8 text-white"
  >
    {children}
  </div>
)

// bg-linear-[180deg,_#1b1b1b_35%,_#fff_35%]
