---
title: The Merge
description: Learn about The Merge - when Mainnet Ethereum adopted proof-of-stake.
lang: en
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoint1: Ethereum Mainnet uses proof-of-stake, but this wasn't always the case.
summaryPoint2: The upgrade from the original proof-of-work mechanism to proof-of-stake was called The Merge.
summaryPoint3: The Merge refers to the original Ethereum Mainnet merging with a separate proof-of-stake blockchain called the Beacon Chain, now existing as one chain.
summaryPoint4: The Merge reduced Ethereum's energy consumption by ~99.95%.
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  The Merge was executed on September 15, 2022. This completed Ethereum's transition to proof-of-stake consensus, officially deprecating proof-of-work and reducing energy consumption by ~99.95%.
</UpgradeStatus>

## What was The Merge? {#what-is-the-merge}

The Merge was the joining of the original execution layer of Ethereum (the Mainnet that has existed since [genesis](/history/#frontier)) with its new proof-of-stake consensus layer, the Beacon Chain. It eliminated the need for energy-intensive mining and instead enabled the network to be secured using staked ETH. It was a truly exciting step in realizing the Ethereum vision—more scalability, security, and sustainability.

<MergeInfographic />

Initially, the [Beacon Chain](/roadmap/beacon-chain/) shipped separately from [Mainnet](/glossary/#mainnet). Ethereum Mainnet - with all its accounts, balances, smart contracts, and blockchain state - continued to be secured by [proof-of-work](/developers/docs/consensus-mechanisms/pow/), even while the Beacon Chain ran in parallel using [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). The Merge was when these two systems finally came together, and proof-of-work was permanently replaced by proof-of-stake.

Imagine Ethereum is a spaceship that launched before it was quite ready for an interstellar voyage. With the Beacon Chain, the community built a new engine and a hardened hull. After significant testing, it became time to hot-swap the new engine for the old one mid-flight. This merged the new, more efficient engine into the existing ship enabling it to put in some serious light years and take on the universe.

## Merging with Mainnet {#merging-with-mainnet}

Proof-of-work secured Ethereum Mainnet from genesis until The Merge. This allowed the Ethereum blockchain we're all used to come into existence in July 2015 with all its familiar features—transactions, smart contracts, accounts, etc.

Throughout Ethereum's history, developers prepared for an eventual transition away from proof-of-work to proof-of-stake. On December 1, 2020, the Beacon Chain was created as a separate blockchain to Mainnet, running in parallel.

The Beacon Chain was not originally processing Mainnet transactions. Instead, it was reaching consensus on its own state by agreeing on active validators and their account balances. After extensive testing, it became time for the Beacon Chain to reach consensus on real world data. After The Merge, the Beacon Chain became the consensus engine for all network data, including execution layer transactions and account balances.

The Merge represented the official switch to using the Beacon Chain as the engine of block production. Mining is no longer the means of producing valid blocks. Instead, the proof-of-stake validators have adopted this role and are now responsible for processing the validity of all transactions and proposing blocks.

No history was lost in The Merge. As Mainnet merged with the Beacon Chain, it also merged the entire transactional history of Ethereum.

<InfoBanner>
This transition to proof-of-stake changed the way ether is issued. Learn more about <a href="/roadmap/merge/issuance/">ether issuance before and after The Merge</a>.
</InfoBanner>

### Users and holders {#users-holders}

**The Merge did not change anything for holders/users.**

_This bears repeating_: As a user or holder of ETH or any other digital asset on Ethereum, as well as non-node-operating stakers, **you do not need to do anything with your funds or wallet to account for The Merge.** ETH is just ETH. There is no such thing as "old ETH"/"new ETH" or "ETH1"/"ETH2" and wallets work exactly the same after The Merge as they did before—people telling you otherwise are likely scammers.

Despite swapping out proof-of-work, the entire history of Ethereum since genesis remained intact and unaltered by the transition to proof-of-stake. Any funds held in your wallet before The Merge are still accessible after The Merge. **No action is required to upgrade on your part.**

[More on Ethereum security](/security/#eth2-token-scam)

### Node operators and dapp developers {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

Key action items include:

1. Run _both_ a consensus client and an execution client; third-party endpoints to obtain execution data no longer work since The Merge.
2. Authenticate both execution and consensus clients with a shared JWT secret so they can securely communicate.
3. Set a `fee recipient` address to receive your earned transaction fee tips/MEV.

Not completing the first two items above will result in your node being seen as "offline" until both layers are synced and authenticated.

Not setting a `fee recipient` will still allow your validator to behave as usual, but you will miss out on unburnt fee tips and any MEV you would have otherwise earned in blocks your validator proposes.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

Up until The Merge, an execution client (such as Geth, Erigon, Besu or Nethermind) was enough to receive, properly validate, and propagate blocks being gossiped by the network. _After The Merge_, the validity of transactions contained within an execution payload now also depends on the validity of the "consensus block" it is contained within.

As a result, a full Ethereum node now requires both an execution client and a consensus client. These two clients work together using a new Engine API. The Engine API requires authentication using a JWT secret, which is provided to both clients allowing secure communication.

Key action items include:

- Install a consensus client in addition to an execution client
- Authenticate execution and consensus clients with a shared JWT secret so they can securely communicate with one another.

Not completing the above items will result in your node appearing to be "offline" until both layers are synced and authenticated.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

The Merge came with changes to consensus, which also includes changes related to:<

<ul>
  <li>block structure</li>
  <li>slot/block timing</li>
  <li>opcode changes</li>
  <li>sources of on-chain randomness</li>
  <li>concept of <em>safe head</em> and <em>finalized blocks</em></li>
</ul>

For more information, check out this blog post by Tim Beiko on <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/">How The Merge Impacts Ethereum’s Application Layer</a>.

</ExpandableCard>

## The Merge and energy consumption {#merge-and-energy}

The Merge marked the end of proof-of-work for Ethereum and started the era of a more sustainable, eco-friendly Ethereum. Ethereum's energy consumption dropped by an estimated 99.95%, making Ethereum a green blockchain. Learn more about [Ethereum energy consumption](/energy-consumption/).

## The Merge and scaling {#merge-and-scaling}

The Merge also set the stage for further scalability upgrades not possible under proof-of-work, bringing Ethereum one step closer to achieving the full scale, security and sustainability outlined in its [Ethereum vision](/roadmap/vision/).

## Misconceptions about The Merge {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e. run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

There are two types of Ethereum nodes: nodes that can propose blocks and nodes that don't.

Nodes that propose blocks are only a small number of the total nodes on Ethereum. This category includes mining nodes under proof-of-work (PoW) and validator nodes under proof-of-stake (PoS). This category requires committing economic resources (such as GPU hash power in proof-of-work or staked ETH in proof-of-stake) in exchange for the ability to occasionally propose the next block and earn protocol rewards.

The other nodes on the network (i.e. the majority) are not required to commit any economic resources beyond a consumer-grade computer with 1-2 TB of available storage and an internet connection. These nodes do not propose blocks, but they still serve a critical role in securing the network by holding all block proposers accountable by listening for new blocks and verifying their validity on arrival according to the network consensus rules. If the block is valid, the node continues propagating it through the network. If the block is invalid for whatever reason, the node software will disregard it as invalid and stop its propagation.

Running a non-block-producing node is possible for anyone under either consensus mechanism (proof-of-work or proof-of-stake); it is <em>strongly encouraged</em> for all users if they have the means. Running a node is immensely valuable for Ethereum and gives added benefits to any individual running one, such as improved security, privacy and censorship resistance.

The ability for anyone to run their own node is <em>absolutely essential</em> to maintaining the decentralization of the Ethereum network.

<a href="/run-a-node/">More on running your own node</a>

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

Gas fees are a product of network demand relative to the capacity of the network. The Merge deprecated the use of proof-of-work, transitioning to proof-of-stake for consensus, but did not significantly change any parameters that directly influence network capacity or throughput.

With a <a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">rollup-centric roadmap</a>, efforts are being focused on scaling user activity at <a href="/layer-2/">layer 2</a>, while enabling layer 1 Mainnet as a secure decentralized settlement layer optimized for rollup data storage to help make rollup transactions exponentially cheaper. The transition to proof-of-stake is a critical precursor to realizing this. <a href="/developers/docs/gas/">More on gas and fees.</a>

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
A transaction's "speed" can be measured in a few ways, including time to be included in a block and time to finalization. Both of these changes slightly, but not in a way that users will notice.

Historically, on proof-of-work, the target was to have a new block every ~13.3 seconds. Under proof-of-stake, slots occur precisely every 12 seconds, each of which is an opportunity for a validator to publish a block. Most slots have blocks, but not necessarily all (i.e. a validator is offline). In proof-of-stake, blocks are produced ~10% more frequently than on proof-of-work. This was a fairly insignificant change and is unlikely to be noticed by users.

Proof-of-stake introduced the transaction finality concept that did not previously exist. In proof-of-work, the ability to reverse a block gets exponentially more difficult with every passing block mined on top of a transaction, but it never quite reaches zero. Under proof-of-stake, blocks are bundled into epochs (6.4 minute spans of time containing 32 chances for blocks) which validators vote on. When an epoch ends, validators vote on whether to consider the epoch 'justified'. If validators agree to justify the epoch, it gets finalized in the next epoch. Undoing finalized transactions is economically inviable as it would require obtaining and burning over one-third of the total staked ETH.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

Initially after The Merge, stakers could only access fee tips and MEV that were earned as a result of block proposals. These rewards are credited to a non-staking account controlled by the validator (known as the <em>fee recipient</em>), and are available immediately. These rewards are separate from protocol rewards for performing validator duties.

Since the Shanghai/Capella network upgrade, stakers can now designate a <em>withdrawal address</em> to start receiving automatic payouts of any excess staking balance (ETH over 32 from protocol rewards). This upgrade also enabled the ability for a validator to unlock and reclaim its entire balance upon exiting from the network.

<a href="/staking/withdrawals/">More on staking withdrawals</a>

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
Since the Shanghai/Capella upgrade enabled withdrawals, validators are incentivized to withdraw their staking balance above 32 ETH, as these funds do not add to yield and are otherwise locked. Depending on the APR (determined by total ETH staked), they may be incentivized to exit their validator(s) to reclaim their entire balance or potentially stake even more using their rewards to earn more yield.

An important caveat here, full validator exits are rate limited by the protocol, and only so many validators may exit per epoch (every 6.4 minutes). This limit fluctuates depending on the number of active validators, but comes out to approximately 0.33% of total ETH staked can be exited from the network in a single day.

This prevents a mass exodus of staked funds. Furthermore, it prevents a potential attacker with access to a large portion of the total ETH staked from committing a slashable offense and exiting/withdrawing all of the offending validator balances in the same epoch before the protocol can enforce the slashing penalty.

The APR is also intentionally dynamic, allowing a market of stakers to balance how much they're willing to be paid to help secure the network. If the rate is too low, then validators will exit at a rate limited by the protocol. Gradually this will raise the APR for everyone who remains, attracting new or returning stakers yet again.
</ExpandableCard>

## What happened to 'Eth2'? {#eth2}

The term 'Eth2' has been deprecated. After merging 'Eth1' and 'Eth2' into a single chain, there is no longer any need to
distinguish between two Ethereum networks; there is just Ethereum.

To limit confusion, the community has updated these terms:

- 'Eth1' is now the 'execution layer', which handles transactions and execution.
- 'Eth2' is now the 'consensus layer', which handles proof-of-stake consensus.

These terminology updates only change naming conventions; this does not alter Ethereum's goals or roadmap.

[Learn more about the 'Eth2' renaming](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/)

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how The Merge relates to the other upgrades.

### The Merge and the Beacon Chain {#merge-and-beacon-chain}

The Merge represents the formal adoption of the Beacon Chain as the new consensus layer to the original Mainnet execution layer. Since The Merge, validators are assigned to secure Ethereum Mainnet, and mining on [proof-of-work](/developers/docs/consensus-mechanisms/pow/) is no longer a valid means of block production.

Blocks are instead proposed by validating nodes that have staked ETH in return for the right to participate in consensus. These upgrades set the stage for future scalability upgrades, including sharding.

<ButtonLink href="/roadmap/beacon-chain/">
  The Beacon Chain
</ButtonLink>

### The Merge and the Shanghai upgrade {#merge-and-shanghai}

In order to simplify and maximize focus on a successful transition to proof-of-stake, The Merge upgrade did not include certain anticipated features such as the ability to withdraw staked ETH. This functionality was enabled separately with the Shanghai/Capella upgrade.

For those curious, learn more about [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101), presented by Vitalik at the April 2021 ETHGlobal event.

### The Merge and sharding {#merge-and-data-sharding}

Originally, the plan was to work on sharding before The Merge to address scalability. However, with the boom of [layer 2 scaling solutions](/layer-2/), the priority shifted to swapping proof-of-work to proof-of-stake first.

Plans for sharding are rapidly evolving, but given the rise and success of layer 2 technologies to scale transaction execution, sharding plans have shifted to finding the most optimal way to distribute the burden of storing compressed calldata from rollup contracts, allowing for exponential growth in network capacity. This would not be possible without first transitioning to proof-of-stake.

<ButtonLink href="/roadmap/danksharding/">
  Sharding
</ButtonLink>

## Further reading {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />
