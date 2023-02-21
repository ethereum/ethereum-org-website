---
title: Ethereum Glossary
description: An incomplete glossary of technical and non-technical terms related to Ethereum
lang: en
sidebarDepth: 2
---

# Glossary {#ethereum-glossary}

<Divider />

## \# {#section-numbers}

### 51% attack {#51-attack}

A type of attack on a decentralized [network](#network) where a group gains control of the majority of [nodes](#node). This would allow them to defraud the blockchain by reversing [transactions](#transaction) and double spending [ether](#ether) and other tokens.

## A {#section-a}

### account {#account}

An object containing an [address](#address), balance, [nonce](#nonce), and optional storage and code. An account can be a [contract account](#contract-account) or an [externally owned account (EOA)](#eoa).

<DocLink to="/developers/docs/accounts">
  Ethereum Accounts
</DocLink>

### address {#address}

Most generally, this represents an [EOA](#eoa) or [contract](#contract-account) that can receive (destination address) or send (source address) [transactions](#transaction) on the blockchain. More specifically, it is the rightmost 160 bits of a [Keccak hash](#keccak-256) of an [ECDSA](#ecdsa) [public key](#public-key).

### application binary interface (ABI) {#abi}

The standard way to interact with [contracts](#contract-account) in the Ethereum ecosystem,
both from outside the blockchain and for contract-to-contract interactions.

<DocLink to="/developers/docs/smart-contracts/compiling/#web-applications">
  ABI
</DocLink>

### application programming interface {#api}

An Application Programming Interface (API) is a set of definitions for how to use a piece of software. An API sits between an application and a web server, and facilitates the transfer of data between them.

### ASIC {#asic}

Application-specific integrated circuit. This usually refers to an integrated circuit, custom-built for cryptocurrency mining.

### assert {#assert}

In [Solidity](#solidity), `assert(false)` compiles to `0xfe`, an invalid opcode, which uses up all remaining [gas](#gas) and reverts all changes. When an `assert()` statement fails, something very wrong and unexpected is happening, and you will need to fix your code. You should use `assert()` to avoid conditions that should never, ever occur.

<DocLink to="/developers/docs/smart-contracts/security/">
  Smart contract security
</DocLink>

### attestation {#attestation}

A claim made by an entity that something is true. In context of Ethereum, consensus validators must make a claim as to what they believe the state of the chain to be. At designated times, each validator is responsible for publishing different attestations that formally declare this validator's view of the chain, including the last finalized checkpoint and the current head of the chain.

<DocLink to="/developers/docs/consensus-mechanisms/pos/attestations/">
  Attestations
</DocLink>

<Divider />

## B {#section-b}

### Base Fee {#base-fee}

Every [block](#block) has a reserve price known as the 'base fee'. It is the minimum [gas](#gas) fee a user must pay to include a transaction in the next block.

<DocLink to="/developers/docs/gas/">
  Gas and fees
</DocLink>

### Beacon Chain {#beacon-chain}

The Beacon Chain was the blockchain that introduced [proof-of-stake](#pos) and [validators](#validator) to Ethereum. It ran alongside the proof-of-work Ethereum Mainnet from December 2020 until the two chains were merged in September 2022 to form the Ethereum of today.

<DocLink to="/upgrades/beacon-chain/">
  Beacon Chain
</DocLink>

### big-endian {#big-endian}

A positional number representation where the most significant digit is first in memory. The opposite of little-endian, where the least significant digit is first.

### block {#block}

A block is a bundled unit of information that include an ordered list of transactions and consensus-related information. Blocks are proposed by proof-of-stake validators, at which point they are shared across the entire peer-to-peer network, where they can easily be independently verified by all other nodes. Consensus rules govern what contents of a block are considered valid, and any invalid blocks are disregarded by the network. The ordering of these blocks and the transactions therein create a deterministic chain of events with the end representing the current state of the network.

<DocLink to="/developers/docs/blocks/">
  Blocks
</DocLink>

### block explorer {#block-explorer}

An interface that allows a user to search for information from, and about, a blockchain. This includes retrieving individual transactions, activity associated with specific addresses and information about the network.

### block header {#block-header}

The block header is a collection of metadata about a block and a summary of the transactions included in the execution payload.

### block propagation {#block-propagation}

The process of transmitting a confirmed block to all other nodes in the network.

### block proposer {#block-proposer}

The specific validator chosen to create a block in a particular [slot](#slot).

### block reward {#block-reward}

The amount of ether rewarded to the proposer of a new valid block.

### block status {#block-status}

The states that a block can exist in. The possible states include:

- proposed: the block was proposed by a validator
- scheduled: validators are currently submitting data
- missed/skipped: the proposer did not propose a block within the eligible time frame.
- orphaned: the block was reorg'd out by the [fork choice algorithm](#fork-choice-algorithm)

### block time {#block-time}

The time interval between blocks being added to the blockchain.

### block validation {#block-validation}

The process of checking that a new block contains valid transactions and signatures, builds on the heaviest historical chain, and follows all other consensus rules. Valid blocks are added to the end of the chain and propagated to others on the network. Invalid blocks are disregarded.

### blockchain {#blockchain}

A sequence of [blocks](#block), each linking to its predecessor all the way to the [genesis block](#genesis-block) by referencing the hash of the previous block. The integrity of the blockchain is crypto-economically secured using a proof-of-stake-based consensus mechanism.

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain">
  What is a blockchain?
</DocLink>

### bootnode {#bootnode}

The nodes which can be used to initiate the discovery process when running a node. The endpoints of these nodes are recorded in the Ethereum source code.

### bytecode {#bytecode}

An abstract instruction set designed for efficient execution by a software interpreter or a virtual machine. Unlike human-readable source code, bytecode is expressed in numeric format.

### Byzantium fork {#byzantium-fork}

The first of two [hard forks](#hard-fork) for the [Metropolis](#metropolis) development stage. It included EIP-649 Metropolis [Difficulty Bomb](#difficulty-bomb) Delay and Block Reward Reduction, where the [Ice Age](#ice-age) was delayed by 1 year and the block reward was reduced from 5 to 3 ether.

<Divider />

## C {#section-c}

### Casper-FFG {#casper-ffg}

Casper-FFG is a proof-of-stake consensus protocol used in conjunction with the [LMD-GHOST](#lmd-ghost) fork choice algorithm to allow [consensus clients](#consensus-client) to agree on the head of the Beacon Chain.

### checkpoint {#checkpoint}

The [Beacon Chain](#beacon-chain) has a tempo divided into slots (12 seconds) and epochs (32 slots). The first slot in each epoch is a checkpoint. When a [supermajority](#supermajority) of validators attests to the link between two checkpoints, they can be [justified](#justification) and then when another checkpoint is justified on top, they can be [finalized](#finality).

### compiling {#compiling}

Converting code written in a high-level programming language (e.g., [Solidity](#solidity)) into a lower-level language (e.g., EVM [bytecode](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/">
  Compiling Smart Contracts
</DocLink>

### committee {#committee}

A group of at least 128 [validators](#validator) assigned to validate blocks in each slot. One of the validators in the committee is the aggregator, responsible for aggregating the signatures of all other validators in the committee that agree on an attestation. Not to be confused with [sync committee](#sync-committee).

### computational infeasibility {#computational-infeasibility}

A process is computationally infeasible if it would take an impracticably long time (eg. billions of years) to do it for anyone who might conceivably have an interest in carrying it out.

### consensus {#consensus}

When a supermajority of nodes on the network all have the same blocks in their locally validated best blockchain. Not to be confused with [consensus rules](#consensus-rules).

### consensus client {#consensus-client}

Consensus clients (such as Prysm, Teku, Nimbus, Lighthouse, Lodestar) run Ethereum's [proof-of-stake](#pos) consensus algorithm allowing the network to reach agreement about the head of the Beacon Chain. Consensus clients do not participate in validating/broadcasting transactions or executing state transitions. This is done by [execution clients](#execution-client).

### consensus layer {#consensus-layer}

Ethereum's consensus layer is the network of [consensus clients](#consensus-client).

### consensus rules {#consensus-rules}

The block validation rules that full nodes follow to stay in consensus with other nodes. Not to be confused with [consensus](#consensus).

### Considered for Inclusion (CFI) {#cfi}

A Core [EIP](#eip) which is not yet active on Mainnet, and client developers are generally positive towards the idea. Assuming it meets all the requirements for mainnet inclusion, it could potentially be included in a network upgrade (not necessarily the next one).

### Constantinople fork {#constantinople-fork}

The second part of the [Metropolis](#metropolis) stage, originally planned for mid-2018. Expected to include a switch to a hybrid [proof-of-work](#pow)/[proof-of-stake](#pos) consensus algorithm, among other changes.

### contract account {#contract-account}

An account containing code that executes whenever it receives a [transaction](#transaction) from another [account](#account) ([EOA](#eoa) or [contract](#contract-account)).

### contract creation transaction {#contract-creation-transaction}

A special [transaction](#transaction) that includes a contract's initiation code. The recipient is set to `null` and the contract is deployed to an address generated from the user address and `nonce`. that is used to register a [contract](#contract-account) and record it on the Ethereum blockchain.

### cryptoeconomics {#cryptoeconomics}

The economics of cryptocurrencies.

## D {#section-d}

### Đ {#d-with-stroke}

Đ (D with stroke) is used in Old English, Middle English, Icelandic, and Faroese to stand for an uppercase letter “Eth”. It is used in words like ĐEV or Đapp (decentralized application), where the Đ is the Norse letter “eth”. The uppercase eth (Ð) is also used to symbolize the cryptocurrency Dogecoin. This is commonly seen in older Ethereum literature but is used less often today.

### DAG {#dag}

DAG stands for Directed Acyclic Graph. It is a data structure composed of nodes and links between them. Before The Merge, Ethereum used a DAG in its [proof-of-work](#pow) algorithm, [Ethash](#ethash), but is no longer used in [proof-of-stake](#pos).

### Dapp {#dapp}

Decentralized application. At a minimum, it is a [smart contract](#smart-contract) and a web user interface. More broadly, a dapp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services. In addition, many dapps include decentralized storage and/or a message protocol and platform.

<DocLink to="/developers/docs/dapps/">
  Introduction to dapps
</DocLink>

### data availability {#data-availability}

The property of a state that any node connected to the network could download any specific part of the state that they wish to.

### decentralization {#decentralization}

The concept of moving the control and execution of processes away from a central entity.

### decentralized autonomous organization (DAO) {#dao}

A company or other organization that operates without hierarchical management. DAO may also refer to a contract named "The DAO" launched on April 30, 2016, which was then hacked in June 2016; this ultimately motivated a [hard fork](#hard-fork) (codenamed DAO) at block 1,192,000, which reversed the hacked DAO contract and caused Ethereum and Ethereum Classic to split into two competing systems.

<DocLink to="/dao/">
  Decentralized autonomous organizations (DAOs)
</DocLink>

### decentralized exchange (DEX) {#dex}

A type of [dapp](#dapp) that lets you swap tokens with peers on the network. You need [ether](#ether) to use one (to pay [transactions fees](#transaction-fee)) but they are not subject to geographical restrictions like centralized exchanges – anyone can participate.

<DocLink to="/get-eth/#dex">
  Decentralized exchanges
</DocLink>

### deed {#deed}

See [non-fungible token (NFT)](#nft).

### deposit contract {#deposit-contract}

The gateway to staking on Ethereum. The deposit contract is a smart contract on Ethereum that accepts deposits of ETH and manages validator balances. A validator cannot be activated without depositing ETH into this contract. The contract requires ETH and input data. This input data includes the validator public key and withdrawal public key, signed by the validator private key. This data is needed for a validator to be identified and approved by the [proof-of-stake](#pos) network.

### DeFi {#defi}

Short for "decentralized finance," a broad category of [dapps](#dapp) aiming to provide financial services backed by the blockchain, without any intermediaries, so anyone with an internet connection can participate.

<DocLink to="/defi/">
  Decentralized Finance (DeFi)
</DocLink>

### difficulty {#difficulty}

A network-wide setting in [proof-of-work](#pow) networks that controls how much average computation is required to find a valid nonce. The difficulty is represented by the number of leading zeroes that are required in the resulting block hash for it to be considered valid. This concept is deprecated in Ethereum since the transition to proof-of-stake.

### difficulty bomb {#difficulty-bomb}

Planned exponential increase in [proof-of-work](#pow) [difficulty](#difficulty) setting that was designed to motivate the transition to [proof-of-stake](#pos), reducing the chances of a [fork](#hard-fork). The difficulty bomb was deprecated with the [transition to proof-of-stake](/upgrades/merge).

### digital signature {#digital-signatures}

A short string of data a user produces for a document using a [private key](#private-key) such that anyone with the corresponding [public key](#public-key), the signature, and the document can verify that (1) the document was "signed" by the owner of that particular private key, and (2) the document was not changed after it was signed.

<Divider />

### discovery {#discovery}

The process by which an Ethereum node finds other nodes to connect to.

### distributed hash table (DHT) {#distributed-hash-table}

A data structure containing `(key, value)` pairs used by Ethereum nodes to identify peers to connect to and determine which protocols to use to communicate.

### double spend {#double-spend}

A deliberate blockchain fork, where a user with a sufficiently large amount of mining power/stake sends a transaction moving some currency off-chain (e.g. exiting into fiat money or making an off-chain purchase) then reorganizing the blockchain to remove that transaction. A successful double spend leaves the attacker with both their on and off-chain assets.

## E {#section-e}

### elliptic curve digital signature algorithm (ECDSA) {#ecdsa}

A cryptographic algorithm used by Ethereum to ensure that funds can only be spent by their owners. It's the preferred method for creating public and private keys. Relevant for account [address](#address) generation and [transaction](#transaction) verification.

### encryption {#encryption}

Encryption is the conversion of electronic data into a form unreadable by anyone except the owner of the correct decryption key.

### entropy {#entropy}

In the context of cryptography, lack of predictability or level of randomness. When generating secret information, such as [private keys](#private-key), algorithms usually rely on a source of high entropy to ensure the output is unpredictable.

### epoch {#epoch}

A period of 32 [slots](#slot), each slot being 12 seconds, totalling 6.4 minutes. Validator [committees](#committee) are shuffled every epoch for security reasons. Each epoch has an opportunity for the chain to be [finalized](#finality). Each validator is assigned new responsibilities at the start of each epoch.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#how-does-validation-work">
  Proof-of-stake
</DocLink>

### equivocation {#equivocation}

A validator sending two messages that contradict each other. One simple example is a transaction sender sending two transactions with the same nonce. Another is a block proposer proposing two blocks at the same block height (or for the same slot).

### Eth1 {#eth1}

'Eth1' is a term that referred to Mainnet Ethereum, the existing proof-of-work blockchain. This term has since been deprecated in favor of the 'execution layer'. [Learn more about this name change](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  More on the Ethereum upgrades
</DocLink>

### Eth2 {#eth2}

'Eth2' is a term that referred to a set of Ethereum protocol upgrades, including Ethereum's transition to proof-of-stake. This term has since been deprecated in favor of the 'consensus layer'. [Learn more about this name change](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming/).

<DocLink to="/upgrades/">
  More on the Ethereum upgrades
</DocLink>

### Ethereum Improvement Proposal (EIP) {#eip}

A design document providing information to the Ethereum community, describing a proposed new feature or its processes or environment (see [ERC](#erc)).

<DocLink to="/eips/">
  Introduction to EIPs
</DocLink>

### Ethereum Name Service (ENS) {#ens}

The ENS registry is a single central [contract](#smart-contract) that provides a mapping from domain names to owners and resolvers, as described in [EIP](#eip) 137.

[Read more at ens.domains](https://ens.domains)

### execution client {#execution-client}

Execution clients (formerly known as "Eth1 clients"), such as Besu, Erigon, Go-Ethereum (Geth), Nethermind, are tasked with processing and broadcasting transactions and managing Ethereum's state. They run the computations for each transaction using the [Ethereum Virtual Machine](#evm) to ensure that the rules of the protocol are followed.

### execution layer {#execution-layer}

Ethereum's execution layer is the network of [execution clients](#execution-client).

### externally owned account (EOA) {#eoa}

Externally owned accounts (EOAs) are [accounts](#account) that are controlled by [private keys](#private-key), typically generated using a [seed phrase](#hd-wallet-seed). Unlike smart contracts, externally owned accounts are accounts without any code associated with them. Typically these accounts are managed with a [wallet](#wallet).

### Ethereum Request for Comments (ERC) {#erc}

A label given to some [EIPs](#eip) that attempt to define a specific standard of Ethereum usage.

<DocLink to="/eips/">
  Introduction to EIPs
</DocLink>

### Ethash {#ethash}

A [proof-of-work](#pow) algorithm that was used on Ethereum before it transitioned to [proof-of-stake](#pos).

[Read more](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethash)

### ether {#ether}

The native cryptocurrency used by the Ethereum ecosystem, which covers [gas](#gas) costs when executing transactions. Also written as ETH or its symbol Ξ, the Greek uppercase Xi character.

<DocLink to="/eth/">
  Currency for our digital future
</DocLink>

### events {#events}

Allows the use of [EVM](#evm) logging facilities. [Dapps](#dapp) can listen for events and use them to trigger JavaScript callbacks in the user interface.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs">
  Events and Logs
</DocLink>

### Ethereum Virtual Machine (EVM) {#evm}

A stack-based virtual machine that executes [bytecode](#bytecode). In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine.

<DocLink to="/developers/docs/evm/">
  Ethereum Virtual Machine
</DocLink>

### EVM assembly language {#evm-assembly-language}

A human-readable form of EVM [bytecode](#bytecode).

<Divider />

## F {#section-f}

### fallback function {#fallback-function}

A default function called in the absence of data or a declared function name.

### faucet {#faucet}

A service carried out via [smart contract](#smart-contract) that dispenses funds in the form of free test ether that can be used on a testnet.

<DocLink to="/developers/docs/networks/#testnet-faucets">
  Testnet faucets
</DocLink>

### finality {#finality}

Finality is the guarantee that a set of transactions before a given time will not change and can't be reverted.

<DocLink to="/developers/docs/consensus-mechanisms/pos/#finality">
  Proof-of-stake finality
</DocLink>

### finney {#finney}

A denomination of [ether](#ether). 1 finney = 10<sup>15</sup> [wei](#wei). 10<sup>3</sup> finney = 1 ether.

### fork {#fork}

A change in protocol causing the creation of an alternative chain or a temporal divergence into two potential block paths.

### fork-choice algorithm {#fork-choice-algorithm}

The algorithm used to identify the head of the blockchain. On the execution layer the head of the chain is identified as the one with the greatest total difficulty behind it. This means the true head of the chain is the one that required the most work to mine it. On the consensus layer the algorithm observes the accumulated attestations from validators ([LMD_GHOST](#lmd-ghost)).

### fraud proof {#fraud-proof}

A security model for certain [layer 2](#layer-2) solutions where, to increase speed, transactions are [rolled up](#rollups) into batches and submitted to Ethereum in a single transaction. They are assumed valid but can be challenged if fraud is suspected. A fraud proof will then run the transaction to see if fraud took place. This method increases the amount of transactions possible while maintaining security. Some [rollups](#rollups) use [validity proofs](#validity-proof).

<DocLink to="/developers/docs/scaling/optimistic-rollups/">
  Optimistic rollups
</DocLink>

### frontier {#frontier}

The initial test development stage of Ethereum, which lasted from July 2015 to March 2016.

<Divider />

## G {#section-g}

### gas {#gas}

A virtual fuel used in Ethereum to execute smart contracts. The [EVM](#evm) uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources (see [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/">
  Gas and Fees
</DocLink>

### gas limit {#gas-limit}

The maximum amount of [gas](#gas) a [transaction](#transaction) or [block](#block) may consume.

### gas price {#gas-price}

Price in ether of one unit of gas specified in a transaction.

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

A fixed-length fingerprint of variable-size input, produced by a hash function. (See [keccak-256](#keccak-256)).

### hashrate {#hash-rate}

The number of hash calculations made per second by computers running mining software.

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

<DocLink to="/developers/docs/ides/">
  Integrated Development Environments
</DocLink>

### immutable deployed code problem {#immutable-deployed-code-problem}

Once a [contract's](#smart-contract) (or [library's](#library)) code is deployed, it becomes immutable. Standard software development practices rely on being able to fix possible bugs and add new features, so this represents a challenge for smart contract development.

<DocLink to="/developers/docs/smart-contracts/deploying/">
  Deploying Smart Contracts
</DocLink>

### internal transaction {#internal-transaction}

A [transaction](#transaction) sent from a [contract account](#contract-account) to another contract account or an [EOA](#eoa) (see [message](#message)).

<Divider />

### issuance

The minting of new ether to reward block proposal, attestation and whistle-blowing.

## K {#section-k}

### key derivation function (KDF) {#kdf}

Also known as a "password stretching algorithm," it is used by [keystore](#keystore-file) formats to protect against brute-force, dictionary, and rainbow table attacks on passphrase encryption, by repeatedly hashing the passphrase.

<DocLink to="/developers/docs/smart-contracts/security/">
  Smart contract security
</DocLink>

### keystore {#keyfile}

Every account’s private key/address pair exists as a single keyfile in an Ethereum client. These are JSON text files which contains the encrypted private key of the account, which can only be decrypted with the password entered during account creation.

### keccak-256 {#keccak-256}

Cryptographic [hash](#hash) function used in Ethereum. Keccak-256 was standardized as [SHA](#sha)-3.

<Divider />

## L {#section-l}

### layer 2 {#layer-2}

An area of development focused on layering improvements on top of the Ethereum protocol. These improvements are related to [transaction](#transaction) speeds, cheaper [transaction fees](#transaction-fee), and transaction privacy.

<DocLink to="/layer-2/">
  Layer 2
</DocLink>

### LevelDB {#level-db}

An open source on-disk key-value store, implemented as a lightweight, single-purpose [library](#library), with bindings to many platforms.

### library {#library}

A special type of [contract](#smart-contract) that has no payable functions, no fallback function, and no data storage. Therefore, it cannot receive or hold ether, or store data. A library serves as previously deployed code that other contracts can call for read-only computation.

<DocLink to="/developers/docs/smart-contracts/libraries/">
  Smart Contract Libraries
</DocLink>

### light client {#light-client}

An Ethereum client that does not store a local copy of the [blockchain](#blockchain), or validate blocks and [transactions](#transaction). It offers the functions of a [wallet](#wallet) and can create and broadcast transactions.

<Divider />

### LMD_GHOST {#lmd-ghost}

The [fork-choice algorithm](#fork-choice-algorithm) used by Ethereum's consensus clients to identify the head of the chain. LMD-GHOST is an acronym standing for "Latest Message Driven Greediest Heaviest Observed SubTree" which means that the head of the chain is the block with the greatest accumulation of [attestations](#attestation) in its history.

## M {#section-m}

### Mainnet {#mainnet}

Short for "main network," this is the main public Ethereum [blockchain](#blockchain). Real ETH, real value, and real consequences. Also known as layer 1 when discussing [layer 2](#layer-2) scaling solutions. (Also, see [testnet](#testnet)).

<DocLink to="/developers/docs/networks/">
  Ethereum networks
</DocLink>

### memory-hard {#memory-hard}

Memory hard functions are processes that experience a drastic decrease in speed or feasibility when the amount of available memory even slightly decreases. An example is the Ethereum mining algorithm [Ethash](#ethash).

### Merkle Patricia trie {#merkle-patricia-tree}

A data structure used in Ethereum to efficiently store key-value pairs.

### message {#message}

An [internal transaction](#internal-transaction) that is never serialized and only sent within the [EVM](#evm).

### message call {#message-call}

The act of passing a [message](#message) from one account to another. If the destination account is associated with [EVM](#evm) code, then the VM will be started with the state of that object and the message acted upon.

### Metropolis {#metropolis}

The third development stage of Ethereum, launched in October 2017.

### mining {#mining}

The process of repeatedly hashing a block header while incrementing a [nonce](#nonce) until the result contains an arbitrary number of leading binary zeros. This is the process by which new [blocks](#block) are added to a proof-of-work [blockchain](#blockchain). This was how Ethereum was secured before it moved to [proof-of-stake](#pos).

### miner {#miner}

A network [node](#node) that finds valid [proof-of-work](#pow) for new blocks, by repeated pass hashing (see [Ethash](#ethash)). Miners are no longer part of Ethereum - they were replaced by validators when Ethereum moved to [proof-of-stake](#pos).

<DocLink to="/developers/docs/consensus-mechanisms/pow/mining/">
  Mining
</DocLink>

### mint {#mint}

Minting is the process of creating new tokens and bringing them into circulation so that they can be used. It's a decentralized mechanism to create a new token without the involvement of the central authority.

<Divider />

## N {#section-n}

### network {#network}

Referring to the Ethereum network, a peer-to-peer network that propagates transactions and blocks to every Ethereum node (network participant).

<DocLink to="/developers/docs/networks/">
  Networks
</DocLink>

### network hashrate {#network-hashrate}

The collective [hashrate](#hashrate) produced by an entire mining network. Mining on Ethereum was switched off when Ethereum moved to [proof-of-stake](#pos).

### non-fungible token (NFT) {#nft}

Also known as a "deed," this is a token standard introduced by the ERC-721 proposal. NFTs can be tracked and traded, but each token is unique and distinct; they are not interchangeable like ETH and [ERC-20 tokens](#token-standard). NFTs can represent ownership of digital or physical assets.

<DocLink to="/nft/">
  Non-Fungible Tokens (NFTs)
</DocLink>
<DocLink to="/developers/docs/standards/tokens/erc-721/">
  ERC-721 Non-Fungible Token Standard
</DocLink>

### node {#node}

A software client that participates in the network.

<DocLink to="/developers/docs/nodes-and-clients/">
  Nodes and Clients
</DocLink>

### nonce {#nonce}

In cryptography, a value that can only be used once. An account nonce is a transaction counter in each account, which is used to prevent replay attacks.

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

<DocLink to="/upgrades/">
  Ethereum upgrades
</DocLink>

### serialization {#serialization}

The process of converting a data structure into a sequence of bytes.

### shard / shard chain {#shard}

Shard chains are discrete sections of the total blockchain that can subsets of validators can be responsible for. This will offer increased transaction throughput for Ethereum and improve data availability for [layer 2](#layer-2) solutions like [optimistic rollups](#optimistic-rollups) and [ZK-rollups](#zk-rollups).

<DocLink to="/upgrades/shard-chains">
  Shard chains
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

A period of time (12 seconds) in which a new blocks can be proposed by a [validator](#validator) in the [proof-of-stake](#pos) system. A slot may be empty. 32 slots make up an [epoch](#epoch).

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

An Ethereum address, composed entirely of zeros, that is frequently used as a burn address for unwanted funds.

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
