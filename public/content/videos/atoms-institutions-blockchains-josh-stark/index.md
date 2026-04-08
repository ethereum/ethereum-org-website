---
title: "Atoms, institutions, blockchains"
description: "Josh Stark proposes a new framework for understanding what blockchains are, introducing the concept of 'hardness' as the shared property that connects atoms, institutions, and blockchains as civilization's building materials."
lang: en
youtubeId: "zI07mqNdxzA"
uploadDate: 2024-04-06
duration: "0:29:13"
educationLevel: beginner
topic:
  - "how-ethereum-works"
  - "blockchain"
  - "ethereum"
format: presentation
author: ETHGlobal
breadcrumb: "Atoms, Institutions, Blockchains"
---

A philosophical keynote by **Josh Stark** of the Ethereum Foundation at Pragma Denver 2024, proposing a new framework for understanding blockchains. The talk introduces the concept of "hardness" as the shared property connecting atoms, institutions, and blockchains as the building materials of civilization.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=zI07mqNdxzA) published by ETHGlobal. It has been lightly edited for readability.*

#### Why can't we explain blockchains? (0:00) {#why-cant-we-explain-blockchains-000}

Hi everybody, thank you for being here at Pragma in Denver. My name is Josh. I work at the Ethereum Foundation — I've been with the EF for about five years now. I like to joke that my job is figuring out what my job should be, and that changes every six months.

I've done lots of different things in my career in crypto. I worked in an early Bitcoin wallet. I built — well, I bought — a Bitcoin ATM in Toronto and ran it for about a year in 2015. In 2017 I co-founded ETHGlobal, as well as a company called L4 working on early L2 scaling solutions. And over the years I've written a bunch of blog posts.

Through all of this, I still couldn't really explain what we were doing or why. I had this feeling that this was very important, that it was going to change the world. Don't get me wrong — I can talk about individual applications. We can explain Bitcoin, NFTs, Uniswap, ENS. All these things in their little silos are not that hard to explain. But when we try to talk about the big picture — what it means that there's one technology that enables all of these things — we start to stumble. We're doing mental gymnastics, throwing buzzwords at people, trying to explain things.

We really need to get to the heart of it, and I don't think we're that close. It's a problem! If we can talk about these individual applications but can't articulate what they share — there's something we're missing. There is a level of explanation that hasn't been found yet, and I think it's important. My sense is that once we find it, it will feel obvious.

So this started as a very specific question that I had: what is the general-purpose technology? What is this fundamental capacity? And it turned into something that I find much more interesting.

#### Claude Shannon and the idea of information (4:00) {#claude-shannon-and-the-idea-of-information-400}

Let me tell you a story. In the 1930s and 40s, Claude Shannon was surrounded by the beginnings of a new age. At Bell Labs, he worked on fire control systems and cryptography during the war, and he started to think about a more general approach to information. He didn't call it information at first — in 1939 he wrote to a colleague that he was thinking about the "transmission of intelligence." The word information had a different meaning then.

He published in 1948 "The Mathematical Theory of Communications" — a foundational paper that laid the way for the information age. Most importantly for us, it introduced for the first time an abstract idea of information — a definition not tied to music, speech, literature, or codes. This is the paper that introduced the bit — the irreducible unit of information that you could measure in any context.

Before this moment, no one really had this concept of information as a universal, general thing. That might seem insane now — we've been using information technology for thousands of years. It's inextricably linked with what it means to be human, to use speech and language. But we didn't name the underlying property common across all these things until very recently.

What I want you to take from this: there was a time before we had the idea of information and a time after. What if we are similarly missing something so fundamental? That's my hypothesis.

#### Three clues (7:00) {#three-clues-700}

As I'm struggling to explain blockchains, I keep running into these weird things that I think are clues towards something bigger.

