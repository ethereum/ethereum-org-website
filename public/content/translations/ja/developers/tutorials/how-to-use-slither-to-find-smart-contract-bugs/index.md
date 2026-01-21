---
title: Slitherを使用してスマートコントラクトのバグを見つける方法
description: Slitherを使用してスマートコントラクトのバグを自動的に見つける方法
author: Trailofbits
lang: ja
tags: [ "Solidity", "スマート契約", "セキュリティ", "テスト" ]
skill: advanced
published: 2020-06-09
source: セキュアなコントラクトの開発
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slitherの使用方法 {#how-to-use-slither}

このチュートリアルでは、Slitherを使って、スマートコントラクトのバグを自動で検出する方法を学びます。

- [インストール](#installation)
- [コマンドラインの使用方法](#command-line)
- [静的解析入門](#static-analysis): 静的解析の簡単な紹介
- [API](#api-basics): Python APIの説明

## インストール {#installation}

SlitherにはPython 3.6以上が必要です。 pipでインストールすることも、Dockerを使用してインストールすることもできます。

pipによるSlitherのインストール:

```bash
pip3 install --user slither-analyzer
```

DockerによるSlitherのインストール:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDockerでeth-security-toolboxを実行します。 ホストからファイルを変更し、Dockerからファイル上のツールを実行できます。_

Docker内で、以下を実行します。

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### スクリプトの実行 {#running-a-script}

Python 3でPythonスクリプトを実行するには:

```bash
python3 script.py
```

### コマンドライン {#command-line}

**コマンドラインとユーザー定義スクリプト。** Slitherには、多くの一般的なバグを見つけるための事前定義された検出器のセットが付属しています。 コマンドラインからSlitherを呼び出すとすべての検出器が実行されるため、静的解析に関する詳細な知識は必要ありません。

```bash
slither project_paths
```

検出器に加えて、Slitherにはその[printers](https://github.com/crytic/slither#printers)と[tools](https://github.com/crytic/slither#tools)を介したコードレビュー機能があります。

[crytic.io](https://github.com/crytic)を使用すると、プライベートな検出器やGitHubとの統合にアクセスできます。

## 静的解析{#static-analysis}

Slither静的解析フレームワークの機能と設計については、ブログ投稿 ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/), [2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) や [学術論文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)で説明されています。

静的解析には、さまざまな種類があります。 おそらくご存じのように、[clang](https://clang-analyzer.llvm.org/)や[gcc](https://lwn.net/Articles/806099/)などのコンパイラはこれらの研究技術に依存していますが、それはまた、([Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](http://findbugs.sourceforge.net/)、そして[Frama-C](https://frama-c.com/)や[Polyspace](https://www.mathworks.com/products/polyspace.html)のような形式的手法に基づくツール) の基礎ともなっています。

ここでは、静的解析の技術と研究者を網羅的に検討するわけではありません。 その代わり、皆さんがバグを発見しコードを理解するためにSlitherをより効果的に使えるよう、Slitherがどのように機能するかを理解するために必要なことに焦点を当てます。

- [コード表現](#code-representation)
- [コード解析](#analysis)
- [中間表現](#intermediate-representation)

### コード表現 {#code-representation}

単一の実行パスについて推論する動的解析とは対照的に、静的解析では一度にすべてのパスを対象として推論します。 そのために、異なるコード表現に依存しています。 最も一般的なものは、抽象構文木 (AST) と制御フローグラフ (CFG) の2つです。

### 抽象構文木 (AST) {#abstract-syntax-trees-ast}

ASTは、コンパイラがコードを解析するたびに使用されます。 これは、おそらく静的解析を実行できる最も基本的な構造です。

要するに、ASTは構造化された木であり、通常、各リーフには変数または定数が含まれ、内部ノードはオペランドまたは制御フロー操作です。 次のコードを考えてみましょう。

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

対応するASTは以下の通りです。

![AST](./ast.png)

SlitherはsolcによってエクスポートされたASTを使用します。

ASTは簡単に構築できますが、入れ子構造になっています。 そのため、解析が必ずしも簡単ではない場合があります。 例えば、`a + b <= a`という式で使われる演算を特定するには、まず`<=`を解析し、次に`+`を解析しなければなりません。 一般的なアプローチは、木構造を再帰的に走査する、いわゆるビジターパターンを使用することです。 Slitherには、[`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)に汎用的なビジターが含まれています。

次のコードは`ExpressionVisitor`を使用して、式に加算が含まれているかどうかを検出します。

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression はテスト対象の式です
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 制御フローグラフ (CFG) {#control-flow-graph-cfg}

2番目に一般的なコード表現は、制御フローグラフ (CFG) です。 その名の通り、すべての実行パスを公開するグラフベースの表現です。 各ノードには、1つまたは複数の命令が含まれます。 グラフのエッジは、制御フロー操作 (if/then/else、ループなど) を表します。 前の例のCFGは次のようになります。

![CFG](./cfg.png)

CFGは、ほとんどの解析がその上に構築される表現です。

他にも多くのコード表現が存在します。 それぞれの表現には、実行したい解析に応じて長所と短所があります。

### 解析 {#analysis}

Slitherで実行できる最も簡単な種類の解析は、構文解析です。

### 構文解析 {#syntax-analysis}

Slitherは、パターンマッチングのようなアプローチを用いて、コードのさまざまな構成要素とその表現を走査し、矛盾や欠陥を見つけることができます。

例えば、以下の検出器は構文関連の問題を探します。

- [状態変数のシャドーイング](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): すべての状態変数を反復処理し、継承されたコントラクトの変数をシャドーイングしているものがないかチェックします ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [不正確なERC20インターフェース](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): 不正確なERC20関数のシグネチャを探します ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### 意味解析 {#semantic-analysis}

構文解析とは対照的に、意味解析はより深く掘り下げ、コードの「意味」を解析します。 この系統には、いくつかの広範な種類の解析が含まれます。 それらはより強力で有用な結果につながりますが、記述もより複雑になります。

意味解析は、最も高度な脆弱性検出に使用されます。

#### データ依存性解析 {#fixed-point-computation}

`variable_a`の値が`variable_b`に影響されるパスが存在する場合、変数`variable_a`は`variable_b`にデータ依存していると言われます。

次のコードでは、`variable_a`は`variable_b`に依存しています。

```solidity
// ...
variable_a = variable_b + 1;
```

Slitherには、その中間表現 (後のセクションで説明) のおかげで、組み込みの[データ依存性](https://github.com/crytic/slither/wiki/data-dependency)機能が備わっています。

データ依存性の使用例は、[危険な厳密等価性検出器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)にあります。 ここでは、Slitherは危険な値との厳密な等価比較を探し ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))、攻撃者がコントラクトを罠にかけるのを防ぐために、`==`ではなく`>=`または`<=`を使用すべきであるとユーザーに通知します。 とりわけ、検出器は `balanceOf(address)` の呼び出しの戻り値を危険とみなし ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))、その使用状況を追跡するためにデータ依存性エンジンを使用します。

#### 不動点計算 {#fixed-point-computation}

解析がCFGを走査してエッジをたどる場合、すでに訪れたノードに遭遇する可能性があります。 例えば、以下のようにループが存在する場合です。

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

解析はいつ停止すべきかを知る必要があります。 ここには2つの主要な戦略があります。(1) 各ノードを有限回反復する、(2) いわゆる_不動点_を計算する。 不動点とは、基本的に、そのノードを解析しても、もはや有意義な情報が得られないことを意味します。

不動点の使用例は、リエントランシー検出器に見られます。Slitherはノードを探索し、外部呼び出し、ストレージへの書き込みと読み込みを探します。 不動点に達すると ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))、探索を停止し、さまざまなリエントランシーパターン ([reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py), [reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py), [reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)) を通じて結果を解析し、リエントランシーが存在するかどうかを確認します。

効率的な不動点計算を用いた解析を書くには、解析がどのように情報を伝播させるかをよく理解する必要があります。

### 中間表現 {#intermediate-representation}

中間表現 (IR) とは、元の言語よりも静的解析に適した言語のことです。 Slitherは、Solidityを独自の中間表現である [SlithIR](https://github.com/crytic/slither/wiki/SlithIR) に変換します。

基本的なチェックを書きたいだけなら、SlithIRを理解する必要はありません。 しかし、高度な意味解析を書く予定がある場合は、役立つでしょう。 [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) および [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) プリンターは、コードがどのように変換されるかを理解するのに役立ちます。

## APIの基本 {#api-basics}

Slitherには、コントラクトとその関数の基本的な属性を探索できるAPIがあります。

コードベースを読み込むには、次のようにします。

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### コントラクトと関数の探索 {#exploring-contracts-and-functions}

`Slither`オブジェクトには以下のものがあります。

- `contracts (list(Contract))`: コントラクトのリスト
- `contracts_derived (list(Contract))`: 他のコントラクトによって継承されていないコントラクトのリスト (コントラクトのサブセット)
- `get_contract_from_name (str)`: 名前からコントラクトを返します

`Contract`オブジェクトには以下のものがあります。

- `name (str)`: コントラクトの名前
- `functions (list(Function))`: 関数のリスト
- `modifiers (list(Modifier))`: 修飾子のリスト
- `all_functions_called (list(Function/Modifier))`: コントラクトから到達可能なすべての内部関数のリスト
- `inheritance (list(Contract))`: 継承されたコントラクトのリスト
- `get_function_from_signature (str)`: シグネチャからFunctionを返します
- `get_modifier_from_signature (str)`: シグネチャからModifierを返します
- `get_state_variable_from_name (str)`: 名前からStateVariableを返します

`Function`または`Modifier`オブジェクトには以下のものがあります。

- `name (str)`: 関数の名前
- `contract (contract)`: 関数が宣言されているコントラクト
- `nodes (list(Node))`: 関数/修飾子のCFGを構成するノードのリスト
- `entry_point (Node)`: CFGのエントリポイント
- `variables_read (list(Variable))`: 読み取られた変数のリスト
- `variables_written (list(Variable))`: 書き込まれた変数のリスト
- `state_variables_read (list(StateVariable))`: 読み取られた状態変数のリスト (variables\`readのサブセット)
- `state_variables_written (list(StateVariable))`: 書き込まれた状態変数のリスト (variables\`writtenのサブセット)
