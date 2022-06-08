---
title: The Merge
description: Learn about The Merge - when Mainnet Ethereum joins the Beacon Chain coordinated proof-of-stake system.
lang: en
template: upgrade
sidebar: true
image: ../../../assets/upgrades/merge.png
summaryPoint1: Soon the current Ethereum Mainnet will merge with the Beacon Chain proof-of-stake system.
summaryPoint2: This will mark the end of proof-of-work for Ethereum, and the full transition to proof-of-stake.
summaryPoint3: This sets the stage for future scaling upgrades including data sharding.
summaryPoint4: With The Merge, Ethereum's energy consumption drops by 99.95%. Welcome to a new greener Ethereum.
---

<UpgradeStatus dateKey="page-upgrades-merge-date">
The Merge is one of the most significant and high-stakes upgrades in the history of Ethereum. Extensive testing and bug bounties have been underway for years to ensure a safe transition to proof-of-stake.

This process is in its final stages, with plans to undergo The Merge on a few public testnets before finally moving forward with Mainnet. If you’re as excited about The Merge as we are, follow the <a href="https://blog.ethereum.org">EF Blog</a> or the client communication channels for the latest official word on <em>When Merge?</em>
</UpgradeStatus>

## What is The Merge? {#what-is-the-docking}

The Merge represents the merger of the existing execution layer of Ethereum (the Mainnet we use today) with its new proof-of-stake consensus layer, the Beacon Chain.

It's important to remember that initially, the [Beacon Chain](/upgrades/beacon-chain/) (the new "consensus layer") shipped separately from [Mainnet](/glossary/#mainnet). Ethereum Mainnet (the "execution layer") continues to be secured by [proof-of-work](/developers/docs/consensus-mechanisms/pow/), even while the Beacon Chain runs in parallel using [proof-of-stake](/developers/docs/consensus-mechanisms/pos/). The approaching Merge is when these two systems finally come together, and proof-of-work is replaced permanently by proof-of-stake.

Imagine Ethereum is a space ship that isn’t quite ready for an interstellar voyage. With the Beacon Chain the community has built a new engine and a hardened hull. After significant testing, it's almost time to hot-swap in the new engine for the old mid-flight. This will merge the new more efficient engine into the existing ship, ready to put in some serious lightyears and take on the universe.

## Merging with Mainnet {#merging-with-mainnet}

Since genesis, Mainnet has been secured by proof-of-work. This is the main Ethereum blockchain that we're all used to—it contains every transaction, every smart contract, and every balance since it began in July 2015.

During this growing history, developers have been hard at work preparing for an eventual transition away from proof-of-work, to proof-of-stake instead. On December 1, 2020 the Beacon Chain was born, which has since lived as a separate blockchain to Mainnet, running in parallel.

The Beacon Chain has not been processing Mainnet transactions, and for all intents and purposed has simply been coming to consensus on the state of itself... which is great and all, but after extensive testing, the time for it to come to consensus on more than just itself is rapidly approaching.

The Merge itself represents the official switch to using the Beacon Chain as the official means of block production. Mining will no longer be the means of producing valid blocks, and instead this role will land with the validators who will then be responsible for processing the validity of all transactions.

No history is lost. As Mainnet is merged with the Beacon Chain, the entire transactional history of Ethereum comes with it. You don't need to do anything. Your funds are safe.

## Who does this upgrade affect?

The Merge is one of the most significant and anticipated upgrades in the history of Ethereum, and although in the long-term its impact will be felt by everyone, in the near-term there are a few things the following groups of people should be aware of that we'll discuss below:

- Node-operating solo stakers
- Non-validating none operators
- Dapp and smart contract developers

