---
title: "Why build on Ethereum"
description: "Decentralization, censorship resistance, permissionless deployment, and composability are not separate selling points. They reinforce each other. A practical guide to why builders should choose Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "decentralization"
  - "censorship resistance"
  - "composability"
published: 2026-05-12
breadcrumb: Why build on Ethereum
lang: en
---

Builders choose infrastructure by the promises their app needs to keep.

Most software promises depend on an operator. A cloud provider keeps the server running. A platform keeps the account open. A payment processor keeps the merchant enabled. An API provider keeps the key valid. That is fine for many products. It is not enough when the product's value depends on neutral access, shared state, and commitments that users and other developers can verify for themselves.

Ethereum is built for the second case, where neutral access and verifiable commitments are the product. No one owns it. The chain runs across many countries, many operators, and multiple independent client implementations, and no single company, validator, or foundation can quietly rewrite the rules. For a builder, that means it is not just a place to host code. It is a place to make public commitments. You can ship without asking anyone, users can keep reaching what you deploy, other developers can build on it without your permission, and your app can continue to work even when any one party, including you, stops cooperating.

## Decentralization {#decentralization}

Decentralization is the foundation those properties stand on. Ethereum delivers it through a network of computers, called nodes, that each store a copy of the chain and check every transaction. Each node runs client software. A subset of nodes, called validators, take turns proposing and confirming new blocks through a process called consensus. To participate, validators put up ETH as collateral, called stake, that they lose if they break the rules. Around 13,700 to 14,000 nodes were tracked in Etherscan's node tracker in April 2026, distributed across the United States, Germany, China, the United Kingdom, Russia, Japan, and dozens of other countries.

Decentralization is also economic. About 32 to 36 million ETH, around 27 to 29% of supply, is staked as collateral that the protocol slashes when validators provably misbehave. An attacker would need to acquire and risk a meaningful fraction of that stake to corrupt the chain. At April 2026 ETH prices, that means tens of billions of dollars would be at risk.

The other dimension is the software itself. Every Ethereum node runs two pieces of software side by side. An execution client runs the EVM and tracks contract state. A consensus client handles proof-of-stake. It tracks which validators propose blocks, which blocks the network accepts, and when a block becomes final. Healthy decentralization needs multiple independent implementations of each, so a bug in one client does not automatically become a bug in Ethereum.

The execution layer has five major clients in production. Geth runs at roughly 50%, Nethermind around 25%, Besu around 9%, Reth around 8%, and Erigon around 7%. The consensus layer runs on Lighthouse, Prysm, Teku, Nimbus, Lodestar, and other clients. Ethereum is not a single-client chain on either layer.

Geth's near-50% share is the real fragility. A bug in a minority client is painful for its operators, but the rest of the network can continue. A severe bug in a majority client is more dangerous. That is why client diversity is a live operational priority.

That priority has been tested. Ethereum has never had a full chain halt since genesis on July 30, 2015. The closest it has come to a major incident was on May 11 to 12, 2023, when the consensus layer, called the Beacon Chain, failed to finalize for about 25 minutes and then later for about 64 minutes. The cause was a Prysm client bug. Finality requires more than two-thirds of validators to attest, and Prysm's share at the time was high enough that its issue briefly pulled the network below that threshold.

A finality stall is not the same as a chain halt. New blocks kept being produced, transactions kept being included, and most users and applications kept working. What stalled was Ethereum's strongest settlement guarantee. Under normal consensus assumptions, a block older than roughly 13 minutes cannot be reverted. Bridges, exchanges, and other systems that wait for finality before crediting deposits would have paused those flows. The chain itself recovered automatically once enough validators caught up, without manual intervention.

For builders, that history matters. If other people are going to hold assets in your contracts, route orders through your market, or build on your primitive, they need the foundation underneath it to keep running through bugs, client failures, and institutional pressure.

## Censorship resistance {#censorship-resistance}

Decentralization is the structure. Censorship resistance is one of the practical things it buys. Users should not need permission from a company, government, relay, validator, RPC provider, or app operator to send a valid transaction to your contracts.

That does not mean every transaction lands in the next block. It means no single party can keep a valid transaction off the chain forever. Each block is proposed by a different validator, who works with outside parties, called builders and relays, to assemble it. If one of them filters your transaction, the next slot has a different set, and eventually one of them includes it. Censorship has to persist across that whole rotating cast, which is much harder than one operator saying no. The post-Tornado Cash period showed what that looks like under pressure.

Tornado Cash is a privacy mixer contract that breaks the onchain link between deposit and withdrawal. After OFAC sanctioned it in August 2022, several major MEV-Boost relays refused to forward blocks containing transactions from sanctioned addresses. The share of blocks built through those OFAC-compliant relays peaked near 79% in November 2022. The other 21% came from relays and builders that did not filter, so Tornado Cash transactions still landed, just slower. The expected wait rose from about 12 seconds to about a minute.

That looked alarming, and it was. Then the share fell. New relays launched explicitly without filters, including Ultra Sound and Agnostic, and proposers were free to add them to their MEV-Boost setup. No one could force every proposer onto a filtering relay, so the share could not stay at its peak. By early 2023 it was below 50%, and through the rest of 2023 it ranged between 27% and 47%. OFAC removed Tornado Cash from the sanctions list in March 2025. The episode remains Ethereum's clearest censorship-resistance stress test.

Ethereum is also moving more of this guarantee into the protocol itself. A planned upgrade called FOCIL (EIP-7805) adds inclusion lists. Randomly selected validators publish transactions they see in the public mempool, and the next block is expected to satisfy those lists. If a block ignores them, the rest of the network can reject it. So no one can stop your users from using your app.

