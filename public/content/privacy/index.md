---
title: Privacy on Ethereum
description: Tools and techniques for protecting your privacy on Ethereum
lang: en
---

# Privacy on Ethereum {#introduction}

Privacy is not only essential for personal safety, it’s a cornerstone of freedom and a key [guarantor for decentralization.](https://vitalik.eth.limo/general/2025/04/14/privacy.html) Privacy gives people the ability to express themselves, transact with others, and organize communities freely. But like all blockchains, Ethereum’s public ledger makes privacy challenging.

Ethereum is transparent by design. Every onchain action is visible to anyone who looks. While Ethereum offers pseudonymity by linking your activity to a [public key](https://ethereum.org/en/decentralized-identity/#public-key-cryptography) instead of a real-world identity, patterns of activity could be analyzed to reveal sensitive information and identify users.

Building privacy-preserving tools into Ethereum can help people, organizations, and institutions interact securely while limiting unnecessary exposure. This makes the ecosystem safer and more practical for a wider range of use cases.

## Privacy for writes {#privacy-of-writes}

By default, every transaction written on Ethereum is public and permanent. This includes not only sending ETH, but also registering ENS names, collecting POAPs, or trading NFTs. Everyday actions like payments, voting, or identity verification can reveal your information to unintended parties. There are several tools and techniques that can help make these more private:

**Mixing protocols (or “mixers”)**
Mixers break the link between senders and recipients by putting many users’ transactions into a shared “pool” and then letting people withdraw later to a fresh address. Since deposits and withdrawals are jumbled together, it’s much harder for observers to connect them.
*Examples:* [*PrivacyPools*](https://docs.privacypools.com/)*,* [*Tornado Cash*](https://tornado.cash/)

**Shielded Pools**
Shielded pools are similar to mixers but they allow users to hold and transfer funds privately inside the pool itself. Instead of just obscuring the link between deposit and withdrawal, shielded pools maintain an ongoing private state, often secured with zero-knowledge proofs. This makes it possible to build private transfers, private balances, and more.
*Examples:* [*Railgun*](https://www.railgun.org/)*,* [*Aztec*](https://aztec.network/)*, Nightfall*

[**Stealth addresses**](https://vitalik.eth.limo/general/2023/01/20/stealth.html)
A stealth address is like giving each sender a unique, one-time P.O. box that only you can open. Every time someone sends you crypto, it goes to a fresh address, so no one else can see that all those payments belong to you. This keeps your payment history private and harder to track.
*Examples:* [*UmbraCash*](https://app.umbra.cash/faq)*,* [*FluidKey*](https://www.fluidkey.com/)

Other projects exploring private writes include [PlasmaFold](https://pse.dev/projects/plasma-fold) (private payments) and systems like [MACI](https://pse.dev/projects/maci) and [Semaphore](https://pse.dev/projects/semaphore) (private voting).

These tools expand options for writing privately on Ethereum, but each comes with tradeoffs. Some approaches are still experimental, some increase costs or complexity, and some tools like mixers may face legal or regulatory scrutiny depending on how they’re used.

## Privacy for reads {#privacy-of-reads}

Reading or checking any information on Ethereum (e.g. your wallet balance) usually goes through a service such as your wallet provider, a node provider, or a block explorer. Because you’re relying on them to read the blockchain for you, they can also see your requests along with metadata like your IP address or location. If you keep checking the same account, this information can be pieced together to link your identity to your activity.

Running your own Ethereum node would prevent this, but storing and syncing the full blockchain remains costly and impractical for most users, especially on mobile devices.

Some projects exploring private reads include [Private Information Retrieval](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (PIR, fetch data without revealing what you’re looking up),[ zkID](https://hackmd.io/@brech1/ethereum-privacy-pir?utm_source=preview-mode&utm_medium=rec) (private identity checks with zero-knowledge proofs), [vOPRF](https://pse.dev/projects/voprf) (use Web2 accounts pseudonymously in Web3), [vFHE](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) (compute on encrypted data), and [MachinaIO](https://pse.dev/projects/machina-io) (hide program details while keeping functionality).

## Privacy for proving {#privacy-of-proving}

Privacy-preserving proofs are tools you can use on Ethereum to show that something is true without revealing unnecessary details. For example, you could:

  * Prove you’re over 18 without sharing your full birthdate
  * Prove ownership of an NFT or token without revealing your entire wallet
  * Prove eligibility for a membership, reward, or vote without exposing other personal data

Most tools for these rely on cryptographic techniques like zero-knowledge proofs, but the challenge is making them efficient enough to run on everyday devices, portable to any platform, and secure.

Some projects exploring privacy for proving include [Client Side Proving](https://pse.dev/projects/client-side-proving) (ZK proving systems), [TLSNotary](https://tlsnotary.org/), (proofs of authenticity for any data on the web), [Mopro](https://pse.dev/projects/mopro) (mobile client-side proving), [Private Proof Delegation](https://pse.dev/projects/private-proof-delegation) (delegation frameworks that avoid trust assumptions), and [Noir](https://noir-lang.org/) (language for private and verifiable computing).

## Privacy Glossary {#privacy-glossary}

**Anonymous**: Interacting with all identifiers permanently removed from your data, making it impossible to trace information back to an individual.

**Encryption**: A process that scrambles data so that only someone with the correct key can read it.

[**Fully Homomorphic Encryption**](https://pse.dev/blog/zero-to-start-applied-fully-homomorphic-encryption-fhe-part-1) **(FHE)**: A way to perform computations directly on encrypted data, without ever decrypting it.

[**Indistinguishable Obfuscation**](https://pse.dev/projects/machina-io) **(iO)**: Privacy techniques that make programs or data unintelligible while still usable.

[**Multi-Party Computation**](https://pse.dev/blog/secure-multi-party-computation) **(MPC)**: Methods that allow multiple parties to compute a result together without exposing their private inputs.

**Programmable Cryptography**: Flexible, rule-driven cryptography that can be customized in software to control how and when data is shared, verified, or revealed.

**Pseudonymous**: Using unique codes or numbers (like an Ethereum address) in place of personal identifiers.

**Selective Disclosure**: The ability to share only what’s needed (e.g. proving you own an NFT without revealing your entire wallet history.)

**Unlinkability**: Making sure separate actions on the blockchain cannot be tied back to the same address.

**Verifiability**: Ensuring others can confirm a claim is true, such as validating a transaction or proof on Ethereum.

**Verifiable Delegation**: Assigning a task—like generating a proof—to another party (e.g. a mobile wallet using a server for heavy cryptography) while still being able to verify it was done correctly.

[**Zero-Knowledge Proofs**](https://ethereum.org/en/zero-knowledge-proofs/#why-zero-knowledge-proofs-are-important) **(ZKPs)**: Cryptographic protocols that let someone prove information is true without revealing the underlying data.

**ZK Rollup**: A scalability system that batches transactions off-chain and submit a validity proof on-chain. Not private by default, but they enable efficient privacy systems (like shielded pools) by reducing costs.

## Resources {#resources}

  * [Privacy Stewards of Ethereum](https://pse.dev/) (PSE), an Ethereum Foundation research and development lab focused on privacy for the ecosystem
  * [Web3PrivacyNow](https://web3privacy.info/), a network of people, projects, and aligned organizations who protect and advance human rights online
  * [WalletBeat](https://beta.walletbeat.eth.limo/wallet/summary/), an Ethereum wallet rating site aiming to provide a comprehensive list of wallets, their functionality, practices, and support for certain standards.
  * [Zk-kit](https://zkkit.pse.dev/): A set of libraries (algorithms, utility functions, and data structures) that can be reused in different projects and zero-knowledge protocols.
  * [Privacy Apps](https://ethereum.org/en/apps/categories/privacy/) - Discover a list of curated Privacy applications that run on Ethereum.
