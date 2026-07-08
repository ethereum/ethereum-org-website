---
title: "Ethereum's quantum plan Before Q-Day with Justin Drake"
description: "An interview with Justin Drake, Ethereum Foundation researcher, covering Ethereum's post-quantum roadmap, the Lean Ethereum roadmap, and an honest discussion about existential risks."
lang: en
youtubeId: "wURmzLKhJco"
uploadDate: 2025-07-15
duration: "1:12:30"
educationLevel: advanced
topic:
  - "roadmap-and-priorities"
format: interview
author: Bankless
breadcrumb: "Justin Drake"
---

An interview with **Justin Drake**, Ethereum Foundation researcher, covering Ethereum's post-quantum roadmap, the Lean Ethereum vision, formal verification breakthroughs, and a candid discussion about AI existential risk.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=wURmzLKhJco) published by Bankless. It has been lightly edited for readability.*

#### Introduction and the quantum threat (0:00) {#introduction-and-the-quantum-threat-000}

**Justin Drake:** One interesting shift of mindset for me in the last few months is that I've stopped thinking about post-quantum as a hurdle that we have to overcome and I think of it more as an opportunity. It's an opportunity for Ethereum to stand out as the very first global financial system that is post-quantum secure, not just relative to its competitors like Bitcoin and whatnot, but also relative to fiat and TradFi. And I think it would send a very strong message and kind of be a very natural security selling point for the world to migrate over to Ethereum.

**Ryan Sean Adams:** Bankless Nation, we are once again joined with Justin Drake. We're going to talk about quantum computing as it relates to crypto, Bitcoin, and also Ethereum. Justin, welcome back to the podcast.

**Justin Drake:** Hi guys. Thanks for having me again.

**David Hoffman:** So quantum has become kind of a big looming threat to our industry. We've always kind of known this. It's been largely theoretical. Over the last six months or so, quantum has firmly moved from theoretical to something materially impacting our industry. Starting with just Bitcoin price, because fund managers — even BlackRock has put out pieces about the threat of quantum to the security and therefore the value of Bitcoin. So we have anecdotally seen people de-weighting their portfolio of Bitcoin. Perhaps that is also suppressing the price of all the other assets in the industry.

Not to just talk about price, but as we understand it, quantum really impacts the way blockchains function. So this seems to be a fundamental problem of our industry as a whole. A hurdle that our industry has to get over — when crypto and blockchain were created in the first place, we were not equipped to become post-quantum as an industry. So maybe to start off with context, what is the timeline here? When is this hurdle coming? I've heard this called Q-Day. When is Q-Day? How much time do we have to get over this quantum hurdle?

**Justin Drake:** Yeah. So I just want to back up a little bit and emphasize what you said, which is that in the last 6 to 12 months, we've had major breakthroughs. One of them is this notion of error correction. We're able to go from so-called physical qubits, which are very noisy and error-prone, to perfectly logical qubits. Right now we can basically manufacture one logical qubit, but it's still a very important zero-to-one moment and now it's about scaling it to multiple logical qubits. Another big breakthrough is on the algorithmic side. Previously we thought it would take millions, actually tens of millions of physical qubits in order to break our beloved cryptography. But last year there was a paper that made a 10x improvement, bringing it down to 1 million physical qubits. And this year we have another 10x improvement, bringing it down to 100,000 qubits.

So the goalposts are coming closer and closer, and you have this double exponential in some sense that will eventually cross. And then another thing that has happened is on the investment side — a lot of the quantum startups have been raising billions of dollars. Last year I believe we're talking on the order of $5 billion, which is unprecedented. Previously we were talking hundreds of millions. And I think the culmination of all of these things has really energized the public and led to this narrative which has indeed potentially impacted the price of Bitcoin and Ether.

Now projecting into the future, my personal Q-Day is in 2032. This is a little bit of an optimistic take in the sense that it's possible they'll arrive a little bit later, but we need to be prepared for the worst case scenario. So I'd say there's at least a 1% chance that Q-Day is in 2032, more likely than not a double-digit percentage. Various experts will tell you somewhere between 2031 and 2038. One of my friends in the industry, Steve Bryley, founder and CEO of one of the biggest quantum error correction companies in the world, who happens to be based in Cambridge where I am — his personal Q-Day was 2032, but he's had this date for 15 years

#### When is Q-Day and how do we prepare? (5:08) {#when-is-q-day-and-how-do-we-prepare-508}

and it's always stayed the same.

**Ryan Sean Adams:** Wow, that's impressive continuity.

**Justin Drake:** And basically, you just need to extrapolate the exponentials and that's where you end up. And so what we're trying to do with Ethereum is to make sure that we have everything wrapped up well before 2032. And my completion date for Ethereum being fully post-quantum secure is 2029.

**David Hoffman:** So a year ago we had you on with Scott Aaronson, who is kind of a godfather in this space. We asked some questions about Q-Day. Is a good definition of Q-Day the day in which quantum computers can break our signature schemes like ECDSA? Is that what Q-Day actually means?

**Justin Drake:** Yeah exactly. So we have this new term called CRQC — cryptographically relevant quantum computer. If you squint a little bit the Q in the middle becomes an O and it's like a crocodile, "croc." That is when it becomes relevant for us. It's possible that there will be other applications that make quantum computers useful for chemistry or physics, but that will come a bit later.

**David Hoffman:** I recall him saying he was kind of hedging at that time. This was a year ago, January 2025, and he said within 10 years we should have useful fault-tolerant quantum computers, but he was very careful to say that doesn't mean we would be able to break ECDSA. He wouldn't commit to a date because he said it was a staggeringly hard engineering problem. I have noticed that his tone has changed over the past year, and indeed he's actually joined some organizations and foundations to help cryptocurrencies navigate quantum. Is this for the three reasons you emphasize — breakthroughs in algorithms, fault correction which allows us to scale logical qubits, and then the billions in VC funding poured into it? Has his opinion changed?

**Justin Drake:** I can't speak for him, but one thing we should note is that Scott is primarily a theoretician. For a very long time he was working on the theory, not so much on the day-to-day of quantum computers, and I think that was partially the reason why he was so hedged. What's happening more and more is that there are real companies, real entrepreneurs building these things and he has an insider view. He's basically ingesting all this information. One of the things that he said recently is that the US government is starting to intervene with the publication of ideas. So we have companies and academics that might come up with improvements to Shor's algorithm, and those are not completely being disclosed, potentially for national security reasons.

#### Physical qubits, logical qubits, and breaking ECDSA (10:11) {#physical-qubits-logical-qubits-and-breaking-ecdsa-1011}

**David Hoffman:** Wow. Okay. So governments are getting involved in this it sounds like. We're not actually sure all the work that's going on behind the scenes — we're only aware of the commercially viable work at this point. On the logical qubit piece, you said we have one logical qubit right now. There's physical qubits and logical qubits, and the thing to scale is logical qubits. In order to break ECDSA, how many logical qubits do we actually need? That's a metric I'm looking at, but is that even the right number? I've heard people talk about needing a thousand, or maybe 1,500. Is this a number we should be paying attention to?

**Justin Drake:** Yeah, so there are multiple relevant metrics. There's the total number of physical qubits, the total number of logical qubits, and also the total number of steps it takes to run the algorithm. And this has a real impact because it's going to determine if it takes a minute to break a key, a day, a week, a month, or a year.

**David Hoffman:** And what are the scalers for each of those — physical, logical, and then time to run the algorithm?

**Justin Drake:** So roughly speaking, the number of physical qubits to get one logical qubit today is a few hundred — call it a thousand. What should happen is that the quality of the physical qubits, the so-called fidelities, should increase, and we should also come up with better erasure coding codes that will improve this ratio. So it's possible that in the future we'll only need 100 physical qubits for every logical one, or maybe just 10.

