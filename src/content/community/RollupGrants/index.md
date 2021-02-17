# Rollup Community Grants

_The Ethereum Foundation is sponsoring a wave of rollup community grants. Proposals are due **[date]**. Here are all the details you need._

<Divider />

Calling all those interested in building up the Ethereum rollup community!

The Ethereum ecosystem is likely to be all-in on rollups as a scaling strategy for the near and mid-term future (see Vitalik’s rollup centric ethereum [roadmap](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698/50?u=haoyuathz)). A variety of Optimistic and ZK-Rollups are already in production or will go live in the near future.

As gas prices are soaring the most promising near term solution to getting a scalable EVM like developer experience is optimistic rollups such as [Optimism](https://optimism.io/) and [Arbitrum](https://offchainlabs.com/). Therefore, while we are equally excited about the promise of other rollups we want to focus this round on EVM optimistic rollup.

The goal is to grow the rollup community and help to kickstart a flourishing ecosystem. We want to make it easy for dapps to live on multiple EVM rollups and have user and developer experience for rollups on par with mainnet or better. Social recovery wallets could be made the default and it should be easy for users to move from one rollup to another even during prolonged periods of very high gas prices.

''<InfoBanner emoji=":thinking_face:">

Wait, what are optimistic rollups?
Here some links to dive deeper:

- Learn the basics on [Ethhub](<[https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/](https://docs.ethhub.io/ethereum-roadmap/layer-2-scaling/optimistic_rollups/)>).
- [An Incomplete Guide to Rollups](<[https://vitalik.ca/general/2021/01/05/rollup.html](https://vitalik.ca/general/2021/01/05/rollup.html)>) by Vitalik.

- [(Almost) Everything you need to know about Optimistic Rollup](<[https://research.paradigm.xyz/rollups](https://research.paradigm.xyz/rollups)>) by Georgios Konstantopoulos.
- [How does Optimism's Rollup really work?](<[https://research.paradigm.xyz/optimism](https://research.paradigm.xyz/optimism)>) by Georgios Konstantopoulos.

''</InfoBanner>

## **Submit proposal**

Anyone is free to participate (individuals and teams) in this grants round.

If you want to submit something but need some inspiration, check out the [wishlist](https://hackmd.io/Z9XAdVZGTlKkbZCA-1BFCg?both#Wishlist).

Ideas and projects at any stage of development are welcome:

- Idea phase.
- Proof of concept.
- Work in progress.
- Fleshed out project.

Grants are decided on a case-by-case basis and you may enter more than one proposal! So long as each proposal is unique and meets the requirements (add link to paragraph).

### **Deadline**

The deadline for proposals is any time the day of **[date]**. We will follow-up with you about your submission by email.

### **Requirements**

- Proposals must be in English.
- Work must be open source with a free and permissive license.
- If published work, it must be accessible by a url.

### **Selection criteria**

_Surprise us with your creativity! But here are a few selection criteria considerations (depending on the submission type some criteria might not be applicable):_

- Potential impact on broadening the rollup community.
- Quality of contribution to the rollup ecosystem.
- Clarity, conciseness and organization of documentation.
- Novelty supporting rollup adoption.
- Insights that lead to substantive changes in rollup implementations or specifications.
- Analyses or visualizations that help a non-technical audience gain insight into the networks.

## Wishlist

The Ethereum Foundation is interested in the following things, but don't let this restrict your creativity.

### Wallets

- A single wallet that supports all rollups.
- Transaction abstraction default i.e. allow to use BLS or other crypto instead of ECDSA.
- Social key recovery (see [here](https://vitalik.ca/general/2021/01/11/recovery.html)).
- Make it easy to be layer agnostic. Enable the sender to process payments to addresses on different rollups as specified by the receiver.

### Infrastructure

- A block explorer that supports all rollups.
- Status dashboards to monitor network health.
- For rollups that have a single coordinator, provide a receipt to a user which gives assurance that the transaction will be included. Otherwise a penalty is applied.

### Coordinator and Verifier Community

Most rollups currently have a centralized coordinator that orders transactions, others are decentralized and allow more coordinators to join.

Coordinators create blocks. Verifiers make sure they are correct. It's important that verifiers stay online to submit fraud proofs.

- Create educational material for potential coordinators and verifiers.
- Support community infrastructure for coordinators and validators to facilitate communication and coordination.
- Organize pager duty for verifiers to ensure fraud proof submission.

### Devex

- Make it easy for developers to deploy contracts without rollup specific changes.
- Improve developer documentation.
- A wrapper that makes it easy to build UI's to multiple rollups. Ideally existing frontends just need a change to endpoints.

### Interoperability

- Mass migrations allow users to exit one rollup and move to another without on-chain action. Several rollups will support mass migrations, additional tooling could facilitate this in practice.
- Fast withdrawal: optimistic rollups have a slow withdrawal time. It is possible to expedite this process by advancing the withdrawal funds for a fee.
- State channels between two users on multiple rollups can be used to move funds without a L1 transaction.

### Adoption

- Create a [game](https://www.coindesk.com/bitcoins-lightning-torch-has-blazed-through-37-countries-so-far) that encourages people to try out optimistic rollups. Extra points if it involves a social recovery wallet or a wallet on multiple rollups.
- Open source software that allows to track multiple optimistic rollups and deploy capital on demand. The goal is to keep arbitrage opportunities between multiple rollups small and reduce barriers of entry.
- Bridge assets between mainnet and multiple optimistic rollups.

### Standards

The optimistic rollup space is very young, it is a good opportunity to establish standards.

- Standards for mass migrations.
- A address format that supports multiple rollups and allows the user to share a single address to receive funds on multiple rollups.
- Name services working across multiple rollups.

### Research

Rollups need to make the state before and after a transition available. Its might be possible to further compress this data.

- Find better compression algorithms for EVM rollups, implement and benchmark.

### Build new optimistic rollups

A lot of the design space that has not yet been explored. Learn from what has been built already. Build optimistic rollups with EVM, WASM or other VMs.

## **Next steps and support**

For any general support questions about your submission, please email rollupgrants@ethereum.org.

For technical questions about rollups, ideas or direction for proposals, and all things, we invite you to join the [EthereumRollupGrants](https://t.me/EthereumRollupGrants) telegram channel.

## **Frequently asked questions**

### **Who can submit proposals for Rollup Community Grants?**

Anybody!

Feel free to submit as teams or individuals.

### **What makes for a good proposal?**

The more detailed information, the better.

In short, we need enough information to understand your goals, your motivation and your challenges. The more details you provide, the more likely we’ll be able to help.

For example:

- Showing a clear grasp of the problem you're trying to solve
- Clearly identifying your project's impact and how it would help the rollup ecosystem
- Detailed description of your project

### **What state does my idea or project need to be in?**

Any stage of development!

If you have an idea or project that benefits the rollup community, we want to hear about it! The goal is to support regular, consistent work that pushes forward the rollup ecosystem.

Rollup Community Grants is an open call for proposals. Which means, it's expected that some ideas or projects won't be fully shipped before the deadline, but instead require ongoing efforts.

### **What if I miss the deadline?**

You can submit an inquiry for support through the Ecosystem Support Program.

The Ethereum Foundation has a general grants initiative called the [Ecosystem Support Program (ESP)](https://esp.ethereum.foundation/).

If you miss the deadline for this dedicated round of grants, but have a proposal related to rollups, head on over to ESP.
