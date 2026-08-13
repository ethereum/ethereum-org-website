/**
 * Upgrade sync tests.
 *
 * The Forkcast → UpgradeData mapping is the artifact reviewers check, so it is
 * pinned here against a hand-built fixture rather than the network. Drift
 * classification is pinned too: getting scalar vs structural wrong is the
 * difference between a bot opening a data PR and a human being asked to write.
 */

import { expect, test } from "@playwright/test"

import type { ForkcastSource } from "../../../src/scripts/sync-upgrades/forkcast"
import {
  normalize,
  parsePartialDate,
} from "../../../src/scripts/sync-upgrades/normalize"

const source: ForkcastSource = {
  commit: "abc1234",
  upgrades: [
    {
      id: "previous-upgrades",
      name: "Previous Upgrades",
      status: "Live",
      activationDate: null,
      activationDetails: null,
      disabled: true,
      path: "/upgrade/previous-upgrades",
    },
    {
      id: "fusaka",
      name: "Fusaka Upgrade",
      status: "Live",
      activationDate: "Dec 3, 2025",
      activationDetails: {
        blockNumber: 23935694,
        epochNumber: 411392,
        slotNumber: 13164544,
      },
      disabled: false,
      path: "/upgrade/fusaka",
    },
    {
      id: "glamsterdam",
      name: "Glamsterdam Upgrade",
      status: "Upcoming",
      activationDate: "2026",
      activationDetails: null,
      disabled: false,
      path: "/upgrade/glamsterdam",
    },
  ],
  relationships: [
    {
      eipId: 7732,
      forkName: "Glamsterdam",
      statusHistory: [
        { status: "Scheduled", call: "acde/236", date: "2026-05-07" },
      ],
    },
    {
      eipId: 8159,
      forkName: "Glamsterdam",
      statusHistory: [
        { status: "Considered", call: "acde/230", date: "2026-02-12" },
        { status: "Networking", call: null, date: null },
      ],
    },
    {
      eipId: 9999,
      forkName: "Glamsterdam",
      statusHistory: [{ status: "Declined", call: null, date: null }],
    },
  ],
  devnetLaunches: {
    glamsterdam: [
      { version: 6, dateISO: "2026-06-25" },
      { version: 7, dateISO: "2026-07-14" },
    ],
  },
  phases: {
    glamsterdam: [
      {
        phaseId: "public-testnets",
        status: "upcoming",
        projectedDate: "Q3 2026",
        actualEndDate: null,
        testnets: [
          { name: "Holešky", status: "deprecated", projectedDate: null },
          { name: "Sepolia", status: "upcoming", projectedDate: "Q3 2026" },
          { name: "Hoodi", status: "upcoming", projectedDate: "Q3 2026" },
        ],
      },
      {
        phaseId: "mainnet-deployment",
        status: "upcoming",
        projectedDate: "Q4 2026",
        actualEndDate: null,
        testnets: [],
      },
    ],
    fusaka: [
      {
        phaseId: "mainnet-deployment",
        status: "completed",
        projectedDate: null,
        actualEndDate: "Dec 3, 2025",
        testnets: [],
      },
    ],
  },
}

test("parses every date shape Forkcast writes", () => {
  expect(parsePartialDate("2026")).toEqual({ year: 2026 })
  expect(parsePartialDate("Dec 3, 2025")).toEqual({
    year: 2025,
    month: 12,
    day: 3,
  })
  expect(parsePartialDate("Feb 2026")).toEqual({ year: 2026, month: 2 })
  expect(parsePartialDate("Q4 2026")).toEqual({ year: 2026, quarter: 4 })
  expect(parsePartialDate(null)).toBeNull()
  expect(parsePartialDate("whenever")).toBeNull()
})

test("a quarter range degrades to the year rather than picking a bound", () => {
  expect(parsePartialDate("Q3-Q4 2026")).toEqual({ year: 2026 })
  expect(parsePartialDate("Q2-Q3 2027")).toEqual({ year: 2027 })
})

test("the phase timeline wins when it states the target more precisely", () => {
  const store = normalize(source)
  expect(store.glamsterdam.mainnetTarget.when).toEqual({
    year: 2026,
    quarter: 4,
  })
})

