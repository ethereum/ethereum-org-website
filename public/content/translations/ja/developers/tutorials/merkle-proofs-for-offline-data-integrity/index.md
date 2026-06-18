---
title: "オフラインデータの完全性のためのマークル証明"
description: "主にオフチェーンに保存されるデータのオンチェーンでの完全性を確保する"
author: "オリ・ポメランツ"
tags:
  - ストレージ
skill: advanced
breadcrumb: "マークル証明"
lang: ja
published: 2021-12-30
---

## はじめに {#introduction}

理想的には、すべてをイーサリアムのストレージに保存したいところです。イーサリアムのストレージは数千台のコンピューターに分散して保存されており、極めて高い可用性（データは検閲されない）と完全性（データは不正に変更されない）を備えていますが、32バイトのワードを保存するには通常20,000ガスかかります。この記事を書いている時点では、そのコストは6.60ドルに相当します。1バイトあたり21セントでは、多くの用途にとって高すぎます。

この問題を解決するために、イーサリアムのエコシステムは[分散型でデータを保存する多くの代替方法](/developers/docs/storage/)を開発しました。通常、これらには可用性と価格のトレードオフが伴います。しかし、完全性は通常保証されています。

この記事では、[マークル証明](https://computersciencewiki.org/index.php/Merkle_proof)を使用して、データをブロックチェーンに保存せずにデータの完全性を確保する**方法**について学びます。

## どのように機能するのか？ {#how-does-it-work}

理論的には、データのハッシュをオンチェーンに保存し、それを必要とするトランザクションですべてのデータを送信するだけで済みます。しかし、これでもまだ高すぎます。トランザクションへの1バイトのデータには約16ガスかかり、現在約0.5セント、つまり1キロバイトあたり約5ドルです。1メガバイトあたり5000ドルでは、データをハッシュ化する追加コストがなくても、多くの用途にとってまだ高すぎます。

解決策は、データの異なるサブセットを繰り返しハッシュ化することです。そうすれば、送信する必要のないデータについてはハッシュを送信するだけで済みます。これは、各ノードがその下のノードのハッシュであるツリーデータ構造、マークル・ツリーを使用して行います。

![Merkle Tree](tree.png)

ルートハッシュは、オンチェーンに保存する必要がある唯一の部分です。特定の値を証明するには、ルートを取得するためにその値と組み合わせる必要があるすべてのハッシュを提供します。たとえば、`C`を証明するには、`D`、`H(A-B)`、および`H(E-H)`を提供します。

![Proof of the value of C](proof-c.png)

## 実装 {#implementation}

[サンプルコードはこちらで提供されています](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity)。

### オフチェーンコード {#offchain-code}

この記事では、オフチェーンの計算にJavaScriptを使用します。ほとんどの分散型アプリケーション (dapp) は、オフチェーンコンポーネントをJavaScriptで実装しています。

#### マークル・ルートの作成 {#creating-the-merkle-root}

まず、マークル・ルートをチェーンに提供する必要があります。

```javascript
const ethers = require("ethers")
```

[ethersパッケージのハッシュ関数を使用します](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256)。

```javascript
// 整合性を検証する必要がある生データ。最初の2バイトは
// ユーザー識別子であり、最後の2バイトはユーザーが
// 現在所有しているトークンの量です。
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

各エントリを単一の256ビット整数にエンコードすると、たとえばJSONを使用するよりもコードの可読性が低下します。しかし、これはコントラクトでデータを取得するための処理が大幅に少なくなることを意味し、ガスコストがはるかに低くなります。[オンチェーンでJSONを読み取ることは可能ですが](https://github.com/chrisdotn/jsmnSol)、避けられるのであれば避けるべきです。

```javascript
// BigIntとしてのハッシュ値の配列
const hashArray = dataArray
```

この場合、データは最初から256ビットの値であるため、処理は必要ありません。文字列などのより複雑なデータ構造を使用する場合は、最初にデータをハッシュ化してハッシュの配列を取得する必要があります。これは、ユーザーが他のユーザーの情報を知っても構わないと考えているためでもあります。そうでない場合は、ユーザー1がユーザー0の値を、ユーザー2がユーザー3の値を知らないようにハッシュ化する必要がありました。

```javascript
// ハッシュ関数が期待する文字列と、
// 他のすべての場所で使用するBigIntとの間で変換します。
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethersのハッシュ関数は、`0x60A7`のような16進数を含むJavaScriptの文字列を受け取ることを想定しており、同じ構造の別の文字列を返します。しかし、残りのコードでは`BigInt`を使用する方が簡単なので、16進数の文字列に変換してから元に戻します。

```javascript
// ペアの対称ハッシュ。順序が逆になっても問題ありません。
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

この関数は対称です（aとbの[XOR](https://en.wikipedia.org/wiki/Exclusive_or)のハッシュ）。これは、マークル証明をチェックする際に、証明からの値を計算された値の前に置くか後に置くかを気にする必要がないことを意味します。マークル証明のチェックはオンチェーンで行われるため、そこでの処理は少ないほど良いです。

警告：
暗号技術は見た目よりも難しいものです。
この記事の初期バージョンでは、ハッシュ関数は`hash(a^b)`でした。
これは**悪い**アイデアでした。なぜなら、`a`と`b`の正当な値を知っていれば、`b' = a^b^a'`を使用して任意の`a'`の値を証明できるからです。
この関数を使用すると、`hash(a') ^ hash(b')`が既知の値（ルートに向かう次のブランチ）と等しくなるように`b'`を計算する必要があり、これははるかに困難です。

```javascript
// 特定のブランチが空であり、
// 値を持たないことを示す値
const empty = 0n
```

値の数が2の整数乗でない場合は、空のブランチを処理する必要があります。このプログラムでは、プレースホルダーとしてゼロを配置することでこれを行います。

![Merkle tree with branches missing](merkle-empty-hash.png)

```javascript
// ハッシュ配列のツリーの1つ上のレベルを計算します。これは、
// 各ペアのハッシュを順番に取得することで行います
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // 入力の上書きを避けるため // 必要に応じて空の値を追加します（すべての葉が // ペアになっている必要があります）

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

この関数は、現在のレイヤーの値のペアをハッシュ化することで、マークル・ツリーを1レベル「登り」ます。これは最も効率的な実装ではないことに注意してください。入力のコピーを避け、ループ内の適切な場所で`hashEmpty`を追加するだけでもよかったのですが、このコードは可読性のために最適化されています。

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // 値が1つ（つまり // ルート）になるまでツリーを登ります。 // // レイヤーのエントリ数が奇数の場合、 // oneLevelUpのコードは空の値を追加します。したがって、たとえば // 10個の葉がある場合、2番目のレイヤーには5つのブランチ、3番目には3つの // ブランチ、4番目には2つのブランチがあり、ルートは5番目になります

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

ルートを取得するには、値が1つだけ残るまで登ります。

#### マークル証明の作成 {#creating-a-merkle-proof}

マークル証明は、マークル・ルートを取り戻すために、証明される値と一緒にハッシュ化する値です。証明する値は他のデータから利用できることが多いため、コードの一部としてではなく、個別に提供することを好みます。

```javascript
// マークル証明は、ハッシュ化するエントリのリストの
// 値で構成されます。対称ハッシュ関数を使用するため、
// 証明を検証するためにアイテムの場所は必要なく、作成するためだけに必要です
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // 一番上に到達するまで
    while (currentLayer.length > 1) {
        // 奇数長のレイヤーはありません
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // currentNが奇数の場合、その前の値と一緒に証明に追加します
            ? currentLayer[currentN-1]
               // 偶数の場合、その後の値を追加します
            : currentLayer[currentN+1])

```

`(v[0],v[1])`、`(v[2],v[3])`などをハッシュ化します。したがって、偶数の値には次の値が必要であり、奇数の値には前の値が必要です。

```javascript
        // 次の上のレイヤーに移動します
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### オンチェーンコード {#onchain-code}

最後に、証明をチェックするコードがあります。オンチェーンのコードは[Solidity](https://docs.soliditylang.org/en/v0.8.11/)で書かれています。ガスは比較的高価であるため、ここでは最適化がはるかに重要です。

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

これは[Hardhat開発環境](https://hardhat.org/)を使用して書きました。これにより、開発中に[Solidityからのコンソール出力](https://hardhat.org/docs/cookbook/debug-logs)を得ることができます。

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // 非常に安全ではありません。本番コードでは、
    // この関数へのアクセスは厳密に制限される必要があり、おそらく
    // オーナーに制限されます
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

マークル・ルートのsetおよびget関数です。本番システムで誰でもマークル・ルートを更新できるようにするのは、_極めて悪いアイデア_です。ここではサンプルコードをシンプルにするために行っています。**データの完全性が実際に重要となるシステムでは行わないでください**。

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

この関数はペアハッシュを生成します。これは、`hash`と`pairHash`のJavaScriptコードをSolidityに翻訳しただけのものです。

**注：** これも可読性のための最適化のケースです。[関数定義](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)に基づくと、データを[`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays)値として保存し、変換を避けることができるかもしれません。

```solidity
    // マークル証明を検証する
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

数学的表記では、マークル証明の検証は次のようになります：`H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`。このコードはそれを実装しています。

## マークル証明とロールアップの相性 {#merkle-proofs-and-rollups}

マークル証明は[ロールアップ](/developers/docs/scaling/#rollups)とは相性が良くありません。その理由は、ロールアップはすべてのトランザクションデータをレイヤー1 (L1) に書き込みますが、処理はレイヤー2 (L2) で行うためです。トランザクションと一緒にマークル証明を送信するコストは、1レイヤーあたり平均638ガスです（現在、コールデータの1バイトはゼロでなければ16ガス、ゼロであれば4ガスかかります）。1024ワードのデータがある場合、マークル証明には10レイヤー、つまり合計6380ガスが必要です。

たとえば[オプティミズム](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)を見ると、L1ガスの書き込みには約100 Gweiかかり、L2ガスには0.001 Gweiかかります（これは通常価格であり、混雑時には上昇する可能性があります）。したがって、1つのL1ガスのコストで、L2の処理に10万ガスを費やすことができます。ストレージを上書きしないと仮定すると、これは1つのL1ガスの価格でL2のストレージに約5ワードを書き込めることを意味します。1つのマークル証明について、1024ワード全体をストレージに書き込むことができ（トランザクションで提供されるのではなく、最初からオンチェーンで計算できると仮定して）、それでもガスの大部分が残ります。

## 結論 {#conclusion}

現実には、マークル・ツリーを自分で実装することは決してないかもしれません。使用できるよく知られた監査済みのライブラリがあり、一般的に言って、暗号技術のプリミティブを自分で実装しないのが最善です。しかし、これでマークル証明についてより深く理解し、いつ使用する価値があるかを判断できるようになることを願っています。

マークル証明は_完全性_を保持しますが、_可用性_は保持しないことに注意してください。データストレージがアクセスを許可しないと決定し、アクセスするためのマークル・ツリーを構築することもできない場合、他の誰もあなたの資産を奪うことができないと知っていても、それは小さな慰めにすぎません。したがって、マークル・ツリーはIPFSなどの何らかの分散型ストレージと一緒に使用するのが最適です。

[私の他の作品はこちらをご覧ください](https://cryptodocguy.pro/)。