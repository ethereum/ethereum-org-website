---
title: "Unlocking Ethereum's scaling: EIP-4844 explained"
description: "Finematics explains EIP-4844 (proto-danksharding), the key upgrade in the Dencun hard fork that introduces blob transactions to dramatically reduce costs for layer 2 rollups on Ethereum."
lang: en
youtubeId: "HT9PHWloIiU"
uploadDate: 2024-03-11
duration: "0:10:56"
educationLevel: intermediate
topic:
  - "how-ethereum-works"
  - "scaling"
  - "eip-4844"
  - "dencun"
  - "upgrades"
format: explainer
author: Finematics
breadcrumb: "EIP-4844 Explained"
---

An explainer by **Finematics** covering EIP-4844 (proto-danksharding), the key upgrade in the Dencun hard fork that introduces blob transactions to dramatically reduce costs for layer 2 rollups on Ethereum.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=HT9PHWloIiU) published by Finematics. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

Ethereum's scaling has been a hotly debated topic for a while. Layer 2 solutions have been at the forefront of this battle, offering a way to handle transactions off the main chain to alleviate congestion and reduce fees. But there's a catch — even L2s face limitations that hinder their efficiency and scalability. EIP-4844 is the next step in increasing L2's potential and aligning Ethereum with its scaling roadmap.

So, what is EIP-4844 all about? How exactly does it help with scaling L2s? What new possibilities does it unlock? And is it true that it can reduce transaction fees on L2s by over 90%?

#### What is EIP-4844 and proto-danksharding (0:52) {#what-is-eip-4844-and-proto-danksharding-052}

As a reminder, EIP stands for Ethereum Improvement Proposal, a process through which developers can suggest changes to the Ethereum protocol. EIP-4844, specifically, proposes a new type of transaction that can significantly enhance the way data is handled and processed on Ethereum. You might have also heard the name "proto-danksharding," which is now used interchangeably with EIP-4844.

Proto-danksharding is an initial implementation of full danksharding. It lays the foundation for further scaling with danksharding in the future. This is achieved by implementing most of the logic and "scaffolding" that make up a full danksharding spec, without implementing the actual data sharding. Doing it this way allows for an easier and less disruptive transition that can take place over multiple network upgrades without introducing too much risk to Ethereum in one upgrade.

The core idea behind EIP-4844 is to support the "rollup-centric" future of Ethereum. Rollups are layer 2 solutions that process transactions outside the main Ethereum chain but inherit Ethereum's security. EIP-4844 aims to make rollups cheaper and more efficient by introducing a new type of transaction that can be leveraged by rollups to allow them to decrease their operational costs by an order of magnitude. This in turn will allow applications built on top of rollups to be much cheaper to use and increase the adoption of the whole Ethereum ecosystem.

Imagine doing a DEX swap on one of the rollups. If the current cost of doing such an operation is, let's say, $1, it will most likely decrease to around $0.10 post-EIP-4844. The impact in this example has some caveats though that we will cover later in the video.

EIP-4844 together with a few other EIPs will be included in the upcoming Dencun network upgrade.

#### Technical details (2:50) {#technical-details-250}

Now, let's have a closer look at how EIP-4844 works.

EIP-4844 introduces a new kind of transaction type to Ethereum which accepts "blobs" of data to be persisted in the beacon node for a short period of time. These changes are forward-compatible with Ethereum's scaling roadmap, and blobs are small enough to keep disk use manageable. Blob transactions are in the same format in which they are expected to exist in the final danksharding specification.

This comes alongside a "blob fee market," ensuring that the blob space is used efficiently and remains economically viable. This is achieved by introducing blob gas as a new type of gas. It is independent of normal gas. For now, only blobs are priced in blob gas.

Blobs are 4,096 field elements of 32 bytes each. The blob cap per block is controlled by the MAX_BLOBS_PER_BLOCK parameter. The cap can start low and grow over multiple network upgrades. Initially, Dencun is targeting 6 blobs per block. 4,096 × 32 bytes × 6 per block = 0.75 MB per block.

Blobs are persisted in beacon nodes (consensus layer), not in the execution layer. Future sharding work only requires changes to the beacon node, enabling the execution layer to work on other initiatives in parallel.

Blobs are short-lived and pruned after around two weeks. They are available long enough for all actors of a rollup to retrieve them, but short enough to keep disk use manageable. This allows blobs to be priced cheaper than calldata, which is data stored in history forever.

The cryptographic backbone of EIP-4844 is KZG commitments. Without getting too deep into the weeds, they allow for efficient and secure data inclusion, crucial for the functionality of blob transactions. This way, only commitments to blobs have to be interpreted by the EVM in the execution layer and not the blobs themselves.

To generate the shared secret for KZG commitments, a browser-based, widely distributed ceremony was run so all Ethereum network participants had a chance to ensure it was generated correctly and securely.

EIP-4844 adds a new precompile called point evaluation that verifies a KZG proof which claims that a blob (represented by a commitment) evaluates to a given value at a given point.

So how exactly does this all apply to rollups? With the new blob space, rollups will be able to put their block data into blobs rather than the more expensive calldata that has been used for this purpose so far. Leveraging a short-lived blob space in the consensus layer is possible as rollups need data to be available only long enough to ensure honest actors can construct the rollup space.

In the case of optimistic rollups like Optimism or Arbitrum, they only need to provide the underlying data for as long as the fraud challenge window is open. The fraud proof can verify the transition in smaller steps, loading at most a few values of the blob at a time through calldata.

ZK rollups would provide two commitments to their transaction or state delta data: the blob commitment and the ZK rollup's own commitment using whatever proof system the rollup uses internally. They would also use a proof of equivalence protocol, using the previously mentioned point evaluation precompile, to prove that the two commitments refer to the same data.

#### Impact (6:25) {#impact-625}

The impact of EIP-4844 on the Ethereum ecosystem cannot be overstated. For starters, it dramatically improves the scalability of layer 2 solutions, reducing their operational costs and making them more competitive with other, cheap, alternative blockchains. The reduction in operational cost is possible as the vast majority of the cost currently incurred by rollups is due to the fees paid for calldata.

Moreover, EIP-4844 lays the groundwork for even further scaling through full danksharding. This future upgrade will split the Ethereum network into multiple data shards, each capable of storing data independently, further enhancing the network's capacity.

With operational costs coming down, we could witness a wave of new layer 2 solutions emerging, attracting developers to build innovative applications on rollups.

When it comes to the decrease in transaction costs on rollups, illustrated by our previous DEX swap example, the situation is complex. Assuming the demand for rollups remains constant post-EIP-4844, we could indeed anticipate a significant reduction in costs for users. However, improvements in scalability can lead to unforeseen economic effects. For instance, lower transaction fees for end users might drive more people to use rollups, subsequently increasing the demand on network resources and potentially raising transaction costs.

One thing is certain — even if the main result is the increase in transaction throughput and the cost of transactions remains the same, EIP-4844 lays the foundation for even greater scalability in the future that will eventually result in cheaper transactions for the users.

#### Summary (8:04) {#summary-804}

The Ethereum community has already completed testing EIP-4844 on various testnets, with a mainnet launch expected on the 13th of March. This is a monumental step towards achieving unparalleled scalability for Ethereum. We can already see most of the major L2s committing to start using the new blob space as soon as the Dencun upgrade happens.

In conclusion, EIP-4844 is more than just an upgrade. It's a pivotal moment in Ethereum's journey towards becoming a more scalable, efficient, and user-friendly blockchain. By reducing the costs and increasing the efficiency of layer 2 solutions, Ethereum is set to solidify its position as the leading platform for decentralized applications.
