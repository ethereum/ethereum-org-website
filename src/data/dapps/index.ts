import { DappCategory, DefiDapp } from "@/lib/types"

import { defiDapps } from "./defi"

export const dapps: Record<DappCategory, DefiDapp[]> = {
  defi: defiDapps,
}

export const VALID_DAPPS = Object.values(dapps).flatMap((categoryDapps) =>
  categoryDapps.map((dapp) => dapp.name)
)
