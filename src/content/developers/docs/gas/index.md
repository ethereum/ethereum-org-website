---
title: Gas and fees
description:
lang: en
sidebar: true
---

Gas is essential to the Ethereum network. It is the fuel that allows it to operate, in the same way that a car needs gasoline to run.

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read up on [transactions](/developers/docs/transactions/) and the [EVM](/developers/docs/evm/).

## What is gas? {#what-is-gas}

Gas refers to the unit that measures the amount of computational effort required to execute specific operations on the Ethereum network.

Since each Ethereum transaction requires computational resources to execute, each transaction requires a fee. Gas refers to the fee required to successfully conduct a transaction on Ethereum.

![A diagram showing where gas is needed in EVM operations](./gas.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Gas fees are paid in Ethereum's native currency, ether (ETH). Gas prices are denoted in gwei, which itself is a denomination of ETH - each gwei is equal to 0.000000001 ETH (10<sup>-9</sup> ETH). For example, instead of saying that your gas costs 0.000000001 ether, you can say your gas costs 1 gwei.

## Prior to the London upgrade {#pre-london}

The way transaction fees on the Ethereum network are calculated changed during the London network upgrade. Here is a recap of how things used to work:

Let's say Alice had to pay Bob 1 ETH.
In the transaction the gas limit is 21,000 units and the gas price is 200 gwei.

Total fee would have been: `Gas units (limit) * Gas price per unit`
i.e `21,000 * 200 = 4,200,000 gwei` or 0.0042 ETH

When Alice sent the money, 1.0042 ETH would be deducted from Alice's account.
Bob would be credited 1.0000 ETH.
Miner would receive 0.0042 ETH.

This video offers a concise overview of gas and why it exists:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## After to the London upgrade {#post-london}

Starting with [the London network upgrade](/history/#london), every block has a base fee - the minimum per gas price for inclusion in this block. Optionally, users can set a priority fee (tip).

Calculating the total fee works as follows: `Gas units (limit) * (Base fee + Tip)`

Let’s say Jordan has to pay Taylor 1 ETH. In the transaction the gas limit is 21,000 units and the base fee is 100 gwei. Jordan includes a tip of 10 gwei.
Using the formula above we can calculate this as `21,000 * (100 + 10) = 2,310,000 gwei` or 0.0023 ETH.

## Base Fees {#base-fees}

Every block has a base fee which acts as a reserve price. To be eligible for inclusion in a block the offered price per gas must at least equal the base fee. The base fee is calculated independently of the current block and is instead determined by the blocks before it - making transaction fees more predictable for users. When the block is mined this base fee is "burned", removing it from circulation.

## Block Size {#block-size}

EIP-1559 introduced variable-size blocks to Ethereum. Each block has a target size of 15 million gas but the size of blocks will increase or decrease in accordance with network demands, up until the block limit of 30 milion gas (2x target block size). An equilibrium block size of 15 million on average is achieved through the process of _tâtonnement_. This means if the block size is greater than the target block size, the base fee will increase. Similarly, if the block size is less than the target block size the base fee will decrease. The amount the base fee is adjusted by is proportional to how far from the target the block size is. [More on blocks](/developers/docs/blocks/).

## Base Fees Continued {#base-fees-continued}

The base fee is calculated by a formula that compares the size of the previous block (the amount of gas used for all the transactions) with the target size. The base fee will increase by a maximum of 12.5% per block if the target block size is exceeded. This exponential growth makes it economically non-viable for block size to remain high indefinitely.

| Block Number | Included Gas | Fee Increase | Current Base Fee |
| ------------ | -----------: | -----------: | ---------------: |
| 1            |          15M |           0% |         100 gwei |
| 2            |          30M |           0% |         100 gwei |
| 3            |          30M |        12.5% |       112.5 gwei |
| 4            |          30M |        12.5% |       126.5 gwei |
| 5            |          30M |        12.5% |       142.4 gwei |
| 6            |          30M |        12.5% |       160.2 gwei |
| 7            |          30M |        12.5% |       180.2 gwei |
| 8            |          30M |        12.5% |       202.8 gwei |

Relative to the pre-London gas auction market, this transaction-fee-mechanism change causes fee prediction to be more reliable. Following the table above - to create a transaction on block number 9, a wallet will let the user know with certainty that the **maximum base fee** to be added to the next block is `current base fee * 112.5%` or `202.8 gwei * 112.5% = 256.8 gwei`.

## Tips {#tips}

As the base fee (which in the previous transaction fee mechanism would have gone to the miner) is burned, a priority fee (tip) is used to incentivise miners to include a transaction in the block they are mining. Without tips, it would be economically viable for miners to mine empty blocks, as they would receive the same block reward. Under normal conditions a small tip provides miners a minimal incentive to include a transaction and high tips can provide incentive for special treatment.

## Max Fee {#maxfee}

To execute a transaction on the network users are able to specify a maximum limit they are willing to pay for their transaction to be executed. This optional parameter is known as the `maxFeePerGas`. In order for a transaction to be executed the max fee must exceed the sum of the base fee and the tip.

## The London update {#gas-price-london-update}

The post-London transaction fee mechanism is more complicated than the simple gas price auction, but it has the advantage of making gas fees more predictable, as well as making ETH more
valuable by removing some of it from circulation. The base fee functions as a [second price auction](https://oko.uk/blog/first-price-vs-second-price-auctions),
which is more efficient than the previous mechanism that is a first price auction. Users can submit transactions with a much higher tip, corresponding
to how much they need the transaction to happen, without having to worry that they will be overcharged.

This video explains EIP-1559 and the benefits it brings:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/MGemhK9t44Q" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

If you are interested you can read the exact
[EIP-1559 specifications](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Continue down the rabbit hole with these [EIP-1559 Resources](https://hackmd.io/@timbeiko/1559-resources).

## Why do gas fees exist? {#why-do-gas-fees-exist}

In short, gas fees help keep the Ethereum network secure. By requiring a fee for every computation executed on the network, we prevent bad actors from spamming the network. In order to prevent accidental or hostile infinite loops or other computational wastage in code, each transaction is required to set a limit to how many computational steps of code execution it can use. The fundamental unit of computation is "gas".

Although a transaction includes a limit, any gas not used in a transaction is returned to the user (i.e `max fee - (base fee + tip)` is returned).

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## What is gas limit? {#what-is-gas-limit}

Gas limit refers to the maximum amount of gas you are willing to consume on a transaction. More complicated transactions, involving [smart contracts](/developers/docs/smart-contracts/), require more computational work so they require a higher gas limit than a simple payment. A standard ETH transfer requires a gas limit of 21,000 units of gas.

For example if you put a gas limit of 50,000 for a simple ETH transfer, the EVM would consume 21,000, and you would get back the remaining 29,000. However, if you specify too little gas say for example, a gas limit of 20,000 for a simple ETH transfer, the EVM will consume your 20,000 gas units attempting to fulfill the txn, but it will not complete. The EVM then reverts any changes, but since 20k gas units worth of work has already been done by the miner, that gas is consumed.

## Why can gas fees get so high? {#why-can-gas-fees-get-so-high}

High gas fees are due to the popularity of Ethereum. Performing any operation on Ethereum requires consuming gas, and gas space is limited per block. This includes calculations, storing or manipulating data, or transferring tokens, each consuming different amounts of "gas" units. As dapp functionality grows more complex, the number of operations a smart contract performs grows too, meaning each transaction takes up more space of a limited size block. If there's too much demand, users must offer a higher tip amount to try and out-bid other users' transactions. A higher tip can make it more likely that your transaction will get into the next block.

Gas price alone does not actually determine how much we have to pay for a particular transaction. To calculate the transaction fee we have to multiply the gas used by the transaction fee, which is measured in gwei.

## Initiatives to reduce gas costs {#initiatives-to-reduce-gas-costs}

With the new network upgrades of Ethereum 2.0 (also known as Eth2 or Serenity). This should ultimately address some of the gas fee issues, which will in turn enable the platform to process thousands of transactions per second and scale globally.

Layer 2 scaling is a primary initiative to greatly improve gas costs, user experience and scalability. [More on layer 2 scaling](/developers/docs/scaling/layer-2-rollups/).

The new proof-of-stake model should reduce high power consumption and reliance on specialized hardware. The new PoS system was introduced on the Beacon Chain. This chain will allow the decentralized Ethereum network to come to agreement and keep the network secure, but avoid high energy use by requiring a financial commitment.

Anyone with at least 32 ETH is able to stake them and become a validator responsible for processing transactions, proposing new blocks to add to the blockchain and storing data. Users who have less than 32 ETH are able to join staking pools.

## Strategies for you to reduce gas costs {#strategies-for-you-to-reduce-gas-costs}

If you are looking to reduce gas costs for your ETH you are able to set a tip to indicate the priority level of your transaction. Miners will 'work on' and execute transactions that offer a higher tip per gas, as they get to keep the tips that you pay and will be less inclined to execute transactions with lower tips set.

If you want to monitor gas prices so you are able to send your ETH for less you can use many different tools such as:

- [Etherscan](https://etherscan.io/gastracker)
- [GasNow](https://www.gasnow.org)

## Further Reading {#further-reading}

- [Ethereum Gas Explained](https://defiprime.com/gas)
- [Is Ethereum more expensive to use as price rises?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Reducing the gas consumption of your Smart Contracts](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)

## Related Tools {#related-tools}

- [ETH Gas Station](https://ethgasstation.info/) _Consumer oriented metrics for the Ethereum gas market_
- [Etherscan Gas Tracker](https://etherscan.io/gastracker) _Transaction gas price estimator_
- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _Ethereum network gas stats_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _Gas estimation API powered by Blocknative's global mempool data platform_

## Related Topics {#related-topics}

- [Mining](/developers/docs/consensus-mechanisms/pow/mining/)
