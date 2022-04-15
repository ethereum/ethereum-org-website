---
title: Weak subjectivity
description: An explanation of weak subjectivity and its role in PoS Ethereum.
lang: en
sidebar: true
incomplete: false
---

# What is “weak subjectivity”?

It is important to note that the mechanism of using deposits to ensure there is “something at stake” does lead to one change in the security model. Suppose that deposits are locked for four months, and can later be withdrawn. Suppose that an attempted 51% attack happens that reverts 10 days worth of transactions. The blocks created by the attackers can simply be imported into the main chain as proof-of-malfeasance (or “dunkles”) and the validators can be punished. However, suppose that such an attack happens after six months. Then, even though the blocks can certainly be re-imported, by that time the malfeasant validators will be able to withdraw their deposits on the main chain, and so they cannot be punished.

To solve this problem, we introduce a “revert limit” - a rule that nodes must simply refuse to revert further back in time than the deposit length (ie. in our example, four months), and we additionally require nodes to log on at least once every deposit length to have a secure view of the chain. Note that this rule is different from every other consensus rule in the protocol, in that it means that nodes may come to different conclusions depending on when they saw certain messages. The time that a node saw a given message may be different between different nodes; hence we consider this rule “subjective” (alternatively, one well-versed in Byzantine fault tolerance theory may view it as a kind of synchrony assumption).

However, the “subjectivity” here is very weak: in order for a node to get on the “wrong” chain, they must receive the original message four months later than they otherwise would have. This is only possible in two cases:

When a node connects to the blockchain for the first time.
If a node has been offline for more than four months.

We can solve (1) by making it the user’s responsibility to authenticate the latest state out of band. They can do this by asking their friends, block explorers, businesses that they interact with, etc. for a recent block hash in the chain that they see as the canonical one. In practice, such a block hash may well simply come as part of the software they use to verify the blockchain; an attacker that can corrupt the checkpoint in the software can arguably just as easily corrupt the software itself, and no amount of pure cryptoeconomic verification can solve that problem. (2) does genuinely add an additional security requirement for nodes, though note once again that the possibility of hard forks and security vulnerabilities, and the requirement to stay up to date to know about them and install any needed software updates, exists in proof of work too.

Note that all of this is a problem only in the very limited case where a majority of previous stakeholders from some point in time collude to attack the network and create an alternate chain; most of the time we expect there will only be one canonical chain to choose from.
