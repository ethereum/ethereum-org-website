---
title: "Keynote: the REAL state of L2s"
description: "A talk on the current state of Layer 2 solutions, examining the gap between rollup security promises and reality and proposing a path toward true decentralization."
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

A keynote by **Bartek Kiepuszewski**, founder of L2BEAT, at Devcon SEA examining the current state of Layer 2 solutions, the gap between rollup security promises and reality, new evaluation categories, and L2BEAT's pledge to put significant resources into verifying proof systems over the next year.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=ik2JxmHDmyw) published by Ethereum Foundation. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

Being a founder of L2BEAT, I do have a unique opportunity to work with essentially every single L2 team out there, and we've been working with them since the very beginning of this space — which is like four years ago. That's incredible. Time flies by very quickly. We've worked with the early pioneers in ZK tech, we've worked with the Plasma Group that renamed to Optimism, we've worked with Arbitrum. And from this stage I do want to acknowledge all these teams, because without your support we certainly wouldn't be here. As L2BEAT, we are extremely thankful for all the support that the community gives us.

So let's have a look at what we've managed to achieve. First of all, we've managed to launch almost 50 rollups and over 50 other L2s. That's an incredible achievement — it's a lot of systems, and we've got almost as many to launch in the coming months. We've put a lot of value, a lot of TVL, on these systems as well, and if you look at the charts they're all going up only.

The thing is, with all that growth comes also a lot of responsibility. We need to understand that end users who are using these systems are putting money into these rollups because they believe that rollups inherit the security of Ethereum. With that kind of realization, in my opinion, we need to start getting serious about security.

#### Scaling Ethereum (2:10) {#scaling-ethereum-210}

We've also managed to scale Ethereum. Ethereum was charming along quite fine, but it started to get really slow for the demand and the fees were getting really high. So surely we are scaling — these numbers also go up. This is incredible.

However, there is a "but." You know, guys, there's always a "but," right? And I'm just here to be honest with all of you. I really want this space to get serious, and this is my opportunity to call for your support to make sure that we don't fail — we don't fail the expectations of the community. We need to start being really serious about the security of what we're building.

Because you know, we've been using training wheels for too long. If you're an adult using training wheels — and I repeat, it's been four years — then you are really immature. It's okay to use training wheels if you're a child. It's not okay to use training wheels if you're an adult. And I think it's time for all of us to really stop being shy about it. We should all speak out, and we shouldn't suffer from emperor's new clothes syndrome.

#### The big "but": missing proof systems (4:30) {#the-big-but-missing-proof-systems-430}

So what is this big "but"? Well, first of all, most L2s today do not have a proof system, which is kind of surprising because early pioneers like StarkNet, like zkSync, like Aztec — four years ago when they were launching their first application-specific rollups, they did have proof systems. So yes, you can launch today an L2 with one click of a button. However, is that really an L2? Is that really a rollup? What you're doing is launching something which is secured by a multisig. I don't think that's good enough.

The state of the ecosystem today is kind of like this on this diagram. On the left you can see the current L2s with a proof system. On the right you can see current L2s without a proof system. And I would bet that the vast majority of upcoming L2s will not have a proof system. That would include essentially every single OP Stack chain except for OP Mainnet and Base — and kudos to them, by the way, they're like champions. However, every single other OP Stack chain simply does not have a proof system.

That chart on the right will also include all the Orbit stacks, which do have a proof system, however it's actually behind an often very short permissioned whitelist. Sometimes this whitelist is just one actor — it's the same as the state proposer. It's essentially the state proposer and it's only them who can challenge themselves. Like, what? Seriously.

#### Security councils (6:00) {#security-councils-600}

