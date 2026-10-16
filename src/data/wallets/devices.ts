import type { WalletData } from "@/lib/types"

/**
 * `hardware` means the wallet is a hardware device, not the `hardware_support`
 * feature. Keep this module dependency-free — client components import it,
 * and `walletData` reaches Node built-ins via `md`.
 */
export type WalletDeviceId = "desktop" | "mobile" | "browser" | "hardware"

export const WALLET_DEVICE_IDS: WalletDeviceId[] = [
  "desktop",
  "mobile",
  "browser",
  "hardware",
]

const DEVICE_LABEL_KEYS: Record<WalletDeviceId, string> = {
  desktop: "page-find-wallet-desktop",
  mobile: "page-find-wallet-mobile",
  browser: "page-find-wallet-browser",
  hardware: "page-find-wallet-hardware",
}

export function getWalletDevices(
  wallet: WalletData
): Record<WalletDeviceId, boolean> {
  return {
    desktop: wallet.linux || wallet.windows || wallet.macOS,
    mobile: wallet.ios || wallet.android,
    browser: wallet.firefox || wallet.chromium,
    hardware: wallet.hardware,
  }
}

export function buildDeviceLabels(
  t: (key: string) => string
): Record<WalletDeviceId, string> {
  return Object.fromEntries(
    WALLET_DEVICE_IDS.map((id) => [id, t(DEVICE_LABEL_KEYS[id])])
  ) as Record<WalletDeviceId, string>
}

export function getDeviceLabels(
  devices: Record<WalletDeviceId, boolean>,
  labels: Record<WalletDeviceId, string>
): string[] {
  return WALLET_DEVICE_IDS.filter((id) => devices[id]).map((id) => labels[id])
}
