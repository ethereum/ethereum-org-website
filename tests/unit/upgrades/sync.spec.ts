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
  parsePhases,
  parseUpgrades,
} from "../../../src/scripts/sync-upgrades/forkcast"
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
      path: "/upgrade/fusaka",
    },
    {
      id: "glamsterdam",
      name: "Glamsterdam Upgrade",
      status: "Upcoming",
      activationDate: "2026",
      activationDetails: null,
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
          { name: "Holešky", status: "deprecated", stated: null },
          {
            name: "Sepolia",
            status: "upcoming",
            stated: { claim: "projected", value: "Q3 2026" },
          },
          {
            name: "Hoodi",
            status: "upcoming",
            stated: { claim: "projected", value: "Q3 2026" },
          },
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
  expect(testnets.map((m) => m.network)).toEqual(["Sepolia", "Hoodi"])
  expect(testnets[0].when).toEqual({ year: 2026, quarter: 3 })
  expect(testnets[0].status).toBe("projected")
  expect(testnets.some((m) => m.network === "Holešky")).toBe(false)
})

test("drops the signpost record and keeps real upgrades", () => {
  const store = normalize(source)
  expect(Object.keys(store).sort()).toEqual(["fusaka", "glamsterdam"])
  expect(store.glamsterdam.name).toBe("Glamsterdam")
})

test("confirmed means the date is settled, by epoch or by having shipped", () => {
  const store = normalize(source)
  expect(store.fusaka.mainnetTarget.confirmed).toBe(true)
  expect(store.glamsterdam.mainnetTarget.confirmed).toBe(false)

  // Forkcast records no activation epoch for the pre-Pectra forks, but their
  // dates are years in the past and must not read as tentative.
  const historical: ForkcastSource = {
    ...source,
    upgrades: [
      {
        id: "dencun",
        name: "Dencun Upgrade",
        status: "Live",
        activationDate: "Mar 13, 2024",
        activationDetails: null,
        path: "/upgrade/dencun",
      },
    ],
    relationships: [],
    devnetLaunches: {},
    phases: {},
  }
  expect(normalize(historical).dencun.mainnetTarget.confirmed).toBe(true)
})

test("a completed phase date outranks a headline year that lags behind it", () => {
  // The two upstream files are edited separately, so the headline can still say
  // '2026' after the mainnet phase has recorded an actual end date in 2027.
  const lagging: ForkcastSource = {
    ...source,
    upgrades: [
      {
        id: "glamsterdam",
        name: "Glamsterdam Upgrade",
        status: "Live",
        activationDate: "2026",
        activationDetails: null,
        path: "/upgrade/glamsterdam",
      },
    ],
    devnetLaunches: {},
    phases: {
      glamsterdam: [
        {
          phaseId: "mainnet-deployment",
          status: "completed",
          projectedDate: "Q4 2026",
          actualEndDate: "Jan 15, 2027",
          testnets: [],
        },
      ],
    },
  }
  expect(normalize(lagging).glamsterdam.mainnetTarget.when).toEqual({
    year: 2027,
    month: 1,
    day: 15,
  })
})