Now, most L2s do not use security councils. What do we mean by a security council? A security council is essentially a multisig that consists of at least eight participants and requires a 75% consensus threshold. So you can think of it as a big multisig, but it's not just about the size — it's about the fact that we want the participants to be geographically decentralized. You might have heard yesterday an amazing presentation about the need for geo-diversification. That's what we want from these structures. And essentially, we want the participants most importantly to come from different companies and different jurisdictions. That's super important, and I'm going to show you some examples of why.

Think about security councils as these supercharged multisigs. There's a very important social layer behind them. So this is the current state of things, and again, it's very bad. We only have security councils in Arbitrum, Optimism, Polygon, zkSync — and I know that StarkNet, Scroll, and interestingly Fuel are launching with a security council. Everybody else is essentially a very small, internal, often private multisig, and frankly it is extremely hard to tell the difference between these multisigs and simple EOAs.

#### Data availability trust assumptions (7:25) {#data-availability-trust-assumptions-725}

The third big item that we did wrong is that most non-rollup L2s are set up with abysmal DA trust assumptions. And I use the word "abysmal" — A, because I like it, and B, because it's really, really bad.

Look at these examples on the left — Arbitrum, StarkEx, Immutable X. However, almost everybody else is literally posting DA to their server in the basement or whatever. We have no idea. We have literally no idea. Point is, they're really bad and they don't seem to care. So maybe users don't care — we don't know. But we need to really look at that data and tell everybody, hey, that's not a data availability committee.

A data availability committee was originally created and championed by StarkWare for the StarkEx implementations and by Arbitrum. But that was not the point — that you can say "I've got one server in my basement, I can call it a data availability committee." That's not what was the point of that exercise.

So all together, I'm sorry to say, but at the moment in most L2s, permissioned operators can steal or freeze your funds. We're here to make you all aware of that. Sorry to say it, but we need to change the attitude.

#### Why proof systems matter (8:40) {#why-proof-systems-matter-840}

Why should we care about proof systems? There are at least three good reasons in our opinion why we should all have a working proof system.

One is that it actually allows for permissionless exit in case all the operators are down — and they may be down for whatever reason. We had quite recently a case of dYdX going down. They warned the users, a lot of users didn't exit. However, if you do have a proof system, you can make the system so that in a permissionless way someone's going to take over, or you can build an escape hatch so users will be able to get their funds out. That's super important. Without a proof system you just simply cannot do that — it's impossible.

The second reason is that you can actually improve on the trust assumptions of the security council — assuming of course you have one. And the reason for that is quite nuanced. What you can do now is this: instead of the situation where a malicious proposer — and this is the diagram showing the vanilla optimistic rollup without a proof system, which you can see in a lot of OP Stacks today — there's a very strong multisig that can override the state root, and there's a proposer that proposes state roots. If that proposal is malicious, all they need to do is bribe a minority of the security council members to look away — not to do anything malicious, but to just simply do nothing, in which case the malicious proposal will actually go through and they will steal the funds.

Once you introduce a proof system, the situation is much harder for the malicious proposer, because now they need to bribe the **majority** of the security council. Not only do they have to bribe the majority, they have to actually make them do something malicious — not just simply look away. That's a very different proposition. To make someone look away is to say, "Hey, if I give you $10 million, you just lose your keys or go for a long international flight." If you want to make someone do something malicious, that's an entirely different proposition. We think that this fundamentally changes the trust assumptions, especially with a public security council.

Finally, proof systems — if you're Stage 2 — allow you to remove any intermediaries whatsoever. You don't need a security council, or if you do have it, it's only for emergency situations. So that may actually have profound regulatory implications. You may want to launch your L2 as a Stage 2 system from the very start. That's possible, but of course you do need to have a proof system — ideally you might want to have more than one. There are already some announcements of systems doing that, like the recent announcement from the Nethermind team building a rollup intended to be Stage 2 at launch.

#### Why security councils, not multisigs (11:29) {#why-security-councils-not-multisigs-1129}

That was about proof systems. Now, why security councils and not just simple multisigs? The reason is: don't believe multisigs are multisigs. That's the reason — unless there's a social layer that can actually convince you that these are fundamentally diversified.

