---
title: 最大可提取价值 (MEV)
description: 最大可提取价值 (MEV) 简介
lang: zh
---

最大可提取价值 (MEV) 是指通过在区块中添加和排除交易并更改区块中的交易顺序，可以从区块生产中提取的超过标准区块奖励和燃料费用的最大值。

### 矿工可提取价值

这一概念最先应用在[工作量证明](/developers/docs/consensus-mechanisms/pow/)的背景下，最初被称为“矿工可提取价值”。 这是因为在工作量证明中，矿工掌握了交易的包含、排除和顺序。 然而，在通过[合并](/upgrades/merge)过渡为权益证明后，验证者将负责这些角色，而挖矿将不再适用。 此处介绍的价值提取方法在这次过渡后仍将保留，因此需要更改名称。 为了继续使用相同的首字母缩写词以便确保延续性，同时保持相同基本含义，现在使用“最大可提取价值”作为更具包容性的替代词。

## 先决条件 {#prerequisites}

请确保您熟悉 [交易](/developers/docs/transactions/), [区块](/developers/docs/blocks/), [gas](/developers/docs/gas/), 和 [挖矿](/developers/docs/consensus-mechanisms/pow/mining/) 熟悉 [dapps](/dapps/) 和 [DeFi](/defi/) 也很有帮助。

## MEV 提取 {#mev-extraction}

理论上讲，矿工可提取价值的累积完全取决于矿工，因为矿工是唯一能保证可获利的挖矿行为得到执行的一方（至少是在当前的工作量证明链中是这样 — 这将在[合并](/upgrades/merge/)后发生改变）。 但实际上，大部分 MEV 是由称为“搜索人”的独立网络参与者提取的。 搜索人在区块链数据上运行复杂的算法来检测盈利的 MEV 机会，并且有机器人自动将这些盈利交易提交到网络。

矿工确实能够获得全额 MEV 的一部分，因为搜索人愿意支付高昂的 gas 费用（向矿工支付），以换取将他们的盈利交易纳入区块的更高机会。 假定搜索人在经济上是合理的。 搜索人愿意支付的 gas 费将是 MEV 的 100% 的金额(因为如果 gas 费更高， 搜索人将亏钱)。

