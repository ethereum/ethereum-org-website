---
title: "トークン規格"
description: "ERC-20、ERC-721、ERC-1155を含むイーサリアムのトークン標準について探求しましょう。これらの標準は、代替可能トークンおよび非代替性トークンに利用されます。"
lang: ja
incomplete: true
---

## はじめに {#introduction}

イーサリアムにおける開発規格の多くは、トークンのインターフェイスを対象としています。 これらの標準は、スマートコントラクトが構成可能であり続けることを保証するのに役立ちます。そのため、新しいプロジェクトがトークンを発行した際にも、既存の分散型取引所やアプリケーションとの互換性が維持されます。

トークン標準は、イーサリアムエコシステム全体でトークンがどのように動作し、相互作用するかを定義します。 これにより、開発者は車輪の再発明をすることなく容易に構築でき、トークンがウォレット、取引所、DeFiプラットフォームとシームレスに連携することが保証されます。 ゲーミング、ガバナンス、その他のユースケースにかかわらず、これらの標準は一貫性をもたらし、イーサリアムの相互接続性を高めます。

## 前提条件{#prerequisites}

- [イーサリアム開発標準](/developers/docs/standards/)
- [スマートコントラクト](/developers/docs/smart-contracts/)

## トークン規格 {#token-standards}

以下では、イーサリアムにおける最も一般的なトークン規格を説明します:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票トークン、ステーキングトークン、または仮想通貨のような、ファンジブル(代替可能)トークンのための標準インターフェイスです。

### NFT標準 {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アート作品や歌の権利証のような、非代替性トークン(NFT)の標準インターフェイスです。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ERC-1155は、より効率的な取引とトランザクションのバンドル化を可能にし、コストを節約します。 ユーティリティトークン（$BNBや$BATなど）および非代替性トークン（CryptoPunksなど）の両方の作成に使用できます。

[ERC](https://eips.ethereum.org/erc)提案の全リスト。

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_

## 関連チュートリアル {#related-tutorials}

- [トークン統合チェックリスト](/developers/tutorials/token-integration-checklist/) _– トークンを扱う際に考慮すべき項目のチェックリストです。_
- [ERC20トークンのスマートコントラクトを理解する](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– イーサリアムのテストネットワークに初めてのスマートコントラクトをデプロイするための入門ガイドです。_
- [SolidityスマートコントラクトからのERC20トークンの転送と承認](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Solidity言語を使用して、スマートコントラクトでトークンとやり取りする方法です。_
- [ERC721マーケットの実装[ハウツーガイド]](/developers/tutorials/how-to-implement-an-erc721-market/) _– 分散型掲示板でトークン化アイテムを出品する方法です。_
