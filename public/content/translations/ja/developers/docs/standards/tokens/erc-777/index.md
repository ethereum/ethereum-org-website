---
title: ERC-777 トークン規格
description:
lang: ja
---

## 警告 {#warning}

**ERC-777は[様々な形式の攻撃に対して脆弱](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)であるため、正しく実装することが困難です。代わりに[ERC-20](/developers/docs/standards/tokens/erc-20/)の使用を推奨します。** このページは歴史的なアーカイブとして残されています。

## はじめに {#introduction}

ERC-777は、既存の[ERC-20](/developers/docs/standards/tokens/erc-20/)規格を改善した代替可能トークン規格です。

## 前提条件 {#prerequisites}

このページをより良く理解するために、まず[ERC-20](/developers/docs/standards/tokens/erc-20/)について読むことをお勧めします。

## ERC-777はERC-20に対してどのような改善を提案していますか？ {#-erc-777-vs-erc-20}

ERC-777はERC-20に対して以下の改善を提供します。

### フック {#hooks}

フックは、スマートコントラクトのコードで記述された関数です。フックは、コントラクトを通じてトークンが送信または受信されるときに呼び出されます。これにより、スマートコントラクトは入出金されるトークンに反応することができます。

フックは[ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)規格を使用して登録および検出されます。

#### フックが優れている理由 {#why-are-hooks-great}

1. フックを使用すると、トークンをコントラクトに送信し、1回のトランザクションでコントラクトに通知することができます。一方、[ERC-20](https://eips.ethereum.org/EIPS/eip-20)では、これを実現するために二重呼び出し（`approve`/`transferFrom`）が必要です。
2. フックを登録していないコントラクトは、ERC-777と互換性がありません。受信コントラクトがフックを登録していない場合、送信コントラクトはトランザクションを中止します。これにより、非ERC-777スマートコントラクトへの誤送信を防ぐことができます。
3. フックはトランザクションを拒否することができます。

### 小数点 {#decimals}

この規格は、ERC-20で生じた`decimals`に関する混乱も解決します。この明確化により、開発者の体験が向上します。

### ERC-20との後方互換性 {#backwards-compatibility-with-erc-20}

ERC-777コントラクトは、ERC-20コントラクトであるかのように操作することができます。

## 参考文献 {#further-reading}

[EIP-777：トークン規格](https://eips.ethereum.org/EIPS/eip-777)
