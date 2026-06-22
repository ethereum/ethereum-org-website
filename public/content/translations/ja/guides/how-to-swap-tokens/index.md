---
title: トークンのスワップ方法
description: イーサリアムでトークンをスワップする方法のガイド。
lang: ja
---

お気に入りのトークンがすべて上場している取引所を探すのに疲れていませんか？[分散型取引所](/glossary/#dex)を使用すれば、ほとんどのトークンをスワップできます。

トークンスワップとは、イーサリアムネットワーク上に存在する2つの異なる資産を交換することです。例えば、ETHをDAI（[ERC-20](/glossary/#erc-20)トークン）にスワップするなどです。このプロセスは非常に高速で安価です。トークンをスワップするには、暗号資産ウォレットが必要です。

**前提条件:**

- [暗号資産ウォレット](/glossary/#wallet)を持っていること。持っていない場合は、[イーサリアムアカウントの作成方法](/guides/how-to-create-an-ethereum-account/)のガイドに従ってください。
- ウォレットに資金を追加すること

## 1. 選択した分散型取引所 (DEX) にウォレットを接続する {#1-connect-your-wallet-to-the-decentralized-exchange-dex-of-your-choice}

人気のある取引所には以下のものがあります。

- [ユニスワップ](https://app.uniswap.org/#/swap)
- [Sushiswap](https://www.sushi.com/swap)
- [1Inch](https://app.1inch.io/#/1/unified/swap/ETH/DAI)
- [Curve](https://www.curve.finance/dex/ethereum/swap/)

興味が湧きましたか？[分散型金融 (DeFi)](/defi/)とは何か、そしてこれらの新しい種類の取引所がどのように機能するかについて詳しく学びましょう。

## 2. スワップしたいトークンのペアを選択する {#2-select-the-pair-of-tokens-you-wish-to-swap}

例えば、ETHとDAIです。2つのトークンのうち、どちらかの資金があることを確認してください。
![Common interface for swapping](./swap1.png)

## 3. 取引したいトークンの数量を入力し、スワップをクリックする {#3-enter-the-amount-of-tokens-you-want-to-trade-and-click-swap}

取引所は、受け取るトークンの数量を自動的に計算します。

![Common interface for swapping](./swap2.png)

## 4. トランザクションを確認する {#4-confirm-the-transaction}

トランザクションの詳細を確認します。予期せぬ事態を防ぐために、為替レートやその他の手数料を確認してください。

![Common interface for reviewing the transaction](./swap3.png)

## 5. トランザクションが処理されるのを待つ {#5-wait-for-the-transaction-to-be-processed}

任意のブロックチェーンエクスプローラーでトランザクションの進行状況を確認できます。このプロセスは10分以上かかることはありません。

トランザクションが処理されると、スワップされたトークンが自動的にウォレットに届きます。
<br />

<Alert variant="update">
<AlertEmoji text=":eyes:"/>
<AlertContent className="justify-between flex-row items-center">
  <div>さらに詳しく知りたいですか？</div>
  <ButtonLink href="/guides/">
    他のガイドを見る
  </ButtonLink>
</AlertContent>
</Alert>

## よくある質問 {#frequently-asked-questions}

### ウォレットからETHをBTCにスワップできますか？ {#can-i-swap-eth-for-btc-from-my-wallet}

いいえ、ETH、ERC-20トークン、NFTなど、イーサリアムネットワークのネイティブトークンのみをスワップできます。イーサリアム上に存在する「ラップされた」形式のビットコインのみをスワップできます。

### スリッページとは何ですか？ {#what-is-slippage}

予想される為替レートと実際のレートとの差のことです。
