---
title: "Manticoreを使ってスマートコントラクトのバグを特定する方法"
description: "Manticoreを使って、自動でスマートコントラクト上のバグを特定する方法"
author: Trailofbits
lang: ja
tags: [ "Solidity", "スマート契約", "セキュリティ", "テスト", "形式的検証" ]
skill: advanced
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

このチュートリアルでは、Manticoreを使用してスマートコントラクトのバグを自動で特定する方法を学びます。

## インストール {#installation}

Manticoreには、Python 3.6以上が必要です。 pipでインストールすることも、Dockerを使用してインストールすることもできます。

### Docker経由のManticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできるDockerでeth-security-toolboxを実行します。 ホストからファイルを変更し、Dockerからファイル上のツールを実行できます。_

Docker内で、以下を実行します。

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip経由のManticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11を推奨します。

### スクリプトの実行 {#running-a-script}

Python 3でPythonスクリプトを実行するには:

```bash
python3 script.py
```

## 動的シンボリック実行の概要 {#introduction-to-dynamic-symbolic-execution}

### 動的シンボリック実行の簡単な説明 {#dynamic-symbolic-execution-in-a-nutshell}

動的シンボリック実行(DSE)は、高度な意味認識に基づき状態空間を探索するプログラム解析手法です。 この手法は、`パス述語`と呼ばれる数式で表される「プログラムパス」の発見に基づいています。 概念的には、この手法は2つのステップでパス述語を操作します:

1. パス述語は、プログラムの入力に対する制約を使用して構築されます。
2. パス述語は、関連するパスを実行させるプログラム入力を生成するために使用されます。

このアプローチでは、特定されたすべてのプログラム状態が具体的な実行中にトリガーされうるという意味で、誤検出(偽陽性)は発生しません。 例えば、解析で整数オーバーフローが発見された場合、その再現性が保証されます。

### パス述語の例 {#path-predicate-example}

DSEがどのように機能するかを理解するために、次の例を考えてみましょう。

```solidity
function f(uint a){

  if (a == 65) {
      // バグが存在します
  }

}
```

`f()`には2つのパスが含まれているため、DSEは2つの異なるパス述語を構築します。

- パス1: `a == 65`
- パス2: `Not (a == 65)`

