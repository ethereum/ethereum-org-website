---
title: "AI agents and Ethereum with Vito Rivabella: identity, reputation, and the agentic economy"
description: "Vito Rivabella, AI coordinator at the Ethereum Foundation, discusses ERC-8004, agent identity registries, reputation systems, and the infrastructure needed for autonomous AI agents to transact onchain."
lang: en
youtubeId: "N8yAixLP-8E"
uploadDate: 2025-05-14
duration: "0:49:40"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "identity"
  - "use-cases"
format: interview
author: 21Shares
breadcrumb: "AI Agents: Vito Rivabella"
---

**Vito Rivabella**, AI coordinator at the Ethereum Foundation, joins **Darius** and **Max Mikkelsen** on the 21Shares Off the Block podcast to discuss AI agent identity, reputation infrastructure, ERC-8004, and why Ethereum is well positioned as the settlement layer for the emerging agentic economy.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=N8yAixLP-8E) published by 21Shares. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

**Darius:** Welcome to a new episode of 21Shares' Off the Block podcast. Today I am very excited to talk about a very timely and hot topic, namely the agentic economy, and you could maybe spot where we are going to be — which ecosystem we are going to be on today — Ethereum. We have a very special guest here on the podcast today, Vito Rivabella, who is AI coordinator at the Ethereum Foundation. Vito, great to have you here.

**Vito Rivabella:** Thank you for having me, it is a pleasure.

**Darius:** And as always, my lovely co-host Max Mikkelsen as well.

**Max:** Thank you, Darius.

#### Background and journey into crypto (0:30) {#background-and-journey-into-crypto-030}

**Darius:** Vito, how did you first get involved in crypto?

**Vito Rivabella:** That is definitely not a short answer. My background is completely different. I do not come from a tech background. Before crypto — it has been almost six years — I was in the movie industry, doing 3D animation. Then one of my best friends, an old-school DJ, got into crypto around 2016 or 2017. He told me I should look into smart contracts, look into Ethereum. He was actually a big fan of Polkadot at that time. My family is all in banking — my dad is a bank director, my mom is in banking systems — so I went to them and asked what they thought about crypto. You can imagine the answer.

It took me a little while before getting into it, but then COVID hit in early 2020 and I had a bunch of time. I was getting bored of the movie industry, so I decided to look into smart contracts. I wrote my first smart contract and got hooked right away. In the meantime, I started following Sarah Drasner, head of web technologies at Google, and that got me into tech Twitter. I started translating Solidity documentation and code into human-readable content, which got some traction. Then I started my journey — Alchemy, then CipherSec for security, and now the Ethereum Foundation working on AI, security, privacy, and more.

#### From security to AI at the Ethereum Foundation (4:00) {#from-security-to-ai-at-the-ethereum-foundation-400}

**Darius:** You already answered our next question about how you started working at the intersection of AI and blockchain.

**Vito Rivabella:** It was more in security initially. AI is very helpful when it comes to audits, which are very time-consuming and expensive. About two years ago we started working on how we can make smart contracts more secure and help auditors speed up their processes. That was probably the first time we started dealing with the intersection between blockchain and AI. Now with the Ethereum Foundation, we have moved more into the primitives — agentic economy, agentic relationships and discussions.

#### When AI became more than just a tool (5:00) {#when-ai-became-more-than-just-a-tool-500}

**Darius:** When was the moment you realized AI is not just a tool, but is going to become an economic participant?

**Vito Rivabella:** I would still say AI is a tool, even if it becomes an economic participant. It depends on your definition of "tool," but it is becoming an autonomous tool, that is for sure. Two or three years ago you could already see these emergent behaviors — how people started using AI to code, how it was speeding up developer and auditor processes. That was the first realization. The true realization, as for probably everyone else, has been in the last year or so. We have seen a total step-up in AI capabilities, autonomous decision-making, and relationships between agents. That is the moment where we thought, "We might be onto something here."

**Darius:** If I as a human have AI agents working for me, it is a tool. But if the AI agent is autonomous and just transacting for its own sake, then it is an autonomous participant. Do we really have two categories of AI agents — ones working for humans and ones running independently?

**Vito Rivabella:** I have not seen many examples of agents that are autonomously acting for their own goals. Their goals are usually given by humans. The AI agent is trying to achieve the human's goal as a proxy. With a few months or years — it really depends on how fast these labs work — we will see agents that are fully autonomous. But as of today, it is a proxy, a human proxy.

