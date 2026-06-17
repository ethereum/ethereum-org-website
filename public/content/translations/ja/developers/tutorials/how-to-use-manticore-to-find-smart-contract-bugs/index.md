---
title: マンティコアを使用してスマート・コントラクトのバグを見つける方法
description: マンティコアを使用してスマート・コントラクトのバグを自動的に見つける方法
author: Trailofbits
lang: ja
tags:
  ["solidity", "スマート・コントラクト", "セキュリティ", "テスト", "形式的検証"]
skill: advanced
breadcrumb: マンティコア
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

このチュートリアルの目的は、マンティコアを使用してスマート・コントラクトのバグを自動的に見つける方法を示すことです。

## インストール {#installation}

マンティコアにはPython 3.6以上が必要です。pipまたはDockerを使用してインストールできます。

### Dockerを使用したマンティコアのインストール {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDocker内でeth-security-toolboxを実行します。ホストからファイルを変更し、Dockerからそのファイルに対してツールを実行できます。_

Docker内で以下を実行します。

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pipを使用したマンティコアのインストール {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11が推奨されます。

### スクリプトの実行 {#running-a-script}

Python 3でPythonスクリプトを実行するには、以下のようにします。

```bash
python3 script.py
```

## 動的シンボリック実行の概要 {#introduction-to-dynamic-symbolic-execution}

### 動的シンボリック実行とは {#dynamic-symbolic-execution-in-a-nutshell}

動的シンボリック実行 (DSE) は、高度な意味的認識を持って状態空間を探索するプログラム分析手法です。この手法は、`path predicates`と呼ばれる数式として表される「プログラムパス」のディスカバリーに基づいています。概念的には、この手法はパス述語に対して次の2つのステップで機能します。

1. プログラムの入力に対する制約を使用して構築されます。
2. 関連するパスを実行させるプログラム入力を生成するために使用されます。

このアプローチは、特定されたすべてのプログラム状態が具体的な実行中にトリガーされる可能性があるという意味で、誤検知を生成しません。たとえば、分析で整数オーバーフローが見つかった場合、それは確実に再現可能です。

### パス述語の例 {#path-predicate-example}

DSEがどのように機能するかを理解するために、次の例を考えてみましょう。

```solidity
function f(uint a){

  if (a == 65) {
      // バグが存在する
  }

}
```

`f()`には2つのパスが含まれているため、DSEは2つの異なるパス述語を構築します。

- パス 1: `a == 65`
- パス 2: `Not (a == 65)`

各パス述語は、方程式を解こうとするいわゆる[SMTソルバー](https://wikipedia.org/wiki/Satisfiability_modulo_theories)に渡すことができる数式です。`Path 1`の場合、ソルバーは`a = 65`でパスを探索できると判断します。`Path 2`の場合、ソルバーは`a`に65以外の任意の値 (たとえば`a = 0`) を与えることができます。

### プロパティの検証 {#verifying-properties}

マンティコアは、各パスのすべての実行を完全に制御できます。その結果、ほぼすべてのものに任意の制約を追加できます。この制御により、コントラクト上にプロパティを作成できます。

次の例を考えてみましょう。

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // オーバーフロー保護なし
  return c;
}
```

ここでは、関数内で探索するパスは1つだけです。

- パス 1: `c = a + b`

マンティコアを使用すると、オーバーフローをチェックし、パス述語に制約を追加できます。

- `c = a + b AND (c < a OR c < b)`

上記のパス述語が実行可能となる`a`と`b`の評価を見つけることができれば、オーバーフローが見つかったことを意味します。たとえば、ソルバーは入力`a = 10 , b = MAXUINT256`を生成できます。

修正版を考えてみましょう。

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

オーバーフローチェックを伴う関連する数式は次のようになります。

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

この数式は解くことができません。言い換えれば、これは`safe_add`において`c`が常に増加することの**証明**となります。

したがって、DSEはコード上の任意の制約を検証できる強力なツールです。

## マンティコアでの実行 {#running-under-manticore}

マンティコアAPIを使用してスマート・コントラクトを探索する方法を見ていきます。ターゲットは次のスマート・コントラクト[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

```solidity
pragma solidity >=0.4.24 <0.6.0;

contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### スタンドアロン探索の実行 {#run-a-standalone-exploration}

次のコマンドを使用して、スマート・コントラクト上で直接マンティコアを実行できます (`project`はSolidityファイルまたはプロジェクトディレクトリにすることができます)。

```bash
$ manticore project
```

次のようなテストケースの出力が得られます (順序は変わる場合があります)。

```
...
... m.c.manticore:INFO: Generated testcase No. 0 - STOP
... m.c.manticore:INFO: Generated testcase No. 1 - REVERT
... m.c.manticore:INFO: Generated testcase No. 2 - RETURN
... m.c.manticore:INFO: Generated testcase No. 3 - REVERT
... m.c.manticore:INFO: Generated testcase No. 4 - STOP
... m.c.manticore:INFO: Generated testcase No. 5 - REVERT
... m.c.manticore:INFO: Generated testcase No. 6 - REVERT
... m.c.manticore:INFO: Results in /home/ethsec/workshops/Automated Smart Contracts Audit - TruffleCon 2018/manticore/examples/mcore_t6vi6ij3
...
```

追加情報がない場合、マンティコアはコントラクト上の新しいパスを探索しなくなるまで、新しいシンボリックなトランザクションでコントラクトを探索します。マンティコアは、失敗したトランザクション (例: リバート後) の後に新しいトランザクションを実行しません。

マンティコアは情報を`mcore_*`ディレクトリに出力します。このディレクトリには、とりわけ以下のものが含まれます。

- `global.summary`: カバレッジとコンパイラの警告
- `test_XXXXX.summary`: テストケースごとのカバレッジ、最後の命令、アカウント残高
- `test_XXXXX.tx`: テストケースごとのトランザクションの詳細リスト

ここでマンティコアは7つのテストケースを見つけました。これらは以下に対応します (ファイル名の順序は変わる場合があります)。

|                      |   トランザクション 0   |   トランザクション 1   | トランザクション 2     | 結果 |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | コントラクト作成 |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | コントラクト作成 | フォールバック関数 |                   | REVERT |
| **test_00000002.tx** | コントラクト作成 |                   |                   | RETURN |
| **test_00000003.tx** | コントラクト作成 |       f(65)       |                   | REVERT |
| **test_00000004.tx** | コントラクト作成 |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | コントラクト作成 |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | コントラクト作成 |      f(!=65)      | フォールバック関数 | REVERT |

_探索の概要における f(!=65) は、65以外の任意の値で呼び出された f を示します。_

お気づきのように、マンティコアは成功したトランザクションまたはリバートされたトランザクションごとに一意のテストケースを生成します。

高速なコード探索が必要な場合は、`--quick-mode`フラグを使用します (これにより、バグ検出器やガス計算などが無効になります)。

### APIを介したスマート・コントラクトの操作 {#manipulate-a-smart-contract-through-the-api}

このセクションでは、マンティコアのPython APIを介してスマート・コントラクトを操作する方法について詳しく説明します。Pythonの拡張子を持つ新しいファイル`*.py`を作成し、このファイルにAPIコマンド (基本については後述します) を追加して必要なコードを記述し、`$ python3 *.py`コマンドで実行できます。また、以下のコマンドをPythonコンソールで直接実行することもできます。コンソールを実行するには、`$ python3`コマンドを使用します。

### アカウントの作成 {#creating-accounts}

最初に行うべきことは、次のコマンドを使用して新しいブロックチェーンを初期化することです。

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

コントラクト・アカウント以外のアカウントは、[m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)を使用して作成されます。

```python
user_account = m.create_account(balance=1000)
```

Solidityコントラクトは、[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)を使用してデプロイできます。

```solidity
source_code = '''
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
'''
# Initiate the contract
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### まとめ {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)および[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)を使用して、ユーザーアカウントおよびコントラクト・アカウントを作成できます。

### トランザクションの実行 {#executing-transactions}

マンティコアは2種類のトランザクションをサポートしています。

- 生のトランザクション: すべての関数が探索されます
- 名前付きトランザクション: 1つの関数のみが探索されます

#### 生のトランザクション {#raw-transaction}

生のトランザクションは、[m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction)を使用して実行されます。

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

トランザクションの呼び出し元、アドレス、データ、または値は、具体的またはシンボリックのいずれかになります。

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value)はシンボリックな値を作成します。
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer)はシンボリックなバイト配列を作成します。

例:

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

データがシンボリックである場合、マンティコアはトランザクションの実行中にコントラクトのすべての関数を探索します。関数の選択がどのように機能するかを理解するには、[Ethernaut CTFの実践](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/)の記事にあるフォールバック関数の説明を参照すると役立ちます。

#### 名前付きトランザクション {#named-transaction}

関数は名前を介して実行できます。
user_accountから0イーサで、シンボリックな値を使用して`f(uint var)`を実行するには、次を使用します。

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

トランザクションの`value`が指定されていない場合、デフォルトで0になります。

#### まとめ {#summary-1}

- トランザクションの引数は、具体的またはシンボリックにすることができます
- 生のトランザクションはすべての関数を探索します
- 関数は名前で呼び出すことができます

### ワークスペース {#workspace}

`m.workspace`は、生成されたすべてのファイルの出力ディレクトリとして使用されるディレクトリです。

```python
print("Results are in {}".format(m.workspace))
```

### 探索の終了 {#terminate-the-exploration}

探索を停止するには、[m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)を使用します。このメソッドが呼び出されると、それ以上のトランザクションは送信されず、マンティコアは探索された各パスのテストケースを生成します。

### まとめ: マンティコアでの実行 {#summary-running-under-manticore}

これまでのすべての手順をまとめると、次のようになります。

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

print("Results are in {}".format(m.workspace))
m.finalize() # 探索を停止する
```

上記のすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)にあります。

