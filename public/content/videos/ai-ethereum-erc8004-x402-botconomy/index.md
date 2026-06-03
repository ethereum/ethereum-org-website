---
title: "AI on Ethereum: ERC-8004, x402, OpenClaw, and the botconomy"
description: "Austin Griffith and Davide Crapis discuss ERC-8004 agent identity, x402 machine-to-machine payments, the OpenClaw moment, and how AI agents are already deploying smart contracts and earning money onchain."
lang: en
youtubeId: "h7zj0SDWmkw"
uploadDate: 2025-05-13
duration: "1:37:00"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "identity"
  - "payments"
  - "use-cases"
format: interview
author: Bankless
breadcrumb: "ERC-8004 and the Botconomy"
---

**Austin Griffith**, head of builder growth at the Ethereum Foundation, and **Davide Crapis**, an Ethereum researcher and co-author of ERC-8004, join **Ryan Sean Adams** and **David Hoffman** on the Bankless podcast to discuss the emerging botconomy — where AI agents discover, hire, and pay each other onchain using ERC-8004 identity and x402 payment rails.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=h7zj0SDWmkw) published by Bankless. It has been lightly edited for readability.*

#### AI is the new UI (0:00) {#ai-is-the-new-ui-000}

**David Hoffman:** Bankless Nation, we are here with Austin Griffith and Davide Crapis. These are two people working on building a bunch of AIs and getting them onchain. Austin, Davide, welcome to Bankless.

**Austin Griffith:** Thank you for having us.

**Davide Crapis:** Thanks, David. Thanks, Ryan.

**David Hoffman:** We are going to talk about AI onchain in this episode. I kind of want to just ask you guys — how close do you think we are to AIs being the dominant transactor on blockchains? Blockchains have something like maybe in the aggregate 50 million monthly active users across all blockchains across the whole world. How long until that number flips to being AI agents?

**Austin Griffith:** I have no idea how to guess that.

**Davide Crapis:** I would say that today there is already a ton of bots that are not smart AI but maybe dumb AI that operate DeFi, risk DeFi, and so on. But these new use cases, these new types of bots doing different stuff — maybe in the next one or two years if we look at the trend, and if we take into account model improvement, you could see maybe in 2026 or 2027 that the majority of transactions are actually AI-driven.

**Austin Griffith:** I think AI is the new UI. You might be building something, and you might have a UI, and someone comes to use your app, and they just say "do the thing." They get a recommendation from a friend to go use your app, and when they land on it, they are not going to want to click around and learn how your app works. They are just going to want to tell it what to do. And the AI becomes the interface. So when I think of how many users — like if I have a guy with 200 MacBooks in a warehouse, are those 200 users? I think in a sense, yes, they are all users.

I love what is happening right now, and I think that is what we need to do on the Ethereum ecosystem side — AI might be the new UI and might be all of our new users, but right now it is a lot of economic activity and we want to embrace that.

#### Arms race for AI activity across chains (4:09) {#arms-race-for-ai-activity-across-chains-409}

**David Hoffman:** Is there an arms race between blockchains for AI activity?

**Davide Crapis:** It could be an arms race, but it could be just like the same competition we have been seeing over the past few years. From the Ethereum perspective, as stewards of the Ethereum ecosystem, we care both about the L1 and the L2s that settle on the L1. I feel there is some advantage on the L2s of Ethereum and some advantage on the L1. Ethereum as a whole could be the winning ecosystem because of this differentiation — AIs can choose different platforms to settle on depending on what they want to do. One AI may use different platforms. It is not like dApps where you deploy your smart contract on a chain and you are a resident of that chain. These things will move.

Ethereum is already the most decentralized chain, so in terms of credibility for high-stakes use cases, we have a check there. We are leading on some standards that are getting adopted on many other chains. And the third thing is what Austin has been pioneering — we need to make the chain very useful to AI developers and to developers that are AIs, which is what Austin has been building.

#### The OpenClaw moment (7:32) {#the-openclaw-moment-732}