When you look at the algorithm to break the discrete log and ECDSA, roughly speaking it's a small multiple of the number of bits in the curve. We're working with this curve called secp256k1. The 256 stands for 256-bit. So you take this number and multiply it by five or six, and that will give you roughly the number of logical qubits that you need — so let's call it 1,500. Because today we're at one logical qubit, in some sense we're three orders of magnitude away, like three 10x's in order to get there. But again, we're going to have improvements at the error correction side reducing that ratio, and improvements on the algorithmic side reducing the number of logical qubits needed.

Now on the runtimes, this is kind of interesting because there are two flavors of quantum computers — fast clock and slow clock. The fast clock operates really fast, kind of at the speed of light. You have the superconducting quantum computers and the photonic quantum computers — photonic, as the name suggests, uses photons, light, which explains why it's so fast. Then you have the slow clock — trapped ions and neutral atoms. The names don't really matter, but roughly speaking they operate a thousand times slower. Each architecture and modality has its own advantages and disadvantages. So it's quite possible that in the beginning we might see a slow clock modality win out in the sense that they will be the first one to break a key, but it will take them a long time — it might take them a week or a month. So in some sense Q-Day is not totally black and white; there will be a period where it's kind of broken but only for the very top high-value addresses.

**David Hoffman:** Interesting. But Q-Day could also happen behind the scenes without us knowing how far along we really are.

**Justin Drake:** Yes. And if indeed it is going to be a nation state that has access to these quantum computers first, unless crypto plays a major systemic role in the world, more likely than not they'll use their powers to attack things in a stealthy way — for example, spy on their adversaries. So that plays in our favor. But if you're dealing with a purely rational entity that's motivated by dollars, they might indeed go for Bitcoin or Ethereum.

#### Quantum data centers and the Q-Day attack scenario (15:10) {#quantum-data-centers-and-the-q-day-attack-scenario-1510}

**David Hoffman:** Last question on qubits. Are quantum computing data centers being built out right now? We have this massive data center buildout for AI. Is something similar starting to happen with quantum computers?

**Justin Drake:** Yes. I was reading this press release from Continuum. They're building a photonics-based quantum computer and they're very stealthy. They raised a lot of money — billions of dollars, partly from the Australian government — and they kind of want to one-shot quantum computers. A lot of what other companies are doing is building small proof-of-concepts and then ramping up, but they want to build the whole thing from day one. So they're building this massive data center. I think this is because of the modality — photonics doesn't require the really cold temperatures that some other modalities like superconducting require. So you can take a much more traditional-looking data center and put your quantum computer there.

**Ryan Sean Adams:** You just talked about how Q-Day isn't really black and white. There are a bunch of different things about a blockchain that are relevant to quantum, each with a different level of quantum susceptibility. But I want to take the position that actually Q-Day is an acute specific event — it's when the actual attack happens and as a result something breaks. Maybe that's different for different blockchains because different blockchains' risk profiles aren't uniform. But we can talk about the Q-Day for Bitcoin under the assumption that Bitcoin doesn't do anything. If we assume that Bitcoin doesn't adapt, there is a specific day where Bitcoin is attacked. What does that look like? What would happen on that day? What is the lowest hanging fruit for a quantum computer to attack Bitcoin?

**Justin Drake:** Basically, you need to look at the incentives to attack. The rational move for an attacker is to go fetch the largest addresses, and actually maybe even before that, to go fetch either addresses where there's perfect privacy or addresses where there's plausible deniability. Let me go through these one by one. The very first target will probably be Zcash, because if you attack Zcash you can mint an arbitrary number of ZEC and no one will know. So Q-Day won't be made public.

**David Hoffman:** Wait, just to be clear — Zcash is not post-quantum secure right now? Even though it's using ZK-SNARKs and all this?

**Justin Drake:** Yeah, it's using SNARKs that are based on curves that are liable to be broken by quantum computers.

**David Hoffman:** Okay. And then one potential set of victims might be people who have died and just lost their coins. If someone steals their coins, no one's going to complain — there's some amount of plausible deniability.

**Ryan Sean Adams:** But we would notice that, I mean, if we started seeing coins from people—

**Justin Drake:** Yes and no, because we're already seeing it today. Every quarter or so there's some zombie address that hasn't moved for 13 years, and they resurrect, and no one knows the real reason.

**Ryan Sean Adams:** Right? It's like a 13-year-old Bitcoin wallet that hasn't had a transaction since they mined the 50 bitcoins forever ago, and it makes its first transaction in 13 years. Whether that person is still alive and just waking up a dormant wallet or it's a quantum computing attack — a naive viewer just looking at the Bitcoin blockchain can't tell the difference.

**Justin Drake:** Exactly. Yes. And then you'd probably go and attack the biggest fish, which might be some exchange that hasn't put in the correct infrastructure to protect themselves. It turns out there's a very easy mitigation to quantum computers, the very first ones at least — don't reuse your addresses. When you reuse your address, you reuse the public key, and that means an attacker has time to crack the corresponding private key and then steal your funds the second time you use the address. So the best practice should be that if you're holding any funds in long-term cold storage, it should be a clean address for which the corresponding public key has never been revealed. Just to make this crystal clear: what a quantum computer allows you to

#### Vulnerable Bitcoin addresses and the Satoshi coins (20:08) {#vulnerable-bitcoin-addresses-and-the-satoshi-coins-2008}

do is to go from the public key back to the private key. So it really jeopardizes the foundations of property.

**Ryan Sean Adams:** So long dormant coins, no matter what blockchain, that have had their public key exposed — which is not all dormant coins, but a large percentage — are at risk. These are the Satoshi coins. Satoshi has his coins in a wallet that people know. This is why we call them the Satoshi coins, because we know where they are. What percentage of bitcoins are susceptible to this?

**Justin Drake:** Yeah, so there's this web page called the "Qisk List" — spelled with a Q instead of a C — by this company called Project 11 where they have this dashboard that gives you a live view of vulnerable addresses. I believe it's on the order of 35%.

**David Hoffman:** 35% of bitcoins.

**Justin Drake:** Yes. So millions of Bitcoin — let's say six or seven million. Yeah, that's hundreds of billions of dollars. And you're right that it does include the roughly 1 million BTC that Satoshi holds. Now, one of the interesting features of Satoshi's BTC is that they're all in increments of 50 Bitcoin, because that was the block reward and he would use a fresh address every time he mined. That's how the default software was programmed back then. If it takes, let's say, a day or even 10 minutes to hack one public key, you will see Satoshi's coins being drained at roughly the same rate that they were mined back then — once every 10 minutes or so.

It will be a process extended through time. And one interesting consequence is that if you're a small fish and you have significantly less than 50 bitcoins in your address, then you're fine. You're kind of shielded by Satoshi before you.

**David Hoffman:** Right?

**Justin Drake:** Yes. Exactly.

**Ryan Sean Adams:** In the running away from zombies analogy, you just need to not be the slowest one. In this case, we need to not have the largest wallets that are quantum insecure, because they'll just go for the larger wallets.

**Justin Drake:** Exactly.

**David Hoffman:** So Q-Day happens in a Justin Drake scenario — maybe Zcash is the first to have some form of attack, then you might see some addresses onchain that aren't very noticeable because the attacker won't want to draw attention to it. Some addresses on Bitcoin, but then the attacker would step things up and go for larger and larger treasure sources. Now, my understanding from Nick Carter's pieces is that there is a portion of Bitcoin supply in the lost coin scenario — either the individual has passed away, lost their private keys, or it's Satoshi themselves. I think Nick estimated the minimum threshold at 1.7 million Bitcoin, which would be 8.6% of the mined supply. This is less than the 35% susceptible to attack. People trying to stay one step ahead of the zombie attack will move to non-susceptible addresses. But if the coins are lost, if there's no access to private keys, you can't move them. And then other estimates say it could be as high as 15% of Bitcoin susceptible. What numbers have you seen?

