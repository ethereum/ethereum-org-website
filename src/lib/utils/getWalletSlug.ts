import type { WalletData } from "@/lib/types"

import { slugify } from "@/lib/utils/url"

/**
 * Canonical mapping from a wallet to its URL slug (also its React key).
 *
 * Defaults to `slugify(name)`; a wallet may pin an explicit `slug` to keep its
 * URL stable across a rename. Lives in its own dependency-free module so client
 * components (`WalletCard`, `WalletsCatalog`) can use it without pulling in
 * `walletData`.
 */
export const getWalletSlug = (
  wallet: Pick<WalletData, "name" | "slug">
): string => wallet.slug ?? slugify(wallet.name)
