---
title: オフラインデータの完全性のためのマークルプルーフ
description: オフチェーンに大部分が保存されているデータに対し、オンチェーンでのデータの完全性の確保
author: Ori Pomerantz
tags:
  - "ストレージ"
skill: advanced
lang: ja
published: 2021-12-30
---

## はじめに {#introduction}

すべてのデータは、イーサリアムストレージに保存することが理想的です。このストレージは、数千ものコンピューターに保存され、非常に高い可用性(データは検閲されない)と完全性(データは不正に変更されない)を備えていますが、32 バイトワードを保存するのに通常 2 万ガスがかかります。 執筆時点で、そのコストは$6.60 に相当します。 1 バイトごとに 21 セントかかるため、多くの用途には高すぎます。

この問題を解決するために、イーサリアムのエコシステムでは[データを保存する多くの分散型の方法](/developers/docs/storage/)が開発されました。 通常、これらは可用性と価格のトレードオフを伴います。 しかしながら、一般に完全性は保証されます。

この記事では、ブロックチェーンにデータを保存することなくデータ完全性を確保する**方法**として[マークルプルーフ](https://computersciencewiki.org/index.php/Merkle_proof)を使用する方法を学びます。

## 仕組み {#how-does-it-work}

理論上、チェーン上にデータのハッシュだけを保存し、トランザクション内で必要なすべてのデータを送信することができます。 しかし、これでもまだ高すぎます。 1 バイトのデータのトランザクションのコストは約 16 ガスで、現時点では 0.5 セントです。つまり、1 キロバイトあたり約 $5 になります。 1 メガバイトでは $5000 になり、データをハッシュ化するコストを差し引いても、多くの用途にはまだ高すぎます。

これを解決するには、異なるデータのサブセットを繰り返しハッシュ化します。そうすることで、データを送信する必要が無い場合は、ハッシュを送信するだけで済むようになります。 これを行うには、次のようなマークルツリーを使用します。このツリーは、それぞれのノードがその下のノードのハッシュとなるデータ構造を持ちます。

![マークルツリー](tree.png)

チェーン上に保存する必要があるのは、ルートハッシュのみとなります。 特定の値を証明するには、ルートのハッシュを得るために、その値と結合させる必要があるハッシュをすべて提供します。 例えば、`C`を証明するには、`D`、`H(A-B)`、`H(E-H)`を提供します。

![Cの値の証明](proof-c.png)

## 実装 {#implementation}

[サンプルコードはこちらで入手できます](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity)。

### オフチェーンコード {#off-chain-code}

この記事では、オフチェーン計算に JavaScript を使用します。 ほとんどの分散型アプリケーションには、JavaScript のオフチェーンコンポーネントがあります。

#### マークルルートの作成 {#creating-the-merkle-root}

最初に、マークルルートをチェーンに提供する必要があります。

```javascript
const ethers = require("ethers")
```

[ethers パッケージのハッシュ関数を使用します](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256)。

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

各エントリを単一の 256 ビット整数にエンコードすると、JSON を使用した場合などよりも読みにくいコードになります。 しかし、これによりコントラクト内のデータを取得するための処理量が大幅に削減され、ガス代も大幅に削減されます。 [チェーン上で JSON を読み取ることができますが](https://github.com/chrisdotn/jsmnSol)、回避できるのであれば避けるべきです。

```javascript
// The array of hash values, as BigInts
const hashArray = dataArray
```

ここでは、256 ビット値のデータで始めるので、処理は必要ありません。 文字列型のようなより複雑なデータ構造を使用する場合は、まずデータをハッシュ化してハッシュ配列を取得する必要があります。 これは、ユーザーが他のユーザーの情報を知っていても知らなくても構わないことを前提にしているためでもあります。 さもなければ、ユーザー 1 がユーザー 0 の値がわからないように、ユーザー 2 がユーザー 3 の値がわからないように、というようなハッシュ化をしなければならなくなります。

```javascript
// Convert between the string the hash function expects and the
// BigInt we use everywhere else.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

ethers のハッシュ関数は、`0x60A7`などの 16 進数の JavaScript 文字列を受け取ることを想定しており、同じ構造の別の文字列で応答します。 ただし、コードの他の部分では、`BigInt`を使う方が簡単なため、16 進数文字列に変換してから、もう一度`BigInt`に戻します。

```javascript
// ペアの対称ハッシュのため、順序が逆でも構いません。
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

この関数は対称(a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b のハッシュ)です。 そのため、マークルプルーフを確認するときに、計算された値の前と後のどちらにプルーフの値を配置すべきかについて考慮する必要はありません。 マークルプルーフの確認はオンチェーンで行われるので、必要な処理が少ないほど良いとされます。

警告: 暗号技術は見た目以上に難解です。 この記事の最初のバージョンでは、ハッシュ関数`hash(a^b)`を使用していました。 これは、**好ましくない**手法でした。`a`と`b`の正しい値を知っていれば、`b' = a^b^a'`を使用して目的の`a'`の値を証明できるからです。 この関数では、`hash(a') ^ hash(b')`が既知の値(ルートに向かう経路上の隣のブランチ)と等しくなるように`b'`を計算する必要があり、これは非常に困難です。

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

値の数が 2 の整数乗ではない時は、空のブランチを処理する必要があります。 このプログラムでは、ゼロをプレースホルダーとして配置する方法を使っています。

![ブランチが欠けているマークルツリー](merkle-empty-hash.png)

```javascript
// Calculate one level up the tree of a hash array by taking the hash of
// each pair in sequence
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // To avoid over writing the input // Add an empty value if necessary (we need all the leaves to be // paired)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

この関数は、現在のレイヤーで値のペアをハッシュ化すると、マークルツリーを 1 レベル「登り」ます。 これは効率性を追求した実装ではないことに留意してください。入力のコピーを避け、ループ内で適切なタイミングで単に`hashEmpty`を加えることもできますが、このコードは読みやすさを重視して最適化されています。

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Climb up the tree until there is only one value, that is the // root. // // If a layer has an odd number of entries the // code in oneLevelUp adds an empty value, so if we have, for example, // 10 leaves we'll have 5 branches in the second layer, 3 // branches in the third, 2 in the fourth and the root is the fifth

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

ルートを得るには、残っている値が 1 つしかないところまで登ります。

#### マークルプルーフの作成 {#creating-a-merkle-proof}

マークルプルーフは、マークルルートを得るために、証明される値と一緒にハッシュ化する値です。 証明する値は、他のデータから入手することが多いため、コードの一部としてではなく、別に提供することをお勧めします。

```javascript
// A merkle proof consists of the value of the list of entries to
// hash with. Because we use a symmetrical hash function, we don't
// need the item's location to verify the proof, only to create it
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Until we reach the top
    while (currentLayer.length > 1) {
        // No odd length layers
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // If currentN is odd, add with the value before it to the proof
            ? currentLayer[currentN-1]
               // If it is even, add the value after it
            : currentLayer[currentN+1])

```

ハッシュ化は、`(v[0],v[1])`、`(v[2],v[3])`のように行っていきます。 したがって、偶数の値の場合はその次の値、基数の値の場合は 1 つ前の値が必要です。

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### オンチェーンコード {#on-chain-code}

最後は、証明を確認するコードです。 オンチェーンコードは、[Solidity](https://docs.soliditylang.org/en/v0.8.11/)で書かれています。 ガス代が比較的高価なため、ここでは最適化がかなり重要になります。

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

コードの作成には、[Hardhat 開発環境](https://hardhat.org/)を使用しました。この環境では、開発している間も[Solidity からコンソール出力](https://hardhat.org/tutorial/debugging-with-hardhat-network.html)を得ることができます。

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

マークルルート用の set 関数と get 関数が書かれています。 プロダクションシステムにおいて、誰でもマークルルートを更新できるようにすることは、*非常に好ましくない手法*です。 ここでは、サンプルコードをシンプルにするために、あえて行っています。 **データの完全性が重要なシステムでは、行わないでください**。

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

この関数は、ペアのハッシュを生成します。 JavaScrip コードの`hash`と`pairHash`を Solidity コードに変換したものです。

**注:** これも読みやすさを重視して最適化されています。 [関数定義](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm)によると、データを[`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays)の値として保存することで、変換を回避できる場合があります。

```solidity
    // Verify a Merkle proof
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

数学的表記では、マークルプルーフの検証は次のようになります。 `H(proof_n, H(proof_n-1, H(proof_n-2, .. H(proof_1, H(proof_0, value))...)))`. これをこのコードで実装しています。

## マークルプルーフとロールアップを混在させない {#merkle-proofs-and-rollups}

マークルプルーフは、[ロールアップ](/developers/docs/scaling/#rollups)では、うまく機能しません。 ロールアップでは、すべてのトランザクションデータは L1(レイヤー 1)に書き込まれ、処理は L2(レイヤー 2)で行われるためです。 マークルプルーフをトランザクションで送信するのにかかるコストは、1 レイヤーあたり平均 638 ガスです(現在のコールデータ 1 バイトは、ゼロでなければ 16 ガス、ゼロであれば 4 ガスかかります)。 1024 ワードのデータがある場合、マークルプルーフには 10 レイヤー、つまり合計で 6380 ガスが必要になります。

[Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)の例を見ると、L1 への書き込みには約 100gwei のガス代がかかり、L2 では 0.001gwei のガス代がかかります(これは通常の価格であり、混雑とともに上昇する可能性があります) 。 したがって、L1 の 1 回分のガス代で、L2 では 10 万ガスを処理に使えることになります。 ストレージを上書きしないと仮定すると、L1 の 1 回のガス代で L2 のストレージに約 5 ワード書き込めるということになります。 単一のマークルプルーフの場合、1024 ワードすべてをストレージに書き込むことができ(トランザクションで提供されるのではなく、最初からチェーン上で計算できると仮定した場合)、依然としてほとんどのガスが残ります。

## まとめ {#conclusion}

実際に、マークルツリーを自身で実装することはないかもしれません。 よく知られている監査済みのライブラリを使用できるため、基本的には独自の暗号論的プリミティブを実装しないことをお勧めします。 しかし、マークルプルーフをよく理解し、使いどころを判断できるようになっていただければと思います。

マークルプルーフは、*完全性*を保持しますが、*可用性*は保持しないことに注意してください。 データストレージにアクセスを拒否され、データストレージにアクセスするためのマークルツリーを構築することもできない場合でも、誰も自分の資産を奪うことはできないということを知っていると、ささやかな慰めとなります。 この特性により、マークルツリーは、IPFS などの分散型ストレージで最もよく使用されています。
