---
title: Ethereum Glossary
description: An incomplete glossary of technical and non-technical terms related to Ethereum
lang: en
---

# Glossary {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

<GlossaryDefinition term="51%-attack" />

## A {#section-a}

<GlossaryDefinition term="account" />

<GlossaryDefinition term="address" />

<GlossaryDefinition term="abi" />

<GlossaryDefinition term="api" />

<GlossaryDefinition term="asic" />

<GlossaryDefinition term="assert" />

<GlossaryDefinition term="attestation" />

<Divider />

## B {#section-b}

<GlossaryDefinition term="base-fee" />

<GlossaryDefinition term="beacon-chain" />

<GlossaryDefinition term="big-endian" />

<GlossaryDefinition term="block" />

<GlossaryDefinition term="block-explorer" />

<GlossaryDefinition term="block-header" />

<GlossaryDefinition term="block-propagation" />

<GlossaryDefinition term="block-proposer" />

<GlossaryDefinition term="block-reward" />

<GlossaryDefinition term="block-status" />

<GlossaryDefinition term="block-time" />

<GlossaryDefinition term="block-validation" />

<GlossaryDefinition term="blockchain" />

<GlossaryDefinition term="bootnode" />

<GlossaryDefinition term="bytecode" />

<GlossaryDefinition term="byzantium-fork" />

<Divider />

## C {#section-c}

<GlossaryDefinition term="casper-ffg" />

<GlossaryDefinition term="checkpoint" />

<GlossaryDefinition term="compiling" />

<GlossaryDefinition term="committee" />

<GlossaryDefinition term="computational-infeasibility" />

<GlossaryDefinition term="consensus" />

<GlossaryDefinition term="consensus-client" />

<GlossaryDefinition term="consensus-layer" />

<GlossaryDefinition term="consensus-rules" />

<GlossaryDefinition term="constantinople-fork" />

<GlossaryDefinition term="contract-account" />

<GlossaryDefinition term="contract-creation-transaction" />

<GlossaryDefinition term="cryptoeconomics" />

<Divider />

## D {#section-d}

<GlossaryDefinition term="doge-d" />

<GlossaryDefinition term="dag" />

<GlossaryDefinition term="dapp" />

<GlossaryDefinition term="data-availability" />

<GlossaryDefinition term="decentralization" />

<GlossaryDefinition term="dao" />

<GlossaryDefinition term="dex" />

<GlossaryDefinition term="deposit-contract" />

<GlossaryDefinition term="defi" />

<GlossaryDefinition term="difficulty" />

<GlossaryDefinition term="difficulty-bomb" />

<GlossaryDefinition term="digital-signatures" />

<GlossaryDefinition term="discovery" />

<GlossaryDefinition term="distributed-hash-table" />

<GlossaryDefinition term="double-spend" />

<Divider />

## E {#section-e}

<GlossaryDefinition term="ecdsa" />

<GlossaryDefinition term="encryption" />

<GlossaryDefinition term="entropy" />

<GlossaryDefinition term="epoch" />

<GlossaryDefinition term="equivocation" />

<GlossaryDefinition term="eth1" />

<GlossaryDefinition term="eth2" />

<GlossaryDefinition term="eip" />

<GlossaryDefinition term="ens" />

<GlossaryDefinition term="execution-client" />

<GlossaryDefinition term="execution-layer" />

<GlossaryDefinition term="eoa" />

<GlossaryDefinition term="erc" />

<GlossaryDefinition term="ethash" />

<GlossaryDefinition term="ether" />

<GlossaryDefinition term="events" />

<GlossaryDefinition term="evm" />

<GlossaryDefinition term="evm-assembly-language" />

<Divider />

## F {#section-f}

<GlossaryDefinition term="fallback-function" />

<GlossaryDefinition term="faucet" />

<GlossaryDefinition term="finality" />

<GlossaryDefinition term="finney" />

<GlossaryDefinition term="fork" />

<GlossaryDefinition term="fork-choice-algorithm" />

<GlossaryDefinition term="fraud-proof" />

<GlossaryDefinition term="frontier" />

<Divider />

## G {#section-g}

<GlossaryDefinition term="gas" />

<GlossaryDefinition term="gas-limit" />

<GlossaryDefinition term="gas-price" />

<GlossaryDefinition term="genesis-block" />

<GlossaryDefinition term="geth" />

<GlossaryDefinition term="gwei" />

<Divider />

## H {#section-h}

<GlossaryDefinition term="hard-fork" />

<GlossaryDefinition term="hash" />

<GlossaryDefinition term="hash-rate" />

