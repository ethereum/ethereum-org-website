---
title: Restaking
metaTitle: What is restaking? | Benefits and use of restaking
description: Use staked ETH to secure other decentralized services and earn extra rewards.
lang: en
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: A visual representation of restaking on Ethereum.
sidebarDepth: 2
summaryPoint1: Use staked ETH to secure other decentralized services and earn extra rewards.
buttons:
  - content: What is restaking?
    toId: what-is-restaking
  - content: How does it work?
    toId: how-does-restaking-work
    isSecondary: false
---

The Ethereum network secures billions of dollars of value 24/7, 365. How?

People all over the world lock away (or “stake”) [ether (ETH)](/eth/) in smart contracts to run the software that processes Ethereum transactions and secures the Ethereum network. In return, they get rewarded with more ETH.

Restaking is a technology built for [stakers](/staking/) to extend this security to other services, applications, or networks. In return, they earn additional restaking rewards. However, they also put their staked ETH at more risk.

**Restaking explained in 7 minutes**

<YouTube id="5r0SooSQFJg" />

## What is restaking? {#what-is-restaking}

Restaking is when stakers use their already-staked ETH to secure other decentralized services. In return, restakers can get additional rewards from those other services on top of their regular ETH staking rewards. 

The decentralized services secured by restaking are known as "Actively Validated Services" (AVSs). 
In the same way that many ETH stakers run Ethereum validation software, many restakers run specialized AVS software.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Good to know</strong></p>
  <p className="mt-2">While "Actively Validated Services" (AVSs) is the most common, different restaking platforms may use other names for the decentralized services they help secure, like "Autonomously Validated Services," "Distributed Secure Services," or "Networks."</p>
</AlertDescription>
</AlertContent>
</Alert>

## Staking vs restaking {#staking-vs-restaking}

| Staking                        | Restaking                                         |
| ------------------------------ | ------------------------------------------------- |
| Earn ETH rewards               | Earn ETH Rewards + AVS rewards                    |
| Secures the Ethereum network   | Secures the Ethereum network + AVSs               |
| No minimum ETH                 | No minimum ETH                                    |
| Low risk level                 | Low-to-medium risk level                          |
| Withdraw time depends on queue | Withdraw time depends on queue + unbonding period |

## Why do we need restaking? {#why-do-we-need-restaking}

Picture two worlds; one with restaking and one without.

 <TabbedSection />

In this world with restaking, both the AVS and staker benefit from being able to find each other and trade security for extra rewards.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Added benefit of restaking</strong></p>
  <p className="mt-2">AVSs can pour all their resources into building and marketing their services, instead of getting distracted with decentralization and security.</p>
</AlertDescription>
</AlertContent>
</Alert>

## How does restaking work? {#how-does-restaking-work}

There are several entities involved in restaking — each one of them plays an important part.

| **Term**                | **Description**                                                                                                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restaking platforms** | A restaking platform is a service that connects AVSs, ETH stakers, and operators. They build decentralized applications for stakers to restake their ETH, and marketplaces where stakers, AVSs, and operators can find each other. |
| **Native restakers**    | People who stake their ETH by running their own Ethereum validators can connect their staked ETH to a restaking platform, including EigenLayer and others, to earn restaking rewards on top of ETH validator rewards.                                              
|
| **Liquid restakers**    | People who stake their ETH via a third-party liquid staking provider, like Lido or Rocket Pool, get Liquid Staking Tokens (LSTs) that represent their staked ETH. They can restake these LSTs to earn restaking rewards while keeping their original ETH staked.                    
|
| **Operators**           | Operators run the AVSs' restaking software, performing the validation tasks each AVS requires. Operators are usually professional service providers that guarantee things like uptime and performance. Like non-operator restakers, operators use staked ETH to secure AVSs, but operators also receive extra rewards in exchange for their work.                            
|
| **AVSs**                | These are the decentralized services — like price oracles, token bridges, and data systems — that receive security from restakers and offer token rewards in return.                                                              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Good to know</strong></p>
  <p className="mt-2">Native and liquid restakers often delegate their staked ETH to an operator, instead of running the software to secure AVSs themselves.</p>
  <p className="mt-2">This way they don't need to worry about complicated technical requirements from AVSs, though they receive a lower reward rate than operators.</p>
