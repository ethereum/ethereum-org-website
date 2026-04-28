---
title: "Blockchain 101: a visual demo"
description: "A demonstration of how blockchain technology works, covering hashing, blocks, chains, distributed ledgers, and tokens to make blockchain concepts tangible and intuitive."
lang: en
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "blockchain"
  - "cryptography"
format: presentation
author: Anders Brownworth
breadcrumb: "Blockchain 101"
---

Anders Brownworth's visual demonstration of how blockchain technology works, including a walkthrough covering SHA-256 hashing, blocks, mining, blockchains, distributed ledgers, tokens, and more.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=_160oMzblY8) published by Anders Brownworth. It has been lightly edited for readability.*

#### SHA-256 hash (0:01) {#sha-256-hash-001}

This is a blockchain demo. We're going to do this in a very visual way — we're going to make it very easy to understand by stepping through the key pieces of what a blockchain is.

Before we get started, we need to take a look at this thing called a SHA-256 hash. A hash looks like a bunch of random numbers, and essentially what it is is a fingerprint of some digital data. It just so happens it's a fingerprint of whatever I type in this box. If I type my name "Anders" into this box, you see that the hash has changed. Matter of fact, it changed every time I typed a letter.

So this is the hash of the name "Anders," all lowercase — it starts with `19ea`. If I delete that and type "Anders" again, you can see it starts with `19ea` — the same exact hash. In that sense it's a digital fingerprint of this data. Whatever data is here, every time you type exactly the same data you get exactly the same hash.

I can type anything I want. You can have nothing — `e3b0` — that's the hash of nothing. Or you could type tons and tons of stuff. Matter of fact, you could put the Library of Congress in here and you would get a hash. The interesting thing is, regardless of whether there's a tiny amount of information, no information, or the entire Library of Congress, you're always going to get a hash that is this long. You're not going to be able to pre-guess what this is — you kind of have to put the data in to figure out what the hash is, but you'll always get exactly the same hash regardless of how many times you put exactly the same information in.

#### Block (2:10) {#block-210}

What I'm going to do is extend this idea of a hash into something we're going to call a block. A block is exactly like the hash, but the data section has been broken out into three sections: one called "block" — just a number, this is block number 1 — a "nonce," which is just another number, and then some data just like we had before.

The hash of all this information is down here, and it begins with four zeros. That's a relatively unusual hash — most of them aren't going to start with four zeros like that. But this one does, and because it does, totally arbitrarily, I'm going to say that this block is "signed."

What would happen if I were to change any piece of this information? Let's say I type something here — the hash is going to change, and what's the chance it's going to start with four zeros? Pretty low. I'm just going to say "hi" — look at that, this hash does not start with four zeros, and the background has turned red. So now you know that this block with this information in it is not a valid or signed block.

That's where the nonce comes in. The nonce is just a number you can set to try to find a value that makes the hash start with four zeros again. I could sit here all day typing numbers, but I have this little "Mine" button. What's going to happen when I press it is it will run through all the numbers from 1 upward to try to find one where the hash starts with four zeros. This process is called mining.

It's stopped at 59,396 — and that one just happens to hash out to something that starts with four zeros. It satisfies my definition of what a signed block is.

#### Blockchain (5:16) {#blockchain-516}

So can you tell me what a blockchain is? It's probably just a chain of these blocks. Here's my blockchain — block number one has a nonce just like before, a data area, but then it has this "previous" field which is a bunch of zeros. Moving forward, this is block two, block three, block four — this blockchain has five blocks on it.

The "previous" field for each block is the hash of the block before it. You can see that each block points backwards to the one before it. That first block has no previous, so it's just a bunch of zeros.

What happens if I change some information here? It's going to change the hash of this block and invalidate it. But what if I change something in an earlier block? It's going to change that hash, but that hash gets copied up to the next block's "previous" field, so it breaks both blocks. We can go back as far as we want to some point in the past and break that block, and it will break all the blocks since then. Everything before it is still green, but everything after turns red.

