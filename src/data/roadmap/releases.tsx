import { StaticImageData } from "next/image"

import CommunityHeroImage from "@/public/images/heroes/community-hero.png"
import DevelopersHubHeroImage from "@/public/images/heroes/developers-hub-hero.jpg"
import GuidesHubHeroImage from "@/public/images/heroes/guides-hub-hero.jpg"
import Layer2HubHeroImage from "@/public/images/heroes/layer-2-hub-hero.jpg"
import QuizzesHubHeroImage from "@/public/images/heroes/quizzes-hub-hero.png"
import PectraImage from "@/public/images/roadmap/roadmap-pectra.png"

interface Release {
  image: StaticImageData
  releaseName: string
  releaseDate: string
  content: React.ReactNode
  href: string
}

export const releasesData: Release[] = [
  {
    image: DevelopersHubHeroImage,
    releaseName: "Paris (The Merge)",
    releaseDate: "2022-09-15",
    content: (
      <div>
        <p className="font-bold">Transition to Proof of Stake</p>
        <ul>
          <li>Replaced energy-intensive mining with staking-based consensus</li>
          <li>Reduced Ethereum&apos;s energy consumption by ~99.95%</li>
        </ul>
        <p className="font-bold">Beacon Chain Integration</p>
        <ul>
          <li>Merged the Beacon Chain with the Ethereum mainnet</li>
          <li>Enabled the full transition to PoS consensus mechanism</li>
        </ul>
        <p className="font-bold">Difficulty Bomb Removal</p>
        <ul>
          <li>
            Removed the difficulty bomb that was increasing mining difficulty
          </li>
          <li>Ensured smooth transition to the new consensus mechanism</li>
        </ul>
      </div>
    ),
    href: "/upgrades/merge",
  },
  {
    image: QuizzesHubHeroImage,
    releaseName: "Shapella",
    releaseDate: "2023-04-12",
    content: (
      <div>
        <p className="font-bold">Staking withdrawals</p>
        <ul>
          <li>Enabled validators to withdraw their staked ETH and rewards</li>
          <li>Introduced partial and full withdrawal capabilities</li>
        </ul>
        <p className="font-bold">EIP-4895: Beacon chain push withdrawals</p>
        <ul>
          <li>Added a new system-level operation for withdrawals</li>
          <li>
            Ensured secure and efficient processing of withdrawal requests
          </li>
        </ul>
        <p className="font-bold">EIP-3651: Warm COINBASE</p>
        <ul>
          <li>Reduced gas costs for accessing the COINBASE address</li>
          <li>Improved efficiency of certain smart contract operations</li>
        </ul>
      </div>
    ),
    href: "/staking/withdrawals",
  },
  {
    image: Layer2HubHeroImage,
    releaseName: "Dencun",
    releaseDate: "2024-03-13",
    content: (
      <div>
        <p className="font-bold">Proto-danksharding (EIP-4844)</p>
        <ul>
          <li>
            Introduced blob transactions to significantly reduce rollup
            transaction costs
          </li>
          <li>
            Added a new transaction type that stores data temporarily and
            cheaply
          </li>
        </ul>
        <p className="font-bold">EIP-1153: Transient storage opcodes</p>
        <ul>
          <li>
            Added TSTORE and TLOAD opcodes for temporary storage during
            transaction execution
          </li>
          <li>
            Enables more efficient smart contract patterns and reduces gas costs
          </li>
        </ul>
        <p className="font-bold">EIP-4788: Beacon block root in the EVM</p>
        <ul>
          <li>Exposes consensus layer information to smart contracts</li>
          <li>
            Enables new trust-minimized applications and cross-chain bridges
          </li>
        </ul>
      </div>
    ),
    href: "/roadmap/dencun",
  },
  {
    image: PectraImage,
    releaseName: "Pectra",
    releaseDate: "2025-05-07",
    content: (
      <div>
        <p className="font-bold">
          Enhance EOA wallets with smart contract functionality
        </p>
        <ul>
          <li>
            Users can set their address to be represented by a code of an
            existing smart contract and gain benefits such as transaction
            batching, transaction fee sponsorship or better recovery mechanisms
          </li>
        </ul>
        <p className="font-bold">Increase the max effective balance</p>
        <ul>
          <li>
            Stakers can now choose an arbitrary amount of ETH to stake and
            receive rewards on every 1 ETH above the minimum
          </li>
        </ul>
        <p className="font-bold">Blob throughput increase</p>
        <ul>
          <li>
            The blob count will be increased from 3 to 6 targets, with a maximum
            of 9, resulting in cheaper fees in Ethereum rollups
          </li>
        </ul>
      </div>
    ),
    href: "/roadmap/pectra",
  },
  {
    image: CommunityHeroImage,
    releaseName: "Fusaka",
    releaseDate: "2026",
    content: (
      <div>
        <p className="font-bold">
          PeerDAS (Peer-to-Peer Data Availability Sampling)
        </p>
        <ul>
          <li>Enables more efficient data availability for rollups</li>
          <li>
            Makes running a node more accessible while maintaining
            decentralization
          </li>
        </ul>
        <p className="font-bold">Potential Additional Features</p>
        <ul>
          <li>
            EIP-7688: Enhanced smart contract access to network information
          </li>
          <li>Blob fee market improvementse</li>
          <li>
            Further improvements to validator efficiency and network performance
          </li>
        </ul>
      </div>
    ),
    href: "https://eips.ethereum.org/EIPS/eip-7607",
  },
  {
    image: GuidesHubHeroImage,
    releaseName: "Glamsterdam",
    releaseDate: "2026",
    content: (
      <div>
        <p className="font-bold">Discussed for Glamsterdam</p>
        <ul>
          <li>Verkle trees</li>
        </ul>
      </div>
    ),
    href: "https://eips.ethereum.org/EIPS/eip-7773",
  },
]
