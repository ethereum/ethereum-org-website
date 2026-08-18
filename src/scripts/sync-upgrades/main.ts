/**
 * Syncs network upgrade facts from ethereum/forkcast into the generated store.
 *
 *   pnpm sync-upgrades
 *
 * The store is stale or hand-edited exactly when this script produces a diff,
 * so CI runs the sync and then `git diff --exit-code src/data/upgrades/`.
 * Path-filter that job — it reaches the network, and upstream downtime should
 * not fail unrelated builds.
 *
 * A parse or mapping failure exits non-zero without touching the store, so a
 * broken upstream leaves the last good data serving.
 */
import type { UpgradeStore } from "@/data/upgrades/types"

import { GENERATED_PATH, render, write } from "./emit"
import { FORKCAST_REPO, readForkcastSource } from "./forkcast"
import { normalize } from "./normalize"

const summarize = (store: UpgradeStore) => {
  for (const upgrade of Object.values(store)) {
    console.log(
      `  ${upgrade.slug.padEnd(14)} ${upgrade.status.padEnd(9)} ` +
        `eips=${String(upgrade.eips.length).padStart(3)} ` +
        `milestones=${upgrade.milestones.length}`
    )
  }
}

const main = async () => {
  console.log(`Fetching ${FORKCAST_REPO}…`)
  const source = await readForkcastSource()
  const next = normalize(source)
  console.log(
    `Parsed ${Object.keys(next).length} upgrades at ${source.commit}\n`
  )
  summarize(next)

  await write(GENERATED_PATH, render(next, FORKCAST_REPO))
  console.log(`\nWrote ${GENERATED_PATH}`)
}

main().catch((error) => {
  console.error(`\nUpgrade sync failed: ${error.message}`)
  process.exit(1)
})
