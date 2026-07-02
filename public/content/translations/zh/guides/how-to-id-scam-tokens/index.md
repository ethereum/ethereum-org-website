---
title: "如何识别诈骗代币"
description: "了解诈骗代币，它们如何伪装成合法代币，以及如何避免上当受骗。"
lang: zh
---

以太坊最常见的用途之一是让一个群体创建一种可交易的代币，在某种意义上就是他们自己的货币。这些代币通常遵循一个标准，即 [ERC-20](/developers/docs/standards/tokens/erc-20/)。然而，只要有带来价值的合法用例，就会有试图为自己窃取该价值的犯罪分子。

他们通常会通过以下两种方式欺骗你：

- **向你出售诈骗代币**，这些代币看起来可能像你想购买的合法代币，但实际上是由诈骗者发行的，毫无价值。
- **诱骗你签名恶意交易**，通常是通过将你引导至他们自己的用户界面。他们可能会试图让你为他们的合约提供 ERC-20 代币的授权额度，暴露敏感信息从而让他们能够访问你的资产等。这些用户界面可能是真实网站的近乎完美的克隆版，但暗藏玄机。

为了说明什么是诈骗代币以及如何识别它们，我们将看一个例子：[`wARB`](https://eth.blockscout.com/token/0xB047c8032b99841713b8E3872F06cF32beb27b82)。该代币试图伪装成合法的 [`ARB`](https://eth.blockscout.com/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1) 代币。

<ExpandableCard
title="什么是 ARB？"
contentPreview=''>

Arbitrum 是一个开发和管理[乐观汇总 (optimistic rollups)](/developers/docs/scaling/optimistic-rollups/)的组织。最初，Arbitrum 是一家营利性公司，但随后采取了去中心化的措施。作为该过程的一部分，他们发行了一种可交易的[治理代币](/dao/#token-based-membership)。

</ExpandableCard>

<ExpandableCard
title="为什么诈骗代币叫 wARB？"
contentPreview=''>

在以太坊中有一个惯例，当一种资产不符合 ERC-20 标准时，我们会创建一个“封装”版本，其名称以“w”开头。例如，我们有代表比特币的 wBTC 和<a href="https://cointelegraph.com/news/what-is-wrapped-ethereum-weth-and-how-does-it-work">代表以太币的 wETH</a>。

为已经在以太坊上的 ERC-20 代币创建封装版本是没有意义的，但诈骗者依赖的是表面上的合法性，而不是底层的真实情况。

</ExpandableCard>

## 诈骗代币是如何运作的？ {#how-do-scam-tokens-work}

以太坊的核心在于去中心化。这意味着没有中央机构可以没收你的资产或阻止你部署智能合约。但这也意味着诈骗者可以部署他们想要的任何智能合约。

<ExpandableCard
title="什么是智能合约？"
contentPreview=''>

[智能合约](/developers/docs/smart-contracts/)是在以太坊区块链上运行的程序。例如，每一个 ERC-20 代币都是作为智能合约实现的。

</ExpandableCard>

具体来说，Arbitrum 部署了一个使用符号 `ARB` 的合约。但这并不能阻止其他人也部署一个使用完全相同或相似符号的合约。编写合约的人可以设定该合约将执行的操作。

## 伪装成合法代币 {#appearing-legitimate}

诈骗代币的创建者会使用几种伎俩来让自己显得合法。

- **合法的名称和符号**。如前所述，ERC-20 合约可以拥有与其他 ERC-20 合约相同的符号和名称。你不能依赖这些字段来保证安全。

- **合法的所有者**。诈骗代币通常会向那些有望成为真实代币合法持有者的地址空投大量余额。

  例如，让我们再看看 `wARB`。[大约 16% 的代币](https://eth.blockscout.com/token/0xb047c8032b99841713b8e3872f06cf32beb27b82?tab=holders)由一个公共标签为 [Arbitrum Foundation: Deployer](https://eth.blockscout.com/address/0x1C8db745ABe3C8162119b9Ef2c13864Cd1FDD72F) 的地址持有。这_不是_一个假地址，它确实是[在以太坊主网上部署真实 ARB 合约](https://eth.blockscout.com/tx/0x242b50ab4fe9896cb0439cfe6e2321d23feede7eeceb31aa2dbb46fc06ed2670)的地址。

  因为一个地址的 ERC-20 余额是 ERC-20 合约存储的一部分，所以它可以由合约指定为合约开发者想要的任何值。合约也有可能禁止转账，这样合法用户就无法摆脱这些诈骗代币。

- **合法的转账**。_合法所有者不会花钱将诈骗代币转账给其他人，所以如果有转账，它一定是合法的，对吧？_ **错**。`Transfer` 事件是由 ERC-20 合约产生的。诈骗者可以很容易地以产生这些操作的方式编写合约。

## 诈骗网站 {#websites}

诈骗者还可以制作非常有说服力的网站，有时甚至是真实网站的精确克隆版，具有相同的用户界面，但带有微妙的陷阱。例如，看似合法的外部链接实际上将用户发送到外部诈骗网站，或者错误的指令引导用户暴露他们的密钥或将资金发送到攻击者的地址。

避免这种情况的最佳做法是仔细检查你访问的网站的 URL，并将已知真实网站的地址保存在你的书签中。然后，你可以通过书签访问真实网站，而不会意外拼写错误或依赖外部链接。

## 你该如何保护自己？ {#protect-yourself}

1. **检查合约地址**。合法的代币来自合法的组织，你可以在该组织的网站上看到合约地址。例如，[对于 `ARB`，你可以在这里看到合法地址](https://docs.arbitrum.foundation/deployment-addresses#token)。

2. **真实的代币具有流动性**。另一个选择是查看 [尤尼斯瓦普 (Uniswap)](https://uniswap.org/) 上的流动性池规模，这是最常见的代币交换协议之一。该协议使用流动性池运作，投资者将他们的代币存入其中，以期从交易费中获得回报。

诈骗代币通常只有极小的流动性池（如果有的话），因为诈骗者不想拿真实资产冒险。例如，`ARB`/`ETH` 尤尼斯瓦普池持有大约一百万美元（[在此处查看最新价值](https://app.uniswap.org/explore#/pools/0x755e5a186f0469583bd2e80d1216e02ab88ec6ca)），买卖少量代币不会改变价格：

![Buying a legitimate token](./uniswap-real.png)

但是，当你尝试购买诈骗代币 `wARB` 时，即使是极少量的购买也会使价格变动超过 90%：

![Buying a scam token](./uniswap-scam.png)

这是另一个向我们表明 `wARB` 不太可能是合法代币的证据。

3. **在 Etherscan 中查看**。许多诈骗代币已经被社区识别并举报。此类代币[在 Etherscan 中会被标记](https://info.etherscan.com/etherscan-token-reputation/)。虽然 Etherscan 不是权威的真相来源（去中心化网络的性质决定了不可能有权威的合法性来源），但被 Etherscan 识别为诈骗的代币很可能就是诈骗代币。

   ![Scam token in Etherscan](./etherscan-scam.png)

## 结论 {#conclusion}

只要世界上存在价值，就会有试图将其据为己有的诈骗者，而在一个去中心化的世界里，除了你自己，没有人能保护你。希望你能记住以下几点，以帮助区分合法代币和诈骗代币：

- 诈骗代币会冒充合法代币，它们可以使用相同的名称、符号等。
- 诈骗代币_不能_使用相同的合约地址。
- 获取合法代币地址的最佳来源是发行该代币的组织。
- 如果做不到这一点，你可以使用流行且受信任的应用程序，例如 [尤尼斯瓦普 (Uniswap)](https://app.uniswap.org/#/swap) 和 [Blockscout](https://eth.blockscout.com/)。
