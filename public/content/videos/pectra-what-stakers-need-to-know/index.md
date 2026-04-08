---
title: "Ethereum Pectra upgrade: what stakers need to know"
description: "Explaining the Pectra upgrade from a staker's perspective, covering the practical impacts on validators, staking operations, and the key EIPs that affect staking in the Ethereum protocol."
lang: en
youtubeId: "_UpAFpC7X6Y"
uploadDate: 2025-01-22
duration: "0:09:14"
educationLevel: intermediate
topic:
  - "roadmap"
  - "pectra"
  - "staking"
format: explainer
author: Blockdaemon
breadcrumb: "Pectra for Stakers"
---

A webinar hosted by **Blockdaemon** with blockchain engineer Julia Schmidt (Alluvial) and Freddy Tänzer (Blockdaemon) discussing how the Pectra upgrade impacts ETH staking. The webinar covers execution-layer-triggerable withdrawals, max effective balance increases, validator consolidation, and liquid staking implications.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=_UpAFpC7X6Y) published by Blockdaemon. It has been lightly edited for readability.*

#### Introduction (0:00) {#introduction-000}

**Host:** Hello and welcome to this Blockdaemon-hosted webinar focusing on Ethereum's upcoming Pectra upgrade. With us today is Julia Schmidt, blockchain engineer at Alluvial, and Freddy Tänzer, Blockdaemon Ethereum ecosystem lead, to discuss how Pectra's changes will impact ETH staking, the network as a whole, liquid staking services, and more. To kick things off, Freddy — could you give us a brief overview of the Pectra upgrade and what its impact on stakers will be?

#### What is Pectra (1:28) {#what-is-pectra-128}

**Freddy Tänzer:** So Pectra is an Ethereum upgrade that is scheduled for late Q1 2025 — about March, might shift a little bit to the back, maybe April or so. It was actually supposed to be a small fork in the beginning, and then more and more things got added, so they actually divided it into two now.

The first part contains a lot of things — for example, with regards to smart accounts, account abstraction, and things like that — but I want to focus really on the things that are relevant to our audience in terms of the staking changes. There are mainly two big ones.

The first is the fact that you can trigger withdrawals and exits from your validator via the execution layer — the withdrawal credentials — basically eliminating the dependency on the node operator. The second, arguably even bigger in its effect, is that the maximum effective balance of a validator can now change. It used to be only 32 ETH as a fixed amount, and now it can be anywhere between 32 and 2,048 ETH.

There's also a smaller one which basically leads to the fact that deposits are much quicker — onchain registered from like 14 hours to less than an hour — but those two I think are the ones mostly relevant for our discussion here.

#### EIP-7002: execution-layer-triggerable exits (2:58) {#eip-7002-execution-layer-triggerable-exits-258}

**Host:** For the first major change, Julia, could you explain how the process post-Pectra will change versus the current ways that withdrawals are initiated in Ethereum's staking ecosystem?

**Julia Schmidt:** To propose and attest blocks, the validator needs to be constantly online and have a staked balance of 32 ETH. When you set up a validator to take part in the consensus mechanism, you would set up two keys. One is the validator key, which is used to perform the validator duties — signing block attestations. The second is the withdrawal key, which represents the ownership of the staked ETH.

You have two ways of staking: solo staking, or multi-custodial setups such as with Blockdaemon and as we are doing at Liquid Collective, where you can choose your node operator to do all the validator duties and validator operations on your behalf. That gives them the validator key, and you only have access to the withdrawal key.

The actual message to exit a validator can only be sent from the validator key that is controlled by the node operator. That requires you to trust your node operator — to depend on them to exit your validator for you. If they do it, that's great, but you always have to rely on this third party.

What's been happening previously was that you would agree to pre-sign exit messages when you set up this multi-custodial staking setup. You would get a message you could use later to exit your validator, but you wouldn't know whether the exit message would actually work. Every time there was an upgrade in Ethereum that changed the version number, your exit message might no longer work.

In the last Dencun upgrade, a new EIP changed the expiry time on these exit messages — but it was just treating the symptom, not solving the problem. The actual problem is that the owner of the staked ETH can't trigger the withdrawal. The funds can essentially be held hostage by the node operator.

This is now solved with EIP-7002, which allows both the validator key and the withdrawal key to trigger the exit from the execution layer — simply by sending a transaction to a special withdrawal contract where you send a withdrawal request and specify either a full exit of the validator, or a partial withdrawal from the staked balance.

#### EIP-7251: max effective balance (4:15) {#eip-7251-max-effective-balance-415}

**Host:** Freddy, could you give us an overview of the max effective balance going forward from Pectra onwards, and how this will impact people who currently stake?

**Freddy Tänzer:** Just to add — for our institutional customers, this dependency on the node operator was usually addressed with pre-signed exit messages, mainly to address concerns from regulators or business continuity concerns. They also had to keep those exit messages safe. So there's a clear simplification of the process, eliminating that dependency.

