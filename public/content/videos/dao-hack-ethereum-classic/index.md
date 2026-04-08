---
title: "The DAO hack: story of Ethereum Classic"
description: "The story of the DAO hack in 2016, and how the community's response led to the creation of Ethereum Classic as a separate chain."
lang: en
youtubeId: "rNeLuBOVe8A"
uploadDate: 2021-12-15
duration: "0:09:48"
educationLevel: beginner
topic:
  - "governance"
  - "history"
  - "dao"
format: explainer
author: Junion
breadcrumb: "The DAO Hack"
---

An explainer by **Junion** telling the story of the DAO hack in 2016, one of the largest digital heists in crypto history, and how the Ethereum community's controversial decision to fork the blockchain led to the creation of Ethereum Classic.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=rNeLuBOVe8A) published by Junion. It has been lightly edited for readability.*

#### The discovery (0:00) {#the-discovery-000}

It's Monday, June 13, 2016. A computer science professor at Cornell is examining the code for the DAO, one of the most ambitious projects in the crypto space. For months he had been advocating for the project to be put on hold, as he believed there were certain flaws that could put the whole thing in jeopardy. But today he finds a serious vulnerability: a bug on line 666.

He fears that this bug could allow a hacker to potentially make unlimited ATM-like withdrawals. Even if the attacker only had $10 in their account, they would be able to withdraw it over and over and over until all the money is gone. There was a quarter of a billion dollars invested in the DAO, and every cent was at risk.

Slock.it, the company behind the DAO, acknowledges the potential exploit but declares that any attack would be unfeasible, so all the funds are still safe. They commit to GitHub by swapping two lines of code — a fix that will be included as part of the DAO Framework version 1.1.

But just as the team was claiming victory, a hacker was secretly following in their footsteps, developing an exploit that takes advantage of this exact bug. It's now Friday, four days later, and the DAO has just been hacked for a sum of 55 million dollars.

Just like the 81 million dollar SWIFT hack publicized holes in the centralized banking industry, and the WannaCry ransomware attack revealed critical vulnerabilities in computer operating systems, the DAO hack exposed the early fragility of smart contract security in a world where code dictates everything. It left the Ethereum community devastated as they scrambled to try to regain control of the blockchain.

This is the story of one of the largest digital heists ever and the bold attempt to rewrite history so that it never even happened.

#### What was the DAO? (2:00) {#what-was-the-dao-200}

Enter the DAO — short for decentralized autonomous organization. The idea was inspired by crowdfunding. Instead of multiple funds for different projects, there would be one fund to rule them all, and there was no better way to do this than with a DAO.

At launch, investors would receive 100 DAO tokens for every Ether deposited. These tokens gave them governance over the protocol and represented their share of the DAO. Token holders could submit proposals — for example, you could propose to invest one million dollars in exchange for a 10% stake in company XYZ.

Once a proposal passed the initial verification, it would be voted on by all the other investors. During this period, token holders could vote yes if they believed the investment yielded positive expected value, or no if they believed it yielded negative expected value. They could also use the forum to state their opinions and read others.

When the voting period was up and a quorum of 20% of all tokens was met, the DAO automatically transferred the specified Ether to the smart contract that represented the proposal. Any Ether generated from these proposals would then be returned to the treasury. It was just like one big decentralized hedge fund, designed to make profit. The idea was that the wisdom of the crowd would help create the best investment opportunities.

However, there still needed to be a way to protect the minority from being oppressed by the majority. If a minority group strongly disagreed with a proposal that they couldn't outvote, instead of voting no, they could call a split function and move their Ether from the main DAO to a child DAO, essentially splitting the DAO in two. This split function will be very important later.

#### The crowdfund (4:01) {#the-crowdfund-401}

The DAO was the largest crowdfunding project ever, raising 12.7 million Ether — worth 150 million dollars at the time. It took place during the early era of Ethereum, where the project was subjected to a huge amount of hype and investor FOMO.

Prior to this, Ethereum projects had mainly been arbitrary proof of concepts, but this was a fully functioning project with huge potential. It was completely safe from any hacks, secured by the millions of miners across the world, and it was decentralized — the entire project was made up of a series of smart contracts on Ethereum.

This was immutable code hosted on the most secure computer in the world, which ensured the key properties of a DAO: an organization that is completely decentralized and autonomous. Once the contracts were deployed on April 30th, no single entity — not even Slock.it — could make changes to the protocol or stop its existence. Its code had been audited countless times by various Ethereum developers and was viewable to everyone for review.

#### The hack (5:02) {#the-hack-502}

"Lonely, so lonely" — the name of DAO Proposal #59. It's just a normal split proposal, but it's actually where the hack begins. After the hacker submitted the proposal, there is a standard seven-day debate period where anyone is free to join. However, nobody joins this split.

