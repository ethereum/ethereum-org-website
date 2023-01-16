---
title: History and Forks of Ethereum
description: A history of the Ethereum blockchain including major milestones, releases, and forks.
lang: en
sidebarDepth: 1
---

# The history of Ethereum {#the-history-of-ethereum}

A timeline of all the major milestones, forks, and updates to the Ethereum blockchain.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forks are when major technical upgrades or changes need to be made to the network – they typically stem from [Ethereum Improvement Proposals (EIPs)](/eips/) and change the "rules" of the protocol.

When upgrades are needed in traditional, centrally-controlled software, the company will just publish a new version for the end-user. Blockchains work differently because there is no central ownership. [Ethereum clients](/developers/docs/nodes-and-clients/) must update their software to implement the new fork rules. Plus block creators (miners in a proof-of-work world, validators in a proof-of-stake world) and nodes must create blocks and validate against the new rules. [More on consensus mechanisms](/developers/docs/consensus-mechanisms/)

These rule changes may create a temporary split in the network. New blocks could be produced according to the new rules or the old ones. Forks are usually agreed upon ahead of time so that clients adopt the changes in unison and the fork with the upgrades becomes the main chain. However, in rare cases, disagreements over forks can cause the network to permanently split – most notably the creation of Ethereum Classic with the [DAO fork](#dao-fork).

</ExpandableCard>

Looking for future protocol upgrades? [Learn about upcoming upgrades to Ethereum](/upgrades/).

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>Sep-15-2022 06:42:42 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Block number: <a href="https://etherscan.io/block/15537394">15537394</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH price: $1,472 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220915075314/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#paris-summary}

The Paris upgrade was triggered by the proof-of-work blockchain passing a [terminal total difficulty](/glossary/#terminal-total-difficulty) of 58750000000000000000000. This happened at block 15537393 on 15th September 2022, triggering the Paris upgrade the next block. Paris was [The Merge](/upgrades/merge/) transition - its major feature was switching off the [proof-of-work](/developers/docs/consensus-mechanisms/pow) mining algorithm and associated consensus logic and switching on [proof-of-stake](/developers/docs/consensus-mechanisms/pos) instead. Paris itself was an upgrade to the [execution clients](/developers/docs/nodes-and-clients/#execution-clients) (equivalent to Bellatrix on the consensus layer) that enabled them to take instruction from their connected [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients). This required a new set of internal API methods, collectively known as the [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), to be activated. This was arguably the most significant upgrade in Ethereum history since [Homestead](#homestead)!

- [Read the Paris upgrade specification](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

---

### Bellatrix {#bellatrix}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>Sep-06-2022 11:34:47 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Epoch number: 144,896<br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH price: $1,558 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220906112525/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#bellatrix-summary}

The Bellatrix upgrade was the second scheduled upgrade for the [Beacon Chain](/upgrades/beacon-chain), preparing the chain for [The Merge](/upgrades/merge/). It brings validator penalties to their full values for inactivity and slashable offenses. Bellatrix also includes an update to the fork choice rules to prepare the chain for The Merge and the transition from the last proof-of-work block to the first proof-of-stake block. This includes making consensus clients aware of the [terminal total difficulty](/glossary/#terminal-total-difficulty) of 58750000000000000000000.

- [Read the Bellatrix upgrade specification](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>Jun-30-2022 10:54:04 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Block number: <a href="https://etherscan.io/block/15050000">15,050,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH price: $1,069 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20220630094629/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#gray-glacier-summary}

The Gray Glacier network upgrade pushed back the [difficulty bomb](/glossary/#difficulty-bomb) by three months. This is the only change introduced in this upgrade, and is similar in nature to the [Arrow Glacier](#arrow-glacier) and [Muir Glacier](#muir-glacier) upgrades. Similar changes have been performed on the [Byzantium](#byzantium), [Constantinople](#constantinople) and [London](#london) network upgrades.

- [EF Blog - Gray Glacier Upgrade Announcement](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-5133](https://eips.ethereum.org/EIPS/eip-5133) – _delays the difficulty bomb until September 2022_

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>Dec-09-2021 07:55:23 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Block number: <a href="https://etherscan.io/block/13773000">13,773,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH price: $4111 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211207064430/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#arrow-glacier-summary}

The Arrow Glacier network upgrade pushed back the [difficulty bomb](/glossary/#difficulty-bomb) by several months. This is the only change introduced in this upgrade, and is similar in nature to the [Muir Glacier](#muir-glacier) upgrade. Similar changes have been performed on the [Byzantium](#byzantium), [Constantinople](#constantinople) and [London](#london) network upgrades.

- [EF Blog - Arrow Glacier Upgrade Announcement](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-4345](https://eips.ethereum.org/EIPS/eip-4345) – _delays the difficulty bomb until June 2022_

</ExpandableCard>

---

### Altair {#altair}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /><code>Oct-27-2021 10:56:23 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} />Epoch number: 74,240<br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} />ETH price: $4024 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20211026174951/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#altair-summary}

The Altair upgrade was the first scheduled upgrade for the [Beacon Chain](/upgrades/beacon-chain). It added support for "sync committees"—enabling light clients, and increased validator inactivity and slashing penalties as development progressed towards The Merge.

- [Read the Altair upgrade specification](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} mr="0.5rem" />Fun fact! {#altair-fun-fact}

Altair was the first major network upgrade that had an exact rollout time. Every upgrade prior had been based on a declared block number on the proof-of-work chain, where block times vary. The Beacon Chain does not require solving for proof-of-work, and instead works on a time-based epoch system consisting of 32 twelve-second "slots" of time where validators can propose blocks. This is why we knew exactly when we would hit epoch 74,240 and Altair became live!

- [Block time](/developers/docs/blocks/#block-time)

---

### London {#london}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Aug-05-2021 12:33:42 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/12965000">12,965,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $2621 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210805124609/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#london-summary}

The London upgrade introduced [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), which reformed the transaction fee market, along with changes to how gas refunds are handled and the [Ice Age](/glossary/#ice-age) schedule.

- [Are you a dapp developer? Be sure to upgrade your libraries and tooling.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) – _improves the transaction fee market_
- [EIP-3198](https://eips.ethereum.org/EIPS/eip-3198) – _returns the `BASEFEE` from a block_
- [EIP-3529](https://eips.ethereum.org/EIPS/eip-3529) - _reduces gas refunds for EVM operations_
- [EIP-3541](https://eips.ethereum.org/EIPS/eip-3541) - _prevents deploying contracts starting with `0xEF`_
- [EIP-3554](https://eips.ethereum.org/EIPS/eip-3554) – _delays the Ice Age until December 2021_

</ExpandableCard>

---

### Berlin {#berlin}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Apr-15-2021 10:07:03 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/12244000">12,244,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $2454 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20210415093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#berlin-summary}

The Berlin upgrade optimized gas cost for certain EVM actions, and increases support for multiple transaction types.

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

- [EIP-2565](https://eips.ethereum.org/EIPS/eip-2565) – _lowers ModExp gas cost_
- [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) – _enables easier support for multiple transaction types_
- [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929) – _gas cost increases for state access opcodes_
- [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) – _adds optional access lists_

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain genesis {#beacon-chain-genesis}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Beacon Chain block number: <a href="https://beaconscan.com/slot/1">1</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $586.23 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#beacon-chain-genesis-summary}

The [Beacon Chain](/upgrades/beacon-chain/) needed 16384 deposits of 32 staked ETH to ship securely. This happened on November 27, meaning the Beacon Chain started producing blocks on December 1, 2020. This is an important first step in achieving the [Ethereum vision](/upgrades/vision/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink to="/upgrades/beacon-chain/">
  The Beacon Chain
</DocLink>

---

### Staking deposit contract deployed {#staking-deposit-contract}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/11052984">11,052,984</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $379.04 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org on waybackmachine</a>

#### Summary {#deposit-contract-summary}

The staking deposit contract introduced [staking](/glossary/#staking) to the Ethereum ecosystem. Although a [Mainnet](/glossary/#mainnet) contract, it had a direct impact on the timeline for launching the [Beacon Chain](/upgrades/beacon-chain/), an important [Ethereum upgrade](/upgrades/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink to="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9200000">9,200,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $127.18 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#muir-glacier-summary}

The Muir Glacier fork introduced a delay to the [difficulty bomb](/glossary/#difficulty-bomb). Increases in block difficulty of the [proof-of-work](/developers/docs/consensus-mechanisms/pow/) consensus mechanism threatened to degrade the usability of Ethereum by increasing wait times for sending transactions and using dapps.

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-2384](https://eips.ethereum.org/EIPS/eip-2384) – _delays the difficulty bomb for another 4,000,000 blocks, or ~611 days._

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9069000">9,069,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $151.06 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#istanbul-summary}

The Istanbul fork:

- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Improved denial-of-service attack resilience.
- Made [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling) solutions based on SNARKs and STARKs more performant.
- Enabled Ethereum and Zcash to interoperate.
- Allowed contracts to introduce more creative functions.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _allow Ethereum to work with privacy-preserving currency like Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _cheaper cryptography to improve [gas](/glossary/#gas) costs._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protects Ethereum against replay attacks by adding `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimising opcode gas prices based on consumption._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduces the cost of CallData to allow more data in blocks – good for [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _other opcode gas price alterations._

</ExpandableCard>

---

### Constantinople {#constantinople}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/7280000">7,280,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $136.29 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#constantinople-summary}

The Constantinople fork:

- Ensured the blockchain didn't freeze before [proof-of-stake was implemented](#beacon-chain-genesis).
- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Added the ability to interact with addresses that haven't been created yet.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimises cost of certain on-chain actions._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _allows you to interact with addresses that have yet to be created._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimises cost of certain on-chain actions._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _makes sure the blockchain doesn't freeze before proof-of-stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/4370000">4,370,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $334.23 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#byzantium-summary}

The Byzantium fork:

- Reduced block [mining](/developers/docs/consensus-mechanisms/pow/mining/) rewards from 5 to 3 ETH.
- Delayed the [difficulty bomb](/glossary/#difficulty-bomb) by a year.
- Added ability to make non-state-changing calls to other contracts.
- Added certain cryptography methods to allow for [layer 2 scaling](/developers/docs/scaling/#layer-2-scaling).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-140](https://eips.ethereum.org/EIPS/eip-140) – _adds `REVERT` opcode._
- [EIP-658](https://eips.ethereum.org/EIPS/eip-658) – _status field added to transaction receipts to indicate success or failure._
- [EIP-196](https://eips.ethereum.org/EIPS/eip-196) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-197](https://eips.ethereum.org/EIPS/eip-197) – _adds elliptic curve and scalar multiplication to allow for [ZK-Snarks](/developers/docs/scaling/zk-rollups/)._
- [EIP-198](https://eips.ethereum.org/EIPS/eip-198) – _enables RSA signature verification._
- [EIP-211](https://eips.ethereum.org/EIPS/eip-211) – _adds support for variable length return values._
- [EIP-214](https://eips.ethereum.org/EIPS/eip-214) – _adds `STATICCALL` opcode, allowing non-state-changing calls to other contracts._
- [EIP-100](https://eips.ethereum.org/EIPS/eip-100) – _changes difficulty adjustment formula._
- [EIP-649](https://eips.ethereum.org/EIPS/eip-649) – _delays [difficulty bomb](/glossary/#difficulty-bomb) by 1 year and reduces block reward from 5 to 3 ETH._

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2675000">2,675,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $9.84 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#spurious-dragon-summary}

The Spurious Dragon fork was the second response to the denial of service (DoS) attacks on the network (September/October 2016) including:

- tuning opcode pricing to prevent future attacks on the network.
- enabling “debloat” of the blockchain state.
- adding replay attack protection.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-155](https://eips.ethereum.org/EIPS/eip-155) – _prevents transactions from one Ethereum chain from being rebroadcasted on an alternative chain, for example a testnet transaction being replayed on the main Ethereum chain._
- [EIP-160](https://eips.ethereum.org/EIPS/eip-160) – _adjusts prices of `EXP` opcode – makes it more difficult to slow down the network via computationally expensive contract operations._
- [EIP-161](https://eips.ethereum.org/EIPS/eip-161) – _allows for removal of empty accounts added via the DOS attacks._
- [EIP-170](https://eips.ethereum.org/EIPS/eip-170) – _changes the maximum code size that a contract on the blockchain can have – to 24576 bytes._

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2463000">2,463,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#tangerine-whistle-summary}

The Tangerine Whistle fork was the first response to the denial of service (DoS) attacks on the network (September/October 2016) including:

- addressing urgent network health issues concerning underpriced operation codes.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-150](https://eips.ethereum.org/EIPS/eip-150) – _increases gas costs of opcodes that can be used in spam attacks._
- [EIP-158](https://eips.ethereum.org/EIPS/eip-158) – _reduces state size by removing a large number of empty accounts that were put in the state at very low cost due to flaws in earlier versions of the Ethereum protocol._

</ExpandableCard>

---

### DAO fork {#dao-fork}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1920000">1,920,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.54 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#dao-fork-summary}

The DAO fork was in response to the [2016 DAO attack](https://www.coindesk.com/markets/2016/06/25/understanding-the-dao-attack/) where an insecure [DAO](/glossary/#dao) contract was drained of over 3.6 million ETH in a hack. The fork moved the funds from the faulty contract to a [new contract](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) with a single function: withdraw. Anyone who lost funds could withdraw 1 ETH for every 100 DAO tokens in their wallets.

This course of action was voted on by the Ethereum community. Any ETH holder was able to vote via a transaction on [a voting platform](http://v1.carbonvote.com/). The decision to fork reached over 85% of the votes.

Some miners refused to fork because the DAO incident wasn't a defect in the protocol. They went on to form [Ethereum Classic](https://ethereumclassic.org/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1150000">1,150,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#homestead-summary}

The Homestead fork that looked to the future. It included several protocol changes and a networking change that gave Ethereum the ability to do further network upgrades.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-2](https://eips.ethereum.org/EIPS/eip-2) – _makes edits to contract creation process._
- [EIP-7](https://eips.ethereum.org/EIPS/eip-7) – _adds new opcode: `DELEGATECALL`_
- [EIP-8](https://eips.ethereum.org/EIPS/eip-8) – _introduces devp2p forward compatibility requirements_

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/200000">200,000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $1.24 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#frontier-thawing-summary}

The frontier thawing fork lifted the 5,000 [gas](/glossary/#gas) limit per [block](/glossary/#block) and set the default gas price to 51 [gwei](/glossary/#gwei). This allowed for transactions – transactions require 21,000 gas. The [difficulty bomb](/glossary/#difficulty-bomb) was introduced to ensure a future hard-fork to [proof-of-stake](/glossary/#pos).

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Read the Ethereum Protocol Update 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/0">0</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: N/A<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

#### Summary {#frontier-summary}

Frontier was a live, but barebone implementation of the Ethereum project. It followed the successful Olympic testing phase. It was intended for technical users, specifically developers. [Blocks](/glossary/#block) had a [gas](/glossary/#gas) limit of 5,000. This ‘thawing’ period enabled miners to start their operations and for early adopters to install their clients without having to ‘rush’.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether sale {#ether-sale}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> July 22 - September 02, 2014<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140804235628/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

Ether officially went on sale for 42 days. You could buy it with BTC.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper released {#yellowpaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org on waybackmachine</a>

The Yellow Paper, authored by Dr. Gavin Wood, is a technical definition of the Ethereum protocol.

[View the Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper released {#whitepaper}

<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org on waybackmachine</a>

The introductory paper, published in 2013 by Vitalik Buterin, the founder of Ethereum, before the project's launch in 2015.

<DocLink to="/whitepaper/">
  Whitepaper
</DocLink>
