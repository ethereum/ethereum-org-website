---
title: "The next 10 years of Ethereum"
description: "Fede Fernández covers the evolution of Ethereum, infrastructure building across Latin America, and the core values that will define the next decade of the ecosystem."
lang: en
youtubeId: "2E-0DF0tFbc"
uploadDate: 2025-11-20
duration: "0:36:15"
educationLevel: intermediate
topic:
  - "roadmap-and-priorities"
format: presentation
author: Ethereum Foundation
breadcrumb: "Next 10 Years"
---

A talk by **Fede Fernández**, founder of Lambda and co-founder of several Ethereum ventures, at Devconnect Buenos Aires covering his personal journey, infrastructure building across Latin America, and the core values that will define the next decade of Ethereum.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=2E-0DF0tFbc) published by Ethereum Foundation. It has been lightly edited for readability.*

#### Ethereum as a verifiable computer (0:07) {#ethereum-as-a-verifiable-computer-007}

I'm going to speak about the next 10 years of Ethereum — from verifiable computer to global economy. To me, Ethereum is a verifiable computer. I never liked the "world computer" meme. I think AWS or Google are the world computers — they have a lot of money, they have a lot of computers, but you have to trust them. The big difference between Ethereum and the rest of the computers is that it's verifiable. Ethereum is the world's first verifiable computer — no trusted computation, just economic incentives and mathematics.

This gives a huge edge over AWS or Google Cloud, because anything that happens inside this computer is verifiable. I don't think there's — it's almost like a small god in terms of trust, because if you trust economic incentives, capitalism, and mathematics, everything that happens on it is correct. This has an edge over AWS because AWS and Google are based on trust, and trust can be broken. The other day I read on Twitter about a guy that hacked into Bing and changed the movies — if you Bing "what are the top 10 movies," the guy hacked into it and changed the list. You just have to trust Bing that whatever they're saying is correct, and in this case Bing was hacked. With Ethereum, that cannot happen unless everything gets hacked, and that's very difficult because you have to hack into multiple teams, multiple implementations, and that can be seen by everyone.

This makes Ethereum antifragile. Every attack, every week that somebody's trying to attack Ethereum — from North Korea or other state actors or private actors — it becomes stronger, because it's out there running and there's a lot of money and people trying to get it.

#### Internet property rights (2:39) {#internet-property-rights-239}

So what does a verifiable computer enable? It enables internet property rights — true ownership. Instead of believing or trusting platform terms like the typical thing where you click "next" and agree to give all your data to a company, what you're doing is trusting private keys. Private keys are way better than trusting terms and services.

This creates global neutrality. A Chinese dev, a Russian trader, an American fund, and an Argentinian user all have the same playing field. We choose to use the verifiable computer. We can put money there, art there, and we know we own it. We're not depending on anybody else. This gives the basic rights to be able to build everything else. Before Ethereum, the internet didn't have property rights.

In the next 10 years, we're going to tokenize everything — from art, land, and even artificial intelligence. If kids are going to be studying with artificial intelligence, there's incentives for people to hack into AI and change the parameters so that the AI answers with whatever the hacker wants. We need Ethereum to verify that the AI is working properly, and there's a lot of people working on this.

#### Ethereum's economy today (3:46) {#ethereums-economy-today-346}

Ethereum created a whole economy — nowadays it's $300 billion. It's huge. L2s are growing, and every month there's three trillion in stablecoin monthly volume on Ethereum alone. We're three times bigger than Visa. One of the biggest advantages we have over Visa, the New York Stock Exchange, or any other exchange like Argentina's Merval is that we have composability — everything is in the same place. You can change your stablecoins for dollars, for a tokenized asset, for art, and this creates a flywheel because more people are adding more money and everything is happening at the same time in the same place, all the time. Actually, in that sense Ethereum is less fragmented than the capital markets of the world.

