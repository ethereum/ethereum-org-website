---
title: Frequently Asked Questions
description: Frequently asked questions on proof-of-stake Ethereum.
lang: en
---

## What is proof-of-stake {#what-is-proof-of-stake}

Proof-of-stake is a class of algorithm that can provide security to blockchains by ensuring that assets of value are lost by attackers who act dishonestly. Proof-of-stake systems require a set of validators to make some asset available that can be destroyed if the validator engages in some provably dishonest behaviour. Ethereum uses a proof-of-stake mechanism to secure the blockchain.

## How does proof-of-stake compare to proof-of-work? {#comparison-to-proof-of-work}

Both proof-of-work and proof-of-stake are mechanisms that economically disincentivize malicious actors from spamming or defrauding the network. In both cases, nodes that actively participate in consensus put some asset "into the network" that they will lose if they misbehave.

In proof-of-work this asset is energy. The node, known as a miner, runs an algorithm that aims to compute a value with a specific format faster than any other node. If they manage, they have the right to propose a block to the chain. In order to change the history of the chain, or dominate the block proposal, a miner would have to have so much computing power that they always win the race. The energy required to "mine" using proof-of-work is a real world asset that miners pay for.

Proof-of-stake requires nodes, known as validators, to explicitly submit a crypto asset to a smart contract. If they misbehave then this crypto can be destroyed. This is a direct "staking" of assets directly into the chain, rather indirectly via energy expenditure.

Proof-of-work is much more energy-hungry because electricity is burned in the mining process. Proof-of-stake, on the other hand, requires only a very small amount of energy - Ethereum validators cna even run on a low-powered device such as Raspberry Pi. Ethereum's proof-of-stake mechanism is thought to be more secure than proof-of-work because the cost to attack is greater, and the consequences to an attacker are more severe.

Proof-of-work versus proof-of-stake has long been a hotly debated topic. A great summary of the arguments is provided in this [blog post](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) and this debate between Justin Drake and Lyn Alden:

<iframe width="1190" height="669" src="https://www.youtube.com/embed/1m12zgJ42dI" title="The PoW vs. PoS Debate | Lyn Alden & Justin Drake" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Is proof-of-stake energy efficient?

Yes. Nodes on a proof-of-stake network do not use much energy at all. A recent third-party study concluded that the entire proof-of-stake Ethereum network consumes around 0.0026 TWh/yr - about 13,000x less than is consumed by gaming in the US alone. Read more about Ethereum's [energy consumption](https://ethereum.org/en/energy-consumption/).

## Is proof-of-stake secure?

Ethereum's proof-of-stake is thought to be very secure, as well as being sustainable and scalable. The mechanism was researched and developed over eight years and tested rigorously before being deployed. The security guarantees are different from proof-of-work blockchains. In proof-of-stake malicious validators can be actively punished ("slashed") and ejected from the validator set, costing a substantial amount of ETH. Under proof-of-work, an attacker can keep repeating their attack while they have sufficient hashpower. It is also more costly to mount equivalent attacks on proof-of-stake Ethereum than it was under proof-of-work. To affect the liveness of the chain, at least 33% of the total staked ether on the network is required (except int he cases of very sophisticated attacks that have extremely low likelihood of success). To control the contents of future blocks, at least 51% of the total staked ETH is required, and to rewrite history >66% of the total stake is needed. These assets would necessarily be destroyed by the protocol in the 33 and 51% attack scenarios, and by social consensus in the 66% attack scenario.

