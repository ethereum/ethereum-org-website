---
title: イーサリアム改善提案(EIP)
description: EIPを理解するために必要な基本情報
lang: ja
---

# イーサリアム改善提案(EIP)入門 {#introduction-to-ethereum-improvement-proposals}

## EIPとは {#what-are-eips}

[イーサリアム改善提案(EIP)](https://eips.ethereum.org/)は、イーサリアムの新しい機能やプロセスに関する提案を規定する標準規格です。 EIPには、技術仕様の変更案が含まれており、コミュニティの 「信頼できる情報源」として機能します。 イーサリアムのネットワークアップグレードとアプリケーションの標準規格は、EIPプロセスでの議論を通じて開発されます。

イーサリアムコミュニティ内の誰でもEIPを作成することができます。 EIPを書くためのガイドラインは [EIP-1](https://eips.ethereum.org/EIPS/eip-1)に記載されています。 EIPには、主に簡潔な技術仕様と提案の背景を提出する必要があります。 EIPの作成者は、コミュニティ内でコンセンサスを得て、提案に対する別の意見を文書化します。 適格なEIPを提出する上での技術的な障壁が高いため、これまでは通常アプリケーションまたはプロトコルのデベロッパーがEIPを提案しています。

## EIPの重要性 {#why-do-eips-matter}

EIPは、イーサリアムで変更がどのように行われ、文書化されるかにおいて、中心的な役割を果たします。 EIPは変更を提案・議論し、採用する方法です。 [EIPには複数の種類](https://eips.ethereum.org/EIPS/eip-1#eip-types)があります。[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)のようにコンセンサスに影響を与えてネットワークのアップグレードを要求する下位レベルのプロトコル変更を目的としたコアEIP、 [EIP-20](https://eips.ethereum.org/EIPS/eip-20)や[EIP-721](https://eips.ethereum.org/EIPS/eip-721)などのアプリケーション標準を目的としたERCなどがあります。

すべてのネットワークアップグレードは、複数のEIPで構成され、これらはネットワーク上の各[イーサリアムクライアント](/learn/#clients-and-nodes)に実装される必要があります。 これは、イーサリアムメインネット上の他のクライアントとコンセンサス状態を維持するには、クライアントデベロッパーは必ず必要なEIPをすべて実装しなければならないということを意味します。

変更の技術仕様の提供に加えて、EIPではイーサリアムでガバナンスが行われます。誰でも自由に提案でき、コミュニティの様々な利害関係者が議論し、提案を標準規格として採用するべきか、ネットワークアップグレードに含めるべきかを判断します。 コア以外のEIPはすべてのアプリケーションで導入される必要はない一方で(例えばEIP-20を実装していない代替トークンを作成可能など)、コアEIPは広く導入されなければならず(同一ネットワークを構成するには、全ノードをアップグレードする必要があるため) 、コアEIPは非コアEIPよりもコミュニティでの広範なコンセンサスを必要とします。

## EIPの歴史 {#history-of-eips}

[イーサリアム改善提案改善提案(EIP) Githubリポジトリ](https://github.com/ethereum/EIPs)は2015年10月に作成されました。 EIPプロセスは、[Bitcoin改善提案(BIP)](https://github.com/bitcoin/bips)に基づいており、このBIP自体[Python改善提案 (PEP)](https://www.python.org/dev/peps/)に準じています。

EIP編集者は、技術的な健全性、フォーマットの問題、正しいスペル、文法、およびコードスタイルについてのEIPのレビューを担当します。 Martin Becze、Vitalik Buterin、Gavin Woodなど数名が、2015年から2016年まで初代のEIP編集者でした。

現在のEIP編集者は次のとおりです

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

EIP名誉編集者は次のとおりです

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

EIP編集者になりたい方は、[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)をご確認ください。

EIP編集者は、提案がEIPになる準備ができているかを決定し、EIP作成者が提案を進めるのを支援します。 [イーサリアムキャットハーダーズ(Ethereum Cat Herders)](https://www.ethereumcatherders.com/)は、EIP編集者とコミュニティ間のミーティング開催をサポートします([EIPIP](https://github.com/ethereum-cat-herders/EIPIP)を参照)。

図表を含む完全な標準化プロセスは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1)に記載されています。

## 詳細 {#learn-more}

EIPの詳細についてご興味がある場合は、 [EIPウェブサイト](https://eips.ethereum.org/)や[EIP-1](https://eips.ethereum.org/EIPS/eip-1)をご覧ください。 下記は役立つ情報のリンクです。

- [全EIPのリスト](https://eips.ethereum.org/all)
- [全EIPタイプの説明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [全EIPステータスの説明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### コミュニティ教育プロジェクト {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIPは、イーサリアム改善提案 (EIP) や、今後のアップグレードの主要機能について解説する教育ビデオシリーズです。*
- [EIPs For Nerds](https://ethereum2077.substack.com/t/eip-research) — *EIPs For Nerdsは、さまざまなイーサリアム改善提案 (EIP) について、ELI5スタイルの概要を提供します。これには、コアEIPやアプリケーション/インフラストラクチャ層のEIP (ERC) を含み、読者の教育やイーサリアムプロトコルの変更に対するコンセンサス形成を目的としています。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtfは、イーサリアム改善提案 (EIP) に関する追加情報を提供します。これには、EIPのステータス、実装の詳細、関連するプルリクエスト、およびコミュニティのフィードバックが含まれます。*
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Funは、イーサリアム改善提案 (EIP) に関する最新ニュース、EIP会議のアップデートなどを提供します。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insightは、さまざまなリソースから収集された情報に基づいて、イーサリアム改善提案 (EIP) のプロセス & 統計の現状を表しています。*

## EIPへの参加 {#participate}

誰でもEIPを作成できます。 提案を提出する前に、EIPのプロセスと書き方を概説した[EIP-1](https://eips.ethereum.org/EIPS/eip-1)をお読みください。また、草案を提出する前に、まずコミュニティと議論する場所である[イーサリアム・マジシャンズ](https://ethereum-magicians.org/) でフィードバックを募ってください。

## 参考文献 {#references}

<cite class="citation">

本ページの内容の一部は、Hudson Jameson[イーサリアムプロトコル開発ガバナンスおよびネットワークアップグレードのコーディネーション](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)より提供されています

</cite>