</AlertDescription>
</AlertContent>
</Alert>

## What are some examples of restaking? {#what-are-some-examples-of-restaking}

While a novel idea, a few projects have emerged to explore the possibilities of restaking.

<EigenLayer/>

<CardGrid className="grid grid-cols-[repeat(auto-fill,_minmax(min(100%,_280px),_1fr))] gap-8">
  <Card title="EigenPods" emoji=":money_with_wings:" >
    A set of smart contracts that let ETH validators connect their staked ETH to EigenLayer's restaking system.
  </Card>
  
  <Card title="Marketplace" emoji=":earth_africa:" >
    Making it easy for AVSs to find operators and stakers that meet their requirements, and vice versa.
  </Card>
  
  <Card title="Tooling" emoji=":hammer_and_wrench:" >
    Developer libraries, documentation and codebases to integrate with and build DeFi protocols on top of EigenLayer.
  </Card>
</CardGrid>

## Other examples {#other-examples}

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Misnomer alert</strong></p>
  <p className="mt-2">Some people confuse "restaking" with lending and borrowing LSTs in DeFi. Both put staked ETH to work, but restaking means securing AVSs, not just earning yield on LSTs.</p>
</AlertDescription>
</AlertContent>
</Alert>

## How much can I make from restaking? {#how-much-can-i-make-from-restaking}

While AVSs offer different rates, Liquid Restaking Tokens (LRTs) like eETH give you an idea of how much you can make. In the same way you get LSTs like stETH for staking your ETH, you can get LRTs like eETH for restaking stETH. These tokens earn ETH staking and restaking rewards.

**It’s important to acknowledge the risks with restaking. The potential rewards can be attractive, but they’re not risk free.**

## What are the risks of restaking? {#what-are-the-risks-of-restaking}

To truly appreciate the impact of Ethereum payments, it's worth comparing them to traditional fiat currencies:

| **Risks**                     | **Description**                                                                                                                                                | **Risk level** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| **Penalties (or “slashing”)** | Like ETH staking, if restakers/operators go offline, censor messages or try to corrupt the network, their stake can be slashed (burned) partially or entirely. | LOW            |
| **Centralization**            | If few operators dominate most of the restaking they could have a great influence on restakers, AVSs and even restaking platforms.                             | LOW            |
| **Chain reactions**           | If a restaker gets slashed while securing multiple AVSs, this could lower the security for the other AVSs, making them vulnerable.                             | LOW/MEDIUM     |
| **Immediate access to funds** | There is a wait time (or “unbonding period”) for withdrawing restaked ETH so you may not always have access immediately.                                       | LOW/MEDIUM     |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>The Ethereum co-founder is typing…</strong></p>
  <p className="mt-2">
    Vitalik, the co-founder of Ethereum, warned about the potential risks of restaking in a 2021 blog post called <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Don't Overload Consensus. </a>
  </p>
</AlertDescription>
</AlertContent>
</Alert>

## How to get started with restaking? {#how-to-get-started-with-restaking}

| 🫡 Beginners                                                    | 🤓 Advanced Users                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Stake ETH on platforms like Lido or Rocket Pool to get LSTs. | 1. Stake your ETH as a validator on Ethereum.                                         |
| 2. Use those LSTs to start restaking on EigenLayer.             | 2. Compare restaking services like EigenLayer, Symbiotic and others.                  |
|                                                                 | 3. Follow the instructions to connect your validator to the restaking smart contract. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>Ethereum Staking :</strong> How does it work?</p>
  <ButtonLink href="/staking/">
    Learn More
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## Advanced {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Further reading {#further-reading}

1. [ethereum.org - ETH staking guide](https://ethereum.org/en/staking/)
2. [Ledger Academy - What Is Ethereum Restaking?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: Decentralized Ethereum Restaking Protocol Explained](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [Vitalik Buterin - Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - What is EigenLayer? Ethereum’s restaking protocol explained](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Permissionless Feature Addition to Ethereum with Sreeram Kannan](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer Explained: What is Restaking?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - Restaking Data Dash](https://www.theblock.co/data/decentralized-finance/restaking)
