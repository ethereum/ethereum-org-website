---
title: The privacy roadmap for Ethereum
description: Ethereum is working to make privacy a first-class property of the network through upgrades that protect transaction privacy, secure user data access, and enable verifiable but private identity.
lang: en
image: /images/roadmap/roadmap-security.png
alt: "Ethereum roadmap"
template: roadmap
---

**Privacy on Ethereum is moving from an optional add-on to a network-level default.** Ethereum's proposed privacy roadmaps target specific vulnerable connection points where user data can leak today. Research across the ecosystem aims to make Ethereum a platform where privacy is structural rather than opt-in.

Researchers at the Ethereum Foundation have [aggregated three core roadmap priorities](https://pse.dev/blog/pse-roadmap-2025) from across the ecosystem's distributed research:

- **Private reads** - query and browse Ethereum without revealing which addresses, contracts, or data a user is accessing. Protecting reads stops data from being harvested before a transaction is even signed.
- **Private writes** - send transactions that are resistant to censorship and metadata leakage, from mempool inclusion to final settlement. Protecting writes ensures private transactions are not censored or linked back to their origin.
- **Private proving** - verify identity, eligibility, or data without disclosing underlying personal information, using efficient zero-knowledge proofs. Private proving allows users to participate in the network while opting-in to reveal only the minimum information necessary (selective disclosure).

Together, these three areas form an end-to-end privacy model. The goal is **computational sovereignty**, ensuring Ethereum is a platform where individuals and institutions can interact, coordinate, and transact globally without unapproved data harvesting, surveillance, or centralized censorship.

**Why is privacy important?** Learn about privacy, how to protect your privacy online, and protecting your privacy on Ethereum today.

<ButtonLink variant="outline" href="/privacy/">More on privacy</ButtonLink>

## Private reads protect user queries and access data {#private-reads}

Before a transaction is ever signed, a user needs to read data from the blockchain. To check a balance, estimate gas, or verify the state of a smart contract, wallet software sends queries to a node provider. These standard **Remote Procedure Call (RPC)** queries expose an immense amount of metadata.

The node provider can see the user's IP address, device fingerprint, specific queried addresses, and the timing and frequency of their activity. Even if a user then sends a private transaction, the infrastructure provider already has access to a detailed map of their intentions.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Metadata leakage at the access layer is one of the most persistent privacy problems in all blockchain systems. Ethereum aims to address metadata leakage through privacy in origin, or hiding who asked, privacy in content, or hiding what was asked, and verifying the correctness of the information returned.

**Origin privacy** uses [anonymous RPC](https://privreads.ethereum.foundation/feed/anon-rpc/) and anonymous network solutions to obscure the entity requesting the data, **content privacy** uses tactics like private information retrieval and [oblivious RAM](https://en.wikipedia.org/wiki/Oblivious_RAM) to hide the data being queried, while **correctness verification** uses light clients to prove the data returned is accurate.

The cryptographic building block behind content privacy is [**Private Information Retrieval (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), a cryptographic technique that allows a client to query a database and retrieve a specific piece of information without revealing to the server which item was accessed. The server processes the request blindly and returns an encrypted response that only the querying wallet can decrypt.

PIR operates at the access layer, sitting between wallet software and node providers. As PIR implementations mature they will be integrated into wallet software development kits (SDKs) and infrastructure providers, allowing users to query the network without exposing their activity to centralized intermediaries.

Private reads also reduce exposure to front-running and transaction ordering attacks. If an infrastructure provider cannot see which smart contract or address a user is querying, it cannot sell that information to actors who profit from anticipating onchain activity.

## Private writes prevent censorship and transaction leakage {#private-writes}

Once a transaction is sent, it passes through network infrastructure that can observe or block it before it is recorded onchain. This is where many privacy protocols fail in practice. Large, centralized block builders monitor the mempool and can quietly sideline or censor transactions originating from privacy tools. Even if the underlying cryptography is sound, a transaction that is never included in a block provides no protection.

Two protocol-level upgrades address this problem together:

[**EIP-8141 (Frame Transactions)**](https://eips.ethereum.org/EIPS/eip-8141) introduces a new transaction type that splits transactions into segments for signature validation and fee authorization, and for the actual transaction instructions. Frame transactions allow [smart accounts](/roadmap/account-abstraction/) to define their own signature schemes and use external contracts to cover gas fees. Strict sandboxing rules in the mempool prevent these transactions from opening the network to denial-of-service attacks.

Frame transactions are being considered for Ethereum's [Hegotá upgrade](https://forkcast.org/upgrade/hegota/), the next network upgrade after the upcoming [Glamsterdam upgrade](/roadmap/glamsterdam/). The same upgrade will also allow smart accounts to adopt [quantum-safe signatures](/roadmap/security/quantum-resistance/) before the full post-quantum network transition is complete.

<ExpandableCard title="How do frame transactions (EIP-8141) enable privacy?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Frame transactions allow accounts to choose their own signature verification method. For privacy, this means users can adopt privacy-preserving signature schemes without waiting for a large-scale, network-wide migration. Frame transactions also allow gas fee abstraction, allowing privacy tools to cover transaction costs without exposing user addresses onchain.

</ExpandableCard>

[**EIP-7805 (Fork-Choice Enforced Inclusion Lists, or FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) provides the enforcement mechanism for private writes. Block proposers are required by consensus rules to include transactions in their blocks from aggregated local inclusion lists, which collect transactions from multiple sources. If a block builder attempts to censor a transaction that appeared on the inclusion lists, attesting nodes reject the proposed block entirely. FOCIL is currently being considered for the [Hegotá upgrade](https://forkcast.org/upgrade/hegota/).

Frame transactions give users the flexibility to build privacy-preserving transactions with custom signature schemes, while FOCIL ensures those transactions cannot be selectively censored once they enter the mempool. Together they address two different failure points: one enables the format of private transactions, the other guarantees their inclusion. No central actor can block a valid private transfer.

<VideoWatch slug="eip-7805-focil-explained" />

A second vulnerable point for user privacy is how Ethereum tracks the order of transactions, called the sequential nonce system. In the standard Ethereum account model, every account uses a single, linearly incrementing counter. If one private transaction is delayed in the mempool, all subsequent transactions from that account stall behind it. The nonce sequence also lets network observers link multiple transactions back to the same originating account, undermining privacy.

[**EIP-8250 (Keyed Nonces for Frame Transactions)**](https://eips.ethereum.org/EIPS/eip-8250), currently being considered for Hegotá, resolves this by allowing a single account to manage multiple parallel transaction sequences simultaneously. Users can execute many private transactions across different contexts at the same time, and observers can no longer reliably correlate distinct activities back to the same parent account.

### Private payments and value transfer {#private-payments}

Beyond transaction routing and nonce management, protecting writes requires shielding the identities and assets involved in a transfer. Even when a user queries privately and broadcasts a transaction without censorship, the transaction data recorded onchain remains publicly visible. Anyone can see who sent how much to whom, and chain analysis firms aggregate this data into searchable profiles that persist indefinitely.

[**EIP-8182 (Private ETH and ERC-20 Transfers)**](https://eips.ethereum.org/EIPS/eip-8182), proposed for the Hegotá upgrade, introduces a native, shared shielded pool directly into the Ethereum protocol for ETH and ERC-20 transfers. Privacy pools use cryptographic mixing to sever the link between deposit and withdrawal, but are only available via privacy apps, wallets, and layer 2 networks today.

Historically, app-level privacy solutions have fractured liquidity and suffered from low anonymity sets. EIP-8182 consolidates shielded transfers at the protocol level, allowing users to route funds via hidden delivery keys without requiring specialized wallet architectures or interacting with fragmented, opt-in applications.

Other research approaches being advanced for transaction privacy include proofs that allow users to demonstrate that transaction amounts are valid without revealing the actual values (like bulletproofs and range proofs). Research into **confidential transactions** aims to hide amounts while still allowing the network to verify that no value is created or destroyed.

These payment-layer solutions build on the infrastructure described earlier in this section. PIR protects the preparation phase, frame transactions and FOCIL ensure private payments reach the mempool without censorship, and zkVMs enable the complex cryptography required for value hiding while maintaining network security guarantees.

## Private proving and identity protection {#private-proving}

Privacy is not about total concealment. It is about **selective disclosure**, or choosing what information to reveal, to whom, and on what terms. Ethereum supports selective disclosure through [**zero-knowledge proofs (ZKPs)**](/zero-knowledge-proofs/), which allow one party to prove a statement is true without revealing the underlying data. For example, proving citizenship without revealing passport details, or proving an age threshold without revealing an exact date of birth.

Private proving connects to the privacy roadmap by enabling verifiable identity without data exposure at the protocol level. While private reads and writes protect transaction metadata, private proving ensures that the identity and eligibility checks required for real-world participation do not require surrendering personal data to centralized verification systems.

On Ethereum's privacy roadmap, private proving is supported by complementary infrastructure tracks, one on the execution layer to make private computation possible at the protocol level, and one on the access layer, which makes private computation practical on consumer devices.

**Zero-knowledge virtual machines (zkVMs)** allow smart contracts to run their logic and generate a cryptographic proof that the work was done correctly. When that proof is truly zero-knowledge, it reveals nothing about the inputs, intermediate state, or outputs, unlocking private computation at the network level.

The "zkVM" name carries a nuance; most systems called zkVMs today are succinct rather than zero-knowledge. Their proofs are small and fast to verify, but do not necessarily hide the data used to generate them. Today, only a handful of proving systems provide the hiding property that privacy applications depend on. The [Client-Side Proving benchmarks](https://ethproofs.org/csp-benchmarks) track which zkVMs have been analyzed for actual zero-knowledge in their system properties. Closing that gap is part of the roadmap's private proving work.

Frame transactions (EIP-8141) are also connected to implementing zkVMs. They can use custom verification schemes to submit proof-verified state transitions, allowing apps to offer private execution environments and submit the cryptographic proof to the public Ethereum network that the action was done correctly, without exposing the transaction data itself.

Zero-knowledge proofs are excellent for allowing individuals to prove their data is valid while keeping it private, but they cannot easily manage smart contracts where multiple users need to interact with a shared pool of secret data at the same time.

To bridge this gap, Ethereum's roadmap incorporates **Fully Homomorphic Encryption (FHE)**. FHE allows smart contracts to run calculations directly on encrypted data without ever having to decrypt or expose the underlying information. Integrating FHE building blocks and specialized cryptographic coprocessors into Ethereum is essential for decentralized applications that rely on a shared "hidden state," like private automated market makers (AMMs), confidential lending pools, or sealed-bid auctions where everyone's inputs must interact while remaining completely secret.

**Client-side proving** makes generating these privacy proofs practical on everyday devices. The Client-Side Proving project maintains a public benchmark suite comparing proving systems and zkVMs on consumer hardware, publishing results at [ethproofs.org](https://ethproofs.org). Technical research aims for transparent, [post-quantum](/roadmap/security/quantum-resistance/) proofs with direct onchain verification, making private computation faster, easier to verify directly on the Ethereum network, and viable on mobile devices.

The [**zkID initiative**](https://pse.dev/projects/zk-id) has produced open-source infrastructure aligned with global identity frameworks, including the European Digital Identity (EUDI) wallet. The Open Anonymous Credentials (OpenAC) system provides unlinkability for issued credentials, ensuring that multiple proofs generated by the same user across different platforms cannot be correlated back to a single profile.

In the governance space, the [**Minimal Anti-Collusion Infrastructure (MACI)**](https://maci.pse.dev/) protocol provides **receipt-freeness**, making it cryptographically impossible to prove how an account voted. Because voters cannot produce a receipt showing their choice, vote-buying and coercion lose their economic incentive. MACI has secured real-world funding decisions since 2020 through [clr.fund](https://clr.fund/), which has distributed millions of dollars in quadratic funding for Ethereum public goods.

Privacy-preserving voting is already protecting real voters in high-stakes settings. [Rarimo's Freedom Tool](https://docs.rarimo.com/freedom-tool/) uses zero-knowledge passport verification to let citizens prove they are eligible to vote without revealing who they are. It has powered anonymous shadow elections and opposition polls in countries including Russia (the [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a) opposition vote), Georgia (the United Space polling app), and Iran (the Iranians Vote project), where voter safety depends on cryptographic ballot secrecy.

Private proving also enables **compliance-aware privacy**. Privacy solutions like privacy pools accept deposits freely but require users to generate zero-knowledge proofs that their funds do not intersect with known malicious addresses before withdrawing. The programmable compliance model separates the act of shielding transactions from the act of demonstrating regulatory compliance, allowing everyday users to transact privately while meeting institutional requirements.

zkEVMs can execute these compliance checks privately, verifying regulatory status without exposing transaction details or user identities.

## Current roadmap progress {#current-progress}

The direction of privacy development on Ethereum is shaped by ecosystem-wide alignment rather than any single organization. The [strawmap.org](https://strawmap.org/) roadmap collects proposed upgrades from across the ecosystem to track and propose where the community has reached consensus. Researchers at the Ethereum Foundation help steward a parallel research and development roadmap across the research ecosystem, focused on advancing access-layer privacy tools, identity infrastructure, and compliance-aware systems. Both examples reflect the same underlying priority to make privacy on Ethereum structural rather than optional.

Research and development into privacy on Ethereum spans dozens of teams across the ecosystem. Work is advancing on protocol upgrades, access-layer solutions, identity infrastructure, and compliance-aware tools.

**Protocol upgrades**: EIP-8141 (Frame Transactions), EIP-7805 (FOCIL), EIP-8250 (Keyed Nonces), and EIP-8182 (Protocol-Level Shielded Pools) are in active development and being considered for the [Hegotá upgrade](https://forkcast.org/upgrade/hegota/), the next network upgrade after [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (optional execution proofs) and Verkle Trees are also targeted for Hegotá, providing the foundation for zkEVM-based private computation on Ethereum Mainnet. In parallel, research is maturing around FHE coprocessors to enable multi-party encrypted smart contracts.

**Access layer**: PIR research is progressing with active implementations like [Raven](https://github.com/hisoka-io/raven) being tested by infrastructure teams. The Kohaku wallet SDK is under development as an open-source reference for privacy-preserving wallets.

**Client-side proving**: Teams are actively using benchmark-driven test results to optimize how zero-knowledge proofs run on standard devices. Projects like Spartan-WHIR are advancing secure, quantum-resistant proofs that can be easily verified directly on the Ethereum network. Research initiatives like leanVM provide a lightweight zkVM designed to bundle multiple cryptographic signatures together, shrinking the data size of quantum-safe signatures by 250x to save space and reduce network costs.

**Identity and proving**: The zkID initiative is producing optimized proving schemes for mobile devices. MACI continues to secure quadratic funding rounds and DAO governance, tools like Rarimo's Freedom Tool are carrying zero-knowledge voting into real-world elections, and ongoing research continues into privacy-preserving identity standards.

No part of this work is finished. Timelines are targets, not guarantees, and Ethereum's [consensus-based governance process](/governance/) means that the roadmap may change as research advances. But the scope of active development and the number of teams working on privacy represent a clear commitment to making Ethereum extraction-resistant by default.

## Further reading {#further-reading}

- [Privacy on Ethereum](/privacy/)
- [PSE Roadmap: 2025 and Beyond](https://pse.dev/blog/pse-roadmap-2025)
- [The Ethereum Foundation Mandate](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Zero-knowledge proofs](/zero-knowledge-proofs/)
- [Decentralized identity](/decentralized-identity/)
- [Kohaku Roadmap](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Client-Side Proving benchmarks](https://ethproofs.org/csp-benchmarks)
- [zkEVM by the Numbers](https://zkevm.ethereum.foundation/)
