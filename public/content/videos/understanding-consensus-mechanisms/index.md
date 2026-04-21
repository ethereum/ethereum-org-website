---
title: "Understanding blockchain consensus mechanisms"
description: "An explainer covering the core consensus mechanisms used in blockchains, and how they enable decentralized networks to agree on the state of transactions without a central authority."
lang: en
youtubeId: "ojxfbN78WFQ"
uploadDate: 2018-11-29
duration: "0:09:33"
educationLevel: beginner
topic:
  - "consensus"
  - "blockchain"
format: explainer
author: Tech in Asia
breadcrumb: "Consensus Mechanisms"
---

An explainer by **Tech in Asia** covering the three main consensus mechanisms used in blockchain systems, proof of work, proof of stake, and proof of authority, and how they enable decentralized networks to agree on the state of transactions.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ojxfbN78WFQ) published by Tech in Asia. It has been lightly edited for readability.*

#### What are consensus mechanisms? (0:00) {#what-are-consensus-mechanisms-000}

Blockchain — the hype word of 2018. But do you know how a decentralized peer-to-peer system with no authoritative figure makes decisions? The answer lies in consensus mechanisms. There are various consensus mechanisms, but they all serve the same purpose: to ensure records are true and honest. The difference is the way consensus is reached. Here we will explore three types of consensus mechanisms.

#### Proof of work (0:23) {#proof-of-work-023}

In a proof-of-work system, transaction data is stored in blocks, validated by having people solve a complicated math problem attached to it. This is typically done by powerful computers and is known as "mining." A reward in the form of a cryptocurrency is issued to the first miner who cracks the problem.

Imagine a group of treasure hunters trying to open a chest with a complicated lock attached to it. Figuring out the correct combination is tedious, but the first person to do so gets rewarded. Simply put, proof of work is a race to figure out the right combination on a treasure chest. Cryptocurrencies like Bitcoin and Ethereum use a proof-of-work mechanism.

#### Proof of stake (1:04) {#proof-of-stake-104}

Next, we have proof of stake. Here the creator of a new block, also known as a validator, is randomly chosen based on how much stake they commit to the network. The higher the stake placed, the higher the chance of being selected as a validator.

Let's apply this to the treasure chest scenario. Picture a group of treasure hunters vying for a chest. The chest is rewarded based on a lottery system. To participate, each hunter has to buy lottery tickets. The more each hunter buys, the higher the chance of winning. Blockchain protocols like Cardano's Ouroboros and EOS adopt the proof-of-stake consensus.

#### Proof of authority (1:42) {#proof-of-authority-142}

Lastly, proof of authority — a modified form of proof of stake. Here, only approved parties selected based on their reputation can become validators.

Let's revisit the treasure chest scenario. The group of treasure hunters form a union and pool their treasures. Based on their level of trustworthiness, a select few are appointed by the group to ensure the validity of the chest's content. IBM's Hyperledger Fabric and Ethereum's Kovan testnet are some examples of blockchain systems that use proof of authority.

#### Hybrid consensus models (2:14) {#hybrid-consensus-models-214}

Whilst traditional blockchain companies exist on a single consensus mechanism, some innovative ones are adopting multiple consensus protocols. Take Opet Foundation, for example, who is building a unique blockchain to store data collected on its tuition companion chatbot app by applying both proof-of-authority and proof-of-work protocols.

Data such as students' academic, extracurricular, and personality profiling records are stored on the blockchain and potentially validated via a proof-of-authority framework powered by Hyperledger Fabric. Validators, in this instance, are reputable educational institutions or even national registrars and respective ministries of education. This helps ensure that all student data is trustworthy.

But who will work for free? Proof-of-work consensus comes into play to reward validators who have performed work.

#### Privacy and student data (3:02) {#privacy-and-student-data-302}

With Hyperledger Fabric, each student record is secured with a private hash key owned by the student. The data can only be accessed when the student provides the unique key. This means student privacy is preserved and controlled by the student themselves.

For example, when students apply to university via Opet's platform, they provide the unique key of their records to the university. With that, the university is able to access their latest academic records. Students will also be able to see if their records have been unlocked or at least considered for application. This boosts efficiency and transparency compared to traditional methods.

#### Closing (3:37) {#closing-337}

By marrying the proof-of-work and proof-of-authority models, Opet Foundation's blockchain solution ensures privacy on students' data while incentivising both educational institutions and students when they contribute to the platform. With blockchains gaining popularity, it's only a matter of time before we see even more unique hybrid systems created.