#### Misconceptions about AI in crypto (6:30) {#misconceptions-about-ai-in-crypto-630}

**Darius:** What is a misconception a lot of people have about AI in crypto?

**Vito Rivabella:** I am going to go against my own interests, but it is important to understand: it is not inevitable. A lot of people think that AI will use stablecoins and can only pay with stablecoins. AI will use x402 and can only use x402. None of these things are true. Everyone is working to get their piece of the agent economy, which is going to be huge. Brian Armstrong of Coinbase recently said agents will transact far more than humans in months, not years. That is going to generate an enormous amount of fees. Literally every financial institution, every platform is working to get their piece.

Blockchain has the tools — tools that today work and work much better than many tools from traditional financial institutions, and are much easier to implement. But this is not going to be the same in six months. In six months you will have agentic cards and plenty of services for agents. So it is not inevitable. We need to work hard to achieve it. We need to teach the values and make financial institutions understand why trustless agents are important, why an open transparent registry is much easier to maintain than a closed-source one.

#### Biggest bottlenecks for AI agents onchain (9:00) {#biggest-bottlenecks-for-ai-agents-onchain-900}

**Max:** What do you think are the biggest bottlenecks right now?

**Vito Rivabella:** I would start with the primitives level. An agent needs services, and to date there is a very limited amount of services ready for agents. Let me provide an example. Let us say I have an agent and I want this agent to buy me a flight from A to B. The agent needs to go browse the internet, find a flight aggregator, compare prices, find the cheapest one, make the payment, and handle whatever comes after that. Now, none of those services are ready for agents today. Airlines do not have APIs or CLIs available to agents. Payment services are not ready to accept payments from an agent. And even if they were, you need to handle edge cases — what if there is a delay? What if I need to change my flight? All of these are friction points.

So I would say the biggest bottleneck is the lack of services and infrastructure ready for agents. The second biggest would be security. We are still quite far from having agents that are secure enough to be trusted with payment systems and wallets.

#### How to measure progress in the agent economy (12:00) {#how-to-measure-progress-in-the-agent-economy-1200}

**Max:** How do we actually define whether we are making progress? What are the KPIs?

**Vito Rivabella:** I would say two things. The first is volume of agent-to-agent transactions — how many transactions are agents making among themselves without human intervention. This is probably the best metric because it tells you that agents are not just doing things for humans but are actually creating their own economy. The second is the number of services that are available for agents. Today that number is very limited. When we see thousands of services exposing APIs and CLIs for agents, that is when we will know we are making progress.

There is also the quality of these interactions. Are agents just making simple API calls, or are they negotiating, discovering new services, and making autonomous decisions? When we start seeing more complex multi-step interactions, that is progress.

#### Most promising AI agent use cases today (15:00) {#most-promising-ai-agent-use-cases-today-1500}

**Darius:** What do you think is the most interesting use case you have seen for autonomous agents?

**Vito Rivabella:** There is a lot of hype out there that I am trying to filter. You have seen people spending hundreds of thousands of dollars on Mac minis saying they are going to have their OpenClaw create a multi-billion dollar company, and I have not seen a single one succeed. I think it is a great experiment, but we are also a little early, and there is no infrastructure for it.

Generally speaking, the most promising use cases I have seen for onchain things are financial — yield optimization, portfolio management. Big shout out to the team at Sci-Fi, who have an amazing system there. Trading is still something I would not suggest doing through agents yet. For non-onchain things, I think we are kind of early despite the hype. It is good for managing appointments, getting the top five news and ideas every morning, research, project validation. But the biggest blocker is security. If you think about why we cannot go fully agentic, it is because we are still scared that as soon as we give keys to our wallets, the agent is going to hallucinate and spend all of our money.

#### Do we need a new internet for AI agents (17:00) {#do-we-need-a-new-internet-for-ai-agents-1700}

**Max:** The internet was largely designed for humans. Do we need to build out a new internet designed for agents?

**Vito Rivabella:** For sure we need to modify the way we look at the internet. We are not starting from scratch. We have 30 or 40 years of learning that we are going to put into action. The main thing is that interfaces are not useful for agents. They want CLIs, they want APIs. A lot of tools out there do not have any API or CLI, and they will have to add them.

