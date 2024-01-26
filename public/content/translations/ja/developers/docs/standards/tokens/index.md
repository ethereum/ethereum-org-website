---
title: トークン規格
description:
lang: ja
incomplete: true
---

## はじめに {#introduction}

イーサリアムにおける開発規格の多くは、トークンのインターフェイスを対象としています。 これらの規格は、スマートコントラクトにコンポーザビリティを提供するため、新規プロジェクトで発行されたトークンも既存の分散型取引所で取り扱えるようになります。

## 前提知識 {#prerequisites}

- [イーサリアム開発規格](/developers/docs/standards/)
- [スマートコントラクト](/developers/docs/smart-contracts/)

## トークン標準 {#token-standards}

以下では、イーサリアムにおける最も一般的なトークン規格を説明します:

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票用やステーキング用のトークンあるいは仮想通貨など、代替性を持つ（相互に代替可能な）トークンを対象とする標準的なインターフェイスです。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アートや楽曲に対する所有証明など、非代替性トークン (NFT) を対象とする標準的なインタフェースです。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - 通常のトークンに対して、トランザクションのプライバシー向上のためにミキサーコントラクトあるいは秘密鍵を紛失したユーザーを救済できる緊急復旧などの機能を追加できる規格です。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - より効率的な取引や、トランザクションのバンドル化によるコスト軽減を実現できる規格です。 ユーティリティトークン（$BNBや$BAT など）および非代替性トークン（CryptoPunks など）の両方に使用できます。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 利回りボールト（保管庫）における技術的なパラメータを最適化、統一することを目指して設計された、トークン化ボールト用の規格です。

## 参考文献 {#further-reading}

_役に立つコミュニティリソースをご存知の場合は、 このページを編集して追加してください。_

## 関連トピック {#related-tutorials}

- [トークンの統合作業に関するチェックリスト](/developers/tutorials/token-integration-checklist/) _– トークンのやりとりを統合する際に検討すべき事項が列挙されています。_
- [ERC20 トークンを利用するスマートコントラクトを理解する](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _- イーサリアムのテストネットワーク上ではじめてスマートコントラクトをデプロイする初心者向けの入門ガイドです。_
- [Solidity のスマートコントラクトで ERC20 トークンを転送、承認する方法](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Solidity 言語を用いてトークンのやりとりを行うスマートコントラクトを使用する方法について説明しています。_
- [ERC721 マーケットの実装に関するハウツーガイド](/developers/tutorials/how-to-implement-an-erc721-market/) _– 分散型の掲示板でトークン化アイテムを出品する方法について説明しています。_
