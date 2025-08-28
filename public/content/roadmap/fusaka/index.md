---
title: Fulu-Osaka (Fusaka)
description: Learn about the Fusaka protocol upgrade
lang: en
---

# Fusaka {#fusaka}

The Fusaka network upgrade follows [Pectra](/roadmap/pectra/) and brings more new features and improves the experience for every Ethereum user and developer. The name consists of the execution layer upgrade Osaka and the consensus layer version named after the Fulu star. Both parts of Ethereum receive an upgrade that pushes Ethereum scaling, security and user experience to the future. 

This upgrade is planned for Q4 2025.

<InfoBanner>
The Fusaka upgrade is only a single step in Ethereum's long-term development goals. Learn more about [the protocol roadmap](/roadmap/) and [previous upgrades](/history/).
</InfoBanner>

## Improvements in Fusaka {#improvements-in-fusaka}

### Data availability & L2 scaling {#data-availability-and-l2-scaling}

#### PeerDAS {#peerdas}

Specification: https://eips.ethereum.org/EIPS/eip-7594

Resources: https://youtu.be/bONWd1x2TjQ?t=328 (dapplion on PeerDAS)

This is the *headliner* of the Fusaka fork, the main feature added in this upgrade. L2s currently post their data to Ethereum in blobs, the ephemeral data type created specifically for L2s. Pre-Fusaka, every full node has to store every **byte of those blobs to ensure that the data exists. As blob throughput rises, having to download all of this data would be untenably resource-intensive.

