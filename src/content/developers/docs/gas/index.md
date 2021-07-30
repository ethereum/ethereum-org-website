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

In essence, gas fees are paid in Ethereum's native currency, ether (ETH). Gas prices are denoted in gwei, which itself is a denomination of ETH - each gwei is equal to 0.000000001 ETH (10<sup>-9</sup> ETH). For example, instead of saying that your gas costs 0.000000001 ether, you can say your gas costs 1 gwei.

## Prior to the London update {#pre-london}

Let's say Alice has to pay Bob 1ETH.
In the transaction the gas limit is 21,000 units and the gas price is 200 gwei.

Total fee will be: `Gas units (limit) * Gas price per unit`
i.e `21,000 * 200 = 4,200,000 gwei` or 0.0042 ETH

Now, when Alice sends the money, 1.0042 ETH will be deducted from Alice's account.
Bob will be credited 1.0000 ETH.
Miner gets 0.0042 ETH.

This video offers a concise overview of gas and why it exists:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/AJvzNICwcwc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## After the London update {#post-london}

### Base Fees {#base-fees}

Every block has a base fee which acts as a reserve price. To be eligible for inclusion in a block the offered price per gas must at least equal the base fee. The base fee is calculated independently of the current block and is instead determined by the blocks before it - making transaction fees more predictable for users.

### Block Size

EIP-1559 introduced variable-size blocks to Ethereum. Each block has a target size of 12.5 million gas but the size of blocks will increase or decrease in accordance with network demands, up until the block limit of 25 milion gas (2x block target size). An equilibrium block size of 12.5 million on average is achieved through the process of _tâtonnement_. This means if the block sizes is greater than the target block size, the base fee will increase . Similarly, if the block is less than the target block size the base fee will decrease. [More on blocks](/developers/docs/blocks/).

### More on Base Fees {#more-base-fees}

The base fee will increase by a maximum of 12.5% per block if the target block size is exceeded. This exponential growth makes it economically non-viable for block size to remain high indefinitely.

| Block Number | Included Gas | Fee Increase |   Base Fee |
| ------------ | -----------: | -----------: | ---------: |
| 1            |        12.5M |           0% |   100 gwei |
| 2            |          25M |           0% |   100 gwei |
| 3            |          25M |        12.5% | 112.5 gwei |
| 4            |          25M |        12.5% | 126.5 gwei |
| 5            |          25M |        12.5% | 142.4 gwei |
| 6            |          25M |        12.5% | 160.2 gwei |
| 7            |          25M |        12.5% | 180.2 gwei |
| 8            |          25M |        12.5% | 202.8 gwei |

Relative to the pre-London gas auction market, this transaction-fee-mechanism change causes fee prediction for to be more reliable. Following the table above - to create a transaction on block number 9, a wallet will let the user know with certainty that the **maximum base fee** to be added to the next block is `current base fee * 112.5%` or `202.8 gwei * 112.5% = 256.8 gwei`.

### FeeCap {#feecap}

## Implications of the London Upgrade on Fees

- less sudden spikes in price
- better user experience when transacting on the network

## Why do gas fees exist? {#why-do-gas-fees-exist}

In short, gas fees help keep the Ethereum network secure. By requiring a fee for every computation executed on the network, we prevent actors from spamming the network. In order to prevent accidental or hostile infinite loops or other computational wastage in code, each transaction is required to set a limit to how many computational steps of code execution it can use. The fundamental unit of computation is "gas".

Although a transaction includes a limit, any gas not used in a transaction is returned to the user.