**Justin Drake:** Yeah, so the rough number I have in mind is in line with those. It's about 2 million Bitcoin, let's say 10%. We have the 1 million from Satoshi and then roughly another million that hasn't moved for a very long time. We need to discount some of that because some zombie addresses are legitimate and will revive, but we should also increase it because there might be some recently spent addresses that will be lost. So 5 to 15% is the correct range. I would bet around 10–12%, which is very sizable — definitely in the hundreds of billions of dollars.

#### The burn vs. salvage debate for Bitcoin (25:24) {#the-burn-vs-salvage-debate-for-bitcoin-2524}

One could kind of think through the game theory here. Option A is to try and burn the coins. The advantage is you don't have the hundreds of billions of dollars of sell pressure. If you analyze this with a short-term lens, that's the rational move. But the whole story of Bitcoin is strong property rights, so if you have a longer lens, you shouldn't want to burn the coins. It's very difficult to know which way the community will go. It's possible that ultimately the decision will be made by large holders — for example, Michael Saylor and MicroStrategy. Because these large holders will receive a copy of both versions of the Bitcoin — the one with the burn and the one without — and they can choose to dump the one they don't like. And we know that Saylor is in favor of burning, so he can single-handedly potentially manipulate the market and get the outcome that he wants.

**Ryan Sean Adams:** Can we be clear on what you mean? Two options for who? So we have a scenario post Q-Day — if you believe Q-Day is coming, we will have say 10% of all Bitcoin supply that can be attacked by whoever has the best quantum computer. They can reach in and get the Bitcoin over days, weeks, and maybe months, picking these addresses off one by one. And that 10% can be taken by someone. You're saying the Bitcoin community has options with what to do with that 10% on the social layer, the hard fork layer. Those options are twofold.

Either they can burn or freeze the coins — effectively say these are dead addresses, we know they're dead, we don't want them to be quantum susceptible, so we'll hard fork and say these coins shall never be moved. It's 21 million less the 10% that was frozen. That's one option.

The other option is they just leave that 10% to whoever can create the quantum computer to go claim them. Almost like salvaging a shipwreck — whoever builds the submarine to get the gold can claim it. But those are forced options. No matter what happens, if Q-Day happens, the Bitcoin community has to choose one of those two. Either intervene, burn and freeze, or leave it to whatever geopolitical commercial force has the ability to develop quantum computers and go claim the prize. Is that what we're saying?

**Justin Drake:** Yes, that's very well said. But one small correction: this doesn't have to happen at Q-Day or after Q-Day. It can happen prior. At any point in time, the Bitcoin community or some subset of it can propose to make a fork. At the fork block number there would be two versions of Bitcoin the asset — just like the Bitcoin Cash fork. And ultimately this is decided by the market. Exchanges will set up the two versions of the asset and the market decides which one is the true Bitcoin. And it's possible that just because of short-term liquidity dynamics, the version which burns the coins, potentially ahead of Q-Day, is going to be the one that wins.

#### The Michael Saylor scenario and Schelling points (30:29) {#the-michael-saylor-scenario-and-schelling-points-3029}

**Ryan Sean Adams:** Right. So I'm Michael Saylor, I own 2–3% of Bitcoin supply, especially the liquid supply. I get both copies. We're forking the Bitcoin blockchain just like the Bitcoin fork wars of 2017. I want to preserve my value, so I sell all the bitcoins that are quantum susceptible and keep all the bitcoins on the version that burned the quantum susceptible coins. The price of the untouched blockchain goes down. The price of the burn version stays high because no one's selling it — Saylor's not selling, BlackRock's not selling. So you're saying the price of the quantum-solved Bitcoin will be higher and by market forces become the canonical Bitcoin.

**Justin Drake:** Yeah. And Michael might even decide to buy the burn version using the proceeds of the vulnerable one and go from 5% to five and a half percent.

**David Hoffman:** Right? But doesn't this mean there needs to be some level of top-down coordination on which wallets are frozen? Clearly we can label Satoshi's coins and freeze those, but then we have to freeze a few more. There are some wallets we can be meaningfully sure about — that person's dead. But we actually don't know where to draw the line on which wallets are valid to be frozen and which are actually owned by humans who are just dormant. Is there a clear line?

**Justin Drake:** Well, there's a concept called the Schelling point — in the absence of a central coordinator, how do you come to consensus? For Bitcoin, the Schelling point might be the block where a halving happens. You might pick the first halving, the second halving, or the third halving. That seems reasonably credibly neutral — any coin that hasn't moved since the second halving is considered burnt.

**David Hoffman:** So we just pick a date and say, hey, if you're leaving your bitcoins in a quantum insecure wallet by this date, we're going to burn your coins on this secondary blockchain that we're going to fork.

**Justin Drake:** Yeah, there's a relatively wide design space and some people have tried to be creative. For example, some people are trying to solve two problems in one go — both the quantum one and the security budget problem — where the proposal is let's take the 2 million coins and instead of burning them, add them to issuance. That kicks the can down the road for the security budget.

**David Hoffman:** I bet that becomes even more ambitious in terms of Bitcoin coordination. I don't know if you want to overload Bitcoin's coordination ability.

**Justin Drake:** Yes. If I were a betting man, I would just bet on the very simple burn, let's say, after the second halving.

**David Hoffman:** Okay.

**Ryan Sean Adams:** This is so difficult though, because to your point earlier, Justin, this does shatter the incorruptible narrative, the property rights narrative. Any decision on a freeze or burn somewhat shatters the pure nature of what Bitcoin is. So Nick Carter in his essays goes through a different story — not a burn and freeze scenario but the salvage scenario. In his scenario, a private quantum lab cracks ECDSA ahead of schedule. They happen to be US-based. The US government quickly nationalizes them in secret. They start acquiring the Bitcoin, coordinate with Treasury, coordinate with the big ETF providers, BlackRock, the Michael Saylors of the world. And at the end, the US ends up with the 10% of Bitcoin supply in the Treasury. He goes through fictional price charts — when people realize the Bitcoin network is under quantum attack, price spikes down 73%. But then when it's revealed that the US government has it and they're using maritime salvage laws to legally confiscate it, the market rebounds because the US has this Bitcoin strategic reserve treasury. So that's his other scenario. Do you find that plausible? Because at least in that scenario you're not breaking any property rights.

It certainly is incredible that this will have happened to a multi-trillion dollar network with such a prize bounty. It's unprecedented. But that could also happen, and maybe that's a better outcome for Bitcoin.

#### Proof of seed phrase and the post-quantum signature size problem (35:06) {#proof-of-seed-phrase-and-the-post-quantum-signature-size-problem-3506}

**Justin Drake:** Yeah. So I have a couple thoughts. The first one is that there is a rather sophisticated way of proving ownership of Bitcoin without going through the private key. This is known as a proof of seed phrase. The way you derive a Bitcoin address is in three steps: step one, you generate your seed phrase; step two, you do some manipulations on the seed phrase including hashing to derive your private key; then from the private key you derive the public key, which is the address that goes onchain. Now the private key is unfortunately no longer something that can prove ownership. But because of the hashing step, if you know your seed phrase, that is still a proof of ownership. So one thing that could happen — and technically speaking is the soundest way forward — is to freeze the Bitcoin but allow anyone to revive their Bitcoin with a proof of seed phrase.

