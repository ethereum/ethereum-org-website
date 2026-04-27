---
title: "AI agents reshaping crypto development, trading, and risk"
description: "Sam Green, founder of Cambrian Network and author of the AgentFi Landscape Report, and Austin Griffith of the Ethereum Foundation discuss AI-assisted development, x402 payments, ERC-8004 agent standards, and how AI agents are changing DeFi risk management."
lang: en
youtubeId: "E6FkjoM2qrE"
uploadDate: 2025-05-15
duration: "0:58:00"
educationLevel: intermediate
topic:
  - "ai"
  - "agents"
  - "defi"
  - "use-cases"
format: interview
author: The Block
breadcrumb: "AI Agents: Cambrian and EF"
---

**Sam Green**, founder of Cambrian Network and author of the AgentFi Landscape Report, and **Austin Griffith**, head of builder growth at the Ethereum Foundation, join **Tim Copeland** and **Kelvin Sparks** on The Block's Crypto Beat podcast to discuss how AI agents are reshaping crypto development, trading, and risk management — from vibe-coded smart contract games to institutional adoption of agentic finance.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=E6FkjoM2qrE) published by The Block. It has been lightly edited for readability.*

#### Introduction (2:01) {#introduction-201}

**Kelvin Sparks:** Hello and welcome to The Crypto Beat. My name is Kelvin Sparks. This is my co-host Tim Copeland, head of growth at The Block. Joining us today, we have Sam Green, founder of Cambrian Network and author of the AgentFi Landscape Report, and Austin Griffith, head of builder growth at the Ethereum Foundation, creator of Scaffold-ETH, BuidlGuidl, SpeedRunEthereum, and the ATG ClawBot AI agent. Welcome to the show. How are we all doing?

**Sam Green:** Thank you. Great to be here.

**Austin Griffith:** I just say "BuidlGuidl" purely to make it hard for you to pronounce.

#### AI tooling setup (3:32) {#ai-tooling-setup-332}

**Kelvin Sparks:** Before we get started, walk us through your AI development stack. Sam, what is your setup?

**Sam Green:** I am using Cursor for most of my development. I also use Codex for certain things. It is still early days — some of this is research, some is production.

**Austin Griffith:** On my side, I am definitely not an AI veteran. I am a sloppy Ethereum builder veteran. I have been doing developer tooling and education in the Ethereum space for the last eight or nine years. My AI stack is ETHSkills. I have ethskills.com, which is a skill library that takes the LLM and fast-forwards it to all the cool things that have happened in crypto in the last couple of years.

I am using a wild combination of Cursor, Claude Code, and OpenClaw. I am almost all Anthropic — a lot of Opus 4.6 for building, a lot of Sonnet 4.6 for managing. Then I have a management layer using MiniMax M2.7. It is surprisingly good. It messes up now and then, but it is so cheap that it is allowed to. It is the knockoff version of a good manager.

A lot of my daily driver work is having Claude Code and Cursor open on a specific directory. Honestly, I have not written a line of code for probably two years. I have a couple of Mac minis that I yell at through OpenClaw, and then Claude Code and Cursor on my daily driver. I am in three or four windows building three or four different things at once.

#### Vibe-coded game (6:48) {#vibe-coded-game-648}

**Austin Griffith:** If you go to extract.fi, there is even a whitepaper — all vibe-coded. It was built pre-Opus 4.5, so it took time. Max Extract is a smart contract game where it deploys a set of smart contracts on Arbitrum and the players compete by deploying their own smart contracts. There are 200 pirates, each player takes over a sector, and the pirates fly in and out trying to mine. Your job is deploying smart contracts that help the pirates coordinate.

At first it is mass chaos — anarchy — and you kind of let them be anarchists but in a coordinated way where everybody is financially incentivized. It teaches the kinds of things you build on Ethereum and how coordination mechanisms work for people who do not trust each other. You had to vibe-code all the smart contracts to play the game. If you tried to write the contracts by hand, you would lose immediately because people deploy two or three smart contracts right away. If you are not deploying instantly, you are losing points.

#### AI hacking debate (9:08) {#ai-hacking-debate-908}

**Kelvin Sparks:** I was curious — do you think AI has provided hackers an edge while we figure out where the attack surfaces are?