It's standard procedure for someone to call a split just by themselves, create a child DAO, and then create a proposal that sends all the Ether back to their wallet. This allows a user to reclaim their money backed by their DAO tokens. Seven days have now passed, and the hacker is now allowed to call the split function. Nobody suspects a thing.

However, as the split function is called, the community realizes something alarming. Ether is being drained from the DAO at the rate of eight million dollars an hour. The community scrambles to figure out what is happening. It looks like the attacker is recursively calling the split function — over and over and over, hundreds of times.

Remember that bug fix that took place four days ago? It's a shame that there is no way to edit the code of a smart contract after it's deployed, so this fix only existed on GitHub as part of The DAO 1.1, an entirely different DAO that was in the making. This small fix could have prevented the whole thing — all it did was swap two lines of code so that the balance is updated before the actual payout.

But without this fix, anyone could repeatedly call the function to withdraw Ether before the contract updates their balance. It's like an ATM that doesn't change your balance until it has given you the money. "Can I withdraw ten dollars? Wait, before that, can I withdraw ten dollars? Wait, before that…"

#### The Robin Hood group (6:55) {#the-robin-hood-group-655}

DAO token holders watched as their investments were slowly being drained from the main DAO to the child DAO, also known as the dark DAO. Additionally, the price of Ethereum flash-crashed from $20 to $15 following the news. Something needed to be done, and the only way was to drain the rest before the hacker did. And thus began the race to empty.

On the other side of the world, in his apartment in the Copacabana neighborhood of Rio de Janeiro, Alex Van de Sande wakes up to his phone blowing up with Skype messages. He turns to his wife and says, "Remember when I was telling you about that huge unhackable pile of money? It's been hacked."

Alex got in touch with some other undisclosed developers and they formed a group they nicknamed Robin Hood — white-hat hackers who would drain the remaining funds and return them to the rightful owners. However, they didn't have time to propose a new split, as that would require a seven-day voting period.

Instead, they set their sights on Proposal #71, which was about to end in a few hours. They would join that split and use the same hack to siphon all the remaining funds into this child DAO. Six hours had passed since the attack began, and the thief had managed to steal 30% of the DAO's Ether. But for some unknown reason, the attack stopped working. Transactions failed and it was all put to an end.

Meanwhile, Alex was just getting ready to launch the white-hat attack to secure the remaining 70% of the funds. But suddenly he lost his internet connection. With only 30 minutes left, he frantically called NET, his Brazilian internet service provider, but only got a reply from a robotic voice: "We see there's an internet issue in your neighborhood." The split proposal finished and he had just missed the window to execute the Robin Hood attack.

The next morning, Alex tried to reconvene the group to infiltrate another split proposal, but the others were busy. "We felt like the worst hackers in history. We were foiled by bad internet and family commitments."

#### The race to empty (9:10) {#the-race-to-empty-910}

Four days after the initial attack, the DAO was under attack again. It was draining slowly — a few Ether per round — but it had already amassed a few thousand dollars. It seemed to be from an attacker testing the waters. At this point, Robin Hood needed to do something.

They chose to infiltrate Split #78 because they had identified the curator of the proposal and it was ending soon. They contacted some whales who were happy to donate their DAO tokens, allowing the team to secure six million tokens. The more tokens the Robin contract had, the faster it could siphon Ether. The attacker picked up the pace and other attackers joined in. But thanks to the donations, Robin Hood was able to outpace them. This allowed them to secure 7.2 million Ether — 55% of the DAO.

#### The fork (10:08) {#the-fork-1008}

The main DAO had now been drained and all the funds were distributed across several child DAOs — the two main ones being the white-hat DAO and the dark DAO. But all of the money was time-locked. No proposal could be brought forward under a child DAO until a 27-day waiting period was over. And even after that, sending funds to an external address required submitting a proposal and waiting for two weeks. Essentially, there were still 41 days until the hacker could cash out what equated to 5% of the total supply of Ethereum.

But the hacker would never get to touch his Ethereum. What happened next is one of the boldest and most controversial episodes in blockchain history. The community decided they weren't going to let the hacker win. They wanted to rewrite history so that every transaction involved in the hack was undone, and everyone would get their money back. They chose to fork Ethereum.

A blockchain is like a list of transactions that keeps growing with every block mined. Every transaction is ingrained in the blockchain forever. But if over 50% of the miners collude, they can falsely alter the blockchain, rewriting history however they want. Usually this is called a 51% attack. But there was nothing malicious about this fork — the community was only reclaiming money that had been stolen from them.

#### Code is law (11:48) {#code-is-law-1148}

Still, not everyone was on board with the proposed fork. They argued that code is law. In this view, the attacker was less of a hacker and more of a smart lawyer who carefully read the terms of a contract. Therefore, no funds were actually stolen and they should be rightfully entitled to the Ether from the dark DAO.