If I go and change the last block, all I have to do is re-mine that one block. If I go way back in time and make a change, I have to mine this one, this one, this one, and this one. The more blocks that go by, the harder and harder it is to make a change. That's how a blockchain resists mutation — resists change.

#### Distributed blockchain (9:18) {#distributed-blockchain-918}

So how would I know if my blockchain has been re-mined? Now we have a distributed blockchain. It looks exactly like the last blockchain, but this is Peer A. If you go down here, you can see Peer B, and it has an exact copy of the blockchain. There's also a Peer C — this could go on forever. There are many peers on the internet, and they all have a complete copy of the blockchain.

If I look at this hash, it's `e4b`. If I go down to the next one, it also has `e4b`. They must be identical. Now if I go here and type something, re-mine this block, and then mine the next blocks — all the chains are green. However, this chain says the last hash is `e4b`, the bottom one says `e4b` too, and this middle one says `4cae`.

So I know just by glancing at this one little hash that something is wrong in this blockchain. Even though all the hashes start with four zeros, this one is different. It's essentially two against one — we're a little democracy here. So `e4b` wins. That's how having a completely distributed copy on many different computers allows you to quickly see if all the blocks are identical.

Blockchains can have 400,000 or 500,000 blocks very easily. Rather than checking through all of them, all you really have to do is look at the hash of the most recent one, and you can see if anything in the past was altered.

#### Tokens (12:17) {#tokens-1217}

That's the entire thing — there is no more to it than that. But it's kind of not really useful because we don't have anything in the data area that means anything. What we really want is a token.

Now I have these tokens — totally arbitrarily, I'm calling them dollars. We have twenty-five dollars from Darcy to Bingley, four dollars and twenty-seven cents from Elizabeth to Jane — you get the idea. There are all these transactions happening, and I've just replaced the data with these transactions. Just like before, if we go down we notice we have all these other copies of the same blockchain.

Here's where immutability is important. If I change something back here, the hash is going to be different than what's on the other copies. It's very important that if you go back in time and change some value, we would notice. It's very important with money that you don't lose track, and that's the whole point of using a blockchain — resisting any kind of modifications to things that have happened in the past.

One thing I would mention: we're not listing "Darcy has a hundred dollars and he's giving 25 to Bingley." We're only remembering money movements, not bank account balances. This begs the question — does Darcy have $25?

#### Coinbase transaction (14:34) {#coinbase-transaction-1434}

We have a problem in this version of the blockchain: we don't actually know if Darcy has $25. So let's look at a Coinbase transaction. We add a Coinbase transaction to our blocks — it says we're going to invent a hundred dollars out of thin air and give it to Anders. There are no other transactions in this block because nobody had any money before this.

In the next block, another hundred dollars comes out of nowhere and goes to Anders. Now we have some transactions — they're all from Anders because I'm the only one who has any money at this point. I'm sending ten of my dollars to Sophie. Do I have ten dollars? Yeah — I look back and see that the Coinbase transaction gave me a hundred, so I have at least ten.

You add all these up and they don't go over a hundred. It follows a basic rule of currency: you can't create money out of thin air, and its dispersion is controlled.

If we zip forward in time, we see that Jackson is giving Alexa two dollars. Does Jackson actually have two dollars? We go back a block and see that Emily had gotten ten dollars from Anders and gave ten to Jackson. So Jackson does have the money. We can go backwards and find that out — that's one of the benefits of having the "previous" field.

#### Closing (16:30) {#closing-1630}

That's a basic blockchain running a currency on top of it. As you know, blockchains have many copies — everybody has a copy. If we mutate something and make it six dollars, the blocks go invalid and don't agree with the other copies. This resists tampering, which is what you want for a currency. It works very well for things that are small and transactional.

Blockchains are a very efficient way to handle agreement on what has happened in the past — this immutable history that goes down with time. We're glossing over some main points, but if you dig into the demo and click through these things and play around with it, you'll get a better and better idea of how this works.