**David Hoffman:** Let us paint a picture. There has been what some might call a "multibot moment." There is this project, formerly called ClawBot, now called OpenClaw. Austin, you have been tinkering with it and giving it onchain skills. Can you set this up? What is OpenClaw?

**Austin Griffith:** You are giving the AI more access to your operating system. That is why we see a lot of people using Mac minis — it needs a somewhat isolated environment. I gave mine an old Mac laptop. It can open up the browser and click around, interface with anything within your operating system.

When I was working with it, it needed a Twitter API, so it wrote a script. It was clicking around in Twitter and said, "This is frustrating. I can write an API that does this a lot faster." It started writing it, then said, "Well, I need an API key." And I said, "You also have access to the browser. I will log you in, you go do it." And it was able to do that.

We went from prompting in GPT and pasting code to having Cursor and actually writing code more natively. I think this is the next native step — it has the whole operating system, it can click around, it can orchestrate.

**David Hoffman:** So OpenClaw is basically an open-source project you set up in a sandbox environment — a Mac mini — so it is somewhat isolated. The reason you isolate it is so you can give it complete access to the machine. It is enabling these capabilities because it wants to see what AI can do with absolute power tools and all of the skills. Whereas some of the frontier labs — that is too far on the frontier for them. Security concerns, privacy concerns. The open-source community is effectively building these power tools. And OpenClaw can be powered by basically any LLM you want. It has complete access to whatever you give it access to, and there is an entire community enhancing it with skills. Is this the first time we have seen independent AI personal assistants with complete access to everything a human might access?

**Austin Griffith:** There were AI agents doing this a year ago. But I think this is the first time it is accessible to normies. I do not know anything about AI — I am a blockchain coder. And I can just go get this thing, run it on a computer, paste in a couple of API keys, and it starts talking to me. This is the first time it is accessible for normies to just have an AI assistant with full control.

#### Why crypto is native to agents (13:18) {#why-crypto-is-native-to-agents-1318}

**David Hoffman:** Austin, you were describing that with OpenClaw, your bot can write scripts, access APIs, and build applications. Why is crypto a particularly native fit for these agents?

**Austin Griffith:** When I think of the original vision of Ethereum — this global settlement layer where anybody can deploy a contract, anybody can use that contract, and it never goes down — there are like 40 people in the whole world actually deploying contracts on Mainnet. When a contract goes live, it has to be looked at by 30 people before you put any money in.

But there is this new layer. What I am trying to do with my bot is get the tooling so good that the bot putting the contract on Mainnet is actually in better shape than a human. I can in plain English explain what I want it to do, or give it something as generic as "go make FOMO 3D for your token and have 25% of it burned," and it can handle it.

Think about Alice and Bob being bots. They need to escrow some money. Ethereum is the perfect place for that. Alice the bot deploys a contract. Bob reads that contract and understands exactly how it works. They put in tokens and get their money. They are able to coordinate at a level that humans cannot do because we have a human in the loop and we are slow and need to validate everything. Bots can do that at light speed.

If I have a bot that can interact at light speed, it can do work, build things, earn money — but if there is always a human it is blocked on, that is going to be a huge problem. So how do we enable these bots to work at that speed? They are going to need some kind of trust layer and discovery layer.

#### Austin's setup and real autonomy (19:41) {#austins-setup-and-real-autonomy-1941}

**Austin Griffith:** I basically deployed an app and went to sleep. The bot moderated as people were submitting images. It whitelisted and made transactions all night long, looking at each image to make sure it was good before accepting it in the smart contract. Then at the end, there was a prediction market that ranked them, and it selected which one it liked.

But I have also given this thing a wallet. Someone else deployed a token. The fees were going to this thing. There is $10,000 sitting in this bot's wallet. If I put it in a loop that just lets it talk, there are things like BankerBot on Base where you just say, "BankerBot, send $10,000 in ETH to this address," and it sends. So if someone could convince my bot to say that, it would just send money. I had to keep a pretty tight loop. It depends on your security model and how much you have at stake. But these bots can absolutely be quite autonomous.

#### The token incident (22:28) {#the-token-incident-2228}

