import type { StaticImageData } from "next/image"

import a16zCover from "@/public/images/reports/a16z-state-of-crypto-2025.webp"
import bisCover from "@/public/images/reports/bis-papers-156.webp"
import quantumCover from "@/public/images/reports/coinbase-quantum-blockchain.webp"
import consensysCover from "@/public/images/reports/consensys-trustware.webp"
import fidelityCoinCover from "@/public/images/reports/fidelity-coin-report-ethereum.webp"
import l2LandscapeCover from "@/public/images/reports/l2-landscape.webp"
import mckinseyCover from "@/public/images/reports/mckinsey-ripples-to-waves.webp"
import openzeppelinCover from "@/public/images/reports/openzeppelin-risk-assessment.webp"
import twinstakeCover from "@/public/images/reports/twinstake-pectra.webp"
import whiteHouseCover from "@/public/images/reports/white-house-crypto.webp"
import tdsCover from "@/public/images/trillion-dollar-security/report.png"

export type ReportCategory =
  | "ef-original"
  | "regulator"
  | "central-bank"
  | "bank-research"
  | "big-four"
  | "crypto-native"
  | "academic"

export type Report = {
  /** Stable slug used for keys and (when internal) the subpage path */
  slug: string
  /** Full title as published */
  title: string
  /** Publisher (shown as paragraph text under the title) */
  publisher: string
  /** Concise date string e.g. "Apr 2025" (shown as the card tag) */
  date: string
  /** Publisher category — used for grouping/filtering */
  category: ReportCategory
  /** Destination link. Internal entries point to /reports/<slug>/. */
  href: string
  /** Internal entries open a subpage; external entries open the publisher URL in a new tab. */
  internal?: boolean
  /** Cover image — publisher OG image or first-page render of the source PDF */
  imgSrc: StaticImageData
}

/**
 * Initial curated set of reports surfaced on /reports.
 *
 * Ordering: internal EF reports first, then external by date desc.
 *
 * Every external entry has been independently verified — URL fetched, title /
 * author / date confirmed on the publisher site, Ethereum content confirmed
 * substantive. See PR description for the full audit.
 */
export const reports: Report[] = [
  {
    slug: "trillion-dollar-security",
    title: "Trillion Dollar Security",
    publisher: "Ethereum Foundation",
    date: "May 2025",
    category: "ef-original",
    href: "/reports/trillion-dollar-security/",
    internal: true,
    imgSrc: tdsCover,
  },
  {
    slug: "openzeppelin-blockchain-network-risk-assessment",
    title: "Technical Risk Assessment on Blockchain Networks",
    publisher: "OpenZeppelin",
    date: "Apr 2026",
    category: "crypto-native",
    href: "https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf",
    imgSrc: openzeppelinCover,
  },
  {
    slug: "coinbase-iab-quantum-computing-blockchain",
    title: "Quantum Computing & Blockchain",
    publisher:
      "Coinbase Independent Advisory Board on Quantum Computing and Blockchain",
    date: "Apr 2026",
    category: "academic",
    href: "https://assets.ctfassets.net/sygt3q11s4a9/6EjYavuGdtJDYCqaJrASj9/9f464a8bf26f44bd6c85710fe7e4a29f/Quantum_Computing_and_Blockchain_v10.3_15April2026.pdf",
    imgSrc: quantumCover,
  },
  {
    slug: "a16z-state-of-crypto-2025",
    title: "State of Crypto Report 2025",
    publisher: "a16z crypto",
    date: "Oct 2025",
    category: "crypto-native",
    href: "https://a16zcrypto.com/posts/article/state-of-crypto-report-2025/",
    imgSrc: a16zCover,
  },
  {
    slug: "etherealize-nethermind-l2beat-l2-landscape",
    title:
      "The Future of Financial Infrastructure: Ethereum's Layer 2 Landscape",
    publisher: "Etherealize, Nethermind and L2BEAT",
    date: "Dec 2025",
    category: "crypto-native",
    href: "https://cdn.prod.website-files.com/6728e9076a3b5a8ca8ec4816/6931c20f55129e498a8da223_%5BCompressed%5D%20L2s%20Report.pdf",
    imgSrc: l2LandscapeCover,
  },
  {
    slug: "fidelity-coin-report-ethereum",
    title: "Coin Report: Ethereum (ETH)",
    publisher: "Fidelity Digital Assets",
    date: "Aug 2025",
    category: "bank-research",
    href: "https://www.fidelitydigitalassets.com/research-and-insights/coin-report-ethereum-eth",
    imgSrc: fidelityCoinCover,
  },
  {
    slug: "consensys-ethereum-is-trustware",
    title: "Ethereum is Trustware: core trust infrastructure for the world",
    publisher: "Consensys",
    date: "Aug 2025",
    category: "crypto-native",
    href: "https://consensys.io/ethereum/trust",
    imgSrc: consensysCover,
  },
  {
    slug: "twinstake-ethereum-pectra-institutional-staking",
    title: "Ethereum Pectra Upgrade: The Impact on Institutional Staking",
    publisher: "Twinstake",
    date: "2025",
    category: "crypto-native",
    href: "https://www.twinstake.com/reports/ethereum-pectra-upgrade-the-impact-on-institutional-staking",
    imgSrc: twinstakeCover,
  },
  {
    slug: "white-house-pwg-crypto",
    title: "Strengthening American Leadership in Digital Financial Technology",
    publisher:
      "The White House (President's Working Group on Digital Asset Markets)",
    date: "Jul 2025",
    category: "regulator",
    href: "https://www.whitehouse.gov/crypto/",
    imgSrc: whiteHouseCover,
  },
  {
    slug: "bis-papers-156-defi-functions-stability",
    title:
      "BIS Papers 156: Cryptocurrencies and decentralised finance — functions and financial stability implications",
    publisher: "Bank for International Settlements",
    date: "Apr 2025",
    category: "central-bank",
    href: "https://www.bis.org/publ/bppdf/bispap156.htm",
    imgSrc: bisCover,
  },
  {
    slug: "mckinsey-from-ripples-to-waves",
    title:
      "From ripples to waves: The transformational power of tokenizing assets",
    publisher: "McKinsey & Company",
    date: "Jun 2024",
    category: "big-four",
    href: "https://www.mckinsey.com/industries/financial-services/our-insights/from-ripples-to-waves-the-transformational-power-of-tokenizing-assets",
    imgSrc: mckinseyCover,
  },
]