So how did we create this? With a bubble. From 2017 to 2022 there was a huge bubble in crypto. Most projects were scams, from my point of view. Ethereum won because Vitalik, the EF, and the people building it had long-term visions — they were economically incentivized, but they wanted to make something bigger than themselves. That's why after the big bubble and the stagnation for three years, Ethereum won. We were winning in some way, and we could do things like ZK — Polygon, for example, where Sandeep put a lot of money for ZK to be a big thing. StarkWare the same. This enabled ZK as an amazing technology that from my point of view is going to be even bigger than blockchains.

#### Product-market fit (5:29) {#product-market-fit-529}

However, this also created competitors, and it's something we sometimes forget. This bubble created new technologies like Solana, Sui, and Aptos that we should check because they're doing things that are interesting, and we should check them to improve ourselves.

After the bubble, from my point of view, Ethereum found some product-market fit. The product-market fit is decentralized or permissionless verifiability plus privacy — something that we're trying to start building into the core of Ethereum — plus stablecoins. That's the true PMF. That's the basic thing that is working and growing. Most tokens are going down, but the volume of stablecoins is going up. It's a programmable, private, borderless USD. Right now we are 10 times bigger than competitors. That's an edge we have to keep working on, and we don't have to sleep on it and forget that this is one of the biggest PMFs we have.

#### Technical challenges (6:26) {#technical-challenges-626}

There are two things I want to talk about today that I'm going to rant a little bit about: the technical challenges I see for Ethereum to keep winning in the next years, and the social and cultural challenges I think we have to work on. Performance, scalability, interop, privacy, security, post-quantum, and complexity.

**Performance.** We're building Lambda's Ethereum execution client. A few minutes ago I learned that my team managed to be 10% away from Reth in terms of performance. We started working on this one year ago, so I'm super proud of the work we've been doing. But if you check, apart from Nethermind, Geth, and our client, most of the other clients have some difficulties performance-wise. I'm not saying this to criticize people — if you run a benchmark, you can see it. Unless we change the validator requirements, it's going to be difficult to achieve the numbers we need to keep competing with things like Solana.

I believe Ethereum is the only protocol that exists as a verifiable computer with different implementations. We have a team in Argentina with more than 100 developers on the core of Ethereum. We have teams in Europe, teams in the US, teams in Asia. No other blockchain or verifiable computer has this. However, for three years, we decided not to increase the gas limit. We decided to be slow. I think we can be verifiable and people can check everything that's happening, while at the same time keep raising the gas limit. This was a taboo topic until a few months ago. Dankrad, myself, and many others were trying to push to become faster so that we can keep winning in the competition. The other execution clients should catch up, because if they don't catch up we cannot wait for them. Ethereum is bigger than any one of the teams building on it.

I also believe the validator requirements should go up. I'm not sure the objective of Ethereum is that everybody can run a validator in their own home. I think everybody should be able to do so if they can pay $1,000 or $2,000, or they could verify and attest with a few dollars. But I'm not completely sure that we want the requirements to be so low that anybody can run it on a Raspberry Pi that costs $50. Another issue is state growth — if we increase the gas limit, the state is going to grow a lot.

**Scalability.** From my point of view, it is about verifiability, not home staking. I think we have to increase the gas limit by 100x. The cheaper we become, the more people are going to use it. It's like with the internet — people started creating things like YouTube or streaming platforms once the internet was fast.

I'm a huge fan of RISC-V. I am not a huge fan of Solidity, to be honest. Solidity is not Ethereum. Ethereum is not defined by Solidity. I respect the people working on it — it has been crucial, it's a simple language — but it has a lot of issues. I'm a big fan of RISC-V and I think this should be the default.

#### L2 stacks and interop (10:00) {#l2-stacks-and-interop-1000}

Most L2 stacks don't work. Most L2 stacks literally don't work — you clone the repo, you try to run it, and it doesn't work. I don't want to name or shame anybody, but this is related to incentives. Incentives are in place to launch a token, forget about it, and die. What we're trying to do with Lambda is make it so that anybody with one command can run an L2, and if we still believe in the rollup-centric roadmap, we have to make rollups easy to run.

