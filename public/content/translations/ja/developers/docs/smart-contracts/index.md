---
title: "スマートコントラクト入門"
description: "独自の特性と制限に焦点を当てたスマートコントラクトの概要"
lang: ja
---

## スマートコントラクトとは {#what-is-a-smart-contract}

「スマートコントラクト」とは、単にイーサリアムブロックチェーン上で動作するプログラムのことです。 イーサリアムブロックチェーン上の特定のアドレスに存在するコード(その機能)とデータ(その状態)の集合です。

スマートコントラクトは[イーサリアムアカウント](/developers/docs/accounts/)の一種です。 つまり、残高があり、トランザクションの対象とすることができます。 しかし、スマートコントラクトはユーザーによって制御されるものではなく、ネットワークにデプロイされ、プログラムされた通りに実行されます。 ユーザーアカウントは、スマートコントラクトで定義されている機能を実行するトランザクションを送信することで、スマートコントラクトとやり取りできます。 スマートコントラクトはビジネスにおける契約と同じように、ルールを定めて、そのルールをコードによって自動的に適用することができます。 スマートコントラクトは、デフォルトで削除できないようになっており、スマートコントラクトとのやり取りを取り消すことはできません。

## 前提条件 {#prerequisites}

始めたばかりの方や、技術的すぎない入門ガイドをお探しの方には、[スマートコントラクト入門](/smart-contracts/)をお勧めします。

スマートコントラクトの世界に飛び込む前に、[アカウント](/developers/docs/accounts/)、[トランザクション](/developers/docs/transactions/)、[イーサリアム仮想マシン](/developers/docs/evm/)について必ず読んでおいてください。

## デジタル自動販売機 {#a-digital-vending-machine}

スマートコントラクトの最も良い例えは、[Nick Szabo](https://unenumerated.blogspot.com/)が説明している自動販売機かもしれません。 適切な入力では、特定の出力が保証されます。

自動販売機でスナックを取得する場合、以下のロジックになります。

```
お金 + スナック選択 = 出てくるスナック
```

このロジックは自動販売機にプログラムされています。

自動販売機と同様に、スマートコントラクトにはロジックがプログラムされています。 この自動販売機がSolidityで書かれたスマートコントラクトであればどのように見えるか、簡単な例を挙げてみましょう。

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // コントラクトの状態変数を宣言
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine'コントラクトがデプロイされた時:
    // 1. デプロイしたアドレスをコントラクトの所有者としてセット
    // 2. デプロイされたスマートコントラクトのカップケーキの残高を100にセット
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // 所有者がスマートコントラクトのカップケーキの残高を増やせるようにする
    function refill(uint amount) public {
        require(msg.sender == owner, "補充できるのは所有者のみです。");
        cupcakeBalances[address(this)] += amount;
    }

    // 誰でもカップケーキを購入できるようにする
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "カップケーキ1個あたり少なくとも1ETHを支払う必要があります");
        require(cupcakeBalances[address(this)] >= amount, "この購入を完了するのに十分なカップケーキの在庫がありません");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

自動販売機が販売員の必要性を無くしたように、スマートコントラクトは多くの業界の仲介者を不要にし、自動化することができます。

## パーミッションレス {#permissionless}

誰でもスマートコントラクトを作成してネットワークにデプロイできます。 [スマートコントラクト言語](/developers/docs/smart-contracts/languages/)でのコーディング方法を学び、コントラクトをデプロイするのに十分なETHを持っているだけでよいのです。 スマートコントラクトのデプロイは技術的にはトランザクションなので、単純なETHの送金でガスを支払う必要があるのと同様に、[ガス](/developers/docs/gas/)を支払う必要があります。 ただし、コントラクトのデプロイにかかるガス代は、はるかに高くなります。

イーサリアムには以下のような、スマートコントラクトを作成するためのデベロッパーフレンドリーな言語があります。

- Solidity
- Vyper

[言語についての詳細](/developers/docs/smart-contracts/languages/)

ただし、イーサリアムの仮想マシンがコントラクトコードを解釈して保存できるようするためには、コントラクトをデプロイする前にコンパイルが必要です。 [コンパイルについての詳細](/developers/docs/smart-contracts/compiling/)

## コンポーザビリティ {#composability}

スマートコントラクトはイーサリアム上で公開されており、オープンAPIと考えることができます。 つまり、自分のスマートコントラクトの中で他のスマートコントラクトを呼び出し、自分のスマートコントラクトでできることを大幅に拡張することができるのです。 スマートコントラクトは他のスマートコントラクトをデプロイすることもできます。

[スマートコントラクトのコンポーザビリティ](/developers/docs/smart-contracts/composability/)の詳細はこちら。

## 制約事項 {#limitations}

スマートコントラクトだけでは、オフチェーンソースからデータを取得できないため、実世界のイベントに関する情報を得ることはできません。 そのため、実世界のイベントに反応することはできません。 これは、スマートコントラクトの仕様です。 外部の情報に頼ると、セキュリティや分散化のために重要なコンセンサスが損なわれる可能性があるためです。

しかし、ブロックチェーンアプリケーションにとって、オフチェーンデータが使えることは重要です。 そのための解決策は、オフチェーンデータを取り込んでスマートコントラクトで利用できるようにするツールである[オラクル](/developers/docs/oracles/)です。

スマートコントラクトのもう一つの制約は、コントラクトの最大サイズです。 スマートコントラクトの最大サイズは24KBです。それ以上の場合はガス不足になります。 これは[The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535)を使用することで回避できます。

## マルチシグコントラクト {#multisig}

マルチシグ(複数署名)コントラクトは、トランザクションを実行するために複数の有効な署名を必要とするスマートコントラクトアカウントです。 これは、相当量のイーサやトークンを保持するコントラクトで単一障害点を回避するのに特に便利です。 マルチシグはまた、コントラクトの実行と鍵の管理の責任を複数の当事者間で分担し、取返しのつかない資金損失につながる秘密鍵の紛失を防ぎます。 これらの理由から、簡単なDAOガバナンスのためにマルチシグコントラクトを利用することができます。 マルチシグは、実行するために、承認可能なM個の署名のうちN個の署名を必要とします(N ≤ M、かつ M > 1)。 `N = 3, M = 5` と `N = 4, M = 7` が一般的に使用されます。 4/7マルチシグでは、7つの有効な署名のうちの4つが必要です。 これは、3つの署名が失われても資金が回収可能であることを意味します。 この場合、コントラクトを実行するためには、鍵の保有者の過半数の同意と署名が必要であることも意味します。

## スマートコントラクト関連リソース {#smart-contract-resources}

**OpenZeppelin Contracts -** **_安全なスマートコントラクト開発のためのライブラリ。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/general/16)

## 参考リンク {#further-reading}

- [Coinbase: スマートコントラクトとは](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: スマートコントラクトとは](https://chain.link/education/smart-contracts)
- [ビデオ: スマートコントラクトの簡単な説明](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3学習・監査プラットフォーム](https://updraft.cyfrin.io)
