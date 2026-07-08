---
title: "トークン標準"
description: "代替可能（ファンジブル）および代替不可能（ノンファンジブル）トークンのためのERC-20、ERC-721、ERC-1155などのイーサリアムのトークン標準について説明します。"
lang: ja
incomplete: true
---

## はじめに {#introduction}

多くの[イーサリアム](/)開発標準は、トークンのインターフェースに焦点を当てています。これらの標準は、スマート・コントラクトがコンポーザブルであることを保証するのに役立ちます。そのため、新しいプロジェクトがトークンを発行する際にも、既存の分散型取引所やアプリケーションとの互換性が維持されます。

トークン標準は、イーサリアムエコシステム全体でトークンがどのように機能し、相互作用するかを定義します。これにより、開発者は車輪の再発明をすることなく構築しやすくなり、トークンがウォレット、取引所、DeFiプラットフォームとシームレスに連携することが保証されます。ゲーム、ガバナンス、その他のユースケースのいずれにおいても、これらの標準は一貫性を提供し、イーサリアムの相互接続性を高めます。

## 前提条件 {#prerequisites}

- [イーサリアム開発標準](/developers/docs/standards/)
- [スマート・コントラクト](/developers/docs/smart-contracts/)

## トークン標準 {#token-standards}

イーサリアムで最も人気のあるトークン標準のいくつかを以下に示します。

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票トークン、ステーキングトークン、仮想通貨などの代替可能（ファンジブル）トークンのための標準インターフェース。

### NFT標準 {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アートワークや楽曲の権利書などの代替不可能（ノンファンジブル）トークンのための標準インターフェース。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155は、より効率的な取引とトランザクションのバンドルを可能にし、コストを削減します。このトークン標準により、$BNBや$BATなどのユーティリティトークンと、CryptoPunksのような代替不可能（ノンファンジブル）トークンの両方を作成できます。

[ERC](https://eips.ethereum.org/erc)提案の完全なリスト。

## 参考文献 {#further-reading}

_役に立ったコミュニティリソースをご存知ですか？このページを編集して追加してください！_

## 関連チュートリアル {#related-tutorials}

- [トークン統合チェックリスト](/developers/tutorials/token-integration-checklist/) _– トークンとやり取りする際に考慮すべき事項のチェックリスト。_
- [ERC20トークンのスマート・コントラクトを理解する](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– イーサリアムのテストネットワークに初めてスマート・コントラクトをデプロイするための入門。_
- [Solidityスマート・コントラクトからのERC20トークンの送金と承認](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Solidity言語を使用して、スマート・コントラクトからトークンとやり取りする方法。_
- [ERC721マーケットの実装 [ハウツーガイド]](/developers/tutorials/how-to-implement-an-erc721-market/) _– トークン化されたアイテムを分散型のクラシファイド掲示板で販売する方法。_