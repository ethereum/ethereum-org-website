---
title: ERC-777 トークン規格
description: フック機能を備え、改良された代替性トークン標準であるERC-777について学びます。ただし、セキュリティ上の理由からERC-20の使用が推奨されています。
lang: ja
---

## 警告 {#warning}

\*\*ERC-777は[さまざまな形態の攻撃に対する脆弱性](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)があるため、適切に実装することが困難です。 代わりに[ERC-20](/developers/docs/standards/tokens/erc-20/)を使用することが推奨されます。\*\*このページは、歴史的なアーカイブとして残されています。

## はじめに {#introduction}

ERC-777は、既存の[ERC-20](/developers/docs/standards/tokens/erc-20/)標準を改良した代替性トークン標準です。

## 前提条件{#prerequisites}

このページをよりよく理解するために、まず[ERC-20](/developers/docs/standards/tokens/erc-20/)についてお読みになることをお勧めします。

## ERC-777は、ERC-20に対してどのような改善を提案しているか？ {#-erc-777-vs-erc-20}

ERC-777は、ERC-20に対して以下の改善を提案します。

### フック {#hooks}

フックとは、スマートコントラクトのコードで記述された関数です。 フックは、コントラクトによりトークンが送受信される際に呼び出されます。 これにより、スマートコントラクトはトークンの受信／送信に対応できるようになります。

フックは、[ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)標準を使用して登録・検出されます。

#### フックの利点： {#why-are-hooks-great}

1. この操作に二重呼び出し(`approve`/`transferFrom`)を必要とする[ERC-20](https://eips.ethereum.org/EIPS/eip-20)とは異なり、フックでは単一のトランザクションでコントラクトへのトークン送信とコントラクトへの通知が可能です。
2. 登録フックを持たないコントラクトは、ERC-777を利用できません。 受信コントラクトがフックを登録していない場合、送信コントラクトはトランザクションを中止します。 これにより、ERC-777非互換のスマートコントラクトに対する誤転送を防ぐことができます。
3. フックは、トランザクションを却下することができます。

### 小数点以下の桁数 {#decimals}

この標準は、ERC-20で引き起こされた`decimals`をめぐる混乱も解決します。 この混乱を解消することで、デベロッパーの利用体験が向上します。

### ERC-20との後方互換性 {#backwards-compatibility-with-erc-20}

ERC-777コントラクトとの間は、ERC-20コントラクトに対する場合と同様のやりとりが可能です。

## 参考リンク{#further-reading}

[EIP-777: トークン標準](https://eips.ethereum.org/EIPS/eip-777)
