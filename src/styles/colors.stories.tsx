import { type ReactNode } from "react"
import capitalize from "lodash/capitalize"
import type { Meta, StoryObj } from "@storybook/react"

import { HStack, Stack, VStack } from "@/components/ui/flex"

import { cn } from "@/lib/utils/cn"

const meta = {
  title: "Design System / Colors",
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

const cssVarsEntries = Object.entries(getCSSCustomPropIndex())

const primitiveColorKeys = ["gray", "purple"] as const
export const Primitives: StoryObj = {
  render: () => {
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

export const SemanticScheme: StoryObj = {
  render: () => {
    const tokenNames = [
      "primary",
      "body",
      "background",
      "disabled",
      "success",
      "warning",
      "error",
    ] as const

    return (
      <Stack className="gap-16">
        {tokenNames.map((tokenName) => {
          const variableObj = cssVarsEntries.filter(([key]) =>
            key.startsWith(`--${tokenName}`)
          )

          return (
            <Stack key={tokenName} className="gap-4">
              <h2>{capitalize(tokenName)}</h2>
              <HStack className="gap-8">
                {variableObj.map((variable) => (
                  <SemanticColorBlock
                    key={JSON.stringify(variable)}
                    variable={variable}
                  />
                ))}
              </HStack>
            </Stack>
          )
        })}
      </Stack>
    )
  },
}

const SemanticColorBlock = ({
  variable: [varName, varValue],
}: {
  variable: [string, string]
}) => (
  <VStack key={`${varName}-${varValue}`} className="mb-auto">
    <div
      className={cn(
        "size-20",
        varName === "--background" || varName === "--body-inverse"
          ? "border"
          : undefined
      )}
      style={{ background: `hsla(var(${varName}))` }}
    />
    <span>{varName}</span>
  </VStack>
)
