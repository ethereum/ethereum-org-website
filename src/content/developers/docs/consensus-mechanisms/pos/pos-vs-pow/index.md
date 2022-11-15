---
title: Proof-of-stake vs proof-of-work
description: A comparison between Ethereum's proof-of-stake and proof-of-work based consensus mechanism
lang: en
---

Ethereum is a proof-of-stake blockchain. This has not always been the case. When Ethereum launched, proof-of-stake still needed a lot of research and development before it could be trusted to secure Ethereum. Proof-of-work, however, was a simpler mechanism that had already been proven by Bitcoin, meaning it could be implemented right away to get the network off the ground. It took a further eight years to develop proof-of-stake to the point where it could be implemented.

This page aims to explain the rationale behind Ethereum's switch to proof-of-stake from proof-of-work and explain the trade-offs.

## Security

Overall, proof-of-stake is thought to be more secure than proof-of-work. However, it has only recently been implemented for the real Ethereum Mainnet and is not as "[Lindy](https://en.wikipedia.org/wiki/Lindy_effect)" as proof-of-work. Here are the reasons why proof-of-stake's security model is thought to be more robust than proof-of-work's:

### Cost to attack

In proof-of-stake, validators are required to escrow ("stake") at least 32 ETH in a smart contract. The staked ETH can then be destroyed to punish validators that misbehave. In order to come to consensus, at least 66% of the total staked ether has to vote in favour of a particular set of blocks.

Blocks voted for by >=66% of the stake become "finalized" meaning they can't be removed or reorganized. Attacking the network requires a person or set of people to vote on certain blocks at the head of the chain that benefits them somehow with enough stake to dominate consensus. This can mean accumulating a large amount of ether and voting with it directly, or tricking honest validators to vote in a particular way.

The cost to attack Ethereum comes from the stake that an attacker has to accumulate to dominate consensus. The lowest cost of attack is >33% of the total stake. An attacker holding >33%of the total stake can cause a finality delay simply by going offline. This is a fairly minor problem for the network as there is a mechanism known as the "inactivity leak" that leask stakje away from offline validators until the online majority represent 66% of the stake and can finalize the chain again. It is also theoretically possible for an attacker to cause double finality with a little over 33% of the total stake by creating two blocks instead of one when they are asked to be a block producer, and then double vote with all of their validators. Each fork only requires 50% of the remaining honest validators to see each block first, so they have a chance to finalize both forks.

With >33% of the total stake an attacker has a chance to have a minor (finality delay) or more severe (double finality) effect on the Ethereum network. With more than 14,000,000 ETH staked on the network and a representative price of $1000/ETH, the minimum cost to mount these attacks is `1000 x 14,000,000 x 0.33 = $4,620,000,000`.

In the event that an attacker was able to cause double-finality, the Ethereum community would have to make a decision to follow one or other fork, in which case the attackers validators would necessarily be slashed on the other. This means they would have destroyed their > $4.6 billion.

Other attacks, such as 51% attacks or finality reversion with 66% of the total stake require substantially more ETH and are therefore much more costly to the attacker.

Once the attacker has been slashed, they are ejected from the network. In order to attack again, they would have to accumulate >33% of the stake again, and burn it again. Each attempt to attack the network would cost >$4.6 billion (at $1000/ETH).

Compare this to proof-of-work. The cost of launching an attack on proof-of-work Ethereum was the cost of consistently owning >50% of the total network hashrate. This amounted to the hardware and running costs of sufficient computing power to consistently outcompete other miners to compute proof-of-work solutions. Ethereum was mostly mined using GPUs rather than ASICs, which kept the cost down a lot (although had Ethereum stayed on proof-of-work ASIC mining may well have become more popular). An adversary would have to purchase a lot of hardware to attack the network and pay for the electricity to run it (the total would probably be less than the cost required to accumulate 33% of the total stake) but if their attack was detected and the chain hard-forked to remove their changes, they could keep using the same hardware to attack again, and again. This is not the case for proof-of-stake - slashing ETH is like destroying the proof-of-work attacker's hardware.

### Complexity

Proof-of-stake is much more complex than proof-of-work. This could be a point in favour of proof-of-work as it is harder to accidentally introduce bugs or unintended effects into simpler protocols. However, on the other hand, the complexity has been tamed by years of research and development, simulations and testnet implementations. The proof-of-stake protocol has been independently implemented by five separate teams (on each of execution and consensus layers) in five languages, providing resilience against client bugs.

### Types of attack

Proof-of-stake is a more complex protocol than proof-of-work, which means there are more potential attack vectors to handle. Having one specific validator pre-selected to propose a block in each slot creates the potential for denial-of-service where that specific validator is knocked out by overwhelming them with network traffic. There are also ways that attackers can carefully time the release of their blocks or attestations so that they are received by a certain proportion of the honest network, influencing thrm to vote in certain ways. This can lead to two classes of attack - bouncing or balancing. Finally, an attacker can simply accumulate sufficient ETH to stake and dominate the consensus mechanism. Each of these attack vectors have associated defenses - read more on the [attack and defense page](/developers/docs/consensus-mechanisms/pos/attack-and-defense) - but they do not exist to be defended at all under proof-of-work.

### Decentralization

Proof-of-stake is overall more decentralized than proof-of-work because mining hardware arms-races tend to price out individuals and small organizations. While anyone can start mining with modest hardware, their likelihood of receiving a reward quickly becomes vanishingly small compared to institutional mining operations. With proof-of-stake, the cost of staking, and the percentage return on that stake is the same for everyone.

On the other hand, the invention of liquid staking derivatives have led to recentralization of stake under a few large staking providers. This is problematic and it needs to be disrupted as soon as possible, but it is also complicated, because those organizations simply act as an umbrella containing many different independent node operators.

## Sustainability

Proof-of-stake is a carbon-cheap way to secure the blockchain. Under proof-of-work ...
