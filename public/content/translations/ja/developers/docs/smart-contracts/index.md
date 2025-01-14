---
title: スマートコントラクト入門
description: 独自の特性と制限に焦点を当てたスマートコントラクトの概要
lang: ja
---

## スマートコントラクトとは {#what-is-a-smart-contract}

「スマートコントラクト」とは、単にイーサリアムブロックチェーン上で動作するプログラムのことです。 イーサリアムブロックチェーン上の特定のアドレスに存在するコード(その機能)とデータ(その状態)の集合です。

スマートコントラクトは[イーサリアムアカウント](/developers/docs/accounts/)の一種です。 つまり、残高があり、トランザクションの対象とすることができます。 しかし、スマートコントラクトはユーザーによって制御されるものではなく、ネットワークにデプロイされ、プログラムされた通りに実行されます。 ユーザーアカウントは、スマートコントラクトで定義されている機能を実行するトランザクションを送信することで、スマートコントラクトとやり取りできます。 スマートコントラクトはビジネスにおける契約と同じように、ルールを定めて、そのルールをコードによって自動的に適用することができます。 スマートコントラクトは、デフォルトで削除できないようになっており、スマートコントラクトとのやり取りを取り消すことはできません。

## 前提知識 {#prerequisites}

イーサリアムを使い始めたばかりの方や、あまり技術的ではない入門ドキュメントをお探しの方は、[スマートコントラクト入門](/smart-contracts/)をご覧になることをお勧めします。

スマートコントラクトを使い始める前に、[アカウント](/developers/docs/accounts/)、[トランザクション](/developers/docs/transactions/)、[イーサリアム仮想マシン](/developers/docs/evm/)を読んでおいてください。

## デジタル自動販売機 {#a-digital-vending-machine}

スマートコントラクトは、[Nick Szabo](https://unenumerated.blogspot.com/)が説明したように、自動販売機に例えるのが最も適切かもしれません。 適切な入力では、特定の出力が保証されます。

自動販売機でスナックを取得する場合、以下のロジックになります。

```
お金 + スナック選択 = 出てくるスナック
```

このロジックは自動販売機にプログラムされています。

自動販売機と同様に、スマートコントラクトにはロジックがプログラムされています。 この自動販売機がSolidityで書かれたスマートコントラクトであればどのように見えるか、簡単な例を挙げてみましょう。

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. 　 // 2. コントラクトの所有者としてデプロイアドレスを設定 set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

自動販売機が販売員の必要性を無くしたように、スマートコントラクトは多くの業界の仲介者を不要にし、自動化することができます。

## パーミッションレス {#permissionless}

誰でもスマートコントラクトを作成してネットワークにデプロイできます。 [スマートコントラクト言語](/developers/docs/smart-contracts/languages/)でのコーディング方法を学び、コントラクトをデプロイするのに十分なETHを持っていればよいのです。 スマートコントラクトのデプロイは技術的にはトランザクションなので、単純なETH送金に[ガス](/developers/docs/gas/)を支払う必要があるのと同じように、ガスを支払う必要があります。 ただし、コントラクトのデプロイにかかるガス代は、はるかに高くなります。

イーサリアムには以下のような、スマートコントラクトを作成するためのデベロッパーフレンドリーな言語があります。

- Solidity
- Vyper

[開発言語についての詳細](/developers/docs/smart-contracts/languages/)

ただし、イーサリアムの仮想マシンがコントラクトコードを解釈して保存できるようするためには、コントラクトをデプロイする前にコンパイルが必要です。 [コンパイルの詳細](/developers/docs/smart-contracts/compiling/)

## コンポーザビリティ {#composability}

スマートコントラクトはイーサリアム上で公開されており、オープンAPIと考えることができます。 つまり、自分のスマートコントラクトの中で他のスマートコントラクトを呼び出し、自分のスマートコントラクトでできることを大幅に拡張することができるのです。 スマートコントラクトは他のスマートコントラクトをデプロイすることもできます。

[スマートコントラクトのコンポーザビリティ](/developers/docs/smart-contracts/composability/)についてもっと詳しく知る

## 制限事項 {#limitations}

スマートコントラクトだけでは、オフチェーンソースからデータを取得できないため、実世界のイベントに関する情報を得ることはできません。 そのため、実世界のイベントに反応することはできません。 これは、スマートコントラクトの仕様です。 外部の情報に頼ると、セキュリティや分散化のために重要なコンセンサスが損なわれる可能性があるためです。

しかし、ブロックチェーンアプリケーションにとって、オフチェーンデータが使えることは重要です。 そのためソリューションとして、オフチェーンデータを取り込んでスマートコントラクトで利用できるようにするツールである[オラクル](/developers/docs/oracles/)があります。

スマートコントラクトのもう一つの制約は、コントラクトの最大サイズです。 スマートコントラクトの最大サイズは24KBです。それ以上の場合はガス不足になります。 これは、[ダイヤモンドパターン](https://eips.ethereum.org/EIPS/eip-2535)を使用して回避することができます。

## マルチシグコントラクト {#multisig}

マルチシグ(複数署名)コントラクトは、トランザクションを実行するために複数の有効な署名を必要とするスマートコントラクトアカウントです。 これは、相当量のイーサやトークンを保持するコントラクトで単一障害点を回避するのに特に便利です。 マルチシグはまた、コントラクトの実行と鍵の管理の責任を複数の当事者間で分担し、取返しのつかない資金損失につながる秘密鍵の紛失を防ぎます。 これらの理由から、簡単なDAOガバナンスのためにマルチシグコントラクトを利用することができます。 マルチシグでは実行に、許容可能なM個の署名の内のN個の署名(N ≤ M、M > 1)が必要です。 `N = 3, M = 5`と`N = 4, M = 7`が一般的に使用されます。 4/7マルチシグでは、7つの有効な署名のうちの4つが必要です。 これは、3つの署名が失われても資金が回収可能であることを意味します。 この場合、コントラクトを実行するためには、鍵の保有者の過半数の同意と署名が必要であることも意味します。

## スマートコントラクト関連情報 {#smart-contract-resources}

**OpenZeppelin Contracts -** **_安全なスマートコントラクト開発のためのライブラリ。_**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [コミュニティフォーラム](https://forum.openzeppelin.com/c/general/16)

## 参考文献 {#further-reading}

- [Coinbase: スマートコントラクトとは何か](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: スマートコントラクトとは何か](https://chain.link/education/smart-contracts)
- [スマートコントラクトの概要を説明するビデオ](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3学習および監査プラットフォーム](https://updraft.cyfrin.io)
