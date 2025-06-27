import { ABTestConfig } from "./types"

function getEnvVar(key: string, defaultValue: string = ""): string {
  return process.env[key] || defaultValue
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
    AppTest: {
      name: "AppTest",
      id: getEnvVar("ABTEST_APP_TEST_ID", "1"),
      enabled: getEnvVar("ABTEST_APP_TEST_ENABLED") === "true",
      variants: parseVariantWeights("ABTEST_APP_TEST_VARIANTS"),
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
