---
title: "Transactions — ETH.BUILD"
description: "A demonstration of how Ethereum transactions work using the ETH.BUILD educational tool. See how transactions are constructed, signed, and sent on the Ethereum network."
lang: en
youtubeId: "er-0ihqFQB0"
uploadDate: 2021-01-14
duration: "0:06:12"
educationLevel: beginner
topic:
  - "transactions"
format: tutorial
author: Austin Griffith
breadcrumb: "Transactions (ETH.BUILD)"
---

A tutorial by **Austin Griffith** demonstrating how Ethereum transactions work using the ETH.BUILD visual programming tool — covering transaction structure, gas prices, signing, broadcasting, and the transaction pool.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=er-0ihqFQB0) published by Austin Griffith. It has been lightly edited for readability.*

#### Transaction fees and miner incentives (0:00) {#transaction-fees-and-miner-incentives-000}

On ETH.BUILD today we're going to talk about transactions. Up until now, we sort of have these transactions being mined into blocks, packaged in blocks, and mined into a chain. We want to talk about what incentivizes the miner — other than the block reward — to pull our transaction out of the pool and put it into a block and mine it onto the chain, compared to other people in the pool. There could be thousands of people in the pool who are all sort of bidding, and that bid is with this fee.

I could have a fee in my transaction that says "I'm Alice and I'm sending five to Bob, and my nonce is one for replay protection." Also, whoever mines this can take the fee for themselves. Basically, Alice is sending five to Bob but also paying the miner a nickel to put it into the chain.

#### Anatomy of an Ethereum transaction (1:10) {#anatomy-of-an-ethereum-transaction-110}

What does a transaction look like on Ethereum? We won't have "Bob" and "Alice" anymore — we'll have addresses. The value would be in wei, not in ETH. And the fee would also be in wei.

Let's jump in and look at this transaction. I've got an account with a mnemonic dropped in, and I'm hooked up to the Ethereum mainnet. I'm also running a module to get price data from CoinMarketCap, so I can see that point-one-something ETH translates to about twenty-three dollars.

#### Setting up the transaction (2:25) {#setting-up-the-transaction-225}

What I'm going to do is create a transaction and incentivize the miner to pick it up and put it on chain. I've got two characters — Alice and Bob. Alice is going to send with her private key some value to Bob. There's no "from" address field here because — remember — we're signing and recovering with our key pair. The transaction gets packaged, signed, and then sent across the network. No one can tamper with it, and on the other side someone can recover it and find that it was indeed us who signed it. The "from" address is derived.

#### Gas price strategy (4:20) {#gas-price-strategy-420}

The gas price is set to about 4.1 gwei by default — that's 4.1 billion wei. But we want to be more strategic about it and see what's going on onchain right now. We can see that the last block had 78 transactions, and the gas price ranged from about 5 down to some minimum. Basically, we would need to be above 5 to get mined into that block. So let's set the gas price to 5.001 — just a little bit more.

#### Converting to wei (5:20) {#converting-to-wei-520}

We need to do a conversion to wei. On Ethereum, you mainly deal with two denominations: ETH, which is the one that people normally talk about, and then wei, which is like a very tiny fraction of ETH. A gwei — what we use for gas prices — is in between. The reason for this is similar to why we don't walk around talking in fractions of pennies.

Alice has 0.18 ETH, and we're going to send 0.05 ETH to Bob. We put in a gas price of 5 gwei.

#### Signing and broadcasting (7:02) {#signing-and-broadcasting-702}

When Alice chooses to sign the transaction, it shoots out as a signed transaction that can go across the network. No one can mess with it — on the other side, someone can derive that it was Alice who signed it, and it contains all the information about who we want to send to and the gas that goes to the miner.

We take that signed transaction and plug it into the blockchain module's send function. When I click send, it gives us a hash — the hash of the transaction. Basically, I sent it to the distributed network and they gave me back a transaction hash. It goes out on the network, and then there's this pool of transactions — people all bidding to get their transaction through.

#### Checking the block (8:41) {#checking-the-block-841}

We can query the blockchain for our transaction. Sure enough, it's already been mined. We can look at the block, sort by gas price, and find ourselves. There's our transaction at gas price 5.001 — Alice sending to Bob, with no extra data. We're in there, about four or five positions from the bottom.

#### Sending data with a transaction (9:54) {#sending-data-with-a-transaction-954}

We're able to send value and bid to get our transaction recognized on chain. But let's look at one more thing — the data field. We can send stuff along with our transaction. It's going to be in hexadecimal. Alice is going to send another six dollars to Bob, and we'll attach a message: "hey Bob." We can see "hey Bob" converted into hex.

We sign that transaction, send it out to a miner, it goes to the network, and we get a hash back. We watch for it to get mined, and it does. When we check that block, we can see our transaction with the data attached.

#### Transaction pool and gas bumping (12:43) {#transaction-pool-and-gas-bumping-1243}

For one last demonstration, I put a transaction into the pool with a very low gas price — about 1.001 gwei. It's sitting there unmined because we're not incentivizing the miners enough. We can see the transaction is pending in the transaction pool. The pool has between one and three hundred transactions, but the latest blocks being mined show the smallest gas price is about 5.

So we need to resubmit this transaction — let's bump it up to 10. That's way more than it needs to be, but we'll resubmit the same transaction with the same nonce but a higher gas price. The network says "same person, same transaction, willing to pay more." It gets picked up and mined into the next block.

#### Summary (14:52) {#summary-1452}

We sent a transaction, we paid some gas to incentivize the miner to put it into the chain of blocks. We also sent data along with a transaction — there's all sorts of really cool stuff we can do now that we have this call data coming along, and we'll get into smart contracts and a lot of fun stuff later.
