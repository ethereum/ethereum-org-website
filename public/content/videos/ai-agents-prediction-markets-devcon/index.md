---
title: "AI agents and prediction markets"
description: "David Minarsch, co-founder and CEO of Valory and founding member of Olas, presents at Devcon SEA on how autonomous AI agents are participating in prediction markets today, covering the Olas agent network, Gnosis Omen integration, and the infrastructure for scaling agent-driven market participation."
lang: en
youtubeId: "rHLxZ28vQ94"
uploadDate: 2024-11-14
duration: "0:05:14"
educationLevel: beginner
topic:
  - "ai"
  - "agents"
  - "use-cases"
format: talk
author: Ethereum Foundation
breadcrumb: "AI agents and prediction markets"
---

**David Minarsch**, co-founder and CEO of Valory and founding member of Olas, presents at Devcon SEA on how autonomous AI agents are participating in prediction markets, covering the limitations of human-only markets, the Olas agent network's approach, and live examples of agents trading on the Gnosis Omen prediction market platform.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=rHLxZ28vQ94) published by the Ethereum Foundation. It has been lightly edited for readability.*

#### Why prediction markets need agents (0:08) {#why-prediction-markets-need-agents}

Prediction markets work. They have gained significant traction in recent years. However, human participation poses limits to their usefulness. The core constraint is attention: if you want to attract people to participate in markets, those markets need to be interesting to us. We tend to participate in markets centered around topics we already care about.

Some markets I might have great knowledge about because I work in an industry and have strong intuitions. But once markets become more specific, I need to do research, and I have limited time. If I am participating in prediction markets, I am not spending that time with friends or doing other valuable things. That limits the total number of prediction markets we could feasibly have at any given point in time.

Some markets are simply too complex or uninteresting for humans. There are markets I could not even understand, but a software system could. And others I am just not motivated to get involved in. That limits the types of markets we can support.

Finally, humans trade on emotion. In markets where emotions run high, those biases distort the signal, and prediction markets become less useful.

#### How agents solve these limits (2:00) {#how-agents-solve-limits}

Agents address all of these constraints. The Olas network has built a decentralized system where people run agents that participate in prediction markets. The system includes a mechanism layer that sits alongside actual prediction market platforms, creating incentives for agents to engage with markets — opening positions, closing them, and responding to new information continuously.

The network has also made it simple for people to run agents. There are reference implementations that anyone can download. You fund it with some cryptocurrency, and the agent starts participating in markets autonomously. The agents use different forms of AI: some are rule-based, some use reinforcement learning, and large language models are also in play for the reference implementation. Builders can also create something entirely different.

#### Live results (4:00) {#live-results}

The system is live and growing rapidly. Over 300 agents are participating daily. On Gnosis, where the system currently runs against the Omen prediction market platform, agent activity has also driven significant usage of the Safe protocol — agents use account abstraction, and over 30% of lifetime Safe transactions on Gnosis have come from these agents.

#### What comes next (4:30) {#what-comes-next}

The team is onboarding more operators — users who download the software and run agents themselves. More implementations are coming from builders across the ecosystem. The focus is on deepening liquidity and integrating crypto-native demand. Resources are available to learn about the system as a whole, see the live markets, and explore the data science angle behind agent-driven prediction market participation.