The basic layer — just interacting with the internet — is relatively easy to tackle. It is just a matter of making it accessible for agents that do not need UIs. The difficulty is when it comes to highly sensitive tools — payments, opening a bank account. An agent cannot go through KYC and anti-money laundering verification. And even think about taxes for your agent. I come from Italy, the country of bureaucracy. I cannot even imagine doing taxes for your agent.

Browsing the internet, ordering food on Deliveroo — that is going to be just a matter of exposing APIs and making sure they are secure. The difficulty is payments and bureaucracy. That is going to be a lot of work.

#### What is the agentic economy (23:00) {#what-is-the-agentic-economy-2300}

**Max:** Maybe you could give us your definition of the agentic economy.

**Vito Rivabella:** I would define it as an economy where AI agents are able to discover services, negotiate terms, make payments, and deliver value autonomously — with or without human supervision. It is an economy where the participants are not only humans but also machines acting as economic agents with their own wallets, their own identities, and their own reputations. The key difference from what we have today is that these agents are not just executing pre-programmed instructions. They are making decisions based on market conditions, reputation data, and their own objectives.

I would use the word "dynamic" to describe it. It is open to new business models, new regulations, new policies, new primitives. There is a lot that needs to be discovered. It is a great place to be, and if you look outside our echo chamber, almost no one is talking about it yet.

#### ERC-8004 explained (25:30) {#erc-8004-explained-2530}

**Max:** So how does ERC-8004 fit into this?

**Vito Rivabella:** So if you look at the current landscape, there are hundreds of thousands of agents out there. How do we identify all of them? How do we find a directory where we can register all of them? How do we give an identity that is portable?

The first thing that ERC-8004 solves is the identity registry. It creates an open identity registry that is available on over 21 chains — maybe 23 now, because we applied to new chains last week. It contains the identity plus registration files — endpoints, capabilities, skills, domains — of any agent and agentic service.

The second component is reputation. How do I trust this agent without having to ask a friend? That does not work. So you do it through signals. The way I usually explain it is like Yelp scores. You go on Yelp and look at the scores for a business. Same thing but more comprehensive — similar to how Google ranks pages on the search engine results page. It considers latency, uptime, quality, history, interactions with other agents and services. All of these signals are aggregated in an open registry that can be consulted and used to rank services.

The third component, usually the most complex to understand, is the validation registry. If you use ChatGPT, you can only trust the UI that you are actually talking to that model. You do not really have any way to verify it. This is not a problem if you are just looking for the price of oranges, but it is a much bigger issue if you want to perform large financial transactions or deal with sensitive health data. The validation registry gives you a way to validate the setup of the agent, replicate the same setup, and — if you are a validation network — vouch for the agent's operations.

Altogether, ERC-8004 creates these primitives: identity (I know who this agent is and where it comes from), reputation (I can trust this agent in a trustless setup without having to ask anyone), and validation (after the agent has operated, I can verify their operations to make sure they are trustworthy). ERC-8004 is purposefully basic. There is a lot being built on top of it — for example, we recently released ERC-8183 for escrow, payment reversal, and other payment primitives.

#### Why Ethereum has an edge for AI agents (30:30) {#why-ethereum-has-an-edge-for-ai-agents-3030}

**Max:** Could not OpenAI or Google build a centralized version of this? What is Ethereum's edge?

**Vito Rivabella:** It is really the trustlessness layer. They could absolutely build it. The problem is always the same. If you have your identity on a Google-owned identity registry and you get banned for whatever reason — because there was an exploit of the reputation registry and your reputation falls under a certain threshold — what do you do? Create another account? Start over?

My partner is an amazing influencer. In 2022, Facebook had a big exploit of their ads platform, which caused a number of influencers to be banned. She tried to contact support — there was no support. What do you do?

Ethereum is open, not controlled by anyone, and very fair. The reputation system wants to be fair and is not controlled by any single party. There is no situation where you get "banned from Ethereum." If I am Visa or MasterCard, I do not want a third-party service to have control over which users can use my systems. I want to be able to build my own systems on top of something open, where I decide how to regulate interactions. Ethereum gives you that layer, together with thousands of builders and innovators building on top of it, giving you the ability to choose from a library of ERC standards and SDKs.

