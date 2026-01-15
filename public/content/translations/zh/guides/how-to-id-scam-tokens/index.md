---
title: 如何识别骗局代币
description: 了解骗局代币、它们如何进行伪装以及如何避免上当受骗。
lang: zh
---

# 如何识别诈骗代币 {#identify-scam-tokens}

以太坊最常见的用途之一是由一个团队来打造一种可以交易的代币，在某种意义上是他们自己的货币。 这些代币通常遵循 [ERC-20](/developers/docs/standards/tokens/erc-20/) 标准。 然而，任何存在可以带来价值的合法使用场景的地方，就会有试图窃取那些价值的犯罪分子。

他们欺诈你的方式有两种：

- **向您兜售诈骗代币**，这些代币可能看起来像是您想购买的合法代币，但实际上是诈骗者发行的，一文不值。
- **诱骗您签署恶意交易**，通常是通过将您引导至他们自己的用户界面。 骗子可能会诱导你向他们的合约授予 ERC-20 代币的访问许可，从而向他们泄露敏感信息，以便其获取你的资产的访问权限等。 这些用户界面可能会非常像正规网站，但暗藏玄机。

为了说明什么是诈骗代币以及如何识别它们，我们将看一个例子：[`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82)。 该代币试图冒充合法的 [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) 代币。

<ExpandableCard
title="What is ARB?"
contentPreview=''>

Arbitrum 是一个开发和管理[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)的组织。 最初，Arbitrum 是一家以营利为目的的公司，但后来采取了去中心化步骤。 作为该进程的一部分，他们发布了一个可交易的[治理代币](/dao/#token-based-membership)。

</ExpandableCard>

<ExpandableCard
title="Why is the scam token called wARB?"
contentPreview=''>

以太坊有一条约定，即当一项资产不符合 ERC-20 标准时，我们会创建一个该资产的“包装”版本，其名称以“w”开头。 例如，我们用 wBTC 表示比特币的包装版本，用 <a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">wETH 表示以太坊的包装版本</a>。

创建已经在以太坊存在的 ERC-20 代币的包装版本没有意义，但骗子希望借此制造合法的外观，而不顾真实的基本情况。

</ExpandableCard>

## 骗局代币如何运作？ {#how-do-scam-tokens-work}

以太坊的核心是去中心化。 这意味着不存在可以没收你的资产或禁止你部署智能合约的中心化机构。 但这也意味着骗子可以任意部署他们想要的任何智能合约。

<ExpandableCard
title="What are smart contracts?"
contentPreview=''>

[智能合约](/developers/docs/smart-contracts/)是运行在以太坊区块链上的程序。 例如，每个 ERC-20 代币都是以智能合约的形式实现的。

</ExpandableCard>

具体来说，Arbitrum 部署了一个使用符号 `ARB` 的合约。 但是这并不能阻止其他人也部署使用完全相同的代币符号或类似符号的智能合约。 编写合约的任何人都可以设置合约的用途。

## 看似合法 {#appearing-legitimate}

骗局代币的创建人会使用几种手段将其代币伪装成合法代币。

- **合法的名称和符号**。 如前所述，ERC-20 合约的符号和名称可以与其他 ERC-20 合约相同。 你不能依赖这些字段来判断代币安全性。

- **合法的持有者**。 骗局代币经常向那些可能被认为是真实代币的合法持有人的地址空投大量代币余额。

  例如，我们再来看看 `wARB`。 [大约 16% 的代币](https://eth.blockscout.com/token/0xb047c8032b99841713b8E3872F06cF32beb27b82?tab=holders)由一个地址持有，其公开标签是 [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F)。 这不是一个虚假地址，它确实是[在以太坊主网上部署真正 ARB 合约](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670)的地址。

  因为地址的 ERC-20 余额是 ERC-20 合约的存储空间的一部分，合约开发者可以根据需要指定其余额为任何值。 合约也可以禁止转账，让合法用户无法消除这些骗局代币。

- **合法的转账**。 _合法持有者不会付费将诈骗代币转给他人，所以如果有转账记录，就一定是合法的，对吗？_ **错**。 `Transfer` 事件是由 ERC-20 合约生成的。 骗子可以轻松编写合约，生成这些事件。

## 诈骗网站 {#websites}

骗子也可以制作非常逼真的网站，有时甚至会精确克隆真实网站，用户界面完全相同，但暗藏陷阱。 例如，看似合法的外部链接实际上会将用户发送到外部诈骗网站，或者错误的说明会引导用户暴露密钥或将资金发送到攻击者的地址。

避免这种情况的最佳做法是仔细检查所访问网站的网址，并将已知真实网站的地址保存在书签中。 这样，你就可以通过书签访问真实网站，不会发生意外拼写错误或依赖外部链接。

## 如何保护自己？ {#protect-yourself}

1. **检查合约地址**。 合法的代币来自合法的组织，你可以在组织的网站上查看其合约地址。 例如，[您可以在此处查看 `ARB` 的合法地址](https://docs.arbitrum.foundation/deployment-addresses#token)。

2. **真正的代币具有流动性**。 另一种方法是查看 [Uniswap](https://uniswap.org/) 上的流动性池大小，这是最常见的代币交换协议之一。 该协议使用流动性资金池运作，投资者将代币存入流动性资金池中，通过交易费获利。

骗局代币的流动性资金池通常非常小，或者根本没有，因为骗子不想冒险使用真实资产。 例如，`ARB`/`ETH` Uniswap 池持有约一百万美元（[在此处查看最新价值](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)），买卖少量不会对价格产生影响：

![购买合法代币](./uniswap-real.png)

但当您试图购买诈骗代币 `wARB` 时，即使是极小额的购买也会使价格变动超过 90%：

![购买诈骗代币](./uniswap-scam.png)

这是另一个证据，表明 `wARB` 不太可能是合法代币。

3. **在 Etherscan 中查看**。 许多骗局代币已经被社区识别并报告。 此类代币在 [Etherscan 中有标记](https://info.etherscan.com/etherscan-token-reputation/)。 尽管 Etherscan 不是权威信息来源（去中心化网络的性质决定了不可能存在关于合法性的权威信息来源），但被 Etherscan 标记为骗局代币的代币很可能就是骗局代币。

   ![Etherscan 中的诈骗代币](./etherscan-scam.png)

## 结论 {#conclusion}

只要世界上有价值，就会有骗子试图将其窃为己有，而在一个去中心化的世界里，除了你自己，没人能保护你。 请记住以下几点，它们可以帮助你区分合法代币和骗局代币：

- 骗局代币会伪装成合法代币，它们会使用相同的名称、符号等。
- 诈骗代币_无法_使用相同的合约地址。
- 获取合法代币地址的最佳渠道是该代币所属的发行机构。
- 如果做不到，您可以使用热门、可信的应用程序，例如 [Uniswap](https://app.uniswap.org/#/swap) 和 [Blockscout](https://eth.blockscout.com/)。
