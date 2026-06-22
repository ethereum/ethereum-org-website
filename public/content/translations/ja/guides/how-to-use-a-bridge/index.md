---
title: トークンをレイヤー2にブリッジする方法
description: ブリッジを使用してイーサリアムからレイヤー2にトークンを移動する方法を説明するガイド。
lang: ja
---

イーサリアムのトラフィックが多くなると、コストが高くなる可能性があります。この問題の解決策の1つは、新しい「レイヤー」を作成することです。つまり、イーサリアム自体と同様の方法で動作する異なるネットワークです。これらのいわゆるレイヤー2 (L2) は、より低い手数料でより多くのトランザクションを処理し、その結果を時々イーサリアムに保存するだけで、イーサリアムの混雑とコストを削減するのに役立ちます。そのため、これらのレイヤー2を使用すると、速度を向上させ、コストを削減してトランザクションを行うことができます。多くの人気のある暗号資産プロジェクトは、これらの利点のためにレイヤー2に移行しています。イーサリアムからレイヤー2にトークンを移動する最も簡単な方法は、ブリッジを使用することです。

**前提条件:** 

- 暗号資産ウォレットを持っていること。持っていない場合は、このガイドに従って[イーサリアムのアカウントを作成](/guides/how-to-create-an-ethereum-account/)してください。
- ウォレットに資金を追加すること。

## 1. 使用するレイヤー2ネットワークを決定する {#1-determine-which-layer-2-network-you-want-to-use}

さまざまなプロジェクトや重要なリンクの詳細については、[レイヤー2のページ](/layer-2/)をご覧ください。

## 2. 選択したブリッジにアクセスする {#2-go-to-the-selected-bridge}

人気のあるレイヤー2には以下のようなものがあります。

- [アービトラムのブリッジ](https://portal.arbitrum.io/bridge?l2ChainId=42161)
- [オプティミズムのブリッジ](https://app.optimism.io/bridge/deposit)
- [Bobaネットワークのブリッジ](https://hub.boba.network/)

## 3. ウォレットでブリッジに接続する {#3-connect-to-the-bridge-with-your-wallet}

ウォレットがイーサリアム・メインネットのネットワークに接続されていることを確認してください。接続されていない場合、ウェブサイトは自動的にネットワークを切り替えるように促します。

![Common interface for bridging tokens](./bridge1.png)

## 4. 金額を指定して資金を移動する {#4-specify-the-amount-and-move-the-funds}

予期せぬ事態を避けるために、レイヤー2ネットワークで受け取る金額と手数料を確認してください。

![Common interface for bridging tokens](./bridge2.png)

## 5. ウォレットでトランザクションを確認する {#5-confirm-the-transaction-in-your-wallet}

トランザクションを処理するために、ETHの形で手数料 ([ガス](/glossary/#gas)と呼ばれます) を支払う必要があります。

![Common interface for bridging tokens](./bridge3.png)

## 6. 資金が移動するのを待つ {#6-wait-for-your-funds-to-be-moved}

このプロセスは10分以上かかることはありません。

## 7. 選択したレイヤー2ネットワークをウォレットに追加する (任意) {#7-add-the-selected-layer-2-network-to-your-wallet-optional}

[chainlist.org](https://chainlist.org)を使用して、ネットワークのRPCの詳細を見つけることができます。ネットワークが追加され、トランザクションが完了すると、ウォレットにトークンが表示されるはずです。
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

### 取引所に資金がある場合はどうすればよいですか？ {#what-if-i-have-funds-on-an-exchange}

取引所から直接一部のレイヤー2に引き出すことができる場合があります。詳細については、[レイヤー2のページ](/layer-2/)の「レイヤー2への移行」セクションを確認してください。

### トークンをL2にブリッジした後、イーサリアムのメインネットに戻ることはできますか？ {#can-i-go-back-to-ethereum-mainnet-after-i-bridge-my-tokens-to-l2}

はい、同じブリッジを使用していつでも資金をメインネットに戻すことができます。
