import fs from "fs"
import path from "path"

import { CommunityConference } from "@/lib/types"

import localEvents from "../data/community-events.json"

import { EthereumEventsImport } from "./events/ethereum-events-import"

import "dotenv/config"
;(async () => {
  const communityEvents = localEvents as CommunityConference[]

  console.log("Community Events Import..")
  const ethereumEvents = await EthereumEventsImport()
  // Can add multiple event sources here in the future

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
  if (imported.title.toLocaleLowerCase() === local.title.toLocaleLowerCase())
    return true

  if (
    URL.canParse(imported.href) &&
    URL.canParse(local.href) &&
    new URL(imported.href).hostname.replace("www.", "") ===
      new URL(local.href).hostname.replace("www.", "") &&
    new URL(imported.href).pathname === new URL(local.href).pathname
  ) {
    return true
  }

  return false
}