<GlossaryDefinition term="homestead" />

<Divider />

## I {#section-i}

<GlossaryDefinition term="index" />

<GlossaryDefinition term="ide" />

<GlossaryDefinition term="immutable-deployed-code-problem" />

<GlossaryDefinition term="internal-transactions" />

<GlossaryDefinition term="issuance" />

<Divider />

## K {#section-k}

<GlossaryDefinition term="kdf" />

<GlossaryDefinition term="keystore" />

<GlossaryDefinition term="keccak-256" />

<Divider />

## L {#section-l}

<GlossaryDefinition term="layer-2" />

<GlossaryDefinition term="library" />

<GlossaryDefinition term="light-client" />

<GlossaryDefinition term="lmd-ghost" />

<Divider />

## M {#section-m}

<GlossaryDefinition term="mainnet" />

<GlossaryDefinition term="merkle-patricia-tree" />

<GlossaryDefinition term="message" />

<GlossaryDefinition term="message-call" />

<GlossaryDefinition term="mining" />

<GlossaryDefinition term="miner" />

<GlossaryDefinition term="mint" />

<Divider />

## N {#section-n}

<GlossaryDefinition term="network" />

<GlossaryDefinition term="network-hashrate" />

<GlossaryDefinition term="nft" />

<GlossaryDefinition term="node" />

<GlossaryDefinition term="nonce" />

<Divider />

## O {#section-o}

### ommer (uncle) block {#ommer}