On interop and the centralization of rollups — the other day there was an outage in AWS, and a few of the rollups went down. I think this is super bad. People were ranting and they have a point. We need to move to Stage 2. We need decentralized sequencers, or we need to create censorship resistance. I believe in based rollups. Commit-boost is another piece of technology that Drew has been working on — an amazing public good to be able to create things like pre-confirmations. Lambda is also working on that.

#### Privacy (11:29) {#privacy-1129}

The only thing I'm going to say about privacy is that I became public after I got a call from a lawyer saying, "Hey Fede, if you don't cooperate you're going to have big trouble." This happened a few years ago, and every once in a while I have an issue because of it. I'm still working on privacy — we're working on Maiden, we're working on privacy-related things for Sombra, for government. The only thing I'm going to say is I think we should all be able to work on privacy and we should support anybody working on privacy. Right now it's not clear what the rules are. We should support everyone — Roman, Alexey, the Samourai Wallet developers. We need to fight this all together. And obviously Ethereum needs privacy because if I want my mother to use Ethereum, she won't like the fact that everybody can see her transactions.

#### Security and the Solidity compiler (12:27) {#security-and-the-solidity-compiler-1227}

The Solidity compiler — if you check the GitHub contributors, there's only one or two people maintaining it. They're working very hard, but that's a huge issue. We don't have enough people working on the most important programming language on Ethereum. If we want to be here in the next 10 years, we need to fund that. The same with Vyper.

The syntax of Solidity is simple — that's why people like it. However, the semantics and the compiler don't catch multiple bugs. I have worked in more than 20 programming languages, from Erlang to Rust. I have never had such a hard time with a programming language like Solidity. It's so easy to create security bugs. Many bugs could be caught at compile time if we had a better compiler. I think the long-term solution is the RISC-V EVM as the L1 default.

#### Post-quantum cryptography (13:40) {#post-quantum-cryptography-1340}

We're working with Justin Drake on Lean Ethereum. We just went to Cambridge with three of our cryptographers to work on hash-based signatures and a minimal ZKVM. We're working on the Lean VM. Thank you so much to Justin and the Ethereum Foundation for making things easy for people like us that were very far away and not well-connected in terms of VC capital. If you ask me the things I'm most proud of in my life, it's working on Lean Ethereum.

We're working on a ZKVM inspired by the Cairo VM that we at Lambda implemented with the help of StarkWare. Nethermind is also working on formal verification. We have a huge advantage over Bitcoin because our accelerationism and our attitude to work on multiple implementations, having many people checking things, and being more open in terms of core development and research gives us an advantage. Bitcoin has an issue with the deployment of post-quantum cryptography.

#### Self-imposed stagnation (14:46) {#self-imposed-stagnation-1446}

Now the part where I want to be very clear. I'm a huge Ethereum fan. My company depends on Ethereum. If Ethereum has an issue in the next 10 years, my company and everything I have built for the last 12 years is done. We deployed dozens of millions of dollars in the last few months to create multiple new companies on top of Ethereum. I'm saying this because I love Ethereum — it's not because I want Ethereum to die. Improvement means speaking openly about the issues we have.

First problem: "we already won." This is self-imposed stagnation. Complacency leads to lack of growth and self-awareness, and keeps away new ambitious people. I have seen many young people, 20 years old, telling me, "I'm going to Solana because I see there's more ambition." I think we need to become ambitious. We need a little bit of the bronze age mindset — we're here, we want to win, we want to beat the competition. The founder of Intel wrote a book called "Only the Paranoid Survive." He died and then check the stock of Intel — it went down. Even Intel, which was a gigantic thing, is going down in comparison to NVIDIA and AMD. The same thing happened with MySpace, BlackBerry, and many amazing companies and protocols.

We didn't win yet — we're winning, but to keep winning we need to keep an open critical sphere of debate. We don't need to see comments like mine as someone being harsh on Ethereum. I'm very harsh on my engineers, I'm very harsh on myself and my company, but it's because I want the culture to improve.

