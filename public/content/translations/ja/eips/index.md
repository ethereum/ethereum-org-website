---
title: イーサリアム改善提案 (EIP) の紹介
metaTitle: イーサリアム改善提案 (EIP)
description: EIPを理解するために必要な基本情報
lang: ja
---

## EIPとは何ですか？ {#what-are-eips}

[イーサリアム改善提案 (EIP)](https://eips.ethereum.org/)は、イーサリアムの潜在的な新機能やプロセスを指定する標準です。EIPには提案された変更の技術仕様が含まれており、コミュニティにとっての「信頼できる情報源」として機能します。[イーサリアム](/)のネットワークアップグレードやアプリケーション標準は、EIPプロセスを通じて議論され、開発されます。

イーサリアムコミュニティの誰もがEIPを作成することができます。EIPの作成ガイドラインは[EIP-1](https://eips.ethereum.org/EIPS/eip-1)に含まれています。EIPは主に、簡潔な技術仕様と少しの動機付けを提供するべきです。EIPの著者は、コミュニティ内でコンセンサスを得ること、および代替意見を文書化する責任があります。整ったEIPを提出するための技術的な障壁が高いため、歴史的に、ほとんどのEIP著者は通常、アプリケーションまたはプロトコルの開発者です。

## なぜEIPは重要なのでしょうか？ {#why-do-eips-matter}

EIPは、イーサリアム上で変更がどのように発生し、文書化されるかにおいて中心的な役割を果たします。これらは、人々が変更を提案し、議論し、採用するための手段です。[さまざまな種類のEIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)があり、これにはコンセンサスに影響を与え、[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559)のようなネットワークアップグレードを必要とする低レベルのプロトコル変更のためのコアEIPや、[EIP-20](https://eips.ethereum.org/EIPS/eip-20)や[EIP-721](https://eips.ethereum.org/EIPS/eip-721)のようなアプリケーション標準のためのERCが含まれます。

すべてのネットワークアップグレードは、ネットワーク上の各[イーサリアムクライアント](/learn/#clients-and-nodes)によって実装される必要がある一連のEIPで構成されています。これは、イーサリアム・メインネット上の他のクライアントとコンセンサスを維持するために、クライアント開発者は必要なEIPをすべて実装していることを確認する必要があることを意味します。

変更の技術仕様を提供することに加えて、EIPはイーサリアムにおいてガバナンスが行われる単位でもあります。誰でも自由に提案でき、その後、コミュニティのさまざまな利害関係者が議論して、標準として採用すべきか、またはネットワークアップグレードに含めるべきかを決定します。非コアEIPはすべてのアプリケーションで採用される必要はありませんが（たとえば、EIP-20を実装しない代替可能トークンを作成することは可能です）、コアEIPは広く採用される必要があります（すべてのノードが同じネットワークの一部であり続けるためにアップグレードする必要があるため）。そのため、コアEIPは非コアEIPよりもコミュニティ内で幅広いコンセンサスを必要とします。

## EIPの歴史 {#history-of-eips}

[イーサリアム改善提案 (EIP) のGitHubリポジトリ](https://github.com/ethereum/EIPs)は、2015年10月に作成されました。EIPプロセスは、[ビットコイン改善提案 (BIP)](https://github.com/bitcoin/bips)プロセスに基づいており、BIP自体は[Python拡張提案 (PEP)](https://www.python.org/dev/peps/)プロセスに基づいています。

EIPエディターは、技術的な妥当性、フォーマットの問題、およびスペル、文法、コードスタイルの修正についてEIPをレビューするプロセスを担当しています。Martin Becze、ヴィタリック・ブテリン、ギャビン・ウッド、およびその他の数名が、2015年から2016年後半までの初期のEIPエディターでした。

現在のEIPエディターは以下の通りです。

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

名誉EIPエディターは以下の通りです。

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

EIPエディターになりたい場合は、[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069)を確認してください。

EIPエディターは、提案がEIPになる準備がいつ整ったかを決定し、EIP著者が提案を前進させるのを支援します。[Ethereum Cat Herders](https://www.ethereumcatherders.com/)は、EIPエディターとコミュニティ間の会議の開催を支援しています（[EIPIP](https://github.com/ethereum-cat-herders/EIPIP)を参照）。

チャートを含む完全な標準化プロセスは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1)で説明されています。

## さらに学ぶ {#learn-more}

EIPについてさらに詳しく知りたい場合は、[EIPウェブサイト](https://eips.ethereum.org/)と[EIP-1](https://eips.ethereum.org/EIPS/eip-1)を確認してください。以下はいくつかの役立つリンクです。

- [すべてのイーサリアム改善提案のリスト](https://eips.ethereum.org/all)
- [すべてのEIPタイプの説明](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [すべてのEIPステータスの説明](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### コミュニティ教育プロジェクト {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIPは、イーサリアム改善提案 (EIP) と今後のアップグレードの主要な機能について議論する教育ビデオシリーズです。*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtfは、ステータス、実装の詳細、関連するプルリクエスト、コミュニティのフィードバックなど、イーサリアム改善提案 (EIP) に関する追加情報を提供します。* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Funは、イーサリアム改善提案 (EIP) に関する最新ニュース、EIP会議の最新情報などを提供します。*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insightは、さまざまなリソースから収集された情報に基づく、イーサリアム改善提案 (EIP) プロセスの状態と統計の表現です。*

## 参加する {#participate}

誰でもEIPを作成できます。提案を提出する前に、EIPプロセスとEIPの書き方の概要を説明している[EIP-1](https://eips.ethereum.org/EIPS/eip-1)を読み、ドラフトが提出される前に提案がコミュニティと最初に議論される[Ethereum Magicians](https://ethereum-magicians.org/)でフィードバックを求める必要があります。

## 参考文献 {#references}

<cite class="citation">

ページコンテンツの一部は、Hudson Jamesonによる[Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/)から提供されています。

</cite>