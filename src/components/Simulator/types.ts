import {
  CONNECT_WEB3,
  CREATE_ACCOUNT,
  SEND_RECEIVE,
  CIRCLE,
  FULL_BUTTON,
  NARROW_BUTTON,
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
