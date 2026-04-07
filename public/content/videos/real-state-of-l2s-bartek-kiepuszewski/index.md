---
title: "Keynote: the REAL state of L2s"
description: "L2BEAT founder Bartek Kiepuszewski delivers a keynote at Devcon SEA on the current state of Layer 2 solutions — examining the gap between rollup security promises and reality, and proposing a path toward true decentralization."
lang: en
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "State of L2s"
---

A keynote by **Bartek Kiepuszewski**, founder of L2BEAT, at Devcon SEA examining the current state of Layer 2 solutions — the gap between rollup security promises and reality, new evaluation categories, and L2BEAT's pledge to put significant resources into verifying proof systems over the next year.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ik2JxmHDmyw) published by Ethereum Foundation. It has been lightly edited for readability.*

### The stage framework (0:00)

So let's talk about the real state of L2s. We introduced the stage framework about a year ago, and I think it's been really helpful in clarifying exactly where we are. Stages 0, 1, and 2 represent increasing levels of security maturity for a rollup. At stage 0, you basically have training wheels — the system has a proof mechanism, but there are significant trust assumptions. At stage 1, the proof system is functional and there are security council guardrails, but you still don't have a fully trustless system. At stage 2, you have a fully decentralized rollup where the proof system is the final arbiter.

The good news is that we're seeing real progress. We've had several systems reach stage 1. Arbitrum and Optimism reached stage 1 milestones recently, and dYdX was essentially one of the first systems that would qualify for stage 2 if not for governance process requirements.

### The security promise gap (5:00)

End users who are using these systems are putting money into rollups because they believe they inherit the security of Ethereum. But the reality is more nuanced than the marketing suggests. We need to be honest about where we are.

The first big issue was assuming that having a proof system automatically means security. Many rollups do have a proof system, but it's behind a very short permissioned whitelist. Sometimes this whitelist is controlled by a single entity. That's not the decentralized security model that was promised.

### A new category: "Others" (10:00)

We're going to put systems that don't meet the rollup security criteria into a third category. Our working name is "Others." The point is they are secured by multisigs, right? And we will expose these multisigs for what they are. That's what we want to do in our UI.

The UI is going to look roughly like this: you will see rollups, you will see validiums and optimiums, and you will see "Others." The default sorting will be by security, not by TVL. Let's not chase TVL with bad security — that's going to end really, really badly.

We will promote stage 1 and stage 2 projects, and we will look at stage 0 projects as contenders. We're happy to list them — you just need to be essentially aligned with Ethereum, you need to have a bridge that allows you to move funds. However, we will look at the trust assumptions, we'll look at the multisigs, and we hope that slowly but surely they will move from "Others" to either validium/optimium or to rollups.

### Verifying proof systems — our pledge (15:00)

Is it enough to just say, "Hey, I've got a proof system. Am I in the first category?" Well, it's not. Our pledge to the community as L2BEAT is that the next year we're going to put significant resources into actually looking super hard and very deep into these proof systems to make sure that they are sound and complete.

We will analyze both ZK and optimistic proof systems. We will go into the source code. We will look at how you created your trusted setup. We will look at your circuits and see what exactly is being verified onchain. We want to make everything super transparent so that trust assumptions are clearly communicated, and more importantly, your proof system cannot be hidden behind an unreasonably small whitelist.

We're hiring researchers. We will do all that work. This is our pledge for the next year to come.

### The real data (18:00)

This is the real data right now — the real systems that may fall into the "Others" category if they don't introduce a proof system. You will see exactly who's the proposer, who's the Challenger, and who's the upgrader. The funny thing is you can see this today on L2BEAT. It's just that the information is so deeply hidden in the details page that I bet only researchers and enthusiasts check it out. It's all available today. However, we want to expose this data to end users. We want end users to be truly aware of what's going on so that we are all accountable for the system we're building.

### Q&A: Decentralized sequencers (22:00)

**Host:** Is it important that rollups have a decentralized sequencer, or are other safety mechanisms sufficient?

**Bartek:** This is a very important question. I think there are different designs we'll see. I don't think decentralizing the sequencer is super important for the security of user funds, but it may be important for real-time censorship resistance. Vitalik said during his opening keynote that the future might be rollups going based — leveraging Ethereum infrastructure for real-time censorship resistance. Others, like MegaETH, might have very centralized sequencers and rely only on the escape hatch. We might see hybrid constructions. The design space is huge, and right now we as observers at L2BEAT really want to see what's going to happen and how it plays out.

### Q&A: TEE-based proof systems (23:00)

**Host:** Will TEE-based proof systems be considered stage 2 even if they imply trust in hardware manufacturers?

**Bartek:** Short answer: no. Because with the constructions we see today, Intel or SGX could submit a proof and potentially block, steal, or freeze whatever they want without anyone really noticing and without Ethereum noticing. However, with all the work being put forward to create trustless, permissionless TEEs — I'm told this is actually extremely exciting work. But short answer for today: no.

### Q&A: Why don't projects build towards stage 1? (24:00)

**Host:** What are the core reasons projects don't build towards stage 1?

**Bartek:** Complexity, time, cost, talent. It's surprisingly costly. The pioneers — four years ago — were essentially building these systems from scratch. dYdX was literally one of the first ZK rollups. It was application-specific, but still one of the first. And if not for small governance nuances, it would be stage 2 really. It was built four years ago, so it's not like it's impossible.

What makes it hard today is that the majority of rollups are not built by the teams themselves — they're launched by rollup-as-a-service providers, and we need to incentivize them to do better. It's hard. No one said it would be easy.

### Evolving criteria (25:00)

The criteria are not set in stone because all these systems are evolving. We need to evolve with them. Both Optimism and Arbitrum — the two leaders — have a lot of nuances that I don't have time to go into. But it's not like you have a stage designation forever. If new information surfaces, or if we missed something, it's possible to lose that designation.

**Host:** Thank you, Bartek. Let's give him a big hand. I think the Ethereum community really appreciates your work.
