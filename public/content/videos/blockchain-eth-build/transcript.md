---
title: "Blockchain — ETH.BUILD"
description: "An interactive visual demonstration of how blockchain mining works using the ETH.BUILD educational tool. See how blocks are chained together, how proof of work secures the chain, and what happens when someone tries to tamper with data."
---

A tutorial by **Austin Griffith** demonstrating how blockchain mining works using the ETH.BUILD visual programming tool — covering proof of work, block chaining, mining difficulty, consensus, block rewards, and chain immutability.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) published by Austin Griffith. It has been lightly edited for readability.*

#### The problem of coordination (0:00)

In the curriculum so far, we've jammed through key pairs, hashes, and ledgers. What we found is that if we want to transact value back and forth on a distributed network — not a centralized one — we end up having problems of coordination. We have this issue where we can't find consensus between disparate parties because they all receive different transactions at different times. There are a lot of different ways to solve this, but none of them were great until proof of work came along.

We covered the Byzantine generals as a side quest, and what we learned there is that the generals needed to prove they had an army when they sent messages over an insecure network. Then the receiving party could tell that person was indeed a general with an army that was going to attack, and they could coordinate.

#### Blocks and the nonce (1:04)

With this ledger, we're pumping in transactions from the network. Rather than having every individual user prove their work, we're going to abstract the proof of work into a block of transactions and let a miner work on that.

We bring in a block that holds transactions — whatever is coming across the network, we load into this block. If we look at the structure of this block, it also has a nonce. That nonce lets us tweak the hash. If we take this entire block, stringify it, and hash it, we get a hash. As transactions change, that hash changes, but also as we change the nonce, the hash changes too.

We're doing some work here — we've got a random set of transactions, and we're changing the nonce until the hash has a leading zero. If you watched the side quest about the Byzantine generals, we picked this leading zero as an arbitrary amount of work to prove.

#### Proof of work in action (3:00)

If we take a mined block, pull out the hash, and drop it into a hash function, we can prove it has a leading zero — we can prove this block has been worked on.

The hash function costs CPU, which is a limited resource. We're putting out all our CPU power trying to find a hash with leading zeros. Once we do, we have a valid block — the block is basically frozen. Whatever transactions were in there at the time are in this block now, and everyone respects it, and we can move on to the next block.

#### Chaining blocks together (3:56)

Here's the trick: we take the old block and wire it up to the new block. If we look at the structure, the new block has no transactions and an empty nonce, but it has a parent with transactions. The previous block is going to be part of the next block, so we'll have a whole chain.

We throw in the latest transactions from the pool and work on finding a nonce. Block number two is mined — we needed a nonce of ten to make these transactions valid.

#### Mining difficulty (5:02)

This is too easy — we're able to find a valid block very quickly, and we want it to be harder. I'm going to turn the difficulty up to two. We wire up block three, bring in the latest transactions, and have a counter jam away. Now we're mining — using our limited CPU power to arbitrarily throw random hashes at this until we find a hash with two leading zeros because the difficulty has been turned up. That's going to take a bit.

#### The miner (6:46)

Let's look at what a miner is. In the Byzantine generals problem, the general who wanted to "attack at dawn" needed soldiers. What's going on inside each soldier is exactly what we're doing here with our miner — we're taking a message and a nonce and throwing it into a hash function as fast as we can, trying to get those leading zeros. The leading zeros are some arbitrary thing we've all agreed on — this is enough work to prove that you are a soldier, or you can wage war.

The miner is going to do that same thing for our blocks — it takes the transactions coming in from the pool, pumps them into the block, and just works on it until it finds a valid hash.

#### Multiple miners and consensus (8:22)

What happens if two miners both find a block at the same time? Now we have two valid paths. In one version, Mallory has the block reward of ten tokens, and in the other version, Mike has ten tokens. Each player is incentivized to keep going down their own chain.

The rest of the network needs to find a consensus, and basically it comes down to who else on the network picks whose side. The rule is: follow the longest valid chain. In Ethereum, uncle blocks — valid blocks that didn't make it into the longest chain — also get paid because they're still helping to secure the network.

We had this problem of coordination and consensus, and we solved it by putting this arbitrary amount of work that has to be involved to make transactions valid.

#### Block rewards and incentives (16:11)

These miners are spending money to buy rigs and to secure the network with all their hash power. To incentivize them, we give them a cut called the block reward of each block they mine. There's also going to be a small amount that each person pays per transaction — but we'll get to gas in a later episode. The key point is there's an incentive not just to mine a block, but to mine a full block with lots of transactions.

#### Chain immutability (19:51)

As blocks are mined, they become more and more secure. If we go back to block three and change any little detail — say we change a transaction from Frank to Eve — look at that: every block after it becomes invalid. The entire chain falls apart. If you were to broadcast that over the network, people would reject it immediately.

You can't change anything once a block is mined unless you go back and re-mine everything as it changes. You'd basically have to have enough computing power to catch up to the longest chain. The deeper a block is, the harder it is to come back from. If a transaction is multiple blocks deep, you can be pretty secure knowing that money is there for sure — that's what we call finality.

#### Summary (22:00)

Instead of having a ledger and this consensus issue, we use proof of work to jam on a hash to validate a block — and "valid" means an arbitrary number of leading zeros. We're still going to run into issues as we build the chain of blocks, where mined blocks can actually arrive at different places at different times. So we have a further consensus algorithm that says: follow the longest chain that's valid and that follows the rule set you wish to participate in.
