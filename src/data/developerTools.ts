export const DEV_TOOL_CATEGORY_SLUG_LIST = [
  "interoperability",
  "transactions",
  "analytics",
  "education",
  "sdks",
  "contracts",
  "security",
] as const

export type DeveloperToolCategorySlug =
  (typeof DEV_TOOL_CATEGORY_SLUG_LIST)[number]

export const DEV_TOOL_CATEGORY_SLUGS = {
  "Cross-Chain & Interoperability": "interoperability",
  "Transaction & Wallet Infrastructure": "transactions",
  "Data, Analytics & Tracing": "analytics",
  "Education & Community Resources": "education",
  "Client Libraries & SDKs (Front-End)": "sdks",
  "Smart Contract Development & Toolchains": "contracts",
  "Security, Testing & Formal Verification": "security",
} satisfies Record<string, DeveloperToolCategorySlug>
