import {
  CIRCLE,
  CONNECT_WEB3,
  CREATE_ACCOUNT,
  FULL_BUTTON,
  NARROW_BUTTON,
  SEND_RECEIVE,
} from "./constants"
import { SimulatorDetails } from "./interfaces"

export type PathId =
  | typeof CREATE_ACCOUNT
  | typeof SEND_RECEIVE
  | typeof CONNECT_WEB3

export type SimulatorData = Record<PathId, SimulatorDetails>

export type PulseOption =
  | typeof CIRCLE
  | typeof FULL_BUTTON
  | typeof NARROW_BUTTON
