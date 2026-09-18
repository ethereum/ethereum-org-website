/**
 * Sibling EF sites that authoritatively own topics ethereum.org does not.
 *
 * These route the question instead of letting the model assemble a plausible answer out of
 * tangentially related site text. The failure they exist for: "how do I get Devcon
 * tickets?" answered from the contributor-rewards page, which mentions Devcon tickets as a
 * perk. Every citation was real and the answer was wrong -- a class no recall metric sees.
 *
 * Deliberately not crawled. Authority is small and stable; their content is neither, and a
 * stale answer about ticket sale dates is worse than no answer.
 *
 * `triggers` are matched literally against the query. The spike matched on embeddings too;
 * without them a near-miss simply does not route, which is the safe direction to fail.
 */

export interface Referral {
  name: string
  url: string
  /** What the site owns, in the words a reader would use. Goes to the model verbatim. */
  owns: string
  triggers: string[]
}

export const SEARCH_REFERRALS: Referral[] = [
  {
    name: "Devcon",
    url: "https://devcon.org/",
    owns: "Devcon conference tickets, ticket sales dates, ticket prices and tiers, registration, the schedule and agenda, speakers and talks, the venue and host city, travel, visas, accommodation, scholarships and financial aid, volunteering, and sponsorship. Devcon is Ethereum's flagship developer conference, organised separately from ethereum.org.",
    // Devconnect is folding into Devcon, so it routes here rather than getting its own
    // record. Past editions land here too, which is still the best available answer.
    triggers: ["devcon", "devconnect"],
  },
  {
    name: "Ethereum Foundation",
    url: "https://ethereum.foundation/",
    owns: "The Ethereum Foundation as an organization: what the EF is, its mission and philosophy, its teams and people, leadership, annual reports and financial disclosures, the treasury, governance of the Foundation itself, jobs and open roles, press and media contact, and how to contact the EF.",
    triggers: [
      "ethereum foundation",
      "ef jobs",
      "ef report",
      "ef treasury",
      "ef team",
    ],
  },
  {
    name: "Ethereum Foundation Blog",
    url: "https://blog.ethereum.org/",
    owns: "Official announcements and release notes: client releases, network upgrade and fork announcements, security advisories and disclosures, testnet and devnet news, research updates, grant round announcements, and time-sensitive statements from the Ethereum Foundation. Posts are dated statements of what was true when published.",
    triggers: ["release notes", "security advisory", "ef blog"],
  },
  {
    name: "Ecosystem Support Program",
    url: "https://esp.ethereum.foundation/",
    owns: "Ethereum Foundation grants and funding for builders: how to apply for a grant, eligibility, application deadlines and timelines, grant sizes, the Ecosystem Support Program process, small grants, academic grants, past grantees, and what the EF funds.",
    triggers: ["grant", "grants", "funding", "esp"],
  },
  {
    name: "Ethereum Improvement Proposals",
    url: "https://eips.ethereum.org/",
    owns: "The canonical text and status of individual Ethereum Improvement Proposals and ERCs: full specifications, EIP numbers, authors, status (draft, review, last call, final, stagnant, withdrawn), the EIP process itself, and which EIPs are included in a given network upgrade.",
    triggers: ["eip", "eip status", "eip spec"],
  },
  {
    name: "Staking Launchpad",
    url: "https://launchpad.ethereum.org/",
    // /staking covers general staking well and has to win, so this routes only on a
    // literal match -- in the spike, similarity could not separate the two.
    owns: "The step-by-step flow for activating a solo validator: generating validator keys and the deposit data file, the deposit ceremony, running the key generation CLI, the 32 ETH deposit transaction itself, client selection during setup, and the checklist for going live as a validator.",
    triggers: [
      "launchpad",
      "validator keys",
      "deposit data",
      "activate validator",
    ],
  },
]
