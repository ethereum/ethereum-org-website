---
title: ERC-721マーケットの実装方法
description: 分散型クラシファイド掲示板でトークン化されたアイテムを販売する方法
author: アルベルト・クエスタ・カニャーダ
tags:
  - スマート・コントラクト
  - ERC-721
  - Solidity
  - トークン
skill: intermediate
breadcrumb: ERC-721マーケット
lang: ja
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

この記事では、イーサリアムブロックチェーン向けにCraigslistをコーディングする方法を紹介します。

Gumtree、Ebay、Craigslistが登場する前、クラシファイド（案内掲示板）は主にコルクや紙で作られていました。学校の廊下、新聞、街灯、店頭などにクラシファイド掲示板がありました。

インターネットの登場により、すべてが変わりました。特定のクラシファイド掲示板を見ることができる人の数は、何桁も増えました。それに伴い、それらが代表する市場ははるかに効率的になり、世界規模に拡大しました。Ebayは、これらの物理的なクラシファイド掲示板を起源とする巨大なビジネスです。

ブロックチェーンにより、これらの市場は再び変化しようとしています。その方法を紹介しましょう。

## 収益化 {#monetization}

パブリックブロックチェーンのクラシファイド掲示板のビジネスモデルは、Ebayなどの企業とは異なるものになる必要があります。

まず、[分散化の観点](/developers/docs/web2-vs-web3/)があります。既存のプラットフォームは独自のサーバーを維持する必要があります。分散型プラットフォームはユーザーによって維持されるため、プラットフォームの所有者にとってコアプラットフォームの運用コストはゼロになります。

次に、プラットフォームへのアクセスを提供するウェブサイトやインターフェースであるフロントエンドがあります。ここには多くの選択肢があります。プラットフォームの所有者はアクセスを制限し、全員に自社のインターフェースを使用させて手数料を請求することができます。また、アクセスをオープンにして（人々に力を！）、誰でもプラットフォームへのインターフェースを構築できるようにすることもできます。あるいは、これらの極端なアプローチの中間を選択することもできます。

_私よりも先見の明があるビジネスリーダーなら、これをどのように収益化するかを知っているでしょう。私にわかるのは、これが現状とは異なり、おそらく利益を生むだろうということだけです。_

さらに、自動化と支払いの観点もあります。一部のものは非常に[効果的にトークン化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)され、クラシファイド掲示板で取引される可能性があります。トークン化された資産は、ブロックチェーン上で簡単に転送できます。非常に複雑な支払い方法も、ブロックチェーン上で簡単に実装できます。

私はここにビジネスチャンスの匂いを感じています。運用コストがゼロで、各トランザクションに複雑な支払い経路が含まれるクラシファイド掲示板は簡単に実装できます。これを何に使うかについて、誰かがアイデアを思いつくはずです。

私はただ構築することを楽しんでいます。コードを見てみましょう。

## 実装 {#implementation}

少し前に、ビジネスケースの実装例やその他の便利な機能を含む[オープンソースリポジトリ](https://github.com/HQ20/contracts?ref=hackernoon.com)を開始しましたので、ぜひご覧ください。

この[イーサリアムクラシファイド掲示板](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)のコードはそこにありますので、自由に使ってください。ただし、コードは監査されておらず、資金を投入する前に独自のデューデリジェンスを行う必要があることに注意してください。

掲示板の基本は複雑ではありません。掲示板のすべての広告は、いくつかのフィールドを持つ単なる構造体になります。

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // オープン、実行済み、キャンセル済み
}
```

つまり、広告を投稿する人がいます。販売するアイテム。アイテムの価格。オープン、実行済み、またはキャンセル済みのいずれかになる取引のステータスです。

これらの取引はすべてマッピングに保持されます。Solidityのすべてがマッピングであるように思えるからです。また、便利だからです。

```solidity
mapping(uint256 => Trade) public trades;
```

マッピングを使用するということは、広告を投稿する前に各広告のIDを決定する必要があり、広告を操作する前にそのIDを知る必要があることを意味します。スマート・コントラクトまたはフロントエンドのいずれかでこれに対処する複数の方法があります。ヒントが必要な場合はお尋ねください。

次に、私たちが扱うこれらのアイテムとは何か、そしてトランザクションの支払いに使用されるこの通貨とは何かという疑問が生じます。

アイテムについては、[ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)インターフェースを実装することだけを求めます。これは、[デジタル資産で最もよく機能します](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)が、現実世界のアイテムをブロックチェーン上で表現するための単なる方法です。コンストラクタで独自のERC721コントラクトを指定します。つまり、クラシファイド掲示板のすべての資産は事前にトークン化されている必要があります。

支払いについても、同様のことを行います。ほとんどのブロックチェーンプロジェクトは、独自の[ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com)暗号資産を定義しています。DAIのような主流のものを使用することを好むプロジェクトもあります。このクラシファイド掲示板では、構築時に通貨を何にするかを決定するだけです。簡単です。

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

完成に近づいています。広告、取引するアイテム、支払いのための通貨が揃いました。広告を作成するということは、アイテムをエスクローに入れ、あなたがそれを持っていること、そして別の掲示板などで二重に投稿していないことを示すことを意味します。

以下のコードはまさにそれを行います。アイテムをエスクローに入れ、広告を作成し、いくつかの管理作業を行います。

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

取引を受け入れるということは、広告（取引）を選択し、価格を支払い、アイテムを受け取ることを意味します。以下のコードは取引を取得します。利用可能かどうかを確認します。アイテムの支払いをします。アイテムを取得します。広告を更新します。

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

最後に、買い手が受け入れる前に売り手が取引から手を引くオプションがあります。一部のモデルでは、広告は期限切れになるまで一定期間有効になります。市場の設計に応じて選択してください。

コードは取引を実行するために使用されるものと非常に似ていますが、通貨のやり取りがなく、アイテムが広告投稿者に戻る点だけが異なります。

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

以上です。実装の最後までたどり着きました。一部のビジネスコンセプトがコードで表現されるとどれほどコンパクトになるかは非常に驚くべきことであり、これもその1つです。[私たちのリポジトリで](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)完全なコントラクトを確認してください。

## 結論 {#conclusion}

クラシファイド掲示板は、インターネットとともに大規模に拡大した一般的な市場構成であり、少数の独占的な勝者を持つ非常に人気のあるビジネスモデルになりました。

クラシファイド掲示板は、ブロックチェーン環境で簡単に複製できるツールでもあり、既存の巨大企業への挑戦を可能にする非常に具体的な機能を備えています。

この記事では、クラシファイド掲示板ビジネスのビジネスの現実と技術的な実装の橋渡しを試みました。この知識は、適切なスキルを持っている場合、ビジョンと実装のロードマップを作成するのに役立つはずです。

いつものように、何か楽しいものを構築しようとしていてアドバイスが欲しい場合は、ぜひ[ご連絡ください](https://albertocuesta.es/)！いつでも喜んでお手伝いします。