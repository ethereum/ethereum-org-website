---
title: "ERC-721マーケットを実装する方法"
description: "分散型のクラシファイドボード（掲示板）に、トークン化されたアイテムを出品する方法"
author: "Alberto Cuesta Cañada"
tags: [ "スマート契約", "ERC-721", "Solidity", "トークン" ]
skill: intermediate
lang: ja
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

この記事では、イーサリアムのブロックチェーン用に、Craigslistのコードを作成する方法を紹介します。

Gumtree、Ebay、Craigslistといったインターネット掲示板が登場する以前は、コルク板や紙媒体がその役割を担っていました。 このような掲示板は、学校の廊下、新聞、道端、店頭などに置かれていました。

しかし、インターネットの登場でこれが一変しました。 ひとつの掲示板を見る人の数が、桁違いに増えました。 それに伴い、掲示板の対象となる市場の効率性が非常に高まり、グローバルな規模に発展したのです。 Ebay は今や巨大な規模のビジネスに発展しましたが、元はと言えば実物の掲示板に起源をたどることができるのです。

ブロックチェーン技術は、この掲示板市場をさらに変革するものです。以下では、その方法について紹介します。

## 収益化 {#monetization}

パブリックブロックチェーンにおける掲示板のビジネスモデルは、Ebayなどの企業のビジネスモデルとは異なります。

まず、[分散化という観点](/developers/docs/web2-vs-web3/)があります。 既存の掲示板プラットフォームは、自社サーバーを運用する必要があります。 しかし、分散型プラットフォームの運営はユーザーが実行するため、プラットフォーム所有者はコア・プラットフォームを稼働させるコストを負担する必要がありません。

次に、プラットフォームにアクセスする機能を提供するウェブサイトまたはインターフェイスといったフロントエンドがあります。 フロントエンドには、いくつかのオプションがあります。 プラットフォーム所有者は、ユーザーのアクセス権限を制限し、インターフェイスを有料で使わせることができます。 プラットフォームの所有者は、アクセスを開放することも決定できます (Power to the People!) そして、誰でもプラットフォームへのインターフェースを構築できるようにします。 あるいは、これら2つの極端なアプローチの中間を選択することもできます。

_私よりも先見の明のあるビジネスリーダーは、これを収益化する方法を知っているでしょう。 私にわかるのは、これが現状とは異なり、おそらく利益になるだろうということだけです。_

掲示板プラットフォームについては、自動化や支払い方法の視点からも考えることができます。 一部のものは、非常に[効果的にトークン化](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)され、クラシファイドボードで取引できます。 トークン化されたアセットは、ブロックチェーン上で簡単に移転できます。 また、ブロックチェーンでは、非常に複雑な支払い方法も簡単に実装できます。

私はここに、ビジネスチャンスがあると感じているわけです。 トランザクションごとに複雑な支払経路を設定しつつ、運用コストが発生しない掲示板を、簡単に実装できるからです。 私は、ブロックチェーン・コミュニティから必ず、これを活用するアイディアが生まれてくると考えています。

私は、その機能を開発できるのが楽しいだけです。 それではさっそく、コードを見てみましょう。

## 実装 {#implementation}

少し前に、ビジネスケースのサンプル実装やその他の特典を含む[オープンソースリポジトリ](https://github.com/HQ20/contracts?ref=hackernoon.com)を開始しました。ぜひご覧ください。

この[Ethereumクラシファイドボード](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com)のコードはそこにあります。どうぞご自由にお使いください。 ただし、このコードは監査を経ていないため、お金を伴う取引を開始する前に、各自でデューデリジェンスを行う必要があります。

掲示板における基本的な機能はシンプルなものです。 掲示板におけるすべての投稿は、いくつかのフィールドを含む構造体に過ぎません：

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

広告を投稿するユーザーは、 販売するアイテム、 アイテムの価格、 このアイテムに関する取引ステータス（受付中、販売済み、取消）を設定するだけです。

すべての取引は、マッピングで保持されます。 と言うのも、Solidityではほぼすべての要素をマッピングで規定するからです。 マッピングを使用するのが便利だからとも言えます。

```solidity
mapping(uint256 => Trade) public trades;
```

マッピングを使用するとは、広告を投稿する前に広告ごとにIDを設定し、広告に対する操作を行うには広告IDを知る必要があることを意味します。 スマートコントラクトあるいはフロントエンド上でマッピングの操作を行うには、いくつかの方法があります。 ヒントが必要であれば、気軽に問い合わせてください。

次に、どのようなアイテムを扱う必要があり、取引の支払いにはどの通貨を使うかについて考える必要があります。

アイテムについては、[ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com)インターフェースを実装することだけを求めます。これは現実世界のアイテムをブロックチェーンで表現する方法にすぎませんが、[デジタルアセットで最も効果的に機能します](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com)。 この掲示板用の ERC-721コントラクトはコンストラクタで指定するため、掲示板に含まれるアセットは前もってトークン化しておく必要があります。

支払い機能についても、ほぼ同じです。 ほとんどのブロックチェーンプロジェクトは、独自の[ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com)暗号通貨を定義しています。 DAIのように、著名な暗号通貨を採用する場合もあります。 このクラシファイド掲示板では、コンストラクタにおいて通貨を指定する必要があるだけです。 簡単ですね。

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

もう少しで完了です。 すでに、広告、取引アイテム、および支払通貨が準備できました。 広告を作成するには、当該アイテムをエスクローに預けることで、あなたがそのアイテムを所有し、違う掲示板などに重複投稿していないことを保証する必要があります。

以下のコードは、まさにこの目的のものです。 アイテムをエスクローに預け、広告を作成し、関連の周辺作業を実行します。

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

取引に応じるためには、広告（取引）を選択し、価格を支払い、アイテムを受け取る必要があります。 次のコードは、取引を取得するためのコードです。 アイテムがまだ取引可能かを確認し、 アイテムの価格を支払い、 アイテムを受け取り、 広告を「販売済み」に更新します。

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

最後に、買い手が取引に応じる前に、売り手が取引を取り消すオプションが必要です。 一部の掲示板モデルでは、売り手が取引を取り消すオプションを提供する代わりに、一定期限のみ広告が有効になる方法を採用しています。 対象となる市場を念頭において、適切な方法を選択してください。

このコードは、取引実行のコードと非常によく似ていますが、通貨の交換が発生せず、アイテムが広告投稿者に戻される点が異なります。

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "取引は投稿者のみがキャンセルできます。"
  );
  require(trade.status == "Open", "取引はオープン状態ではありません。");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

以上です！ これで、実装が完了しました。 この掲示板もそうですが、ビジネスコンセプトをコードで表現すると、驚くほど簡潔であることが少なくありません。 完全なコントラクトは[私たちのリポジトリ](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol)で確認してください。

## 結論 {#conclusion}

クラシファイド掲示板は、インターネットの普及に伴い爆発的に規模を拡大した一般的な市場構成であり、非常に人気のあるビジネスモデルを大手数社が独占している状態です。

その一方で、ブロックチェーン環境において簡単に再現できる機能でもあり、既存の大手プレイヤーにとっては、ブロックチェーンが持つ固有の機能が大きな脅威となります。

この記事は、実際の掲示板ビジネスと、技術的な実装との間にあるギャップを埋めるための試みです。 この記事に記載された知識を基に、適切なスキルを持つユーザーであれば、掲示板ビジネスのビジョンと実装ロードマップを生み出すことができるでしょう。

いつものように、面白いプロジェクトを進行中で助言が必要な場合は、ぜひ[ご連絡ください](https://albertocuesta.es/)！ いつでも喜んでお手伝いします。
