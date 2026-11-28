---
title: "コントラクトサイズ制限に対処するためのコントラクトの縮小"
description: "スマート・コントラクトが大きくなりすぎるのを防ぐにはどうすればよいでしょうか？"
author: "マーカス・ワース"
lang: ja
tags: ["Solidity", "スマート・コントラクト", "ストレージ"]
skill: intermediate
breadcrumb: "コントラクトの縮小"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## なぜ制限があるのですか？ {#why-is-there-a-limit}

[2016年11月22日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)のSpurious Dragonハード・フォークで[EIP-170](https://eips.ethereum.org/EIPS/eip-170)が導入され、スマート・コントラクトのサイズ制限が24,576バイト（24 KiB）に設定されました。Solidity開発者にとって、これはコントラクトに機能を追加し続けると、ある時点で制限に達し、コンパイラが次のような警告を出すことを意味します。

`Warning: Contract code size is 25000 bytes and exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

デプロイコード（initcode）についても同様の警告があり、シャンハイアップグレードで[EIP-3860](https://eips.ethereum.org/EIPS/eip-3860)により49,152バイトに制限されました。

この制限は恒久的なものではありません。[EIP-7954](https://eips.ethereum.org/EIPS/eip-7954)はこれを65,536バイト（64 KiB）に、initcodeの制限を131,072バイトに引き上げ、[グラムステルダムアップグレード](/roadmap/glamsterdam/)で予定されています。デプロイ先のネットワークでそのアップグレードが有効になるまでは、そこでの制限は24,576バイトであり、その後も小さなコントラクトの方がデプロイが安価で監査も容易です。

この制限は、サービス拒否（DOS）攻撃を防ぐために導入されました。コントラクトの呼び出しは、ガスの観点からは比較的安価です。しかし、イーサリアムノードに対するコントラクト呼び出しの影響は、呼び出されたコントラクトコードのサイズ（ディスクからのコードの読み取り、コードの事前処理、マークル証明へのデータの追加）に応じて不釣り合いに増加します。攻撃者が少ないリソースで他者に多大な作業を強いることができるような状況では常に、DOS攻撃の可能性が生じます。

元々、ブロックのガス・リミットが自然なコントラクトサイズ制限の1つであったため、これはそれほど問題ではありませんでした。当然ながら、コントラクトは、そのコントラクトのすべてのバイトコードを保持するトランザクション内でデプロイされる必要があります。その1つのトランザクションだけをブロックに含めれば、そのガスをすべて使い切ることができますが、無限ではありません。現在、ブロックのガス・リミットは数千万ガスであり、バリデーターによって何度か引き上げられているため、それ自体で非常に大きなコントラクトを許容することになります。[フサカアップグレード](/roadmap/fusaka/)以降、単一のトランザクションも16,777,216ガスに制限されています（[EIP-7825](https://eips.ethereum.org/EIPS/eip-7825)）が、それでも24 KiBのコントラクトをデプロイするコストをはるかに上回っているため、明示的なサイズ制限が必要なのです。

以下では、潜在的な影響の大きさ順にいくつかの方法を見ていきます。減量に例えて考えてみてください。目標体重（この場合は24kb）を達成するための最良のストラテジーは、まず影響の大きな方法に焦点を当てることです。ほとんどの場合、食事を改善するだけで目標に到達できますが、時にはもう少し努力が必要な場合もあります。その場合、運動（中程度の影響）やサプリメント（小さな影響）を追加するかもしれません。

## 大きな影響 {#big-impact}

### コントラクトの分割 {#separate-your-contracts}

これは常に最初のアプローチであるべきです。コントラクトを複数の小さなコントラクトに分割するにはどうすればよいでしょうか？これにより、通常はコントラクトの優れたアーキテクチャを考案することが求められます。コードの可読性の観点からは、常に小さなコントラクトが好まれます。コントラクトを分割する際は、次のように自問してみてください。

- どの関数が一緒に属しているか？関数の各セットは、それぞれ独自のコントラクトに配置するのが最適かもしれません。
- コントラクトの状態を読み取る必要がない関数、または状態の特定のサブセットのみを読み取る関数はどれか？
- ストレージと機能を分割できるか？

### ライブラリ {#libraries}

機能コードをストレージから切り離す簡単な方法の1つは、[ライブラリ](https://docs.soliditylang.org/en/latest/contracts.html#libraries)を使用することです。ライブラリ関数をinternalとして宣言しないでください。コンパイル時に直接[コントラクトに追加](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)されてしまうためです。しかし、public関数を使用すれば、それらは実際には別のライブラリコントラクトに配置されます。ライブラリをより便利に使用するために、[using for](https://docs.soliditylang.org/en/latest/contracts.html#using-for)の使用を検討してください。

### プロキシ {#proxies}

より高度なストラテジーとして、プロキシシステムがあります。ライブラリは裏で`DELEGATECALL`を使用しており、これは単に呼び出し元のコントラクトの状態を使用して別のコントラクトの関数を実行するものです。プロキシシステムの詳細については、[スマート・コントラクトのアップグレード](/developers/docs/smart-contracts/upgrading/)を確認してください。これらはアップグレード可能性を可能にするなど、より多くの機能を提供しますが、同時に多くの複雑さも追加します。何らかの理由でそれが唯一の選択肢でない限り、コントラクトサイズを縮小するためだけにこれらを追加することはお勧めしません。

## 中程度の影響 {#medium-impact}

### 関数の削除 {#remove-functions}

これは明白なはずです。関数はコントラクトサイズをかなり増加させます。

- **External**: 利便性のために多くのview関数を追加することがよくあります。サイズ制限に達するまではそれで全く問題ありません。しかし制限に達した場合は、絶対に不可欠なもの以外をすべて削除することを真剣に検討するべきです。
- **Internal**: internal/private関数を削除し、その関数が1回しか呼び出されない限り、単にコードをインライン化することもできます。

### 追加の変数を避ける {#avoid-additional-variables}

```solidity
struct MyStruct {
    address addr1;
    address addr2;
}

mapping(uint => MyStruct) myStructs;

function get(uint id) public view returns (address, address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

この記事の執筆時点では、このような単純な変更で**0.28kb**の違いが生じました。正確な節約量はコンパイラのバージョンと設定に依存します（Solidity 0.8.37では、オプティマイザなしで約0.1kb、オプティマイザありではさらに少なくなります）ので、常に測定してください。コントラクト内で同様の状況を多く見つけることができる可能性があり、それらが積み重なるとかなりの量になる可能性があります。

### エラーメッセージを短くする {#shorten-error-message}

長いリバートメッセージ、特に多くの異なるリバートメッセージは、コントラクトを肥大化させる可能性があります。代わりに短いエラーコードを使用し、コントラクト内でそれらをデコードします。長いメッセージははるかに短くなる可能性があります。

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### エラーメッセージの代わりにカスタムエラーを使用する {#use-custom-errors-instead-of-error-messages}

カスタムエラーは[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/)で導入されました。これらは（関数と同様に）セレクタとしてABIエンコードされるため、コントラクトのサイズを縮小するための優れた方法です。

```solidity
error Unauthorized();

function doSomething() public view {
    if (msg.sender != owner) {
        revert Unauthorized();
    }
}
```

### オプティマイザのrun値を低く設定することを検討する {#consider-a-low-run-value-in-the-optimizer}

オプティマイザの設定を変更することもできます。デフォルト値の200は、関数が200回呼び出されると想定してバイトコードを最適化しようとしていることを意味します。これを1に変更すると、基本的には各関数が1回だけ実行されるケースに合わせて最適化するようにオプティマイザに指示することになります。1回だけ実行するように最適化された関数は、デプロイ自体に最適化されていることを意味します。**これにより関数を実行するための[ガスコスト](/developers/docs/gas/)が増加する**ことに注意してください。そのため、この設定を行いたくない場合もあるでしょう。`viaIR`を有効にしてコンパイルする場合は、IRベースのコードジェネレータが著しく異なるバイトコードサイズを生成する可能性があるため、有効にした場合と無効にした場合の両方でサイズを確認してください。詳細については、[オプティマイザのオプション](https://docs.soliditylang.org/en/latest/using-the-compiler.html#optimizer-options)を参照してください。

## 小さな影響 {#small-impact}

### 関数に構造体を渡すのを避ける {#avoid-passing-structs-to-functions}

[ABI coder v2](https://docs.soliditylang.org/en/latest/layout-of-source-files.html#abi-coder-pragma)（Solidity 0.8.0以降のデフォルト）を使用している場合、関数に構造体を渡さないことが役立つ場合があります。パラメータを構造体として渡す代わりに、必要なパラメータを直接渡します。この例では、さらに**0.1kb**節約できました。

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id]);
}

function _get(MyStruct memory myStruct) private pure returns (address, address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) public view returns (address, address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private pure returns (address, address) {
    return (addr1, addr2);
}
```

### 関数と変数の正しい可視性を宣言する {#declare-correct-visibility-for-functions-and-variables}

- 外部からのみ呼び出される関数や変数ですか？`public`の代わりに`external`として宣言します。
- コントラクト内からのみ呼び出される関数や変数ですか？`public`の代わりに`private`または`internal`として宣言します。

### 修飾子を削除する {#remove-modifiers}

修飾子は、特に多用された場合、コントラクトサイズに大きな影響を与える可能性があります。これらを削除し、代わりに関数を使用することを検討してください。

```solidity
modifier checkStuff() {
    require(msg.sender == owner, "OW1");
    _;
}

function doSomething() public checkStuff {}
```

```solidity
function checkStuff() private view {
    require(msg.sender == owner, "OW1");
}

function doSomething() public view {
    checkStuff();
}
```

これらのヒントは、コントラクトサイズを大幅に縮小するのに役立つはずです。繰り返しになりますが、最大の影響を得るために、可能であれば常にコントラクトの分割に焦点を当てることを強くお勧めします。
