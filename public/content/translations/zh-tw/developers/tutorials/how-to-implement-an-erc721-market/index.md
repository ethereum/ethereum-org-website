---
title: 如何導入一ERC-721市場
description: 如何販售代幣化物件於去中央化訊息版.
author: "Alberto Cuesta Cañada"
tags: [ "智能合約", "erc-721", "solidity", "代幣" ]
skill: intermediate
lang: zh-tw
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

於此文章, 我們將介紹如何為以太坊區塊鏈程式編輯Craigslist之物件訊息版.

於Gumtree, Ebay 及 Craigslist, 分類訊息版通常由紙本或軟木所組成. 此為分類訊息版於學校走廊, 報紙, 跑馬燈, 及店面廣告.

此全部因網路之導入而大幅改變. 能看見特殊分類訊息版的人數因網路而大幅提升. 與此, 市場代表將成為更加有效率且能夠擴張至全球範圍. Ebay為一龐大事業且其原始商業模式源於此實體分類訊息版模式.

區塊鏈技術能使其市場再次改變. 讓我們來看看此如何發生.

## 營利 {#monetization}

一基於公共區塊鏈之商業模式的分類訊息版將與Ebay及其他公司看起來大大不同.

首先，從[去中心化的角度](/developers/docs/web2-vs-web3/)來看。 既有平台需要來維持其擁有服務. 一去中央化平台是由其用戶所維持, 所以就平台持有者之角度來看, 運作平台核心之成本費用降至幾乎為零.

然後我們必須考慮前端介面, 網站及用戶介面提供訪問平台之機會. 以下為許多選項. 此平台持有者能夠限制介面訪問權並索取費用. 平台擁有者也可以決定開放存取權限 (權力歸於人民！) 並讓任何人為平台建構介面。 或平台持有者能夠做出處於前兩選項之間之綜合選擇.

_商業領導人具廣泛視野將知道如何商業化此. 目前我們所能視的為, 此與現狀不同, 且其可能有利可圖._

甚至, 其具自動化功能及多種支付角度來檢視問題. 有些東西可以非常[有效地代幣化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)，並在分類廣告板上交易。 代幣化資產能簡單被交易於區塊鏈中. 高強度支付手段能被簡單導入至一區塊鏈.

聞到商業機會了嗎? 一分類訊息版無一運作成本並能被簡單導入, 包括複雜支付方案於各類交易. 我們很確定未來將會有更多有趣創想來更加擴張此用途.

我們只是很高興能建造此. 來一起看看其程式程式碼吧.

## 實作 {#implementation}

不久前，我們啟動了一個[開源儲存庫](https://github.com/HQ20/contracts?ref=hackernoon.com)，其中包含商業案例的實作範例和其他好東西，歡迎查看。

這個 [以太坊分類廣告板](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) 的程式碼就在那裡，請盡情使用。 只是請小心某些程式還未被完全審核, 所以你需謹慎檢查研究當投資資產於此.

分類訊息版之基礎核心其實相當簡單. 所有廣告於分類版為建構於以下幾行字段:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

所以當某人公開此一廣告. item為販售物件. price為物件價格. status表示物件狀態為公開, 執行, 或取消.

所有交易將被管理於一擬地圖/mapping結構. 因為所有物件於Solidity需要被標示類似地圖映射. 加上此管理類型十分方便.

```solidity
mapping(uint256 => Trade) public trades;
```

使用一mapping代表我們需要設置一id來為所有想公開之廣告, 而我們也須事前瞭解一廣告id來實際執行此. 其有多種類型方案來處理此於智慧型合約或前端介面. 如你有任何不明點, 請自由發問或查看相關幫助資訊.

接下來我們須考慮和物件需要被處理, 並指定其支付貨幣為何.

對於這些項目，我們只要求它們實作 [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) 介面，這實際上只是在區塊鏈中表示現實世界物品的一種方式，儘管它[最適用於數位資產](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)。 我們將必須創建一ERC-721合約於建立架構, 代表其任何資產於分類訊息版需要事前被代幣化.

為所有支付, 我們需要進行一類似之程序. 大多數區塊鏈專案都定義了自己的 [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) 加密貨幣。 有些傾向使用主流選項如DAI. 於此分類資訊版, 你需要來決定你加密貨幣之建立基礎架構為何. 簡單吧.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

就快到了!! 我們有了廣告, 交易物件, 及支付貨幣. 來建立一廣告代表需要放置資產於質押狀態, 以顯示你確實擁有此並無雙重公開此於其他分類訊息版.

以下程式運作此質押功能. 放置物件於質押, 創建一廣告, 做些記帳操作.

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

來接收交易代表選擇一廣告(交易), 支付其價格, 並接收物件. 此程式代表獲取一交易. 查看其是否為可供用狀態. 支付物件價格. 獲取物件. 更新廣告狀態.

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

最終, 我們將具一功能使賣家能於買家接收前退出交易. 於一些模式, 廣告將於過期前存留一段時間. 你的選擇, 基於你市場之設計.

此程式非常類似於執行一交易, 不過此不具交換貨幣, 且物件回返至廣告公布者.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "交易只能由張貼者取消。"
  );
  require(trade.status == "Open", "交易未開啟。");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

此為全部程式碼!! 你以完成所有所需導入步驟. 此為非常驚人當一些商業概念被表達於程式程式碼, 而以上為其中一範例. 請在[我們的儲存庫](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)中查看完整的合約。

## 結論 {#conclusion}

分類信息板是一種常見商業模式, 其於網路技術之幫助下, 大規模擴張的市場結構, 但此也是一種容易形成少數壟斷贏家的非常流行的商業模式.

分類信息板也恰好是在區塊鏈環境中容易進行複制的一種簡單工具, 其具有可以挑戰現有的巨頭的非常具體之功能.

在本文中，我們嘗試將分類信息板的商業業務與技術實現共同進行講解. 如果你擁有合適的技能, 這些知識應該可以幫助你創建願景及實施路線藍圖.

一如往常，如果您想打造一些有趣的專案並需要一些建議，請[與我聯絡](https://albertocuesta.es/)！ 我們隨時樂意幫助你.
