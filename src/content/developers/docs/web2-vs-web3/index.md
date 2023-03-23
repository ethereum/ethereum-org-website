---
title: Web2 vs Web3
description:
lang: en
---

Web2 refers to the version of the internet that most of us are familiar with today. An internet where access to services requires your personal data to be custodied by companies whose profit motives strongly incentivises data monetisation. Web3, in the context of Ethereum, refers to decentralized apps that utilises the self-custodial guarantees made possible through the blockchain. These are apps that provide similar, or even brand new, services without requiring the user to ever give up ownership of their own data.

Looking for a more beginner-friendly resource? See our [introduction to web3](/web3/).

## Web3 benefits {#web3-benefits}

Many Web3 developers have chosen to build dapps on top of Ethereum due to the inherent benefits that decentralisation provides:

- Anyone who is on the network has permission to use the service – or in other words, permission isn't required.
- No one can block or deny access to the services.
- On-chain data is safely secured and can only be accessed with the user's consent.
- Payments are built in via the native token, ether (ETH).
- Ethereum is turing-complete, meaning you can program pretty much anything and still achieve network consensus.

## Practical comparisons {#practical-comparisons}

|                                      Web2                                       |                                                      Web3                                                      |
| :-----------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------: |
| Twitter can censor any account or tweet as data sits on corporate owned servers |    Web3 tweets would be uncensorable because data is stored on a blockchain where control is decentralised     |
|    Payment services may decide to censor payments for certain types of work     |      Web3 payment rails do not require personal data and is accessible to anyone with ETH in their wallet      |
|       Servers for gig-economy apps could go down and affect worker income       | Web3 servers can't go down – they use Ethereum, a decentralized network of 1000s of computers as their backend |

This doesn't mean that all services need to be turned into a dapp. These examples are illustrative of the main differences between web2 and web3 services.

## Web3 limitations {#web3-limitations}

Web3 has some limitations right now:

- Scalability – Transactions are slower on Web3 because decentralisation necessitates a consensus mechanism. Changes to state, like a payment, need to be processed by a node and propagated throughout the network.
- UX – Interacting with Web3 applications might require extra steps, software, and education. While the experience gap between Web2 and Web3 is rapidly shrinking, this can be a hurdle to adoption as there are some fundamental differences which requires getting used to.
- Accessibility – The lack of integration in modern web browsers makes Web3 less accessible to most users.
- Cost – Blockchain memory space as well as computing resources are relatively more expensive resulting in only critical components of a dapp being hosted on the chain.

## Centralization vs decentralization {#centralization-vs-decentralization}

The table below summarizes, in broad-strokes, the advantages and disadvantages of centralized and decentralized digital networks.

| Centralized Systems                                                                                                                                                                                                    | Decentralized Systems                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Low network diameter (all participants are connected to a central authority); information propagates quickly, as propagation is handled by a central authority with lots of computational resources.                   | The furthest participants on the network may potentially be many edges away from each other. Information broadcasted from one side of the network may take a long time to reach the furthest edges.                              |
| Usually higher performance (higher throughput, fewer total computational resources expended) and easier to implement as no consensus is required.                                                                      | Usually lower performance (lower throughput, more total computational resources expended) and more complex to implement due to complexities in achieving consensus.                                                              |
| In the event of conflicting data, resolution is straightforward: the ultimate source of truth is the central authority.                                                                                                | A protocol (often with its own consensus mechanism and rules) is needed for dispute resolution in the event of conflicting claims about the state of data which the network should be synchronized on.                           |
| Single point of failure: malicious actors may be able to take down the network by targeting the central authority.                                                                                                     | No single point of failure: network can still function as long as honest participants continue to form the majority of the network.                                                                                              |
| Coordination among network participants is much easier, and is handled by a central authority. Central authority can compel network participants to adopt upgrades, protocol updates, etc., with very little friction. | Coordination is often difficult, as no single agent has the final say in network-level decisions, protocol upgrades, etc. In the worst case, network is prone to fracturing when there are disagreements about protocol changes. |
| Central authority can censor data, potentially cutting off parts of the network from interacting with the rest of the network.                                                                                         | Censorship is much harder, as information has many ways to propagate across the network.                                                                                                                                         |
| Participation in the network is controlled by the central authority.                                                                                                                                                   | Anyone can participate in the network; there are no “gatekeepers.” Ideally, the cost of participation is very low.                                                                                                               |

Note that these are general patterns that may not hold true in every network. Furthermore, in reality the degree to which a network is centralized/decentralized lies on a spectrum; no network is entirely centralized or entirely decentralized. Critically, the extent of decentralisation should instead be informed by the aggregate of individual choices, each determining what suits them best without the coercive forces of scale.

## Further reading {#further-reading}

- [What is Web3?](/web3/) - _ethereum.org_
- [The Architecture of a Web 3.0 application](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [The Meaning of Decentralization](https://medium.com/@VitalikButerin/the-meaning-of-decentralization-a0c92b76a274) _Feb 6, 2017 - Vitalik Buterin_
- [Why Decentralization Matters](https://medium.com/s/story/why-decentralization-matters-5e3f79f7638e) _Feb 18, 2018 - Chris Dixon_
- [What Is Web 3.0 & Why It Matters](https://medium.com/fabric-ventures/what-is-web-3-0-why-it-matters-934eb07f3d2b) _Dec 31, 2019 - Max Mersch and Richard Muirhead_
- [Why We Need Web 3.0](https://medium.com/@gavofyork/why-we-need-web-3-0-5da4f2bf95ab) _Sep 12, 2018 - Gavin Wood_
