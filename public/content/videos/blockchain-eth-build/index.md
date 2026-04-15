---
title: "Blockchain — ETH.BUILD"
description: "A demonstration of how blockchain mining works, including how blocks are chained together, how proof of work secures blockchains, and what happens when someone tries to tamper with data."
lang: en
youtubeId: "zcX7OJ-L8XQ"
uploadDate: 2021-01-14
duration: "0:22:44"
educationLevel: beginner
topic:
  - "mining"
  - "blockchain"
format: tutorial
author: Austin Griffith
breadcrumb: "Blockchain (ETH.BUILD)"
---

A tutorial by **Austin Griffith** demonstrating how blockchain mining works using the ETH.BUILD visual programming tool. Austin covers proof of work consensus, block chaining, mining difficulty, block rewards, and chain immutability.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=zcX7OJ-L8XQ) published by Austin Griffith. It has been lightly edited for readability.*

#### The problem of coordination (0:00) {#the-problem-of-coordination-000}

Good morning, happy Bowtie Friday! This ETH.BUILD is focusing on blockchain — really cool thing. We're in this clown boat, our Bitcoin bowtie for it. Here we go.

So in the curriculum so far, we've jammed through key pairs, hashes, and ledgers. What we found is that if we want to transact value back and forth on a distributed network — not a centralized one — we end up having problems of coordination. We end up having this issue where we can't find consensus between disparate parties because they all receive different transactions at different times. There are a lot of different ways to solve this, but none of them were great until proof of work came along.

We covered the Byzantine generals as a side quest, and what we learned there is that the generals needed to prove they had an army when they sent messages over an insecure network. Then the receiving party could tell that person was indeed a general with an army that was going to attack, and they could coordinate.

#### Blocks and the nonce (1:04) {#blocks-and-the-nonce-104}

So with this ledger, we're pumping in transactions from the network. Rather than having every individual user prove their work, we're going to abstract the proof of work into a block of transactions and let a miner work on that.

We bring in a block that holds transactions — whatever is coming across the network, we load into this block. If we look at the structure of this block, it also has a nonce. That nonce lets us tweak the hash. If we take this entire block, stringify it, and hash it, we get a hash. As transactions change, that hash changes, but also as we change the nonce, the hash changes too.

We're doing some work here — we've got a random set of transactions, and we're changing the nonce until the hash has a leading zero. If you watched the side quest about the Byzantine generals, we picked this leading zero as an arbitrary amount of work to prove. So the nonce just goes through every number — one, two, three, four — and when we get a leading zero, we say: that's a valid block.

#### Proof of work in action (3:00) {#proof-of-work-in-action-300}

If we take a mined block, pull out the hash, and drop it into a hash function, we can prove it has a leading zero — we can prove this block has been worked on.

The hash function costs CPU, which is a limited resource. We're putting out all our CPU power trying to find a hash with leading zeros. Once we do, we have a valid block — the block is basically frozen. Whatever transactions were in there at the time are in this block now, and everyone respects it, and we can move on to the next block.

#### Chaining blocks together (3:56) {#chaining-blocks-together-356}

Here's the trick: we take the old block and wire it up to the new block. If we look at the structure, the new block has no transactions and an empty nonce, but it has a parent with transactions. The previous block is going to be part of the next block, so we'll have a whole chain.

We throw in the latest transactions from the pool and work on finding a nonce. Block number two is mined — we needed a nonce of ten to make these transactions valid. Then we do the same thing: wire up the old block, bring in the new one, throw in whatever the latest transactions are, and work on it again. After enough tries we found a nonce for block three. Block four — same process, and we keep going forward.

#### Mining difficulty (5:02) {#mining-difficulty-502}

This is too easy — we're able to find a valid block very quickly, and we want it to be harder. I'm going to turn the difficulty up to two. We wire up block five, bring in the latest transactions, and have a counter jam away. Now we're mining — using our limited CPU power to arbitrarily throw random hashes at this until we find a hash with two leading zeros, because the difficulty has been turned up. That's going to take a bit.

Now we have this blockchain of five blocks. Those blocks hold transactions and each one references the previous one. Each block took some arbitrary amount of work to produce, and the amount of work is controlled by the difficulty.

#### The miner (6:46) {#the-miner-646}

Let's look at what a miner is. In the Byzantine generals problem, the general who wanted to "attack at dawn" needed soldiers. What's going on inside each soldier is exactly what we're doing here with our miner — we're taking a message and a nonce and throwing it into a hash function as fast as we can, trying to get those leading zeros. The leading zeros are some arbitrary thing we've all agreed on — this is enough work to prove that you are a soldier, or that you can wage war.

Let me bring in a miner and do this a little faster. The miner is going to do that same thing for our blocks — it takes the transactions coming in from the pool, pumps them into the block, and just works on it until it finds a valid hash.

The miner is a little bit more efficient. He's more focused on mining. He's randomly throwing hashes — that's exactly what our miner was doing before, just abstracted away. We can see it kicking away in the background, just jamming away on hashes. It found it — block six is mined.

#### Double spends and network propagation (10:00) {#double-spends-and-network-propagation-1000}

Now we talked about this issue of double spending, and even this issue of network propagation. When we have a ledger and a distributed network and someone sends a transaction, it gets to different people at different times. Therefore, we could have two miners out there on the network that both mine a block at the exact same time, and they have different transactions in them.