**Clue number one** — we describe blockchains as both trustless and trustworthy. That's odd. In Satoshi's white paper we talk about eliminating the need for trust. But in the Ethereum white paper we talk about using Ethereum to make applications more trustworthy. The Economist called blockchains a "trust machine." We mean something real when we say blockchains are trustless, and we mean something real when we say they're trustworthy. Our language hasn't caught up. These apparent contradictions are always worth paying attention to — sometimes they reveal a gap in our abstractions.

**Clue number two** — we talk a lot about how blockchains are different from centralized institutions — Bitcoin versus central banks, ENS versus DNS. But we rarely talk about what they have in common. They can be substitutes for one another. If you've ever traded fiat money for Bitcoin, you've substituted them for each other. They must have something in common for that substitution to take place so regularly.

With cars, we talked about "horseless carriages," but at least we could name what they were — vehicles. With digital records, we talked about "paperless" mediums, but we knew the category — information. It seems like we've invented a technology before we've invented the category to which it belongs.

**Clue number three** — Satoshi's paper starts with these words: "commerce on the internet has come to rely almost exclusively on financial institutions serving as trusted third parties." Satoshi was comparing Bitcoin to institutions, not to other software. There's something there.

#### Introducing hardness (11:00) {#introducing-hardness-1100}

Here's my answer to what goes in that box. I call it **hardness**. Here's the story in five simple steps, and then we'll go into more depth.

First — our civilization depends on social infrastructure like money and law and so many other things, and they need to be reliable. They need to behave like we expect them to behave, at least most of the time, for them to be useful to us. Otherwise we wouldn't rely on them — they wouldn't become a money.

Second — it's very difficult to achieve that necessary level of reliability. So far there are really only three ways we've ever done it: using atoms, using institutions, and now using blockchains.

Third — there's an unrecognized property common to all three, which I call hardness. Hardness is the capacity, the power, to let us make the future more predictable in the really specific ways we require for complex coordination games.

Fourth — that these three sources of hardness each have different properties that make them useful in different contexts.

And fifth — we can use them together and substitute them for one another.

Gold's inflation rate is reliable because of the physical properties of our planet — it's atom-hard. A contract is reliable because institutions will come and take your stuff if you don't follow your commitments. A smart contract will operate because it's secured by a cryptoeconomic protocol with billions of dollars on the line.

You can think of atoms, institutions, and blockchains like building materials — like wood, concrete, and steel. They're different, but they're part of a shared category. And we use these things not to build buildings, but to build a civilization. Maybe with better materials, we can build a bigger, better, stronger civilization than the one we have now.

#### What is hardness? (14:00) {#what-is-hardness-1400}

Let me give more precision to what I mean by hardness. This is not just any reliability that anything might have. Hardness is a specific kind. The thing to note first is that it's a type of reliability that matters for social coordination. Not just, you know, this table is reliably a table — but that you can pay your rent, that a contract will be enforced, that an economy is strong. That's the stuff that hardness is for.

And what exactly is the outcome? I'm unfortunately introducing another new word here, which I call the **cast**. A cast is any possible future state of the world that is made certain or secure using hardness. I apologize for the jargon, but the reason to have a word here is that I don't think we have one that's generalizable across all sources of hardness. It's maybe like the bit — we need a concept that we can talk about in many different contexts and switch between sources without being tied to one of them.

A cast related to a loan would be: if Alice does not pay Bob back, then legal institutions will use increasingly severe threats and actions to force her to. This cast is hardened using institutional hardness. A cast about gold might be that a certain amount of gold will enter the market each year for the next 20 years — made reliable by the physical properties of our Earth. And a cast about Ethereum might be a claim that assets can only be transferred if you hold the private key corresponding to a certain public key — hardened by blockchain hardness.

In practice, we're usually interacting with bundles of these things all woven together. If you own gold and hold it in a bank, a lot of things matter to you: casts about gold supply in the future, casts about the strength of the bank's vault, casts about the strength of the legal agreement between you and your bank, casts about the reliability of the legal system in your country that would enforce those rules if something went wrong.