各パス述語は、いわゆる[SMTソルバー](https://wikipedia.org/wiki/Satisfiability_modulo_theories)に与えることができる数式であり、ソルバーはその方程式を解こうとします。 `パス1`では、ソルバーは `a = 65` でパスを探索できると応答します。 `パス2`では、ソルバーは `a` に65以外の任意の値、例えば `a = 0` を与えることができます。

### プロパティの検証 {#verifying-properties}

Manticoreでは、各パスのすべての実行を完全に制御できます。 その結果、ほとんどすべてのものに任意の制約を追加できます。 この制御により、コントラクトに関するプロパティを作成できます。

次の例を考えてみましょう。

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // オーバーフロー保護なし
  return c;
}
```

この関数には、探索するパスが1つしかありません。

- パス1: `c = a + b`

Manticoreを使用すると、オーバーフローをチェックし、パス述語に制約を追加できます。

- `c = a + b AND (c < a OR c < b)`

上記のパス述語が実行可能になるような `a` と `b` の評価を見つけることができれば、オーバーフローを発見したことになります。 例えば、ソルバーは `a = 10 , b = MAXUINT256` という入力を生成できます。

修正版を考えてみましょう。

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

オーバーフローチェックに関連する数式は次のようになります。

- `c = a + b AND (c >= a) AND (c >= b) AND (c < a OR c < b)`

この数式は解けません。言い換えれば、これは `safe_add` において `c` が常に増加することの**証明**です。

したがって、DSEはコード上の任意の制約を検証できる強力なツールです。

## Manticoreでの実行 {#running-under-manticore}

ここでは、Manticore APIを使ってスマートコントラクトを探索する方法を見ていきます。 対象は、次のスマートコントラクト [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) です。

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

次のコマンドで、スマートコントラクト上で直接Manticoreを実行できます(`project`はSolidityファイル、またはプロジェクトディレクトリです):

```bash
$ manticore project
```

次のようなテストケースの出力が得られます(順序は変わる可能性があります):

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

追加情報がない場合、Manticoreはコントラクト上で新しいパスを探索しなくなるまで、新しいシンボリック
トランザクションでコントラクトを探索します。 Manticoreは、失敗したトランザクションの後(例: revertの後)には、新しいトランザクションを実行しません。

Manticoreは、`mcore_*`ディレクトリに情報を出力します。 このディレクトリには、とりわけ次のものが含まれます。

- `global.summary`: カバレッジとコンパイラの警告
- `test_XXXXX.summary`: カバレッジ、最後の命令、テストケースごとのアカウント残高
- `test_XXXXX.tx`: テストケースごとのトランザクションの詳細リスト

ここでは、Manticoreは7つのテストケースを見つけます。これらは以下に対応します(ファイル名の順序は変わる可能性があります):

|                                                           | トランザクション0 |          トランザクション1         | トランザクション2                  |   結果   |
| :-------------------------------------------------------: | :-------: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** |  コントラクト作成 | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** |  コントラクト作成 |          フォールバック関数         |                            | REVERT |
| **test_00000002.tx** |  コントラクト作成 |                            |                            | RETURN |
| **test_00000003.tx** |  コントラクト作成 |  f(65)  |                            | REVERT |
| **test_00000004.tx** |  コントラクト作成 | f(!=65) |                            |  STOP  |
| **test_00000005.tx** |  コントラクト作成 | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** |  コントラクト作成 | f(!=65) | フォールバック関数                  | REVERT |

_探索サマリーにおける「f(!=65)」は、f が 65 以外の値で呼び出されたことを意味します。_

お気づきのように、Manticoreは成功したトランザクションやrevertされたトランザクションごとに、一意のテストケースを生成します。

高速なコード探索を行いたい場合は `--quick-mode` フラグを使用してください(バグ検出器、ガス計算などを無効にします)。

### APIによるスマートコントラクトの操作 {#manipulate-a-smart-contract-through-the-api}

このセクションでは、Manticore Python APIを介してスマートコントラクトを操作する方法について詳しく説明します。 Pythonの拡張子である\*.pyを持つ新規ファイルを作成し、APIコマンド（基本知識については以下で説明します）をファイルに追加して必要なコードを書いてから、$ python3 \*.pyコマンドで実行します。 また、Pythonのコンソールから直接コマンドを実行することもできます。コンソールを起動する際のコマンドは、$ python3です。

### アカウントの作成 {#creating-accounts}

最初に行うべきことは、次のコマンドで新しいブロックチェーンを開始することです。

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

非コントラクトアカウントは [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) を使用して作成されます。

```python
user_account = m.create_account(balance=1000)
```

Solidityコントラクトは [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) を使用してデプロイできます。

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
# コントラクトを初期化する
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### まとめ {#summary}

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) と [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) でユーザーアカウントとコントラクトアカウントを作成できます。

### トランザクションの実行 {#executing-transactions}

Manticoreは2種類のトランザクションをサポートしています。

- Rawトランザクション: すべての関数が探索されます
- 名前付きトランザクション: 1つの関数のみが探索されます

#### Rawトランザクション {#raw-transaction}

Rawトランザクションは [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) を使用して実行されます。

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

トランザクションの呼び出し元、アドレス、データ、または値は、具象値またはシンボリック値のいずれかです。

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) はシンボリック値を生成します。
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) はシンボリックバイト配列を生成します。

以下の例をご覧ください：

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

データがシンボリックの場合、Manticoreはトランザクションの実行中にコントラクトのすべての関数を探索します。 関数の選択がどのように機能するかを理解するには、[Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/)の記事にあるフォールバック関数の説明を参照すると役立ちます。

#### 名前付きトランザクション {#named-transaction}

関数は名前で実行できます。
`f(uint var)` をシンボリック値で、user_accountから、0 etherで実行するには、次のようにします。

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

トランザクションの `value` が指定されていない場合、デフォルトで0になります。

#### まとめ {#summary-1}

- トランザクションの引数は具象値またはシンボリック値にできます
- Rawトランザクションはすべての関数を探索します
- 関数は名前で呼び出すことができます

### ワークスペース {#workspace}

`m.workspace` は、生成されたすべてのファイルの出力ディレクトリとして使用されるディレクトリです。

```python
print("Results are in {}".format(m.workspace))
```

### 探索の終了 {#terminate-the-exploration}

探索を停止するには [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) を使用します。 このメソッドが呼び出されると、それ以上のトランザクションは送信されなくなり、Manticoreは探索された各パスのテストケースを生成します。

### まとめ: Manticoreでの実行 {#summary-running-under-manticore}

これまでのすべてのステップをまとめると、次のようになります。

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
m.finalize() # 探索を停止
```