![Diagram showing how unused gas is refunded](../transactions/gas-tx.png)
_Diagram adapted from [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## What is gas limit? {#what-is-gas-limit}

Gas limit refers to the maximum amount of gas you are willing to consume on a transaction. More complicated transactions, involving [smart contracts](/developers/docs/smart-contracts/), require more computational work so they require a higher gas limit than a simple payment. A standard ETH transfer requires a gas limit of 21,000 units of gas.

For example if you put a gas limit of 50,000 for a simple ETH transfer, the EVM would consume 21,000, and you would get back the remaining 29,000. However, if you specify too little gas say for example, a gas limit of 20,000 for a simple ETH transfer, the EVM will consume your 20,000 gas units attempting to fulfill the txn, but it will not complete. The EVM then reverts any changes, but since 20k gas units worth of work has already been done by the miner, that gas is consumed.

## What is gas price? {#what-is-gas-price}

Gas price refers to the amount of Ether you are willing to pay for every unit of gas, and this is usually measured in 'gwei'. Prior to
[the London update](/history/#london), you specify in the transaction how much you are willing to pay per gas, and you pay exactly that amount.
Different transactions in the same block can have very different gas prices.

### The London update {#gas-price-london-update}

Starting with the London update, every block has a base fee, the minimum per gas price for inclusion in this block. The base fee is calculated by a formula
that compares the size of the previous block (the amount of gas used for all the transactions) with a target size. This upgrade will double the allowable block size, while targeting blocks to be 50% full. If the block size is higher than the target, there is more demand for inclusion in the blockchain than targeted supply, so the base fee in the subsequent block is increased. If the block size is lower than the target then there is less demand for block space than targeted supply, so the base fee is subsequently decreased. The amount the base fee is adjusted by is proportional to how far from the target the block size is. This base fee is "burned", removing it from circulation.

Transactions can either specify a gas price using the old mechanism, or specify two other parameters:

- Maximum Fee per Gas: The maximum gas price the transaction can be charged.
- Maximum Priority Fee per Gas (a.k.a. Tip): The maximum priority fee the transaction signer is willing to pay the miner per gas to be included.
  If the base fee plus this amount is less than the maximum fee per gas, this is the priority fee. Otherwise, the priority fee is the maximum
  fee minus the base fee.

For example, imagine a block with a base fee of 100 gwei. The pool of available transactions contains the transactions
in the table below. Transactions A-C are type 2, so they include both a maximum fee per gas and a maximum priority fee per gas.
Transaction D is an older transaction type (either 0, without an access list, or 1, which does have an access list), so it only specifies
a gas price. That gas price is used for both maximum fee per gas and maximum priority fee per gas.

| ID  | Maximum Fee per Gas | Maximum Priority Fee per Gas | Actual Priority Fee | Actual Gas Price | Remarks                                                         |
| --- | ------------------: | ---------------------------: | ------------------: | ---------------: | --------------------------------------------------------------- |
| A   |             90 gwei |                      90 gwei |                 N/A |              N/A | This transaction is not going in the block                      |
| B   |            200 gwei |                       5 gwei |              5 gwei |         105 gwei | The priority fee is the maximum priority fee                    |
| C   |            120 gwei |                      30 gwei |             20 gwei |         120 gwei | The priority fee is the maximum (total) fee minus the base fee  |
| D   |            200 gwei |                     200 gwei |            100 gwei |         200 gwei | Transactions that specify gas price are charged the full amount |

Miners and validators are expected to choose the transactions that will pay them the highest priority fees.

This mechanism is more complicated than the simple gas price auction, but it has the advantage of making gas fees more predictable, as well as making ETH more
valuable by removing some of it from circulation. The maximum fee per gas functions as a [second price auction](https://oko.uk/blog/first-price-vs-second-price-auctions),
which is more efficient than the previous mechanism that is a first price auction. Users can submit transactions with a much higher maximum fee per gas, corresponding
to how much they need the transaction to happen, without having to worry that they will be overcharged.

If you are interested you can read the exact
[EIP-1559 specifications](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Continue down the rabbit hole with these [EIP-1559 Resources](https://hackmd.io/@timbeiko/1559-resources).

## Why can gas fees get so high? {#why-can-gas-fees-get-so-high}

High gas fees are due to the popularity of Ethereum. Performing any operation on Ethereum requires consuming gas, and gas space is limited per block. This includes calculations, storing or manipulating data, or transferring tokens, each consuming different amounts of "gas" units. As dapp functionality grows more complex, the number of operations a smart contract performs grows too, meaning each transaction takes up more space of a limited size block. If there's too much demand, users must offer a higher gas price to try and out-bid other users' transactions. A higher price can make it more likely that your transaction will get into the next block.

Gas price alone does not actually determine how much we have to pay for a particular transaction. To calculate the transaction fee we have to multiply the gas used by gas price, which is measured in gwei.

This video about gas fees explains fully why fees can be so expensive:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/Yh8cHUB-KoU" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Initiatives to reduce gas costs {#initiatives-to-reduce-gas-costs}

With the new network upgrades of Ethereum 2.0 (also known as Eth2 or Serenity). This should ultimately address some of the gas fee issues, which will in turn enable the platform to process thousands of transactions per second and scale globally.

Layer 2 scaling is a primary initiative to greatly improve gas costs, user experience and scalability. [More on layer 2 scaling](/developers/docs/scaling/layer-2-rollups/).

The new proof-of-stake model should reduce high power consumption and reliance on specialized hardware. The new PoS system was introduced on the Beacon Chain. This chain will allow the decentralized Ethereum network to come to agreement and keep the network secure, but avoid high energy use by requiring a financial commitment.

Anyone with at least 32 ETH is able to stake them and become a validator responsible for processing transactions, proposing new blocks to add to the blockchain and storing data. Users who have less than 32 ETH are able to join staking pools.

## Strategies for you to reduce gas costs {#strategies-for-you-to-reduce-gas-costs}

If you are looking to reduce gas costs for your ETH you are able to set the price of your own gas fees and choose the priority level of your transaction. Miners will 'work on' and execute transactions that offer a higher gas price, as they get to keep the fees that you pay and will be less inclined to execute transactions with lower gas fees set. The gas price you set is how much you are willing to pay per unit of gas. However if you set the amount of gas too low you will not be able to send your ETH as you will run out of gas, you would then have to resubmit your transaction costing you more in gas fees. You can do this from some wallet providers when sending ETH.

If you want to monitor gas prices so you are able to send your ETH for less you can use many different tools such as:

- [Etherscan](https://etherscan.io/gastracker)
- [GasNow](https://www.gasnow.org)

## Further Reading {#further-reading}

- [Understanding Ethereum Gas, Blocks and the Fee Market](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
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