Secondly, hardness can be talked about as a measure of security. It's always measurable in theory, even if it's hard to do in practice. How hard is this cast that a certain amount of gold will enter the market each year for the next 20 years? One way you could look at it is through probability — look at all the data and try to predict the likelihood. Or you could look at it from a cost perspective: what would it cost someone to break that cast? If you're a nation state, you could use the powers of war and international regulation. Or you could go the other way and go get an asteroid from space with lots of gold in it, circumventing the physical limitations of Earth. There is a price to break almost any cast.

And lastly, hardness comes from certain sources — atoms, institutions, and blockchains. Each has different properties that make them useful in different contexts.

I like about this framework that it lets us ask deeper questions — not just talk about specific properties of blockchains, but compare all of these different things and think about where they're appropriate, how we use them, and in what combination.

#### Atom hardness (19:00) {#atom-hardness-1900}

Atom hardness is about when we find reliability in nature around us — literal physical atoms but also other naturally occurring properties. We do this when we use gold beads for money, when we use physical structures to define property rights, or record property rights in a physical object like a deed.

It has many advantages: automatic enforcement, shared state, a universal rule set. It's very convenient for human civilization that the rules of physics apply everywhere equally, at least at the macroscopic scales that matter to us most.

But it has weaknesses. We're limited to what we can find in the world. Atom hardness is kind of like an architect who wants to build a rock face into their home — you have to find one that works. You can't just make a rock face. You can change it a little, but you're relying on finding a naturally occurring feature that fits your particular need.

We can't give it new rules. We have gold, but we can't ask the universe to give us a new kind of gold with lower inflation, more fair geographic distribution, or maybe fix the weight issue. We can't do this. And it has very limited programmability — there are only certain kinds of hardened things you can make out of atom hardness, mainly monies. You can't make a marriage agreement out of atoms. You need something more complex, like an institution, to do that.

And casts are often undermined by our increasing human control over nature. Using shells for money is fine until you're part of a global economy that might radically upset your expectations about shell inflation, and suddenly your economy is wiped out. Using gold as a medium of exchange might face the same problem someday if and when we can obtain asteroid gold and change our assumptions about supply.

But it's more subtle than that. Sometimes we have casts we don't even realize exist, but then they're gone because something changed. There was a hard cast about the speed of trading in financial markets for a long time — it could only be done at a certain pace, maybe the pace that someone can shout to each other on the floor. This cast was atom-hard — we just couldn't communicate faster than that. But new technology completely undermined those assumptions. We realized we actually liked a version of that old cast and remade it out of institutions — introducing regulations that limit the speed of trading and enforce circuit breakers.

#### Institutional hardness (22:00) {#institutional-hardness-2200}

Institutional hardness is a very wide category — it covers most things we might think of when we think of civilization. Our legal systems, legislatures, police forces, corporations, everything. All institutions that provide hardness of some kind. We created casts that gave order to our societies, punishing antisocial behavior. We created hardness as a platform, letting anyone create their own casts made hard by institutions if you follow certain rules. We created casts that spawned new assets and provided sources of credit to growing economies.

Institutional hardness has many advantages. It's very programmable — human beings grouped into organizations can take really complex or subtle instructions. This is a very large design space of possible casts. And they're made of people, and people are good. Maybe it's good that sometimes someone can step in and say, "I'm not going to enforce that because I think it's wrong." It's good that maybe sometimes there's a break in the system for someone to be a whistleblower or a rebel.

But it also has many weaknesses. It's limited by borders — only in certain countries do you really have access to institutions that enforce the rule of law. It's exposed to political or state failure — if your government just can't agree on things, or you're invaded by a belligerent nation, certain institutions you rely on for money or contracts might just fall apart. They're often opaque — it's hard to tell if an institution is really hard or not until something goes wrong. They have a high startup cost — we can't just easily make new institutions at the scale of the Fed or the legal system to iterate on them. We're kind of stuck with the ones we have.

