---
title: What is a DAO?
metaTitle: What is a DAO? | Decentralized Autonomous Organization
description: An overview of DAOs on Ethereum
lang: en
template: use-cases
emoji: ":handshake:"
sidebarDepth: 2
image: /images/use-cases/dao-2.png
alt: A representation of a DAO voting on a proposal.
summaryPoint1: Member-owned communities without centralized leadership.
summaryPoint2: A safe way to collaborate with internet strangers.
summaryPoint3: A safe place to commit funds to a specific cause.
---

## What are DAOs? {#what-are-daos}

A DAO is a collectively-owned organization working towards a shared mission.

DAOs allow us to work with like-minded folks around the globe without trusting a benevolent leader to manage the funds or operations. There is no CEO who can spend funds on a whim or CFO who can manipulate the books. Instead, blockchain-based rules baked into the code define how the organization works and how funds are spent.

They have built-in treasuries that no one has the authority to access without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice, and everything happens transparently [on-chain](/glossary/#on-chain).

## Why do we need DAOs? {#why-dao}

Starting an organization with someone that involves funding and money requires a lot of trust in the people you're working with. But it’s hard to trust someone you’ve only ever interacted with on the internet. With DAOs you don’t need to trust anyone else in the group, just the DAO’s code, which is 100% transparent and verifiable by anyone.

This opens up so many new opportunities for global collaboration and coordination.

### A comparison {#dao-comparison}

| DAO                                                                                                                     | A traditional organization                                                                       |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Usually flat, and fully democratized.                                                                                   | Usually hierarchical.                                                                            |
| Voting required by members for any changes to be implemented.                                                           | Depending on structure, changes can be demanded from a sole party, or voting may be offered.     |
| Votes tallied, and outcome implemented automatically without trusted intermediary.                                      | If voting allowed, votes are tallied internally, and outcome of voting must be handled manually. |
| Services offered are handled automatically in a decentralized manner (for example distribution of philanthropic funds). | Requires human handling, or centrally controlled automation, prone to manipulation.              |
| All activity is transparent and fully public.                                                                           | Activity is typically private, and limited to the public.                                        |

### DAO examples {#dao-examples}

To help this make more sense, here's a few examples of how you could use a DAO:

- **A charity** – you could accept donations from anyone in the world and vote on which causes to fund.
- **Collective ownership** – you could purchase physical or digital assets and members can vote on how to use them.
- **Ventures and grants** – you could create a venture fund that pools investment capital and votes on ventures to back. Repaid money could later be redistributed amongst DAO-members.

<YouTube id="zTStDvUtQWc" />

## How do DAOs work? {#how-daos-work}

The backbone of a DAO is its [smart contract](/glossary/#smart-contract), which defines the rules of the organization and holds the group's treasury. Once the contract is live on Ethereum, no one can change the rules except by a vote. If anyone tries to do something that's not covered by the rules and logic in the code, it will fail. And because the treasury is defined by the smart contract too that means no one can spend the money without the group's approval either. This means that DAOs don't need a central authority. Instead, the group makes decisions collectively, and payments are automatically authorized when votes pass.

This is possible because smart contracts are tamper-proof once they go live on Ethereum. You can't just edit the code (the DAOs rules) without people noticing because everything is public.

## Ethereum and DAOs {#ethereum-and-daos}

Ethereum is the perfect foundation for DAOs for a number of reasons:

- Ethereum’s own consensus is decentralized and established enough for organizations to trust the network.
- Smart contract code can’t be modified once live, even by its owners. This allows the DAO to run by the rules it was programmed with.
- Smart contracts can send/receive funds. Without this you'd need a trusted intermediary to manage group funds.
- The Ethereum community has proven to be more collaborative than competitive, allowing for best practices and support systems to emerge quickly.

## DAO governance {#dao-governance}

There are many considerations when governing a DAO, such as how voting and proposals work.

### Delegation {#governance-delegation}

Delegation is like the DAO version of representative democracy. Token holders delegate votes to users who nominate themselves and commit to stewarding the protocol and staying informed.

#### A famous example {#governance-example}

[ENS](https://claim.ens.domains/delegate-ranking) – ENS holders can delegate their votes to engaged community members to represent them.

### Automatic transaction governance {#governance-example}

In many DAOs, transactions will be automatically executed if a quorum of members votes affirmative.

#### A famous example {#governance-example}

[Nouns](https://nouns.wtf) – In Nouns DAO, a transaction is automatically executed if a quorum of votes is met and a majority votes affirmative, as long as it is not vetoed by the founders.

### Multisig governance {#governance-example}

While DAOs may have thousands of voting members, funds can live in a [wallet](/glossary/#wallet) shared by 5-20 active community members who are trusted and usually doxxed (public identities known to the community). After a vote, the [multisig](/glossary/#multisig) signers execute the will of the community.

## DAO laws {#dao-laws}

In 1977, Wyoming invented the LLC, which protects entrepreneurs and limits their liability. More recently, they pioneered the DAO law that establishes legal status for DAOs. Currently Wyoming, Vermont, and the Virgin Islands have DAO laws in some form.

### A famous example {#law-example}

[CityDAO](https://citydao.io) – CityDAO used Wyoming's DAO law to buy 40 acres of land near Yellowstone National Park.

## DAO membership {#dao-membership}

There are different models for DAO membership. Membership can determine how voting works and other key parts of the DAO.

### Token-based membership {#token-based-membership}

Usually fully [permissionless](/glossary/#permissionless), depending on the token used. Mostly these governance tokens can be traded permissionlessly on a [decentralized exchange](/glossary/#dex). Others must be earned through providing liquidity or some other ‘proof-of-work’. Either way, simply holding the token grants access to voting.

_Typically used to govern broad decentralized protocols and/or tokens themselves._

#### A famous example {#token-example}

[MakerDAO](https://makerdao.com) – MakerDAO's token MKR is widely available on decentralized exchanges and anyone can buy into having voting power on Maker protocol's future.

### Share-based membership {#share-based-membership}

Share-based DAOs are more permissioned, but still quite open. Any prospective members can submit a proposal to join the DAO, usually offering a tribute of some value in the form of tokens or work. Shares represent direct voting power and ownership. Members can exit at any time with their proportionate share of the treasury.

_Typically used for more closer-knit, human-centric organizations like charities, worker collectives, and investment clubs. Can also govern protocols and tokens as well._

#### A famous example {#share-example}

[MolochDAO](http://molochdao.com/) – MolochDAO is focused on funding Ethereum projects. They require a proposal for membership so the group can assess whether you have the necessary expertise and capital to make informed judgments about potential grantees. You can't just buy access to the DAO on the open market.

### Reputation-based membership {#reputation-based-membership}

Reputation represents proof of participation and grants voting power in the DAO. Unlike token or share-based membership, reputation-based DAOs don't transfer ownership to contributors. Reputation cannot be bought, transferred or delegated; DAO members must earn reputation through participation. On-chain voting is permissionless and prospective members can freely submit proposals to join the DAO and request to receive reputation and tokens as a reward in exchange for their contributions.

_Typically used for decentralized development and governance of protocols and [dapps](/glossary/#dapp), but also well suited to a diverse set of organizations like charities, worker collectives, investment clubs, etc._

#### A famous example {#reputation-example}

[DXdao](https://DXdao.eth.limo) – DXdao was a global sovereign collective building and governing decentralized protocols and applications since 2019. It leveraged reputation-based governance and [holographic consensus](/glossary/#holographic-consensus) to coordinate and manage funds, meaning no one could buy their way into influencing its future or governance. 

## Join / start a DAO {#join-start-a-dao}

### Join a DAO {#join-a-dao}

- [Ethereum community DAOs](/community/get-involved/#decentralized-autonomous-organizations-daos)
- [DAOHaus's list of DAOs](https://app.daohaus.club/explore)
- [Tally.xyz list of DAOs](https://www.tally.xyz)

### Start a DAO {#start-a-dao}

- [Summon a DAO with DAOHaus](https://app.daohaus.club/summon)
- [Start a Governor DAO with Tally](https://www.tally.xyz/add-a-dao)
- [Create an Aragon-powered DAO](https://aragon.org/product)
- [Start a colony](https://colony.io/)
- [Create a DAO with DAOstack's holographic consensus](https://alchemy.daostack.io/daos/create)

## Further reading {#further-reading}

### DAO Articles {#dao-articles}

- [What's a DAO?](https://aragon.org/dao) – [Aragon](https://aragon.org/)
- [House of DAOs](https://wiki.metagame.wtf/docs/great-houses/house-of-daos) – [Metagame](https://wiki.metagame.wtf/)
- [What is a DAO and what is it for?](https://daohaus.substack.com/p/-what-is-a-dao-and-what-is-it-for) – [DAOhaus](https://daohaus.club/)
- [How to Start a DAO-Powered Digital Community](https://daohaus.substack.com/p/four-and-a-half-steps-to-start-a) – [DAOhaus](https://daohaus.club/)
- [What is a DAO?](https://coinmarketcap.com/alexandria/article/what-is-a-dao) – [Coinmarketcap](https://coinmarketcap.com)
- [What is Holographic Consensus?](https://medium.com/daostack/holographic-consensus-part-1-116a73ba1e1c) - [DAOstack](https://daostack.io/)
- [DAOs are not corporations: where decentralization in autonomous organizations matters by Vitalik](https://vitalik.eth.limo/general/2022/09/20/daos.html)
- [DAOs, DACs, DAs and More: An Incomplete Terminology Guide](https://blog.ethereum.org/2014/05/06/daos-dacs-das-and-more-an-incomplete-terminology-guide) - [Ethereum Blog](https://blog.ethereum.org)

### Videos {#videos}

- [What is a DAO in crypto?](https://youtu.be/KHm0uUPqmVE)
- [Can a DAO Build a City?](https://www.ted.com/talks/scott_fitsimones_could_a_dao_build_the_next_great_city) – [TED](https://www.ted.com/)

<Divider />

<QuizWidget quizKey="daos" />
