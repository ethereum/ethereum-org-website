/**
 * The lesson's sample persona. These are example on-chain values rendered
 * as-is (addresses, names) or formatted in code (amounts); none are copy.
 * The IP is from the TEST-NET-3 documentation range.
 */
export const persona = {
  main: "0x7a3f…c21d",
  mainFull: "0x7a3f9e21b0c4d85e6f1a2b3c4d5e6f708192c21d",
  addresses: ["0x7a3f…c21d", "0x51be…09a4", "0xd90c…77e1", "0x2f68…b35e"],
  ip: "203.0.113.47",
  friend: "sam.eth",
  ens: "yourname.eth",
  handle: "@yourname",
  payroll: "0x9f2e…a611",
  landlord: "0x44c0…e9f3",
  deposit: "0x3b7d…1f02",
  /** Block the dinner payment lands in; formatted with numberFormat */
  block: 26084113,
} as const
