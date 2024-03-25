---
title: ERC-777 トークン規格
description:
lang: ja
---

## 警告 {#warning}

**ERC-777は、[さまざまな手法の攻撃を受けやすいため](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)、適切な実装が困難です。 このため、[ERC-20](/developers/docs/standards/tokens/erc-20/)を使用することをおすすめします。**本ページは、歴史的なアーカイブとして掲載するものです。

## はじめに {#introduction}

ERC-777は、既存の[ERC-20](/developers/docs/standards/tokens/erc-20/)規格を改善した代替性トークンの規格です。

## 事前に必要な環境 {#prerequisites}

本ページの内容をよく理解するために、まず[ERC-20](/developers/docs/standards/tokens/erc-20/)に目を通すことをおすすめします。

## ERC-777は、ERC-20に対してどのような改善を提案しているか？ {#-erc-777-vs-erc-20}

ERC-777は、ERC-20に対して以下の改善を提案します。

### フック {#hooks}

フックとは、スマートコントラクトのコードで記述された関数です。 フックは、コントラクトによりトークンが送受信される際に呼び出されます。 これにより、スマートコントラクトはトークンの受信／送信に対応できるようになります。

フックの登録および検出は、[ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)規格に基づいて実行されます。

#### フックの利点： {#why-are-hooks-great}

1. フックを用いることで、トークンをコントラクトに送信する作業とコントラクトに通知する作業をひとつのトランザクションにまとめることができます。[ERC-20](https://eips.ethereum.org/EIPS/eip-20)の場合、これには二重コール（`approve`/`transferFrom`）が必要になります。
2. 登録フックを持たないコントラクトは、ERC-777を利用できません。 受信コントラクトがフックを登録していない場合、送信コントラクトはトランザクションを中止します。 これにより、ERC-777非互換のスマートコントラクトに対する誤転送を防ぐことができます。
3. フックは、トランザクションを却下することができます。

### 通貨の最小単位 {#decimals}

ERC-777はさらに、ERC-20における`通貨の最小単位`に関する混乱を解消します。 この混乱を解消することで、デベロッパーの利用体験が向上します。

### ERC-20との後方互換性 {#backwards-compatibility-with-erc-20}

ERC-777コントラクトとの間は、ERC-20コントラクトに対する場合と同様のやりとりが可能です。

## 参考文献 {#further-reading}

[EIP-777: トークン規格](https://eips.ethereum.org/EIPS/eip-777)