## 例外をスローするパスの取得 {#getting-throwing-paths}

次に、`f()`で例外を発生させるパスの特定の入力を生成します。ターゲットは引き続き次のスマート・コントラクト[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 状態情報の使用 {#using-state-information}

実行された各パスには、ブロックチェーンの状態があります。状態は準備完了 (ready) であるか、強制終了 (killed) されているかのいずれかです。後者は、THROWまたはREVERT命令に到達したことを意味します。

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): 準備完了の状態のリスト (REVERT/INVALIDを実行しなかった状態)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 強制終了された状態のリスト
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): すべての状態

```python
for state in m.all_states:
    # 状態に対して何らかの処理を行う
```

状態情報にアクセスできます。例:

- `state.platform.get_balance(account.address)`: アカウントの残高
- `state.platform.transactions`: トランザクションのリスト
- `state.platform.transactions[-1].return_data`: 最後のトランザクションによって返されたデータ

最後のトランザクションによって返されるデータは配列であり、たとえばABI.deserializeを使用して値に変換できます。

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### テストケースの生成方法 {#how-to-generate-testcase}

テストケースを生成するには、[m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)を使用します。

```python
m.generate_testcase(state, 'BugFound')
```

### まとめ {#summary-2}

- m.all_statesを使用して状態を反復処理できます
- `state.platform.get_balance(account.address)`はアカウントの残高を返します
- `state.platform.transactions`はトランザクションのリストを返します
- `transaction.return_data`は返されたデータです
- `m.generate_testcase(state, name)`は状態の入力を生成します