#### Open debate and governance (17:01) {#open-debate-and-governance-1701}

I am part of the tech elite — I'm not speaking badly of other people, I'm saying I am part of the tech elite. We have to do this because it's been going on for quite some time. Two days ago I had a call with one of the top Ethereum researchers and I asked, "Why the hell are we doing this?" The answer was, "Because this person has been working on it for two years." That's not okay. If Lambda is doing something for two years and somebody else does something better, please kill what Lambda is doing. Ethereum is bigger than anybody.

This doesn't mean we have to be mean to the people working on it — we have to be thankful. But science and engineering mean that we have to leave things behind. I believe the EF leadership change was that case. I had to coordinate with multiple people on Signal to go on a call and say why the EF was an issue, and everybody was telling me, "Fede, I think this, but I don't want to disrupt the process." Science and engineering mean we have to be able to debate things openly.

Important decisions were made behind closed doors. I was part of that — there's social coordination happening. I don't like that. I like public debate. If we keep doing things behind closed doors, this is super fragile because state actors are trying to infiltrate the core of Ethereum — I know that for a fact. Check OpenBSD — they had state actors trying to enter the core by paying one developer. We need things to be open and public. Transparency makes things better for everyone.

#### Learning from competitors (19:18) {#learning-from-competitors-1918}

Another thing: lack of knowledge of what competitors are doing. I have gone to every Solana Breakpoint and I'm proud of that. Why? Because I see them as a competitor. It's not because I'm a Solana bull — it's because I want to learn from my competitor, I want to copy good ideas from them. They have a lot of smart people. The same with Sui and Aptos. We should copy anything that anybody else does that is good. Linux did this many times — Linux copied everything from Solaris. I was a big Solaris person, I worked at Sun Microsystems. But Linux was open and copied all the good things.

Young people check these things. They don't care who is winning — they want to see who is driving things, who is more aggressive about taking over the world. That's how Linux became huge — Android is using Linux. We need to have that attitude to win.

#### Culture and feedback loops (20:44) {#culture-and-feedback-loops-2044}

Crowd-following mindset. Important debates aren't public. Echo chambers and excluding dissent kills feedback loops. I don't believe there's one correct ideology. I have a partner who is ultra-libertarian — he believes everything done by the state is bad. I have another partner closer to Peronism who thinks everything done by private actors is bad. I don't think public or private is what defines whether something is long-term good for society. I think systems that have closed feedback loops — where they learn from their users and stakeholders — are what make good systems in the long run.

I think we should literally pay people to be contrarian. I have partners in my company who sometimes I want to fire because they're harsh on me, but at the end of the day I'm happy to have people who question my authority. We need that because it enforces good feedback loops. If we don't have a good culture that is open, we're going to have bad tech in the long run. And when we have bad tech, the good young blood doesn't come to Ethereum. We should debate more like Bitcoin — without the threats — but execute like Ethereum. We debate strongly, then we work together as a team.

#### Lambda's work across Latin America (22:45) {#lambdas-work-across-latin-america-2245}

So why should you listen to me? We're working in multiple countries in Latin America. With our partners — Diego Fernández, through Sombra — we have more than 10 million IDs minted on Ethereum. We're working with the government of Nuevo León in Mexico. We're working with multiple states here in Argentina. We're starting to talk in Colombia. Once you have IDs onchain, you can do KYC, you can give loans based on that. We're also working in Africa in different countries, creating infrastructure for passports and physical property rights. We're doing the same in Asia, in different Central Asian countries — I was recently in Uzbekistan.

We built an Ethereum L1 client. We have 40 people working on it. For L2, we're using SP1, RISC Zero, and CISC by Succinct. We're building our own ZKVM with Lambda and collaborating with cryptographers from Israel and Belgium. We're doing security audits with our French partners. We're working with Robust Incentives on validator economics. We're working on privacy with Maiden. We're working on decentralized AI. We're working on Lambda Commit Boost. We're launching something interesting with stablecoins tomorrow.

