---
title: 最大可提取价值 (MEV)
description: 最大可提取价值 (MEV) 简介
lang: zh
---

最大可提取价值 (MEV) 是指通过在区块中添加和排除交易并更改区块中的交易顺序，可以从区块生产中提取的超过标准区块奖励和燃料费用的最大值。

### 矿工可提取价值 {#miner-extractable-value}

最大可提取价值首先应用于[工作量证明](/developers/docs/consensus-mechanisms/pow/)背景下，最初称为“矿工可提取价值”。 这是因为在工作量证明中，矿工掌握了交易的包含、排除和顺序。 然而，自从通过[合并](/upgrades/merge)过渡到权益证明以来，验证者一直负责这些角色，并且挖矿不再是以太坊协议的一部分。 但是，价值提取方法仍然存在，因此现在使用的是术语“最大可提取价值”。

## 前提条件 {#prerequisites}

确保你已熟悉[交易](/developers/docs/transactions/)、[区块](/developers/docs/blocks/)、[权益证明](/developers/docs/consensus-mechanisms/pos)和[燃料](/developers/docs/gas/)。 熟悉 [dapps](/dapps/) 和 [DeFi](/defi/) 也很有帮助。

## MEV 提取 {#mev-extraction}

从理论上讲，最大可提取价值完全属于验证者，因为他们是唯一可以保证执行有利可图的最大可提取价值机会的一方。 但实际上，大部分 MEV 是由称为“搜索人”的独立网络参与者提取的。 搜索人在区块链数据上运行复杂的算法来检测盈利的 MEV 机会，并且有机器人自动将这些盈利交易提交到网络。

无论如何，验证者确实会获得全部最大可提取价值金额的一部分，因为搜索者愿意支付高昂的燃料费用（这些费用将归验证者所有），以换取将其有利可图的交易纳入一个区块的更高可能性。 假定搜索人在经济上是合理的。搜索人愿意支付的燃料费将是 MEV 的 100% 的金额（因为如果燃料费更高，搜索人将亏钱）。