test("public testnet forks become milestones, skipping deprecated networks", () => {
  const { milestones } = normalize(source).glamsterdam
  const testnets = milestones.filter((m) => m.kind === "testnet")
  expect(testnets.map((m) => m.name)).toEqual(["Sepolia fork", "Hoodi fork"])
  expect(testnets[0].when).toEqual({ year: 2026, quarter: 3 })
  expect(milestones.some((m) => m.name.includes("Holešky"))).toBe(false)
})

test("drops the signpost record and keeps real upgrades", () => {
  const store = normalize(source)
  expect(Object.keys(store).sort()).toEqual(["fusaka", "glamsterdam"])
  expect(store.glamsterdam.name).toBe("Glamsterdam")
})

test("confirmed is driven by activation details, not by status", () => {
  const store = normalize(source)
  expect(store.fusaka.mainnetTarget.confirmed).toBe(true)
  expect(store.glamsterdam.mainnetTarget.confirmed).toBe(false)
})

test("a projected quarter is never marked confirmed", () => {
  const { mainnetTarget } = normalize(source).glamsterdam
  expect(mainnetTarget.when).toEqual({ year: 2026, quarter: 4 })
  expect(mainnetTarget.confirmed).toBe(false)
})

test("Networking maps to scheduled plus a kind flag, never a status of its own", () => {
  const { eips } = normalize(source).glamsterdam
  const networking = eips.find((e) => e.id === 8159)!
  expect(networking.status).toBe("scheduled")
  expect(networking.networking).toBe(true)

  const ordinary = eips.find((e) => e.id === 7732)!
  expect(ordinary.networking).toBe(false)
  expect(ordinary.decidedAt).toEqual({ call: "acde/236", date: "2026-05-07" })
})

test("stores only EIPs expected to ship", () => {
  const { eips } = normalize(source).glamsterdam
  // 9999 is declined upstream, so it has no entry rather than a labelled one.
  expect(eips.find((e) => e.id === 9999)).toBeUndefined()
  expect(eips.map((e) => e.id)).toEqual([7732, 8159])
})

test("latest devnet is live while the fork is unshipped", () => {
  const { milestones } = normalize(source).glamsterdam
  expect(
    milestones.filter((m) => m.kind === "devnet").map((m) => [m.name, m.status])
  ).toEqual([
    ["Devnet-6", "complete"],
    ["Devnet-7", "live"],
  ])
})

test("a shipped fork has a complete mainnet milestone", () => {
  const { milestones } = normalize(source).fusaka
  expect(milestones).toEqual([
    {
      name: "Mainnet activation",
      kind: "mainnet",
      when: { year: 2025, month: 12, day: 3 },
      status: "complete",
    },
  ])
})

test("unmapped upstream values fail loudly rather than emitting a gap", () => {
  const broken: ForkcastSource = {
    ...source,
    relationships: [
      {
        eipId: 1,
        forkName: "Glamsterdam",
        statusHistory: [{ status: "Bikeshedding", call: null, date: null }],
      },
    ],
  }
  expect(() => normalize(broken)).toThrow(/Unmapped Forkcast EIP status/)
})

test("milestones are emitted in release order", () => {
  const { milestones } = normalize(source).glamsterdam
  expect(milestones.map((m) => m.kind)).toEqual([
    "devnet",
    "devnet",
    "testnet",
    "testnet",
    "mainnet",
  ])
})

test("release stage outranks the date when precision degrades", () => {
  // Hegota's shape: testnet forks known only to the year, mainnet to a quarter.
  // Sorting on dates alone puts activation first, because a bare year sorts to
  // the end of that year while Q2 sorts to June.
  const degraded: ForkcastSource = {
    ...source,
    upgrades: [
      {
        id: "hegota",
        name: "Hegota Upgrade",
        status: "Planning",
        activationDate: "2027",
        activationDetails: null,
        disabled: false,
        path: "/upgrade/hegota",
      },
    ],
    devnetLaunches: {},
    phases: {
      hegota: [
        {
          phaseId: "public-testnets",
          status: "upcoming",
          projectedDate: "2027",
          actualEndDate: null,
          testnets: [
            { name: "Sepolia", status: "upcoming", projectedDate: "2027" },
          ],
        },
        {
          phaseId: "mainnet-deployment",
          status: "upcoming",
          projectedDate: "Q2 2027",
          actualEndDate: null,
          testnets: [],
        },
      ],
    },
  }

  const { milestones } = normalize(degraded).hegota
  expect(milestones.map((m) => [m.kind, m.when])).toEqual([
    ["testnet", { year: 2027 }],
    ["mainnet", { year: 2027, quarter: 2 }],
  ])
})
