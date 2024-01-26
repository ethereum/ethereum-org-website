---
title: 如何实现ERC-721市场
description: 如何在一个去中心化的分类信息板上销售代币化的物品。
author: "Alberto Cuesta Cañada"
tags:
  - "智能合约"
  - "erc-721"
  - "solidity"
  - "代币"
skill: intermediate
lang: zh
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

在这篇文章中，我要向您展示如何针对以太坊区块链来开发一个类似于 Craigslist 的 物品分类信息网站。

在 Gumtree、Ebay 和 Craigslist 等网站没有出现的时候，分类信息板大多是由软木或纸制成的。 学校走廊、报纸、路灯、店面周围都有这种分类信息板。

所有这一切都随着互联网的出现而被改变了。 能够看到某种特殊的分类信息板的人数增加了许多数量级。 随着互联网技术的发展，这些信息板背后所代表的市场也变得更加有效率，同时也更容易扩展到全球范围。 Ebay 作为一个庞大的业务，其商业模式的源头就是这些实际存在的分类信息板。

区块链技术可以再一次重塑这种商业市场的形态，接下来让我来向您展示这一点是如何发生的。

## 货币化 {#monetization}

基于公共区块链技术的分类信息板的商业模式和 Ebay 及普通的公司有显著的不同。

首先，这种商业模式有[一个去中心化的视角](/developers/docs/web2-vs-web3/)。 目前现存的平台都需要维护自己的服务器。 去中心化的平台是由其用户来维护的，因此其核心平台的成本从平台所有者的角度来讲会降至零。

中心化平台有前端界面，后台网站或者可以访问该去中心化平台的接口。 它同时也会有许多其他选择。 平台所有者可以限制客户的访问并强制每个人使用他们的接口，并收取费用。 平台所有者还可以决定是否开放访问权限（这是对普通用户的一种强权!），并让任何人构建与平台的接口。 或者平台所有者可以在这些极端情况中决定任何方法。

_比我更有远见的商业领袖知道如何将其货币化。 我所看到的是，这与现状不同，并且可能是有利可图的。_

此外，还可以从自动化和支付的角度来看问题。 在分类信息板中，有些东西可以[非常有效地代币化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) ，并产生交易。 代币化的资产很容易在区块链中转移。 高度复杂的支付方式可以在区块链中被轻松实现。

我在这里嗅到了一个商机。 通过区块链技术，可以轻松实现一个无需运行成本的分类信息板。复杂的支付路径被包含到了每笔交易里。 我相信有人会想出一个关于如何使用它的创意。

我很高兴来建造它。 接下来，让我们来看看代码。

## 实现 {#implementation}

前段时间我们启动了一个[开源项目](https://github.com/HQ20/contracts?ref=hackernoon.com)，其中包含了一些商业案例的示例实现和其他相关的资源，推荐您看一看。

这个[以太坊分类信息板](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)的代码在那里，请使用并研究它。 请注意，这个项目的代码尚未经过审核，您在把资金投入这个项目之前需要进行代码的尽职审查。

这个项目的基础并不复杂。 分类信息板中的所有广告是一个包含几个字段的结构体：

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

因此，字段“Poster”是指发布这个广告的人。 “Item”是指需要售卖的物品。 “Price”字段是指该物品的价格。 “Status”字段是指这笔交易的执行状态，可以是“open”、“executed”、“cancelled”。

所有的这些交易将被报存到一个映射中。 因为 Solidity 中的一切事物似乎都是映射。 也是因为这种方式比较方便。

```solidity
mapping(uint256 => Trade) public trades;
```

使用映射是因为我们需要在广告发布前，给每个广告赋予一个 id，同时在我们操作广告前，也需要知道广告的 id。 在智能合约或前端有多种处理方法。 请询问您是否需要一些提示。

接下来的问题是我们需要处理哪些物品，以及用于支付交易的货币是什么。

对于物品，我们只是要求它们实现[ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)的接口。这实际上只是一种在区块链中表示现实世界物品的方式，

尽管它最适合数字资产。 我们将在构造函数中定制化我们自己的 ERC721 合约，这意味着我们分类信息板中的任何资产都需要事先被代币化。

对于付款，我们将做类似的事情。 大多数区块链项目定义了自己的[ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com)加密货币。 其他一些人更喜欢使用像 DAI 这样的主流技术。 在这个分类信息板的应用中，您只需要在构造函数里决定您构建的货币是什么。 很容易。

```solidity
constructor (
address _currencyTokenAddress, address _itemTokenAddress
) public {
 currencyToken = IERC20(_currencyTokenAddress);
itemToken = IERC721(_itemTokenAddress);
tradeCounter = 0;
}
```

目前我们到达这里了。 我们有广告、用于交易的商品和用来付款的货币。 制作一个广告意味着将同一个物品放在托管中，以表明您拥有它并且您没有发布它两次，可能是在不同的分类信息板上。

下面的代码正是这样做的。 将物品放在托管中，制作广告，做一些记账操作。

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

接受交易意味着选择某个广告（交易）、支付价格、接收物品。 以下的代码用来获取交易。 检查它是否可用。 支付该物品的费用。 获取物品。 更新广告信息。

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

最后，我们可以选择让卖家在买家接受之前退出交易。 在某些模型中，广告会在过期前保留一段时间。 您的选择，具体取决于您的市场设计。

该代码与用于执行交易的代码非常相似，只是没有货币交换。同时该物品返回到广告的发行方。

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

就是这样。 您已经浏览到了该代码实现的末尾。 令人惊讶的是，一些业务概念在用代码表达时是多么紧凑，这就是其中一个例子。 请在[我们的代码库中](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)查看完整的合约代码。

## 总结 {#conclusion}

分类信息板是一种易于在互联网技术的帮助下大规模扩张的常见市场结构，也是一种容易形成少数垄断赢家的非常流行的商业模式。

分类信息板也恰好是在区块链环境中容易进行复制的一种简单工具，具有可以挑战现有的巨头的非常具体的功能。

在本文中，我尝试将分类信息板的商业业务与技术实现结合起来进行讲解。 如果您拥有合适的技能，这些知识应该可以帮助您创建愿景和实施路线图。

与往常一样，如果您想构建任何有趣的东西并希望得到一些建议，[请给我留言！](https://albertocuesta.es/) 我总是很乐意为您提供帮助。