Today I'm super proud — with Rodrigo, we've decided to create a partnership between Lambda, Boulder Tech, and IRSA to build something massive in the region. We're working with them on payment rails in Latin America. Lambda, with hundreds of engineers — we have almost 500 people, and we're not very good at marketing. I'm the only guy on Twitter! But we're working on so many things, and I'm super proud of what we're doing. I just hope we are more open to debate, to criticism, to make ETH and Ethereum as big as we want. Thank you everyone.

#### Q&A (25:53) {#qa-2553}

**Host:** Thank you, Fede. We have some great questions from the audience. I have one question before all that. How do you feel right now? We're in Argentina, we're having Devconnect. Is there one word to describe how you feel?

**Fede Fernández:** Happy. I'm super happy. I'm super happy that my mother is here — she can hopefully understand what the hell I'm doing and what Ethereum is. I'm happy that we have partners from the church that came who don't know much about Ethereum. We actually went with some friends from the church to Devcon. We have some famous artists coming. We invited a lot of people to show them what we're doing — people that know us from other businesses. I'm super happy to be able to show everything to the world.

**Host:** She must be very proud. First question: which of the outlined initiatives are most important to you right now?

**Fede Fernández:** Lean Ethereum. I think what Justin Drake has been doing — look, I'm a very blunt person. I was not a huge fan of the previous meme. What was it? I can't remember the name.

**Host:** Ultrasound money.

**Fede Fernández:** Yeah, ultrasound money. I don't know why — I was not a huge fan. Justin pushed that a lot. I always liked Justin, but it didn't touch me. Lean Ethereum, from my point of view, is like a cathedral. I went to see him in Cambridge. We were walking inside one of the cathedrals, watching it so closely. He told me, "Hey, do you think in 500 years people are going to see the design of Ethereum like this cathedral?" And I was like, "Yes, and you're one of the architects." I'm super proud of the work he's doing and I'm super thankful to be part of it.

**Host:** Ethereum is a cathedral in the sky — that's super cool. A technical question: how far can we raise the gas limits in the near future, in your mind?

**Fede Fernández:** Cheap servers can handle a lot right now. First of all, I'm amazed by the engineering capabilities of Nethermind. We've been checking their work the last few months — it's amazing. Working in C#, a language by Microsoft that I don't particularly like — I like it more than Java, but still. They manage to get a lot of megagas. From my point of view, they're the fastest implementation, then Geth, then us. I think you can get to 300 or 400 megagas with a good server. With something cheaper like an Orange Pi, probably 200 megagas right now. But with the changes that are coming, I think we should easily approach one gigagas in the next few years.

**Host:** You're working with a bunch of different people — from institutions to governments to app builders. What is something you find in common with all of them? When you represent Ethereum, what do you always find yourself going towards when explaining it, especially to new people?

**Fede Fernández:** I've had to speak with daughters of kings, presidents, big billionaires — when you have things like Libra going internationally, institutions and people that have built reputations are worried about touching this stuff. I think what Justin Drake, Vitalik, and everyone in the Ethereum community have done very well is focus on the long term. They don't always understand very well what Ethereum is, but they know that this is the serious thing. This is where the nerds are — and nerds are always trustworthy because they are motivated by things other than only money. I find that they see Ethereum as the serious thing that is going to win in the future.

**Host:** For a young builder in the audience, what do you recommend? Especially if they're interested in your line of work?

**Fede Fernández:** Don't raise money until you have product-market fit. People are going to push you to raise money, and then you're going to have more problems than you think. Money is just a tool — it's gas to be able to build things. But there are more important things: connections, books. Try to work with people that are deeply motivated about what they're doing. Work with people that have ethics, that are trying to do something good for society, something they're proud of. You're doing this because you're proud of it. You want to tell your family, you want to tell your friends what you're doing. Follow the people doing things they're passionate about, and work on things that you will be proud of in 10 years.

#### Closing (30:32) {#closing-3032}

**Host:** Awesome. Well, thank you so much, Fede. Thank you for everything you do.
