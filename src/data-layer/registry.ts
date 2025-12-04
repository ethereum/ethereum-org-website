/**
 * Registry of all data-layer components.
 *
 * This includes Trigger.dev scheduled tasks
 * Tasks are automatically discovered by Trigger.dev, but this registry
 * provides reference.
 *
 * Task IDs can be used as keys for storage.
 */

import { FETCH_APPS_TASK_ID, fetchApps } from "./api/fetchApps"
import {
  FETCH_BEACONCHAIN_EPOCH_TASK_ID,
  fetchBeaconChainEpoch,
} from "./api/fetchBeaconChainEpoch"
import {
  FETCH_BEACONCHAIN_ETHSTORE_TASK_ID,
  fetchBeaconChainEthstore,
} from "./api/fetchBeaconChainEthstore"
import {
  FETCH_BLOBSCAN_STATS_TASK_ID,
  fetchBlobscanStats,
} from "./api/fetchBlobscanStats"
import {
  FETCH_CALENDAR_EVENTS_TASK_ID,
  fetchCalendarEvents,
} from "./api/fetchCalendarEvents"
import {
  FETCH_COMMUNITY_PICKS_TASK_ID,
  fetchCommunityPicks,
} from "./api/fetchCommunityPicks"
import {
  FETCH_ETHEREUM_MARKETCAP_TASK_ID,
  fetchEthereumMarketcap,
} from "./api/fetchEthereumMarketcap"

export const dailyTasks = [
  {
    id: FETCH_APPS_TASK_ID,
    fetchFunction: fetchApps,
  },
  {
    id: FETCH_CALENDAR_EVENTS_TASK_ID,
    fetchFunction: fetchCalendarEvents,
  },
  {
    id: FETCH_COMMUNITY_PICKS_TASK_ID,
    fetchFunction: fetchCommunityPicks,
  },
] as const

export const hourlyTasks = [
  {
    id: FETCH_BEACONCHAIN_EPOCH_TASK_ID,
    fetchFunction: fetchBeaconChainEpoch,
  },
  {
    id: FETCH_BEACONCHAIN_ETHSTORE_TASK_ID,
    fetchFunction: fetchBeaconChainEthstore,
  },
  {
    id: FETCH_BLOBSCAN_STATS_TASK_ID,
    fetchFunction: fetchBlobscanStats,
  },
  {
    id: FETCH_ETHEREUM_MARKETCAP_TASK_ID,
    fetchFunction: fetchEthereumMarketcap,
  },
] as const

export const tasks = [...dailyTasks, ...hourlyTasks] as const
