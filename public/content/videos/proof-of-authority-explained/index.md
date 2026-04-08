---
title: "Cryptoeconomics: proof of authority"
description: "A cryptoeconomics lecture explaining the proof-of-authority (PoA) consensus mechanism, covering how it works, its trade-offs compared to proof of work and proof of stake, and where it is used in practice."
lang: en
youtubeId: "Mj10HSEM5_8"
uploadDate: 2018-10-19
duration: "0:09:18"
educationLevel: intermediate
topic:
  - "consensus"
  - "proof-of-authority"
format: presentation
author: Cryptoeconomics Study
breadcrumb: "Proof of Authority"
---

A cryptoeconomics lecture by **Cryptoeconomics Study** explaining the proof-of-authority consensus mechanism, including how a central authority determines transaction ordering, the double-spend and censorship problems it introduces, and the multi-signature mitigation approach.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=Mj10HSEM5_8) published by Cryptoeconomics Study. It has been lightly edited for readability.*

#### How proof of authority works (0:00) {#how-proof-of-authority-works-000}

Welcome to section 2.4 — proof of authority — where we reinstate that central authority to determine transaction ordering and solve that pesky little double-spend problem.

Once upon a time there was a central authority that everyone kind of liked. They all approved of this great authority and said, "Why don't we just listen to them? We were having these problems and we don't agree on the correct state, so let's just have her tell us what the state is."

Our central authority runs her big node, and now people sign transactions and instead of sending them directly to each other, they send them to the central authority. The central authority applies each transaction and signs it herself, saying, "Yes, I approve — this is transaction zero." The central authority then sends it to everyone, and everyone receives the transaction and accepts it as gospel.

#### The double-spend problem (1:05) {#the-double-spend-problem-105}

Now let's try the double spend. What's going to happen? Mallory is going to send two conflicting transactions to the central authority. The central authority receives the first one and signs that this is the second transaction she has seen, then signs that this is the third transaction she has seen, and then propagates those messages.

What happens? Everyone receives the same messages, and they all watch the ordering of the central authority. That means they all end up with the same histories. If we look at the states, we're doing well — Alice sends to Jing, then Mallory sends to Alice, then Mallory tries sending to Jing, but that one doesn't go through because Mallory doesn't have enough money. Their balances are all going to be the same. They're all in consensus. The central authority — great, we've done it.

#### When the authority is compromised (2:09) {#when-the-authority-is-compromised-209}

But the problem is we have to trust the central authority to provide this transaction ordering. So what happens if the central authority is kicked out and it turns out she was Mallory all along?

We get back into the same problems we had before. First, double spends — Mallory just signs both conflicting transactions saying that they're both occurring at the same time. We don't know which one comes first. Mallory selectively propagates them and messes the nodes up, and they lose agreement.

The other problem is censorship. This is a new issue with our proof-of-authority chain. What if Mallory doesn't like Alice? Alice is trying to send a transaction and the central authority just looks at it, notices it's Alice, and throws it away. Alice tries to send it again, and it gets thrown away again. Alice doesn't know what's happening — her transactions aren't going through. Censorship successful, and we're back to pain.

#### Mitigating with multi-signature (3:21) {#mitigating-with-multi-signature-321}

Don't worry too much — there's a potential mitigation. We can politically decentralize the authority. This will theoretically make it more difficult for Mallory to gain control. So instead of one central authority, we have four different authorities. They all maybe represent different interests of different parties, and they all have to get together to sign off on transactions.

This is called a multi-sig — a multi-signature. They receive a transaction from Alice to Jing, and the first one signs off saying, "I saw this message and I approve." Then the second one signs off, and the third one. We can say we accept a two-out-of-four multi-sig, or three-out-of-four, or maybe we require all parties — four out of four. It's up to you when you're designing your multi-sig.

This means the transaction goes through and it's been approved by the authorities.

#### Limitations of proof of authority (4:32) {#limitations-of-proof-of-authority-432}

But what happens if all of these authorities become Mallorys? We have exactly the same problems — double spends and censorship. So it's not perfect. However, it is better in some ways than a centralized payment processor because at least the users are running all of the transactions themselves. They can eventually detect a double spend, but we still have our problems. We can technically still double-spend and we can technically still censor.

There's no open access — it may be hard to become one of these authorities. And there are no in-protocol penalties if double spends or censorship happen. There is nothing in-protocol that will penalize these authority figures.

#### What comes next (5:19) {#what-comes-next-519}

So our wise Alice decides there's another way — getting rid of the authority. Who needs it? Instead, we allow anyone to become a miner and participate in the consensus protocol. This gives open access to participate, provides economic rewards for good behavior — forming consensus in a way that works — and provides economic penalties for bad behavior, where we detect it and burn people's coins.

But that's coming up next in proof of work — mechanism design for chapter 3.