在这种情况下，对于一些高度竞争的 MEV 机会，例如 [DEX arbitrage](#mev-examples-dex-arbitrage), 搜索者可能必须向矿工支付 90% 甚至更多的 MEV 总收入，因为很多人同时想运行同样的套利交易。 这是因为，确保套利交易运行的唯一方法是提交最高 gas 费用的交易。

### 燃料高尔夫 {#mev-extraction-gas-golfing}

这种动态使得 “gas 高尔夫”——编程交易——能够使用最少数量的 gas——这成为一种竞争优势。 因为它允许搜索人设置较高的 gas 价格，同时保持总 gas 费不变(因为使用 gas 费 = gas 价格\* gas 用量)。

一些著名的 gas 高尔夫技术包括：使用用长串零开头的地址(如： [0x000000000000C521824EaFf97Eac7B73B084ef9306](https://etherscan.io/address/0x0000000000c521824eaff97eac7b73b084ef9306))，因为他们的需要的存储空间较少 (因而 gas 也减少)； 并留下很小 [ERC-20](/developers/docs/standards/tokens/erc-20/) 令牌余额在合约中， 因为相比于更新储存插槽，初始化存储槽需要更多的 gas (余额为 0 时)。 寻找如何更多的减少 gas 使用是搜索人在积极研究的一个领域。

### 通用领跑者 {#mev-extraction-generalized-frontrunners}

一些搜索人并没有编写复杂的算法来检测盈利的 MEV 机会，而是运行通用的领跑者。 通用的领跑者是监控内存池以检测盈利交易的机器人。 领跑者将复制潜在的盈利交易代码，用领跑者的地址替换其地址。然后在本地执行交易，重复检查修改后的交易是否给领跑者地址带来利润。 如果交易确实有利可图，领跑者将以更替地址和更高的 gas 价格提交修改后的交易。 “领跑”原始交易并获取原始搜索人的 MEV。

### Flashbots {#mev-extraction-flashbots}

Flashbots 是一个独立的项目，它将 go-ethereum 客户端扩展，提供的服务使搜索人能够向矿工提交 MEV 交易，而不向公共内存池披露。 这就防止了交易被通用领跑者领跑。

截至本文撰写时，MEV 交易的很大一部分是通过 Flashbots 来进行的，这意味着通用的领跑人不如过去那样有效。

## MEV 相关案例 {#mev-examples}

MEV 以几种方式出现在区块链上。

### 去中心化交易所 (DEX) 套利 {#mev-examples-dex-arbitrage}

[去中心化交易所](/glossary/#dex) (DEX) 套利是最简单和最著名的 MEV 机会。 因此，它也是最具竞争性的。

它的作用就像这样：如果两种 DEXes 以两种不同的价格提供一个通证。 有人可以在较低价格的 DEX 上购买通证，然后在交易中以较高价格的 DEX 出售它。 多亏了区块链的机制，这是真实的，无风险的套利。

[这是一个有利可图的套利交易的示例](https://etherscan.io/tx/0x5e1657ef0e9be9bc72efefe59a2528d0d730d478cfc9e6cdd09af9f997bb3ef4), 在这个交易中，一个搜索人将 1, 000 ETH 变成了 1,045 ETH，它利用 ETH/DAI 交易对在 Uniswap 和 Sushiswap 的不同价格。

### 清算 {#mev-examples-liquidations}

贷款协议的清算提供了另一个众所周知的 MEV 机会。

通过要求用户存放某种抵押品 (如 ETH) 的方式出借协议，如 Maker 和 Aave 的功能。 然后，用户可以根据需要从其他人处借入不同的资产和通证（例如，如果他们想对 MakerDAO 治理方案进行投票，他们可以借入 MKR，如果他们想在 Sushis Swap 上赚取一部分交易费用，他们可以借入 SUSHI），最高可借入其存放抵押品的一定金额-例如，30%（准确的借用功率百分比由协议确定）。 在这种情况下，他们从其他通证借出的用户充当出借人。

随着借款人抵押品价值的波动，他们的借款能力也会波动。 如果由于市场波动，借入资产的价值超过其抵押品价值的 30%（同样，准确的百分比由协议确定，协议通常允许任何人清算抵押品，立即偿还贷款人（这类似于传统金融中的 [追加保证金通知](https://www.investopedia.com/terms/m/margincall.asp)）。 如果清算，借款人通常必须支付大笔清算费， 其中有些是流向变现人的——这是多 MEV 机会出现的地方。

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

刚刚起步的搜索者可能会通过在这个长尾搜索 MEV 而找到更多的成功。 Flashbot 的[MEV 招聘板](https://github.com/flashbots/mev-job-board)列出了一些新兴的机会。

## MEV 的影响 {#effects-of-mev}

MEV 并不都是坏事 - 以太坊的 MEV 既有积极的作用，也有消极的影响。

### 优点 {#effects-of-mev-the-good}

许多 DeFi 项目依靠经济上的理性行为者，来确保其协议的有用性和稳定性。 例如，DEX 套利确保用户为他们的代币获得最好、最正确的价格，而借贷协议在借款人低于抵押率时依靠快速清算来确保贷款人得到回报。

如果没有理性的搜索者寻求和修复经济上的低效率，并利用协议的经济激励，DeFi 协议和一般的 dapps 可能不会像今天这样强大。

### 缺点 {#effects-of-mev-the-bad}

在应用层，某些形式的 MEV，如夹心交易，会导致用户的体验明显变差。 被夹在中间的用户面临更高的滑点和更差的交易执行。

在网络层，一般的抢跑者和他们经常参与的矿工费拍卖（当两个或更多的先行者通过逐步提高自己交易的矿工费，从而使他们的交易被打包到下一个区块），导致网络拥堵和试图运行正常交易的其他人的高矿工费。

除了区块*内*发生的，MEV 也可能会在区块*间*产生有害的影响。 如果一个区块中可用的 MEV 大大超过了标准区块的奖励，矿工可能会被激励重新开采区块并为自己捕获 MEV，导致区块链的重新组织和共识的不稳定。

这种区块链重新组织的可能性已经[在以前的比特币区块链上探索过](https://dl.acm.org/doi/10.1145/2976749.2978408)。 随着比特币的区块奖励减半，交易费用占区块奖励的比例越来越大，于是出现了这样的情况：矿工放弃下一个区块的奖励，而用更高的费用重新开采过去的区块，这在经济上变得很合理。 随着 MEV 的发展，以太坊也可能出现同样的情况，威胁到区块链的完整性。

## MEV 的状况 {#state-of-mev}

2021 年初，MEV 开采量剧增，导致今年前几个月的矿工费价格极高。 Flashbots 的 MEV 中继的出现，降低了普通抢跑者的效力，并将矿工费价格拍卖带出链外，降低了普通用户的矿工费。

虽然许多搜寻者仍在从 MEV 中赚取丰厚的利润，但随着机会变得更加知名，越来越多的搜寻者竞争相同的机会，矿工将捕获越来越多的 MEV 总收入（因为上文最初描述的那种矿工费拍卖也发生在 Flashbots 中，尽管是私下的，矿工将捕获由此产生的矿工费）。 MEV 也不是以太坊独有的，随着以太坊上的机会变得越来越有竞争力，搜索者正在转移到其他区块链，如 Binance Smart Chain，那里存在与以太坊上类似的 MEV 机会，但竞争更少。

随着 DeFi 的发展和普及，MEV 可能很快就会大大超过以太坊区块的基础奖励。 随之而来的是，自私的区块链和共识不稳定的可能性越来越大。 一些人认为这是对以太坊的生存威胁，而抑制自私挖矿是以太坊协议理论的一个积极研究领域。 目前正在探索的一个解决方案是 [MEV 奖励平滑](https://ethresear.ch/t/committee-driven-mev-smoothing/10408)。

## 相关资源 {#related-resources}

- [Flashbots GitHub](https://github.com/flashbots/pm)
- [MEV-Explore](https://explore.flashbots.net/) _MEV 交易的仪表板和实时交易浏览器_

## 延伸阅读 {#further-reading}

- [什么是 MEV？](https://blog.chain.link/what-is-miner-extractable-value-mev/)
- [MEV 和我](https://research.paradigm.xyz/MEV)
- [以太坊黑暗森林](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest/)
- [逃离黑暗森林](https://samczsun.com/escaping-the-dark-forest/)
- [Flashbos：在 MEV 危机中抢跑](https://medium.com/flashbots/frontrunning-the-mev-crisis-40629a613752)
- [@bertcmiller's MEV 评论](https://twitter.com/bertcmiller/status/1402665992422047747)
