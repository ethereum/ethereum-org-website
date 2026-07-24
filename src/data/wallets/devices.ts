import type { WalletData } from "@/lib/types"

/**
 * The four flat device buckets drawn in the Figma revamp, derived from the raw
 * per-OS booleans on `WalletData`. Note `hardware` here means "is a hardware
 * wallet device" (the `hardware` field), distinct from the `hardware_support`
 * feature (software wallet that pairs with one).
 *
 * Dependency-free (imports only the `WalletData` type) so client components
 * (cards, catalog) can use the ids/labels without pulling in the server-only
 * `walletData` module, which reaches Node built-ins via `md`.
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

/**
 * Localized label per device id, built on the server so client components get
 * plain strings as props instead of pulling the i18n runtime into the bundle.
 */
export function buildDeviceLabels(
  t: (key: string) => string
): Record<WalletDeviceId, string> {
  return Object.fromEntries(
    WALLET_DEVICE_IDS.map((id) => [id, t(DEVICE_LABEL_KEYS[id])])
  ) as Record<WalletDeviceId, string>
}

/** The labels for the device buckets a wallet supports, in canonical order. */
export function getDeviceLabels(
  devices: Record<WalletDeviceId, boolean>,
  labels: Record<WalletDeviceId, string>
): string[] {
  return WALLET_DEVICE_IDS.filter((id) => devices[id]).map((id) => labels[id])
}