We've had several big events in our history. We had Multichain that claimed they were very decentralized, and it turned out that no, they were not — and this is a claim you cannot really verify independently. Huge attack, or inside job, or rug — we are not sure.

Then we had a situation with Oasis, where they were approached by a UK court and they had to actually use the multisig to extract some funds from the protocol. It would have been impossible to do that if you had a geopolitically diversified security council, because there's no court order that can actually reach everybody.

Finally, quite recently we had an attack on a multisig. Don't think for a second that multisigs can't be attacked. Eventually we have to get rid of all of them.

So to sum up: if you have a Stage 0 rollup with no security council, essentially a malicious operator can do whatever they want with your funds. If you are a Stage 0 rollup with a security council, then an attacker needs to bribe a security council minority — maybe a hard thing to do, but much easier than bribing the security council majority, which you would need to do if your rollup has a proof system. And finally, no one can steal your funds if you're Stage 2. That's the promise of getting to Stage 2.

#### Proposed reclassification (13:10) {#proposed-reclassification-1310}

The question is: do we have the right incentives for projects to actually care? The problem is that the only thing we can do — we as L2BEAT and we as the Ethereum community — is to apply social pressure. Vitalik said that starting next year he will plan to only publicly mention L2s that are Stage 1. He previously even said that he's not going to call systems rollups if they're not Stage 1.

So we were wondering what can we do. At the moment we have stages for rollups. We don't have stages for validiums and optimiums. We were wondering for a long time — maybe we could introduce "Stage 0+" for systems that have proof systems but aren't Stage 1 yet. But after months of discussion, we decided: no, it is time to grow up.

What we're proposing to the community — and this is going to go on the forum for community feedback — is this. First, we want to create a separate category for systems. The main difference is that you will have to have a proof system to be Stage 0. So for example, StarkNet today will be Stage 0 under this classification. All the OP Stack chains that don't have a proof system — except Base and Optimism — will not fall into this category. And of course, we will give time for systems to adjust. That's the main category, and that should be like a super league of systems.

Then you have another category of systems that are not using Ethereum DA. They use additional trust assumptions that come with external DA. We call them "alt-DA" but they would include validiums, optimiums, and whatever hybrid construction you may create. However, they have to give you reasonable DA guarantees — that cannot be your basement. That has to be a reasonably sized data availability committee, or if you're using Celestia or Avail, you need to use the bridge.

#### The "others" category and L2BEAT's pledge (16:05) {#the-others-category-and-l2beats-pledge-1605}

What about the others? We will put them into a third category, which we call — and now I'm waiting for community feedback on how to name these systems — our working name is "others." The point is they are secured by multisigs, and we will expose these multisigs for what they are. That's what we want to do in our UI.

The UI is going to look roughly like this: you will see this breakdown — rollups, validiums and optimiums, and others. And the default sorting will be by security, not by TVL. Let's not chase TVL with bad security — that's going to end really badly.

We will promote Stage 1 and Stage 2 projects. We will look at Stage 0 projects as contenders. For the "others," we're happy to list them — we will be extremely liberal. You just need to be essentially aligned with Ethereum and obviously have a bridge that allows you to move funds. However, we will look at the trust assumptions and the multisigs, and we hope that slowly but surely systems will move from "others" to either validium/optimium or to rollups.

This is what we think the "others" category would look like — this is the real data right now, the real systems that may fall into this category if they don't introduce a proof system. You will see exactly who's the proposer, who's the challenger, and who's the upgrader. Funny thing is, you can see that today on L2BEAT — it's just that this information is so hidden deep in the details page that I bet only researchers and enthusiasts check it out. It's all available today. However, we do want to expose the data to end users. We want end users to be truly aware of what's going on, so that we are all accountable for the systems we're building.

