---
title: ラップドイーサ(WETH) とは
description: ラップドイーサ(WETH) — Ether (ETH) のERC-20互換ラッパーの紹介。
lang: ja
---

# ラップドイーサ(WETH) {#intro-to-weth}

Ether (ETH) はイーサリアムのネイティブ暗号通貨です。 ステーキングや通貨としての使用、計算のためのガス料金の支払いなど、さまざまな目的で使用されます。 \*\*WETHはETHの機能を拡張したもので、多くのアプリケーションやイーサリアム上の他のデジタル資産である [ERC-20トークン](/glossary/#erc-20) \*\* で必要とされる追加機能を持っています。 ERC-20トークンと連携するためには、ETHも同じERC-20規格に従う必要があります。

このギャップを埋めるために作られたのが、ラップドイーサ (WETH) です。 **WETHはスマートコントラクトであり、任意の量のETHを預けることで、ERC-20トークン標準に準拠した同量のWETH** を受け取ることができます。 WETHはETHを表現したもので、ネイティブアセットのETHとしてではなくERC-20トークンとして扱うことが可能です。 ただし、ガス料金の支払いにはネイティブのETHが必要なので、預ける際には一部を残しておくようにしましょう。

WETHをETHに戻すには、WETHスマートコントラクトを使用します。 WETHスマートコントラクトを使って、任意の量のWETHを引き換え、その分のETHを受け取ることができます。 預けられたWETHはその後、バーンされ、WETHの循環供給から除外されます。

**流通しているETHの約3%がWETHトークンコントラクトにロックされており** 、これは最も使用されている [スマートコントラクト](/glossary/#smart-contract) の1つです。 特に、分散型金融 (DeFi) アプリケーションとやり取りするユーザーにとってWETHは非常に重要です。

## ETHをERC-20トークンとしてラップする理由 {#why-do-we-need-to-wrap-eth}

[ERC-20](/developers/docs/standards/tokens/erc-20/) は、トークンを転送可能にするための標準インターフェースを定義します。そのため、イーサリアムのエコシステム内でこの規格に準拠するアプリケーションや他のトークンと、シームレスにやり取りできるトークンを誰でも作成できます。 しかし、 **ETHはERC-20標準が策定される前から存在していた**ため、ETHはこの仕様に準拠していません。 つまり、ETHを他のERC-20トークンと交換したり、 **ERC-20規格を使用するアプリでETHを利用**したりすることは**容易ではありません** 。 ETHをラップすることで、次のことが可能になります。

- **ETHをERC-20トークンと交換する** ：ETHは直接他のERC-20トークンと交換できません。 しかしWETHはERC-20の代替性トークン規格に準拠しており、他のERC-20トークンと交換可能です。

- **dappsでETHを使用する** ：ETHはERC-20互換ではないため、デベロッパーはdappsでETH用とERC-20トークン用の別々のインターフェースを作成する必要がありました。 ETHをラップすることで、この障害が取り除かれ、開発者は同じdapp内でETHと他のトークンを扱えるようになります。 多くの分散型金融 (DeFi) アプリケーションがこの標準を使用しており、これらのトークンを交換する市場を作成しています。

## ラップドイーサ(WETH) vsイーサ (ETH): 2つの違いは何か？ {#weth-vs-eth-differences}

|     | **イーサ(ETH)**                                                                                   | **ラップドイーサ (WETH)**                                                                                |
| --- | ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 供給  | ETHの供給はEthereumプロトコルによって管理されています。 ETHの [発行](/roadmap/merge/issuance) はトランザクションの処理やブロックの生成時にイーサリアムのバリデータによって行われます。 | WETHはERC-20トークンで、その供給はスマートコントラクトによって管理されています。 新しいWETHは、ユーザーからETHがスマートコントラクトに預け入れられると発行され、WETHをETHに戻す際にはWETHがバーンされます。 |
| 所有権 | 所有権はイーサリアムプロトコルを通じて、アカウント残高により管理されます。                                                                             | WETHの所有権はWETHトークンのスマートコントラクトによって管理され、イーサリアムプロトコルによってセキュリティが確保されています。                                                 |
| ガス  | イーサ(ETH) はイーサリアムネットワーク上の計算のための支払い単位として認められています。 ガス代はgwei (ETHの単位) で表示されます。  | WETHトークンでガスを支払うことはネイティブにサポートされていません。                                                                                 |

## よくある質問 {#faq}

<ExpandableCard title="Do you pay to wrap/unwrap ETH?" eventCategory="/wrapped-eth" eventName="clicked Do you pay to wrap/unwrap ETH?">

ETHをWETHにラップする、またはWETHをETHにアンラップする際には、WETHコントラクトを使用してガス料金を支払います。

</ExpandableCard>

<ExpandableCard title="Is WETH safe?" eventCategory="/wrapped-eth" eventName="clicked Is WETH safe?">

WETHは、シンプルで実践テスト済みのスマートコントラクトに基づいているため、一般的に安全と考えられています。 WETHコントラクトは、イーサリアム上のスマートコントラクトにおける最高のセキュリティ基準である形式的検証も受けています。

</ExpandableCard>

<ExpandableCard title="Why am I seeing different WETH tokens?" eventCategory="/wrapped-eth" eventName="clicked Why am I seeing different WETH tokens?">

このページで説明している [WETHの標準的な実装](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2) 以外にも、他のバリエーションが存在します。 これらはアプリデベロッパーによって作成されたカスタムトークンや、他のブロックチェーン上で発行されたバージョンであり、異なる動作をしたり、異なるセキュリティ特性を持つ可能性があります。 **どのWETH実装とやり取りしているかを確認するために、必ずトークン情報を再確認してください。**

</ExpandableCard>

<ExpandableCard title="What are the WETH contracts on other networks?" eventCategory="/wrapped-eth" eventName="clicked What are the WETH contracts on other networks?">

- [Ethereum Mainnet](https://etherscan.io/token/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2)
- [Arbitrum](https://arbiscan.io/token/0x82af49447d8a07e3bd95bd0d56f35241523fbab1)
- [Optimism](https://optimistic.etherscan.io/token/0x4200000000000000000000000000000000000006)

</ExpandableCard>

## 参考リンク{#further-reading}

- [WETHとは何か？](https://weth.tkn.eth.limo/)
- [Etherscan上のWETHトークン情報](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [WETHの形式的検証](https://zellic.io/blog/formal-verification-weth)