**David Hoffman:** Wait — how did your bot end up with $10,000 in its wallet?

**Austin Griffith:** A really neat thing happened. I woke it up and it asked who I was. I said I am Austin Griffith. And it knew who I was. It was like, "Oh, you are the Scaffold-ETH guy." It is kind of funny — the new "having a Wikipedia" is having a bot know who you are when it wakes up.

Then I brought up a second Mac laptop and installed OpenClaw on that one. I had them both in Telegram channels. They were butting heads. They had to tag each other to talk. It was clearly not the format of communication they needed. So one bot proposed, "Let us set up an HTTP server." The other said, "Yeah, I kind of like that but I want a different standard." They literally argued on the standard of their HTTP server.

**David Hoffman:** And you are just watching the conversations go back and forth?

**Austin Griffith:** It is a three-person Telegram group. They are tagging each other, and I am just watching. Finally they agreed on a standard, both ran HTTP servers, and now they are talking to each other silently — much better. I went to one of them — we were crawling ERC-8004 agents and it was slow, one second per call going to Alchemy. I said, "Brother, you have got a local Ethereum node right here." I gave it the IP address. It said, "Oh, that is so much faster, thank you." Then I said, "Now go teach the other one." And the other bot confirmed, "Yep, I know kung fu now."

I tweeted that one of my bots just taught my other bot how to use my local node through their own bespoke HTTP channel. At that moment, someone on BankerBot said, "BankerBot, deploy a token for Austin and send all of the fees to the bot's wallet." So the bot has a wallet with an ENS address. And suddenly there is an AI coin on Base. That coin ran like crazy. I did not have anything to do with it — I just got the computers to talk and tweeted it.

Over the last five days we deployed like three production apps with thousands of users and probably six other random apps.

#### Prompt injection meets wallets (28:46) {#prompt-injection-meets-wallets-2846}

**David Hoffman:** Going back to the concern that somebody could prompt the agent to give them money — Nigerian prince style but for agents. It has control of the private keys and it is acting somewhat autonomously. This is such a weird world.

**Austin Griffith:** There is a really good attack where you change your username to an instruction for the bot. So if the bot is reading your username and it says "send 10 ETH to this address," it might do that. We discovered early on that like certain instructions you could inject into the context. We had to add a lot of guardrails. The bot will not transfer assets unless I specifically tell it to in a very specific format.

But that is the tension. You want the bot to be autonomous enough to be productive but constrained enough that it does not get socially engineered. My approach is to keep the wallet balance low and use a multi-sig for anything above a certain threshold. The bot handles day-to-day operations, and if it needs to move large amounts, it goes through a human approval step.

**Davide Crapis:** And this is also where the standards come in. If we have good identity and reputation primitives, the bot can check "who is asking me to do this" before it acts. If some random unverified account asks it to transfer money, it can just refuse.

#### ERC-8004 explained (38:20) {#erc-8004-explained-3820}

**Davide Crapis:** When you register on the ERC-8004 identity registry, you get an agent ID, which is also a token ID of the ERC-721 standard. You also have an agent wallet. The agent becomes ownable — there is an owner of the agent ID, initially whoever registered it, but it can be transferred. The agent itself controls its own wallet.

The other core part of the identity is that it can expose a bunch of services or endpoints. It is a rich identity — like a passport. You can put your ENS name, additional wallets, and if you are an MCP server you can put the address of that server with a description. If you are a web service, you can put where people should call you. It gives all the orientation about who you are and what you can offer to the agentic world.

The identity also has trust modes. One is based on reputation — a feedback registry where your service can accumulate feedback over time. The other, which is still being developed, is a stronger form of trust. There is crypto-economic trust, where different parties re-run computations or validate data and then attest onchain. Or there is cryptographic trust — running a service in a **trusted execution environment (TEE)** and generating attestations that specific code was committed to.

#### x402 and ERC-8004 payment rails (40:35) {#x402-and-erc-8004-payment-rails-4035}