## Permissionless {#permissionless}

Censorship resistance is about whether users can keep reaching your app after you ship. Permissionlessness is about whether you can ship in the first place.

Deploying on Ethereum does not require a partnership, account, listing approval, app-store review, or commercial agreement. Anyone can deploy code, call a contract, run a node, index data, build a wallet, or publish an interface. The base layer does not know whether you are a startup, a bank, a solo developer, an agent, a DAO, or a user with no company at all.

That changes the builder model. On a platform, the platform owner can change terms, revoke keys, block regions, remove apps, or make access conditional on a business relationship. On Ethereum, the protocol evaluates transactions by the same public rules for any caller. A contract deployed today runs by those public rules for every address as long as the chain keeps running.

This does not remove every dependency. Most users do not reach your contracts directly. They go through a frontend, a wallet, and an RPC provider, and any of those layers can break or filter. Frontends can be taken down. RPC providers, the services that route most app and wallet requests to the chain, can refuse to forward transactions or block specific regions and addresses. Wallets can choose what they display.

The base execution environment stays open underneath. If your frontend goes down, a user can still call the contract directly, and another developer can build a new interface. If a wallet stops supporting your token, the contract still works. If one RPC provider filters, an app can route through another or run its own node to reach the network.

## Composability {#composability}

Permissionlessness gets your code onto the chain. Once it is there, no one can take it down, so other developers can build on top of your contracts, and you can build on theirs.

WETH is the cleanest example. It is a contract that wraps ETH so it can be used like a standard token in other contracts. It sits at one fixed Ethereum address, holds about 1.8 million WETH as of May 2026, has roughly 3.25 million holders, and acts as a common unit across DEXs, lending markets, vaults, and bridges. It is code that thousands of other contracts and apps can use directly.

That pattern repeats across the ecosystem. From genesis to early 2025, Ethereum saw tens of millions of contract deployments and roughly 2.5 million unique bytecodes by Zellic's count. Standards like ERC-20 for fungible tokens and ERC-721 for non-fungible tokens (NFTs) became coordination layers. A token your contract emits can be traded on a DEX, borrowed against in a money market, indexed by analytics tools, displayed in wallets, and bridged or wrapped by other systems without each team negotiating a custom agreement.

As of May 2026, around $46 billion sat in DeFi on Ethereum. That money is locked inside thousands of working protocols, including assets, markets, oracles, wallets, account systems, governance contracts, bridges, analytics, and developer tools. All of it is code you can call directly on day one, instead of building from scratch or waiting for partnerships.

## The agent economy {#the-agent-economy}

Permissionless access and censorship resistance, with decentralization underneath them, matter even more for the next wave of users entering Ethereum. AI agents are that wave, and they pay for services, hold capital, and settle with other agents through transactions and contract calls, all without a human in the loop. An agent has no card to charge, no platform account to suspend, and no human to call when a relay refuses to forward a transaction. That is why both stop being optional for that kind of software, and Ethereum's properties are a direct match for what an agent actually needs. Ethereum is where that economy is expected to play out, and that could grow the user base immensely.

Whether you ship the agent or ship the contracts the agent calls, the same problems show up. On a typical hosted stack, the agent's identity is rented from a platform account that can be revoked. Its payments depend on a human's card or API key. Its rules run on a server an operator controls. Its continuity depends on a host that can disappear. Every one of those dependencies is what Ethereum's base layer is designed to remove.

On Ethereum, none of that depends on an operator. The agent's keys are its own, and the rules it signs against cannot be unilaterally rewritten. Its transactions go through the same rotating cast of validators, builders, and relays that protects any other address from targeted blocking. State transitions happen in public, so the contracts on the other side of the call do not have to trust an operator to report what happened.

The rails are already in place. Smart contracts, stablecoins, and account abstraction give an autonomous actor a working address, a working balance, and programmable spending limits today. Standards for agent identity and machine-native payments are catching up. ERC-8004 defines onchain registries for agent identity, reputation, and validation. x402 uses the HTTP 402 status code to let clients, including agents, pay APIs and digital services in stablecoins without traditional accounts. Adoption is early but moving, and the integration surface is small. Accept x402 payments at your endpoints, register or check identity through ERC-8004, and treat agent addresses as first-class users in your contracts.

For any builder picking a chain to ship on, agents are the next user class forming, and the rails are already live. The contracts you ship today can serve them tomorrow without waiting for a future protocol.

## Conclusion {#conclusion}

Decentralization, censorship resistance, permissionless deployment, and composability are not separate selling points. They reinforce each other. Decentralization makes censorship resistance credible and lets users keep reaching what is shipped. Permissionless deployment lets builders ship. Composability turns those apps into shared infrastructure. Autonomous agents can transact through it and no one can stop them. What you ship is a public commitment. It keeps running without you.

## Further reading {#further-reading}

- [Ethereum Foundation Checkpoint #9 (April 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Etherscan Node Tracker](https://etherscan.io/nodetracker)
- [beaconcha.in validators](https://beaconcha.in/charts/validators)
- [Post-mortem: May 2023 mainnet finality](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block: OFAC-compliant blocks fall to 27%](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Hegotá Headliner Proposal: FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805: Fork-choice enforced Inclusion Lists (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004: Onchain Agent Identity](https://eips.ethereum.org/EIPS/eip-8004)
- [coinbase/x402 GitHub](https://github.com/coinbase/x402)
- [CoinDesk: x402 demand has not materialized](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH on Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic: All Ethereum contracts](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama: Ethereum chain](https://defillama.com/chain/ethereum)
- [OpenZeppelin: Technical Risk Assessment on Blockchain Networks (April 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)
