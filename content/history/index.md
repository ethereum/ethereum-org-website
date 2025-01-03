---
title: History and Forks of Ethereum
description: A history of the Ethereum blockchain including major milestones, releases, and forks.
lang: en
sidebarDepth: 1
---

# The history of Ethereum {#the-history-of-ethereum}

A timeline of all the major milestones, forks, and updates to the Ethereum blockchain.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technical upgrades.">

Forks are when major technical upgrades or changes need to be made to the network – they typically stem from <a href="/eips/">Ethereum Improvement Proposals (EIPs)</a> and change the "rules" of the protocol.

When upgrades are needed in traditional, centrally-controlled software, the company will just publish a new version for the end-user. Blockchains work differently because there is no central ownership. <a href="/developers/docs/nodes-and-clients/">Ethereum clients</a> must update their software to implement the new fork rules. Plus block creators (miners in a proof-of-work world, validators in a proof-of-stake world) and nodes must create blocks and validate against the new rules. <a href="/developers/docs/consensus-mechanisms/">More on consensus mechanisms</a>

These rule changes may create a temporary split in the network. New blocks could be produced according to the new rules or the old ones. Forks are usually agreed upon ahead of time so that clients adopt the changes in unison and the fork with the upgrades becomes the main chain. However, in rare cases, disagreements over forks can cause the network to permanently split – most notably the creation of Ethereum Classic with the <a href="#dao-fork">DAO fork</a>.

</ExpandableCard>

<ExpandableCard title="Why do some upgrades have multiple names?" contentPreview="Upgrades names follow a pattern">

