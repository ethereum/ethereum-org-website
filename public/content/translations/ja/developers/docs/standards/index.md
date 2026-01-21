---
title: "イーサリアム開発規格"
description: "イーサリアムの標準規格について学びましょう。EIP（イーサリアム改善提案）、ERC-20やERC-721のようなトークン標準、そして開発における慣例などが含まれます。"
lang: ja
incomplete: true
---

## 規格の概要 {#standards-overview}

イーサリアムコミュニティは、([イーサリアムクライアント](/developers/docs/nodes-and-clients/)やウォレットなどの) プロジェクトの実装間での相互運用性を維持し、スマートコントラクトとdappsの構成可能性を確保するために、多くの規格を採用しています。

通常、規格は[イーサリアム改善提案](/eips/)(EIP)として導入され、[標準プロセス](https://eips.ethereum.org/EIPS/eip-1)を通じてコミュニティメンバーによって議論されます。

- [EIP入門](/eips/)
- [EIPの一覧](https://eips.ethereum.org/)
- [EIPのGitHubリポジトリ](https://github.com/ethereum/EIPs)
- [EIPディスカッションボード](https://ethereum-magicians.org/c/eips)
- [イーサリアムのガバナンス入門](/governance/)
- [イーサリアムのガバナンスの概要](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019年3月31日 - Boris Mann_
- [イーサリアムプロトコル開発ガバナンスおよびネットワークアップグレードのコーディネーション](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020年3月23日 - Hudson Jameson_
- [すべてのイーサリアム・コア開発者会議のプレイリスト](https://www.youtube.com/@EthereumProtocol) _(YouTubeプレイリスト)_

## 規格の種類 {#types-of-standards}

EIPは、以下の3種類に分類されます:

- スタンダードトラック：すべて／大部分のイーサリアム実装に影響を及ぼす変更について記述します。
- [メタトラック](https://eips.ethereum.org/meta): イーサリアムに関するプロセスについて記述するか、プロセスの変更を提案します。
- [情報トラック](https://eips.ethereum.org/informational): イーサリアムの設計上の問題について記述したり、イーサリアムコミュニティに一般的なガイドラインや情報を提供したりします。

標準トラックはさらに、以下の4つのカテゴリーに分類されます：

- [コア](https://eips.ethereum.org/core): コンセンサスフォークを必要とする改善
- [ネットワーキング](https://eips.ethereum.org/networking): devp2pおよびライト・イーサリアム・サブプロトコルに関する改善、ならびにWhisperおよびSwarmのネットワークプロトコル仕様に対する改善提案。
- [インターフェイス](https://eips.ethereum.org/interface): クライアントAPI/RPCの仕様と規格の改善、およびメソッド名やコントラクトABIのような、特定の言語レベルの規格の改善。
- [ERC](https://eips.ethereum.org/erc): アプリケーションレベルの規格と規約

これらの種類やカテゴリに関する詳細については、[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)を参照してください。

### トークン規格 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 投票トークン、ステーキングトークン、または仮想通貨のような、ファンジブル(代替可能)トークンのための標準インターフェイスです。
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - トークンがEtherと同様に動作し、受信者側でのトークン転送処理をサポートするようにするファンジブルトークン規格。
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - 単一のトランザクションで受信者コントラクトのコールバックを実行することをサポートする、ERC-20トークンの拡張インターフェイス。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - アート作品や歌の権利証のような、非代替性トークン(NFT)の標準インターフェイスです。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - 1つ、または連続したトークン識別子を使用する多数の非代替性トークンを作成・転送する際に発行される、標準化されたイベント。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721のコンシューマーロールのためのインターフェイス拡張。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - ERC-721トークンに、権限が制限された期限付きの役割を追加します。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(非推奨)** ERC-20を改善するトークン規格。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - ファンジブル資産とノンファンジブル資産の両方を含むことができるトークン規格。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 利回りをもたらすボールト(vault)の技術的パラメータを最適化し、統一するために設計されたトークン化ボールトの規格。

[トークン規格](/developers/docs/standards/tokens/)について、さらに詳しく知る。

## 参考リンク{#further-reading}

- [イーサリアム改善提案(EIP)](/eips/)

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_