Now the proof of seed phrase is unfortunately quite complicated. It requires a SNARK, a zero-knowledge proof, so it would significantly complicate Bitcoin. But my prediction is that Bitcoin is going to have SNARKs to solve the size problem of post-quantum signatures. Bitcoin is very much known for not wanting to increase its block size. Unfortunately, post-quantum signatures are roughly 10 times larger than ECDSA. To give you the concrete numbers: ECDSA is 64 bytes, a minuscule signature. The smallest NIST-standardized post-quantum signature is Falcon, which is 666 bytes — more than 10 times larger. If you naively swap out ECDSA for something post-quantum secure without increasing the block size, your throughput goes down roughly 10x. Your TPS on Bitcoin will go from three to 0.3, which in my opinion is a non-starter.

What we're building for Ethereum is this fancy post-quantum signature aggregation technology so that you don't put the raw signatures onchain even if they're large — you only put this aggregation proof. And my bet is that Bitcoin is going to adopt the solution that Ethereum develops, because there's just no other technically sound way forward.

**Ryan Sean Adams:** I see. And that's why you're betting against the salvage scenario — because you think they'll go with this approach, and if they do, it gives them a way to more credibly neutrally freeze the assets. If you can prove ownership, you can access the old legacy Bitcoin.

**Justin Drake:** Yes. Now unfortunately, if you're a property rights maximalist, this is not completely satisfactory.

**Ryan Sean Adams:** No.

**Justin Drake:** And the reason is that there are some subset of the frozen addresses for which there is no known seed phrase. The seed phrase standard only came several years after genesis. So all the early addresses — all the Satoshi addresses, for example — won't have a corresponding seed phrase. And there are some wallets, for example MPC-based wallets, where there is no corresponding seed phrase. So it's not a perfect solution, but it gets you 80%.

**David Hoffman:** So messy. This is so messy no matter how you cut it.

**Justin Drake:** Yes. The other thing I wanted to highlight is that a lot of people think that when you steal Bitcoin, the price of BTC will crash and the asset you've stolen will be worthless.

But there actually is a way to hedge the price of Bitcoin, which is very easy — you just go short BTC. Let's say you know for sure that you've cracked the private key of a wallet that holds 100,000 BTC. You short 100,000 BTC. That locks in your profit. And then no matter what the price of Bitcoin does, you've locked in your profit, which could be tens of billions of dollars.

#### Bitcoin's social layer challenge and Ethereum's advantage (40:07) {#bitcoins-social-layer-challenge-and-ethereums-advantage-4007}

**David Hoffman:** Now, I do want to flag that Justin, you think in a particular way, and the way you think is why you are in Ethereum. If you were a Bitcoiner, you would think a different way. The Bitcoiner way of thinking is very unique, very distinct — kind of a property rights maximalist. I think what Justin would do if he was in charge of Bitcoin is very different than what the general aggregate of Bitcoiners would do. I don't have an actionable question here, but I just want to highlight that.

**Ryan Sean Adams:** Oh yeah. What Bitcoiners do is probably not what you're going to do. Nick Carter's charge is that basically what many of the Bitcoin core devs are doing is burying their head in the sand and saying Q-Day is not real or it's not going to be real for 20 to 30 years.

**Justin Drake:** Just to be clear, my prediction around the burn winning out is a prediction of what I think is most likely. It's not what I would do — I would actually not touch Bitcoin and embrace the property rights. I don't have this short time preference, and I think many Bitcoiners will agree with me. But unfortunately, Michael Saylor has just such a strong influence that in some sense Bitcoin has been centralized at the social layer, and that comes with great power and great responsibility.

**Ryan Sean Adams:** I actually agree with you. That's what I would do too. I would let the treasure hunt happen, the salvage happen. I would not touch anything. That is the key thing that Bitcoin does, and just let the chips fall where they may. Let me ask you the same question though. It's not just some portion of Bitcoin supply that is post-quantum insecure — Ethereum has this problem too but with a different percent of supply. Can you map that same problem? We get to a post-Q-Day scenario. Somebody is scooping up the Satoshi Bitcoin. What's happening on Ethereum at this point? What percent of supply would be susceptible? Let's say Ethereum didn't solve quantum yet.

**Justin Drake:** One advantage that Ethereum has is that there isn't the 5% of supply controlled by one person Satoshi which is thought to be lost. The other advantage is that Ethereum is less old and it had a price from day one. So there was a reason to take care of your Ether from the very beginning, whereas in the early days of Bitcoin, it was just monopoly money and people didn't have very good hygiene with their private keys. So it's much more likely that Nick Carter's 1.7 million BTC are actually truly lost.

When I was with the Ultrasound project, one of the things we were trying to do was calculate the amount of known lost coins to add to the dashboard in addition to the burn. It was just such a negligible amount that we didn't even bother.

**David Hoffman:** What about the Parity hack? Isn't that a large portion?

**Justin Drake:** Yes, very good point. That was the number one item in the list. But it happens to be a bricked smart contract which is not vulnerable to quantum computers.

**David Hoffman:** So the—

**Ryan Sean Adams:** It's actually just stuck. It's not about not having the private keys. It's literally stuck.

**Justin Drake:** It's bricked. Yes. Exactly. And then there are a few case studies of people — if you really go digging in the Reddit discussions you'll find stuff — but in the grand scheme of things it's some total less than 0.1%. That is the known lost supply. But realistically, some coins will be revealed to be lost closer to Q-Day. If I were to make a guess, that's in the small single digits — maybe 2, 3, 4, 5%.

**David Hoffman:** So you think at max 2–5% of Ethereum supply is both lost and in quantum-crackable addresses.

**Justin Drake:** Exactly. Yes. If I were to make a concrete prediction, I'd say about 2%, which is roughly an order of magnitude less than Bitcoin. And this quantitative difference has qualitative consequences: in the case of Ethereum, I would strongly advocate for not doing anything and really honoring property rights, because at the end of the day, 2% is not a big deal. In the case of Bitcoin, 15% is a massive deal.

#### Ethereum's three-layer post-quantum upgrade (45:05) {#ethereums-three-layer-post-quantum-upgrade-4505}

**David Hoffman:** So Ethereum will have to make this same choice. Let's say 3% — whether to do the freeze and burn or just let it be a treasure hunt. Your hope is we go with the treasure hunt option, meaning some quantum attacker will scoop up that 1–3% of Ether. And if you zoom out, we're basically moving towards Ether being much better money than BTC. It will be non-interventionist, respectful of property rights, quantum secure, and it won't have the security budget issue that's going to plague Bitcoin in a couple halvings. So I think this is a big opportunity for the asset.

**Ryan Sean Adams:** Okay. We've talked about the soft social issue. There are a lot of technical challenges we also have to face. I want to bring out this tweet from Hasu Kareshi, friend of the show. He was quote-tweeting a Vitalik post on Ethereum's quantum roadmap and said: "Ethereum has a tougher roadmap to become post-quantum than Bitcoin — actually a lot of dependencies before you can tackle EOAs and private keys due to post-quantum proof sizes." So his take is that the challenges ahead for Ethereum are much tougher than Bitcoin. What do you think?

**Justin Drake:** There are two problems to solve: the technical one and the social one. On the technical one, Hasu is correct that there are basically three problems Ethereum has to solve — each of the different layers. There's the consensus layer where we have BLS. There's the data layer where we have KZG. And the execution layer where we have ECDSA. Each of these pieces of cryptography are vulnerable. That is a superset of Bitcoin, which only has the ECDSA problem. So in some sense we have three times more things to upgrade.

But when you zoom out, I'd argue the bigger issue — maybe 80% of it — is social. We've already touched on whether to burn or not. But there's something even more fundamental: do we accept that this is even a problem? In Bitcoin land there is this immune response that basically rejects any narrative that could be bad for the price. You have people like Adam Back saying quantum computers are at least decades away. So step zero is some sort of acceptance that there is a problem. And it's possible that Bitcoin will be slightly too late, which would have much bigger consequences than on the technology side.

