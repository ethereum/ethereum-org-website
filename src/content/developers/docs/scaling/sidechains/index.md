---
title: Sidechains
description: An introduction to sidechains as a scaling solution currently utilized by the Ethereum community.
lang: en
sidebar: true
incomplete: true
sidebarDepth: 3
---

A sidechain is a separate blockchain which runs in parallel to Ethereum and is connected to Mainnet by a two-way bridge. Sidechains have separate block parameters and [consensus algorithms](/developers/docs/consensus-mechanisms/), which are often designed for efficient processing of transactions. Using a sidechain involves trade-offs, though, as they do not inherit Ethereum's security properties, unlike [layer 2 scaling solutions](/layer-2/). 

Sidechains also sacrifice some measure of decentralization or security to achieve high throughput ([scalability trilemma](https://vitalik.ca/general/2021/05/23/scaling.html)). Ethereum is, however, committed to scaling without compromising on decentralization and security as outlined in its [vision statement](/upgrades/vision/) for upgrades.

## How do sidechains work? {#how-do-sidechains-work}

Sidechains are independent blockchains, with different histories, development roadmaps, and design considerations. While a sidechain may share some surface-level similarities with Ethereum, it has several distinctive features.  

### Consensus algorithms {#consensus-algorithms}

One of the qualities that make sidechains unique (i.e., different from Ethereum) is the consensus algorithm used. Ssidechains don't rely on Ethereum for consensus and can choose alternative consensus protocols that suit their needs. Some examples of consensus algorithms used on sidechains include:

- [Proof-of-authority](https://wikipedia.org/wiki/Proof_of_authority)
- [Delegated proof-of-stake](https://en.bitcoinwiki.org/wiki/DPoS)
- [Byzantine fault tolerance](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained). 

Like Ethereum, sidechains have validating nodes that verify and process transactions, produce blocks, and store the blockchain state. Validators are also responsible for maintaining consensus across the network and securing it against malicious attacks.

#### Block parameters 

Ethereum places limits on [block times](/developers/docs/blocks/#block-time) (i.e., the time it takes to produce new blocks) and [block sizes](/developers/docs/blocks/#block-size) (i.e., the number of transactions in each block). Conversely, sidechains often adopt different parameters, such as faster block times and higher gas limits, to achieve high throughput, fast transactions, and low fees. 

While this has some benefits, it has critical implications for network decentralization and security. Block parameters, like fast block times and big block sizes, increase the difficulty of running a full node—leaving a few "supernodes" responsible for securing the chain. In such a scenario, the possibility of validator collusion or a malicious takeover of the chain increases.  

For blockchains to scale without harming decentralization, running a node must be open to everyone—not necessarily parties with specialized hardware. This is why efforts are underway to ensure everyone can [run a full node](/developers/docs/nodes-and-clients/#why-should-i-run-an-ethereum-node) on the Ethereum network. 

### EVM compatibility {#evm-compatibility}

What makes sidechains useful is their ability to execute contracts developed for the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/). Most EVM-compatible sidechains support smart contracts [written in Solidity](/developers/docs/smart-contracts/languages/), allowing for compatibility with Ethereum Mainnet. 

This means if you want to use your [dapp](/developers/docs/dapps/) on a sidechain, it's just a matter of deploying your [smart contract](/developers/docs/smart-contracts/) to this sidechain. It looks, feels, and acts just like Mainnet – you write contracts in Solidity, and interact with the chain via the Web3 API.

Because sidechains are EVM-compatible, they are considered a useful scaling [scaling solution](/developers/docs/scaling/) for Ethereum-native dapps. With your dapp on a sidechain, users can enjoy lower gas fees and faster transactions, especially if Mainnet is congested. 

However, as explained previously, using a sidechain involves significant trade-offs. Each sidechain is responsible for its security and doesn't inherit Ethereum's security properties. This increases the possibility of malicious behavior which can affect your users or put their funds at risk. 

### Asset movement {#asset-movement}

A crucial feature of sidechains is their ability to facilitate seamless transfer of value from and to Ethereum Mainnet. This interoperability with Ethereum is achieved using a blockchain bridge, which enforces a “two-way peg” between two chains. [Bridges](/bridges/) use a network of smart contracts deployed on both networks to control transfer of funds between Ethereum and sidechains. 

While bridges help users move funds between Ethereum and the sidechain, the assets are not physically moved across the two chains. Instead, a "lock-mint-burn" mechanism is used for transferring value across chains. Here is a description of the actual process:

- **Moving funds from Ethereum to a sidechain**

Bob (an Ethereum user) wishes to use a sidechain. This is what he does to move funds from Mainnet to the sidechain:
 
1. Bob sends ERC-20 tokens to a smart contract on the Ethereum chain (e.g. Ethereum) and pays the transaction fee. 
2. Bob’s ERC-20 tokens are locked up in the smart contract, with the event being relayed to the smart contract on the sidechain.
3. Once it receives proof of Bob’s deposit, the sidechain’s smart contract triggers the creation or “minting” of an amount of tokens equal to Bob’s initial deposit. 
4. Bob receives the new tokens in his wallet address and can use it to execute transactions on the sidechain. 

- **Moving funds from a sidechain to Ethereum Mainnet**

Having concluded his business on the sidechain, Bob wants to withdraw his remaining funds to Ethereum Mainnet. This is what happens:

1. Bob sends his remaining tokens to the sidechain’s smart contract for “burning”. Burning is a mechanism for destroying tokens by making them irrecoverable. 
2. Information concerning Bob’s deposit transaction and the token burning is relayed to the smart contract on Ethereum. 
3. The smart contract then triggers the release of Bob’s ERC-20 tokens on Ethereum, which are sent back to his wallet.

Note: Bridging funds between Mainnet and sidechains carries its own set of problems (e.g., smart contracts can be hacked), which is another drawback associated with sidechains. More on the [risks of blockchain bridges](/bridges/#bridge-risk). 

## Pros and cons of sidechains {#pros-and-cons-of-sidechains}

| Pros                                             | Cons                                                                                           |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| The technology underpinning sidechains is well-established and benefits from extensive research and improvements in design. | Sidechains trade off some measure of decentralization and trustlesness for scalability.  |
| Sidechains support general computation and offer EVM compatibility (they can run Ethereum-native dapps). | A sidechain uses a separate consensus mechanism and doesn't benefit from Ethereum's security guarantees.   |
| Sidechains use different consensus models to efficiently process transactions and lower transaction fees for users.  | Sidechains require higher trust assumptions (e.g., a quorum of malicious sidechain validators can commit fraud).|                                                                    
| EVM-compatible sidechains allow dapps to expand their ecosystem.  |                                                                                |

### Use Sidechains {#use-sidechains}

Multiple projects provide implementations of sidechains that you can integrate into your dapps:

- [Polygon PoS](https://polygon.technology/solutions/polygon-pos)
- [Skale](https://skale.network/)
- [Gnosis Chain (formerly xDai)](https://www.gnosischain.com/)
- [Loom Network](https://loomx.io/)

## Further reading {#further-reading}

- [EthHub on sidechains](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/sidechains/)
- [Scaling Ethereum Dapps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _Feb 8, 2018 - Georgios Konstantopoulos_

_Know of a community resource that helped you? Edit this page and add it!_