**Austin Griffith:** I personally think the attackers and the defenders have an equal edge. It is two sides of the same coin — the same capabilities. If something can be detected using an LLM, the same LLM should be able to detect it as you are writing it or red-teaming it. As soon as a model is available to attackers, it is available to defenders.

I personally think a lot of the "it is too dangerous to release" narrative is mainly a PR game. OpenAI did the same thing in 2018 with GPT-2. Can you imagine how bad GPT-2 was? In reality, defenders should have the same advantage as attackers.

**Kelvin Sparks:** But as a defender, you have to be right everywhere. As an attacker, you only need to be right in one place.

**Austin Griffith:** The difference is that when you deploy a smart contract, it is out there forever. If we look at the technology around five years ago when Balancer was deploying versus the technology we have now, there is some asymmetry. The Balancer hack was probably one of the first cases where AI actually found bugs in code that had been around for a couple of years. But after that period, I think there will be an equilibrium where AI-audited contracts are more secure than human-audited ones.

**Sam Green:** I agree. I think the difference is that once a smart contract is deployed, it is a surface available forever for someone to attack. New models can find new bugs in old code. But going forward, contracts written and audited with AI assistance should be significantly more secure.

#### x402 payments (15:42) {#x402-payments-1542}

**Tim Copeland:** Tell us about x402 and how it fits into the agent payments picture.

**Austin Griffith:** x402 is this standard where instead of getting a 404 error, you get a 402 error — "payment required." Your agent hits an API endpoint, gets a 402, automatically pays a fraction of a cent in USDC, and gets the data. No API key, no sign-up, no walled garden. The agent just discovers a service, pays, and receives.

I think x402 will kill the API key. Instead of going into a walled garden and registering for an API key, your agent lands on a new service it has never seen, gets a 402 error, pays for it, and gets the content.

**Sam Green:** We are really close to the True North team. They build a trading product, and what they are seeing now is agentic demand. In the past it was human users logging into the website. Now agents are wanting to interact with their product. As models improve and tools like OpenClaw gain traction, we expect several more waves of adoption.

#### Permissioned chains vs. Ethereum (19:38) {#permissioned-chains-vs-ethereum-1938}

**Tim Copeland:** Do you think institutional adoption of AI agents will happen on permissioned chains or public Ethereum?

**Austin Griffith:** I think institutions will start on permissioned chains because that is what they are comfortable with. But the real value is on public Ethereum. A permissioned chain is just a database with extra steps. The moment you need trustless coordination between parties that do not know each other — which is exactly what agent-to-agent commerce requires — you need a public blockchain.

**Sam Green:** Institutions are already experimenting. We have seen major banks testing onchain settlement for agent-managed portfolios. The trend is clear — they start permissioned, then gradually move to public chains as they get comfortable with the security and compliance tooling. Ethereum L2s are particularly attractive because they offer the security of Ethereum settlement with lower costs and higher throughput.

#### Agent standards and ERC-8004 (24:07) {#agent-standards-and-erc-8004-2407}

**Sam Green:** If we do not have anything like ERC-8004, we are looking at ad hoc methods to verify work was done, ad hoc methods to verify reputation. The composability would be horrible. ERC-8004 is similar to ERC-20s — it gives us a composability mechanism.

We are in the enthusiast phase right now. Everybody who has been tracking agentic developments knows something is coming. We know blockchains solve a lot of the issues. The question is when. We saw x402 come out last year. ERC-8004 also came out later in the year. OpenClaw got huge this year. New models are coming out about every four months. The models are doubling in performance. There are going to be several more waves of excitement and progress before the real product-market fit moment.

**Austin Griffith:** I totally agree. We are very early. We are putting some standards in place, but who knows if these will be the final standards. Standards work better for humans than for agents. When you think about the original vision of Ethereum — you and I coordinating by deploying a smart contract and escrowing funds — that is very hard for humans. You have to have your lawyer or auditor look at it. But Agent Alice and Agent Bob can coordinate at light speed. They do not need standards. They have a permissionless blockchain layer. They know how to write and read smart contracts, parse call data, understand arguments and effects.

Alice deploys a smart contract. Bob reads it and trusts it at light speed. They put in tokens and run an escrow faster than we can have this conversation. That is exciting but also scary. There is a whole trust layer — how do we trust these things? How do we make sure private keys do not leak? How do we give an agent a wallet? These are the million-dollar questions.

#### AgentFi trends (30:25) {#agentfi-trends-3025}