这样一来，对于一些竞争激烈的最大可提取价值机会，例如[去中心化交易所套利](#mev-examples-dex-arbitrage)，搜索者可能不得不将其最大可提取价值总收入的 90% 甚至更多作为燃料费用支付向验证者，因为很多人都想进行同样有利可图的套利交易。 这是因为，确保套利交易运行的唯一方法是提交最高 gas 费用的交易。

### 燃料高尔夫 {#mev-extraction-gas-golfing}

这种动态使得“燃料高尔夫”——编程交易——能够使用最少数量的燃料——这成为一种竞争优势。因为它允许搜索人设置较高的燃料价格，同时保持总燃料费不变(因为使用燃料费 = 燃料价格\* 燃料用量)。

一些著名的燃料高尔夫技术包括：使用用长串零开头的地址(如：[0x0000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306))，因为他们的需要的存储空间较少（因而燃料也减少）；并留下很小 [ERC-20](/developers/docs/standards/tokens/erc-20/) 令牌余额在合约中，因为相比于更新储存插槽，初始化存储插槽需要更多的燃料（余额为 0 时）。 寻找如何更多的减少 gas 使用是搜索人在积极研究的一个领域。

### 通用领跑者 {#mev-extraction-generalized-frontrunners}

一些搜索人并没有编写复杂的算法来检测盈利的 MEV 机会，而是运行通用的领跑者。 通用的领跑者是监控内存池以检测盈利交易的机器人。 领跑者将复制潜在的盈利交易代码，用领跑者的地址替换其地址。然后在本地执行交易，重复检查修改后的交易是否给领跑者地址带来利润。 如果交易确实有利可图，领跑者将以更替地址和更高的燃料价格提交修改后的交易。“领跑”原始交易并获取原始搜索人的 MEV。

### Flashbots {#mev-extraction-flashbots}

Flashbots 是一个独立项目，它通过一项服务扩展执行客户端，该服务允许搜索者将最大可提取价值交易提交给验证者，而无需将它们透露给公共内存池。 这就防止了交易被通用领跑者领跑。

## MEV 相关案例 {#mev-examples}

最大可提取价值以几种方式出现在区块链上。

### 去中心化交易所 (DEX) 套利 {#mev-examples-dex-arbitrage}

[去中心化交易所](/glossary/#dex) (DEX) 套利是最简单和最著名的最大可提取价值机会。 因此，它也是竞争最激烈的。

它的作用原理就像这样：如果有两个去中心化交易所以两种不同的价格提供一种代币，有人可以通过一笔原子交易，在价格较低的去中心化交易所购买此代币，并在价格较高的去中心化交易所将其出售。 得益于区块链的机制，这是真实的无风险套利。

[这是一个有利可图的套利交易示例](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4)，在此交易中，一名搜索者利用以太币/DAI 对在 Uniswap 和 Sushiswap 的不同价格，将 1, 000 个以太币变成了 1,045 个以太币。

### 清算 {#mev-examples-liquidations}

借贷协议清算提供了另一个众所周知的最大可提取价值机会。

Maker 和 Aave 等借贷协议要求用户存入一些抵押品（例如以太币）。 然后将这些存入的抵押品借出给其他用户。

然后，用户可以根据他们的需要从其他人那里借入资产和代币（例如，如果你想在 MakerDAO 治理提案中投票，你可以借用 MKR），最高可达他们所存抵押品的一定比例。 例如，如果借款金额不超过 30%，则将 100 DAI 存入协议的用户最多可以借入价值 30 DAI 的另一种资产。 该协议确定了确切的借款能力百分比。

随着借款人抵押品价值的波动，他们的借款能力也会波动。 如果由于市场波动，借入资产的价值超过其抵押品价值的 30%（同样，准确的百分比由协议确定，协议通常允许任何人清算抵押品，立即偿还贷款人（这类似于传统金融中的 [追加保证金通知](https://www.investopedia.com/terms/m/margincall.asp)）。 如果清算，借款人通常必须支付大笔清算费，其中有些是流向变现人的——这是多 MEV 机会出现的地方。

搜索人竞相以最快的速度解析区块链数据，以确定哪些借款人可以被清算，并成为第一个提交清算交易并自行收取清算费的人。

### 夹心交易 {#mev-examples-sandwich-trading}

夹心交易是另外一种 MEV 提取的常用方法。

为了实现夹心交易，搜索人会监视内存池内 DEX 的大额交易。 例如，有人想要在 Uniswap 上使用 DAI 购买 10,000 UNI。 这类大额交易会对 UNI/DAI 对产生重大的影响，可能会显着提高 UNI 相对于 DAI 的价格。

搜索人可以计算该大额交易对 UNI/DAI 对的大致价格影响，并在大额交易*之前*立即执行最优买单，低价买入 UNI，然后在大额交易*之后*立即执行卖单，以大额订单造成的更高价格卖出。

然而，夹心交易风险很高，因为它不是原子交易（不像上文所述的 DEX 套利），而且容易受到 [salmonella 攻击](https://github.com/Defi-Cartel/salmonella)。

### NFT MEV {#mev-examples-nfts}

NFT 领域的 MEV 是一种新兴现象，而且不一定能赚钱。

然而，由于 NFT 交易发生在所有其他以太坊交易共享的同一个区块链上，搜寻者也可以在 NFT 市场上使用与传统 MEV 机会类似的技术。

例如，如果有一个流行的 NFT 下降，并且搜索者想要某个 NFT 或一组 NFT，他们可以写一个交易，使他们成为第一个排队购买 NFT 的人，或者他们可以在一个交易中购买整个 NFT 组合。 或者，如果一个 NFT 被[错误地以低价挂出](https://www.theblockcrypto.com/post/113546/mistake-sees-69000-cryptopunk-sold-for-less-than-a-cent)，搜寻者就可以抢在其他购买者前面，低价抢购。

NFT MEV 的一个显著例子发生在一个搜寻者花费 700 万美元来[购买](https://etherscan.io/address/0x650dCdEB6ecF05aE3CAF30A70966E2F395d5E9E5)价格底线的每一个 Cryptopunk。 一位区块链研究员[在 Twitter](https://twitter.com/IvanBogatyy/status/1422232184493121538)上解释了买家是如何与 MEV 供应商合作以保持其购买的秘密。

### 长尾 {#mev-examples-long-tail}

DEX 套利、清算和三明治交易都是非常知名的 MEV 机会，对于新的搜寻者来说不太可能获利。 然而，还有一长串鲜为人知的 MEV 机会（NFT MEV 可以说是这样一个机会）。

刚刚起步的搜索者可能会通过在这个长尾搜索 MEV 而找到更多的成功。 Flashbots 的[MEV 招聘板](https://github.com/flashbots/mev-job-board)列出了一些新兴的机会。

## MEV 的影响 {#effects-of-mev}

MEV 并不都是坏事 - 以太坊的 MEV 既有积极的作用，也有消极的影响。

### 优点 {#effects-of-mev-the-good}

许多 DeFi 项目依靠经济上的理性行为者，来确保其协议的有用性和稳定性。 例如，DEX 套利确保用户为他们的代币获得最好、最正确的价格，而借贷协议在借款人低于抵押率时依靠快速清算来确保贷款人得到回报。

如果没有理性的搜索者寻求和修复经济上的低效率，并利用协议的经济激励，DeFi 协议和一般的 dapps 可能不会像今天这样强大。

### 缺点 {#effects-of-mev-the-bad}

在应用层，某些形式的 MEV，如夹心交易，会导致用户的体验明显变差。 被夹在中间的用户面临更高的滑点和更差的交易执行。

在网络层，一般的抢跑者和他们经常参与的矿工费拍卖（当两个或更多的先行者通过逐步提高自己交易的矿工费，从而使他们的交易被打包到下一个区块），导致网络拥堵和试图运行正常交易的其他人的高矿工费。

除了区块*内*发生的，MEV 也可能会在区块*间*产生有害的影响。 如果区块中可用的最大可提取价值大幅超过标准区块奖励，验证者可能会被激励重组区块并为自己捕获最大可提取价值，从而导致区块链重组和共识不稳定。

这种区块链重新组织的可能性已经[在以前的比特币区块链上探索过](https://dl.acm.org/doi/10.1145/2976749.2978408)。 随着比特币的区块奖励减半，交易费用占区块奖励的比例越来越大，于是出现了这样的情况：矿工放弃下一个区块的奖励，而用更高的费用重新开采过去的区块，这在经济上变得很合理。 随着 MEV 的发展，以太坊也可能出现同样的情况，威胁到区块链的完整性。

## MEV 的状况 {#state-of-mev}

2021 年初，MEV 开采量剧增，导致今年前几个月的矿工费价格极高。 Flashbots 的 MEV 中继的出现，降低了普通抢跑者的效力，并将矿工费价格拍卖带出链外，降低了普通用户的矿工费。

虽然许多搜索者仍然从最大可提取价值赚到了很多钱，但随着机会变得越来越广为人知，越来越多的搜索者争夺相同的机会，验证者将获得越来越多的最大可提取价值总收入（因为如最初描述的相同类型的燃料拍卖也在 Flashbots 中发生，尽管是私下进行的，验证者将获得由此产生的燃料收入）。 MEV 也不是以太坊独有的，随着以太坊上的机会变得越来越有竞争力，搜索者正在转移到其他区块链，如 Binance Smart Chain，那里存在与以太坊上类似的 MEV 机会，但竞争更少。

另一方面，从工作量证明到权益证明的过渡以及当前利用卷叠和分片持续进行以太坊扩容的努力，都在给最大可提取价值的竞争格局带来目前尚不明朗的改变。 与工作量证明中的概率模型相比，预先知道有保证的区块提议者会如何改变最大可提取价值提取的发展变化，以及当[单一秘密领导人选举](https://ethresear.ch/t/secret-non-single-leader-election/11789)和[分布式验证者技术](https://github.com/ethereum/distributed-validator-specs)得到实现后会如何颠覆当前格局，目前尚未可知。 同样，当大多数用户活动迁离以太坊并转移至其二层网络卷叠和分片时，存在哪些最大可提取价值机会还有待观察。

## 相关资源 {#related-resources}

- [Flashbots 文档](https://docs.flashbots.net/)
- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _最大可提取价值交易的仪表板和实时交易浏览器_

## 延伸阅读 {#further-reading}

- [什么是 MEV？](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV 和我](https://research.paradigm.xyz/MEV)
- [以太坊黑暗森林](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [逃离黑暗森林](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbos：在 MEV 危机中抢跑](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV 评论](https://twitter.com/bertcmiller/status/1402665992422047747)
- [以太坊漫游指南](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)