**David Hoffman:** So you think generally Bitcoin will have a harder problem because their social layer is just not acknowledging this reality and is less willing to engage?

**Justin Drake:** Yeah. Let me say this: I'm willing to bet a large amount that all three layers of Ethereum will be upgraded prior to the single layer of Bitcoin.

**David Hoffman:** Right. So we have three times larger of a problem. But on the Ethereum side it's just an engineering problem at the end of the day. And not only that, it's an engineering problem that Ethereum is taking head on. While Bitcoin's engineering problem is smaller, it's a social problem, a coordination problem, which is fundamentally harder to get over.

**Justin Drake:** Yes. Exactly. And even on the technical side, this is a problem we've been working on for almost a decade. If you rewind to 2018, we gave a $5 million grant to StarkWare to study hash-based post-quantum SNARKs and lay the foundations with SNARK-friendly hash functions. This is where the Poseidon hash function came from. More recently, in 2024 there was the Lean Consensus Chain announcement, formerly known as the Beam Chain. We've had post-quantum workshops in Cambridge last year. We now have a dedicated post-quantum team with Tom and Emil. And we have this roadmap which

*(50:00)*

#### Upgrading the execution layer: signature aggregation (50:00) {#upgrading-the-execution-layer-signature-aggregation-5000}

really details some of the key milestones to making these upgrades.

**Ryan Sean Adams:** Can we talk about each of those problems one by one? I know Justin, you can get into extreme detail with the cryptography — we'll want to keep this at a level that David and I can understand. But we do understand the different layers of the Ethereum stack. Maybe we can start with the execution layer, because that's been the main thing we've talked about. ECDSA is the signature scheme behind both Bitcoin and Ethereum addresses — that's the thing that would be cracked in a post-quantum world. What's the upgrade path to ECDSA? That's a long-standing cryptographic tool — do we have something that can replace it?

**Justin Drake:** Yeah. First of all, let me highlight that this is a very big task — we're fundamentally changing the pillars of blockchains, the base cryptography, and swapping it out with something new with completely different properties. Now if you were a layperson, your answer might be, "It's simple. We have NIST, the National Institute of Standards and Technology. They've come up with a post-quantum signature competition and selected a few — namely Falcon, Dilithium, and SPHINCS+. We just need to pick one or several of these options."

The problem is that NIST has not designed for the blockchain use case. They've designed for individual signatures for individual messages used on the internet. In the context of blockchains you have batches of transactions — for Bitcoin, thousands of transactions per block. And we have this size problem with post-quantum signatures being at least 10 times larger, if not 100 times larger. In my opinion, it's a total non-starter to consider these individual signatures naively packed and concatenated in blocks.

The only solution I see is called signature aggregation, where you take multiple signatures and squish them into one multi-signature. Verifying this master multi-signature is the same as verifying all of the individual constituents. When you look at the design space for aggregatable post-quantum signatures, there aren't many options. There's essentially one option that is viable in my opinion: make use of SNARKs, specifically post-quantum SNARKs. There's basically one major family — hash-based SNARKs.

The basic idea is that you take individual post-quantum signatures and prove knowledge of all of them to end up with a final SNARK proof. Now, if you're going to go with hash-based SNARKs, you might as well also go with hash-based leaf signatures — the unaggregated raw signatures. The reason is that this gives you simplicity and security benefits. It's the most minimal security assumptions you can have — you're just assuming that your hash function is secure. In the world of blockchains, hash functions are foundational. We have them everywhere — for building blocks, Merkle trees, state trees, and blockchains where the chaining is done with hashes.

The Ethereum Foundation has put in a lot of effort to start with hash-based signatures and make them as SNARK-friendly as possible so that the cost of aggregation is as low as possible. I'm pleased to report that the performance of this approach is actually good enough for all blockchains. Whatever the throughput of your chain, you can have an aggregator on reasonable hardware — for example, a laptop CPU — aggregating all these transactions and producing a final proof that gets accompanied with the block.

And one of the ironic things about this approach is that it's actually a scalability increase relative to what we have today. The reason is that you don't have the fixed cost of 64 bytes per transaction. The transactions have zero bytes of signature data, and then you have this one master signature which gets amortized across all transactions in the block.

#### Setting the industry standard with Bitcoin collaboration (55:28) {#setting-the-industry-standard-with-bitcoin-collaboration-5528}

**David Hoffman:** Okay. So this is an upgrade for many other smart contract blockchains downstream of Ethereum, especially the ones that optimize for speed—

**Justin Drake:** Not just smart contracts — Bitcoin as well. ECDSA.

**David Hoffman:** Yeah. Right. So what I thought going into this episode was that chains like Solana would be encumbered by beefier signatures, just like Bitcoin TPS slows down to 0.3 transactions per second. Solana would similarly slow down because transactions would be beefier in a post-quantum world. But you're saying with this technology that won't be true — it will actually allow chains to broadly get faster.

**Justin Drake:** Yeah, exactly. Just like Satoshi with ECDSA set a de facto standard for the whole industry — we basically copied even the secp256k1 curve, which is very unusual. No one knows why he picked that curve, but it became the de facto standard. I think there's an opportunity for Ethereum to be a first mover and set the de facto standard.

The strategy we're taking is to collaborate with the Bitcoiners. In Bitcoin land, there's a couple individuals — Mikhail Komarov and Nick Jonas. They're both part of Blockstream and they're both hash-based signature experts. We're working with them to make sure that whatever we develop in Ethereum land is also applicable to Bitcoin. And if Bitcoin and Ethereum use that standard, then the whole industry presumably will also use the standard.

**Ryan Sean Adams:** That's fantastic. So we have a way to solve the execution layer post-quantum upgrade without a performance hit. Let me ask another question though — how about security? This is newer cryptography versus ECDSA which has been around forever and has Lindy. Should we be worried that there's some kind of hidden bug or zero-day that could completely destroy what we've built?

**Justin Drake:** I have a few thoughts here. We take security extremely seriously, and overall I expect the solution we deploy will be orders of magnitude more secure than what we have today with ECDSA. Let me explain. ECDSA is based on elliptic curves — fancy structured mathematical objects. It's possible that some clever mathematician comes up with an algorithm to break the discrete log using some fancy mathematical trick that humanity was not aware of. This has happened in the past — we have better and better algorithms for factoring and for discrete log. And one possibility with the advent of AI is that we have mathematicians 100 times smarter than human mathematicians that discover hidden structure in elliptic curves and can break our cryptography. So the cryptography we're building is not only post-quantum, it's also post-AI.

Going back to the other thing I said — it only relies on hash functions. Any signature scheme relies on two things: the hash function, and an optional additional hardness assumption which might be the discrete log, or in the case of lattice-based signatures, structured lattices. But in the case of hash-based signatures, there isn't this additional hardness assumption — it's just hash functions. If your hash function is secure, you're good. So in that sense, I expect it to be an improvement versus the status quo.

Now there are two caveats I want to highlight. Caveat number one is that we're dealing with more complex objects, and the solution we have here is what we call deep end-to-end formal verification.

#### Formal verification, Poseidon, and the consensus layer (1:00:33) {#formal-verification-poseidon-and-the-consensus-layer-10033}

We have our cryptographic object and we want to prove mathematically that it is sound — that it is impossible to forge a signature. And not only do we want to do this for the mathematics, but also for the code. Had you asked me 2–3 years ago if this was doable, I would have said yes, but it was extremely laborious and expensive. What we're seeing with the advent of AI is that this laborious and expensive work can be done 100 times faster and 100 times cheaper.

We're starting to see bleeding-edge world-class mathematics — for example, a recent result that won the Fields Medal, the equivalent of the Nobel Prize for mathematics. That result has been formally verified by an AI in five days. They produced half a million lines of code — a machine-checkable proof that this is indeed a valid theorem — and in the process found all sorts of typos in the human-written paper. That's the kind of due diligence we want in order to avoid bugs.