Each one is valid at the time — they both did the proof of work, they both have leading zeros. But they can't both be canonical. They can't both be the truth. So we need a way for the network to come to consensus about which one is the real chain.

#### Multiple miners and consensus (12:27) {#multiple-miners-and-consensus-1227}

Let me grab this block and move it over here. What I want is two different miners working on the same problem, kind of listening to the same transaction pool and coming up with blocks independently. We've got two miners: Mallory and Mike. I've turned the difficulty to three, and both are working on finding a hash with three leading zeros.

So Mallory found a block first! Great. Now what happens — because we're on a distributed network, Mike might not even know about Mallory's block yet. He might still be working on his own version. And now Mike found one too. So we have two valid paths.

If you're one peer on the network and you see Mallory's block first, you think that's the main block. Then later Mike's block arrives. You're keeping both of them around in case one of them becomes the longest chain. And the rule is: follow the longest valid chain.

#### Coinbase and block rewards (15:33) {#coinbase-and-block-rewards-1533}

When a miner mines a block, we say: here are all the transactions we want, here's the nonce, here's the parent — but we're also going to say here's the person that mined that block. It's called a coinbase — I think there's a company called that now, but it's different. We're just going to call it "miner." So our blocks are now requiring a miner field.

So Mike just found the block, and Mike is also going to get a value of ten out of this. We need to incentivize the miners to do all this work, right? They're spending money to buy these rigs to basically make the network secure. These miners are spending money to secure the network with all of their hash power — with all the miners combined, tens of thousands maybe. They're paying good money to build rigs that work on these hashes, and to incentivize them we give them a cut called the block reward of each block they mine.

#### Block rewards and incentives (16:52) {#block-rewards-and-incentives-1652}

So in this version of the block, Mallory has ten dollars, but in this version Mike has ten dollars. Each of these two players are incentivized to keep going down their own chain, and the rest of the network needs to find a consensus. Basically it comes down to who has the longest valid chain.

Mike is going to set up his block as the parent and start working on the next block. Mallory is going to do the same thing. And it comes down to who else on the network picks whose side. Since we don't want to punish people with bad networks, I'm pretty sure that in Ethereum we pay uncle blocks — valid blocks that didn't make it into the longest chain — because they're still helping to secure the network.

We had this problem of coordination and consensus, and we solved it by putting this arbitrary amount of work that has to be involved to make transactions valid. Mallory did all this work hashing and hashing and hashing to find three leading zeros of a hash of all these transactions and the previous block.

#### Querying the blockchain (18:30) {#querying-the-blockchain-1830}

We can talk to whatever the longest chain is. Mike hasn't gone to seven yet, so we can see the height is still six over here. And we can do things like query for balances for people. So we hit balance — what do we get? Five twenty-four. So Heidi has been sitting on 524 or whatever the native token is for this chain. We can see her nonce, we can do everything that we could do with the ledger, but now we're stacking blocks and those blocks are holding transactions.

We've abstracted away the work from the users, who are just sending money, to miners, and we've incentivized them by giving them this block reward. There's also going to be a small amount that each person pays per transaction, but we'll get to that in a later episode. We don't want to talk about gas right now, but it helps to know that there's an incentive not just to mine a block, but to mine a full block with lots of transactions. But that's a smaller incentive — we'll get to that eventually.

#### Chain immutability (19:51) {#chain-immutability-1951}

As blocks are mined, they become more and more secure. Let me show you what I mean. So Mike mined a block, Mallory was over here doing a demonstration and wasn't able to mine a block. So now Mike's chain is going to be the longest, and it'll go across the network. Everyone will see it and say: okay, this chain has seven blocks, they're all valid — this is the one we're going to follow. You can get hard forks, contentious forks, where the rules we're playing by are going to change and different groups of humans want to follow different chains. Cool stuff.

Okay finally, if we go back to block three and change something — change any little detail — I'm going to get in here. There's some transaction to Frank. Let's say instead of Frank we change it to Eve. Now watch what happens when I hit okay: look at that. I changed a tiny little piece of block three and all of a sudden the entire chain falls apart. It's no longer valid. If I were to broadcast that over the network, people would laugh me out of the house.

You can't change anything once a block is mined unless you go back and re-mine the stuff as it changes. I would basically have to hook the miner back up here and try to have enough power to catch up to Mike all the way out here with seven blocks. It would be very, very hard. The deeper a block is, the harder it is to come back from. The fact that this block three here where Carlos sent 84 to Bob — Bob can be pretty secure knowing that, multiple blocks deep, that money is there for sure. There's no way there's going to be some contentious fork here — I'm solid. That's what we call finality.

#### Summary (22:00) {#summary-2200}

Instead of having a ledger and this consensus issue, we use proof of work to jam on a hash to validate a block — and "valid" means an arbitrary number of leading zeros. We're still going to run into issues as we build the chain of blocks, where mined blocks can actually arrive at different places at different times. So we have a further consensus algorithm that says: follow the longest chain that's valid and that follows the rule set you wish to participate in.

All right, happy Bowtie Friday! That was blockchain on ETH.BUILD. I'll save this and put it up there so you can just hit "load" and have a chain to play with. Happy Friday!
