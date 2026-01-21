---
title: "JavaScriptデベロッパーのためのイーサリアム"
description: "JavaScriptベースのプロジェクトとツールを使ってイーサリアムの開発方法を学ぶ"
lang: ja
---

JavaScriptはイーサリアムのエコシステムで最も人気のある言語の1つです。 実際、できるだけ多くのイーサリアムの機能をJavaScriptで実装することに注力している[チーム](https://github.com/ethereumjs)も存在しています。

[スタックのすべてのレベル](/developers/docs/ethereum-stack/)で、JavaScript (またはそれに近いもの) を記述する機会があります。

## イーサリアムとの対話 {#interact-with-ethereum}

### JavaScript APIライブラリ {#javascript-api-libraries}

ブロックチェーンへのクエリ、トランザクションの送信などをJavaScriptで記述したい場合、最も便利な方法は[JavaScript APIライブラリ](/developers/docs/apis/javascript/)を使用することです。 これらのAPIを使用すると、デベロッパーは[イーサリアムネットワークのノード](/developers/docs/nodes-and-clients/)と簡単にやり取りできます。

このライブラリにより、イーサリアム上のスマートコントラクトとやり取りできるようになります。そのため、JavaScriptのみで既存のコントラクトとやり取りできるdappを構築することが可能になります。

**チェック**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _JavaScriptとTypeScriptにおけるイーサリアムウォレットの実装とユーティリティを含みます。_
- [viem](https://viem.sh) – _イーサリアムとやり取りするための低レベルのステートレスプリミティブを提供するイーサリアム用TypeScriptインターフェイス。_
- [Drift](https://ryangoree.github.io/drift/) – _組み込みのキャッシュ、フック、テストモックを備え、複数のweb3ライブラリにわたるイーサリアム開発を容易にするTypeScriptメタライブラリ。_

### スマートコントラクト {#smart-contracts}

ご自身でスマートコントラクトを作成したいJavaScriptデベロッパーの方は、[Solidity](https://solidity.readthedocs.io)に慣れ親しんでおくとよいでしょう。 これは最も人気のあるスマートコントラクト言語であり、構文的にはJavaScriptに似ているため、比較的簡単に習得できる可能性があります。

[スマートコントラクト](/developers/docs/smart-contracts/)に関する詳細

## プロトコルを理解する {#understand-the-protocol}

### イーサリアム仮想マシン {#the-ethereum-virtual-machine}

[イーサリアム仮想マシン](/developers/docs/evm/)のJavaScript実装があります。 これは、最新のフォークルールをサポートしています。 フォークルールとは、計画されたアップグレードの結果としてEVMに加えられた変更のことです。

イーサリアム仮想マシンは、さまざまなJavaScriptパッケージに分かれています。これらのパッケージを調べることで、以下の項目について理解を深めることができます。

- 口座
- ブロック
- ブロックチェーン自体
- トランザクション
- その他

これにより、アカウントのデータ構造などについて理解できるようになります。

コードを読みたい場合は、イーサリアムドキュメントを通読するよりも、上記のJavaScriptのほうが役立ちます。

**EVMをチェック**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### ノードとクライアント {#nodes-and-clients}

Ethereumjsクライアントは活発に開発されており、JavaScriptで書かれたイーサリアムクライアントの仕組みを詳しく学ぶことができます。

**クライアントをチェック**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## その他のプロジェクト {#other-projects}

イーサリアムのJavaScript界隈では、その他にも、以下を含めた多くのプロジェクトが進められています。

- ウォレットユーティリティのライブラリ
- イーサリアムのキーを生成、インポート、エクスポートするためのツール
- `merkle-patricia-tree`の実装 – イーサリアムのイエローペーパーで概説されているデータ構造。

[EthereumJSリポジトリ](https://github.com/ethereumjs)で、最も興味があるものについて詳しく調べてみてください。

## 参考リンク{#further-reading}

_役に立つコミュニティリソースを知っていますか? Edit this page and add it!_
