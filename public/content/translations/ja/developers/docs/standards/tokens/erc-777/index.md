---
title: ERC-777 トークン規格
description: フックを備えた改良版の代替可能トークン規格であるERC-777について学びます。ただし、セキュリティ上の理由からERC-20の使用が推奨されています。
lang: ja
---

## 警告 {#warning}

**ERC-777は[さまざまな形態の攻撃を受けやすい](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)ため、適切に実装することが困難です。代わりに[ERC-20](/developers/docs/standards/tokens/erc-20/)を使用することが推奨されます。** このページは歴史的アーカイブとして残されています。

## はじめに? {#introduction}

ERC-777は、既存の[ERC-20](/developers/docs/standards/tokens/erc-20/)規格を改良した代替可能トークン規格です。

## 前提条件 {#prerequisites}

このページをより深く理解するために、まずは[ERC-20](/developers/docs/standards/tokens/erc-20/)について読むことをお勧めします。

## ERC-777はERC-20に対してどのような改善を提案していますか？ {#-erc-777-vs-erc-20}

ERC-777は、ERC-20に対して以下の改善を提供します。

### フック {#hooks}

フックは、スマート・コントラクトのコード内に記述される関数です。フックは、コントラクトを通じてトークンが送信または受信されたときに呼び出されます。これにより、スマート・コントラクトは入出金されるトークンに反応することができます。

フックは、[ERC-1820](https://eips.ethereum.org/EIPS/eip-1820)規格を使用して登録および検出されます。

#### なぜフックは優れているのか？ {#why-are-hooks-great}

1. フックを使用すると、これを実現するために2回の呼び出し（`approve` / `transferFrom`）を必要とする[ERC-20](https://eips.ethereum.org/EIPS/eip-20)とは異なり、単一のトランザクションでコントラクトにトークンを送信し、コントラクトに通知することができます。
2. フックを登録していないコントラクトは、ERC-777と互換性がありません。受信側コントラクトがフックを登録していない場合、送信側コントラクトはトランザクションを中止します。これにより、ERC-777以外のスマート・コントラクトへの誤った転送を防ぐことができます。
3. フックはトランザクションを拒否することができます。

### 小数桁数 {#decimals}

この規格はまた、ERC-20で引き起こされた`decimals`に関する混乱を解決します。この明確化により、開発者体験が向上します。

### ERC-20との下位互換性 {#backwards-compatibility-with-erc-20}

ERC-777コントラクトは、あたかもERC-20コントラクトであるかのように対話することができます。

## 参考文献 {#further-reading}

[EIP-777: トークン規格](https://eips.ethereum.org/EIPS/eip-777)