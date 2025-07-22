import fs from "fs"
import path from "path"

import { CommunityConference } from "@/lib/types"

import localEvents from "../data/community-events.json"

import { EthereumEventsImport } from "./events/ethereum-events-import"

import "dotenv/config"
;(async () => {
  const communityEvents = localEvents as CommunityConference[]

  console.log("Community Events Import..")
  const year = new Date().getFullYear()
  const ethereumEvents = await EthereumEventsImport(year)
  // Can add multiple event sources here in the future

  // Try to fetch next year too, if page available
  try {
    const eventsNextYear = await EthereumEventsImport(year + 1)
    ethereumEvents.push(...eventsNextYear)
  } catch (error: unknown) {
    console.error((error as Error).message)
  }

  ethereumEvents.forEach((imported) => {
    const id = communityEvents.findIndex((local) =>
      tryMatchEvent(imported, local)
    )
    if (id > -1) {
      const local = communityEvents[id]
      if (imported.imageUrl && !local.imageUrl)
        local.imageUrl = imported.imageUrl
      if (imported.description && !local.description)
        local.description = imported.description
    } else {
      communityEvents.push(imported)
    }
  })

  // Write to Events.json
  const eventsPath = path.join(__dirname, "..", "data/community-events.json")
  fs.writeFileSync(eventsPath, JSON.stringify(communityEvents, null, 2))
})()

function tryMatchEvent(
  imported: CommunityConference,
  local: CommunityConference
) {
  if (
    imported.title.toLocaleLowerCase() === local.title.toLocaleLowerCase() &&
    local.startDate === imported.startDate &&
    local.endDate === imported.endDate
  )
    return true

  if (
    URL.canParse(imported.href) &&
    URL.canParse(local.href) &&
    new URL(imported.href).hostname.replace("www.", "") ===
      new URL(local.href).hostname.replace("www.", "") &&
    new URL(imported.href).pathname === new URL(local.href).pathname &&
    local.startDate === imported.startDate &&
    local.endDate === imported.endDate
  ) {
    return true
  }

  return false
}
