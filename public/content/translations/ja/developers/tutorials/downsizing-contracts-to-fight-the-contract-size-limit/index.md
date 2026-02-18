---
title: "コントラクトのサイズ制限に対処するためのコントラクトのサイズ削減"
description: "スマートコントラクトが大きくなりすぎるのを防ぐためにできること"
author: Markus Waas
lang: ja
tags: [ "Solidity", "スマート契約", "ストレージ" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## なぜ制限があるのですか？ {#why-is-there-a-limit}

2016年11月22日の[Spurious Dragonハードフォーク](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)で、[EIP-170](https://eips.ethereum.org/EIPS/eip-170)が導入され、24.576kbのスマートコントラクトサイズ制限が追加されました。 Solidityデベロッパーにとって、これはコントラクトに機能をどんどん追加していくうちに、ある時点でサイズ制限に達し、デプロイした際に以下のエラーが表示されてしまうということを意味します。

`Warning: Contract code size exceeds 24576 bytes (Spurious Dragonで導入された制限)。 このコントラクトはメインネットではデプロイできない可能性があります。 オプティマイザを有効にする(低い\"runs\"値で！)、revert文字列をオフにする、またはライブラリを使用することを検討してください。`

この制限は、サービス拒否(DOS)攻撃を防ぐために導入されました。 コントラクトの呼び出しは、ガスの観点では比較的安価です。 しかし、イーサリアムノードにとってコントラクト呼び出しの影響は、呼び出されるコントラクトコードのサイズ（ディスクからのコードの読み取り、コードの前処理、マークルプルーフへのデータの追加）に応じて不釣り合いに大きくなります。 攻撃者がリソースをほとんど必要とせずに、他のノードでの大量の処理を生じさせるそうした状況では、DOS攻撃を受ける可能性が常に存在します。

元々、これはそれほど問題ではありませんでした。なぜなら、ブロックのガスリミットが、コントラクトサイズの自然な制限となっていたからです。 言うまでもなく、コントラクトは、コントラクトのバイトコードをすべて含むトランザクション内でデプロイされる必要があります。 ブロックに1つのトランザクションのみを含めると、そのガスのすべてを使うことができますが、無限ではありません。 [ロンドンアップグレード](/ethereum-forks/#london)以降、ブロックのガスリミットはネットワークの需要に応じて15M～30Mユニットの間で変動可能になりました。

以下では、いくつかの方法を、その影響の大きい順に見ていきます。 減量の観点から考えてみましょう。 目標体重(この場合は24kb)を達成するための最良の戦略は、まず影響の大きい方法に集中することです。 ほとんどの場合、食生活を改善するだけで解決しますが、もう少し何かが必要な場合もあります。 その場合は、運動(中程度の影響)やサプリメント(小程度の影響)を追加することになるでしょう。

## 大きな影響 {#big-impact}

### コントラクトを分割する {#separate-your-contracts}

これは常に最初のアプローチであるべきです。 コントラクトを複数の小さなまとまりに分割するにはどうすればよいでしょうか? 一般的には、コントラクトのための良いアーキテクチャを考えなければなりません。 コードの可読性の観点からは、より小さなコントラクトが常に好まれます。 コントラクトを分割するには、自問してみてください:

- どの関数がセットになっていますか? それぞれの関数セットは、独自のコントラクトにまとめるのが最善かもしれません。
- コントラクトの状態や、状態の特定のサブセットのみの読み取りを必要としないのは、どの関数ですか?
- ストレージと機能を分けることはできますか?

### ライブラリ {#libraries}

機能に関するコードをストレージから分離する簡単な方法の1つは、[ライブラリ](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)を使用することです。 ライブラリ関数をinternalとして宣言しないでください。internal関数はコンパイル時にコントラクトに直接[追加される](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)ためです。 しかし、public関数を使用する場合、それらは実際には別のライブラリコントラクトに含まれることになります。 ライブラリをより便利に使うために、[`using for`](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)の使用を検討してください。

### プロキシ {#proxies}

より高度な戦略としては、プロキシシステムが挙げられます。 ライブラリは内部で `DELEGATECALL` を使用します。これは、呼び出し元のコントラクトの状態で、別のコントラクトの関数を実行するものです。 プロキシシステムについてさらに学ぶには、[こちらのブログ記事](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)をご覧ください。 プロキシは、アップグレード可能性を有効にするなど、より多くの機能を提供しますが、多くの複雑さも加わります。 何らかの理由によりプロキシシステムが唯一の選択肢でない限り、コントラクトサイズを減らすためだけにプロキシシステムを追加することはお勧めしません。

## 中程度の影響 {#medium-impact}

### 関数を削除する {#remove-functions}

これは明白なはずです。 関数はコントラクトサイズをかなり増大させます。

- **External**: 利便性のために、多くの`view`関数を追加することがよくあります。 サイズ制限に達するまでは、それで全く問題ありません。 その場合は、本当に必要なもの以外はすべて削除することを真剣に検討した方がよいでしょう。
- **Internal**: `internal`/`private`関数を削除し、関数が一度しか呼び出されない場合は、コードをインライン化することもできます。

### 追加の変数を避ける {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

このような簡単な変更で、**0.28kb**の差が生まれます。 コントラクトには同様の状況が数多く見られる可能性があり、それらが積み重なって大きな量になることがあります。

### エラーメッセージを短縮する {#shorten-error-message}

長いrevertメッセージ、特に多くの異なるrevertメッセージは、コントラクトを肥大化させる可能性があります。 代わりに短いエラーコードを使用し、コントラクト内でデコードしてください。 長いメッセージを、以下のように大幅に短くすることができます:

```solidity
require(msg.sender == owner, "このコントラクトのオーナーのみがこの関数を呼び出せます");
```

```solidity
require(msg.sender == owner, "OW1");
```

### エラーメッセージの代わりにカスタムエラーを使用する

カスタムエラーは[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)で導入されました。 カスタムエラーは、コントラクトのサイズを削減するための優れた方法です。なぜなら、（関数と同様に）セレクターとしてABIエンコードされるためです。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### オプティマイザで低いruns値を検討する {#consider-a-low-run-value-in-the-optimizer}

オプティマイザの設定を変更することもできます。 デフォルト値の200は、関数が200回呼び出されるかのようにバイトコードを最適化しようとすることを意味します。 これを1に変更すると、基本的には、各関数を一度だけ実行する場合に最適化するようにオプティマイザに指示することになります。 一度しか実行されないように最適化された関数は、デプロイ自体に対して最適化されていることを意味します。 **これにより関数の実行にかかる[ガス代](/developers/docs/gas/)が増加する**ため、望ましくない場合があることに注意してください。

## 小さな影響 {#small-impact}

### 関数に構造体を渡すのを避ける {#avoid-passing-structs-to-functions}

[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)を使用している場合、関数に構造体を渡さないようにすることが有効です。 パラメータを構造体として渡す代わりに、必要なパラメータを直接渡します。 この例では、さらに**0.1kb**を節約しました。

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### 関数と変数に正しい可視性を宣言する {#declare-correct-visibility-for-functions-and-variables}

- 外部からのみ呼び出される関数や変数ですか？ `public`ではなく`external`として宣言します。
- コントラクト内部からのみ呼び出される関数や変数ですか？ `public`ではなく`private`または`internal`として宣言します。

### 修飾子を削除する {#remove-modifiers}

修飾子は、特に多用されると、コントラクトのサイズに大きな影響を与える可能性があります。 修飾子を削除し、代わりに関数を使用することを検討してください。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

これらのヒントは、コントラクトのサイズを大幅に削減するのに役立つはずです。 繰り返しになりますが、最大の影響を得るためには、可能であれば常にコントラクトの分割に注力してください。