上記のすべてのコードは [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) にあります。

## 例外をスローするパスの取得 {#getting-throwing-paths}

次に、`f()`で例外を発生させるパスの特定の入力を生成します。 対象は、引き続き次のスマートコントラクト [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) です。

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

実行された各パスには、それぞれのブロックチェーンの状態があります。 状態はready(準備完了)かkilled(強制終了)のいずれかです。killedはTHROWまたはREVERT命令に到達したことを意味します。

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): 準備完了状態のリスト(REVERT/INVALIDを実行していない状態)
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): 強制終了された状態のリスト
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings): すべての状態

```python
for state in m.all_states:
    # stateで何かを行う
```

状態情報にアクセスできます。 以下の例をご覧ください：

- `state.platform.get_balance(account.address)`: アカウントの残高
- `state.platform.transactions`: トランザクションのリスト
- `state.platform.transactions[-1].return_data`: 最後のトランザクションによって返されたデータ

最後のトランザクションによって返されたデータは配列であり、ABI.deserializeで値に変換できます。例:

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### テストケースの生成方法 {#how-to-generate-testcase}

テストケースを生成するには [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) を使用します。

```python
m.generate_testcase(state, 'BugFound')
```

### まとめ {#summary-2}

- m.all_statesで状態をイテレートできます
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

## 実行がREVERTまたはINVALIDで終了するかどうかを確認します

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

上記のすべてのコードは [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) にあります。

_terminated_stateによって返されるすべての状態は結果としてREVERTまたはINVALIDを持つため、もっと単純なスクリプトを生成することもできましたが、この例はAPIの操作方法を実証するためだけのものです。_

## 制約の追加 {#adding-constraints}

探索を制約する方法を見ていきます。 `f()`のドキュメントには、この関数が`a == 65`で呼び出されることはないと
記載されていると仮定します。したがって、`a == 65`のバグは実際のバグではありません。 対象は、引き続き次のスマートコントラクト [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol) です。

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

- Operators.AND,
- Operators.OR,
- Operators.UGT (符号なしでより大きい),
- Operators.UGE (符号なしで以上),
- Operators.ULT (符号なしでより小さい),
- Operators.ULE (符号なしで以下)。

モジュールをインポートするには、次を使用します。

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`は、配列を値に連結するために使用されます。 例えば、トランザクションのreturn_dataは、別の値と比較チェックするために値に変更する必要があります。

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 制約 {#state-constraint}

制約は、グローバルまたは特定の状態に対して使用できます。

#### グローバル制約 {#state-constraint}

グローバル制約を追加するには `m.constrain(constraint)` を使用します。
例えば、シンボリックアドレスからコントラクトを呼び出し、このアドレスを特定の値に制限することができます。

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状態制約 {#state-constraint}

[state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) を使用して、特定の状態に制約を追加します。
これは、探索後に状態を制約して、そのプロパティをチェックするために使用できます。

### 制約のチェック {#checking-constraint}

`solver.check(state.constraints)`を使用して、制約がまだ実行可能かどうかを確認します。
例えば、次はsymbolic_valueを65とは異なる値に制約し、状態がまだ実行可能かどうかをチェックします。

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 状態は実行可能です
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

## 実行がREVERTまたはINVALIDで終了するかどうかを確認します

for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # a == 65のパスは考慮しません
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

上記のすべてのコードは [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) にあります。
