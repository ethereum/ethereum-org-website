---
title: イーサリアム改善提案(EIP)
description: EIPを理解するために必要な基本情報
lang: ja
---

# イーサリアム改善提案(EIP)入門 {#introduction-to-ethereum-improvement-proposals}

## EIP とは {#what-are-eips}

[イーサリアム改善提案(EIP)](https://eips.ethereum.org/)は、イーサリアムの新しい機能やプロセスに関する提案を規定する標準規格です。 EIP には、技術仕様の変更案が含まれており、コミュニティの 「信頼できる情報源」として機能します。 イーサリアムのネットワークアップグレードとアプリケーションの標準規格は、EIP プロセスでの議論を通じて開発されます。

イーサリアムコミュニティ内の誰でも EIP を作成することができます。 EIP を書くためのガイドラインは [EIP-1](https://eips.ethereum.org/EIPS/eip-1)に記載されています。 EIP には、主に簡潔な技術仕様と提案の背景を提出する必要があります。 EIP の作成者は、コミュニティ内でコンセンサスを得て、提案に対する別の意見を文書化します。 適格な EIP を提出する上での技術的な障壁が高いため、これまでは通常アプリケーションまたはプロトコルのデベロッパーが EIP を提案しています。

## EIP の重要性 {#why-do-eips-matter}

EIP は、イーサリアムで変更がどのように行われ、文書化されるかにおいて、中心的な役割を果たします。 EIP は変更を提案・議論し、採用する方法です。 [EIP には複数の種類](https://eips.ethereum.org/EIPS/eip-1#eip-types)があります。[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)のようにコンセンサスに影響を与えてネットワークのアップグレードを要求する下位レベルのプロトコル変更を目的としたコア EIP、 [EIP-20](https://eips.ethereum.org/EIPS/eip-20)や[EIP-721](https://eips.ethereum.org/EIPS/eip-721)などのアプリケーション標準を目的とした ERC などがあります。

すべてのネットワークアップグレードは、複数の EIP で構成され、これらはネットワーク上の各[イーサリアムクライアント](/learn/#clients-and-nodes)に実装される必要があります。 これは、イーサリアムメインネット上の他のクライアントとコンセンサス状態を維持するには、クライアントデベロッパーは必ず必要な EIP をすべて実装しなければならないということを意味します。

変更の技術仕様の提供に加えて、EIP ではイーサリアムでガバナンスが行われます。誰でも自由に提案でき、コミュニティの様々な利害関係者が議論し、提案を標準規格として採用するべきか、ネットワークアップグレードに含めるべきかを判断します。 コア以外の EIP はすべてのアプリケーションで導入される必要はない一方で(例えば EIP-20 を実装していない代替トークンを作成可能など)、コア EIP は広く導入されなければならず(同一ネットワークを構成するには、全ノードをアップグレードする必要があるため) 、コア EIP は非コア EIP よりもコミュニティでの広範なコンセンサスを必要とします。

## EIP の歴史 {#history-of-eips}

[イーサリアム改善提案改善提案(EIP) Github リポジトリ](https://github.com/ethereum/EIPs)は 2015 年 10 月に作成されました。 EIP プロセスは、[Bitcoin 改善提案(BIP)](https://github.com/bitcoin/bips)に基づいており、この BIP 自体[Python 改善提案 (PEP)](https://www.python.org/dev/peps/)に準じています。

EIP 編集者は、技術的な健全性、フォーマットの問題、正しいスペル、文法、およびコードスタイルについての EIP のレビューを担当します。 Martin Becze、Vitalik Buterin、Gavin Wood など数名が、2015 年から 2016 年まで初代の EIP 編集者でした。

現在の EIP 編集者は次のとおりです

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

EIP 名誉編集者は次のとおりです

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

EIP 編集者になりたい方は、[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)をご確認ください。

EIP 編集者は、提案が EIP になる準備ができているかを決定し、EIP 作成者が提案を進めるのを支援します。 [イーサリアムキャットハーダーズ(Ethereum Cat Herders)](https://www.ethereumcatherders.com/)は、EIP 編集者とコミュニティ間のミーティング開催をサポートします([EIPIP](https://github.com/ethereum-cat-herders/EIPIP)を参照)。

図表を含む完全な標準化プロセスは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1)に記載されています。

## 詳細 {#learn-more}

EIP の詳細についてご興味がある場合は、 [EIP ウェブサイト](https://eips.ethereum.org/)や[EIP-1](https://eips.ethereum.org/EIPS/eip-1)をご覧ください。 下記は役立つ情報のリンクです。

- [全 EIP リスト](https://eips.ethereum.org/all)
- [全 EIP タイプの説明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [全 EIP ステータスの説明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

## EIP への参加 {#participate}

誰でも EIP を作成できます。 提案を提出する前に、EIP のプロセスと書き方を概説した[EIP-1](https://eips.ethereum.org/EIPS/eip-1)をお読みください。また、草案を提出する前に、まずコミュニティと議論する場所である[イーサリアム・マジシャンズ](https://ethereum-magicians.org/) でフィードバックを募ってください。

## 参考文献 {#references}

<cite class="citation">

本ページの内容の一部は、Hudson Jameson[イーサリアムプロトコル開発ガバナンスおよびネットワークアップグレードのコーディネーション](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)より提供されています

</cite>