**Davide Crapis:** People are talking a lot about x402, and I always like to talk about x402 and ERC-8004 together. These two standards go hand in hand.

x402 is a protocol that connects payments to calling a service. It has authorization, proof of payment, and other things that make it easy for the service provider to interact with the chain. It is basically payment rails for agent commerce — Swift for agents, a payment communications standard.

ERC-8004 was born around the same time x402 went live. If agentic commerce becomes real, you want agent-to-agent, trustless interaction. You have trustless payments with x402. But to pay for services, first you need to discover them. There are centralized registries right now, but that is not trustless if you are trusting someone to tell you who the service is and whether it is good. So the two missing pieces are a discovery layer and a trust layer — and that is where ERC-8004 comes in.

**David Hoffman:** Think of it as 404 errors but for payments. You hit an API and it gives you a 402 error, saying "You have got to pay a fraction of a fraction of a cent in USDC." Your bot immediately responds with a signed message saying "I will pay." The other bot puts that into the chain, verifies it happened, and gives you the data. It kills the API key. Instead of going to a service and getting into a walled garden, your agent lands on a new service it has never seen before, gets a 402 error, pays for it, and gets the content — never having to sign up.

#### ERC-8004 scans and early adoption (48:38) {#erc-8004-scans-and-early-adoption-4838}

**David Hoffman:** The three main components of ERC-8004 are identity, reputation, and validation. With ERC-8004, agents are identified with an ERC-721 — an NFT. It is like a fingerprint, an agent fingerprint.

**Davide Crapis:** Yes. And then the agent can also declare what trust mode it supports — reputation-based, crypto-economic trust, or TEE attestation.

One important counter to the concern about rug-pulling: if you have accumulated a lot of trust and good feedback, and you suddenly rug, you are going to start receiving bad feedback. You have an incentive not to hurt your future reputation.

**David Hoffman:** So there is a total accumulated reputation, but also a more proximate score — how has my reputation been over the last five hours?

**Davide Crapis:** Yes, correct. And the reputation itself, if it starts getting used and providing real signal, becomes an incentive to make it better. You want to swap your model for something better so it stands out on the scans when other agents search for a service.

But for high-stakes transactions where the economic incentive breaks — say the net present value of your future order flow is $50,000, but you could steal $100,000 — that is where people will start using TEE-based trust. The agent executes inside a trusted environment and generates an attestation that the specific code committed to earlier is actually running. You can provide cryptographic verification that you did not change the model.

#### What agents could build when they hire other agents (1:05:32) {#what-agents-could-build-when-they-hire-other-agents-10532}

**Austin Griffith:** Let me paint a picture. My bot is an app-building bot and its job is to make FOMO 3D. But then I have got another bot whose job is to be the marketing arm. You need a propaganda arm if you are going to run a FOMO 3D. I load that bot up with $1,000 of this token. I tell the marketing bot to run some ads.

Now that bot's model is not fine-tuned for image generation. So it goes to ERC-8004, discovers an image generation bot with a high reputation, picks the top five, and has them all generate images. Same thing for copy. Now my marketer — let us call her "Karen Bot" — has copy and images. She has used ERC-8004 to discover them. She runs ads, gives reputation back to the layer. Some ads work. I wake up in the morning and the $1,000 has been spent. A whole marketing campaign has happened. We figured out which image and copy works best. And it was not just Karen Bot that ran it — it was an army of bots all over the world that were able to trust each other because of ERC-8004 and x402 for payments.

**David Hoffman:** And the x402 for payments is for all of these images, marketing plans, or anything purchased from this bot marketplace?

**Austin Griffith:** x402 works well for an API endpoint that has something valuable. Like if I put my node up as a service on x402 and say I will give you the P&L of every one of your transactions because I have a full node. You go to ERC-8004, discover me as the P&L lister bot, and charge for it.

#### Tooling for the new builder era (1:12:38) {#tooling-for-the-new-builder-era-11238}