### まとめ: 例外をスローするパスの取得 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 実行がリバートまたはINVALIDで終了するか確認する
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

上記のすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)にあります。

_terminated_stateによって返されるすべての状態の結果にはREVERTまたはINVALIDが含まれているため、はるかに単純なスクリプトを生成することもできました。この例は、APIの操作方法を示すことのみを目的としています。_

## 制約の追加 {#adding-constraints}

探索を制約する方法を見ていきます。`f()`のドキュメントには、関数が`a == 65`で呼び出されることはないと記載されていると仮定します。したがって、`a == 65`のバグは実際のバグではありません。ターゲットは引き続き次のスマート・コントラクト[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

```solidity
pragma solidity >=0.4.24 <0.6.0;
contract Simple {
    function f(uint a) payable public{
        if (a == 65) {
            revert();
        }
    }
}
```

### 演算子 {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py)モジュールは制約の操作を容易にし、とりわけ以下を提供します。

- Operators.AND
- Operators.OR
- Operators.UGT (符号なしの「より大きい」)
- Operators.UGE (符号なしの「以上」)
- Operators.ULT (符号なしの「より小さい」)
- Operators.ULE (符号なしの「以下」)

モジュールをインポートするには、次を使用します。

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`は、配列を値に連結するために使用されます。たとえば、トランザクションのreturn_dataは、別の値と照合するために値に変更する必要があります。

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 制約 {#state-constraint}

制約はグローバルに、または特定の状態に対して使用できます。

#### グローバル制約 {#state-constraint-2}

グローバル制約を追加するには、`m.constrain(constraint)`を使用します。
たとえば、シンボリックなアドレスからコントラクトを呼び出し、このアドレスを特定の値に制限できます。

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状態制約 {#state-constraint-3}

特定の状態に制約を追加するには、[state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)を使用します。
これは、探索後に状態を制約して、その上のプロパティをチェックするために使用できます。

### 制約のチェック {#checking-constraint}

制約がまだ実行可能かどうかを知るには、`solver.check(state.constraints)`を使用します。
たとえば、次のコードはsymbolic_valueを65とは異なる値に制約し、状態がまだ実行可能かどうかをチェックします。

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 状態は実現可能である
```

### まとめ: 制約の追加 {#summary-adding-constraints}

前のコードに制約を追加すると、次のようになります。

```python
from manticore.ethereum import ManticoreEVM
from manticore.core.smtlib.solver import Z3Solver

solver = Z3Solver.instance()

m = ManticoreEVM()

with open("example.sol") as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

no_bug_found = True

## 実行がリバートまたはINVALIDで終了するか確認する
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65 となるパスは考慮しない
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

上記のすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)にあります。