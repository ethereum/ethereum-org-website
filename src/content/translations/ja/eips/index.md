---
title: イーサリアム改善提案 (EIP)
description: イーサリアム改善提案(EIP)を理解するために必要な基本的な情報
lang: ja
---

# イーサリアム改善提案 (EIP)入門 {#introduction-to-ethereum-improvement-proposals-eips}

## EIP とは {#what-are-eips}

[イーサリアム改善提案(EIP)](https://eips.ethereum.org/)は、イーサリアムに関する新しい機能案やプロセス案を規定する標準規格です。 EIP には、技術仕様の変更案が含まれており、コミュニティの 「信頼できる情報源」として機能します。 イーサリアムのネットワークアップグレードとアプリケーションの標準規格は、EIP プロセスでの議論を通じて開発されます。

イーサリアムコミュニティ内の誰でも EIP を作成することができます。 EIP を書くためのガイドラインは [EIP 1](https://eips.ethereum.org/EIPS/eip-1) に含まれています。 EIP は、機能の簡潔な技術仕様、その根拠を記載する必要があります。 EIP の著者は、コミュニティ内でコンセンサスを構築し、反対意見を文書化します。 適格な EIP を提出するにあたり、技術的な基準が高いため、EIP 著者のほとんどはアプリケーション開発者またはプロトコル開発者でした。

## EIP の重要性 {#why-do-eips-matter}

EIP は、イーサリアムで変更がどのように行われ、文書化されるかにおいて、中心的な役割を果たします。 EIP は変更を提案・議論し、採用する方法です。 [EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types)にはコンセンサスに影響を与え、ネットワークのアップグレードを必要とする下位レベルのプロトコル変更のコア EIP やアプリケーション標準の変更の ERC など、さまざまな種類があります。 例えば、トークンを作成するための標準[ERC20](https://eips.ethereum.org/EIPS/eip-20)や[ERC721](https://eips.ethereum.org/EIPS/eip-721)のように、これらのトークンと相互作用するアプリケーションはすべて、同じルールを使用してトークンを扱うため、相互運用可能なアプリケーションを簡単に開発することができます。

すべてのネットワークアップグレードは、ネットワーク上の各[イーサリアムクライアント](/learn/#clients-and-nodes) によって実装される必要がある一連の EIP で構成されます。 これは、イーサリアムメインネット上の他のクライアントとコンセンサス状態を維持するには、クライアント開発者は必ず必要な EIP をすべて実装しなければならないということを意味します。

変更のための技術仕様を提供することに加えて、EIP はイーサリアムでガバナンスが見られる場所です。誰でも自由に提案でき、コミュニティの様々な利害関係者が議論しそれが標準として採用されるべきか、ネットワークアップグレードに含まれるべきかを判断します。 コア以外の EIP はすべてのアプリケーションで採用される必要はないため、例えば、非[ERC20 トークン](https://eips.ethereum.org/EIPS/eip-20)は作成可能です。ですが、コア EIP は広く採用されなければならず(この理由はすべてのノードが同じネットワークの一部を維持するため)、コア EIP は非コア EIP よりもコミュニティ内でのより広範なコンセンサスを必要とします。

## EIP の歴史 {#history-of-eips}

[イーサリアム改善提案改善提案(EIP) GitHub リポジトリ](https://github.com/ethereum/EIPs) は 2015 年 10 月に作成されました。 EIP のプロセスは、[Bitcoin 改善提案(BIP)](https://github.com/bitcoin/bips) に基づいており、この BIP 自体[Python 改善提案 (PEP)](https://www.python.org/dev/peps/)に準じています。

EIP 編集者は、技術的な健全性、正しいスペル/文法、およびコードスタイルについての EIP のレビューを担当します。 Martin Becze、Vitalik Buterin、Gavin Wood、および他数名が、2015 年から 2016 年まで初代の EIP 編集者でした。 現在の EIP 編集者は次のとおりです:

- Alex Beregszaszi (EWASM/イーサリアム財団)
- Greg Colvin (コミュニティ)
- Casey Detrio (EWASM/イーサリアム財団)
- Matt Garnett (Quilt)
- Hudson James (Ethereum 財団)
- Nick Johnson (ENS)
- Nick Savers (コミュニティ)
- Micah Zoltu (コミュニティ)

EIP 編集者は、[Ethereum Cat Herders](https://ethereumcatherders.com/)や[イーサリアム Magicians](https://ethereum-magicians.org/)のコミュニティメンバーとともに、どの EIP を実装するかを決定し、EIP の円滑化に責任を持ち、EIP を「Final(最終)」または「Withdrawn(却下)」ステージに移行させます。

図表を含む完全な標準化プロセスは、[EIP-1](https://eips.ethereum.org/EIPS/eip-1)に記載されています。

## 詳細 {#learn-more}

下記などの EIP の詳細については、[EIP](https://eips.ethereum.org/)ウェブサイトをご覧ください:

- [様々な EIP の種類](https://eips.ethereum.org/)
- [作成されたすべての EIP 一覧](https://eips.ethereum.org/all)
- [EIP のステータスとその意味](https://eips.ethereum.org/)

## EIP への参加 {#participate}

EIP や ERC は誰でも作成することができますが、EIP の作成前に、[EIP-1](https://eips.ethereum.org/EIPS/eip-1)をお読みください。プロセス、EIP とは、EIP の種類、文書に含まれるべき内容、フォーマットとテンプレート、EIP 編集者のリストなど、EIP について知っておくべきことが記載されています。 新しい EIP は、それほど複雑ではなく、超ニッチでもなく、イーサリアムのエコシステムのプロジェクトで使用できる新機能を定義するものである必要があります。 最も難しいのは円滑な進行です。著者は、提案する EIP に関して、円滑に進め、フィードバックを集め、EIP が解決する問題を説明する記事を書き、EIP を実行するために複数のプロジェクトとコラボレーションする必要があります。

議論のプロセスや EIP について意見を交わしたりすることにご興味がある方は、[イーサリアム・マジシャンズ・フォーラム](https://ethereum-magicians.org/)をご覧ください。

また、以下も参照してください:

- [EIP の作成方法](https://eips.ethereum.org/EIPS/eip-1)

## 参考文献 {#references}

<cite class="citation">

本ページの内容の一部は、Hudson Jameson[イーサリアムプロトコル開発ガバナンスおよびネットワークアップグレードのコーディネーション](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) より提供

</cite>
