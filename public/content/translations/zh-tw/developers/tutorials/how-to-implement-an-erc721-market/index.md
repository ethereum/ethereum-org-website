---
title: 如何實作 ERC-721 市場
description: 如何在去中心化分類廣告板上出售代幣化物品
author: 阿爾貝托·庫埃斯塔·卡納達
tags:
  - 智能合約
  - erc-721
  - solidity
  - 代幣
skill: intermediate
breadcrumb: ERC-721 市場
lang: zh-tw
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

在本文中，我將向你展示如何為以太坊區塊鏈編寫一個類似 Craigslist 的程式。

在 Gumtree、Ebay 和 Craigslist 出現之前，分類廣告板大多由軟木或紙張製成。學校走廊、報紙、路燈和店面都有分類廣告板。

這一切隨著網際網路的出現而改變。能看到特定分類廣告板的人數呈指數級增長。因此，它們所代表的市場變得更加高效，並擴展到全球規模。Ebay 是一家龐大的企業，其起源可以追溯到這些實體的分類廣告板。

隨著區塊鏈的出現，這些市場將再次發生改變，讓我來告訴你如何實現。

## 營利方式 {#monetization}

公共區塊鏈分類廣告板的商業模式將需要與 Ebay 等公司有所不同。

首先是[去中心化的角度](/developers/docs/web2-vs-web3/)。現有平台需要維護自己的伺服器。而去中心化平台由其使用者維護，因此對於平台擁有者來說，運行核心平台的成本降至零。

其次是前端，即提供平台存取權限的網站或介面。這裡有很多選擇。平台擁有者可以限制存取權限，強制每個人使用他們的介面並收取費用。平台擁有者也可以決定開放存取權限（還權於民！），讓任何人都能為平台建立介面。或者，擁有者可以決定採取介於這兩個極端之間的任何方法。

_比我更有遠見的商業領袖會知道如何從中營利。我只看到這與現狀不同，而且可能有利可圖。_

此外，還有自動化和支付的角度。有些東西可以非常[有效地被代幣化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)並在分類廣告板上交易。代幣化資產在區塊鏈中很容易轉移。高度複雜的支付方式也可以在區塊鏈中輕鬆實作。

我只是在這裡嗅到了商機。一個沒有營運成本的分類廣告板可以輕鬆實作，並且每筆交易都可以包含複雜的支付路徑。我相信一定會有人想出如何利用它的好點子。

我只是很樂於建置它。讓我們來看看程式碼。

## 實作 {#implementation}

不久前，我們建立了一個[開源儲存庫](https://github.com/HQ20/contracts?ref=hackernoon.com)，其中包含商業案例的範例實作和其他好東西，請去看看。

這個[以太坊分類廣告板](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)的程式碼就在那裡，請盡情使用和測試。但請注意，該程式碼尚未經過稽核，在投入資金之前，你需要自行做好盡職調查。

廣告板的基礎並不複雜。廣告板中的所有廣告都只是一個包含幾個欄位的結構 (struct)：

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // 開啟, 已執行, 已取消
}
```

所以有人發布廣告。一個待售物品。物品的價格。交易的狀態（可以是開放、已執行或已取消）。

所有這些交易都將保存在一個映射 (mapping) 中。因為在 Solidity 中，似乎所有東西都是映射。也因為這樣很方便。

```solidity
mapping(uint256 => Trade) public trades;
```

使用映射只意味著我們必須在發布廣告之前為每個廣告產生一個 ID，並且我們需要知道廣告的 ID 才能對其進行操作。在智能合約或前端中有多種處理此問題的方法。如果你需要一些指引，請隨時提問。

接下來的問題是，我們處理的這些物品是什麼，以及用於支付交易的貨幣是什麼。

對於物品，我們只要求它們實作 [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) 介面，這實際上只是在區塊鏈中表示現實世界物品的一種方式，儘管它[最適合數位資產](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)。我們將在建構函式中指定我們自己的 ERC721 合約，這意味著我們分類廣告板中的任何資產都需要事先被代幣化。

對於支付，我們將採取類似的做法。大多數區塊鏈專案都定義了自己的 [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) 加密貨幣。其他一些專案則傾向於使用像 DAI 這樣的主流加密貨幣。在這個分類廣告板中，你只需要在建構時決定你的貨幣是什麼。非常簡單。

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

我們快完成了。我們有了廣告、交易物品和支付貨幣。製作廣告意味著將物品放入託管中，以證明你擁有該物品，並且你沒有將其重複發布（可能在不同的廣告板上）。

下面的程式碼正是執行這個操作。將物品放入託管，建立廣告，並進行一些清理工作。

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

接受交易意味著選擇一個廣告（交易），支付價格，並接收物品。下面的程式碼會擷取一筆交易。檢查它是否可用。支付物品。擷取物品。更新廣告。

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

最後，我們為賣家提供了一個選項，讓他們可以在買家接受交易之前退出交易。在某些模式中，廣告會在到期前存活一段時間。這取決於你市場的設計，由你來選擇。

這段程式碼與用於執行交易的程式碼非常相似，只是沒有貨幣易手，物品會退還給廣告發布者。

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

就是這樣。你已經完成了實作的最後一步。令人驚訝的是，某些商業概念在用程式碼表達時是如此簡潔，這就是其中一個例子。請[在我們的儲存庫中](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)查看完整的合約。

## 結論 {#conclusion}

分類廣告板是一種常見的市場配置，隨著網際網路的發展而大規模擴展，成為一種非常受歡迎的商業模式，並產生了少數壟斷性的贏家。

分類廣告板碰巧也是一種很容易在區塊鏈環境中複製的工具，其非常具體的特徵將使挑戰現有巨頭成為可能。

在本文中，我嘗試將分類廣告板業務的商業現實與技術實作橋接起來。如果你具備合適的技能，這些知識應該能幫助你建立願景和實作路線圖。

一如既往，如果你打算建置任何有趣的東西並希望獲得一些建議，請[留言給我](https://albertocuesta.es/)！我總是很樂意提供幫助。