---
title: "コントラクトのサイズ制限に対処するためのコントラクトのサイズ削減"
description: スマートコントラクトが大きくなりすぎるのを防ぐためにできること
author: Markus Waas
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "ストレージ"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 制限がある理由 {#why-is-there-a-limit}

[2016年11月22日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)、Spurious Dragonのハードフォークで[EIP-170](https://eips.ethereum.org/EIPS/eip-170)が導入され、24.576 KBのスマートコントラクトのサイズ制限が追加されました。 Solidityデベロッパーにとって、これはコントラクトに機能をどんどん追加していくうちに、ある時点でサイズ制限に達し、デプロイした際に以下のエラーが表示されてしまうということを意味します。

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

この制限は、サービス拒否(DOS)攻撃を防ぐために導入されました。 コントラクトの呼び出しは、ガスの観点では比較的安価です。 しかし、イーサリアムノードのコントラクト呼び出しの影響は、(ディスクからのコードの読み込み、コードの前処理、マークルプルーフへのデータの追加の対象となる)呼び出されたコントラクトコードのサイズによっては、過度に増加することになります。 攻撃者がリソースをほとんど必要とせずに、他のノードでの大量の処理を生じさせるそうした状況では、DOS攻撃を受ける可能性が常に存在します。

コントラクトコードの固有のサイズ制限が、ブロックのガスリミットとなるため、本来これは問題ではありませんでした。 コントラクトは、コントラクトのバイトコードをすべて含むトランザクション内でデプロイされる必要があることは言うまでもありません。 ブロックに1つのトランザクションのみを含めると、そのガスのすべてを使うことができますが、無限ではありません。 [ロンドンアップグレード](/history/#london)以降、ブロックのガスリミットは、ネットワークの需要に応じて15M～30M間で変えられるようになりました。

次に、いくつかの方法を、効果が大きいものから順に見ていきます。 減量の観点から考えてみましょう。 目標体重(この場合は24 KB)を達成するための最良の戦略は、まず効果が大きい方法に集中して取り組むことです。 ほとんどの場合、食生活を改善するだけで解決しますが、もう少し何かが必要な場合もあります。 その場合は、運動(中程度の効果)やサプリメント(小さな効果)を加えるとよいでしょう。

## サイズ削減効果: 大 {#big-impact}

### コントラクトの分割 {#separate-your-contracts}

これは常に最初のアプローチであるべきです。 コントラクトを複数の小さなまとまりに分割するにはどうすればよいでしょうか? 一般的には、コントラクトのための良いアーキテクチャを考えなければなりません。 コードの読みやすさの観点からは、常に、小さなコントラクトコードが好まれます。 コントラクトの分割については、以下の質問を自問してください。

- どの関数がセットになっていますか? 関数の各セットは、そのコントラクト内にあることが最善策となる場合があります。
- コントラクトの状態や、状態の特定のサブセットのみの読み取りを必要としないのは、どの関数ですか?
- ストレージと機能を分けることはできますか?

### ライブラリ {#libraries}

機能コードをストレージから移動させる簡単な方法としては、[ライブラリ](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)の使用が挙げられます。 コンパイル中に直接[コントラクトに追加](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)されるので、ライブラリ関数をinternalで宣言しないでください。 しかし、public関数を使用する場合、それらは実際には別のライブラリコントラクトに含まれることになります。 ライブラリをより便利に利用するには、[using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)の使用を検討してください。

### プロキシ {#proxies}

より高度な戦略としては、プロキシシステムが挙げられます。 このシステムではライブラリが、呼び出し元のコントラクトの状態で単に別のコントラクトの関数を実行する`DELEGATECALL`を裏で使用します。 プロキシシステムの詳細については、[こちらのブログ](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)をご覧ください。 これで機能性が向上します。例えば、アップグレード可能になりますが、複雑さも増します。 何らかの理由によりプロキシシステムが唯一の選択肢でない限り、コントラクトサイズを減らすためだけにプロキシシステムを追加することはお勧めしません。

## サイズ削減効果: 中 {#medium-impact}

### 関数の削除 {#remove-functions}

これは当然実行すべきことです。 関数はコントラクトサイズをかなり増大させます。

- **external**: 利便性の理由から、多くのview関数が頻繁に追加されます。 サイズ制限に達するまでは、追加してもかまいません。 その後で、絶対に必要なもの以外のすべての関数を削除することを真剣に検討します。
- **internal**: internal関数やprivate関数を削除し、関数が一度だけ呼び出される場合に限り、コードを単にインライン化することもできます。

### 変数の追加を回避 {#avoid-additional-variables}

以下のような簡単な変更をするだけで、

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

**0.28 KB**もの差が出ます。 コントラクトでは類似の状況が多く見られます。結果的に、それらがサイズをかなり増大させています。

### エラーメッセージの短縮 {#shorten-error-message}

長いリバート(元に戻す)メッセージ、特に多くの異なるリバートメッセージは、コントラクトを肥大化させる可能性があります。 代わりに、短いエラーコードを使用し、コントラクト内でそれらをデコードします。 そうすると、以下のように、長いメッセージをかなり短くすることができます。

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### エラーメッセージのかわりにカスタムエラーを使用

[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)で、カスタムエラーが導入されました。 カスタムエラーは、コントラクトのサイズを削減するのに効果的な方法です。なぜなら、(関数と同様に)セレクターとしてABIエンコードされるためです。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### オプティマイザでの低い実行値を検討 {#consider-a-low-run-value-in-the-optimizer}

オプティマイザの設定も変更できます。 デフォルト値の200は、関数が200回呼び出される場合と同様にバイトコードを最適化しようとしていることを意味します。 これを1に変更すると、通常、各関数を1回だけ実行するケースに最適化するよう、オプティマイザに指示します。 1回だけ実行するように最適化された関数とは、その関数自体のデプロイのために最適化されていることを意味します。 ただし、**1に設定すると関数の実行にかかる[ガス代](/developers/docs/gas/)が高くなる**ことに注意してください。

## サイズ削減効果: 小 {#small-impact}

### 関数への構造体渡しを回避 {#avoid-passing-structs-to-functions}

[ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)を使用している場合は、関数に構造体を渡さないようにすることができます。 以下のように、パラメータを構造体として渡す代わりに、

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

必要なパラメータを直接渡すようにします。 この例では、さらに**0.1 KB**を節約しました。

### 関数と変数の正しい可視性の宣言 {#declare-correct-visibility-for-functions-and-variables}

- 外部からのみ呼び出される関数や変数ですか? その場合は、`public`ではなく`external`として宣言します。
- コントラクト内からのみ呼び出される関数または変数ですか? その場合は、`public`ではなく`private`あるいは`internal`として宣言します。

### modifierの削除 {#remove-modifiers}

modifier修飾子を過剰に使用すると、コントラクトのサイズに大きな影響を与える可能性があります。 そのため、modifierの代わりに関数を使用することを検討してください。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

これらのヒントを実践することで、コントラクトのサイズを大幅に削減することができます。 繰り返しになりますが、最大の効果を得るためには、可能な限りコントラクトを分割することが重要です。