**Kelvin Sparks:** Sam, you wrote one of the most in-depth reports in the space. What were your biggest takeaways from the AgentFi research?

**Sam Green:** We wrote and maintain a report on what we call AgentFi — agentic finance — covering the convergence between AI, crypto, and finance. We segment the AgentFi landscape into trading agents and portfolio management agents, yield agents, betting and market agents, and analysis or research agents.

When we first wrote the report, most agentic projects were using rule-based decision-making — what you would call a bot. The group getting the most TVL were the yield agents, and they are still the ones with the most TVL. Yield agents by far use just optimization — finding where the yield is and rebalancing portfolios.

The trading agents are the ones adopting AI the most. They are analyzing financial reports, looking at sentiment, trends, technical analysis. A year ago, many used rule-based approaches. Now most are using AI. In terms of x402 adoption, it is more service providers — those providing data — that are adopting x402 to allow per-query payments that feed into these platforms.

#### DeFi risk layer (35:15) {#defi-risk-layer-3515}

**Tim Copeland:** What about risk management? How are agents changing the DeFi risk picture?

**Sam Green:** This is one of the most interesting areas. Traditionally, DeFi risk management has been reactive — protocols get hacked, they patch, they audit. With AI agents, you can have proactive risk monitoring. Agents can continuously monitor contract state, liquidity conditions, governance proposals, and oracle behavior. When something looks anomalous, the agent can take protective action before a loss occurs.

We are seeing dedicated risk agents that monitor positions across multiple protocols and automatically rebalance or exit when conditions deteriorate. These agents are not making speculative trades — they are performing defensive portfolio management. That is where the institutional demand is coming from.

**Austin Griffith:** The cool thing about risk agents is they never sleep. A human risk manager goes home at 5 PM. An agent is watching 24/7. And it can process information from hundreds of sources simultaneously. When DeFi protocols eventually have AI agents as their primary risk layer, the security of the entire ecosystem improves.

#### Letting agents trade (41:45) {#letting-agents-trade-4145}

**Kelvin Sparks:** Are we putting the cart before the horse? OKX had their numbers saying 95% of activity might not be real. Coinbase had $500 million in annualized volume for x402. How do we separate signal from noise?

**Sam Green:** The interesting trend is that when we first wrote the report, most projects were using rule-based decision-making. Now most are using AI, especially on the trading side. In terms of actual TVL and AUM, it is still mostly humans connecting a wallet and sending crypto to fund activities or pay for services. We are not seeing much x402 adoption within the projects getting TVL. That said, there is a trend — True North and others are seeing agentic demand from OpenClaw developers.

As models double in performance, as OpenClaw improves, and as new products gain traction, we can expect several more waves of adoption and excitement before the real takeoff moment.

**Austin Griffith:** The inflection point was in November. Large companies are still having humans code with their fingers because they are slow to adapt. We are going to have an explosion of software. We are going to need lots of people who can build software, but what that looks like is not a 60-person team anymore. It is the one builder who is figuring all this stuff out and making it scale. That used to require big teams. I do not think it is going to look like big teams anymore.

I still know companies that have humans writing code with their fingers, which is insane to me. But it will take time before bigger organizations figure it out.

**Sam Green:** I kind of see what you mean. We just submitted something for audits and got a quote back from a reputable firm, and I was surprised how cheap it was. On top of it, other firms are offering AI audit tools for free. Traditional scrum seems like it is kind of dying. Learning to use AI tools is like learning English 30 years ago — you kind of have to know this.

#### What is claw-dogging (57:00) {#what-is-claw-dogging-5700}

**Kelvin Sparks:** Austin, we never addressed it. What is claw-dogging?

**Austin Griffith:** Claw-dogging is giving an agent a private key and letting that agent deploy and use smart contracts, use real money, with some small guardrails around it — but certainly not the safety you would traditionally expect in our industry. Give your OpenClaw a private key, put $100 in it, tell it to deploy a FOMO 3D game. That level of riskiness and wild west is the claw-dog mentality. Hopefully we are pushing the space forward and proving to some of the more cautious folks that this is possible, it is happening, and you should be paying attention.

**Kelvin Sparks:** That is all the time we have for today. I want to thank Sam and Austin for joining us. As a reminder, our newsroom works tirelessly to get you accurate, informed crypto news. If you want to stay ahead, read The Block. Thanks, and I will see you next time.
