---
title: Ethereum Glossary
description: An incomplete glossary of technical and non-technical terms related to Ethereum
lang: en
sidebar: true
sidebarDepth: 2
---

# Glossary {#ethereum-glossary}

<Divider />

## # {#section-numbers}

### 51% attack {#51-attack}

A type of attack on a decentralized [network](#network) where a group gains control of the majority of [nodes](#node). This would allow them to defraud the blockchain by reversing [transactions](#transaction) and double spending [ether](#ether) and other tokens.

## A {#section-a}

### account {#account}

An object containing an [address](#address), balance, [nonce](#nonce), and optional storage and code. An account can be a [contract account](#contract-account) or an [externally owned account (EOA)](#eoa).

<DocLink to="/developers/docs/accounts" title="Ethereum Accounts" />

### address {#address}

Most generally, this represents an [EOA](#eoa) or [contract](#contract-accouint) that can receive (destination address) or send (source address) [transactions](#transaction) on the blockchain. More specifically, it is the rightmost 160 bits of a [Keccak hash](#keccak-256) of an [ECDSA](#ecdsa) [public key](#public-key).

### application binary interface (ABI) {#abi}

The standard way to interact with [contracts](#contract-account) in the Ethereum ecosystem,
both from outside the blockchain and for contract-to-contract interactions.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications" title="ABI" />

### assert {#assert}

In [Solidity](#solidity), `assert(false)` compiles to `0xfe`, an invalid opcode, which uses up all remaining [gas](#gas) and reverts all changes. When an `assert()` statement fails, something very wrong and unexpected is happening, and you will need to fix your code. You should use `assert()` to avoid conditions that should never, ever occur.

<DocLink to="/developers/docs/security/" title="Security" />

### attestation {#attestation}

A validator vote for a [Beacon Chain](#beacon-chain) or [shard](#shard) [block](#block). Validators must attest to blocks, signaling that they agree with the state proposed by the block.

<Divider />

## B {#section-b}

### Beacon Chain {#beacon-chain}

An Eth2 upgrade that will become the coordinator for the Ethereum network. It introduces [proof-of-stake](#proof-of-stake) and [validators](#validator) to Ethereum. It will eventually be merged with [mainnet](#mainnet).

<DocLink to="/eth2/beacon-chain/" title="Beacon Chain" />

### big-endian {#big-endian}

A positional number representation where the most significant digit is first in memory. The opposite of little-endian, where the least significant digit is first.

### block {#block}

A collection of required information (a block header) about the comprised [transactions](#transaction), and a set of other block headers known as [ommers](#ommer). Blocks are added to the Ethereum network by [miners](#miner).

<DocLink to="/developers/docs/blocks/" title="Blocks" />

### blockchain {#blockchain}

In Ethereum, a sequence of [blocks](#block) validated by the [proof-of-work](#pow) system, each linking to its predecessor all the way to the [genesis block](#genesis-block). There is no block size limit; it instead uses varying [gas limits](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="What is a Blockchain?" />

### bytecode {#bytecode}

An abstract instruction set designed for efficient execution by a software interpreter or a virtual machine. Unlike human-readable source code, bytecode is expressed in numeric format.

### Byzantium fork {#byzantium-fork}

The first of two [hard forks](#hard-fork) for the [Metropolis](#metropolis) development stage. It included EIP-649 Metropolis [Difficulty Bomb](#difficulty-bomb) Delay and Block Reward Reduction, where the [Ice Age](#ice-age) was delayed by 1 year and the block reward was reduced from 5 to 3 ether.

<Divider />

## C {#section-c}

### compiling {#compiling}

Converting code written in a high-level programming language (e.g., [Solidity](#solidity)) into a lower-level language (e.g., EVM [bytecode](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/" title="Compiling Smart Contracts" />

### committee {#committee}

A group of at least 128 [validators](#validator) assigned to beacon and shard blocks at random by [the Beacon Chain](#beacon-chain).

### consensus {#consensus}

When numerous nodes (usually most nodes on the network) all have the same blocks in their locally validated best blockchain. Not to be confused with [consensus rules](#consensus-rules).

### consensus rules {#consensus-rules}

The block validation rules that full nodes follow to stay in consensus with other nodes. Not to be confused with [consensus](#consensus).

### Constantinople fork {#constantinople-fork}

The second part of the [Metropolis](#metropolis) stage, originally planned for mid-2018. Expected to include a switch to a hybrid [proof-of-work](#pow)/[proof-of-stake](#pos) consensus algorithm, among other changes.

### contract account {#contract-account}

An account containing code that executes whenever it receives a [transaction](#transaction) from another [account](#account) ([EOA](#eoa) or [contract](#contract-account)).

### contract creation transaction {#contract-creation-transaction}

A special [transaction](#transaction), with the [zero address](#zero-address) as the recipient, that is used to register a [contract](#contract-account) and record it on the Ethereum blockchain.

### crosslink {#crosslink}

A crosslink provides a summary of a shard's state. It's how [shard](#shard) chains will communicate with one another via the [Beacon Chain](#beacon-chain)in the sharded [proof-of-stake system](#proof-of-stake).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof-of-stake" />

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) {#dao}

A company or other organization that operates without hierarchical management. DAO may also refer to a contract named "The DAO" launched on April 30, 2016, which was then hacked in June 2016; this ultimately motivated a [hard fork](#hard-fork) (codenamed DAO) at block 1,192,000, which reversed the hacked DAO contract and caused Ethereum and Ethereum Classic to split into two competing systems.

<DocLink to="/dao/" title="Decentralized Autonomous Organizations (DAOs)" />

### Dapp {#dapp}

Decentralized application. At a minimum, it is a [smart contract](#smart-contract) and a web user interface. More broadly, a Dapp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services. In addition, many Dapps include decentralized storage and/or a message protocol and platform.

<DocLink to="/developers/docs/dapps/" title="Introduction to Dapps" />

### decentralized exchange (DEX) {#dex}

A type of [dapp](#dapp) that lets you swap tokens with peers on the network. You need [ether](#ether) to use one (to pay [transactions fees](#transaction-fee)) but they are not subject to geographical restrictions like centralized exchanges – anyone can participate.

<DocLink to="/get-eth/#dex" title="Decentalized exchanges" />

### deed {#deed}

See [non-fungible token (NFT)](#nft)

### DeFi {#defi}

Short for "decentralized finance," a broad category of [dapps](#dapp) aiming to provide financial services backed by the blockchain, without any intermediaries, so anyone with an internet connection can participate.

<DocLink to="/defi/" title="Decentralized Finance (DeFi)" />

### difficulty {#difficulty}

A network-wide setting that controls how much computation is required to produce a [proof-of-work](#pow).

### difficulty bomb {#difficulty-bomb}

Planned exponential increase in [proof-of-work](#pow) [difficulty](#difficulty) setting designed to motivate the transition to [proof-of-stake](#pos), reducing the chances of a [fork](#hard-fork)

### digital signature {#digital-signatures}

A short string of data a user produces for a document using a [private key](#private-key) such that anyone with the corresponding [public key](#public-key), the signature, and the document can verify that (1) the document was "signed" by the owner of that particular private key, and (2) the document was not changed after it was signed.

<Divider />

## E {#section-e}

### elliptic curve digital signature algorithm (ECDSA) {#ecdsa}

A cryptographic algorithm used by Ethereum to ensure that funds can only be spent by their owners. It's the preferred method for creating public and private keys. Relevant for account [address](#address) generation and [transaction](#transaction) verification.

### epoch {#epoch}

A period of 32 [slots](#slot) (6.4 minutes) in the [Beacon Chain](#beacon-chain)-coordinated system. [Validator](#validator) [committees](#committee) are shuffled every epoch for security reasons. There's an opportunity at each epoch for the chain to be [finalized](#finality).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof-of-stake" />

### Ethereum Improvement Proposal (EIP) {#eip}

A design document providing information to the Ethereum community, describing a proposed new feature or its processes or environment (see [ERC](#erc)).

<DocLink to="/eips/" title="Introduction to EIPs" />

### Ethereum Name Service (ENS) {#ens}

The ENS registry is a single central [contract](#smart-contract) that provides a mapping from domain names to owners and resolvers, as described in [EIP](#eip) 137.

[Read more at github.com](https://github.com/ethereum/ens)

### entropy {#entropy}

In the context of cryptography, lack of predictability or level of randomness. When generating secret information, such as [private keys](#private-key), algorithms usually rely on a source of high entropy to ensure the output is unpredictable.

### externally owned account (EOA) {#eoa}

An [account](#account) created by or for human users of the Ethereum network.

### Ethereum Request for Comments (ERC) {#erc}

A label given to some [EIPs](#eip) that attempt to define a specific standard of Ethereum usage.

<DocLink to="/eips/" title="Introduction to EIPs" />

### Ethash {#ethash}

A [proof-of-work](#pow) algorithm for Ethereum 1.0.

[Read more at eth.wiki](https://eth.wiki/en/concepts/ethash/ethash)

### ether {#ether}

The native cryptocurrency used by the Ethereum ecosystem, which covers [gas](#gas) costs when executing transactions. Also writen as ETH or its symbol Ξ, the Greek uppercase Xi character.

<DocLink to="/eth/" title="Currency for our digital future" />

### events {#events}

Allows the use of [EVM](#evm) logging facilities. [Dapps](#dapp) can listen for events and use them to trigger JavaScript callbacks in the user interface.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="Events and Logs" />

### Ethereum Virtual Machine (EVM) {#evm}

A stack-based virtual machine that executes [bytecode](#bytecode). In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine.

<DocLink to="/developers/docs/evm/" title="Ethereum Virtual Machine" />

### EVM assembly language {#evm-assembly-language}

A human-readable form of EVM [bytecode](#bytecode).

<Divider />

## F {#section-f}

### fallback function {#fallback-function}

A default function called in the absence of data or a declared function name.

### faucet {#faucet}

A service carried out via [smart contract](#smart-contract) that dispenses funds in the form of free test ether that can be used on a testnet.

<DocLink to="/developers/docs/networks/#testnet-faucets" title="Testnet Faucets" />

### finality {#finality}

Finality is the guarantee that a set of transactions before a given time will not change and can't be reverted.

<DocLink to="/developers/docs/consensus-mechanisms/pow/#finality" title="Proof-of-work finality" />
<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality" title="Proof-of-stake finality" />

### finney {#finney}

A denomination of [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork {#fork}

A change in protocol causing the creation of an alternative chain, or a temporal divergence in two potential block paths during mining.

### fraud proof {#fraud-proof}

A security model for certain [layer 2](#layer-2) solutions where, to increase speed, transactions are [rolled up](#rollups) into batches and submitted to Ethereum in a single transaction. They are assumed valid but can be challenged if fraud is suspected. A fraud proof will then run the transaction to see if fraud took place. This method increases the amount of transactions possible while maintaining security. Some [rollups](#rollups) use [validity proofs](#validity-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups" title="Optimistic rollups" />

### frontier {#frontier}

The initial test development stage of Ethereum, which lasted from July 2015 to March 2016.

<Divider />

## G {#section-g}

### gas {#gas}

A virtual fuel used in Ethereum to execute smart contracts. The [EVM](#evm) uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources (see [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/" title="Gas and Fees" />

### gas limit {#gas-limit}

The maximum amount of [gas](#gas) a [transaction](#transaction) or [block](#block) may consume.

### genesis block {#genesis-block}

The first block in a [blockchain](#blockchain), used to initialize a particular network and its cryptocurrency.

### geth {#geth}

Go Ethereum. One of the most prominent implementations of the Ethereum protocol, written in Go.

[Read more at geth.ethereum.org](https://geth.ethereum.org/)

### gwei {#gwei}

Short for gigawei, a denomination of [ether](#ether), commonly utilized to price [gas](#gas). 1 gwei = 10<sup>9</sup> [wei](#wei). 10<sup>9</sup> gwei = 1 ether.

<Divider />

## H {#section-h}

### hard fork {#hard-fork}

A permanent divergence in the [blockchain](#blockchain); also known as a hard-forking change. One commonly occurs when nonupgraded nodes can't validate blocks created by upgraded nodes that follow newer [consensus rules](#consensus-rules). Not to be confused with a fork, soft fork, software fork, or Git fork.

### hash {#hash}

A fixed-length fingerprint of variable-size input, produced by a hash function. (See [keccak-256](#keccak-256))

### HD wallet {#hd-wallet}

A [wallet](#wallet) using the hierarchical deterministic (HD) key creation and transfer protocol.

[Read more at github.com](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki)

### HD wallet seed {#hd-wallet-seed}

A value used to generate the master [private key](#private-key) and master chain code for an HD [wallet](#wallet). The wallet seed can be represented by mnemonic words, making it easier for humans to copy, back up, and restore private keys.

### homestead {#homestead}

The second development stage of Ethereum, launched in March 2016 at block 1,150,000.

<Divider />

## I {#section-i}

### index {#index}

A network structure meant to optimize the querying of information from across the [blockchain](#blockchain) by providing an efficient path to its storage source.

### Inter-exchange Client Address Protocol (ICAP) {#icap}

An Ethereum address encoding that is partly compatible with the International Bank Account Number (IBAN) encoding, offering a versatile, checksummed, and interoperable encoding for Ethereum addresses. ICAP addresses use a new IBAN pseudo-country code- XE, standing for "eXtended Ethereum," as used in nonjurisdictional currencies (e.g., XBT, XRP, XCP).

### Ice Age {#ice-age}

A [hard fork](#hard-fork) of Ethereum at block 200,000 to introduce an exponential [difficulty](#difficulty) increase (aka [difficulty bomb](#difficulty-bomb)), motivating a transition to [proof-of-stake](#pos).

### integrated development environment (IDE) {#ide}

A user interface that typically combines a code editor, compiler, runtime, and debugger.

<DocLink to="/developers/docs/ides/" title="Integrated Development Environments" />

### immutable deployed code problem {#immutable-deployed-code-problem}

Once a [contract's](#smart-contract) (or [library's](#library)) code is deployed, it becomes immutable. Standard software development practices rely on being able to fix possible bugs and add new features, so this represents a challenge for smart contract development.

<DocLink to="/developers/docs/smart-contracts/deploying/" title="Deploying Smart Contracts" />

### internal transaction {#internal-transaction}

A [transaction](#transaction) sent from a [contract account](#contract-account) to another contract account or an [EOA](#eoa) (see [message](#message)).

<Divider />

## K {#section-k}

### key derivation function (KDF) {#kdf}

Also known as a "password stretching algorithm," it is used by [keystore](#keystore-file) formats to protect against brute-force, dictionary, and rainbow table attacks on passphrase encryption, by repeatedly hashing the passphrase.

<DocLink to="/developers/docs/security/" title="Security" />

### keccak-256 {#keccak-256}

Cryptographic [hash](#hash) function used in Ethereum. Keccak-256 was standardized as [SHA](#sha)-3.

### keystore file {#keystore-file}

A JSON-encoded file that contains a single (randomly generated) [private key](#private-key), encrypted by a passphrase for extra security.

<Divider />

## L {#section-l}

### layer 2 {#layer-2}

An area of development focused on layering improvements on top of the Ethereum protocol. These improvements are related to [transaction](#transaction) speeds, cheaper [transaction fees](#transaction-fee), and transaction privacy.

<DocLink to="/developers/docs/scaling/layer-2-rollups/" title="Layer 2" />

### LevelDB {#level-db}

An open source on-disk key-value store, implemented as a lightweight, single-purpose [library](#library), with bindings to many platforms.

### library {#library}

A special type of [contract](#smart-contract) that has no payable functions, no fallback function, and no data storage. Therefore, it cannot receive or hold ether, or store data. A library serves as previously deployed code that other contracts can call for read-only computation.

<DocLink to="/developers/docs/smart-contracts/libraries/" title="Smart Contract Libraries" />

### lightweight client {#lightweight-client}

An Ethereum client that does not store a local copy of the [blockchain](#blockchain), or validate blocks and [transactions](#transaction). It offers the functions of a [wallet](#wallet) and can create and broadcast transactions.

<Divider />

## M {#section-m}

### mainnet {#mainnet}

Short for "main network," this is the main public Ethereum [blockchain](#blockchain). Real ETH, real value, and real consequences. Also known as layer 1 when discussing [layer 2](#layer-2) scaling solutions. (Also, see [testnet](#testnet))

### Merkle Patricia trie {#merkle-patricia-tree}

A data structure used in Ethereum to efficiently store key-value pairs.

### message {#message}

An [internal transaction](#internal-transaction) that is never serialized and only sent within the [EVM](#evm).

### message call {#message-call}

The act of passing a [message](#message) from one account to another. If the destination account is associated with [EVM](#evm) code, then the VM will be started with the state of that object and the message acted upon.

### Metropolis {#metropolis}

The third development stage of Ethereum, launched in October 2017.

### miner {#miner}

A network [node](#node) that finds valid [proof-of-work](#pow) for new blocks, by repeated pass hashing (see [Ethash](#ethash)).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/" title="Mining" />

<Divider />

## N {#section-n}

### network {#network}

Referring to the Ethereum network, a peer-to-peer network that propagates transactions and blocks to every Ethereum node (network participant).

<DocLink to="/developers/docs/networks/" title="Networks" />

### non-fungible token (NFT) {#nft}

Also known as a "deed," this is a token standard introduced by the ERC-721 proposal. NFTs can be tracked and traded, but each token is unique and distinct; they are not interchangeable like ETH and [ERC-20 tokens](#token-standard). NFTs can represent ownership of digital or physical assets.

<DocLink to="/nft/" title="Non-Fungible Tokens (NFTs)" />
<DocLink to="/developers/docs/standards/tokens/erc-721/" title="ERC-721 Non-Fungible Token Standard" />

### node {#node}

A software client that participates in the network.

<DocLink to="/developers/docs/nodes-and-clients/" title="Nodes and Clients" />

<DocLink to="/developers/docs/nodes-and-clients/" title="Nodes and Clients" />

### nonce {#nonce}

In cryptography, a value that can only be used once. There are two types of nonce used in Ethereum- an account nonce is a transaction counter in each account, which is used to prevent replay attacks; a [proof-of-work](#pow) nonce is the random value in a block that was used to satisfy the [proof-of-work](#pow).

<Divider />

## O {#section-o}

### ommer (uncle) block {#ommer}

When a [miner](#miner) finds a valid [block](#block), another miner may have published a competing block which is added to the tip of the blockchain first. This valid, but stale, block can be included by newer blocks as _ommers_ and receive a partial block reward. The term "ommer" is the preferred gender-neutral term for the sibling of a parent block, but this is also sometimes referred to as an "uncle".

### Optimistic rollup {#optimistic-rollup}

A [rollup](#rollups) of transactions that use [fraud proofs](#fraud-proof) to offer increased [layer 2](#layer-2) transaction throughput while using the security provided by [mainnet](#mainnet) (layer 1). Unlike [Plasma](#plasma), a similar layer 2 solution, Optimistic rollups can handle more complex transaction types – anything possible in the [EVM](#evm). They do have latency issues compared to [Zero-knowledge rollups](#zk-rollups) because a transaction can be challenged via the fraud proof.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#optimistic-rollups" title="Optimistic Rollups" />

<Divider />

## P {#section-p}

### parity {#parity}

One of the most prominent interoperable implementations of the Ethereum client software.

### Plasma {#plasma}

An off-chain scaling solution that uses [fraud proofs](#fraud-proof), like [Optimistic rollups](#optimistic-rollups). Plasma is limited to simple transactions like basic token transfers and swaps.

<DocLink to="/developers/docs/scaling/plasma" title="Plasma" />

### private key (secret key) {#private-key}

A secret number that allows Ethereum users to prove ownership of an account or contracts, by producing a digital signature (see [public key](#public-key), [address](#address), [ECDSA](#ecdsa)).

### proof of stake (PoS) {#pos}

A method by which a cryptocurrency blockchain protocol aims to achieve distributed [consensus](#consensus). PoS asks users to prove ownership of a certain amount of cryptocurrency (their "stake" in the network) in order to be able to participate in the validation of transactions.

<DocLink to="/developers/docs/consensus-mechanisms/pos/" title="Proof of stake" />

### proof of work (PoW) {#pow}

A piece of data (the proof) that requires significant computation to find. In Ethereum, [miners](#miner) must find a numeric solution to the [Ethash](#ethash) algorithm that meets a network-wide [difficulty](#difficulty) target.

<DocLink to="/developers/docs/consensus-mechanisms/pow/" title="Proof of work" />

### public key {#public-key}

A number, derived via a one-way function from a [private key](#private-key), which can be shared publicly and used by anyone to verify a digital signature made with the corresponding private key.

<Divider />

## R {#section-r}

### receipt {#receipt}

Data returned by an Ethereum client to represent the result of a particular [transaction](#transaction), including a [hash](#hash) of the transaction, its [block](#block) number, the amount of [gas](#gas) used, and, in case of deployment of a [smart contract](#smart-contract), the [address](#address) of the contract.

### re-entrancy attack {#re-entrancy-attack}

An attack that consists of an attacker contract calling a victim contract function in such a way that during execution the victim calls the attacker contract again, recursively. This can result, for example, in the theft of funds by skipping parts of the victim contract that update balances or count withdrawal amounts.

<DocLink to="/developers/docs/security/#re-entrancy" title="Re-entrancy" />

### reward {#reward}

An amount of ether included in each new block as a reward by the network to the [miner](#miner) who found the [proof-of-work](#pow) solution.

### Recursive Length Prefix (RLP) {#rlp}

An encoding standard designed by the Ethereum developers to encode and serialize objects (data structures) of arbitrary complexity and length.

### rollups {#rollups}

A type of [layer 2](#layer-2) scaling solution that batches multiple transactions and submits them to [the Ethereum main chain](#mainnet) in a single transaction. This allows for reductions in [gas](#gas) costs and increases in [transaction](#transaction) throughput. There are Optimistic and Zero-knowledge rollups which use different security methods to offer these scalability gains.

<DocLink to="/developers/docs/scaling/layer-2-rollups/" title="Rollups" />

<Divider />

## S {#section-s}

### Serenity {#serenity}

The fourth and final development stage of Ethereum, otherwise known as Ethereum 2.0.

<DocLink to="/eth2/" title="Ethereum 2.0 (Eth2)" />

### Secure Hash Algorithm (SHA) {#sha}

A family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST).

### shard / shard chain {#shard}

A [proof-of-stake](#proof-of-stake) chain that is coordinated by the [Beacon Chain](#beacon-chain) and secured by [validators](#validator). There will be 64 added to the network as part of the Eth2 shard chain upgrade. Shard chains will offer increased transaction throughput for Ethereum by providing additional data to [layer 2](#layer-2) solutions like [optimistic rollups](#optimistic-rollups) and [ZK-rollups](#zk-rollups).

<DocLink to="/eth2/shard-chains" title="Shard chains" />

### sidechain {#sidechain}

A scaling solution that uses a separate chain with different, often faster, [consensus rules](#consensus-rules). A bridge is needed to connect these sidechains to [mainnet](#mainnet). [Rollups](#rollups) also use sidechains, but they operate in collaboration with [mainnet](#mainnet) instead.

<DocLink to="/developers/docs/scaling/sidechains/" title="Sidechains" />

### singleton {#singleton}

A computer programming term that describes an object of which only a single instance can exist.

### slot {#slot}

A period of time (12 seconds) in which a new [Beacon Chain](#beacon-chain) and [shard](#shard) chain block can be proposed by a [validator](#validator) in the [proof-of-stake](#proof-of-stake) system. A slot may be empty. 32 slots make up an [epoch](#epoch).

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work" title="Proof-of-stake" />

### smart contract {#smart-contract}

A program that executes on the Ethereum computing infrastructure.

<DocLink to="/developers/docs/smart-contracts/" title="Introduction to Smart Contracts" />

### Solidity {#solidity}

A procedural (imperative) programming language with syntax that is similar to JavaScript, C++, or Java. The most popular and most frequently used language for Ethereum [smart contracts](#smart-contract). Created by Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" />

### Solidity inline assembly {#solidity-inline-assembly}

[EVM](#evm) assembly language in a [Solidity](#solidity) program. Solidity's support for inline assembly makes it easier to write certain operations.

### Spurious Dragon {#spurious-dragon}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,675,000 to address more denial-of-service attack vectors and clear state (see [Tangerine Whistle](#tangerine-whistle)). Also, a replay attack protection mechanism (see [nonce](#nonce)).

### stablecoin {#stablecoin}

An [ERC-20 token](#token-standard) with a value pegged to another asset's value. There are stablecoins backed by fiat currency like dollars, precious metals like gold, and other cryptocurrencies like Bitcoin.

<DocLink to="/eth/#tokens" title="ETH isn't the only crypto on Ethereum" />

### staking {#staking}

Depositing a quantity of [ether](#ether) (your stake) to become a validator and secure the [network](#network). A validator checks [transactions](#transaction) and proposes [blocks](#block) under a [proof-of-stake](#pos) consensus model. Staking gives you an economic incentive to act in the best interests of the network. You'll get rewards for carrying out your [validator](#validator) duties, but lose varying amounts of ETH if you don't.

<DocLink to="/eth2/staking/" title="Stake your ETH to become an Ethereum validator" />

### state channels {#state-channels}

A [layer 2](#layer-2) solution where a channel is set up between participants, where they can transact freely and cheaply. Only a [transaction](#transaction) to set up the channel and close the channel is sent to [mainnet](#mainnet). This allows for very high transaction throughput, but does rely on knowing number of participants up front and locking up of funds.

<DocLink to="/developers/docs/scaling/state-channels/#state-channels" title="State channels" />

### szabo {#szabo}

A denomination of [ether](#ether). 1 szabo = 10<sup>12</sup> [wei](#wei), 10<sup>6</sup> szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,463,000 to change the [gas](#gas) calculation for certain I/O-intensive operations and to clear the accumulated state from a denial-of-service attack, which exploited the low gas cost of those operations.

### testnet {#testnet}

Short for "test network," a network used to simulate the behavior of the main Ethereum network (see [mainnet](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets" title="Testnets" />

### token standard {#token-standard}

Introduced by ERC-20 proposal, this provides a standardized [smart contract](#smart-contract) structure for fungible tokens. Tokens from the same contract can be tracked, traded, and are interchangeable, unlike [NFTs](#nft).

<DocLink to="/developers/docs/standards/tokens/erc-20/" title="ERC-20 Token Standard" />

### transaction {#transaction}

Data committed to the Ethereum Blockchain signed by an originating [account](#account), targeting a specific [address](#address). The transaction contains metadata such as the [gas limit](#gas-limit) for that transaction.

<DocLink to="/developers/docs/transactions/" title="Transactions" />

### transaction fee {#transaction-fee}

A fee you need to pay whenever you use the Ethereum network. Examples include sending funds from your [wallet](#wallet) or a [dapp](#dapp) interaction, like swapping tokens or buying a collectible. You can think of this like a service charge. This fee will change based on how busy the network is. This is because [miners](#miner), the people responsible for processing your transaction, are likely to prioritise transactions with higher fees – so congestion forces the price up.

At a technical level, your transaction fee relates to how much [gas](#gas) your transaction requires.

Reducing transaction fees is a subject of intense interest right now. See [Layer 2](#layer-2)

### Turing complete {#turing-complete}

A concept named after English mathematician and computer scientist Alan Turing- a system of data-manipulation rules (such as a computer's instruction set, a programming language, or a cellular automaton) is said to be "Turing complete" or "computationally universal" if it can be used to simulate any Turing machine.

<Divider />

## V {#section-v}

### validator {#validator}

A [node](#node) in a [proof-of-stake](#proof-of-stake) system responsible for storing data, processing transactions, and adding new blocks to the blockchain. To active validator software, you need to be able to [stake](#staking) 32 ETH.

<DocLink to="/developers/docs/consenus-mechanisms/pos" title="Proof of stake" />
<DocLink to="/eth2/staking/" title="Staking in Ethereum" />

### Validity proof {#validity-proof}

A security model for certain [layer 2](#layer-2) solutions where, to increase speed, transactions are [rolled up](/#rollups) into batches and submitted to Ethereum in a single transaction. The transaction computation is done off-chain and then supplied to the main chain with a proof of their validity. This method increases the amount of transactions possible while maintaining security. Some [rollups](#rollups) use [fraud proofs](#fraud-proof).

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups" title="Zero-knowledge rollups" />

### Validium {#validium}

An off-chain solution that uses [validity proofs](#validity-proof) to improve transaction throughput. Unlike [Zero-knowledge rollups](#zk-rollup), Validium data isn't stored on layer 1 [mainnet](#mainnet).

<DocLink to="/developers/docs/scaling/validium/" title="Validium" />

### Vyper {#vyper}

A high-level programming language with Python-like syntax. Intended to get closer to a pure functional language. Created by Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" />

<Divider />

## W {#section-w}

### wallet {#wallets}

Software that holds [private keys](#private-key). Used to access and control Ethereum [accounts](#account) and interact with [smart contracts](#smart-contract). Keys need not be stored in a wallet, and can instead be retrieved from offline storage (i.e. a memory card or paper) for improved security. Despite the name, wallets never store the actual coins or tokens.

<DocLink to="/wallets/" title="Ethereum Wallets" />

### Web3 {#web3}

The third version of the web. First proposed by Dr. Gavin Wood, Web3 represents a new vision and focus for web applications- from centrally owned and managed applications, to applications built on decentralized protocols (see [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 vs Web3" />

### wei {#wei}

The smallest denomination of [ether](#ether). 10<sup>18</sup> wei = 1 ether.

<Divider />

## Z {#section-z}

### zero address {#zero-address}

A special Ethereum address, composed entirely of zeros, that is specified as the destination address of a [contract creation transaction](#contract-creation-transaction).

### Zero-knowledge rollup {#zk-rollup}

A [rollup](#rollups) of transactions that use [validity proofs](#validity-proof) to offer increased [layer 2](#layer-2) transaction throughput while using the security provided by [mainnet](#mainnet) (layer 1). Although they can't handle complex transaction types, like [Optimistic rollups](#optimistic-rollups), they don't have latency issues because transactions are provably valid when submitted.

<DocLink to="/developers/docs/scaling/layer-2-rollups/#zk-rollups" title="Zero-knowledge Rollups" />

<Divider />

## Sources {#sources}

_Provided in part by [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) by [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) under CC-BY-SA_

<Divider />

## Contribute to this page {#contribute-to-this-page}

Did we miss something? Is something incorrect? Help us improve by contributing to this glossary on GitHub!

[Learn more about how to contribute](/en/contributing/adding-glossary-terms)
