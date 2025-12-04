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
  FETCH_CALENDAR_EVENTS_TASK_ID,
  fetchCalendarEvents,
} from "./api/fetchCalendarEvents"

export const dailyTasks = [
  {
    id: FETCH_APPS_TASK_ID,
    fetchFunction: fetchApps,
  },
  {
    id: FETCH_CALENDAR_EVENTS_TASK_ID,
    fetchFunction: fetchCalendarEvents,
  },
] as const

export const hourlyTasks = [
  {
    id: FETCH_BEACONCHAIN_EPOCH_TASK_ID,
    fetchFunction: fetchBeaconChainEpoch,
  },
] as const

export const tasks = [...dailyTasks, ...hourlyTasks] as const
