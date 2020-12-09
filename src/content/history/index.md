---
title: History of Ethereum
description: A history of the Ethereum blockchain including major milestones, releases, and forks.
lang: en
sidebar: true
sidebarDepth: 2
---

# The history of Ethereum {#the-history-of-ethereum}

A timeline of all the major milestones, forks, and updates to the Ethereum blockchain.

<ExpandableCard title="What are forks?" contentPreview="Changes to the rules of the Ethereum protocol which often include planned technial upgrades.">

Forks are when major technical upgrades or changes need to be made to the network – they often action [Ethereum Improvement Proposals (EIPs)](/eips/) and change the "rules" of the protocol. When upgrades are needed in traditional, centrally-owned software, the company will just publish a new version for the end-user. Blockchains work differently because there is no central ownership.

[Clients](/developers/docs/nodes-and-clients/) must update their software to implement the new fork rules. Plus block creators (miners in a proof-of-work world, validators in a proof-of-stake world) and nodes must create blocks and validate against the new rules. [More on consensus mechanisms](/developers/docs/consenus-mechanisms/)

This rules change creates a temporary split in the network. New blocks could be produced according to the new rules or the old ones. Forks are usually agreed upon ahead of time so that the fork with the changes becomes the main chain. However in rare cases, disagreements over forks can cause the network to split for good – most notably the creation of Ethereum Classic with the [DAO fork](#dao-fork).

</ExpandableCard>

<Divider />

## 2020 {#2020}

### Beacon Chain genesis {#beacon-chain-genesis}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-01-2020 12:00:35 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Beacon Chain block number: <a href="https://beaconscan.com/slot/1">1</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $586.23 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201207184633/https://www.ethereum.org/en/">ethereum.org on waybackmachine</a>
</GhostCard>

### Staking deposit contract deployed {#staking-deposit-contract}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-14-2020 09:22:52 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/11052984">11052984</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $379.04 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20201104235727/https://ethereum.org/en/">ethereum.org on waybackmachine</a>
</GhostCard>

### Muir Glacier {#muir-glacier}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jan-02-2020 08:30:49 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9200000">9200000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $127.18 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20200103093618/https://ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

https://decrypt.co/15813/ethereum-hard-fork-muir-glacier-goes-live

<Divider />

## 2019 {#2019}

### Istanbul {#istanbul}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Dec-08-2019 12:25:09 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/9069000">9069000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $151.06 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20191216101254if*/https://ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

#### Summary {#istanbul-summary}

The Istanbul fork:

- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Improved denial-of-service attack resilience.
- Made [Layer 2 scaling](/developers/docs/layer-2-scaling/) solutions based on SNARKs and STARKs more performant.
- Enabled Ethereum and Zcash to interoperate.
- Allowed contracts to introduce more creative functions.

[Read the official announcement](https://blog.ethereum.org/2019/11/20/ethereum-istanbul-upgrade-announcement/)

<ExpandableCard title="Istanbul EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-152](https://eips.ethereum.org/EIPS/eip-152) – _allow Ethereum to work with privacy-preserving currency like Zcash._
- [EIP-1108](https://eips.ethereum.org/EIPS/eip-1108) – _cheaper cryptography to improve [gas](/glossary/#gas) costs._
- [EIP-1344](https://eips.ethereum.org/EIPS/eip-1344) – _protects Ethereum against replay attacks by adding `CHAINID` [opcode](/developers/docs/ethereum-stack/#ethereum-virtual-machine)._
- [EIP-1884](https://eips.ethereum.org/EIPS/eip-1884) – _optimising opcode gas prices based on consumption._
- [EIP-2028](https://eips.ethereum.org/EIPS/eip-2028) – _reduces the cost of CallData to allow more data in blocks – good for [Layer 2 scaling](/developers/docs/layer-2-scaling/)._
- [EIP-2200](https://eips.ethereum.org/EIPS/eip-2200) – _other opcode gas price alterations._

</ExpandableCard>

### Constantinople {#constantinople}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Feb-28-2019 07:52:04 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"}  /> Block number: <a href="https://etherscan.io/block/7280000">7280000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"}  /> ETH price: $136.29 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"}   /> <a href="https://web.archive.org/web/20190415163751/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

#### Summary {#constantinople-summary}

The Constantinople fork:

- Ensured the blockchain didn't freeze before [proof-of-stake was implemented](#beacon-chain-genesis).
- Optimised the [gas](/glossary/#gas) cost of certain actions in the [EVM](/developers/docs/ethereum-stack/#ethereum-virtual-machine).
- Added the ability to interact with addresses that haven't been created yet.

[Read the official announcement](https://blog.ethereum.org/2019/02/22/ethereum-constantinople-st-petersburg-upgrade-announcement/)

<ExpandableCard title="Constantinople EIPs" contentPreview="Official improvements included in this fork.">

- [EIP-145](https://eips.ethereum.org/EIPS/eip-145) – _optimises cost of certain on-chain actions._
- [EIP-1014](https://eips.ethereum.org/EIPS/eip-1014) – _allows you to interact with addresses that have yet to be created._
- [EIP-1052](https://eips.ethereum.org/EIPS/eip-1052) – _optimises cost of certain on-chain actions._
- [EIP-1234](https://eips.ethereum.org/EIPS/eip-1234) – _makes sure the blockchain doesn't freeze before proof-of-stake._

</ExpandableCard>

<Divider />

## 2017 {#2017}

### Byzantium {#byzantium}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-16-2017 05:22:11 AM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/4370000">4370000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $334.23 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20171017201143/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

https://blog.ethereum.org/2017/10/12/byzantium-hf-announcement/

<Divider />

## 2016 {#2016}

### Spurious Dragon {#spurious-dragon}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Nov-22-2016 04:15:44 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2675000">2675000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $9.84 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161127154654/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/

### Tangerine whistle {#tangerine-whistle}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Oct-18-2016 01:19:31 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/2463000">2463000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20161030043727/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

https://blog.ethereum.org/2016/10/18/faq-upcoming-ethereum-hard-fork/

### DAO fork {#dao-fork}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-20-2016 01:20:40 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1920000">1920000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.54 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160803215306/https://ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

https://blog.ethereum.org/2016/07/20/hard-fork-completed/

### Homestead {#homestead}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Mar-14-2016 06:49:53 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/1150000">1150000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $12.50 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20160313203843/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

<Divider />

## 2015 {#2015}

### Frontier thawing {#frontier-thawing}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Sep-07-2015 09:33:09 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/200000">200000</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: $1.24 USD<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150912193811/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

### Frontier {#frontier}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <code>Jul-30-2015 03:26:13 PM +UTC</code><br />
<Emoji text=":bricks:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> Block number: <a href="https://etherscan.io/block/0">0</a><br />
<Emoji text=":money_bag:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> ETH price: N/A<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20150802035735/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

<Divider />

## 2014 {#2014}

### Yellowpaper released {#yellowpaper}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> April 01, 2014<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140509173418/https://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

[View the Yellow Paper](https://github.com/ethereum/yellowpaper)

<Divider />

## 2013 {#2013}

### Whitepaper released {#whitepaper}

<GhostCard>
<Emoji text=":calendar:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> November 27, 2013<br />
<Emoji text=":desktop_computer:" size={1} mr={"0.5rem"} mb={"0.5rem"} /> <a href="https://web.archive.org/web/20140208030136/http://www.ethereum.org/">ethereum.org on waybackmachine</a>
</GhostCard>

<DocLink to="/whitepaper/" title="Whitepaper" />