But blockchain is a tool. Some AI systems definitely need blockchain, and some do not. Some blockchain use cases benefit from AI, and some do not. I do not agree with those who say blockchain should be everywhere, and I do not agree with those who say blockchain is just limited to meme coins.

#### Can agent reputation be gamed (35:00) {#can-agent-reputation-be-gamed-3500}

**Max:** How do you prevent gaming of the reputation system?

**Vito Rivabella:** That is a great question and one we think about a lot. There are multiple layers to this. First, the reputation system is designed to be sybil-resistant. You cannot just create hundreds of agents to give yourself positive reviews because each agent needs an identity that has a cost associated with it. Second, the signals we aggregate are not just simple star ratings. They include latency, uptime, quality of responses, historical interactions — things that are very hard to fake at scale over time.

Third, and this is where it gets more sophisticated, we have the validation layer. If an agent claims to be running a specific model with specific parameters, validators can actually verify that. So even if you game the reputation with fake reviews, you cannot fake the validation attestations.

That said, no system is perfect. We expect there will be gaming attempts, and the system will need to evolve. That is why ERC-8004 is designed to be extensible — so new anti-gaming mechanisms can be added as new attack vectors are discovered.

#### The agent economy flywheel (40:00) {#the-agent-economy-flywheel-4000}

**Max:** There have been a lot of notable developments. ERC-8004 went live on Mainnet this year. ERC-8183 was recently proposed. Stripe added support for x402. Where do you see this heading?

**Vito Rivabella:** The flywheel is starting. You have identity, which enables discovery, which enables payments, which enables reputation, which enables more trust, which enables more complex interactions. Each piece reinforces the others. What is exciting is that this is not theoretical anymore — these primitives are live onchain and being used by real agents.

#### Will AI agents dominate in 10 years (41:30) {#will-ai-agents-dominate-in-10-years-4130}

**Max:** If you had to bet — in 10 years, are the biggest participants on Ethereum human or non-human?

**Vito Rivabella:** Ten years is a long time. Once we have sorted out agents, personal assistants, procurement, and security — I want to stress security a lot, we are going to publish a report soon on how insecure agents and LLMs are right now — if we sort all of that out, create the primitives we need, and explain their value, then yes. Elon Musk recently said 99.9% of the intelligence in the world in probably three to five years is mostly going to be artificial, silicon-based intelligence. He likes to make very generous predictions, but in 10 years it is very probable.

Ethereum is mostly going to be for agents. There will still be plenty of humans using it, especially in developing countries where the day-to-day utility of blockchain is very much felt versus countries with working banking systems. But 10 years from now, probably yes.

#### Who is responsible when AI agents fail (44:30) {#who-is-responsible-when-ai-agents-fail-4430}

**Max:** If agents are really autonomous and not asking for permission step by step, at what point does accountability become a problem? Who is responsible when an agent makes a bad decision?

**Vito Rivabella:** My brother is a lawyer for the European Union, so we had an amazing discussion about this. The law in a certain way is already clear, and we probably do not need policies for everything. We can interpret existing laws and apply them to the agentic economy.

If you are an agent created by a human and you do something wrong, the responsible party is the human who created you. Full stop. There is no interpretation there.

The problem — and the law does not have an answer to it yet — is if you are an agent created by another agent, created by another agent, created by another agent. Who is at fault? Is it the original creator of the first agent? They would probably be brought to court, but you could argue they are not really the responsible party.

We need policies and laws that regulate that. Can you put an agent into prison? No. So we need safeguards — whether insurances or other mechanisms — to compensate affected parties. The number of actions agents can take is still kind of limited, but we are starting to see agents that hack systems, agents that control everything. It might not be that far away that we need an answer.

Unfortunately, we are very slow when it comes to laws and policies. I do not see the European Union deliberating anytime soon on agent-first laws.

#### Final thoughts and outlook (49:00) {#final-thoughts-and-outlook-4900}

**Max:** Thanks from our side for joining, Vito. It has been quite eye-opening, and it is great to see all the developments stemming from the Ethereum ecosystem. While we may not be there yet, what is clear is that AI will at one point evolve from just being a helpful tool to becoming a participant in the economy, especially the digital economy. There are still infrastructure and trust challenges, but as Vito laid out, there are a lot of different standards and primitives being worked on behind the scenes.

**Vito Rivabella:** Thank you, Max. Thank you, Darius. That was awesome.
