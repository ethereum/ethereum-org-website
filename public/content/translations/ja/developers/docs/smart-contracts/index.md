---
title: "スマート・コントラクトの紹介"
description: "スマート・コントラクトの概要。その独自の特徴と制限に焦点を当てています。"
lang: ja
---

## スマート・コントラクトとは? {#what-is-a-smart-contract}

「スマート・コントラクト」とは、単に[イーサリアム](/)・ブロックチェーン上で実行されるプログラムのことです。イーサリアム・ブロックチェーン上の特定のアドレスに存在する、コード(関数)とデータ(状態)の集合体です。

スマート・コントラクトは、[イーサリアム・アカウント](/developers/docs/accounts/)の一種です。つまり、残高を持ち、トランザクションの宛先になることができます。しかし、ユーザーによって制御されるのではなく、ネットワークにデプロイされ、プログラムされた通りに実行されます。ユーザー・アカウントは、スマート・コントラクトで定義された関数を実行するトランザクションを送信することで、スマート・コントラクトと対話できます。スマート・コントラクトは、通常の契約(コントラクト)のようにルールを定義し、コードを通じて自動的に強制することができます。スマート・コントラクトはデフォルトでは削除できず、それらとの対話は不可逆的です。

## 前提条件 {#prerequisites}

これから始める方や、技術的でない紹介をお探しの場合は、[スマート・コントラクトの紹介](/smart-contracts/)をお勧めします。

スマート・コントラクトの世界に飛び込む前に、[アカウント](/developers/docs/accounts/)、[トランザクション](/developers/docs/transactions/)、および[イーサリアム仮想マシン](/developers/docs/evm/)について読んでおいてください。

## デジタル自動販売機 {#a-digital-vending-machine}

[ニック・サボ](https://unenumerated.blogspot.com/)が説明しているように、スマート・コントラクトの最も適切な比喩はおそらく自動販売機でしょう。正しい入力があれば、特定の出力が保証されます。

自動販売機からスナックを取り出すには:

```
お金 + スナックの選択 = スナックの提供
```

このロジックは自動販売機にプログラムされています。

スマート・コントラクトには、自動販売機のようにロジックがプログラムされています。この自動販売機がSolidityで書かれたスマート・コントラクトだった場合、どのようになるかの簡単な例を以下に示します。

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // コントラクトの状態変数を宣言する
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // 'VendingMachine' コントラクトがデプロイされたとき:
    // 1. デプロイしたアドレスをコントラクトのオーナーとして設定する
    // 2. デプロイされたスマート・コントラクトのカップケーキの残高を100に設定する
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // オーナーがスマート・コントラクトのカップケーキの残高を増やせるようにする
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // 誰でもカップケーキを購入できるようにする
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

自動販売機が販売員を不要にするように、スマート・コントラクトは多くの業界で仲介者を置き換えることができます。

## パーミッションレス {#permissionless}

誰でもスマート・コントラクトを書いてネットワークにデプロイできます。[スマート・コントラクト言語](/developers/docs/smart-contracts/languages/)でのコーディング方法を学び、コントラクトをデプロイするのに十分なETHを持っているだけで済みます。スマート・コントラクトのデプロイは技術的にはトランザクションであるため、単純なETHの送金でガスを支払う必要があるのと同じように、[ガス](/developers/docs/gas/)を支払う必要があります。ただし、コントラクトのデプロイにかかるガス・コストははるかに高くなります。

イーサリアムには、スマート・コントラクトを書くための開発者フレンドリーな言語があります。

- Solidity
- Vyper

[言語の詳細](/developers/docs/smart-contracts/languages/)

ただし、イーサリアムの仮想マシンがコントラクトを解釈して保存できるように、デプロイする前にコンパイルする必要があります。[コンパイルの詳細](/developers/docs/smart-contracts/compiling/)

## コンポーザビリティ {#composability}

スマート・コントラクトはイーサリアム上で公開されており、オープンなAPIと考えることができます。つまり、自分のスマート・コントラクト内で他のスマート・コントラクトを呼び出すことで、可能なことを大幅に拡張できます。コントラクトが他のコントラクトをデプロイすることさえ可能です。

[スマート・コントラクトのコンポーザビリティ](/developers/docs/smart-contracts/composability/)についてさらに学ぶ。

## 制限事項 {#limitations}

スマート・コントラクト単独では、オフチェーンのソースからデータを取得できないため、「現実世界」のイベントに関する情報を取得することはできません。つまり、現実世界のイベントに対応することはできません。これは意図的な設計です。外部情報に依存すると、セキュリティと分散化にとって重要なコンセンサスを危険にさらす可能性があります。

しかし、ブロックチェーン・アプリケーションがオフチェーンのデータを使用できることは重要です。その解決策が[オラクル](/developers/docs/oracles/)であり、これはオフチェーンのデータを取り込み、スマート・コントラクトで利用できるようにするツールです。

スマート・コントラクトのもう一つの制限は、コントラクトの最大サイズです。スマート・コントラクトの最大サイズは24KBであり、それを超えるとガス不足になります。これは[ダイヤモンド・パターン](https://eips.ethereum.org/EIPS/eip-2535)を使用することで回避できます。

## マルチシグ・コントラクト {#multisig}

マルチシグ(複数署名)・コントラクトは、トランザクションを実行するために複数の有効な署名を必要とするスマート・コントラクト・アカウントです。これは、大量のイーサやその他のトークンを保持するコントラクトの単一障害点を回避するのに非常に役立ちます。また、マルチシグはコントラクトの実行と鍵管理の責任を複数の当事者間で分割し、単一の秘密鍵の紛失が不可逆的な資金の損失につながるのを防ぎます。これらの理由から、マルチシグ・コントラクトはシンプルなDAOガバナンスに使用できます。マルチシグを実行するには、M個の許容可能な署名のうちN個の署名(N ≤ M、かつM > 1)が必要です。`N = 3, M = 5`や`N = 4, M = 7`が一般的に使用されます。4/7のマルチシグでは、7つの有効な署名のうち4つが必要です。つまり、3つの署名が失われても資金は回収可能です。この場合、コントラクトを実行するには、鍵保持者の過半数が同意して署名する必要があることも意味します。

## スマート・コントラクトのリソース {#smart-contract-resources}

**オープンツェッペリン・コントラクト -** **_安全なスマート・コントラクト開発のためのライブラリ。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティ・フォーラム](https://forum.openzeppelin.com/c/general/16)

## 参考文献 {#further-reading}

- [コインベース: スマート・コントラクトとは?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [チェーンリンク: スマート・コントラクトとは?](https://chain.link/education/smart-contracts)
- [動画: わかりやすい解説 - スマート・コントラクト](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3学習および監査プラットフォーム](https://updraft.cyfrin.io)

## チュートリアル: イーサリアム上のスマート・コントラクト署名 (EIP-1271) {#tutorials}

- [EIP-1271: スマート・コントラクト署名の署名と検証](/developers/tutorials/eip-1271-smart-contract-signatures/) _– EIP-1271がスマート・コントラクトによる署名検証をどのように可能にするかについて、Safeの実装のウォークスルーを交えて解説します。_