It's important to note that Ethereum itself was never actually hacked — it was just a poorly written smart contract that got exploited. Two different things. Additionally, they believed that things that happen on the blockchain are immutable and should never be tampered with regardless of the situation.

One day after the initial attack, the attacker sent an open letter in the DAO's Slack group chat, signed with their private key:

"To the DAO and the Ethereum community: I have carefully examined the code of The DAO and have rightfully claimed 3 million Ether, and would like to thank the DAO for this reward. I am disappointed by those who are characterizing the use of this intentional feature as 'theft.' I am making use of this explicitly coded feature as per the smart contract terms. A soft or hard fork would amount to seizure of my legitimate and rightful Ether. Such a fork would permanently and irrevocably ruin all confidence in not only Ethereum but also in the field of smart contracts and blockchain technology. Make no mistake: any fork, soft or hard, will further damage Ethereum and destroy its reputation and appeal."

Upon further inspection, people realized that the signature was invalid, so this letter was only written by someone claiming to be the attacker.

On the other hand, proponents argued that "code is law" is too drastic of a statement and that humans should have the final say through social consensus. The hacker should not be allowed to profit from the exploit as it is ethically wrong and most likely illegal. But most importantly, the DAO was simply too big to fail. It held around 15% of the total supply of Ether.

#### Ethereum Classic (14:34) {#ethereum-classic-1434}

In an event that echoed the 2008 financial crisis, the Ethereum developers bailed out the DAO. Vitalik Buterin, the creator and lead developer of Ethereum, was unapologetic about pushing for a fork. In an interview, he later said, "Some Bitcoin users see the hard fork as in some ways violating their most fundamental values. I personally think these fundamental values, pushed to such extremes, are silly."

These views ruled the majority of the Ethereum community. A controversial community vote — where one Ether equals one vote — showed 87% support for the fork. So on block 1,920,000, computer nodes all over the world updated their software and accepted the fork. All the Ether from the DAO and the child DAOs was moved to a refund contract.

But it doesn't end there. The original Ethereum blockchain — the one with the DAO hack — kept going. In fact, it was growing. Miners who opposed the fork continued to mine blocks and transactions were still being made. The next day, Poloniex listed the coin and it started trading at $2 each. This chain became known as Ethereum Classic — the original, unaltered blockchain.

If you held Ether before the fork, you would now have one Ethereum and one Ethereum Classic. If you held one Ether in the DAO, you would be able to withdraw one Ethereum from the refund contract. And if you had just hacked the DAO, you would have made a decent fortune in Ethereum Classic — around seven million dollars.

#### Legacy of the DAO (16:14) {#legacy-of-the-dao-1614}

Initially, Ethereum Classic gained momentum as an alternative, with a strong community of blockchain fundamentalists who disagreed with the bailout. But since then, Ethereum Classic has failed to gain traction and only really exists as an idea with little utility. While Ethereum is home to thousands of protocols, Ethereum Classic only has a few basic ones. It's clear that the fork had won.

Two months later, Robin Hood transferred 2.9 million of their Ethereum Classic to Poloniex and sold it all for Ethereum in an attempt to dump the price. 14% was successfully converted, but 86% was frozen by Poloniex and given back to the group. Robin Hood set up a refund contract on the Ethereum Classic network for users affected by the DAO hack.

As for the hacker, they walked away with 3.6 million Ethereum Classic — worth 150 million dollars today. But if there had been no fork, that 3.6 million Ethereum would be worth over seven billion dollars today.

#### The DAO's lasting impact (17:26) {#the-daos-lasting-impact-1726}

It's important to note that the DAO is now commonly referred to as the Genesis DAO to avoid confusion, because it was the first DAO but definitely not the last. Despite the initial setbacks, DAOs have only become more popular. MakerDAO governs the stablecoin DAI, and DeFi protocols such as Uniswap with its UNI token usually have a governance DAO. These DAOs all built from the experiences of prior projects to create even more versatile and successful organizations.

But the Genesis DAO was the first of its kind, created as an experiment — an expensive one — controlling 250 million dollars at its peak, or 15% of the total supply of Ethereum. Christoph Jentzsch, the lead developer, only expected it to raise five million dollars and later said he regrets not capping it. For such a big experiment, it was way too early and certainly too big to fail.

Creating a smart contract is like developing a self-driving car — it's a big responsibility requiring extensive testing to avoid accidents. Even with this new caution, DeFi protocols still get hacked for upwards of 50 million dollars, some even after being audited by professional auditing firms. But since the DAO hack, there have been no more bailouts. The Ethereum community is stronger now and ready to move on to even bigger and more ambitious projects, building the next generation of digital applications.