Read more about [defending Ethereum proof-of-stake from attackers](src/content/developers/docs/consensus-mechanisms/pos/attack-and-defense)
Read more about [proof-of-stake design](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Does proof-of-stake make Ethereum cheaper?

No. The cost to send a transaction is determined by a dynamic fee market that increases when there is more network demand. This is not directly influenced by the consensus mechanism.

Read more about [gas](src/content/developers/docs/gas).

## What are nodes, clients and validators?https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51

Nodes are computers connected to the Ethereum network. Clients are the software they run that turns the computer into a node. There are two types of client: execution clients are consensus clients. Both are needed in order to create a node. A validator is an optional add-on to a consensus client that enables the node to participate in proof-of-stake consensus. This means creating and proposing blocks when they are selected, and attest to blocks they hear about on the network. In oorder to run a validator, the node operator must deposit 32 ETH into the deposit contract.

Read more on [nodes and clients](src/content/developers/docs/nodes-and-clients)
Read more about [staking](src/content/staking)

## Is proof-of-stake a new idea?

No. The basic idea of proof-of-stake was proposed on BitcoinTalk forum as an upgrade to Bitcoin. It was eleven years before it was ready to implement on Ethereum Mainnet. Some other chains implemented proof-of-stake earlier than Ethereum, but not Ethereum's specific mechanism (known as Gasper).

[Read the BitcoinTalk blogpost](https://bitcointalk.org/index.php?topic=27787.0)
Read more on [Gasper](src/content/developers/docs/consensus-mechanisms/pos/gasper)

## What is special about Ethereum's proof-of-stake?

Ethereum's proof-of-stake mechanism is unique in its design. It was not the first proof-of-stake mechanism to be designed and implemented, but it is thought to be the most robust. The proof-of-stake mechanism is known as "Casper". Casper defines how validators are unpredictably selected to propose blocks, how and when attestations are made, how attestations are counted, the rewards and penalties given to validators, slashing conditions, failsafe mechanisms such as the inactivity leak, and the conditions for "finality". Finality is the condition that for a block to be considered a permanent part of the canonical chain it must have been voted for by at least 66% of the total staked ETH on the network. Casper was developed specifically for Ethereum, and Ethereum is the first and only blockchain to have implemented it.

In addition to Casper, Ethereum's proof-of-stake uses a fork choice algorithm called LMD-GHOST. This is required in case a condition arises where two blocks exist for the same slot. This creates two forks of the blockchain. LMD-GHOST picks the one that have the greatest "weight" of attestations. The weight is the number of attestations weighted by the effective balance of the validators. LMD-GHOST is unique to Ethereum.

The combination of Casper and LMD_GHOST is known as Gasper.

Read more about [Gasper](src/content/developers/docs/consensus-mechanisms/pos/gasper)

## What is slashing?

Slashing is the term given to the destruction of some of a validator's stake and the ejection of the validator from the network. The amount of ETH lost in a slashing scales with the number of validators being slashed - this means colluding validators get punished more severely than individuals.

Read more about [slashing](src/content/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Why do validators need 32 ETH?

Validators have to stake ETH so that they have something to lose if they misbehave. The reason why this number is 32 ETH specifically is to enable nodes to run on modest hardware. If the minimum ETH per validator were lower, then the number of validators and therefore the number of messages that must be processed in each slot would increase, meaning more powerful hardware would be required to run a node.

## How are validators selected?

A single validator is pseudo-randomly chosen to propose a block in each slot using an algorithm called RANDAO that mixes a hash from the block proposer with a seed that gets updated every block. This value is used to select a specific validator from the total validator set. The validator selection is fixed four epochs in advance.

Read more about [validator selection](src/content/developers/docs/consensus-mechanisms/pos/block_proposal)

## What is stake grinding?

Stake grinding is a category of attack on proof-of-stake networks where the attacker tries to bias the validator selection algorithm in favour of their own validators. Stake grinding attacks on RANDAO require abot half the total staked ETH.

Read more about [stake grinding](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## What is social slashing?

Social slashing is the ability for the community to coordinate a fork of the blockchain in response to an attack. This enables the community to recover from an attacker finalizing a dishonest chain. This could also be used to address censorship attacks.

Read more about [social slashing](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
Read about social slashing on [Vitalik's blog](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Will I get slashed?

As a validator, it is very difficult to get slashed unless you deliberately engage in malicious behaviour. Slashing is only implemented in very specific scenarios where validators propose multiple blocks for the same slot or contradict themselves with their attestations - these are very unlikely to arise accidentally.

Read more about [slashing conditions](https://eth2book.info/altair/part2/incentives/slashing)

## What is the "nothing at stake" problem?

The nothing at stake problem is a conceptual issue with some proof-of-stake mechanisms where there are only rewards and no penalties. In this case, a rational validator is equally happy to attest to any, or even multiple, forks of the blockchain as this just increases the rewards they can accrue. Ethereum gets around this using finality conditions and slashing - this ensures that there is one canonical chain and validators are materially punished for voting against it.

Read more about the [nothing at stake problem](https://vitalik.ca/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## What is a fork choice algorithm?

A fork choice algorithm implements some rules that determine which chain is the canoncial one. Under optimal conditions there is no need for a fork choice rule because there is only one block proposer per slot, and therefore only one block to choose from. Occasionally, though, there are multiple blocks for the same slot or late-arriving information leads to a multiple options for how blocks near the head of the chain are organized. In these cases, some rules must be implemented identically by all clients to make sure they all pick the correct sequence of blocks. These rules are encoded in the fork-choice algorithm. Ethereum's fork-choice algorithm is called LMD-GHOST. It picks the fork with the greatest weight of attestations, meaning the one that most staked ETH has voted for.

Read more about [LMD-GHOST](src/content/developers/docs/consensus-mechanisms/pos/gasper/index.md#fork-choice)

## What is finality in proof-of-stake?

Finality in proof-of-stake is the guarantee that a given block is a permanent part of the canonical chain and cannot be reverted unless there is a consensus failure in which an attacker burns 33% of the total staked ether. This is "crypto-economic" finality, as opposed to "probabilistic finality" which is relevant to proof-of-work blockchains. In probabilistic finality there are no explicit finalized/non-finalized states for blocks - it simply becomes less and less likely that a block could be removed from the chain as it gets older, and users determine for themselves when they are sufficiently confident that a block is "safe". With crypto-economic finality, pairs of checkpoint blocks have to be voted for by 66% of the staked ether - if this condition is satisfied then blocks between those checkpoints are explicitly "finalized".

Read more on [finality](https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/#finality)

## What is "weak subjectivity"?

Weak subjectivity is a feature of proof-of-stake networks where social information is used to confirm the current state of the blockchain. New nodes or nodes rejoining the network after being offline for a long time can be given a recent state so that the node can see immediately whether they are on the correct chain. These states are known as "weak subjectivity checkpoints" and they can be obtained from other node operators out-of-band, or from block explorers, or from several public endpoints.

Read more about [weak subjectivity](src/content/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Is proof-of-stake censorship resistant?

Censorship resistance is currently hard to prove but, unlike proof-of-work, proof-of-stake offers the option to coordinate slashings to punish censoring validators. There are upcoming changes to the protocol that separate block builders from block proposers and implementing lists of transactions that must be included in each block. These changes help to prevent validators censoring transactions.

Read more about [proposer-builder separation](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Can Ethereum's proof-of-stake system be 51% attacked?

Yes. Proof-of-stake is vulnerable to 51% attacks just like proof-of-work. Instead of the attack requiring 51% of the network's hashpower, the attack requires 51% of the total staked ETH. An attacker that accumulates 51% of the total stake gets to control the fork-choice algorithm. This enables the attacker to censor certain transactions, do short-range reorgs and extract MEV by reordering blocks in their favor.

Read more on [attacks on proof-of-stake](src/content/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## What is social coordination and why is it needed?

Social coordination is a last line of defense for Ethereum that would allow an honest chain to be recovered from an attack that finalized dishonest blocks. In this case, the Ethereum community would have to coordinate "out-of-band" and agree to use an honest minority fork, slashing the attacker's validators in the process. This would require apps and exchanges to recognize the honest fork too.

Read more on [social coordination](src/content/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Do the rich get richer in proof-of-stake?

Yes, in the sense that the more ETH someone has to stake, the more validators they can run and therefore the more rewards they can accrue. The rewards scale linearly with the amount of staked ETH. Proof-of-work enriches the rich more than proof-of-stake does because richer miners that buy hardware at scale benefit from economies of scale, meaning the relationship between wealth and reward is non-linear.

## Is proof-of-stake more centralized than proof-of-work?

No, proof-of-work tends towards centralization because mining costs increase and price out individuals, then price out small companies, and so on. The problem that has arisen with proof-of-stake is the influence of liquid staking derivatives (LSDs). These are tokens that represent ETH staked by some provider that can be swapped on secondary markets without the actual ETH being unstaked. This allows users to stake with less than 32 ETH, but also creates a centralization risk where a few big organizations can end up controlling a lot of the stake. This is why home staking is the gold standard for Ethereum.

Read more about [stake centralization in LSDs](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Why can I only stake ETH?

ETH is Ethereum's native currency. It is important to have a single currency that all stakers are denominated in, both for accounting effective balances for weighting votes and for security - ETH itself is a fundamental component of Ethereum rather than a smart contract. Incoroporatign more currencies would greatly increase complexity and decrease security.

## Is Ethereum the only proof-of-stake blockchain?

No, there are several proof-of-stake blockchains. None of them are identical to Ethereum - Ethereum's proof-of-stake mechanism is unique.

## What is The Merge?

The Merge was the moment when Ethereum switched off its proof-of-work based consensus mechanism and switched on its proof-of-stake based consensus mechanism. The Merge happened on September 15, 2022.

Read more about [The Merge](src/content/upgrades/merge)

## What are liveness and safety?

Liveness and safety are the two fundamental security concerns for a blockchain. Liveness is the availability of a finalizing chain. If the chain stops finalizing or users are not able to access it easily, those are liveness failures. Extremely high cost of access could also be considered a liveness failure. Safety refers to how difficult it is to attack the chain - i.e. finalize conflicting checkpoints.

Read more in the [Casper paper](https://arxiv.org/pdf/1710.09437.pdf)
