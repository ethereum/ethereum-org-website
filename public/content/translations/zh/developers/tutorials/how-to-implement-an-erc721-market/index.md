---
title: "如何实现一个 ERC-721 市场"
description: "如何在去中心化分类广告板上出售代币化物品"
author: "阿尔贝托·奎斯塔·卡尼亚达"
tags: ["智能合约", "erc-721", "Solidity", "代币"]
skill: intermediate
breadcrumb: "ERC-721 市场"
lang: zh
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

在本文中，我将向你展示如何为以太坊区块链编写一个类似 Craigslist 的程序。

在 Gumtree、Ebay 和 Craigslist 出现之前，分类广告板大多由软木或纸制成。学校走廊、报纸、路灯和店面里都有分类广告板。

互联网改变了这一切。能够看到特定分类广告板的人数呈指数级增长。随之而来的是，它们所代表的市场变得更加高效，并扩展到了全球规模。Ebay 是一家庞大的企业，其起源就可以追溯到这些实体分类广告板。

随着区块链的出现，这些市场将再次发生改变，让我来告诉你如何实现。

## 盈利模式 {#monetization}

公共区块链分类广告板的商业模式将需要与 Ebay 等公司有所不同。

首先是[去中心化角度](/developers/docs/web2-vs-web3/)。现有平台需要维护自己的服务器。而去中心化的平台由其用户维护，因此对于平台所有者来说，运行核心平台的成本降至零。

其次是前端，即提供平台访问权限的网站或界面。这里有很多选择。平台所有者可以限制访问，强制每个人使用他们的界面并收取费用。平台所有者也可以决定开放访问权限（将权力交还给人民！），让任何人都能为平台构建界面。或者，所有者可以决定采取介于这两个极端之间的任何方法。

_比我更有远见的商业领袖会知道如何从中盈利。我所看到的只是这与现状不同，并且可能有利可图。_

此外，还有自动化和支付角度。有些东西可以非常[有效地被代币化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)并在分类广告板上进行交易。代币化资产在区块链中很容易转移。高度复杂的支付方式也可以在区块链中轻松实现。

我只是在这里嗅到了商机。一个没有运行成本的分类广告板可以很容易地实现，并且每笔交易中都可以包含复杂的支付路径。我相信有人会想出如何利用它的好主意。

我只是很乐意去构建它。让我们来看看代码。

## 实现 {#implementation}

不久前，我们启动了一个[开源代码库](https://github.com/HQ20/contracts?ref=hackernoon.com)，其中包含商业案例的示例实现和其他好东西，请看一看。

这个[以太坊分类广告板](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)的代码就在那里，请随意使用和测试。只需注意，该代码尚未经过审计，在投入资金之前，你需要做好自己的尽职调查。

广告板的基础并不复杂。广告板中的所有广告都只是一个包含几个字段的结构体：

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // 开启，已执行，已取消
}
```

因此，有人发布广告。一件待售物品。物品的价格。交易的状态（可以是开放、已执行或已取消）。

所有这些交易都将保存在一个映射中。因为在 Solidity 中，似乎一切都是映射。也因为这样很方便。

```solidity
mapping(uint256 => Trade) public trades;
```

使用映射只是意味着我们必须在发布每个广告之前为其生成一个 ID，并且在对其进行操作之前，我们需要知道该广告的 ID。在智能合约或前端中，有多种方法可以处理这个问题。如果你需要一些指导，请随时提问。

接下来要解决的问题是，我们处理的这些物品是什么，以及用于支付交易的货币是什么。

对于物品，我们只要求它们实现 [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) 接口，这实际上只是在区块链中表示现实世界物品的一种方式，尽管它[最适合数字资产](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)。我们将在构造函数中指定我们自己的 ERC721 合约，这意味着我们分类广告板中的任何资产都需要事先被代币化。

对于支付，我们将采取类似的做法。大多数区块链项目都定义了自己的 [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) 加密货币。其他一些项目则更喜欢使用像 DAI 这样的主流加密货币。在这个分类广告板中，你只需要在构造时决定你的货币是什么。非常简单。

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

我们快完成了。我们有了广告、用于交易的物品和用于支付的货币。制作广告意味着将物品放入托管中，以证明你拥有它，并且你没有将其重复发布（可能在不同的广告板上）。

下面的代码正是这样做的。将物品放入托管，创建广告，并执行一些清理工作。

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

接受交易意味着选择一个广告（交易），支付价格，接收物品。下面的代码检索一笔交易。检查其是否可用。支付物品。检索物品。更新广告。

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

最后，我们为卖家提供了一个选项，可以在买家接受交易之前退出交易。在某些模式中，广告会在一段时间内有效，然后过期。这取决于你对市场的设计。

这段代码与用于执行交易的代码非常相似，只是没有货币易手，物品会退还给广告发布者。

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

就是这样。你已经完成了实现的最后一步。令人惊讶的是，一些商业概念在用代码表达时是如此紧凑，这就是其中一个例子。请[在我们的代码库中](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)查看完整的合约。

## 结论 {#conclusion}

分类广告板是一种常见的市场配置，随着互联网的发展而大规模扩展，成为一种非常受欢迎的商业模式，并产生了一些垄断性的赢家。

分类广告板碰巧也是一种很容易在区块链环境中复制的工具，其非常具体的特性将使挑战现有巨头成为可能。

在本文中，我尝试将分类广告板业务的商业现实与技术实现联系起来。如果你具备相应的技能，这些知识应该能帮助你制定愿景和实施路线图。

一如既往，如果你打算构建任何有趣的东西并希望得到一些建议，请[给我留言](https://albertocuesta.es/)！我总是很乐意提供帮助。