Now, on the max effective balance: a lot of things don't change, and all of this is opt-in. You don't have to change anything. The goal of the Ethereum core developers and the ecosystem at large is to reduce the number of validators on the network. We are over one million validators now, and each has to communicate with others about attestations and consensus. That's a lot of network traffic — tests have shown that reaching two million validators could be a problem.

The goal is to reduce the number of validators without impacting the security of the network — since the total amount of ETH staked would stay constant, just more ETH per validator on average.

For the customer, it mainly means they need to decide whether to use the new validator type or the old one. This depends on their liquidity needs. In the current setup with 32 ETH validators, your protocol rewards will be pushed to your withdrawal credential every nine or ten days, giving you regular liquidity.

But many setups assume that rewards are used to compound the stake. In the past, when compounding, you'd need to wait until you had 32 ETH in rewards to manually launch a new validator. With the new validator type, you auto-compound your rewards — that's more rewards and less work.

The trade-off is that you don't get rewards regularly, and you need to set up a process to retrieve them. Withdrawal triggers are now regular transactions that incur a gas fee, rather than receiving rewards for free in the old model.

There's good news on slashing, too: the initial slashing penalty will go down dramatically — by about 128×. With a 32 ETH validator, the initial penalty was one ETH. After Pectra, it will be a fraction of an ETH — maybe $20 or $25. This has positive side effects on solo staking, which is obviously important for the credible neutrality of Ethereum.

The auto-compounding benefit mainly benefits smaller amounts of stake. If you have a thousand validators, you could manually launch a new one monthly. But if you have only one validator, you'd practically need to wait 32 years to compound.

#### Liquid staking implications (11:25) {#liquid-staking-implications-1125}

**Host:** Julia, how does the consolidation of larger validators compare to the benefits of liquid staking? How will these decisions weigh up in a staker's mind post-Pectra?

**Julia Schmidt:** At Alluvial, we've been closely following these changes and want to offer both solutions. The consolidation requests in Pectra are an interim solution that shouldn't affect your effective balance's earning time — it won't have to go through an activation queue again when consolidating multiple validators. The process is quite smooth.

The fact that the initial slashing penalty has been lowered reduces the risk of running high-balance validators. The push from the Ethereum Foundation is really to consolidate as much as we can to reduce network load. There's a small disadvantage: in the very rare case that a max effective balance validator of 2,048 ETH gets slashed, it would go into the exit queue and your funds would be locked for a longer time — it would be like 64 validators getting slashed at once. So we'd try to offer flexible validator ceilings according to the client's risk appetite.

On the utility side, a liquid staking token obviously adds liquidity — even with partial withdrawals from the execution layer, it won't be instant. You submit the transaction, it gets queued, then there's the exit epoch and withdrawal epoch. Liquid staking tokens still offer instant liquidity that partial withdrawals can't.

#### Next steps for stakers (16:20) {#next-steps-for-stakers-1620}

**Freddy Tänzer:** What we see is that financial institutions would typically stake between 65% and 85% of their ETH under custody, because they need the rest as a liquidity buffer for redemptions. With liquid staking, you can potentially increase the amount of ETH staked, which generates higher rewards.

Both sides benefit from Pectra — liquid staking gets the execution-layer withdrawals option, and traditional staking gets the elimination of the 32 ETH increment problem, particularly for smaller stakes.

**Julia Schmidt:** With the Liquid Collective protocol, we don't just offer staking to one node operator — we have a consortium of different node operators we allocate stakes to in a round-robin approach. That increases the decentralization of the staked ETH. And these node operators follow the NORS (Node Operator Risk Standard), so we also guarantee coverage in case of slashing.

A key advantage I haven't touched upon yet is the partial withdrawals — now that you can withdraw staked ETH from the execution layer, this opens up new avenues for protocols such as EigenLayer to trigger withdrawals and exits. There's a huge increase in functionality and interoperability that DeFi can now better incorporate into the full validator lifecycle, from deposit to exit. As a blockchain engineer, it's exciting to be able to automate the full workflow.

#### Closing (19:50) {#closing-1950}

**Host:** Julia, where can people go to learn more about the Liquid Collective and Alluvial?

**Julia Schmidt:** You can follow Alluvial and Liquid Collective on Twitter, on X, on LinkedIn, or on the Alluvial website. We'll be sharing an article detailing the changes regarding the Pectra upgrade and how they'll affect the Ethereum landscape.

**Host:** Freddy, any updates to be shared regarding Pectra?

**Freddy Tänzer:** We have a lot to come. We're going to have a dedicated page on our website, blockdaemon.com — it will be the central hub of all the resources. We'll have a blog post, an FAQ, and some guidance and modeling recommendations with regards to what type of validator to choose and what size. Whether you want one 2,000 ETH validator, or two with 1,000, or four with 500 — all these are generally possible, and there are trade-off decisions to be made. We will help our customers navigate through this.

**Host:** Fantastic. Freddy, Julia, many thanks for your time today — fascinating discussion and a great Pectra primer.