The software that underlies Ethereum is composed of two halves, known as the [execution layer](/glossary/#execution-layer) and the [consensus layer](/glossary/#consensus-layer).

**Execution upgrade naming**

Since 2021, upgrades to the **execution layer** are named according to the city names of [previous Devcon locations](https://devcon.org/en/past-events/) in chronological order:

| Upgrade Name | Devcon Year | Devcon Number | Upgrade Date |
| ------------ | ----------- | ------------- | ------------ |
| Berlin       | 2015        | 0             | Apr 15, 2021 |
| London       | 2016        | I             | Aug 5, 2021  |
| Shanghai     | 2017        | II            | Apr 12, 2023 |
| **Cancun**   | 2018        | III           | Mar 13, 2024 |
| _Prague_     | 2019        | IV            | TBD          |
| _Osaka_      | 2020        | V             | TBD          |
| _Bogota_     | 2022        | VI            | TBD          |
| _Bangkok_    | 2024        | VII           | TBD          |

**Consensus upgrade naming**

Since the launch of the [Beacon Chain](/glossary/#beacon-chain), upgrades to the **consensus layer** are named after celestial stars beginning with letters that proceed in alphabetical order:

| Upgrade Name                                                | Upgrade Date |
| ----------------------------------------------------------- | ------------ |
| Beacon Chain genesis                                        | Dec 1, 2020  |
| [Altair](https://en.wikipedia.org/wiki/Altair)              | Oct 27, 2021 |
| [Bellatrix](https://en.wikipedia.org/wiki/Bellatrix)        | Sep 6, 2022  |
| [Capella](https://en.wikipedia.org/wiki/Capella)            | Apr 12, 2023 |
| [**Deneb**](https://en.wikipedia.org/wiki/Deneb)            | Mar 13, 2024 |
| [_Electra_](<https://en.wikipedia.org/wiki/Electra_(star)>) | TBD          |

**Combined naming**

The execution and consensus upgrades were initially rolled out at different times, but after [The Merge](/roadmap/merge/) in 2022 these have been deployed simultaneously. As-such, colloquial terms have emerged to simplify references to these upgrades using a single conjoined term. This began with the _Shanghai-Capella_ upgrade, commonly referred to as "**Shapella**", and is continued with the _Cancun-Deneb_ upgrade, which may be referred to as "**Dencun**."

| Execution Upgrade | Consensus Upgrade | Short Name |
| ----------------- | ----------------- | ---------- |
| Shanghai          | Capella           | "Shapella" |
| Cancun            | Deneb             | "Dencun"   |

</ExpandableCard>

Skip straight to information about some of the particularly important past upgrades: [The Beacon Chain](/roadmap/beacon-chain/); [The Merge](/roadmap/merge/); and [EIP-1559](#london)

Looking for future protocol upgrades? [Learn about upcoming upgrades on the Ethereum roadmap](/roadmap/).

<Divider />

## 2024 {#2024}

### Cancun-Deneb ("Dencun") {#dencun}

<NetworkUpgradeSummary name="dencun" />

#### Cancun summary {#cancun-summary}

The Cancun upgrade contains a set of improvements to Ethereum's _execution_ aimed towards improving scalability, in tandem with the Deneb consensus upgrades.

Notably this includes EIP-4844, known as **Proto-Danksharding**, which significantly decreases the cost of data storage for layer 2 rollups. This is achieved through the introduction of data "blobs" which enables rollups to post data to Mainnet for a short period of time. This results in significantly lower transaction fees for users of layer 2 rollups.

<ExpandableCard title="Cancun EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1153">EIP-1153</a> - <em>Transient storage opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob transactions (Proto-Danksharding)</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5656">EIP-5656</a> - <em><code>MCOPY</code> - Memory copying instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6780">EIP-6780</a> - <em><code>SELFDESTRUCT</code> only in same transaction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7516">EIP-7516</a> - <em><code>BLOBBASEFEE</code> opcode</em></li>
</ul>

</ExpandableCard>

- [Layer 2 rollups](/layer-2/)
- [Proto-Danksharding](/roadmap/scaling/#proto-danksharding)
- [Danksharding](/roadmap/danksharding/)
- [Read the Cancun upgrade specification](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/cancun.md)

#### Deneb summary {#deneb-summary}

The Deneb upgrade contains a set of improvements to Ethereum's _consensus_ aimed towards improving scalability. This upgrade comes in tandem with the Cancun execution upgrades to enable Proto-Danksharding (EIP-4844), along with other improvements to the Beacon Chain.

Pre-generated signed "voluntary exit messages" no longer expire, thus giving more control to users staking their funds with a third-party node operator. With this signed exit message, stakers can delegate node operation while maintaining the ability to safely exit and withdrawal their funds at any time, without needing to ask permission from anyone.

EIP-7514 brings a tightening to the issuance of ETH by capping the "churn" rate that validators can join the network to eight (8) per epoch. Since ETH issuance is proportional to total ETH staked, limiting the number of validators joining caps the _growth rate_ of newly issued ETH, while also reducing hardware requirements for node operators, helping decentralization.

<ExpandableCard title="Deneb EIPs" contentPreview="Official improvements included in this upgrade">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4788">EIP-4788</a> - <em>Beacon block root in the EVM</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4844">EIP-4844</a> - <em>Shard blob transactions</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7044">EIP-7044</a> - <em>Perpetually valid signed voluntary exits</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7045">EIP-7045</a> - <em>Increase max attestation inclusion slot</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7514">EIP-7514</a> - <em>Add max epoch churn limit</em></li>
</ul>

</ExpandableCard>

- [Read the Deneb upgrade specifications](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/)
- [Cancun-Deneb ("Dencun") FAQ](/roadmap/dencun/)

<Divider />

## 2023 {#2023}

### Shanghai-Capella ("Shapella") {#shapella}

<NetworkUpgradeSummary name="shapella" />

#### Shanghai summary {#shanghai-summary}

The Shanghai upgrade brought staking withdrawals to the execution layer. In tandem with the Capella upgrade, this enabled blocks to accept withdrawal operations, which allows stakers to withdraw their ETH from the Beacon Chain to the execution layer.

<ExpandableCard title="Shanghai EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3651">EIP-3651</a> – <em>Starts the <code>COINBASE</code> address warm</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3855">EIP-3855</a> – <em>New <code>PUSH0</code> instruction</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3860">EIP-3860</a> – <em>Limit and meter initcode</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4895">EIP-4895</a> – <em>Beacon chain push withdrawals as operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-6049">EIP-6049</a> - <em>Deprecate <code>SELFDESTRUCT</code></em></li>
</ul>

</ExpandableCard>

- [Read the Shanghai upgrade specification](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/shanghai.md)

#### Capella summary {#capella-summary}

The Capella upgrade was the third major upgrade to the consensus layer (Beacon Chain) and enabled staking withdrawals. Capella occurred synchronously with the execution layer upgrade, Shanghai, and enabled staking withdrawal functionality.

This consensus layer upgrade brought the ability for stakers who did not provide withdrawal credentials with their initial deposit to do so, thereby enabling withdrawals.

The upgrade also provided automatic account sweeping functionality, which continuously processes validator accounts for any available rewards payments or full withdrawals.

- [More on staking withdrawals](/staking/withdrawals/).
- [Read the Capella upgrade specifications](https://github.com/ethereum/consensus-specs/blob/dev/specs/capella/)

<Divider />

## 2022 {#2022}

### Paris (The Merge) {#paris}

<NetworkUpgradeSummary name="paris" />

#### Summary {#paris-summary}

The Paris upgrade was triggered by the proof-of-work blockchain passing a [terminal total difficulty](/glossary/#terminal-total-difficulty) of 58750000000000000000000. This happened at block 15537393 on 15th September 2022, triggering the Paris upgrade the next block. Paris was [The Merge](/roadmap/merge/) transition - its major feature was switching off the [proof-of-work](/developers/docs/consensus-mechanisms/pow) mining algorithm and associated consensus logic and switching on [proof-of-stake](/developers/docs/consensus-mechanisms/pos) instead. Paris itself was an upgrade to the [execution clients](/developers/docs/nodes-and-clients/#execution-clients) (equivalent to Bellatrix on the consensus layer) that enabled them to take instruction from their connected [consensus clients](/developers/docs/nodes-and-clients/#consensus-clients). This required a new set of internal API methods, collectively known as the [Engine API](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md), to be activated. This was arguably the most significant upgrade in Ethereum history since [Homestead](#homestead)!

- [Read the Paris upgrade specification](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/mainnet-upgrades/paris.md)

<ExpandableCard title="Paris EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3675">EIP-3675</a> – <em>Upgrade consensus to Proof-of-Stake</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4399">EIP-4399</a> – <em>Supplant DIFFICULTY opcode with PREVRANDAO</em></li>
</ul>

</ExpandableCard>

---

### Bellatrix {#bellatrix}

<NetworkUpgradeSummary name="bellatrix" />

#### Summary {#bellatrix-summary}

The Bellatrix upgrade was the second scheduled upgrade for the [Beacon Chain](/roadmap/beacon-chain), preparing the chain for [The Merge](/roadmap/merge/). It brings validator penalties to their full values for inactivity and slashable offenses. Bellatrix also includes an update to the fork choice rules to prepare the chain for The Merge and the transition from the last proof-of-work block to the first proof-of-stake block. This includes making consensus clients aware of the [terminal total difficulty](/glossary/#terminal-total-difficulty) of 58750000000000000000000.

- [Read the Bellatrix upgrade specification](https://github.com/ethereum/consensus-specs/tree/dev/specs/bellatrix)

---

### Gray Glacier {#gray-glacier}

<NetworkUpgradeSummary name="grayGlacier" />

#### Summary {#gray-glacier-summary}

The Gray Glacier network upgrade pushed back the [difficulty bomb](/glossary/#difficulty-bomb) by three months. This is the only change introduced in this upgrade, and is similar in nature to the [Arrow Glacier](#arrow-glacier) and [Muir Glacier](#muir-glacier) upgrades. Similar changes have been performed on the [Byzantium](#byzantium), [Constantinople](#constantinople) and [London](#london) network upgrades.

- [EF Blog - Gray Glacier Upgrade Announcement](https://blog.ethereum.org/2022/06/16/gray-glacier-announcement/)

<ExpandableCard title="Gray Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-5133">EIP-5133</a> – <em>delays the difficulty bomb until September 2022</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2021 {#2021}

### Arrow Glacier {#arrow-glacier}

<NetworkUpgradeSummary name="arrowGlacier" />

#### Summary {#arrow-glacier-summary}

The Arrow Glacier network upgrade pushed back the [difficulty bomb](/glossary/#difficulty-bomb) by several months. This is the only change introduced in this upgrade, and is similar in nature to the [Muir Glacier](#muir-glacier) upgrade. Similar changes have been performed on the [Byzantium](#byzantium), [Constantinople](#constantinople) and [London](#london) network upgrades.

- [EF Blog - Arrow Glacier Upgrade Announcement](https://blog.ethereum.org/2021/11/10/arrow-glacier-announcement/)
- [Ethereum Cat Herders - Ethereum Arrow Glacier Upgrade](https://medium.com/ethereum-cat-herders/ethereum-arrow-glacier-upgrade-e8d20fa4c002)

<ExpandableCard title="Arrow Glacier EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-4345">EIP-4345</a> – <em>delays the difficulty bomb until June 2022</em></li>
</ul>

</ExpandableCard>

---

### Altair {#altair}

<NetworkUpgradeSummary name="altair" />

#### Summary {#altair-summary}

The Altair upgrade was the first scheduled upgrade for the [Beacon Chain](/roadmap/beacon-chain). It added support for "sync committees"—enabling light clients, and increased validator inactivity and slashing penalties as development progressed towards The Merge.

- [Read the Altair upgrade specification](https://github.com/ethereum/consensus-specs/tree/dev/specs/altair)

#### <Emoji text=":tada:" size={1} className="me-2" />Fun fact! {#altair-fun-fact}

Altair was the first major network upgrade that had an exact rollout time. Every upgrade prior had been based on a declared block number on the proof-of-work chain, where block times vary. The Beacon Chain does not require solving for proof-of-work, and instead works on a time-based epoch system consisting of 32 twelve-second "slots" of time where validators can propose blocks. This is why we knew exactly when we would hit epoch 74,240 and Altair became live!

- [Block time](/developers/docs/blocks/#block-time)

---

### London {#london}

<NetworkUpgradeSummary name="london" />

#### Summary {#london-summary}

The London upgrade introduced [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), which reformed the transaction fee market, along with changes to how gas refunds are handled and the [Ice Age](/glossary/#ice-age) schedule.

#### What was the London Upgrade / EIP-1559? {#eip-1559}

Before the London Upgrade, Ethereum had fixed-sized blocks. In times of high network demand, these blocks operated at full capacity. As a result, users often had to wait for demand to reduce to get included in a block, which led to a poor user experience. The London Upgrade introduced variable-sized blocks to Ethereum.

The way transaction fees on the Ethereum network were calculated changed with [the London Upgrade](/history/#london) of August 2021. Before the London upgrade, fees were calculated without separating `base` and `priority` fees, as follows:

Let's say Alice had to pay Bob 1 ETH. In the transaction, the gas limit is 21,000 units, and the gas price is 200 gwei.

The total fee would have been: `Gas units (limit) * Gas price per unit` i.e `21,000 * 200 = 4,200,000 gwei` or 0.0042 ETH

The implementation of [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) in the London Upgrade made the transaction fee mechanism more complex, but made gas fees more predictable, resulting in a more efficient transaction fee market. Users can submit transactions with a `maxFeePerGas` corresponding to how much they are willing to pay for the transaction to be executed, knowing that they will not pay more than the market price for gas (`baseFeePerGas`), and get any extra, minus their tip, refunded.

This video explains EIP-1559 and the benefits it brings: [EIP-1559 Explained](https://www.youtube.com/watch?v=MGemhK9t44Q)

- [Are you a dapp developer? Be sure to upgrade your libraries and tooling.](https://github.com/ethereum/execution-specs/blob/master/network-upgrades/london-ecosystem-readiness.md)
- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2021/07/15/london-mainnet-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/london-upgrade-overview-8eccb0041b41)

<ExpandableCard title="London EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1559">EIP-1559</a> – <em>improves the transaction fee market</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3198">EIP-3198</a> – <em>returns the <code>BASEFEE</code> from a block</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3529">EIP-3529</a> - <em>reduces gas refunds for EVM operations</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3541">EIP-3541</a> - <em>prevents deploying contracts starting with <code>0xEF</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-3554">EIP-3554</a> – <em>delays the Ice Age until December 2021</em></li>
</ul>

</ExpandableCard>

---

### Berlin {#berlin}

<NetworkUpgradeSummary name="berlin" />

#### Summary {#berlin-summary}

The Berlin upgrade optimized gas cost for certain EVM actions, and increases support for multiple transaction types.

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2021/03/08/ethereum-berlin-upgrade-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/the-berlin-upgrade-overview-2f7ad710eb80)

<ExpandableCard title="Berlin EIPs" contentPreview="Official improvements included in this upgrade.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2565">EIP-2565</a> – <em>lowers ModExp gas cost</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2718">EIP-2718</a> – <em>enables easier support for multiple transaction types</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2929">EIP-2929</a> – <em>gas cost increases for state access opcodes</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2930">EIP-2930</a> – <em>adds optional access lists</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain genesis {#beacon-chain-genesis}

<NetworkUpgradeSummary name="beaconChainGenesis" />

#### Summary {#beacon-chain-genesis-summary}

The [Beacon Chain](/roadmap/beacon-chain/) needed 16384 deposits of 32 staked ETH to ship securely. This happened on November 27, meaning the Beacon Chain started producing blocks on December 1, 2020. This is an important first step in achieving the [Ethereum vision](/roadmap/vision/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2020/11/27/eth2-quick-update-no-21/)

<DocLink href="/roadmap/beacon-chain/">
  The Beacon Chain
</DocLink>

---

### Staking deposit contract deployed {#staking-deposit-contract}

<NetworkUpgradeSummary name="stakingDepositContractDeployed" />

#### Summary {#deposit-contract-summary}

The staking deposit contract introduced [staking](/glossary/#staking) to the Ethereum ecosystem. Although a [Mainnet](/glossary/#mainnet) contract, it had a direct impact on the timeline for launching the [Beacon Chain](/roadmap/beacon-chain/), an important [Ethereum upgrade](/roadmap/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2020/11/04/eth2-quick-update-no-19/)

<DocLink href="/staking/">
  Staking
</DocLink>

---

### Muir Glacier {#muir-glacier}

<NetworkUpgradeSummary name="muirGlacier" />

#### Summary {#muir-glacier-summary}

The Muir Glacier fork introduced a delay to the [difficulty bomb](/glossary/#difficulty-bomb). Increases in block difficulty of the [proof-of-work](/developers/docs/consensus-mechanisms/pow/) consensus mechanism threatened to degrade the usability of Ethereum by increasing wait times for sending transactions and using dapps.

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/12/23/ethereum-muir-glacier-upgrade-announcement/)
- [Read the Ethereum Cat Herder's explainer](https://medium.com/ethereum-cat-herders/ethereum-muir-glacier-upgrade-89b8cea5a210)

<ExpandableCard title="Muir Glacier EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2384">EIP-2384</a> – <em>delays the difficulty bomb for another 4,000,000 blocks, or ~611 days.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<NetworkUpgradeSummary name="istanbul" />

#### Summary {#istanbul-summary}

The Istanbul fork:

- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Improved denial-of-service attack resilience.
- Made [Layer 2 scaling](/developers/docs/scaling/#layer-2-scaling) solutions based on SNARKs and STARKs more performant.
- Enabled Ethereum and Zcash to interoperate.
- Allowed contracts to introduce more creative functions.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-152">EIP-152</a> – <em>allow Ethereum to work with privacy-preserving currency like Zcash.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1108">EIP-1108</a> – <em>cheaper cryptography to improve <a href="/glossary/#gas">gas</a> costs.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1344">EIP-1344</a> – <em>protects Ethereum against replay attacks by adding <code>CHAINID</code> <a href="/developers/docs/ethereum-stack/#ethereum-virtual-machine">opcode</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1884">EIP-1884</a> – <em>optimising opcode gas prices based on consumption.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2028">EIP-2028</a> – <em>reduces the cost of CallData to allow more data in blocks – good for <a href="/developers/docs/scaling/#layer-2-scaling">Layer 2 scaling</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2200">EIP-2200</a> – <em>other opcode gas price alterations.</em></li>
</ul>

</ExpandableCard>

---

### Constantinople {#constantinople}

<NetworkUpgradeSummary name="constantinople" />

#### Summary {#constantinople-summary}

The Constantinople fork:

- Reduced block [mining](/developers/docs/consensus-mechanisms/pow/mining/) rewards from 3 to 2 ETH.
- Ensured the blockchain didn't freeze before [proof-of-stake was implemented](#beacon-chain-genesis).
- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Added the ability to interact with addresses that haven't been created yet.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-145">EIP-145</a> – <em>optimises cost of certain on-chain actions.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1014">EIP-1014</a> – <em>allows you to interact with addresses that have yet to be created.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1052">EIP-1052</a> – <em>introduces the <code>EXTCODEHASH</code> instruction to retrieve the hash of another contract's code.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-1234">EIP-1234</a> – <em>makes sure the blockchain doesn&#39;t freeze before proof-of-stake and reduces block reward from 3 to 2 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<NetworkUpgradeSummary name="byzantium" />

#### Summary {#byzantium-summary}

The Byzantium fork:

- Reduced block [mining](/developers/docs/consensus-mechanisms/pow/mining/) rewards from 5 to 3 ETH.
- Delayed the [difficulty bomb](/glossary/#difficulty-bomb) by a year.
- Added ability to make non-state-changing calls to other contracts.
- Added certain cryptography methods to allow for [layer 2 scaling](/developers/docs/scaling/#layer-2-scaling).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/)

<ExpandableCard title="Byzantium EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-140">EIP-140</a> – <em>adds <code>REVERT</code> opcode.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-658">EIP-658</a> – <em>status field added to transaction receipts to indicate success or failure.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-196">EIP-196</a> – <em>adds elliptic curve and scalar multiplication to allow for <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-197">EIP-197</a> – <em>adds elliptic curve and scalar multiplication to allow for <a href="/developers/docs/scaling/zk-rollups/">ZK-Snarks</a>.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-198">EIP-198</a> – <em>enables RSA signature verification.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-211">EIP-211</a> – <em>adds support for variable length return values.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-214">EIP-214</a> – <em>adds <code>STATICCALL</code> opcode, allowing non-state-changing calls to other contracts.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-100">EIP-100</a> – <em>changes difficulty adjustment formula.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-649">EIP-649</a> – <em>delays <a href="/glossary/#difficulty-bomb">difficulty bomb</a> by 1 year and reduces block reward from 5 to 3 ETH.</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<NetworkUpgradeSummary name="spuriousDragon" />

#### Summary {#spurious-dragon-summary}

The Spurious Dragon fork was the second response to the denial of service (DoS) attacks on the network (September/October 2016) including:

- tuning opcode pricing to prevent future attacks on the network.
- enabling “debloat” of the blockchain state.
- adding replay attack protection.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)

<ExpandableCard title="Spurious Dragon EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-155">EIP-155</a> – <em>prevents transactions from one Ethereum chain from being rebroadcasted on an alternative chain, for example a testnet transaction being replayed on the main Ethereum chain.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-160">EIP-160</a> – <em>adjusts prices of <code>EXP</code> opcode – makes it more difficult to slow down the network via computationally expensive contract operations.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-161">EIP-161</a> – <em>allows for removal of empty accounts added via the DOS attacks.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-170">EIP-170</a> – <em>changes the maximum code size that a contract on the blockchain can have – to 24576 bytes.</em></li>
</ul>

</ExpandableCard>

---

### Tangerine whistle {#tangerine-whistle}

<NetworkUpgradeSummary name="tangerineWhistle" />

#### Summary {#tangerine-whistle-summary}

The Tangerine Whistle fork was the first response to the denial of service (DoS) attacks on the network (September/October 2016) including:

- addressing urgent network health issues concerning underpriced operation codes.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/)

<ExpandableCard title="Tangerine Whistle EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-150">EIP-150</a> – <em>increases gas costs of opcodes that can be used in spam attacks.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-158">EIP-158</a> – <em>reduces state size by removing a large number of empty accounts that were put in the state at very low cost due to flaws in earlier versions of the Ethereum protocol.</em></li>
</ul>

</ExpandableCard>

---

### DAO fork {#dao-fork}

<NetworkUpgradeSummary name="daoFork" />

#### Summary {#dao-fork-summary}

The DAO fork was in response to the [2016 DAO attack](https://www.coindesk.com/learn/understanding-the-dao-attack/) where an insecure [DAO](/glossary/#dao) contract was drained of over 3.6 million ETH in a hack. The fork moved the funds from the faulty contract to a [new contract](https://etherscan.io/address/0xbf4ed7b27f1d666546e30d74d50d173d20bca754) with a single function: withdraw. Anyone who lost funds could withdraw 1 ETH for every 100 DAO tokens in their wallets.

This course of action was voted on by the Ethereum community. Any ETH holder was able to vote via a transaction on [a voting platform](https://web.archive.org/web/20170620030820/http://v1.carbonvote.com/). The decision to fork reached over 85% of the votes.

Some miners refused to fork because the DAO incident wasn't a defect in the protocol. They went on to form [Ethereum Classic](https://ethereumclassic.org/).

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/07/20/hard-fork-completed/)

---

### Homestead {#homestead}

<NetworkUpgradeSummary name="homestead" />

#### Summary {#homestead-summary}

The Homestead fork that looked to the future. It included several protocol changes and a networking change that gave Ethereum the ability to do further network upgrades.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2016/02/29/homestead-release/)

<ExpandableCard title="Homestead EIPs" contentPreview="Official improvements included in this fork.">

<ul>
  <li><a href="https://eips.ethereum.org/EIPS/eip-2">EIP-2</a> – <em>makes edits to contract creation process.</em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-7">EIP-7</a> – <em>adds new opcode: <code>DELEGATECALL</code></em></li>
  <li><a href="https://eips.ethereum.org/EIPS/eip-8">EIP-8</a> – <em>introduces devp2p forward compatibility requirements</em></li>
</ul>

</ExpandableCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<NetworkUpgradeSummary name="frontierThawing" />

#### Summary {#frontier-thawing-summary}

The frontier thawing fork lifted the 5,000 [gas](/glossary/#gas) limit per [block](/glossary/#block) and set the default gas price to 51 [gwei](/glossary/#gwei). This allowed for transactions – transactions require 21,000 gas. The [difficulty bomb](/glossary/#difficulty-bomb) was introduced to ensure a future hard-fork to [proof-of-stake](/glossary/#pos).

- [Read the Ethereum Foundation announcement](https://blog.ethereum.org/2015/08/04/the-thawing-frontier/)
- [Read the Ethereum Protocol Update 1](https://blog.ethereum.org/2015/08/04/ethereum-protocol-update-1/)

---

### Frontier {#frontier}

<NetworkUpgradeSummary name="frontier" />

#### Summary {#frontier-summary}

Frontier was a live, but barebone implementation of the Ethereum project. It followed the successful Olympic testing phase. It was intended for technical users, specifically developers. [Blocks](/glossary/#block) had a [gas](/glossary/#gas) limit of 5,000. This ‘thawing’ period enabled miners to start their operations and for early adopters to install their clients without having to ‘rush’.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2015/07/22/frontier-is-coming-what-to-expect-and-how-to-prepare/)

<Divider />

## 2014 {#2014}

### Ether sale {#ether-sale}

<NetworkUpgradeSummary name="etherSale" />

Ether officially went on sale for 42 days. You could buy it with BTC.

[Read the Ethereum Foundation announcement](https://blog.ethereum.org/2014/07/22/launching-the-ether-sale/)

---

### Yellowpaper released {#yellowpaper}

<NetworkUpgradeSummary name="yellowpaperRelease" />

The Yellow Paper, authored by Dr. Gavin Wood, is a technical definition of the Ethereum protocol.

[View the Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper released {#whitepaper}

<NetworkUpgradeSummary name="whitepaperRelease" />

The introductory paper, published in 2013 by Vitalik Buterin, the founder of Ethereum, before the project's launch in 2015.

<DocLink href="/whitepaper/">
  Whitepaper
</DocLink>
