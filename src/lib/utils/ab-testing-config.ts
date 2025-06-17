import { ABTestConfig } from "@/lib/types/ab-testing"

function getEnvVar(key: string, defaultValue: string = ""): string {
  return process.env[`NEXT_PUBLIC_${key}`] || defaultValue
}

function parseVariantWeights(
  envKey: string
): { name: string; weight: number }[] {
  // Format: "original:50,variant_b:30,variant_c:20"
  const variantString = getEnvVar(envKey, "original:100")

  return variantString.split(",").map((variant) => {
    const [name, weight] = variant.split(":")
    return {
      name: name.trim(),
      weight: parseInt(weight.trim()) || 0,
    }
  })
}

export const getABTestConfigs = (): Record<string, ABTestConfig> => {
  return {
    // Example test - you can add more here
    homepagePersonaCTAs: {
      name: "HomepagePersonaCTAs",
      id: getEnvVar("ABTEST_HOMEPAGE_PERSONA_CTAS_ID", "1"),
      enabled: getEnvVar("ABTEST_HOMEPAGE_PERSONA_CTAS_ENABLED") === "true",
      variants: parseVariantWeights("ABTEST_HOMEPAGE_PERSONA_CTAS_VARIANTS"),
    },
    // Add more tests as needed:
    // walletCardLayout: {
    //   name: "WalletCardLayout",
    //   id: getEnvVar("ABTEST_WALLET_CARD_LAYOUT_ID", "2"),
    //   enabled: getEnvVar("ABTEST_WALLET_CARD_LAYOUT_ENABLED") === "true",
    //   variants: parseVariantWeights("ABTEST_WALLET_CARD_LAYOUT_VARIANTS")
    // }
  }
}
