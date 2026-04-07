---
title: "Post-quantum security & Ethereum's 2026 roadmap"
description: "Tomasz Stańczak shares a comprehensive update at ETHBoulder on the Ethereum Foundation's 2025 progress and dives deep into one of Ethereum's most critical long-term challenges: post-quantum cryptographic security."
lang: en
youtubeId: "RBQwELDHXWk"
uploadDate: 2025-09-05
duration: "0:28:30"
educationLevel: advanced
topic:
  - "roadmap-and-priorities"
format: presentation
author: ETHBoulder
breadcrumb: "Post-Quantum Roadmap"
---

A comprehensive presentation by **Tomasz Stańczak** at ETHBoulder covering the Ethereum Foundation's progress in 2025, the state of post-quantum security research, and the concrete implementation roadmap for quantum-resistant cryptography across Ethereum's consensus and execution layers.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=RBQwELDHXWk) published by ETHBoulder. It has been lightly edited for readability.*

### EF progress and the cultural shift (0:00)

If Boulder contributes to the feeling that the Ethereum Foundation is cool again, that would be wonderful. We've been working hard to create a vibe that things are moving in the right direction. The culture has shifted significantly over the past year. We announced protocol changes in June. In May we announced the trillion-dollar security initiative. This is the dashboard where we track everything — all the protocol changes, the research progress, and the implementation timelines. We want to encourage more people from the EF to come and present publicly.

### The quantum threat landscape (5:00)

When we talk about quantum computers threatening Ethereum, there are two categories of risk. The first is breaking hash functions — this is actually a less immediate concern because quantum computers would need enormous scale to threaten hash functions, and the approach would be to simply increase the hash output length.

The second risk is far more concerning: breaking the elliptic curve cryptography used in transaction signatures — specifically ECDSA. Once quantum computers are capable of running Shor's algorithm at scale, anyone who has ever made a transaction has exposed their public key. A quantum attacker could derive the private key from the public key and steal funds.

### Strategic timeline: two to five years ahead (10:00)

We need to be strategically two to five years ahead of the quantum threat. Jeff recently announced a 10% BTC allocation removal from an Asia portfolio, citing quantum concerns. When institutional investors start worrying about quantum, it's time to have solutions ready. The financial markets globally are starting to talk more about the threats and are feeling very anxious. We said, OK, let's publish that research — there's been a lot of work done, and it's really well-prepared.

### Post-quantum signature schemes (14:00)

Ethereum's research is now proposing solutions around XMSS — Extended Merkle Signature Scheme — for the consensus layer. This is what was mostly worked on for the Lean Ethereum roadmap. We're integrating Lean Ethereum into the core development protocol roadmap proposal, which means we'll be proposing a post-quantum security roadmap to the All Core Devs for review.

The effects on hardware are significant. Post-quantum signatures are much larger than current ECDSA signatures. You don't have the comfort of having many, many years of established libraries considered very safe. If you implement these new schemes, you have risks of side-channel attacks — not only do you need to implement the cryptography correctly, you also have to implement it in a way that makes sure the execution times and effects on hardware are not affected by the actual numbers or the paths being taken. You have to ensure your library always takes the same paths and uses the same CPU load. Otherwise, you can observe it through side channels and extract information.

Many cryptographers say one thing is to implement it properly. The other is to prevent any optimization that would expose the libraries to side-channel attacks.

### The migration challenge (18:00)

One of the biggest problems with post-quantum security is the account migration. You have to take all existing accounts on the blockchain and ensure that somehow users execute an action of upgrading to post-quantum signature schemes. If they don't take any action, the accounts are at risk. Even if those accounts are dead — nobody holds the keys because they were lost — it's still a problem because quantum attacks may recover those keys.

There are emergency approaches. You assume that if somebody holds keys, they likely hold the preimage — the seed phrase. You can do the emergency approach where people ZK-prove that they hold the seed phrase that generated the public key. Then you can lock those accounts until someone posts the proof. But you're still risking that those who generated keys directly without a seed phrase might never be able to recover their funds.

### Performance and implementation progress (22:00)

We want formal verification, which is accelerating a lot now. We've had examples of formal verification done very fast thanks to AI. We want to analyze performance changes — the economy of block space changes. The basic transactions might be 10 to 20 times more expensive than today because of the larger signatures in post-quantum schemes. By scaling L1, we create more space for the new type of signatures.

We're tracking the verification times for XMSS, and they look promising. For multi-signatures and aggregation it's a bit slower, but generally the progress is very promising. We're super happy with the work. There have been post-quantum devnets launched for interoperability between clients — multiple clients implementing devnets for post-quantum. Post-quantum devnet 2 is active at the moment.

### The full roadmap (25:00)

The Lean Ethereum roadmap website is extremely detailed and well-coordinated for all post-quantum security efforts. The All Core Devs post-quantum calls are run every two weeks. There are devnets running, workshops being executed — there was a meeting in Cambridge, and we plan another one this year in Cologne and then again in Cambridge in October.

The roadmap that Ethereum has announced shows that we're already two years into preparation for post-quantum. When it was presented in Bangkok, people said Ethereum is slow and thinking very slowly. But now it shows we're already midway and building the solutions. That roadmap is being followed. People are calming down because they can see the work is happening.

Massive funding for bounties — million dollars for the post-quantum roadmap. Integration, education, and implementation. Thank you so much.
