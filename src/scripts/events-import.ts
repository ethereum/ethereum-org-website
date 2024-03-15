import { EthereumEventsImport } from "./events/ethereum-events-import"

import "dotenv/config"

;(async () => {
  console.log("Community Events Import..")
  const ethereumEvents = await EthereumEventsImport()

  // Write to Events.json
})()
