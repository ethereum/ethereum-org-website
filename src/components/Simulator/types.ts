import { CONNECT_WEB3, CREATE_ACCOUNT, SEND_RECEIVE } from "./constants"

export type PathId =
  | typeof CREATE_ACCOUNT
  | typeof SEND_RECEIVE
  | typeof CONNECT_WEB3
