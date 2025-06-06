---
title: Pectra
description: Learn about Pectra - the next Ethereum protocol upgrade
lang: en
---

# Pectra {#pectra}

Pectra is an upcoming Ethereum protocol upgrade that brings new functionality and changes to the Ethereum network. Following [Dencun](/roadmap/dencun/), this is another major upgrade to both the execution and consensus layer of Ethereum. The shortened name Pectra is a combination of Prague and Electra, which are the respective names for the execution and consensus layer specification changes. Together, these changes bring a number of improvements to Ethereum users, developers and validators.

<InfoBanner>
Pectra upgrade is only a single step in Ethereum's long-term development goals. Learn more about <a href="/roadmap/">the protocol roadmap</a> and <a href="/history/">previous upgrades</a>.
</InfoBanner>

## Improvements in Pectra {#new-improvements}

Pectra brings the biggest number of [EIPs](https://eips.ethereum.org/) of any previous upgrades! There are many minor changes but also some significant new features. The full list of changes and technical details can be found in the individual included EIPs.

### EOA account code {#7702}

[EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) represents a major step toward widespread [account abstraction](/roadmap/account-abstraction/). With this feature, users can set their address ([EOA](/glossary/#eoa)) to be extended with a smart contract. The EIP introduces a new type of transaction with a specific function - to allow address owners to sign an authorization that sets their address to mimic a chosen smart contract. 

With this EIP, users can opt in to programmable wallets that allow new features like transaction bundling, gasless transacting and custom asset access for alternative recovery schemes. This hybrid approach combines the simplicity of EOAs with the programmability of contract-based accounts. 

Read a deeper dive on 7702 [here](/roadmap/pectra/7702/)

### Increase the max effective balance {#7251}

The current effective balance of the validator is exactly 32 ETH. It's the minimum necessary amount to participate in the consensus but at the same time the maximum a single validator can stake.

[EIP-7251](https://eips.ethereum.org/EIPS/eip-7251) raises the maximum possible effective balance to 2048 ETH, meaning that a single validator can now stake between 32 and 2048 ETH. Instead of multiples of 32, stakers can now choose an arbitrary amount of ETH to stake and receive rewards on every 1 ETH above the minimum. For example, if a validator's balance grows with their rewards to 33 ETH, the extra 1 ETH is also considered part of the effective balance and receives rewards.

But the benefit of a better reward system for validators is only a part of this improvement. [Stakers](/staking/) running multiple validators can now aggregate them into a single one, which enables easier operation and reduces network overhead. Because every validator in Beacon Chain submits a signature in every epoch, the bandwidth requirements grow with more validators and a large number of signatures to propagate. Aggregating validators will take load off of the network and open new scaling options while keeping the same economic security.

Read a deeper dive on maxEB [here](/roadmap/pectra/maxeb/)

### Blob throughput increase {#7691}

Blobs provide [data availability](/developers/docs/data-availability/#data-availability-and-layer-2-rollups) for L2s. They were introduced in the [the previous network upgrade](/roadmap/dencun/). 

Currently, network targets an average 3 blobs per block with a maximum of 6 blobs. With [EIP-7691](https://eips.ethereum.org/EIPS/eip-7691), the average blob count will be increased to 6, with a maximum of 9 per block, resulting in increased capacity for Ethereum rollups. This EIP helps bridge the gap until [PeerDAS](https://eips.ethereum.org/EIPS/eip-7594) enables even higher blob counts.

### Increase calldata cost {#7623}

Before the introduction of [blobs in Dencun upgrade](/roadmap/danksharding), L2s were using [calldata](/docs/data-availability/blockchain-data-storage-strategies/#calldata) to store their data in Ethereum. Both blobs and calldata affect Ethereum's bandwidth usage. While most blocks only use a minimal amount of calldata, data-heavy blocks that also contain many blobs can be harmful to Ethereum's p2p network. 

To address this, [EIP-7623](https://eips.ethereum.org/EIPS/eip-7623) increases calldata pricing, but only for data-heavy transactions. This bounds the worst-case block size, provides an incentive for L2s to only use blobs and leaves over 99% of transactions unaffected.

### Execution layer triggerable exits {#7002}

Currently, exiting a validator and [withdrawing staked ETH](/staking/withdrawals/) is a consensus layer operation that requires an active validator key, the same BLS key used by the validator to perform active duties like attestations. Withdrawal credentials is a separate cold key that receives the exited stake but cannot trigger the exit. The only way for stakers to exit is to send a special message to the Beacon Chain network signed using the active validator key. This is limiting in scenarios where the withdrawal credentials and validator key are held by different entities or when the validator key gets lost.

[EIP-7002](https://eips.ethereum.org/EIPS/eip-7002) introduces a new contract that can be used to trigger the exit using execution layer withdrawal credentials. Stakers will be able to exit their validator by calling a function in this special contract without the need for their validator signing key or access to Beacon Chain at all. Importantly, enabling validator withdrawals onchain allows for staking protocols with reduced trust assumptions over node operators.

### Validator deposits on chain {#6110}

Validator deposits are currently processed by [eth1data poll](https://eth2book.info/capella/part2/deposits-withdrawals/deposit-processing/) which is a function on the Beacon Chain that fetches data from the execution layer. It's sort of a technical debt from times before The Merge when Beacon Chain was a separate network and had to concern itself with proof-of-work re-orgs. 

[EIP-6110](https://eips.ethereum.org/EIPS/eip-6110) is a new way of delivering deposits from execution to the consensus layer, which allows for instant processing with less implementation complexity. It's a more secure way of handling deposits native to merged Ethereum. It also helps to future-proof the protocol because it doesn't require historical deposits to bootstrap the node, which is necessary for history expiry.

### Precompile for BLS12-381 {#2537}

Precompiles are a special set of smart contracts built directly into the Ethereum Virtual Machine ([EVM](/developers/docs/evm/)). Unlike regular contracts, precompiles are not deployed by users but are part of the client implementation itself, written in its native language (e.g. Go, Java, etc, not Solidity). Precompiles serve for widely used and standardized functions like cryptographic operations. Smart contract developers can call precompiles as a regular contract but with more security and efficiency.

[EIP-2537](https://eips.ethereum.org/EIPS/eip-2537) adds new precompiles for curve operations over [BLS12-381](https://hackmd.io/@benjaminion/bls12-381). This elliptic curve became widely used in cryptocurrency ecosystems thanks to its practical properties. More specifically, it's been adopted by Ethereum's consensus layer, where it's used by validators.

The new precompile adds the ability for every developer to easily, efficiently, and securely perform cryptographic operations using this curve, for example, verifying signatures. Onchain applications that depend on this curve can become more gas efficient and secure relying on a precompile instead of some custom contract. This mainly applies to applications that want to reason about validators inside the EVM, e.g. staking pools, restaking, light clients, bridges but also zero-knowledge.

### Serve historical block hashes from state {#2935}

The EVM currently provides `BLOCKHASH` opcode which enables contract developers to retrieve the hash of a block directly in the execution layer. However, this is limited only to the last 256 blocks and might become problematic for stateless clients in the future.

[EIP-2935](https://eips.ethereum.org/EIPS/eip-2935) creates a new system contract that can serve the last 8192 block hashes as storage slots. This helps to future-proof the protocol for stateless execution and becomes more efficient when verkle tries are adopted. However, apart from this, rollups can benefit from this right away, as they can query the contract directly with a longer historical window.

### Move committee index outside Attestation {#7549}

The Beacon Chain consensus is based on validators casting their votes for the latest block and finalized epoch. The attestation includes 3 elements, 2 of which are votes and the third is the committee index value.

[EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) moves this index outside of the signed attestation message, which makes it easier to verify and aggregate consensus votes. This will enable more efficiency in every consensus client and can bring significant performance improvements to zero-knowledge circuits for proving Ethereum consensus.

### Add blob schedule to EL config files {#7840}

[EIP-7840](https://eips.ethereum.org/EIPS/eip-7840) is a simple change that adds a new field to execution layer client configuration. It configures the number of blocks, enabling dynamic setting for target and maximum blob counts per block as well as blob fee adjustment. With directly defined configuration, clients can avoid the complexity of exchanging this information via Engine API.

<InfoBanner>
To learn more about how Pectra affects you specifically as an Ethereum user, developer or validator, look into <a href="https://epf.wiki/#/wiki/pectra-faq">Pectra FAQ</a>.
</InfoBanner>

## Does this upgrade affect all Ethereum nodes and validators? {#client-impact}

Yes, Pectra upgrade requires updates to both [execution clients and consensus clients](/developers/docs/nodes-and-clients/). All main Ethereum clients will release versions supporting the hard fork marked as high priority. To maintain synchronization with the Ethereum network post-upgrade, node operators must ensure they are running a supported client version. Note that the information about client releases is time-sensitive, and users should refer to the latest updates for the most current details.

## How can ETH be converted after the hard fork? {#scam-alert}

- **No Action Required for Your ETH**: Following the Ethereum Pectra upgrade, there is no need to convert or upgrade your ETH. Your account balances will remain the same, and the ETH you currently hold will remain accessible in its existing form after the hard fork.
- **Beware of Scams!** <Emoji text="⚠️" /> **anyone instructing you to "upgrade" your ETH is trying to scam you.** There is nothing you need to do in relation to this upgrade. Your assets will stay completely unaffected. Remember, staying informed is the best defense against scams.

[More on recognizing and avoiding scams](/security/)

## More of a visual learner? {#visual-learner}

<YouTube id="ufIDBCgdGwY" />

_What’s Going Into the Pectra Upgrade? - Christine Kim_

<YouTube id="_UpAFpC7X6Y" />

_Ethereum Pectra Upgrade: What Stakers Need to Know — Blockdaemon_

## Further reading {#further-reading}

- [Ethereum roadmap](/roadmap/)
- [Pectra FAQ](https://epf.wiki/#/wiki/pectra-faq)
- [Pectra.wtf info page](https://pectra.wtf)
- [How Pectra enhances staker experience](https://www.kiln.fi/post/next-ethereum-upgrade-how-pectra-will-enhance-the-staking-experience)
- [EIP7702 info page](https://eip7702.io/)
- [Pectra devnets](https://github.com/ethereum/pm/blob/master/Pectra/pectra-pm.md)
