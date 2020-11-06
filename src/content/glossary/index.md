---
title: Ethereum Glossary
description: An incomplete glossary of technical and non-technical terms related to Ethereum
lang: en
sidebar: true
sidebarDepth: 2
---

# Glossary {#ethereum-glossary}

<Divider />

## A {#section-a}

### account {#account}

An object containing an [address](#address), balance, [nonce](#nonce), and optional storage and code. An account can be a [contract account](#contract-account) or an [externally owned account (EOA)](#eoa).

<DocLink to="/developers/docs/accounts" title="Ethereum Accounts" description="An Ethereum account is an entity with an Ether (ETH) balance that can send transactions on Ethereum. Accounts can be user-controlled or deployed as smart contracts." />

### address {#address}

Most generally, this represents an [EOA](#eoa) or [contract](#contract-accouint) that can receive (destination address) or send (source address) [transactions](#transaction) on the blockchain. More specifically, it is the rightmost 160 bits of a [Keccak hash](#keccak-256) of an [ECDSA](#ecdsa) [public key](#public-key).

### assert {#assert}

In [Solidity](#solidity), `assert(false)` compiles to `0xfe`, an invalid opcode, which uses up all remaining [gas](#gas) and reverts all changes. When an `assert()` statement fails, something very wrong and unexpected is happening, and you will need to fix your code. You should use `assert()` to avoid conditions that should never, ever occur.

<DocLink to="/developers/docs/security/" title="Security" description="Ethereum smart contracts are extremely flexible, capable of both holding large quantities of tokens (often in excess of $1B) and running immutable logic based on previously deployed smart contract code." />

<Divider />

## B {#section-b}

### big-endian {#big-endian}

A positional number representation where the most significant digit is first in memory. The opposite of little-endian, where the least significant digit is first.

### block {#block}

A collection of required information (a block header) about the comprised [transactions](#transaction), and a set of other block headers known as [ommers](#ommer). Blocks are added to the Ethereum network by [miners](#miner).

<DocLink to="/developers/docs/blocks/" title="Blocks" description="Blocks are batches of transactions with a hash of the previous block in the chain. This links blocks together (in a chain) because hashes are cryptographically derived from the block data. This prevents fraud, because one change in any block in history would invalidate all the following blocks as all subsequent hashes would change and everyone running the blockchain would notice." />

### blockchain {#blockchain}

In Ethereum, a sequence of [blocks](#block) validated by the [proof-of-work](#pow) system, each linking to its predecessor all the way to the [genesis block](#genesis-block). There is no block size limit; it instead uses varying [gas limits](#gas-limit).

<DocLink to="/developers/docs/intro-to-ethereum#what-is-a-blockchain" title="What is a Blockchain?" description="A blockchain is best described as a public database that is updated and shared across many computers in a network." />

### bytecode {#bytecode}

An abstract instruction set designed for efficient execution by a software interpreter or a virtual machine. Unlike human-readable source code, bytecode is expressed in numeric format.

### Byzantium fork {#byzantium-fork}

The first of two [hard forks](#hard-fork) for the [Metropolis](#metropolis) development stage. It included EIP-649 Metropolis [Difficulty Bomb](#difficulty-bomb) Delay and Block Reward Reduction, where the [Ice Age](#ice-age) was delayed by 1 year and the block reward was reduced from 5 to 3 ether.

<Divider />

## C {#section-c}

### compiling {#compiling}

Converting code written in a high-level programming language (e.g., [Solidity](#solidity)) into a lower-level language (e.g., EVM [bytecode](#bytecode)).

<DocLink to="/developers/docs/smart-contracts/compiling/" title="Compiling Smart Contracts" description="You need to compile your contract so that your web app and the Ethereum virtual machine (EVM) can understand it." />

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

<Divider />

## D {#section-d}

### Decentralized Autonomous Organization (DAO) {#dao}

A company or other organization that operates without hierarchical management. DAO may also refer to a contract named "The DAO" launched on April 30, 2016, which was then hacked in June 2016; this ultimately motivated a [hard fork](#hard-fork) (codenamed DAO) at block 1,192,000, which reversed the hacked DAO contract and caused Ethereum and Ethereum Classic to split into two competing systems.

<DocLink to="/community/#decentralized-autonomous-organizations-daos" title="Decentralized Autonomous Organizations (DAOs)" description="These groups leverage Ethereum technology to facilitate organization and collaboration. For instance, for controlling membership, voting on proposals, or managing pooled assets. While DAOs are still experimental, they offer opportunities for you to find groups that you identify with, find collaborators, and grow your impact on the Ethereum community." />

<DocLink to="/developers/docs/security/" title="Security" description="Ethereum smart contracts are extremely flexible, capable of both holding large quantities of tokens (often in excess of $1B) and running immutable logic based on previously deployed smart contract code." />

### Dapp {#dapp}

Decentralized application. At a minimum, it is a [smart contract](#smart-contract) and a web user interface. More broadly, a Dapp is a web application that is built on top of open, decentralized, peer-to-peer infrastructure services. In addition, many Dapps include decentralized storage and/or a message protocol and platform.

<DocLink to="/developers/docs/dapps/" title="Introduction to Dapps" description="A decentralized application (dapp) is an application built on a decentralized network that combines a smart contract and a frontend user interface. Note, in Ethereum smart-contracts are accessible and transparent – like open APIs – so your dapp can even include a smart contract that someone else has written." />

### deed {#deed}

See [non-fungible token (NFT)](#nft)

### difficulty {#difficulty}

A network-wide setting that controls how much computation is required to produce a [proof-of-work](#pow).

### difficulty bomb {#difficulty-bomb}

Planned exponential increase in [proof-of-work](#pow) [difficulty](#difficulty) setting designed to motivate the transition to [proof-of-stake](#pos), reducing the changes of a [fork](#hard-fork)

### digital signature {#digital-signatures}

A short string of data a user produces for a document using a [private key](#private-key) such that anyone with the corresponding [public key](#public-key), the signature, and the document can verify that (1) the document was "signed" by the owner of that particular private key, and (2) the document was not changed after it was signed.

<Divider />

## E {#section-e}

### elliptic curve digital signature algorithm (ECDSA) {#ecdsa}

A cryptographic algorithm used by Ethereum to ensure that funds can only be spent by their owners.

### Ethereum Improvement Proposal (EIP) {#eip}

A design document providing information to the Ethereum community, describing a proposed new feature or its processes or environment (see [ERC](#erc)).

<DocLink to="/eips/" title="Introduction to EIPs" description='Ethereum Improvement Proposals (EIPs) are standards specifying potential new features or processes for Ethereum. EIPs contain technical specifications for the proposed changes and act as the "source of truth" for the community. Network upgrades and application standards for Ethereum are discussed and developed through the EIP process.' />

### Ethereum Name Service (ENS) {#ens}

The ENS registry is a single central [contract](#smart-contract) that provides a mapping from domain names to owners and resolvers, as described in [EIP](#eip) 137.

[Read more at github.com](https://github.com/ethereum/ens)

### entropy {#entropy}

In the context of cryptography, lack of predictability or level of randomness. When generating secret information, such as [private keys](#private-key), algorithms usually rely on a source of high entropy to ensure the output is unpredictable.

### externally owned account (EOA) {#eoa}

An [account](#account) created by or for human users of the Ethereum network.

### Ethereum Request for Comments (ERC) {#erc}

A label given to some [EIPs](#eip) that attempt to define a specific standard of Ethereum usage.

<DocLink to="/eips/" title="Introduction to EIPs" description='Ethereum Improvement Proposals (EIPs) are standards specifying potential new features or processes for Ethereum. EIPs contain technical specifications for the proposed changes and act as the "source of truth" for the community. Network upgrades and application standards for Ethereum are discussed and developed through the EIP process.' />

### Ethash {#ethash}

A [proof-of-work](#pow) algorithm for Ethereum 1.0.

[Read more at github.com](https://github.com/ethereum/wiki/wiki/Ethash)

### ether {#ether}

The native cryptocurrency used by the Ethereum ecosystem, which covers [gas](#gas) costs when executing transactions. Also writen as ETH or its symbol Ξ, the Greek uppercase Xi character.

<DocLink to="/eth/" title="Currency for our digital future" description="ETH is digital, global money. It's the currency of Ethereum apps." />

### events {#events}

Allows the use of [EVM](#evm) logging facilities. [Dapps](#dapp) can listen for events and use them to trigger JavaScript callbacks in the user interface.

<DocLink to="/developers/docs/smart-contracts/anatomy/#events-and-logs" title="Events and Logs" description="Events let you communicate with your smart contract from your frontend or other subscribing applications. When a transaction is mined, smart contracts can emit events and write logs to the blockchain that the frontend can then process." />

### Ethereum Virtual Machine (EVM) {#evm}

A stack-based virtual machine that executes [bytecode](#bytecode). In Ethereum, the execution model specifies how the system state is altered given a series of bytecode instructions and a small tuple of environmental data. This is specified through a formal model of a virtual state machine.

<DocLink to="/developers/docs/evm/" title="Ethereum Virtual Machine" description="The EVM’s physical instantiation can’t be described in the same way that one might point to a cloud or an ocean wave, but it does exist as one single entity maintained by thousands of connected computers running an Ethereum client." />

### EVM assembly language {#evm-assembly-language}

A human-readable form of EVM [bytecode](#bytecode).

<Divider />

## F {#section-f}

### fallback function {#fallback-function}

A default function called in the absence of data or a declared function name.

### faucet {#faucet}

A service carried out via [smart contract](#smart-contract) that dispenses funds in the form of free test ether that can be used on a testnet.

<DocLink to="developers/docs/networks/#testnet-faucets" title="Testnet Faucets" description="ETH on testnets has no real value; therefore, there are no markets for testnet ETH. Since you need ETH to actually interact with Ethereum, most people get testnet ETH from faucets. Most faucets are webapps where you can input an address which you request ETH to be sent to." />

### finney {#finney}

A denomination of [ether](#ether). 1 finney = 10¹⁵ [wei](#wei). 10³ finney = 1 ether.

### fork {#fork}

A change in protocol causing the creation of an alternative chain, or a temporal divergence in two potential block paths during mining.

### frontier {#frontier}

The initial test development stage of Ethereum, which lasted from July 2015 to March 2016.

<Divider />

## G {#section-g}

### gas {#gas}

A virtual fuel used in Ethereum to execute smart contracts. The [EVM](#evm) uses an accounting mechanism to measure the consumption of gas and limit the consumption of computing resources (see [Turing complete](#turing-complete)).

<DocLink to="/developers/docs/gas/" title="Gas and Fees" description="Gas is essential to the Ethereum network. It is the fuel that allows it to operate, in the same way that a car needs gasoline to run." />

### gas limit {#gas-limit}

The maximum amount of [gas](#gas) a [transaction](#transaction) or [block](#block) may consume.

### genesis block {#genesis-block}

The first block in a [blockchain](#blockchain), used to initialize a particular network and its cryptocurrency.

### geth {#geth}

Go Ethereum. One of the most prominent implementations of the Ethereum protocol, written in Go.

[Read more at geth.ethereum.org](https://geth.ethereum.org/)

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

### Inter-exchange Client Address Protocol (ICAP) {#icap}

An Ethereum address encoding that is partly compatible with the International Bank Account Number (IBAN) encoding, offering a versatile, checksummed, and interoperable encoding for Ethereum addresses. ICAP addresses use a new IBAN pseudo-country code- XE, standing for "eXtended Ethereum," as used in nonjurisdictional currencies (e.g., XBT, XRP, XCP).

### Ice Age {#ice-age}

A [hard fork](#hard-fork) of Ethereum at block 200,000 to introduce an exponential [difficulty](#difficulty) increase (aka [difficulty bomb](#difficulty-bomb)), motivating a transition to [proof-of-stake](#pos).

### integrated development environment (IDE) {#ide}

A user interface that typically combines a code editor, compiler, runtime, and debugger.

<DocLink to="/developers/docs/ides/" title="Integrated Development Environments" description="When it comes to setting up an integrated development environment (IDE), building with Ethereum is similar to any other software project. There's many options to choose from, so at the end of the day, pick the one that best suites your preferences." />

### immutable deployed code problem {#immutable-deployed-code-problem}

Once a [contract's](#smart-contract) (or [library's](#library)) code is deployed, it becomes immutable. Standard software development practices rely on being able to fix possible bugs and add new features, so this represents a challenge for smart contract development.

<DocLink to="/developers/docs/smart-contracts/deploying/" title="Deploying Smart Contracts" description="You need to deploy your smart contract in order for it to be available to users of an Ethereum network. To deploy a smart contract, you merely send an Ethereum transaction containing the code of the compiled smart contract without specifying any recipients." />

### internal transaction {#internal-transaction}

A [transaction](#transaction) sent from a [contract account](#contract-account) to another contract account or an [EOA](#eoa) (see [message](#message)).

<Divider />

## K {#section-k}

### key derivation function (KDF) {#kdf}

Also known as a "password stretching algorithm," it is used by [keystore](#keystore-file) formats to protect against brute-force, dictionary, and rainbow table attacks on passphrase encryption, by repeatedly hashing the passphrase.

<DocLink to="/developers/docs/security/" title="Security" description="Ethereum smart contracts are extremely flexible, capable of both holding large quantities of tokens (often in excess of $1B) and running immutable logic based on previously deployed smart contract code." />

### keccak-256 {#keccak-256}

Cryptographic [hash](#hash) function used in Ethereum. Keccak-256 was standardized as [SHA](#sha)-3.

### keystore file {#keystore-file}

A JSON-encoded file that contains a single (randomly generated) [private key](#private-key), encrypted by a passphrase for extra security.

<Divider />

## L {#section-l}

### LevelDB {#level-db}

An open source on-disk key-value store, implemented as a lightweight, single-purpose [library](#library), with bindings to many platforms.

### library {#library}

A special type of [contract](#smart-contract) that has no payable functions, no fallback function, and no data storage. Therefore, it cannot receive or hold ether, or store data. A library serves as previously deployed code that other contracts can call for read-only computation.

<DocLink to="/developers/docs/smart-contracts/libraries/" title="Smart Contract Libraries" description="You don't need to write every smart contract in your project from scratch. There are many open source smart contract libraries available that provide reusable building blocks for your project that can save you from having to reinvent the wheel." />

### lightweight client {#lightweight-client}

An Ethereum client that does not store a local copy of the [blockchain](#blockchain), or validate blocks and [transactions](#transaction). It offers the functions of a [wallet](#wallet) and can create and broadcast transactions.

<Divider />

## M {#section-m}

### mainnet {#mainnet}

Short for "main network," this is the main public Ethereum [blockchain](#blockchain). Real ETH, real value, and real consequences. (see [testnet](#testnet))

### Merkle Patricia tree {#merkle-patricia-tree}

A data structure used in Ethereum to efficiently store key-value pairs.

### message {#message}

An [internal transaction](#internal-transaction) that is never serialized and only sent within the [EVM](#evm).

### message call {#message-call}

The act of passing a [message](#message) from one account to another. If the destination account is associated with [EVM](#evm) code, then the VM will be started with the state of that object and the message acted upon.

### Metropolis {#metropolis}

The third development stage of Ethereum, launched in October 2017.

### miner {#miner}

A network node that finds valid [proof-of-work](#pow) for new blocks, by repeated pass hashing (see [Ethash](#ethash)).

<DocLink to="/developers/docs/mining/" title="Mining" description="Mining is the process of creating a block transactions to be added to the Ethereum blockchain." />

<Divider />

## N {#section-n}

### network {#network}

Referring to the Ethereum network, a peer-to-peer network that propagates transactions and blocks to every Ethereum node (network participant).

<DocLink to="/developers/docs/networks/" title="Networks" description='Since Ethereum is a protocol, this means there can be multiple independent "networks" conforming to this protocol that do not interact with each other.' />

### non-fungible token (NFT) {#nft}

Also known as a "deed," this is a token standard introduced by the ERC721 proposal. NFTs can be tracked and traded, but each token is unique and distinct; they are not interchangeable like ERC20 tokens. NFTs can represent ownership of digital or physical assets.

<DocLink to="/developers/docs/standards/tokens/erc-721/" title="ERC-721 Non-Fungible Token Standard" description="A Non-Fungible Tokens (NFT) is used to identify something or someone in a unique way. This type of Token is perfect to be used on platforms that offer collectible items, access keys, lottery tickets, numbered seats for concerts and sports matches, etc. This special type of Token has amazing possibilities so it deserves a proper Standard, the ERC-721 came to solve that!" />

### node {#node}

A software client that participates in the network.

<DocLink to="/developers/docs/nodes-and-clients/" title="Nodes and Clients" description='For Ethereum to work in a decentralized way it needs a distributed network of nodes that can verify blocks and transaction data. You need an application, known as a client, on your device to "run" a node.' />

### nonce {#nonce}

In cryptography, a value that can only be used once. There are two types of nonce used in Ethereum- an account nonce is a transaction counter in each account, which is used to prevent replay attacks; a [proof-of-work](#pow) nonce is the random value in a block that was used to satisfy the [proof-of-work](#pow).

<Divider />

## O {#section-o}

### ommer {#ommer}

A child block of an ancestor that is not itself an ancestor. When a [miner](#miner) finds a valid [block](#block), another miner may have published a competing block which is added to the tip of the blockchain. Orphaned blocks in Ethereum can be included by newer blocks as _ommers_ and receive a partial block reward. The term "ommer" is the preferred gender-neutral term for the sibling of a parent block, but this is also sometimes referred to as an "uncle."

<Divider />

## P {#section-p}

### parity {#parity}

One of the most prominent interoperable implementations of the Ethereum client software.

### private key (secret key) {#private-key}

A secret number that allows Ethereum users to prove ownership of an account or contracts, by producing a digital signature (see [public key](#public-key), [address](#address), [ECDSA](#ecdsa)).

### proof of stake (PoS) {#pos}

A method by which a cryptocurrency blockchain protocol aims to achieve distributed [consensus](#consensus). PoS asks users to prove ownership of a certain amount of cryptocurrency (their "stake" in the network) in order to be able to participate in the validation of transactions.

<DocLink to="/eth2/#proof-of-stake" title="Proof of Stake" description="Ethereum today is a proof-of-work blockchain. It relies on miners to keep the network secure and in sync by devoting a great amount of computing power to creating new blocks. Proof-of-stake keeps the network secure but replaces energy consumption with a financial commitment." />

### proof of work (PoW) {#pow}

A piece of data (the proof) that requires significant computation to find. In Ethereum, [miners](#miner) must find a numeric solution to the [Ethash](#ethash) algorithm that meets a network-wide [difficulty](#difficulty) target.

<DocLink to="/developers/docs/blocks/#proof-of-work-protocol" title="Proof of Work Protocol" description='Mining nodes have to spend a variable but substantial amount of energy, time, and computational power to produce a “certificate of legitimacy” for a block they propose to the network. This helps protect the network from spam/denial-of-service attacks, among other things, since certificates are expensive to produce.' />

### public key {#public-key}

A number, derived via a one-way function from a [private key](#private-key), which can be shared publicly and used by anyone to verify a digital signature made with the corresponding private key.

<Divider />

## R {#section-r}

### receipt {#receipt}

Data returned by an Ethereum client to represent the result of a particular [transaction](#transaction), including a [hash](#hash) of the transaction, its [block](#block) number, the amount of [gas](#gas) used, and, in case of deployment of a [smart contract](#smart-contract), the [address](#address) of the contract.

### re-entrancy attack {#re-entrancy-attack}

An attack that consists of an attacker contract calling a victim contract function in such a way that during execution the victim calls the attacker contract again, recursively. This can result, for example, in the theft of funds by skipping parts of the victim contract that update balances or count withdrawal amounts.

<DocLink to="/developers/docs/security/#re-entrancy" title="Re-entrancy" description="Re-entrancy is one of the largest and most significant security issue to consider when developing Smart Contracts. While the EVM cannot run multiple contracts at the same time, a contract calling a different contract pauses the calling contract's execution and memory state until the call returns, at which point execution proceeds normally. This pausing and re-starting can create a vulnerability known as 're-entrancy'." />

### reward {#reward}

An amount of ether included in each new block as a reward by the network to the [miner](#miner) who found the [proof-of-work](#pow) solution.

### Recursive Length Prefix (RLP) {#rlp}

An encoding standard designed by the Ethereum developers to encode and serialize objects (data structures) of arbitrary complexity and length.

<Divider />

## S {#section-s}

### Serenity {#serenity}

The fourth and final development stage of Ethereum.

<DocLink to="/eth2/" title="Ethereum 2.0 (Eth2)" description="Eth2 is a long-planned upgrade to the Ethereum network, giving it the scalability and security it needs to serve all of humanity. The first stage of Eth2, called Phase 0, is planned to launch in 2020." />

### Secure Hash Algorithm (SHA) {#sha}

A family of cryptographic hash functions published by the National Institute of Standards and Technology (NIST).

### singleton {#singleton}

A computer programming term that describes an object of which only a single instance can exist.

### smart contract {#smart-contract}

A program that executes on the Ethereum computing infrastructure.

<DocLink to="/developers/docs/smart-contracts/" title="Introduction to Smart Contracts" description="A 'smart contract' is simply a program that runs on the Ethereum blockchain. It's a collection of code (its functions) and data (its state) that resides at a specific address on the Ethereum blockchain." />

### Solidity {#solidity}

A procedural (imperative) programming language with syntax that is similar to JavaScript, C++, or Java. The most popular and most frequently used language for Ethereum [smart contracts](#smart-contract). Created by Dr. Gavin Wood.

<DocLink to="/developers/docs/smart-contracts/languages/#solidity" title="Solidity" description="Influenced by C++, Python and JavaScript. Statically typed (the type of a variable is known at compile time)." />

### Solidity inline assembly {#solidity-inline-assembly}

[EVM](#evm) assembly language in a [Solidity](#solidity) program. Solidity's support for inline assembly makes it easier to write certain operations.

### Spurious Dragon {#spurious-dragon}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,675,000 to address more denial-of-service attack vectors and clear state (see [Tangerine Whistle](#tangerine-whistle)). Also, a replay attack protection mechanism.

### szabo {#szabo}

A denomination of [ether](#ether). 1 szabo = 10¹² [wei](#wei), 10⁶ szabo = 1 ether.

<Divider />

## T {#section-t}

### Tangerine Whistle {#tangerine-whistle}

A [hard fork](#hard-fork) of the Ethereum blockchain, which occurred at block 2,463,000 to change the [gas](#gas) calculation for certain I/O-intensive operations and to clear the accumulated state from a denial-of-service attack, which exploited the low gas cost of those operations.

### testnet {#testnet}

Short for "test network," a network used to simulate the behavior of the main Ethereum network (see [mainnet](#mainnet)).

<DocLink to="/developers/docs/networks/#testnets" title="Testnets" description="In addition to mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to mainnet. Think of this as an analog to production versus staging servers." />

### transaction {#transaction}

Data committed to the Ethereum Blockchain signed by an originating [account](#account), targeting a specific [address](#address). The transaction contains metadata such as the [gas limit](#gas-limit) for that transaction.

<DocLink to="/developers/docs/transactions/" title="Transactions" description="Transactions are cryptographically signed instructions from accounts. An account will initiate a transaction to update the state of the Ethereum network. The simplest transaction is transferring ETH from one account to another." />

### Turing complete {#turing-complete}

A concept named after English mathematician and computer scientist Alan Turing- a system of data-manipulation rules (such as a computer's instruction set, a programming language, or a cellular automaton) is said to be "Turing complete" or "computationally universal" if it can be used to simulate any Turing machine.

<Divider />

## V {#section-v}

### Vyper {#vyper}

A high-level programming language with Python-like syntax. Intended to get closer to a pure functional language. Created by Vitalik Buterin.

<DocLink to="/developers/docs/smart-contracts/languages/#vyper" title="Vyper" description="Pythonic programming language. Strong typing. Small and understandable compiler code. Deliberately has less features than Solidity with the aim of making contracts more secure and easier to audit." />

<Divider />

## W {#section-w}

### wallet {#wallets}

Software that holds [private keys](#private-key). Used to access and control Ethereum [accounts](#account) and interact with [smart contracts](#smart-contract). Keys need not be stored in a wallet, and can instead be retrieved from offline storage (i.e. a memory card or paper) for improved security. Despite the name, wallets never store the actual coins or tokens.

<DocLink to="/wallets/" title="Ethereum Wallets" description="The key to your digital future. Wallets give access to your funds and Ethereum applications. Only you should have access to your wallet." />

### Web3 {#web3}

The third version of the web. First proposed by Dr. Gavin Wood, Web3 represents a new vision and focus for web applications- from centrally owned and managed applications, to applications built on decentralized protocols (see [Dapp](#dapp)).

<DocLink to="/developers/docs/web2-vs-web3/" title="Web2 vs Web3" description="Web2 refers to the version of the internet most of us know today. An internet dominated by companies that provide services in exchange for your personal data. Web3, in the context of Ethereum, refer to decentralized apps that run on the blockchain. These are apps that allow anyone to participate without monetising their personal data." />

### wei {#wei}

The smallest denomination of [ether](#ether). 10¹⁸ wei = 1 ether.

<Divider />

## Z {#section-z}

### zero address {#zero-address}

A special Ethereum address, composed entirely of zeros, that is specified as the destination address of a [contract creation transaction](#contract-creation-transaction).

<Divider />

## Sources {#sources}

_Provided in part by [Mastering Ethereum](https://github.com/ethereumbook/ethereumbook) by [Andreas M. Antonopoulos, Gavin Wood](https://ethereumbook.info) under CC-BY-SA_

<Divider />

## Contribute to this page {#contribute-to-this-page}

Did we miss something? Is something incorrect? Help us improve by contributing to this glossary on GitHub!

[Learn more about how to contribute](/en/contributing/adding-glossary-terms)
