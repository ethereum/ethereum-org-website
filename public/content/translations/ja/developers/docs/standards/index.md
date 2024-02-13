---
title: イーサリアム開発規格
description:
lang: ja
incomplete: true
---

## 開発規格の概要 {#standards-overview}

イーサリアムコミュニティでは、（[イーサリアムクライアント](/developers/docs/nodes-and-clients/)やウォレットなどの）各種プロジェクトにおける様々な実装間での相互運用性を維持し、スマートコントラクトやDappに対してコンポーザビリティを提供するために、多くの規格を定めています。

これらの規格は通常、[イーサリアム改善提案](/eips/)（EIP）として提出された後、コミュニティにおいて[標準プロセス](https://eips.ethereum.org/EIPS/eip-1)に従って議論されます。

- [EIPとは何か？](/eips/)
- [EIPリスト](https://eips.ethereum.org/)
- [GitHubのEIPレポジトリ](https://github.com/ethereum/EIPs)
- [EIPディスカッションボード](https://ethereum-magicians.org/c/eips)
- [イーサリアムにおけるガバナンス入門](/governance/)
- [イーサリアムにおけるガバナンスの概説](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019年3月31日、ボリス・マン作成。_
- [イーサリアムにおけるプロトコル開発のガバナンスならびにネットワークアップグレードの調整](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020年3月23日、ハドソン・ジェイムソン作成。_
- [イーサリアム・コアデベロッパー・ミーティングの全プレイリスト](https://www.youtube.com/playlist?list=PLaM7G4Llrb7zfMXCZVEXEABT8OSnd4-7w) _（YouTubeのプレイリスト）_

## 標準規格の種類 {#types-of-standards}

EIPは、以下の3種類に分類されます:

- スタンダードトラック：すべて／大部分のイーサリアム実装に影響を及ぼす変更について記述します。
- [メタトラック](https://eips.ethereum.org/meta)：イーサリアムに関するプロセスについて記述するか、プロセスの変更を提案します。
- [情報トラック](https://eips.ethereum.org/informational)：イーサリアムの設計に関する問題点について記述するか、イーサリアムコミュニティに対する全般的なガイドラインや情報を提供します。

標準トラックはさらに、以下の4つのカテゴリーに分類されます：

- [コア](https://eips.ethereum.org/core)：コンセンサスフォークを必要とする改善。
- [ネットワーク](https://eips.ethereum.org/networking)：devp2pならびにライトイーサリアムのサブプロトコルに関する改善や、WhisperおよびSwarmネットワークプロトコル仕様に対する改善提案。
- [インターフェース](https://eips.ethereum.org/interface)：クライアント向けAPI/RPCの仕様／規格の改善と、メソッドの名称やコントラクトのABIなど、一部の言語レベルにおける規格の改善。
- [ERC](https://eips.ethereum.org/erc)：アプリケーションレベルにおける規格および慣例。

これらの種類やカテゴリーの詳細については、[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)を参照してください。

### トークン規格 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票トークン、ステーキングトークン、通貨トークンなど、代替性トークン (FT) のための標準インタフェースです。
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - transferまたはtransferFromを受信した後の受信者側におけるコードの実行や、承認後におけるspenderコードをサポートする、ERC-20トークンのトークンインターフェイスを定義します。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アートや楽曲に対する所有証明など、非代替性トークン (NFT) を対象とする標準的なインタフェースです。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - ひとつのNFTあるいは連続するトークン識別子を用いた複数のNFTを作成／転送する際に発行される標準イベント。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721コンシューマーロール向けのインターフェース拡張機能。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721トークンに対して、制限付き許可を伴う時間限定ロールを追加します。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **（推奨せず）** ERC-20を改善したトークン規格です。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 代替可能および非代替性の両方のトークンに用いることができるトークン規格です。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 利回りボールト（保管庫）における技術的なパラメータを最適化、統一することを目指して設計された、トークン化ボールト用の規格です。

[トークン規格](/developers/docs/standards/tokens/)に関する詳細情報。

## 参考文献 {#further-reading}

- [イーサリアム改善提案 (EIP)](/eips/)

_役に立つコミュニティリソースをご存知の場合は、 ページを編集して追加してください。_