When a proof-of-work [miner](#miner) finds a valid [block](#block), another miner may have published a competing block which is added to the tip of the blockchain first. This valid, but stale, block can be included by newer blocks as _ommers_ and receive a partial block reward. The term "ommer" is the preferred gender-neutral term for the sibling of a parent block, but this is also sometimes referred to as an "uncle". This was relevant for Ethereum when it was a [proof-of-work](pow) network, but ommers are not a feature of [proof-of-stake](#pos) Ethereum because precisely one block proposer is selected in each slot.

### optimistic rollup {#optimistic-rollup}

A [rollup](#rollups) of transactions that use [fraud proofs](#fraud-proof) to offer increased [layer 2](#layer-2) transaction throughput while using the security provided by [Mainnet](#mainnet) (layer 1). Unlike [Plasma](#plasma), a similar layer 2 solution, Optimistic rollups can handle more complex transaction types – anything possible in the [EVM](#evm). They do have latency issues compared to [Zero-knowledge rollups](#zk-rollups) because a transaction can be challenged via the fraud proof.

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic Rollups
</DocLink>

### Oracle {#oracle}

An oracle is a bridge between the [blockchain](#blockchain) and the real world. They act as on-chain [APIs](#api) that can be queried for information and used in [smart contracts](#smart-contract).

<DocLink to="/developers/docs/oracles/">
  Oracles
</DocLink>

<Divider />

## P {#section-p}

### parity {#parity}

One of the most prominent interoperable implementations of the Ethereum client software.

### peer {#peer}

Connected computers running Ethereum client software that have identical copies of the [blockchain](#blockchain).

### peer to peer network {#peer-to-peer-network}

A network of computers ([peers](#peer)) that are collectively able to perform functionalities without the need for centralized, server-based services.

### Plasma {#plasma}

An off-chain scaling solution that uses [fraud proofs](#fraud-proof), like [Optimistic rollups](#optimistic-rollups). Plasma is limited to simple transactions like basic token transfers and swaps.

<DocLink to="/developers/docs/scaling/plasma">
  Plasma
</DocLink>

### private key (secret key) {#private-key}

A secret number that allows Ethereum users to prove ownership of an account or contracts, by producing a digital signature (see [public key](#public-key), [address](#address), [ECDSA](#ecdsa)).

### private chain {#private-chain}

A fully private blockchain is one with permissioned access, not publicly available for use.

### proof-of-stake (PoS) {#pos}

A method by which a cryptocurrency blockchain protocol aims to achieve distributed [consensus](#consensus). PoS asks users to prove ownership of a certain amount of cryptocurrency (their "stake" in the network) in order to be able to participate in the validation of transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/">
  Proof-of-stake
</DocLink>

### proof-of-work (PoW) {#pow}

A piece of data (the proof) that requires significant computation to find.

<DocLink to="/developers/docs/consensus-mechanisms/pow/">
  Proof-of-work
</DocLink>

### public key {#public-key}

A number, derived via a one-way function from a [private key](#private-key), which can be shared publicly and used by anyone to verify a digital signature made with the corresponding private key.

<Divider />

## R {#section-r}

### receipt {#receipt}

Data returned by an Ethereum client to represent the result of a particular [transaction](#transaction), including a [hash](#hash) of the transaction, its [block](#block) number, the amount of [gas](#gas) used, and, in case of deployment of a [smart contract](#smart-contract), the [address](#address) of the contract.

### re-entrancy attack {#re-entrancy-attack}

An attack that consists of an attacker contract calling a victim contract function in such a way that during execution the victim calls the attacker contract again, recursively. This can result, for example, in the theft of funds by skipping parts of the victim contract that update balances or count withdrawal amounts.

<DocLink to="/developers/docs/smart-contracts/security/#re-entrancy">
  Re-entrancy
</DocLink>

### reward {#reward}

An amount of ether included in each new block as a reward by the network to the [miner](#miner) who found the [proof-of-work](#pow) solution.

### Recursive Length Prefix (RLP) {#rlp}

An encoding standard designed by the Ethereum developers to encode and serialize objects (data structures) of arbitrary complexity and length.

### rollups {#rollups}

A type of [layer 2](#layer-2) scaling solution that batches multiple transactions and submits them to [the Ethereum main chain](#mainnet) in a single transaction. This allows for reductions in [gas](#gas) costs and increases in [transaction](#transaction) throughput. There are Optimistic and Zero-knowledge rollups which use different security methods to offer these scalability gains.

<DocLink to="/developers/docs/scaling/#rollups">
  Rollups
</DocLink>

<Divider />

### RPC {#rpc}

**Remote procedure call (RPC)** is a protocol that a program uses to request a service from a program located on another computer in a network without having to understand the network details.

## S {#section-s}

### Secure Hash Algorithm (SHA) {#sha}

A family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST).

### Serenity {#serenity}

The stage of Ethereum development that initiated a set of scaling and sustainability upgrades, previously known as 'Ethereum 2.0', or 'Eth2'.

<DocLink to="/roadmap/">
  Ethereum upgrades
</DocLink>

### serialization {#serialization}

The process of converting a data structure into a sequence of bytes.

### shard / shard chain {#shard}

Shard chains are discrete sections of the total blockchain that subsets of validators can be responsible for. This will offer increased transaction throughput for Ethereum and improve data availability for [layer 2](#layer-2) solutions like [optimistic rollups](#optimistic-rollups) and [ZK-rollups](#zk-rollups).

<DocLink to="/roadmap/danksharding">
  Danksharding
</DocLink>

### sidechain {#sidechain}

A scaling solution that uses a separate chain with different, often faster, [consensus rules](#consensus-rules). A bridge is needed to connect these sidechains to [Mainnet](#mainnet). [Rollups](#rollups) also use sidechains, but they operate in collaboration with [Mainnet](#mainnet) instead.

<DocLink to="/developers/docs/scaling/sidechains/">
  Sidechains
</DocLink>

### signing {#signing}

Demonstrating cryptographically that a transaction was approved by the holder of a specific private key.

### singleton {#singleton}

A computer programming term that describes an object of which only a single instance can exist.

### slasher {#slasher}

A slasher is an entity that scans attestations searching for slashable offenses. Slashings are broadcast to the network, and the next block proposer adds the proof to the block. The block proposer then receives a reward for slashing the malicious validator.

### slot {#slot}

A period of time (12 seconds) in which new blocks can be proposed by a [validator](#validator) in the [proof-of-stake](#pos) system. A slot may be empty. 32 slots make up an [epoch](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### smart contract {#smart-contract}

A program that executes on the Ethereum computing infrastructure.

<DocLink to="/developers/docs/smart-contracts/">
  Introduction to Smart Contracts
</DocLink>

### SNARK {#snark}

Short for "succinct non-interactive argument of knowledge", a SNARK is a type of [zero-knowledge proof](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge rollups
</DocLink>

### soft fork {#soft-fork}

A divergence in a [blockchain](#blockchain) that occurs when the [consensus rules](#consensus-rules) change. Contrary to a [hard fork](#hard-fork), a soft fork is backwards compatible; upgraded nodes can validate blocks created by non-upgraded nodes as long as they follow the new consensus rules.

### Solidity {#solidity}

A procedural (imperative) programming language with syntax that is similar to JavaScript, C++, or Java. The most popular and most frequently used language for Ethereum [smart contracts](#smart-contract). Created by Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity">
  Solidity
</DocLink>

### Solidity inline assembly {#solidity-inline-assembly}

[EVM](#evm) assembly language in a [Solidity](#solidity) program. Solidity's support for inline assembly makes it easier to write certain operations.

### Spurious Dragon {#spurious-dragon}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,675,000 to address more denial-of-service attack vectors and clear state (see [Tangerine Whistle](#tangerine-whistle)). Also, a replay attack protection mechanism (see [nonce](#nonce)).

### stablecoin {#stablecoin}

An [ERC-20 token](#token-standard) with a value pegged to another asset's value. There are stablecoins backed by fiat currency like dollars, precious metals like gold, and other cryptocurrencies like Bitcoin.

<DocLink to="/eth/#tokens">
  ETH isn't the only crypto on Ethereum
</DocLink>

### staking {#staking}

Depositing a quantity of [ether](#ether) (your stake) to become a validator and secure the [network](#network). A validator checks [transactions](#transaction) and proposes [blocks](#block) under a [proof-of-stake](#pos) consensus model. Staking gives you an economic incentive to act in the best interests of the network. You'll get rewards for carrying out your [validator](#validator) duties, but lose varying amounts of ETH if you don't.

<DocLink to="/staking/">
  Stake your ETH to become an Ethereum validator
</DocLink>

### staking pool {#staking-pool}

The combined ETH of more than one Ethereum staker, used to reach the 32 ETH required to activate a set of validator keys. A node operator uses these keys to participate in consensus and the [block rewards](#block-reward) are split amongst contributing stakers. Staking pools or delegating staking are not native to the Ethereum protocol, but many solutions have been built by the community.

<DocLink to="/staking/pools/">
  Pooled staking
</DocLink>

### STARK {#stark}

Short for "scalable transparent argument of knowledge", a STARK is a type of [zero-knowledge proof](#zk-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge rollups
</DocLink>

### state {#state}

A snapshot of all balances and data at a particular point in time on the blockchain, normally referring to the condition at a particular block.

### state channels {#state-channels}

A [layer 2](#layer-2) solution where a channel is set up between participants, where they can transact freely and cheaply. Only a [transaction](#transaction) to set up the channel and close the channel is sent to [Mainnet](#mainnet). This allows for very high transaction throughput, but does rely on knowing number of participants up front and locking up of funds.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels">
  State channels
</DocLink>

### supermajority {#supermajority}

Supermajority is the term given for an amount exceeding 2/3 (66%) of the total staked ether securing Ethereum. A supermajority vote is required for blocks to be [finalized](#finality) on the Beacon Chain.

### syncing {#syncing}

The process of downloading the entire latest version of a blockchain to a node.

### sync committee {#sync-committee}

A sync committee is a randomly selected group of [validators](#validator) that refresh every ~27 hours. Their purpose is to add their signatures to valid block headers. Sync committees allow [light clients](#light-client) to keep track of the head of the blockchain without needing to access the entire validator set.

### szabo {#szabo}

A denomination of [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,463,000 to change the [gas](#gas) calculation for certain I/O-intensive operations and to clear the accumulated state from a denial-of-service attack, which exploited the low gas cost of those operations.

### terminal total difficulty (TTD) {#terminal-total-difficulty}

The total difficulty is the sum of the Ethash mining difficulty for all blocks up to some specific point in the blockchain. The terminal total difficulty is a specific value for the total difficulty that was used as the trigger for execution clients to switch off their mining and block gossip functions enabling the network to transition to proof-of-stake.

### testnet {#testnet}

Short for "test network," a network used to simulate the behavior of the main Ethereum network (see [Mainnet](#mainnet)).

<DocLink to="/developers/docs/networks/#ethereum-testnets">
  Testnets
</DocLink>

### token {#token}

A tradable virtual good defined in smart contracts on the Ethereum blockchain.

### token standard {#token-standard}

Introduced by ERC-20 proposal, this provides a standardized [smart contract](#smart-contract) structure for fungible tokens. Tokens from the same contract can be tracked, traded, and are interchangeable, unlike [NFTs](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/">
  ERC-20 Token Standard
</DocLink>

### transaction {#transaction}

Data committed to the Ethereum Blockchain signed by an originating [account](#account), targeting a specific [address](#address). The transaction contains metadata such as the [gas limit](#gas-limit) for that transaction.

<DocLink to="/developers/docs/transactions/">
  Transactions
</DocLink>

### transaction fee {#transaction-fee}

A fee you need to pay whenever you use the Ethereum network. Examples include sending funds from your [wallet](#wallet) or a [dapp](#dapp) interaction, like swapping tokens or buying a collectable. You can think of this like a service charge. This fee will change based on how busy the network is. This is because [validators](#validator), the people responsible for processing your transaction, are likely to prioritize transactions with higher fees – so congestion forces the price up.

At a technical level, your transaction fee relates to how much [gas](#gas) your transaction requires.

Reducing transaction fees is a subject of intense interest right now. See [Layer 2](#layer-2).

### trustlessness {#trustlessness}

The ability of a network to mediate transactions without any of the involved parties needing to trust a third party.

### Turing complete {#turing-complete}

A concept named after English mathematician and computer scientist Alan Turing - a system of data-manipulation rules (such as a computer's instruction set, a programming language, or a cellular automaton) is said to be "Turing complete" or "computationally universal" if it can be used to simulate any Turing machine.

<Divider />

## V {#section-v}

### validator {#validator}

A [node](#node) in a [proof-of-stake](#pos) system responsible for storing data, processing transactions, and adding new blocks to the blockchain. To activate validator software, you need to be able to [stake](#staking) 32 ETH.

<DocLink to="/developers/docs/consensus-mechanisms/pos">
  Proof-of-stake
</DocLink>
<DocLink to="/staking/">
  Staking in Ethereum
</DocLink>

### validator lifecycle {#validator-lifecycle}

The sequence of states that a validator can exist in. These include:

- deposited: At least 32 ETH has been deposited to the [deposit contract](#deposit-contract) by the validator
- pending: the validator is in the activation queue waiting to be voted into the network by existing validators
- active: currently attesting and proposing blocks
- slashing: the validator has misbehaved and is being slashed
- exiting: the validator has been flagged for exiting the network, either voluntarily or because they have been ejected.

### validity proof {#validity-proof}

A security model for certain [layer 2](#layer-2) solutions where, to increase speed, transactions are [rolled up](/#rollups) into batches and submitted to Ethereum in a single transaction. The transaction computation is done off-chain and then supplied to the main chain with a proof of their validity. This method increases the amount of transactions possible while maintaining security. Some [rollups](#rollups) use [fraud proofs](#fraud-proof).

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge rollups
</DocLink>

### validium {#validium}

An off-chain solution that uses [validity proofs](#validity-proof) to improve transaction throughput. Unlike [Zero-knowledge rollups](#zk-rollup), validium data isn't stored on layer 1 [Mainnet](#mainnet).

<DocLink to="/developers/docs/scaling/validium/">
  Validium
</DocLink>

### Vyper {#vyper}

A high-level programming language with Python-like syntax. Intended to get closer to a pure functional language. Created by Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper">
  Vyper
</DocLink>

<Divider />

## W {#section-w}

### wallet {#wallet}

Software that holds [private keys](#private-key). Used to access and control Ethereum [accounts](#account) and interact with [smart contracts](#smart-contract). Keys need not be stored in a wallet, and can instead be retrieved from offline storage (i.e. a memory card or paper) for improved security. Despite the name, wallets never store the actual coins or tokens.

<DocLink to="/wallets/">
  Ethereum Wallets
</DocLink>

### Web3 {#web3}

The third version of the web. First proposed by Dr. Gavin Wood, Web3 represents a new vision and focus for web applications - from centrally owned and managed applications, to applications built on decentralized protocols (see [dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/">
  Web2 vs Web3
</DocLink>

### wei {#wei}

The smallest denomination of [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### zero address {#zero-address}

An Ethereum address, composed entirely of zeros, that is frequently used as an address to remove tokens from owned circulation. A distinction is drawn between tokens formally removed from a smart contract's index via the burn() method and those sent to this address.

### zero-knowledge proof {#zk-proof}

A zero-knowledge proof is a cryptographic method that allows an individual to prove that a statement is true without conveying any additional information.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge rollups
</DocLink>

### zero-knowledge rollup {#zk-rollup}

A [rollup](#rollups) of transactions that use [validity proofs](#validity-proof) to offer increased [layer 2](#layer-2) transaction throughput while using the security provided by [Mainnet](#mainnet) (layer 1). Although they can't handle complex transaction types, like [Optimistic rollups](#optimistic-rollups), they don't have latency issues because transactions are provably valid when submitted.

<DocLink to="/developers/docs/scaling/zk-rollups/">
  Zero-knowledge Rollups
</DocLink>

<Divider />

## Sources {#sources}

_Provided in part by [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) by [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) under CC-BY-SA_

<Divider />

## Contribute to this page {#contribute-to-this-page}

Did we miss something? Is something incorrect? Help us improve by contributing to this glossary on GitHub!

[Learn more about how to contribute](/contributing/adding-glossary-terms)