Is it enough to just say "I've got a proof system"? No. Our pledge to the community as L2BEAT is that next year we're going to put significant resources into actually looking super hard and very deep into these proof systems to make sure that they are sound and complete. We will analyze both ZK and optimistic. We will go into the source code, we will look at how you created your trusted setup, we will look at your circuits and see what exactly is being verified onchain. We want to make everything super transparent so that trust assumptions are clearly communicated — and more importantly, your proof system cannot be hidden behind an unreasonably small whitelist.

We're hiring researchers. We will do all that work. This is our pledge for the next year. I hope next year is going to be the year of L2s and rollups — however, it's not about launching a rollup with one click of a button. The point is you want to be able to launch a system with good security. Ideally you want to inherit as much security as possible from Ethereum. There's a lot of work to do for all of us to reach that. But if we don't, then all we're doing is essentially creating thousands of insecure sidechains. We don't want that, I think, as a community.

#### Q&A (18:45) {#qa-1845}

**Host:** Let's do the Q&A. Is it important that rollups have a decentralized sequencer, or are other safety mechanisms sufficient?

**Bartek Kiepuszewski:** This is a very good and important question. I think there are different designs that we will see. I don't think decentralizing the sequencer is super important for the security of user funds, but it may be important for realtime censorship resistance in certain situations. Vitalik said during his opening keynote that the future might be that we see rollups going based — leveraging Ethereum infrastructure to combat realtime censorship resistance — while others, like say MegaETH, might actually have a very centralized sequencer and rely only on the escape hatch. We might see hybrid constructions. I think the design space is huge, and right now at L2BEAT we really want to see what's going to happen and how that's going to play out.

**Host:** Will TEE-based proof systems be considered Stage 2 even if they imply trust in the hardware manufacturer?

**Bartek Kiepuszewski:** The short answer is no, because with the constructions that we see today, if you're using SGX, Intel could submit a proof and they could potentially block, steal, or freeze whatever they want without anyone really noticing — and without Ethereum noticing. However, with all the work being put forward to create trustless, permissionless TEEs — I'm being told that this is actually extremely exciting work. But short answer: today, no.

**Host:** Why is Optimism classified as Stage 1? Based on the evaluation, they're not — the Foundation controls the proposal process entirely.

**Bartek Kiepuszewski:** They essentially meet all the criteria. It's not really about the proposal process — it's about who's controlling the funds. You can have a centralized proposer, however there's a fallback. If they go down, then the whole system becomes more permissionless. I think it's important to recognize what the role of the security council is. We want Stage 1 systems to allow you to exit if the centralized proposer stops. For example, with dYdX, the proposal was super centralized, however when they stopped, people could exit. So it's not about whether you're centralized or decentralized — it's about whether you can actually exit in a permissionless way.

They met all the criteria. We were refining, by the way — criteria is not something that's set in stone because all these systems are evolving, so we need to evolve with these systems. The criteria might be changing a little bit, and we are looking very closely at both Optimism and Arbitrum because clearly they are the two leaders. There are a lot of nuances that I don't have time to go into. But it's not like you have a stage designation forever — if there's new information or something we might have skipped or missed, it's quite possible that you may lose that designation.

**Host:** What are the core reasons projects don't build towards Stage 1?

**Bartek Kiepuszewski:** Complexity, time, cost, talent. It's surprisingly costly. Like I said, the pioneers four years ago were essentially building — dYdX was literally one of the first, if not the first, ZK rollup. It was application-specific, but still it was the first. And if not for small nuances, it would be Stage 2 — really, it's the governance process that we require for Stage 2 that's failing. But for all intents and purposes, it is a Stage 2 system. It was built four years ago, so it's not like it's impossible.

I think what makes it super hard today for all the rollups to actually do this, frankly, is that the majority of rollups are not built by the teams — they're launched by rollup-as-a-service providers, and we need to incentivize them to actually do better. And it's hard. No one said that it would be easy.