With [Data Availability Sampling](https://notes.ethereum.org/@fradamt/das-fork-choice) , instead of having to download all of the blob data, each node will sample just a portion. Blobs are uniformly randomly distributed across nodes in the network with each full node holding only 1/8th of the data, therefore enabling theoretical scale up to 8x. To ensure availability of the data,  Any portion of the data can be reconstructed from any existing 50% of the whole with methods that drive down the probability of wrong or missing data to a cryptographically negligible level (~one in 10²⁰ to one in 10²⁴).

This keeps hardware and bandwidth requirements for nodes tenable while enabling blob scaling resulting in more scale with smaller fees for L2s.

In-depth: https://eprint.iacr.org/2024/1362.pdf

#### Blob parameter only forks {#blob-parameter-only-forks}

Specification: https://eips.ethereum.org/EIPS/eip-7892

L2s scale Ethereum - as their networks grow, they need to post more data to Ethereum. This means that Ethereum will need to increase the number of blobs available to them as time goes on. Although PeerDAS enables scaling blob data, it needs to be done in gradually and safely. 

Because Ethereum is code running on thousands of independent nodes that require agreement on same rules, we cannot simply introduces changes like increasing blob count the way you deploy a website update. Any rule change must be a coordinated upgrade where every node, client and validator software upgrades before the same predetermined block.

These coordinated upgrades generally include a lot of changes, require a lot of testing, and that takes time. In order to adapt faster to changing L2 blob needs, BPO-only forks introduce a mechanism to increase blobs without having to wait on that upgrade schedule.

BPO-only forks can be set by clients, similarly to other configuration like gas limit. Between major Ethereum upgrades, clients can agree to increase the `target` and `max` blobs to e.g. 9 and 12 and then node operators will update to take part in that tiny fork. These BPO-only forks can be configured at any time.

#### Blob base-fee bounded by execution costs {#blob-base-fee-bounded-by-execution-costs}

Specification: https://eips.ethereum.org/EIPS/eip-7918

Storybook explainer: https://notes.ethereum.org/@anderselowsson/AIG

L2s pay two bills when they post data: the blob fee and the execution gas needed to verify those blobs. If execution gas dominates, the blob fee auction can spiral down to 1 wei and stop being a price signal.

EIP-7918 pins a proportional reserve price under every blob. When the reserve is higher than the nominal blob base fee, the fee adjustment algorithm treats the block as over target and stops pushing the fee down and allows it increase normally. As a result:

- the blob fee market always reacts to congestion
- L2s pay at least a meaningful slice of the compute they force on nodes
- base-fee spikes on the EL can no longer strand the blob fee at 1 wei

### Gas limits, fees & DoS hardening {#gas-limits-fees-and-dos-hardening}

#### Set upper bounds for MODEXP {#set-upper-bounds-for-modexp}

Specification: https://eips.ethereum.org/EIPS/eip-7823

Until now, the MODEXP precompile accepted numbers of virtually any size. That made it hard to test, easy to abuse, and risky for client stability. EIP-7823 puts a clear limit in place: each input number can be at most 8192 bits (1024 bytes) long. Anything bigger is rejected, the transaction’s gas is burned, and no state changes occur. It very comfortably covers real-world needs while removing the extreme cases that complicated gas limit planning and security reviews. This change provides more security and DoS protection without affecting user or developer experience.

#### Transaction Gas Limit Cap {#transaction-gas-limit-cap}

Specification: https://eips.ethereum.org/EIPS/eip-7825

EIP-[7825](https://eips.ethereum.org/EIPS/eip-7825) adds a cap of 16,777,216 (2^24) gas per transaction. It’s proactive DoS hardening by bounding the worst-case cost of any single transaction as we raise the block gas limit. It makes validation and propagation easier to model to allow us to tackle scaling via raising the gas limit.

Why exactly 2^24 gas? It’s comfortably smaller than today’s gas limit, is large enough for real contract deployments & heavy precompiles, and a power of 2 makes it easy to implement across clients. This new maximum transaction size is a similar to pre-Pectra average block size, making it a reasonable limit for any operation on Ethereum.  

#### MODEXP Gas Cost Increase {#modexp-gas-cost-increase}

Specification: https://eips.ethereum.org/EIPS/eip-7883

MODEXP is a precompile built‑in function that calculates modular exponentiation, a type of large‑number math used in RSA signature verification and proof systems. It allows contracts to run these calculations directly without having to implement them themselves.

Devs and client teams identified MODEXP as a major obstacle to increasing the block gas limit because the current gas pricing often underestimates how much computing power certain inputs require. This means one transaction using MODEXP could take up most of the time needed to process an entire block, slowing down the network.

EIP‑7883 changes the pricing to match real computational costs by:

- raising the minimum charge from 200 to 500 gas and removing the one‑third discount from EIP-2565 on the general cost calculation
- increasing the cost more sharply when the exponent input is very long. if the exponent (the “power” number you pass as the second argument) is longer than 32 bytes / 256 bits, the gas charge climbs much faster for each extra byte
- charging large base or modulus extra as well. The other two numbers (the base and the modulus) are assumed to be at least 32 bytes - if either one is bigger, the cost rises in proportion to its size

By better matching costs to actual processing time, MODEXP can no longer cause a block to take too long to validate. This change is one of several aimed at making it safe to increase Ethereum’s block gas limit in the future.

#### RLP Execution Block Size Limit {#rlp-execution-block-size-limit}

Specification: https://eips.ethereum.org/EIPS/eip-7934

Ethereum adds a hard cap on the [RLP](https://ethereum.org/en/developers/docs/data-structures-and-encoding/rlp/)-encoded execution block size: 10 MiB total, with a 2 MiB safety margin reserved for beacon-block framing. Practically, clients define `MAX_BLOCK_SIZE = 10,485,760` bytes and `SAFETY_MARGIN = 2,097,152` bytes, and reject any execution block whose RLP payload exceeds `MAX_RLP_BLOCK_SIZE = MAX_BLOCK_SIZE − SAFETY_MARGIN`. The goal is to bound worst-case propagation/validation time and align with CL gossip behavior (blocks over ~10 MiB aren’t propagated), reducing reorg/DoS risk without changing gas accounting.

#### Set default gas limit to XX million {#set-default-gas-limit-to-xx-million}

Specification: https://eips.ethereum.org/EIPS/eip-7935

Prior to raising the gas limit from 30M to 36M in Feb 2025 (and subsequently to 45M), this value hadn’t changed since the Merge (Sep 2022). This EIP aims to make consistent scaling a priority.

EIP-7935 coordinates EL client teams to raise the default gas-limit above today’s 45M for Fusaka. It’s an Informational EIP, but it explicitly asks clients to test higher limits on devnets, converge on a safe value, and ship that number in their Fusaka releases.

Devnet planning targets ~60M stress (full blocks with synthetic load) and iterative bumps; research says worst-case block-size pathologies shouldn’t bind below ~150M. Rollout should be paired with the transaction gas-limit cap (EIP-7825) so no single transaction can dominate as limits rise.

### Preconfirmation support {#preconfirmation-support}

#### Deterministic proposer lookahead {#deterministic-proposer-lookahead}

Specification: https://eips.ethereum.org/EIPS/eip-7917

With EIP-7917, Beacon Chain will become aware of upcoming block proposers for the next epoch. Having a deterministic view on which validators will be proposing future blocks can enable [preconfirmations](https://ethresear.ch/t/based-preconfirmations/17353) - a commitment with the upcoming proposer that guarantees the user transaction will be included in their block without waiting for the actual block. 

This feature benefits client implementations and security of the network as it prevents edge cases where validators could manipulate the proposer schedule. The lookahead also allows for less complexity of the implementation.

### Opcodes & precompiles (developer goodies) {#opcodes-and-precomliles}

#### Count leading zeros (CLZ) opcode {#count-leading-zeros-opcode}

Specification: https://eips.ethereum.org/EIPS/eip-7939

EIP-7939 adds a small EVM instruction, CLZ (“count leading zeros”). Given a 256-bit value, it returns how many zero bits are at the front — and returns 256 if the value is entirely zero. This is a common feature in many instruction set architectures as it enables more efficient arithmetic operations. In practice this collapses today’s hand-rolled bit scans into one step, so finding the first set bit, scanning bytes, or parsing bitfields becomes simpler and cheaper. The opcode is low, fixed-cost and has been benchmarked to be on par with a basic add, which trims bytecode and saves gas for the same work.


## Does this upgrade affect all Ethereum nodes and validators? {#does-this-upgrade-affect-all-ethereum-nodes-and-validators}

Yes, the Fusaka upgrade requires updates to both [execution clients and consensus clients](/developers/docs/nodes-and-clients/). All main Ethereum clients will release versions supporting the hard fork marked as high priority. You can keep up with when these releases will be available in client Github repos, their [Discord channels](https://ethstaker.org/support), the [EthStaker Discord](https://dsc.gg/ethstaker), or by subscribing to the Ethereum blog for protocol updates. To maintain synchronization with the Ethereum network post-upgrade, node operators must ensure they are running a supported client version. Note that the information about client releases is time-sensitive, and users should refer to the latest updates for the most current details.

## How can ETH be converted after the hard fork? {#how-can-eth-be-converted-after-the-hardfork}

- **No Action Required for Your ETH**: Following the Ethereum Fusaka upgrade, there is no need to convert or upgrade your ETH. Your account balances will remain the same, and the ETH you currently hold will remain accessible in its existing form after the hard fork.
- **Beware of Scams!** <Emoji text="⚠️" /> **anyone instructing you to "upgrade" your ETH is trying to scam you.** There is nothing you need to do in relation to this upgrade. Your assets will stay completely unaffected. Remember, staying informed is the best defense against scams.

[More on recognizing and avoiding scams](/security/)

## Further reading {#further-reading}

- [Ethereum roadmap](/roadmap/)
- [Forkcast: Fusaka](https://forkcast.org/upgrade/fusaka)
- [Fusaka Meta EIP](https://eips.ethereum.org/EIPS/eip-7607)
- [Bankless: What Fusaka & Pectra will bring Ethereum](https://www.bankless.com/read/what-fusaka-pectra-will-bring-ethereum)
- [Bankless: Ethereum's Next Upgrades: Fusaka, Glamsterdam & Beyond with Preston Van Loon](https://x.com/BanklessHQ/status/1956017743289020633?t=502)