Now there is another thing I want to highlight: the hash function itself. Historically, blockchains have been built on either SHA-256 in the case of Bitcoin, or Keccak in the case of Ethereum. Our proposal for post-quantum Ethereum is to introduce another hash function called Poseidon, which is a different type of hash function because it's SNARK-friendly. By the time we launch Poseidon, it should be pretty safe — it will have been analyzed for a full 10 years, will have been securing many billions of dollars through the L2s, and will have gone through cryptanalysis by all the top experts in the field. We also just announced a $1 million prize to try and break Poseidon. But it is indeed possible that Poseidon could break.

Unfortunately, the way you design hash functions is that you can't prove that they're secure. The best you can do is the lack of an attack — there's basically this baking time. And the order of magnitude I have in mind is eight years. Why eight years? Because when Satoshi picked SHA-256 it was eight years old. When Vitalik picked Keccak it was eight years old, coincidentally. So I would want Poseidon to be at least eight years old, which it will be when we deploy it on Ethereum.

**Ryan Sean Adams:** Okay. So that's the execution layer. Quickly, could you talk about the data layer? KZG needs to be upgraded to something post-quantum, and the consensus layer where we have BLS signatures. Is that similar in level of effort to replacing ECDSA?

**Justin Drake:** Let me start with the consensus layer because it's a simpler answer. At first approximation it's basically a copy-paste. We have a similar concept where actors make signatures, there are a lot of signatures, they take up space, and we want to compress them. The issue at the consensus layer is that we have way more signatures than at the execution layer. People don't realize this, but we have a million validators — that's a million signatures per epoch, 32,000 signatures per slot, thousands of signatures per second. It's more than Solana in terms of vote transactions.

To unlock a certain performance optimization only available at the consensus layer, we have this notion of a stateful signature — the messages you sign have a counter that increases every time. Doesn't that remind you of something? The slot number. In Ethereum at the consensus layer, you will only ever sign a single message per slot. If you sign two, you get slashed. We use this constraint to have signatures that are 10 times more efficient to aggregate.

#### Lean VM, the Lean Consensus roadmap, and 2029 timeline (1:05:17) {#lean-vm-the-lean-consensus-roadmap-and-2029-timeline-10517}

This is the main difference — stateless hash functions at the execution layer versus stateful signatures at the consensus layer where the slot number increments. The aggregation technology has a name: Lean VM, a minimal zkVM for hash-based cryptography. Basically, Lean VM would be proving that this is a correct Merkle root. The main thing we're not completely sure about yet is whether this approach can unlock what I call the "tera gas frontier" — 1 gigagas per second at the L1, 10,000 TPS, but even more ambitiously, 1 teragas, 10 million transactions per second at the L2 using the data availability.

We're talking about 1 gigabyte per second of data availability, and the question is can the zkVM be performant enough to crunch through 1 GB of data per second. That's still to be determined based on future optimizations.

**David Hoffman:** But what we do know for sure is that Ethereum will have the DA to have 1 gig per second for the L1 plus a handful of L2s.

**Ryan Sean Adams:** So I think listeners might be thinking at this point, "Okay, it sounds like Ethereum has a plan to upgrade to post-quantum. They're acknowledging quantum computers will exist and there is a Q-Day." Now they're wondering about timeline and level of effort. I took Vitalik's post-quantum roadmap tweet and threw it into Claude and asked, "What's the level of effort here?" Claude said, "Think of this as a nine out of ten." This is one of the most significant upgrades Ethereum will ever do. We compared it to the Merge, where we had a plane in mid-flight and swapped out the proof-of-work engine for proof of stake. Now we're swapping out much of the core cryptography. Can you scope this for us? Will we be ready by 2032? How difficult is this? Does it seem daunting?

**Justin Drake:** Yeah. Two parts to the answer. First, it's actually even more ambitious than you framed it. The change to the cryptography is so invasive that it's essentially a rewrite of the consensus layer, at least. And if we're going to rewrite the consensus layer, we might as well properly rewrite it — put in all the goodies and clean up all the technical debt. That's the Lean Consensus project, where we're bundling together multiple rewrites including single-slot finality with the post-quantum upgrade.

So yes, it is very ambitious. We're starting from a clean slate and building something amazingly beautiful, simple, efficient, and provably secure. The good news is that starting from scratch is simpler in many ways because you don't have all the technical debt. We can rewrite the spec to be as minimal and simple as possible. This is where the terminology "lean" comes from — maximum simplicity, where the whole state transition function is basically a thousand lines of Python code that a smart high schooler can just read.

Right now we have devnets for Lean Consensus. And the specs are so easy to ingest that we've seen about 10 teams implement them, join the DevNet, and do so without even contacting the Ethereum Foundation. The barrier to entry is relatively low. We're in this world where AI development means you can to a large extent vibe-code your client. That's a big reason why we have so many clients — often single-person teams, or two- or three-person teams.

I think this will have interesting consequences for sustainability as well as governance. On governance, the way we do it today is roughly speaking

#### Ethereum governance and the 2029 completion date (1:10:41) {#ethereum-governance-and-the-2029-completion-date-11041}

that we have five consensus layer clients and they all need to implement the upgrade in order to move forward. In the future, when we have 10 or 15 clients, we can just require the top 80% or the fastest 80% in order to move forward. That's more of a Darwinian competition that allows us to move much faster without waiting for the slowest client.

**David Hoffman:** So will we be ready by 2032? At what point will we be ready?

**Justin Drake:** The whole roadmap has everything laid out up to 2029,

**David Hoffman:** Which is basically the exact same roadmap you gave at your DevCon talk where you introduced the Beam Chain. And back then people hated it.

**Justin Drake:** Yes, it was my most-hated slide, because it stretched over four and a half years. Historically I've been bad with timelines — way too optimistic. But as I age and get white hair, I've been getting better at timelines. I think it was a realistic, conservative timeline that got people upset. But that's just the way it is.

**David Hoffman:** Also just for context, people got upset partly because this was during peak Solana momentum versus a perceived lack of technical momentum on the Ethereum roadmap. It wasn't just the four-year timeline — it was also the context of the moment.

**Justin Drake:** Exactly. So we're now roughly three years away. I'm relatively confident we can meet the 2029 milestone, and I think there's even an opportunity to move faster thanks to AI.

**David Hoffman:** So by 2029, all of this would be implemented if it meets the roadmap — everything we just talked about.

**Justin Drake:** You promise? Everything.

**Ryan Sean Adams:** Isn't there something in the back of my head about some ancient software developer telling me that rewrites never work? Why doesn't that apply here?

**Justin Drake:** One piece of good news is that we have already done this type of large rewrite, as you alluded to, with the Merge. We completely changed the consensus foundations of Ethereum from proof of work to proof of stake. That's an existence proof that it can be done. Ethereum is no stranger to ambitious projects — we've had other very ambitious things like Danksharding and data availability sampling on a similar scale.

Another piece of good news is that we have no choice. We have to change the cryptography. It is a very strong forcing function, and that alone is an 80% rewrite anyway.

That makes the coordination and coming to consensus much simpler.

#### Quantum isn't just a crypto problem (1:15:06) {#quantum-isnt-just-a-crypto-problem-11506}

**David Hoffman:** I guess we should emphasize it's not just Ethereum that has no choice — no one in crypto has an alternative to this. Everyone in crypto has to do a rewrite. With Bitcoin it's just ECDSA, but that in itself is enough.