For everyday users and holders there is nothing you need to do, but a few things you should be on alert for. [More on this below](#users-holders).

## What to I need to do to get ready?

### Node-operating stakers and staking providers

If you are a solo staker running your own node setup, there are a few things you need to be aware to be prepared for The Merge. Key action items include:

- Running _both_ a consensus client as well as an execution client. Third-party endpoints to obtain execution data will be unavailable after The Merge.
- Authenticated your execution and consensus layer clients with a shared JWT secret so they can securely communicate with one another.

Not completing the above items will result in your node being seen as "offline" after The Merge until both layers are synced and authenticated.

- Setting a `fee recipient` address to direct your earned transaction fee tips/MEV to.

Not setting a `fee recipient` will still allow your validator to behave as usual, but you will miss out on unburnt fee tips and any MEV you would have otherwise earned in blocks your validator proposes.

For more detailed information and summary of links to client resources, stakers are encouraged to check out the [Merge Readiness Checklist](https://launchpad.ethereum.org/en/merge-readiness/) over on the Staking Launchpad to make sure you're fully prepared for The Merge.

### Non-validating node operators and infrastructure providers

If you're operating a non-validating Ethereum node, the most significant change that comes with The Merge is the requirement to run clients for _both_ the execution layer (EL) and the consensus layer (CL).

You probably are already running an EL client, such as Geth, Erigon, Besu or Nethermind. Up until The Merge, an execution layer client was enough to receive, properly validate, and propagate blocks being gossiped by the network. _After The Merge_, the validity of transactions contained within an execution payload will also depend on the validity of the "consensus block" it is contained within.

This means that a full Ethereum node after The Merge requires both an EL client as well as a CL client. These two clients work tightly together using a new Engine API to properly determine the latest state of the network. The Engine API requires authentication using a JWT secret, which is provided to both clients allowing secure communication.

- I have installed a consensus layer client in addition to my execution layer client
- I have authenticated my execution and consensus layer clients with a shared JWT secret so they can securely communicate with one another.

Not completing the above items in time for The Merge will result in your node appearing to be "offline" until both layers are synced and authenticated.

Node operators can also check out the [Merge Readiness Checklist](https://launchpad.ethereum.org/en/merge-readiness/) on the Staking Launchpad for more information, as much of the details apply to all node operators.

### Dapp/smart contract developers

The Merge has been designed to have minimal impact on smart contract and dapp developers, but there are a few small things devs may want to be aware of heading into The Merge. These changes relate to

- block structure
- slot/block timing
- opcode changes
- sources of on-chain randomness
- concept of _safe head_ and _finalized blocks_

For more information, check out this blog post by Tim Beiko on [How The Merge Impacts Ethereum’s Application Layer](https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer/).

### Users & hodlers {#users-holders}

You do not need to anything to protect your funds entering The Merge.

_This bears repeating_: As a user or holder of ETH or any other digital asset on Ethereum, **you do not need to do anything with your funds or wallet before The Merge.**

Despite swapping out proof-of-work, the entire history of Ethereum since genesis remains intact and unaltered after the transition to proof-of-stake. Any funds being protected by your own wallet before The Merge will still be accessible in the same manner after The Merge. No action is required to "upgrade" on your part.

As we approach The Merge of Ethereum Mainnet, **you should be on high alert for scams trying to take advantage of users during this transition.** Do not send your ETH anywhere in attempt to "upgrade to ETH2." There is no "ETH2" token, and there is nothing more you need to do for your funds to remain safe.

[More on Ethereum security](/security/)

## Misconceptions about The Merge {#misconceptions}

<ExpandableCard
title="'The Merge will reduce gas fees.'"
contentPreview="❌ False. The Merge is a change of consensus mechanism, not an expansion of network capacity, and will not result in lower gas fees.">
Gas fees are a product of network demand relative to the capacity of the network. The Merge deprecates the use of proof-of-work, transitioning to proof-of-stake for consensus, but does not significantly change any parameters that directly influence network capacity or throughput.

With a [rollup-centric roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698), efforts are being focused on scaling user activity at layer 2, while enabling layer 1 Mainnet as a secure decentralized settlement layer optimized for rollup data storage to help make rollup transactions exponentially cheaper. The transition to proof-of-stake is a critical precursor to realizing this.
</ExpandableCard>

<ExpandableCard
title="'The Merge will make transactions faster.'"
contentPreview="Mostly false... Though some slight changes exist, transaction speed will mostly remain the same on layer 1">
The "speed" of a transaction can be measured a few ways, including time to be included in a block, and also time to "finalization."

Historically with proof-of-work (PoW) block times target ~13.3 seconds. On the Beacon Chain, slots occur every 12 seconds exactly, each of which is an opportunity for a validator to publish a block. Most slots have blocks, but not all (ie. a validator is offline). In most cases, blocks will be produced ~10% more frequently under PoS than under PoW, but this is a fairly insignificant change in the scaling game, and unlikely to be a noticeable difference for the end user.

PoS does introduce the concept of transaction "finality." Under PoW, the ability to reverse a block gets exponentially more difficult with every passing block that is mined on top of your transaction, but it never quite reaches zero. Under PoS, blocks are bundled into epochs (6.4 minute spans of time containing 32 chances for blocks) which are voted on by validators. After an epoch ends, it can be voted on as "justified," and then one more epoch later results in a "finalized" state. To undo these transactions would require obtaining and burning over 1/3 the total ETH staked.

Many dapps require a number of PoW block confirmations that take a period of time on par with how long PoS finality takes. Finality can offer additional security guarantees, but will not significantly speed up transactions.
</ExpandableCard>

<ExpandableCard
title="'You can withdraw staked ETH once The Merge occurs.'"
contentPreview="❌ False. Staking withdrawals are not yet enabled with The Merge.">
Staked ETH, staking rewards to date, and newly issued ETH immediately after The Merge will still be locked on the Beacon Chain without the ability to withdraw.

Withdrawal functionality is planned for the Shanghai upgrade to follow The Merge. This means that newly issued ETH, though accumulating on the Beacon Chain, will remain locked and illiquid for at least 6-12 months following The Merge.
</ExpandableCard>

<ExpandableCard
title="'When withdrawals are enabled, stakers will all exit at once.'"
contentPreview="❌ False. Validator exits are rate limited for security reasons.">

After the Shanghai update enabled withdrawals, all validators will be incentivized to withdraw their staking balance above 32 ETH, as these funds to not add to yield, and are otherwise locked. Depending on the APR (determined by total ETH staked), they may be incentivized to exit their validator(s) to reclaim their entire balance, or potentially to stake even more using their rewards to earn more yield.

An important caveat here, full validator exits are rate limited by the protocol, so only 6 validators may exit per epoch (every 6.4 minutes, so 1350/day, or only ~43,200 ETH/day, out of >10 million ETH staked). This rate limit adjusts depending on total ETH staked, and acts as a bottle neck to prevent a mass exodus of funds, or a potential attacker from committing a slashable offense and exiting all funds in the same epoch before the slashing penalty could be issued.

The APR is intentionally dynamic, allowing a market of stakers to find a balance of how much they're willing to be paid to help secure the network. When withdrawals are enabled, if the rate is too low, then validators will exit, at a rate limited by the protocol. Gradually this will raise the APR for everyone who remains, slowly attracting new or returning stakers yet again.
</ExpandableCard>

<ExpandableCard
title="'Validators will not receive any liquid ETH rewards until Shanghai when withdrawals are enabled.'"
contentPreview="❌ False. Fee tips/MEV will be credited to a Mainnet account controlled by the validator, available immediately.">
This may seem counterintuitive to the above note that withdrawals are not enabled til Shanghai, but validators WILL have immediate access to the fee rewards/MEV earned during block proposals.

ETH is issued by the protocol as a reward to validators for contributing to consensus. This ETH is accounted for on the Beacon Chain (consensus layer), where a validator has a unique address that holds its staked ETH and protocol rewards. This ETH is locked until Shanghai.

ETH on the execution layer, Mainnet as we know it, is accounted for separately from the consensus layer. When users execute transactions that involve Mainnet, ETH must be paid to cover the gas which includes a tip to the validator. This ETH is already on the execution layer, is NOT being issued by the protocol, and is available to the validator immediately (given a proper `eth1` address is provided to the client software).
</ExpandableCard>

<ExpandableCard
title="'Staking APR is expected to triple after The Merge. '"
contentPreview="❌ False. More up-to-date estimations predict closer to a 50% increase in APR post-merge, not a 200% increase.">
The APR for stakers is expected to increase post-merge. It is important to recognize where this increase in APR is coming from. This does not come from an increase in protocol ETH issuance (ETH issuance after The Merge is in fact decreasing by ~90%), but is instead a reallocation of transaction fees that will start going to validators instead of miners.

This will be a new separate source of revenue for validators when they propose blocks. As you can imagine, the amount of fees a validator receives is proportional to network activity at the time of their proposed block. The more fees being paid by users, the more fees validators will receive.

Looking at recent blockchain activity, approximately 10% of all gas fees being paid are currently going to miners in the form of a tip, while the rest is burnt. Outdated predictions estimated this percentage to be much higher, and was calculated when network usage was at all time highs. Extrapolating the 10% number to average recent network activity, it is estimated that the APR for staking will increase to ~7%, approximately 50% higher than the base issuance APR at time of writing.
</ExpandableCard>

<ExpandableCard
title="'Running a node requires staking 32 ETH.'"
contentPreview="❌ False. Anyone is free to sync their own self-verified copy of Ethereum, aka run a node. No ETH required—not before The Merge, not after The Merge, not ever.">
There are two general types of Ethereum nodes: nodes that can propose blocks, and nodes that don't.

Nodes that can propose blocks are only a _subset_ of the total nodes on the network. This category includes mining nodes under proof-of-work (PoW), and validator nodes under proof-of-stake (PoS). This category requires committing economic resources (such as GPU hash power in PoW, or staked ETH in PoS), in exchange for the ability to occasionally propose the next block and earn protocol rewards.

The _rest_ of the nodes on the network are not required to commit _any_ economic resources, beyond simply needing a consumer grade computer with 1-2 TB free storage and an internet connection. These nodes do not propose blocks, but still serve a _critical_ role in securing the network, by holding all block proposers accountable. These nodes listen for new blocks, and verify their validity on arrival according to the chosen rules of network consensus. If the block is valid, the node will continue propagating it through the network, but importantly, if the block is _invalid_ for whatever reason, the node software will simply disregard it as invalid.

Running a non-block-producing node is not only _possible_ for anyone under either consensus mechanism (PoW _or_ PoS), it is _strongly encouraged_ for users to run their own node if possible. This is _immensely valuable_ for the network, and also gives added benefits to any individual running their own software, such as improved privacy and censorship resistance.

The ability for anyone to run their own node is _absolutely essential_ to maintaining the decentralization of the Ethereum network.

[More on running your own node](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="'The Merge will result in downtime of the chain.'"
contentPreview="❌ False. The Merge upgrade is designed to transition to proof-of-stake with zero downtime.">
An immense amount of work has been put into making sure the transition to proof-of-stake does not disrupt the network or its users.

The Merge is akin to changing an engine on a rocketship mid-flight, and is designed to be performed without any need to pause anything during the switch. The Merge will be triggered by what is known as a TTD, or [terminal total difficulty](/glossary/#terminal-total-difficult), which is a cumulative measure of the total mining power that has gone into building the chain. When the time comes, and this criteria is met, blocks will go from being produced using proof-of-work in one block, to being produced by proof-of-stake in the next.

Ethereum does not go down.
</ExpandableCard>

## After The Merge {#after-the-merge}

This will signal the end of proof-of-work for Ethereum and start the era of a more sustainable, eco-friendly Ethereum. This will also set the stage for further scalability upgrades not possible under proof-of-work, bringing Ethereum one step closer to achieving the full scale, security and sustainability outlined in its [Ethereum vision](/upgrades/vision/).

## Relationship between upgrades {#relationship-between-upgrades}

The Ethereum upgrades are all somewhat interrelated. So let’s recap how The Merge relates to the other upgrades.

### The Merge and the Beacon Chain {#merge-and-beacon-chain}

The Merge represents the formal adoption of the Beacon Chain as the new consensus layer to the current Mainnet execution layer. Once The Merge happens, validators will be assigned to secure Ethereum Mainnet and mining [proof-of-work](/developers/docs/consensus-mechanisms/pow/) will no longer be a valid means of block production.

Blocks will instead be proposed by validating nodes that have ether staked for the right to participate in consensus. These upgrades set the stage for future scalability upgrades including data sharding.

<ButtonLink to="/upgrades/beacon-chain/">
  The Beacon Chain
</ButtonLink>

### The Merge and the Shanghai upgrade {#merge-and-post-merge-cleanup}

In order to simplify and maximize focus on a successful transition to proof-of-stake, The Merge upgrade will not include certain anticipated features such as the ability to withdraw staked ETH. The Shanghai upgrade is planned to follow The Merge, in which the ability to withdraw is slotted as a top priority.

Stay up-to-date with the [Shanghai Planning issue on GitHub](https://github.com/ethereum/pm/issues/450), or the [EF Research and Development Blog](https://blog.ethereum.org/category/research-and-development/). For those curious, learn more about [What Happens After The Merge](https://youtu.be/7ggwLccuN5s?t=101), presented by Vitalik at the April 2021 ETHGlobal event.

### The Merge and data sharding {#merge-and-data-sharding}

Originally, the plan was to work on shard chains before The Merge—to address scalability. However, with the boom of [layer 2 scaling solutions](/layer-2/), the priority has shifted to swapping proof-of-work to proof-of-stake via The Merge.

Plans for sharding are rapidly evolving, but given the rise and success of layer 2 technologies to scale transaction execution, sharding plans have shifted to finding the most optimal way to distribute the burden of storing compressed calldata from rollup contracts, allowing for exponential growth in network capacity. This would not be possible without first transitioning to proof-of-stake.

<ButtonLink to="/upgrades/shard-chains/">
  Data sharding
</ButtonLink>

## Read more {#read-more}

<MergeArticleList />
