---
title: "スリザーを使用してスマートコントラクトのバグを見つける方法"
description: "スリザーを使用してスマートコントラクトのバグを自動的に見つける方法"
author: "トレイルオブビッツ"
lang: ja
tags: ["Solidity", "スマートコントラクト", "セキュリティ", "テスト"]
skill: advanced
breadcrumb: "スリザー"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## スリザーの使用方法 {#how-to-use-slither}

このチュートリアルの目的は、スリザーを使用してスマートコントラクトのバグを自動的に見つける方法を示すことです。

- [インストール](#installation)
- [コマンドラインでの使用](#command-line)
- [静的解析の概要](#static-analysis): 静的解析の簡単な紹介
- [API](#api-basics): Python APIの説明

## インストール {#installation}

スリザーにはPython 3.6以上が必要です。pipまたはDockerを使用してインストールできます。

pipを使用したスリザーのインストール:

```bash
pip3 install --user slither-analyzer
```

Dockerを使用したスリザーのインストール:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDocker内でeth-security-toolboxを実行します。ホストからファイルを変更し、Dockerからそのファイルに対してツールを実行できます。_

Docker内で以下を実行します:

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

**コマンドラインとユーザー定義スクリプトの比較。** スリザーには、多くの一般的なバグを見つけるための事前定義された検出器のセットが付属しています。コマンドラインからスリザーを呼び出すと、すべての検出器が実行されるため、静的解析に関する詳細な知識は必要ありません。

```bash
slither project_paths
```

検出器に加えて、スリザーには[プリンター](https://github.com/crytic/slither#printers)と[ツール](https://github.com/crytic/slither#tools)によるコードレビュー機能があります。

プライベート検出器やGitHub統合にアクセスするには、[crytic.io](https://github.com/crytic)を使用してください。

## 静的解析 {#static-analysis}

スリザーの静的解析フレームワークの機能と設計については、ブログ記事（[1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)）および[学術論文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)で説明されています。

静的解析にはさまざまな種類があります。[clang](https://clang-analyzer.llvm.org/)や[gcc](https://lwn.net/Articles/806099/)のようなコンパイラがこれらの研究技術に依存していることはご存知かもしれませんが、[Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](https://findbugs.sourceforge.net/)、および[Frama-C](https://frama-c.com/)や[Polyspace](https://www.mathworks.com/products/polyspace.html)のような形式手法に基づくツールの基盤にもなっています。

ここでは、静的解析の技術や研究について網羅的にレビューすることはしません。代わりに、バグを見つけたりコードを理解したりするためにスリザーをより効果的に使用できるよう、スリザーの仕組みを理解するために必要なことに焦点を当てます。

- [コード表現](#code-representation)
- [コード解析](#analysis)
- [中間表現](#intermediate-representation)

### コード表現 {#code-representation}

単一の実行パスについて推論する動的解析とは対照的に、静的解析はすべてのパスについて一度に推論します。そのためには、異なるコード表現に依存します。最も一般的な2つは、抽象構文木（AST）と制御フローグラフ（CFG）です。

### 抽象構文木（AST） {#abstract-syntax-trees-ast}

ASTは、コンパイラがコードを解析するたびに使用されます。これはおそらく、静的解析を実行できる最も基本的な構造です。

簡単に言えば、ASTは構造化されたツリーであり、通常、各葉には変数または定数が含まれ、内部ノードはオペランドまたは制御フロー操作です。次のコードを考えてみましょう。

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

対応するASTは以下のようになります。

![AST](./ast.png)

スリザーはsolcによってエクスポートされたASTを使用します。

構築は簡単ですが、ASTはネストされた構造です。そのため、解析が最も簡単ではない場合があります。たとえば、式`a + b <= a`で使用される操作を特定するには、まず`<=`を解析し、次に`+`を解析する必要があります。一般的なアプローチは、ツリーを再帰的にナビゲートする、いわゆるビジターパターンを使用することです。スリザーには、[`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)に汎用ビジターが含まれています。

次のコードは、`ExpressionVisitor`を使用して、式に加算が含まれているかどうかを検出します。

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expressionはテスト対象の式です
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 制御フローグラフ（CFG） {#control-flow-graph-cfg}

2番目に一般的なコード表現は、制御フローグラフ（CFG）です。その名の通り、すべての実行パスを公開するグラフベースの表現です。各ノードには1つまたは複数の命令が含まれます。グラフ内のエッジは、制御フロー操作（if/then/else、ループなど）を表します。前の例のCFGは次のとおりです。

![CFG](./cfg.png)

CFGは、ほとんどの解析が構築される基盤となる表現です。

他にも多くのコード表現が存在します。実行したい解析に応じて、各表現には長所と短所があります。

### 解析 {#analysis}

スリザーで実行できる最も単純なタイプの解析は、構文解析です。

### 構文解析 {#syntax-analysis}

スリザーは、パターンマッチングのようなアプローチを使用して、コードのさまざまなコンポーネントとその表現をナビゲートし、不整合や欠陥を見つけることができます。

たとえば、次の検出器は構文関連の問題を探します。

- [状態変数のシャドウイング](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing): すべての状態変数を反復処理し、継承されたコントラクトの変数をシャドウイングしているものがないか確認します（[state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62)）

- [不正確なERC-20インターフェース](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface): 不正確なERC-20関数の署名を探します（[incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55)）

### セマンティック解析 {#semantic-analysis}

構文解析とは対照的に、セマンティック解析はより深く掘り下げ、コードの「意味」を解析します。このファミリーには、いくつかの幅広いタイプの解析が含まれます。これらはより強力で有用な結果をもたらしますが、記述するのもより複雑になります。

セマンティック解析は、最も高度な脆弱性検出に使用されます。

#### データ依存性解析 {#fixed-point-computation}

変数`variable_a`の値が`variable_b`の影響を受けるパスが存在する場合、変数`variable_a`は`variable_b`にデータ依存していると言われます。

次のコードでは、`variable_a`は`variable_b`に依存しています。

```solidity
// ...
variable_a = variable_b + 1;
```

スリザーには、中間表現（後のセクションで説明します）のおかげで、組み込みの[データ依存性](https://github.com/crytic/slither/wiki/data-dependency)機能が備わっています。

データ依存性の使用例は、[危険な厳密等価検出器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)で見ることができます。ここでスリザーは、危険な値との厳密な等価比較（[incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)）を探し、攻撃者がコントラクトを罠にかけるのを防ぐために、`==`ではなく`>=`または`<=`を使用する必要があることをユーザーに通知します。とりわけ、この検出器は`balanceOf(address)`への呼び出しの戻り値（[incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)）を危険と見なし、データ依存性エンジンを使用してその使用状況を追跡します。

#### 不動点計算 {#fixed-point-computation-2}

解析がCFGをナビゲートし、エッジをたどる場合、すでに訪問したノードに遭遇する可能性があります。たとえば、以下に示すようなループが存在する場合です。

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

解析はいつ停止すべきかを知る必要があります。ここには2つの主な戦略があります。（1）各ノードを有限回反復する、（2）いわゆる_不動点（fixpoint）_を計算する。不動点とは基本的に、このノードを解析しても意味のある情報が得られないことを意味します。

使用される不動点の例は、リエントランシー検出器で見ることができます。スリザーはノードを探索し、外部呼び出し、ストレージへの書き込みと読み取りを探します。不動点（[reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)）に達すると探索を停止し、さまざまなリエントランシーパターン（[reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)）を通じて結果を解析し、リエントランシーが存在するかどうかを確認します。

効率的な不動点計算を使用して解析を記述するには、解析がどのように情報を伝播するかをよく理解する必要があります。

### 中間表現 {#intermediate-representation}

中間表現（IR）は、元の言語よりも静的解析に適した言語です。スリザーはSolidityを独自のIRである[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)に変換します。

基本的なチェックのみを記述したい場合は、SlithIRを理解する必要はありません。ただし、高度なセマンティック解析を記述する予定がある場合は役立ちます。[SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir)および[SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)プリンターは、コードがどのように変換されるかを理解するのに役立ちます。

## APIの基本 {#api-basics}

スリザーには、コントラクトとその関数の基本的な属性を探索できるAPIがあります。

コードベースをロードするには:

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### コントラクトと関数の探索 {#exploring-contracts-and-functions}

`Slither`オブジェクトには以下が含まれます:

- `contracts (list(Contract)`: コントラクトのリスト
- `contracts_derived (list(Contract)`: 他のコントラクトに継承されていないコントラクトのリスト（コントラクトのサブセット）
- `get_contract_from_name (str)`: 名前からコントラクトを返す

`Contract`オブジェクトには以下が含まれます:

- `name (str)`: コントラクトの名前
- `functions (list(Function))`: 関数のリスト
- `modifiers (list(Modifier))`: 関数のリスト
- `all_functions_called (list(Function/Modifier))`: コントラクトから到達可能なすべての内部関数のリスト
- `inheritance (list(Contract))`: 継承されたコントラクトのリスト
- `get_function_from_signature (str)`: 署名から関数を返す
- `get_modifier_from_signature (str)`: 署名から修飾子を返す
- `get_state_variable_from_name (str)`: 名前から状態変数を返す

`Function`または`Modifier`オブジェクトには以下が含まれます:

- `name (str)`: 関数の名前
- `contract (contract)`: 関数が宣言されているコントラクト
- `nodes (list(Node))`: 関数/修飾子のCFGを構成するノードのリスト
- `entry_point (Node)`: CFGのエントリポイント
- `variables_read (list(Variable))`: 読み取られた変数のリスト
- `variables_written (list(Variable))`: 書き込まれた変数のリスト
- `state_variables_read (list(StateVariable))`: 読み取られた状態変数のリスト（variables`readのサブセット）
- `state_variables_written (list(StateVariable))`: 書き込まれた状態変数のリスト（variables`writtenのサブセット）