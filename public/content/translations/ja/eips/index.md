---
title: イーサリアム改善提案(EIP)
description: EIPを理解するために必要な基本情報
lang: ja
---

# イーサリアム改善提案 (EIP) の概要 {#introduction-to-ethereum-improvement-proposals}

## EIPとは {#what-are-eips}

[イーサリアム改善提案 (EIP)](https://eips.ethereum.org/) は、イーサリアムの新しい機能やプロセスに関する提案を規定する標準規格です。 EIPには、技術仕様の変更案が含まれており、コミュニティの 「信頼できる情報源」として機能します。 イーサリアムのネットワークアップグレードとアプリケーションの標準規格は、EIPプロセスでの議論を通じて開発されます。

イーサリアムコミュニティ内の誰でもEIPを作成することができます。 EIP の記述に関するガイドラインは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1) に含まれています。 EIPには、主に簡潔な技術仕様と提案の背景を提出する必要があります。 EIPの作成者は、コミュニティ内でコンセンサスを得て、提案に対する別の意見を文書化します。 適格なEIPを提出する上での技術的な障壁が高いため、これまでは通常アプリケーションまたはプロトコルのデベロッパーがEIPを提案しています。

## EIPの重要性 {#why-do-eips-matter}

EIPは、イーサリアムで変更がどのように行われ、文書化されるかにおいて、中心的な役割を果たします。 EIP は、人々が変更を提案し、議論し、採用するための手段です。 EIP には[さまざまな種類](https://eips.ethereum.org/EIPS/eip-1#eip-types)があり、コンセンサスに影響を与え、[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) のようなネットワークアップグレードを必要とする低レベルのプロトコル変更のためのコア EIP や、[EIP-20](https://eips.ethereum.org/EIPS/eip-20) や [EIP-721](https://eips.ethereum.org/EIPS/eip-721) のようなアプリケーション標準のための ERC が含まれます。

すべてのネットワークアップグレードは一連の EIP で構成されており、ネットワーク上の各[イーサリアムクライアント](/learn/#clients-and-nodes)によって実装される必要があります。 これは、イーサリアムメインネット上の他のクライアントとコンセンサス状態を維持するには、クライアントデベロッパーは必ず必要なEIPをすべて実装しなければならないということを意味します。

変更の技術仕様の提供に加えて、EIPではイーサリアムでガバナンスが行われます。誰でも自由に提案でき、コミュニティの様々な利害関係者が議論し、提案を標準規格として採用するべきか、ネットワークアップグレードに含めるべきかを判断します。 コア以外のEIPはすべてのアプリケーションで導入される必要はない一方で(例えばEIP-20を実装していない代替トークンを作成可能など)、コアEIPは広く導入されなければならず(同一ネットワークを構成するには、全ノードをアップグレードする必要があるため) 、コアEIPは非コアEIPよりもコミュニティでの広範なコンセンサスを必要とします。

## EIP の歴史 {#history-of-eips}

[イーサリアム改善提案 (EIPs) の GitHub リポジトリ](https://github.com/ethereum/EIPs)は、2015 年 10 月に作成されました。 EIP プロセスは、[Bitcoin Improvement Proposals (BIPs)](https://github.com/bitcoin/bips) プロセスに基づいており、そのプロセス自体は [Python Enhancement Proposals (PEPs)](https://www.python.org/dev/peps/) プロセスに基づいています。

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

EIP 編集者になりたい場合は、[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069) を確認してください。

EIP編集者は、提案がEIPになる準備ができているかを決定し、EIP作成者が提案を進めるのを支援します。 [Ethereum Cat Herders](https://www.ethereumcatherders.com/) は、EIP 編集者とコミュニティとの間の会議の開催を支援しています ([EIPIP](https://github.com/ethereum-cat-herders/EIPIP) を参照)。

図表を含む完全な標準化プロセスは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1) に記載されています

## より詳しく学ぶ {#learn-more}

EIP についてさらに詳しく知りたい場合は、[EIPs ウェブサイト](https://eips.ethereum.org/)と [EIP-1](https://eips.ethereum.org/EIPS/eip-1) を確認してください。 下記は役立つ情報のリンクです。

- [すべてのイーサリアム改善提案のリスト](https://eips.ethereum.org/all)
- [すべての EIP の種類の説明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [すべての EIP のステータスの説明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### コミュニティ教育プロジェクト {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — _PEEPanEIP は、イーサリアム改善提案 (EIPs) と、今後のアップグレードの主な機能について議論する教育ビデオシリーズです。_
- [EIPs.wtf](https://www.eips.wtf/) — _EIPs.wtf は、イーサリアム改善提案 (EIPs) に関する追加情報を提供します。これには、ステータス、実装の詳細、関連するプルリクエスト、コミュニティからのフィードバックが含まれます。_
- [EIP.Fun](https://eipfun.substack.com/) — _EIP.Fun は、イーサリアム改善提案 (EIPs) に関する最新ニュースや EIP 会議の更新情報などを提供します。_
- [EIPs Insight](https://eipsinsight.com/) — _EIPs Insight は、さまざまな情報源から収集された情報に基づき、イーサリアム改善提案 (EIP) のプロセスと統計の状況を表したものです。_

## 参加 {#participate}

誰でもEIPを作成できます。 提案を提出する前に、EIP のプロセスと EIP の書き方の概要が記載されている [EIP-1](https://eips.ethereum.org/EIPS/eip-1) を読み、草案を提出する前に提案がコミュニティと最初に議論される場所である [Ethereum Magicians](https://ethereum-magicians.org/) でフィードバックを求める必要があります。

## 参考資料 {#references}

<cite class="citation">

本ページの内容の一部は、Hudson Jameson[イーサリアムプロトコル開発ガバナンスおよびネットワークアップグレードのコーディネーション](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)より提供されています

</cite>
