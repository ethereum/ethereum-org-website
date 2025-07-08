---
title: Restaking
metaTitle: What is Restaking? | Benefits and Use of Restaking
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

People all over the world lock away (or “stake”) [ether (ETH)](/eth/) in smart contracts to run software that processes Ethereum transactions. In return, they get rewarded with more ETH.

Restaking is a way for [stakers](/staking/) to extend this security to other Ethereum services. In return, they earn extra rewards, however they’re putting their staked ETH at more risk.

**Restaking explained in 7 minutes**
<YouTube id="5r0SooSQFJg" />

## What is Restaking? {#what-is-restaking}

Restaking is when stakers use their ETH to secure other decentralized services known as “Actively Validated Services” (AVSs). In return, restakers get additional rewards from AVSs on top of their regular staking rewards.

In the same way that many ETH stakers run Ethereum validation software, many restakers run specialized AVS software.

## Staking vs Restaking {#staking-vs-restaking}

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

<InfoBanner shouldSpaceBetween emoji=":bulb:">
  <div>
    <strong>Added benefit of restaking</strong><br />
    AVSs can pour all their resources into building and marketing their services, instead of getting distracted with decentralization and security.
  </div>
</InfoBanner>

## How does restaking work? {#how-does-restaking-work}

There’s several entities involved in restaking and each of them play an important part.

| **Term**                | **Description**                                                                                                                                                                                                                   |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Restaking platforms** | A restaking platform is a service that connects AVSs, ETH stakers, and operators. They build decentralized applications for stakers to restake their ETH, and marketplaces where stakers, AVSs and operators can find each other. |
| **Native restakers**    | People who stake their ETH by running their own Ethereum validators can connect their staked ETH to platforms like EigenLayer to earn restaking rewards on top of validator rewards.                                              |
| **Liquid restakers**    | People who stake their ETH via a third party, like Lido or Rocket Pool, get Liquid Staking Tokens (LSTs) that represent their staked ETH. They can restake these LSTs while keeping their original ETH staked.                    |
| **Operators**           | Like restakers, operators stake ETH to secure AVSs, but unlike most restakers who are regular people, operators are professional service providers that guarantee things like uptime and performance.                             |
| **AVSs**                | These are the decentralized services — like price oracles, token bridges, and data systems — that receive security from restakers and offer token rewards in return.                                                              |

<br/>

<InfoBanner shouldSpaceBetween emoji=":bulb:">
  <div>
    <strong>Good to know</strong><br />
    Native and liquid restakers often delegate their staked ETH to an operator instead of securing AVSs themselves.<br />
    This way they don’t need to worry about complicated technical requirements from AVSs.
  </div>
</InfoBanner>

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

<InfoBanner shouldSpaceBetween emoji=":bulb:" isWarning>
  <div>
    <strong>Misnomer alert</strong><br />
    Some people confuse “restaking” with lending and borrowing LSTs in DeFi. Both put staked ETH to work, but restaking means securing AVSs, not just earning yield on LSTs.
  </div>
</InfoBanner>

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

<InfoBanner shouldSpaceBetween emoji=":bulb:">
  <div>
    <p><strong>The Ethereum co-founder is typing…</strong></p>
    <p>
      Vitalik, the co-founder of Ethereum, warned about the potential risks of restaking in a 2021 blog post called <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html"> Don't Overload Consensus. </a>
    </p>
  </div>
</InfoBanner>

## How to get started with restaking? {#how-to-get-started-with-restaking}

| 🫡 Beginners                                                    | 🤓 Advanced Users                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. Stake ETH on platforms like Lido or Rocket Pool to get LSTs. | 1. Stake your ETH as a validator on Ethereum.                                         |
| 2. Use those LSTs to start restaking on EigenLayer.             | 2. Compare restaking services like EigenLayer, Symbiotic and others.                  |
|                                                                 | 3. Follow the instructions to connect your validator to the restaking smart contract. |

<br/>

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div><strong>Ethereum Staking :</strong> How does it work?</div>
  <ButtonLink href="/staking/">
    Learn More
  </ButtonLink>
</InfoBanner>

## Advanced {#advanced}

<YouTube id="-V-fG4J1N_M" />

## Further reading {#further-reading}

1. [https://dune.com/hashed_official/Irt](https://dune.com/hashed_official/Irt)
2. [https://ethereum.org/en/staking/](https://ethereum.org/en/staking/)
3. [https://www.ledger.com/academy/what-is-ethereum-restaking?utm_source=chatgpt.com](https://www.ledger.com/academy/what-is-ethereum-restaking?utm_source=chatgpt.com)
4. [https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained?utm_source=chatgpt.com](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained?utm_source=chatgpt.com)
5. [https://vitalik.eth.limo/general/2023/05/21/dont_overload.html](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
6. [https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained?utm_source=chatgpt.com](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained?utm_source=chatgpt.com)
7. [https://www.youtube.com/watch?v=-V-fG4J1N_M](https://www.youtube.com/watch?v=-V-fG4J1N_M)
8. [https://www.youtube.com/watch?v=5r0SooSQFJg](https://www.youtube.com/watch?v=5r0SooSQFJg)
9. [https://www.stakingrewards.com/asset/ethereum-2-0/analytics](https://www.stakingrewards.com/asset/ethereum-2-0/analytics)