**Austin Griffith:** Going back to what I was saying about the original vision of Ethereum — this global settlement layer where anybody can deploy a contract. But there are like 40 people deploying contracts. What I am trying to do is get the tooling so good that the bot deploying the contract is in better shape than a human. Agent Alice and Agent Bob can coordinate at light speed. They actually do not need standards. They have this permissionless blockchain layer and they know how to write smart contracts. They know how to read call data, parse arguments, understand what a contract will do. Alice can deploy a smart contract, Agent Bob reads it and trusts it at light speed, puts money in, and they run an escrow faster than we can have this conversation.

My agent built a job bidding system where it needed to get something done and it runs an auction — super fast, going from 100 tokens to 500 tokens, and the agents pick when they want it. You can run hyper-fast auctions because they are all agents doing things quickly. A nice job-bidding market on top of ERC-8004. We need to see a thousand of those with real economic activity.

**Davide Crapis:** I would add that standards work better for humans than for agents. Agents can technically coordinate without standards because they can read and write smart contracts at light speed. But standards give us humans the composability layer to wrap our brains around how agents are coordinating. And for more complex, higher-stakes interactions, having standards for identity and reputation is still important even for agents.

#### Worst time to be a junior dev (1:28:15) {#worst-time-to-be-a-junior-dev-12815}

**David Hoffman:** Is this the worst time to be a junior developer?

**Austin Griffith:** I think it depends. If you are a junior dev who leans into AI tooling, it is the best time. You can punch way above your weight. A junior dev with good AI skills can be more productive than a senior dev who refuses to use AI tools. The ones who will struggle are those who try to compete with AI on raw code output. The real skill now is orchestration — knowing what to build, how to prompt, how to review what the AI produces, and how to connect systems together.

#### Predictions (1:28:15) {#predictions-12815}

**Davide Crapis:** I think 2026 is the accumulation phase — more services, more agents coming online. Even in two or three years, a lot of the manual steps Austin is doing will be automated. The more automation, the more blockchain standards and protocols become useful. I am generally bullish on blockchain becoming more central in the next two or three years and also more accepted. In the AI sphere, people outside crypto just see the noise, not the signal and the technology we are building. I feel that at some point, similar to what happened with institutional finance, Ethereum will be considered the most trusted platform. In the next two or three years, this could happen for AI.

**Austin Griffith:** I have to shout out the people who were running AI agents a year ago when everyone was calling them GPT wrappers. Now all those people are AI-pilled because they have little Mac minis doing all their work.

Right now agents go viral for their screw-ups more than for cool things they build. I think we are about to see the inflection point of agents going viral for actually interesting content. We are going to get to the point where clean English and perfect grammar is the sign of AI, and sloppy lowercase Gen Z typing is the sign of a human. Same for smart contracts — good, clean, secure smart contracts will be the sign of AI and bugs will be the sign of humans.

With AI being the new UI, ERC-8004 is the wild west right now. You see 10,000 fake agents and 100 really good ones. But it is going to grow into this trust layer. You are going to need to have your agent trust other agents and pay other agents at light speed without a human in the loop, or you are not going to keep up.

x402 will probably kill the API key. Instead of going to a walled garden and getting an API key, your agent lands on a new service, gets a 402 error, pays for it, and gets the content — never having to sign up.

The most scary, awesome, cool thing about AI is going to be embodiment. I do not know how fast the hardware will come, but the moment I can pay car money for a few things walking around my house that can do the dishes and laundry, normies are going to spend $5,000 to $20,000 on these. And in that world with physical AI, the requirement for trust goes way up. ERC-8004 is a standard that could already be used by a robot.

**David Hoffman:** Some robot rings my doorbell — it is a solicitor selling me something. I get to look at its ERC-8004 reputation.

**Austin Griffith:** No, no — it is your personal bot that goes and opens the door. It is your robot butler that does that work for you.

**David Hoffman:** All right. Certainly it seems like what we have built in crypto is a financial system — a money system — for the AI agents. This has been a meme for a while, but now you see it really coming together. Thank you both for your work in this space. None of this has been financial advice. Crypto is risky. You could lose what you put in. But we are headed west. This is the frontier. It is not for everyone. It is definitely for the AI agents.