**Justin Drake:** Yes. It's possible that Ethereum has to do more of a rewrite than other chains, and this has to do with the number of validators. If you only have 100 validators, you can absorb the cost of the 10x larger signatures at the consensus layer. For most proof-of-stake chains, you don't need the sophistication we have. But for Ethereum, we're hoping to have tens of thousands of validators voting every single slot — thousands of signatures per second — and we have to be very creative.

Where I would agree with you is that there has to be a very big change for all blockchains at the execution layer. But the good news for other chains is that Ethereum is doing all the homework. We're building Lean VM, we're going to formally verify the whole thing, and they can just copy-paste it. It's largely an easy job to integrate.

**Ryan Sean Adams:** Nick Carter tweeted, "One of the dumbest fallacies is people thinking their coin is going to win if only Bitcoin dies — like the Zcash people fighting Bitcoin over quantum. It's precisely the opposite. If Bitcoin dies, no one will ever trust internet money again. All coins ride on Bitcoin's coattails." What's your reaction to this sentiment?

**Justin Drake:** I disagree with Nick Carter. Nick has always been upset when I tweet about the security budget. He thinks it's destructive of the whole industry to be talking about this, even though the fundamentals align with what I say. Ironically, he's doing the same thing with quantum that I'm doing with the security budget — trying to force the discussion and force change.

**Ryan Sean Adams:** What about the larger take, though? Let's say we get to 2032, Ethereum is quantum secure, Bitcoin isn't, Bitcoin gets attacked in some of the ways we've described — there's this treasure hunt going on and market uncertainty. What Nick is saying is don't cheer for that because it's going to be bad for every chain in crypto. He's saying so goes Bitcoin, so goes everybody. If you want a meme of store-of-value internet money, Bitcoin has to lead that charge. There's no such thing as a "flipping" scenario where Ethereum can say, "Our chain is post-quantum secure and we don't have the problems that Bitcoin does." He's saying this will take the entire crypto space down, at least from an internet money store-of-value perspective.

**Justin Drake:** I disagree. You can just look at historical analysis — sea shells were superseded by salt, then silver, then gold, and now potentially Bitcoin superseding gold. Just because gold fails doesn't mean the next thing also has to fail. I'd say Ethereum is the very natural successor to Bitcoin as internet money. And just because Bitcoin fails doesn't mean Ethereum has to fail. I agree there might be some short-term pain, but we're also talking about long-term gain.

#### The post-quantum opportunity and security budget reckoning (1:20:27) {#the-post-quantum-opportunity-and-security-budget-reckoning-12027}

**David Hoffman:** So what do we get at the end of this? 2030, Ethereum is post-quantum secure because Justin promised. What does Ethereum become? Is it the only one in its class, or do you expect other blockchains to follow and also achieve post-quantum security? Can you describe the system we have in 2030 if all of this comes to pass?

**Justin Drake:** One interesting shift of mindset for me in the last few months is that I've stopped thinking about post-quantum as a hurdle to overcome. I think of it more as an opportunity. It's an opportunity for Ethereum to stand out as the very first global financial system that is post-quantum secure — not just relative to competitors like Bitcoin, but also relative to fiat and TradFi. I think it would send a very strong message and be a very natural security selling point for the world to migrate to Ethereum.

Not only is it an opportunity for Ethereum to distinguish itself relative to its peers, but it's also an opportunity for Ethereum to become the best version of itself. This goes back to the idea of the move to post-quantum essentially being a rewrite and that being a massive opportunity to start with a clean slate and wipe out technical debt.

One interesting data point: the OG Beacon Chain launched in 2020, and the design was frozen one year before in 2019. So when we ship the Lean Beacon Chain in 2029, we're going to be upgrading something that is 10 years old. In crypto, 10 years is an eternity. We've learned so much that the Lean Beacon Chain is going to be very different from the OG Beacon Chain. You can think of it as proof of stake 2.0.

**Ryan Sean Adams:** We are in a very interesting time with respect to computing. There seem to be three computing platforms and paradigms at the frontier: AI, which everyone is aware of; quantum, which is maybe where AI was in 2018; and crypto and cryptography as exemplified by blockchains like Ethereum and Bitcoin. It almost seems like we're entering a singularity of these three things, where AI is speeding up quantum and cryptography, and cryptography is going to be a counterbalance for some of the centralization vectors of AI. What do you think of all this?

**Justin Drake:** It's very hard to predict, but as you said, there's this very strange coincidence where 2032 seems to be the year where computing in general reaches the singularity. People have been talking about AI singularity potentially even before 2032. There's AI 2027, the very famous write-up. I don't think we'll have super intelligence in 2027, but I think it's likely by 2032.

We're already starting to see — just yesterday, Dario Amodei, one of the AI OGs, starting to have AI recursively improve themselves autonomously, which is extremely scary. This is basically what should start the exponential towards super intelligence.

#### Bitcoin's security budget crisis and the 2032 reckoning (1:25:12) {#bitcoins-security-budget-crisis-and-the-2032-reckoning-12512}

We have 2032 as potentially Q-Day, and we also have 2032 where Bitcoin will have what I believe is its final halving. You could call it B-Day — the Bitcoin day where there's some sort of reckoning, because the issuance will be way too low to secure it.

In two years we'll have one halving, and in six years in 2032 we'll have another. The security story for Bitcoin over the last 15–16 years has been that transaction fees will replace issuance. I invite you to look at the data — it's just not happening. Transaction fees today are 0.6% of issuance. So forget about transaction fees.

We're going to have an exponential decay of Bitcoin security. Today, Bitcoin is secured by roughly 10 gigawatts. And here's a mind-blowing statistic: every single day, China deploys one gigawatt, mostly of solar. So 10 days' worth of deployment in China is sufficient to 51% attack Bitcoin.

**David Hoffman:** In terms of energy cost — this thing that shields Bitcoin — China is producing as much energy as it takes to secure Bitcoin every 10 days.

**Justin Drake:** In terms of the power draw, Bitcoin is drawing 10 gigawatts. A gigawatt is roughly a nuclear plant, so 10 nuclear plants. China is deploying the equivalent of a nuclear plant every single day. And that's one of the main bottlenecks. The other bottleneck is the hardware — a million rigs. It would cost about $10 billion to pull off, which in the grand scheme of things is absolute peanuts, both relative to Bitcoin's market cap and for a nation-state attacker.

**David Hoffman:** When you talk this way about Bitcoin, it almost makes me think you no longer think Bitcoin should be the vanguard of crypto. The framing is that Bitcoin has flaws from a security budget and quantum perspective, and Ethereum is going to lead crypto afterward.

**Justin Drake:** I remain optimistic on quantum — ultimately it's a technical challenge that can be overcome. The bigger issue is the security budget, because that gets at the core DNA of Bitcoin: the 21 million cap and proof of work. I don't see how you can combine proof of work and a 21 million cap. You have to give up one.

There is a possibility that BTC the asset could decouple from Bitcoin the chain and live on a more secure chain — for example, as an ERC-20 token on Ethereum. But saying those words — Bitcoiners don't think like that.

**David Hoffman:** No, they don't.

**Justin Drake:** And if I said different words like, "We're just going to remove the 21 million limit because the security budget isn't sufficient" — Bitcoiners also don't think like that. They're heading very fast towards a wall, and 2032 is the reckoning day.

#### Harvest now, decrypt later — quantum risks beyond crypto (1:30:09) {#harvest-now-decrypt-later-quantum-risks-beyond-crypto-13009}

**Ryan Sean Adams:** What about quantum as it relates to the rest of society? This is not just a crypto problem. Blockchains are uniquely susceptible, but other components of society are also susceptible. To what degree does a post-quantum Ethereum represent a tool for society to solve and prevent things in a post-quantum, post-AI world?

**Justin Drake:** There are basically two flavors of cryptography. There's real-time cryptography where you're signing messages in real time with no material impact on past actions. Upgrading to post-quantum should be relatively straightforward for most of the internet. There are some exceptions — for example, satellites that have already been deployed and literally can't be upgraded.