test("two projections disagreeing on the year is drift, not a tiebreak", () => {
  // Unlike actualEndDate, a projectedDate carries no more authority than the headline.
  const conflicting: ForkcastSource = {
    ...source,
    upgrades: [
      {
        id: "glamsterdam",
        name: "Glamsterdam Upgrade",
        status: "Upcoming",
        activationDate: "2026",
        activationDetails: null,
        path: "/upgrade/glamsterdam",
      },
    ],
    devnetLaunches: {},
    phases: {
      glamsterdam: [
        {
          phaseId: "mainnet-deployment",
          status: "upcoming",
          projectedDate: "Q1 2027",
          actualEndDate: null,
          testnets: [],
        },
      ],
    },
  }
  expect(() => normalize(conflicting)).toThrow(
    /Mainnet target year disagreement/
  )
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

test("considered survives the filter but proposed does not", () => {
  // `considered` means ACD formally weighed the EIP, which a planning-phase page
  // wants to show. `proposed` is the churn bucket and stays out.
  const withBoth: ForkcastSource = {
    ...source,
    relationships: [
      ...source.relationships,
      {
        eipId: 8141,
        forkName: "Glamsterdam",
        statusHistory: [
          { status: "Considered", call: "acde/233", date: "2026-03-26" },
        ],
      },
      {
        eipId: 8888,
        forkName: "Glamsterdam",
        statusHistory: [{ status: "Proposed", call: null, date: null }],
      },
    ],
  }

  const { eips } = normalize(withBoth).glamsterdam
  expect(eips.find((e) => e.id === 8141)?.status).toBe("considered")
  expect(eips.find((e) => e.id === 8888)).toBeUndefined()
})

test("latest devnet is live while the fork is unshipped", () => {
  const { milestones } = normalize(source).glamsterdam
  expect(
    milestones
      .filter((m) => m.kind === "devnet")
      .map((m) => [m.version, m.status])
  ).toEqual([
    [6, "complete"],
    [7, "live"],
  ])
})

test("a shipped fork has a complete mainnet milestone", () => {
  const { milestones } = normalize(source).fusaka
  expect(milestones).toEqual([
    {
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

test("a fork name with no matching upgrade id fails loudly rather than dropping EIPs", () => {
  const orphaned: ForkcastSource = {
    ...source,
    relationships: [
      {
        eipId: 1,
        // The accent Forkcast's display name already carries.
        forkName: "Hegotá",
        statusHistory: [{ status: "Scheduled", call: null, date: null }],
      },
    ],
  }
  expect(() => normalize(orphaned)).toThrow(
    /EIP relationships reference fork name\(s\) with no matching upgrade: hegotá/
  )
})

test("a phase timeline key with no matching upgrade id fails loudly", () => {
  const orphaned: ForkcastSource = {
    ...source,
    phases: { ...source.phases, unknownfork: [] },
  }
  expect(() => normalize(orphaned)).toThrow(
    /Phase timeline references fork key\(s\) with no matching upgrade: unknownfork/
  )
})

test("a devnet launches key with no matching upgrade id fails loudly", () => {
  const orphaned: ForkcastSource = {
    ...source,
    devnetLaunches: { ...source.devnetLaunches, unknownfork: [] },
  }
  expect(() => normalize(orphaned)).toThrow(
    /Devnet launches reference fork key\(s\) with no matching upgrade: unknownfork/
  )
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
        path: "/upgrade/hegota",
      },
    ],
    relationships: [],
    devnetLaunches: {},
    phases: {
      hegota: [
        {
          phaseId: "public-testnets",
          status: "upcoming",
          projectedDate: "2027",
          actualEndDate: null,
          testnets: [
            {
              name: "Sepolia",
              status: "upcoming",
              stated: { claim: "projected", value: "2027" },
            },
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

test("an unreadable date fails loudly rather than dropping a milestone", () => {
  const badDevnet: ForkcastSource = {
    ...source,
    devnetLaunches: { glamsterdam: [{ version: 6, dateISO: "sometime" }] },
  }
  expect(() => normalize(badDevnet)).toThrow(/Unparseable devnet dateISO/)

  const badTestnet: ForkcastSource = {
    ...source,
    phases: {
      ...source.phases,
      glamsterdam: source.phases.glamsterdam.map((p) =>
        p.phaseId === "public-testnets"
          ? {
              ...p,
              testnets: [
                {
                  name: "Sepolia",
                  status: "upcoming",
                  stated: { claim: "projected", value: "soon" },
                },
              ],
            }
          : p
      ),
    },
  }
  expect(() => normalize(badTestnet)).toThrow(/Unparseable testnet date/)

  const badPhase: ForkcastSource = {
    ...source,
    phases: {
      ...source.phases,
      glamsterdam: source.phases.glamsterdam.map((p) =>
        p.phaseId === "mainnet-deployment"
          ? { ...p, projectedDate: "late 2026" }
          : p
      ),
    },
  }
  expect(() => normalize(badPhase)).toThrow(/Unparseable mainnet phase date/)
})

const upgradesLiteral = `
export const networkUpgrades: NetworkUpgrade[] = [
  {
    id: 'fusaka',
    name: 'Fusaka Upgrade',
    status: 'Live',
    activationDate: 'Dec 3, 2025',
    activationDetails: {
      blockNumber: 23935694,
      epochNumber: 411392,
      slotNumber: 411392 * 32,
    },
    path: '/upgrade/fusaka',
  },
  {
    id: 'genesis',
    name: 'Genesis',
    status: 'Live',
    activationDate: 'Jul 30, 2015',
    activationDetails: {
      blockNumber: 0,
      epochNumber: 0,
      slotNumber: 0,
    },
    path: '/upgrade/genesis',
  },
]
`

test("activation details survive a legitimate zero", () => {
  const [fusaka, genesis] = parseUpgrades(upgradesLiteral)
  expect(fusaka.activationDetails).toEqual({
    blockNumber: 23935694,
    epochNumber: 411392,
    // Written upstream as an expression, so it has to be evaluated, not read.
    slotNumber: 13164544,
  })
  // Truthiness checks collapse this whole object to null.
  expect(genesis.activationDetails).toEqual({
    blockNumber: 0,
    epochNumber: 0,
    slotNumber: 0,
  })
})

test("a partial activation details block is drift, not absence", () => {
  const partial = upgradesLiteral.replace(/\n\s*epochNumber: 411392,/, "")
  expect(() => parseUpgrades(partial)).toThrow(/Incomplete activationDetails/)
})

test("underscore-separated number literals parse in full, not just their first digits", () => {
  const literal = `
export const networkUpgrades: NetworkUpgrade[] = [
  {
    id: 'fusaka',
    name: 'Fusaka Upgrade',
    status: 'Live',
    activationDate: 'Dec 3, 2025',
    activationDetails: {
      blockNumber: 23_935_694,
      epochNumber: 411_392,
      slotNumber: 411_392 * 32,
    },
    path: '/upgrade/fusaka',
  },
]
`
  const [fusaka] = parseUpgrades(literal)
  expect(fusaka.activationDetails).toEqual({
    blockNumber: 23935694,
    epochNumber: 411392,
    slotNumber: 13164544,
  })
})

test("a phase reads its own fields even when testnets come first", () => {
  const reordered = `
export const forkProgress = [
  {
    forkName: 'Glamsterdam',
    phases: [
      {
        phaseId: 'public-testnets',
        testnets: [
          { name: 'Sepolia', status: 'completed', date: 'Jan 20, 2026' },
        ],
        status: 'upcoming',
        projectedDate: 'Q3 2026',
      },
    ],
  },
]
`
  const [phase] = parsePhases(reordered).glamsterdam
  expect(phase.status).toBe("upcoming")
  expect(phase.projectedDate).toBe("Q3 2026")
  expect(phase.testnets).toEqual([
    {
      name: "Sepolia",
      status: "completed",
      stated: { claim: "actual", value: "Jan 20, 2026" },
    },
  ])
})

const liveTestnetShape = `
export const forkProgress = [
  {
    forkName: 'Glamsterdam',
    phases: [
      {
        phaseId: 'public-testnets',
        status: 'in-progress',
        testnets: [
          { name: 'Platåberget', status: 'completed', date: 'Aug 13, 2026' },
          { name: 'Sepolia', status: 'upcoming', proposedDate: 'Sep 28, 2026' },
          { name: 'Hoodi', status: 'upcoming', projectedDate: 'Q4 2026' },
        ],
      },
    ],
  },
]
`

test("parses every testnet date claim Forkcast writes", () => {
  expect(parsePhases(liveTestnetShape).glamsterdam[0].testnets).toEqual([
    {
      name: "Platåberget",
      status: "completed",
      stated: { claim: "actual", value: "Aug 13, 2026" },
    },
    {
      name: "Sepolia",
      status: "upcoming",
      stated: { claim: "proposed", value: "Sep 28, 2026" },
    },
    {
      name: "Hoodi",
      status: "upcoming",
      stated: { claim: "projected", value: "Q4 2026" },
    },
  ])
})

test("testnet date claims preserve their confidence", () => {
  const phases = parsePhases(liveTestnetShape).glamsterdam
  const withLiveTestnets: ForkcastSource = {
    ...source,
    phases: {
      ...source.phases,
      glamsterdam: [
        ...phases,
        ...source.phases.glamsterdam.filter(
          (phase) => phase.phaseId === "mainnet-deployment"
        ),
      ],
    },
  }

  const milestones = normalize(withLiveTestnets).glamsterdam.milestones.filter(
    (milestone) => milestone.kind === "testnet"
  )
  expect(milestones).toEqual([
    {
      kind: "testnet",
      network: "Platåberget",
      when: { year: 2026, month: 8, day: 13 },
      status: "complete",
    },
    {
      kind: "testnet",
      network: "Sepolia",
      when: { year: 2026, month: 9, day: 28 },
      status: "anticipated",
    },
    {
      kind: "testnet",
      network: "Hoodi",
      when: { year: 2026, quarter: 4 },
      status: "projected",
    },
  ])
})

test("conflicting or unknown testnet date keys fail loudly", () => {
  const conflicting = liveTestnetShape.replace(
    "proposedDate: 'Sep 28, 2026'",
    "proposedDate: 'Sep 28, 2026', projectedDate: 'Q3 2026'"
  )
  expect(() => parsePhases(conflicting)).toThrow(
    /Conflicting testnet date keys proposedDate\+projectedDate/
  )

  const unknown = liveTestnetShape.replace(
    "proposedDate: 'Sep 28, 2026'",
    "estimatedDate: 'Sep 28, 2026'"
  )
  expect(() => parsePhases(unknown)).toThrow(
    /Unknown testnet date key "estimatedDate"/
  )
})

test("completed testnets require an actual date claim", () => {
  const badStatus: ForkcastSource = {
    ...source,
    phases: {
      ...source.phases,
      glamsterdam: source.phases.glamsterdam.map((phase) =>
        phase.phaseId === "public-testnets"
          ? {
              ...phase,
              testnets: [
                {
                  name: "Sepolia",
                  status: "completed",
                  stated: { claim: "projected", value: "Q3 2026" },
                },
              ],
            }
          : phase
      ),
    },
  }

  expect(() => normalize(badStatus)).toThrow(
    /Completed testnet "Sepolia".*does not state an actual date/
  )
})
