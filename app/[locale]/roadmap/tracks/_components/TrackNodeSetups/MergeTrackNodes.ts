import { MarkerType } from "@xyflow/react"
import { Edge, Node } from "@xyflow/react"
const mergeNodes: Node[] = [
  {
    id: "1",
    position: { x: 20, y: 150 },
    type: "taskShipped",
    data: {
      label: "Beacon chain launch",
      track: "Merge",
      rightNode: true,
      description: [
        "The Beacon Chain introduced proof-of-stake to Ethereum, running in parallel with the existing proof-of-work chain. It allowed anyone to stake 32 ETH, started producing proof-of-stake blocks, and later enabled The Merge.",
        "The Beacon Chain became Ethereum's new consensus mechanism, managing the network of validators. For over a year, it existed alongside the original Ethereum chain without processing user transactions, until both chains joined together during The Merge.",
      ],
      releaseDate: "December 1, 2020",
      releaseLabel: "Beacon Chain genesis",
      releasePageURL: "/roadmap/beacon-chain/",
      benefits: [
        "Introduced proof-of-stake to Ethereum",
        "Allowed anyone to stake 32 ETH",
        "Enabled The Merge",
      ],
      furtherReading: [
        {
          title: "Beacon Chain",
          url: "/roadmap/beacon-chain/",
        },
        {
          title: "EF blog announcement",
          url: "https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/",
        },
      ],
    },
  },
  {
    id: "2",
    position: { x: 250, y: 150 },
    type: "taskShipped",
    data: {
      label: "Warmup fork (Altair)",
      track: "Merge",
      leftNode: true,
      rightNode: true,
      description: [
        `Altair was the first update to the Beacon Chain. It added "sync committees" to help light clients follow the chain efficiently, improved validator rewards, and was a test run for future consensus-layer updates.`,
        `Altair changed the validator penalties and rewards system, refining the initial values set at the Beacon Chain’s launch. The Altair showed the consensus layer could upgrade without problems, helping to build confidence for the Merge.`,
      ],
      releaseDate: "December 8, 2021",
      releaseLabel: "Altair",
      releasePageURL: "/history/#altair",
      benefits: [
        "Added sync committees to help light clients follow the chain efficiently",
        "Improved validator rewards",
        "Was a test run for future consensus-layer updates",
      ],
      furtherReading: [
        {
          title: "Altair Mainnet announcement",
          url: "https://blog.ethereum.org/2021/10/05/altair-announcement",
        },
      ],
    },
  },
  {
    id: "3",
    position: { x: 480, y: 123.5 },
    type: "featureShipped",
    data: {
      label: "Merge!\nNo more PoW",
      track: "Merge",
      leftNode: true,
      rightNode: true,
      description: [
        "The Merge swapped Ethereum's consensus mechanism from proof-of-work to proof-of-stake, connecting the original execution layer to the Beacon Chain.",
        "The Merge reduced Ethereum's energy consumption by ~99.95%, making Ethereum environmentally sustainable and more secure by requiring validators stake ETH as collateral that can be destroyed if they act maliciously.",
      ],
      releaseDate: "September 15, 2022",
      releaseLabel: "The Merge",
      releasePageURL: "/roadmap/merge/",
      benefits: [
        "~99.95% reduction in energy usage",
        "Security through staked ETH",
      ],
      furtherReading: [
        {
          title: "The Merge",
          url: "/roadmap/merge/",
        },
        {
          title: "Mainnet Merge announcement",
          url: "https://blog.ethereum.org/2022/08/24/mainnet-merge-announcement/",
        },
      ],
    },
  },
  {
    id: "4",
    position: { x: 720, y: 123.5 },
    type: "taskShipped",
    data: {
      label: "Distributed validators",
      track: "Merge",
      description: [
        "Distributed validator technology (DVT) lets multiple operators run a single validator together. It splits validator responsibilities across separate machines, improving security and reducing the risk of slashing penalties.",
        "DVT makes Ethereum more resilient by eliminating single points of failure. If one machine in a DVT validator goes offline, the others can continue working, ensuring the validator stays active and avoids penalties for downtime.",
      ],
      releaseDate: "TODO",
      releaseLabel: "TODO",
      releasePageURL: "/staking/dvt/",
      benefits: [
        "Increased validator reliability",
        "Better network decentralization",
        "Lower barrier to participation",
      ],
      furtherReading: [
        {
          title: "Distributed validator technology (DVT)",
          url: "/staking/dvt/",
        },
      ],
    },
  },
  {
    id: "5",
    position: { x: 720, y: 250 },
    type: "taskShipped",
    data: {
      label: "Withdrawals",
      track: "Merge",
      leftNode: true,
      description: [
        "Enabling withdrawals allowed validators to access their staked ETH and rewards that were previously locked indefinitely on the Beacon Chain.",
        "This made staking more flexible making the network stronger, more appealing for staking, and increasing the number of people staking on Ethereum.",
      ],
      releaseDate: "April 12, 2023",
      releaseLabel: "Shapella",
      releasePageURL: "/history/#shapella",
      benefits: [
        "Access to staked ETH and rewards",
        "Reduced staking risk",
        "Increased staking participation",
      ],
      furtherReading: [
        {
          title: "Staking withdrawals",
          url: "/staking/withdrawals/",
        },
        {
          title: "Shapella announcement",
          url: "https://blog.ethereum.org/2023/03/28/shapella-mainnet-announcement",
        },
      ],
    },
  },
  {
    id: "6",
    position: { x: 950, y: 150 },
    type: "taskResearch",
    data: {
      label: "Per-slot participant selection",
      track: "Merge",
      rightNode: true,
      percentage: 45,
      description: [
        "Per-slot participant selection will choose which validators participate in consensus for each 12-second slot. Instead of all validators being active at once, the network will select an optimal subset to handle attestations and block validation.",
        "This approach reduces network communication overhead while maintaining security. By carefully selecting which validators are active in each slot, Ethereum can support a much larger total validator set without overwhelming the network with coordination messages.",
      ],
      releaseDate: "2026",
      benefits: ["Support for more validators", "Reduced network congestion"],
      furtherReading: [
        {
          title:
            "Vorbit: SSF with circular and spiral finality validator selection and distribution",
          url: "https://ethresear.ch/t/vorbit-ssf-with-circular-and-spiral-finality-validator-selection-and-distribution/20464",
        },
        {
          title: "Sticking to 8192 signatures per slot post-SSF: how and why",
          url: "https://ethresear.ch/t/sticking-to-8192-signatures-per-slot-post-ssf-how-and-why/17989",
        },
      ],
    },
  },
  {
    id: "7",
    position: { x: 950, y: 50 },
    type: "taskResearch",
    data: {
      label: "SSF specification",
      track: "Merge",
      rightNode: true,
      percentage: 30,
      description: [
        "The SSF specification defines the technical standards and implementation details for achieving single slot finality on Ethereum. It outlines changes to validator responsibilities, consensus rules, and network communication.",
        "This specification will establish how validators coordinate to achieve finality in a single 12-second slot, including voting mechanisms, thresholds, and fault tolerance parameters.",
      ],
      releaseDate: "2026",
      benefits: [
        "Client teams can start implementing, knowing the design won’t change",
        "Audits and testnets can begin",
      ],
      furtherReading: [
        {
          title: "Paths to SSF revisited",
          url: "https://ethresear.ch/t/paths-to-ssf-revisited/22052",
        },
      ],
    },
  },
  {
    id: "8",
    position: { x: 950, y: 290 },
    type: "taskIdea",
    data: {
      label: "Implementation",
      track: "Merge",
      rightNode: true,
      description: [
        "Once the SSF specification is complete, core devs can begin implementing SSF into client software. This phase involves turning the research and specifications into working code that can be deployed on the network.",
        "Implementation will require extensive testing across multiple client teams, coordination between consensus and execution layers, and careful validation to ensure the upgrade works safely. This engineering work will make 12-second finality a reality for Ethereum users.",
      ],
      releaseDate: "2026",
      benefits: [
        "Working SSF code in clients",
        "Extensive testing and validation",
      ],
      furtherReading: [
        {
          title: "TODO: Add title",
          url: "/",
        },
      ],
    },
  },
  {
    id: "9",
    position: { x: 1175, y: 133.2 },
    type: "featureResearch",
    data: {
      label: "Single slot finality (SSF)",
      track: "Merge",
      topNode: true,
      leftNode: true,
      bottomNode: true,
      description: [
        "Single slot finality (SSF) will reduce Ethereum's time to finality from 15 minutes to a single 12-second slot. This upgrade would allow transactions to become irreversible much faster than is currently possible.",
        "By finalizing blocks in a single slot, SSF would improve user experience, reduce MEV opportunities, and strengthen Ethereum's security. This significant improvement to Ethereum's consensus mechanism represents one of the most important upgrades on the post-Merge roadmap.",
      ],
      releaseDate: "2027/2028",
      benefits: [
        "12-second transaction finality",
        "Better user experience",
        "Reduced MEV opportunities",
      ],
      furtherReading: [
        {
          title: "Single slot finality",
          url: "/roadmap/single-slot-finality/#single-slot-finality",
        },
      ],
    },
  },
  {
    id: "10",
    position: { x: 1175, y: -30 },
    type: "taskResearch",
    data: {
      label: "Secret leader election",
      track: "Merge",
      percentage: 70,
      description: [
        "Secret leader election prevents validators from knowing who will propose the next block until just before block creation time. This protects block proposers from targeted attacks that could disrupt network operations.",
        "Hiding the identity of upcoming block proposers prevents attackers from targeted denial-of-service (DoS) attacks and front-running.",
      ],
      releaseDate: "2028",
      benefits: [
        "Protection from targeted attacks",
        "Reduced denial-of-service risks",
        "Block production guarantees",
      ],
      furtherReading: [
        {
          title: "Secret leader election",
          url: "/roadmap/secret-leader-election/",
        },
        {
          title: "Ethereum Research: Single secret leader election",
          url: "https://ethresear.ch/tag/single-secret-leader-election",
        },
      ],
    },
  },
  {
    id: "11",
    position: { x: 1400, y: 250 },
    type: "taskResearch",
    data: {
      label: "Increase validator count",
      track: "Merge",
      percentage: 50,
      description: [
        "The goal is to dramatically increase the number of validators securing Ethereum from today's ~1 million to potentially millions more. This requires solving network communication bottlenecks that currently limit how many validators can efficiently participate in consensus.",
        "By enabling more people to become validators, Ethereum becomes more decentralized and secure. A larger, more diverse validator set makes Ethereum harder to attack and ensures no single group can control consensus, strengthening Ethereum's decentralization.",
      ],
      releaseDate: "2028",
      benefits: ["More validators", "More decentralized", "More secure"],
      furtherReading: [
        {
          title:
            "Orbit: SSF solo staking friendly validator set management for SSF",
          url: "https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928",
        },
      ],
    },
  },
  {
    id: "12",
    position: { x: 1420, y: 70 },
    type: "endGoal",
    data: {
      label: "Increase validator count",
      track: "Merge",
      percentage: 50,
      description: [
        "The goal is to dramatically increase the number of validators securing Ethereum from today's ~1 million to potentially millions more. This requires solving network communication bottlenecks that currently limit how many validators can efficiently participate in consensus.",
        "By enabling more people to become validators, Ethereum becomes more decentralized and secure. A larger, more diverse validator set makes Ethereum harder to attack and ensures no single group can control consensus, strengthening Ethereum's decentralization.",
      ],
      releaseDate: "2028",
      benefits: ["More validators", "More decentralized", "More secure"],
      furtherReading: [
        {
          title:
            "Orbit: SSF solo staking friendly validator set management for SSF",
          url: "https://ethresear.ch/t/orbit-ssf-solo-staking-friendly-validator-set-management-for-ssf/19928",
        },
      ],
    },
  },
]

const mergeEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--success))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--success))" },
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--success))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--success))" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "5",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--success))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--success))" },
  },
  {
    id: "e6-9",
    source: "6",
    target: "9",
    targetHandle: "left",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
  {
    id: "e7-9",
    source: "7",
    target: "9",
    targetHandle: "top",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
  {
    id: "e8-9",
    source: "8",
    target: "9",
    targetHandle: "bottom",
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
      color: "hsla(var(--primary))",
      width: 32,
      height: 32,
    },
    style: { stroke: "hsla(var(--primary))" },
  },
]

export { mergeEdges, mergeNodes }