Then there's another problem with encryption: if material has been encrypted today and you're not using post-quantum secure encryption, that data can be decrypted in the future. There's this whole class of attack called "harvest now, decrypt later." I think it's realistic that we're going to have mass decryptions in society — lots of Signal messages, Telegram messages, or troves of Gmail messages all being decrypted simultaneously. That could have a very significant impact on society.

#### Ethereum as defensive accelerationism and AI existential risk (1:30:09) {#ethereum-as-defensive-accelerationism-and-ai-existential-risk-13009}

**Ryan Sean Adams:** Justin, when we were talking about these three compute technologies, it does feel like the one that sticks out is AI. You were talking about 2032 being sort of an AGI-type moment. One general question: as an extremely talented cryptographer, you are not an AGI. The concern is that as we enter the computing singularity, all bets are off. All the well-laid plans we make in 2026 to have our blockchains be quantum resistant — what if AGI figures out how to crack our quantum-resistant cryptography in some other way? As a cryptographer, are you worried about the unknown unknowns of artificial general intelligence and the things it could crack? What if we're prepared for a post-quantum world but not prepared for a post-AGI world?

**Justin Drake:** On the cryptography, I'm fairly confident about the soundness. The reason is you can prove mathematically that your cryptography is correct. Cryptography is a sub-branch of mathematics. You generally calibrate these hard problems so that if someone were to computationally break them, it would use more energy than there is in the solar system.

Going back to the cryptographic foundations we're suggesting for post-quantum Ethereum — hashes — it doesn't get any stronger than that. This is the weakest cryptography you could hope to have. This is one reason I'm cautious about putting the foundations of the internet of value on top of lattices. NIST has two major flavors of post-quantum signatures: hash-based and lattice-based. The lattice-based stuff is very reminiscent of elliptic curves — highly structured objects. It's plausible that some AGI or even ASI, artificial super intelligence, thousands of times smarter than all of humanity combined, could crack it. But the hash functions — there are reasons to believe they're strong.

Even though I'm not too worried about the cryptography, I am worried about something much deeper. If you zoom out, I'm more and more worried about existential risk for humanity. More people are starting to understand what Eliezer was trying to say on Bankless not too long ago.

I think it's plausible that if humanity survives, Ethereum plays a key role in that happening. The metaphor I have is that humanity is driving a car at 100 miles an hour. There's this Moloch trap where the big nation states, TSMC, Nvidia, OpenAI — they're all pressing on the gas. And the car has no brakes, no seat belt, no airbag. Today we can steer relatively comfortably at 100 mph. Next year we'll be at 200, then 300. Eventually we'll be driving irresponsibly fast and crash.

Working on Ethereum has taken a whole new meaning for me in the last few months. I was mostly ignoring AI, partly because I was obsessed with blockchain stuff, but also because it was a toy not long ago. But through my work, especially with formal verification and development

#### The meaning of working on Ethereum in the age of AI (1:35:08) {#the-meaning-of-working-on-ethereum-in-the-age-of-ai-13508}

and coding, I'm seeing how powerful this stuff is. In the last few weeks and months I've been obsessed with AI, learning as much as I can. I'm by no means an expert, and maybe this is just a phase people go through when they open Pandora's box. But for me, working on Ethereum is now all about defensive accelerationism.

I don't see other parts of society working on the braking system — it's all gas. The good news is that Ethereum has a lot of the thinking and tools that could provide some of the solutions. From day one, we assume adversariality. From day one, we make use of technology like cryptography that empowers the weak and makes sure that even the arbitrarily strong cannot break certain things. We're trying to be a source of truth, to be decentralized, to give people sovereignty.

I think it's possible that in the coming months and years we'll have some sort of awakening where society goes, "Oh shit." And it might become a moral imperative to start working on defensive accelerationism. We might have some of the smartest minds naturally come to Ethereum as a potential solution — part of a suite of solutions that we need to tackle this.

**Ryan Sean Adams:** I love that you're thinking about that, and it sounds like your work on Ethereum gives you meaning. I have another question. Being obviously a huge fan of Ethereum, one worry I have if the AI destiny comes true is that at some level, yes, it's a defensive accelerationist technology — decentralized, permissionless, pushing power to the small rather than the large. But at another level, it is digital. We have created a property rights system, and it does seem possible that some AGI or ASI could leverage our immutable, can't-turn-it-off world computer for things humanity doesn't want. Are you worried at any level that it just uses Ethereum — "Hey humanity, thanks for the property rights system, we'll take it from here" — and you've actually accelerated a technology that's counter to humanity?

**Justin Drake:** I think this is a very fair point. Ultimately Ethereum is a tool which could be used by both humans and AIs. Maybe this is cope, but if you remove Ethereum, there don't seem to be many other alternative products in the defensive accelerationist space. It's pretty much all accelerationist. So yes, maybe Ethereum will accelerate some things, but it's one of the only hopes we have for defensive acceleration. As such, I think it's still rational to ship the roadmap by 2029 and do my best to make sure Ethereum will be ready for an age of artificial super intelligence.

**Ryan Sean Adams:** Just one last question as we draw this to a close. This has been absolutely fantastic. Maybe this is a personal question as you've had an AI awakening over the last few months. I now notice you're qualifying with "if humanity survives" — "Ethereum plays a key role if humanity survives." Those words are hard for me to say. The real possibility that technology accelerationism means humanity doesn't survive. How do you deal with that personally?

**Justin Drake:** I'm relatively zen about it. I've reached a point where I'm happy to die. I've lived a very happy life.

#### Closing thoughts on probability of doom (1:40:04) {#closing-thoughts-on-probability-of-doom-14004}

**Ryan Sean Adams:** What?

**David Hoffman:** This shocked us.

**Ryan Sean Adams:** That was not the answer I was expecting.

**Justin Drake:** I think you just need to keep hope. You need to put aside the so-called P(doom) — the probability of doom. My P(doom) now is relatively high. I think it's more than 50%. But I don't want to say this out loud. I don't want to—

**Ryan Sean Adams:** You don't want to live in that pessimism.

**Justin Drake:** Exactly. I don't want to discourage myself and make my life miserable. And maybe more importantly, I don't want to discourage other people and have them lose hope. I think we should be doing our best with what we have. The future is highly unpredictable. Even though my P(doom) went way up in the last few weeks and months, this is a strong opinion weakly held. I want very smart people to come forward and tell me why I should not be so scared and be more optimistic and hopeful.

As I said, I've only been thinking about this for literally weeks and months. I'm just scratching the surface. The big wake-up call for me was Opus 4.5, where Emil told me, "From this point onwards, AI is actually helping me become more productive." Before that it was net slowing him down. And then what we've seen in the last few weeks is more impressive results. About a month ago, one of the key lemmas in the hash-based SNARKs — the Polyshakes-Spielman lemma — was formally verified in 8 hours, costing $200. Something that would have cost 100 times more if a human did it and taken 100 times longer.

I also mentioned the Fields Medal result which only took 5 days to generate a 500,000-line proof. It's kind of obvious where this is going: we're going to have all known mathematical theorems checked and verified by AI, with all the typos corrected. For some small subset of "theorems," we'll actually have a demonstration that they're incorrect with counter-examples. Programming is largely solved already, then we'll solve scientific progress. Things get philosophical extremely quickly — maybe that's for another episode.

**Ryan Sean Adams:** I think that is for another episode. It's a fantastic answer though. I appreciate your insight into approaching this with some level of stoicism and then agency — working on things that are meaningful to you. We hope, if humanity survives, to do many more of these podcasts with you in the future. It's always a treat to have you, Justin Drake. Thank you so much.

**Justin Drake:** Thank you.
