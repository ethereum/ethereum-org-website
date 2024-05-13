---
title: Slitherを使用してスマートコントラクトのバグを見つける方法
description: Slitherを使用してスマートコントラクトのバグを自動的に見つける方法
author: Trailofbits
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "セキュリティ"
  - "テスト"
  - "静的解析"
skill: advanced
published: 2020-06-09
source: セキュアなコントラクトの構築
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## Slitherの使い方 {#how-to-use-slither}

このチュートリアルでは、Slitherを使って、スマートコントラクトのバグを自動で検出する方法を学びます。

- [インストール](#installation)
- [コマンドラインの使い方](#command-line)
- [静的解析入門](#static-analysis)：静的解析の簡単な紹介
- [API](#api-basics)：Python APIの説明

## インストール {#installation}

Slitherには、Python 3.6以上が必要です。 pipでインストールすることも、Dockerを使用してインストールすることもできます。

pipによるSlitherのインストール

```bash
pip3 install --user slither-analyzer
```

DockerによるSlitherのインストール:

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDockerでeth-security-toolboxを実行します。 ホストからファイルを変更し、Dockerからファイル上のツールを実行することができます。_

Docker内で実行する：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### スクリプトを実行する {#running-a-script}

Python3でPythonスクリプトを実行するには、以下を実行します：

```bash
python3 script.py
```

### コマンドライン {#command-line}

**コマンドラインとユーザー定義スクリプトの比較**：Slitherには、多くの一般的なバグを見つけるための事前定義された検出器のセットが付属しています。 コマンドラインでSlitherを呼び出すとすべての検出器が実行されますので、静的解析の詳しい知識は必要ありません：

```bash
slither project_paths
```

Slitherでは、検出器に加えて、[プリンター](https://github.com/crytic/slither#printers)と[ツール](https://github.com/crytic/slither#tools)によるコードレビュー機能も利用できます。

プライベート検出器およびGitHubでの統合にアクセスするには、[crytic.io](https://github.com/crytic)を使用します。

## 静的解析 {#static-analysis}

Slither静的解析フレームワークの機能と設計は、ブログ投稿 ([1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)) と[学術論文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)で説明されています。

静的解析には、さまざまな種類があります。 静的解析の技法は、[clang](https://clang-analyzer.llvm.org/)や[gcc](https://lwn.net/Articles/806099/)といったコンパイラで採用されているだけでなく、[Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、および[FindBugs](http://findbugs.sourceforge.net/)、ならびに[Frama-C](https://frama-c.com/)や[Polyspace](https://www.mathworks.com/products/polyspace.html)といったフォーマルなメソッドに基づくツールの基盤でもあります。

ここでは、静的解析の手法や研究者について網羅的に取り上げる余裕はありません。 その代わりに、皆さんがバグを特定し、コードを理解する上で効果的に静的解析の手法を利用できるように、Slitherの仕組みを理解する上で必要な事項のみに焦点を当てます。

- [コード表現](#code-representation)
- [コード解析](#analysis)
- [中間表現](#intermediate-representation)

### コード表現 {#code-representation}

単一の実行パスについて推論する動的解析とは対照的に、静的解析では一度にすべてのパスを対象として推論します。 これには、別のコード表現が必要です。 最も一般的なコード表現は、抽象構文木（AST）および制御フローグラフ（CFG）の2つです。

### 抽象構文木（AST） {#abstract-syntax-trees-ast}

ASTは、コンパイラがコードを解析するたびに用いられます。 おそらく、静的解析を実行できる最も基本的な構造だと言えるでしょう。

一言で言えば、ASTは構造化されたツリーであり、通常、各リーフに変数または定数が含まれ、内部ノードはオペランドまたは制御フロー操作です。 次のコードを検討してみましょう：

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

対応するASTは、次のとおりです：

![AST](./ast.png)

Slitherでは、solcがエクスポートしたASTを使用します。

ASTは簡単に構築できますが、入れ子構造を持ちます。 このため、解析が簡単でない場合があります。 例えば、`a + b <= a`の式で使用される操作を識別するには、まず`<=`を解析し、次に`+`を解析する必要があります。 一般的なアプローチは、ツリーを再帰的に移動するいわゆるVisitorパターンを使用することです。 Slitherには、[`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)という汎用的なVisitorが含まれています。

次のコードは、`ExpressionVisitor`を使用して式に加算が含まれているかどうかを検出します：

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression is the expression to be tested
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 制御フローグラフ（CFG） {#control-flow-graph-cfg}

2番目によく用いられるコード表現は、制御フローグラフ（CFG）です。 名前が示すように、すべての実行パスを可視化するグラフベースの表現です。 各ノードには、1つまたは複数の命令が含まれます。 グラフのエッジ部分は、制御フロー操作（if/then/else、ループなど）を表します。 先ほどの例をCFGで表すと、次のようになります：

![CFG](./cfg.png)

CFGは、大部分の解析の土台となる表現です。

他にも、様々なコード表現が存在します。 それぞれの表現には、実行したい解析に応じて長所と短所があります。

### 解析 {#analysis}

Slitherで実行できる最もシンプルな解析タイプは、構文解析です。

### 構文解析 {#syntax-analysis}

Slitherは、コードおよび表現に含まれるさまざまな構成要素を移動しながら、パターンマッチングに類似したアプローチで矛盾や欠陥を発見します。

例えば、以下の検出器は構文関連の問題を探します：

- [状態変数のシャドーイング](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：すべての状態変数でイテレートし、継承されたコントラクトから変数がシャドーされているかを確認します（[state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62)）。

- [不適切なERC-20インターフェース](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：不適切なERC-20関数の署名を探します（[incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55)）。

### 意味解析 {#semantic-analysis}

構文解析とは対照的に、意味解析は、より深くコードの「意味」を解析します。 この解析手法は、いくつかの種類に大別できます。 意味解析は、より強力で有益な結果を得られますが、より複雑なコードを書く必要があります。

意味解析は、最も高度な脆弱性検出に用いられています。

#### データ依存解析 {#fixed-point-computation}

`variable_a`の値が`variable_b`の影響を受けるパスが存在する場合、`variable_a`の変数は`variable_b`に対して依存関係を持ちます。

次のコードでは、`variable_a`は`variable_b`に依存しています：

```solidity
// ...
variable_a = variable_b + 1;
```

Slitherでは、中間表現（以下を参照）を利用して、[データの依存関係](https://github.com/crytic/slither/wiki/data-dependency)を解析する機能が搭載されています。

データ依存関係を解析する具体例としては、[危険をもたらす厳密な等値の検出器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)を参照してください。 ここで、Slitherは、ある危険な値に対する厳密な等値比較を発見しようと試みます（[incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)）。その上で、攻撃者がコントラクトをトラップできる状態を防止するために、`==`ではなく、`>=`または`<=`を使用するようにユーザーに警告します。 検出器はまず、`balanceOf(address)`の呼び出しにおける戻り値を危険な値だと見なし（[incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)）、データ依存関係エンジンを使用してその使用状況を追跡します。

#### 不動点の計算 {#fixed-point-computation}

解析がエッジを辿ってCFG全体を移動する場合、すでに訪問済みのノードを発見する可能性が高いでしょう。 例えば、以下のようなループがある場合です：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

この場合、解析をいつ停止するかを指定する必要があります。 それには、（1）ノードごとにイテレートする上限回数を設定するか、（2）いわゆる_不動点_を計算する、という2つの戦略があります。 不動点とは、当該ノードをさらに解析しても有益な情報が得られない点を意味します。

不動点を使用する実例としては、リエントランシー検出器が挙げられます。Slitherでは、当該のノードを探索し、外部からの呼び出しを見つけて、ストレージへの書き込み／読み取りを行います。 この処理を通じて不動点に到達すると（[reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)）、探索を停止し、様々なリエントランシーのパターン（[reentrancy_beign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)）、（[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)）、（[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)）に基づき、結果を解析してリエントランシーが存在するか否かを判定します。

効率的な不動点計算を用いた解析を作成するには、解析において情報がどのように拡散するかをよく理解しておく必要があります。

### 中間表現 {#intermediate-representation}

中間表現（IR）は、オリジナルのコードよりも静的解析を実行しやすくした言語です。 Slitherでは、SolidityをSlither独自のIRである[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)に変換します。

基本的なチェックを作成したいだけの場合は、SlithIRを理解する必要はありません。 ただし、より高度な意味解析を作成したい場合は、SlithIRの知識が有益になるでしょう。 [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir)および[SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)のプリンターは、コードがどのように変換されるかを理解する上で役立ちます。

## APIの基本 {#api-basics}

Slitherには、コントラクトの基本的な属性や関数について探索できるAPIが含まれています。

コードベースを読み込むには、以下を実行します：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### コントラクトや関数を探索する {#exploring-contracts-and-functions}

`Slither`オブジェクトは、以下を持ちます：

- `contracts (list(Contract)`：コントラクトのリスト
- `contracts_derived (list(Contract)`：他のコントラクトに継承されていないコントラクトのリスト（コントラクトのサブセット）
- `get_contract_from_name (str)`：名前でコントラクトを返します

`Contract`オブジェクトには、以下のものがあります。

- `name (str)`：コントラクトの名前
- `functions (list(Function))`：関数のリスト
- `modifiers (list(Modifier))`：修飾子のリスト
- `all_functions_called (list(Function/Modifier))`：コントラクトがリーチできるすべての内部関数のリスト
- `inheritance (list(Contract))`：継承されたコントラクトのリスト
- `get_function_from_signature (str)`：署名から関数を返します
- `get_modifier_from_signature (str)`：署名から修飾子を返します
- `get_state_variable_from_name (str)`：名前から状態変数を返します

`Function`オブジェクトまたは`Modifier`オブジェクトは、以下を持ちます：

- `name (str)`：関数の名前
- `contract (contract)`：この関数を宣言したコントラクト
- `nodes (list(Node))`：この関数／修飾子のCFGを攻勢するノードのリスト
- `entry_point (Node)`: CFG (制御フローグラフ) のエントリポイント
- `variables_read (list(Variable))`: 読み込まれた変数のリスト
- `variables_written (list(Variable))`: 書き込まれた変数のリスト
- `state_variables_read (list(StateVariable))`: 読み込まれた状態変数のリスト (読み込まれた変数のサブセット)
- `state_variables_written (list(StateVariable))`: 書き込まれた状態変数のリスト (書き込まれた変数のサブセット)
