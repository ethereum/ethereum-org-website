import { fetchBeaconchainEpoch } from "@/lib/api/refactor/fetchBeaconchainEpoch"
import { fetchCalendarEvents } from "@/lib/api/refactor/fetchCalendarEvents"
import { fetchEthPrice } from "@/lib/api/refactor/fetchEthPrice"
import { fetchTotalValueLocked } from "@/lib/api/refactor/fetchTotalValueLocked"

export interface ExternalService {
  name: string
  key: string
  url: string
  function: () => Promise<unknown>
}

export const externalServices: ExternalService[] = [
  {
    name: "Beaconcha.in epoch",
    key: "beaconchainEpoch",
    url: "https://beaconcha.in/api/v1/epoch/latest",
    function: fetchBeaconchainEpoch,
  },
  {
    name: "Calendar Events - Google Calendar",
    key: "calendarEvents",
    url: "https://content.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${apiKey}&timeMin=${new Date().toISOString()}&maxResults=3&singleEvents=true&orderby=starttime",
    function: fetchCalendarEvents,
  },
  {
    name: "ETH Price - CoinGecko",
    key: "ethPrice",
    url: "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
    function: fetchEthPrice,
  },
  {
    name: "TVL - Defi Llama",
    key: "totalValueLocked",
    url: "https://api.llama.fi/charts/Ethereum",
    function: fetchTotalValueLocked,
  },
]