And they're made of people, and people are bad. The reality is in this country and many others that many people have not really had access to the hardness provided by institutions. They weren't able to get a mortgage. They weren't able to open a bank account. Because when you staff an institution full of people, it's subject to their evils, their prejudices, their ideologies. And our reliance on institutional hardness is only increasing. The problem with software eating the world is that most software is really just made out of an institution behind the screen, and we're giving them more and more power as a result.

#### Blockchain hardness (24:20) {#blockchain-hardness-2420}

Satoshi's invention was of course more than just Bitcoin — it was the kernel of a general-purpose technique for creating digital hardness in a digital environment. It has many strengths: universal global access, it's made of software and anyone can write software, the degree of hardness can be transparent and auditable, low startup cost, easy to iterate, and secured by market incentives — and markets are rational.

But it also has weaknesses. It requires a technological civilization — we couldn't have had blockchains before now because of the requirements, and a civilization in the future that doesn't have what we have won't be able to use them either. It's made of software, and software can be written poorly. The scope of casts is limited to onchain environments. And it's secured by market incentives — and markets are irrational.

#### Why this matters (25:10) {#why-this-matters-2510}

So what does this mean? What does this give us? Why is this more than just an academic interest?

A lot of things start to make a lot more sense when viewed through this lens. One is the question we started with: why do we say that blockchains are both trustless and trustworthy? The explanation is this — when we say blockchains are trustless, what we really mean is that their hardness doesn't depend on a person or institution. And when we say they're trustworthy, we just mean that they do have hardness — just of a different kind. Our inability to make that distinction is what causes this confused language.

It explains why private or centralized blockchains are not interesting. A blockchain that is not decentralized just collapses back into being an institution. If it's controlled by three banks or a handful of validators all funded by the same organization, then it's just an EVM secured by institutional hardness. The most interesting thing about blockchains is not the EVM — it is that there's a different source of hardness that is not correlated or subject to the same failures and limitations as institutions. That's why it's different. That's why it matters.

It also helps understand the spectrum of possibilities and the default ideologies people fall into in the blockchain space. Many people are very focused on using blockchain hardness to compete with or replace institutional hardness — this is what a lot of the Bitcoin community is about, what a lot of DeFi is about. Even ENS is trying to replace or compete with DNS in some way. But then there are also people who see that blockchain hardness can do things that institutional hardness can't — ideas no one has ever tried before because we never had this capacity, this certain flavor of hardness. And now we can explore those things. Maybe NFTs are there, or games like Dark Forest, or the movement around autonomous worlds.

#### Raising our ambitions (27:00) {#raising-our-ambitions-2700}

Most importantly, I think this framework raises our ambitions. Personally, this is what matters to me, and maybe it resonates with you — I'm not just here for these individual applications. I'm not someone who is just really all about Bitcoin or all about DeFi or all about NFTs. Maybe that's you too. There's something bigger going on here.

We can honestly set our sights higher than money. We can set our sights higher than finance. There's a much bigger picture. I think this actually helps define a vision that feels adequate in scale to the challenges we face and to the opportunities that blockchains offer.

The mission is not just to replace the Fed. The mission is to improve and expand the very materials that we've used to build our civilization — to lower the cost of these tools so that everyone on Earth has access to them, to allow for more change to happen. And by the way, that cost will be getting lower soon.

To help humanity keep playing this infinite game by letting more people change the rules. Very few people can enact a law, but anyone can write a smart contract. We are expanding that capacity.

I think a lot of people in many different countries and many ideologies feel like we're stuck — that the rules of the game aren't what they should be anymore, but we are powerless to change them. We're stuck in so many ways in this local maximum, and we intuit that that's wrong. Blockchains don't fix that, but I think they can help. They open up a new space for experimentation. They let more people change the rules, write new rules, contribute to that infinite game. We can't write laws, but we can write a smart contract.

I want to end on this note: if you've seen talks by people at the EF before, you know we're fond of the book *Finite and Infinite Games*. One of the maxims from this book is that only that which can change can continue. We can't stay stuck in this local maximum. We have to change things. And I think blockchains help us do that. Thank you very much.
