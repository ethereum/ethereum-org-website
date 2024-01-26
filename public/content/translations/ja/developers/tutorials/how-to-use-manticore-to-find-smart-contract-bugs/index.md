---
title: Manticoreを使ってスマートコントラクトのバグを特定する方法
description: Manticoreを使って、自動でスマートコントラクト上のバグを特定する
author: Trailofbits
lang: ja
tags:
  - "Solidity"
  - "スマートコントラクト"
  - "セキュリティ"
  - "テスト"
  - "フォーマルな検証"
skill: advanced
published: 2020-01-13
source: セキュアなコントラクトの構築
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

このチュートリアルでは、Manticore を使用してスマートコントラクトのバグを自動で特定する方法を学びます。

## インストール {#installation}

Manticore を使用するには、Python 3.6 が必要です。 pip でインストールすることも、Docker を使用してインストールすることもできます。

### Docker で Manticore をインストールする場合 {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最後のコマンドは、現在のディレクトリにアクセスできる docker で eth-security-toolbox を実行します。 ホストからファイルを変更し、docker からファイル上のツールを実行することができます。_

Docker で、以下を実行します：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### pip で Manticore をインストールする場合 {#manticore-through-pip}

```bash
pip3 install --user manticore
```

solc 0.5.11 を推奨します。

### スクリプトを実行する {#running-a-script}

Python 3 では、以下の Python スクリプトを実行します：

```bash
python3 script.py
```

## 動的シンボリック実行の概要 {#introduction-to-dynamic-symbolic-execution}

### 動的シンボリック実行とは何か {#dynamic-symbolic-execution-in-a-nutshell}

動的シンボリック実行（DSE）は、高度な意味認識に基づき状態空間を探索するプログラム解析手法です。 この手法は、`path predicates`と呼ばれる数式で表される「プログラム・パス」を発見するものです。 概念的には、この手法は 2 つのステップによりパス述語を操作します：

1. プログラムの入力に対する制約を参照して、プログラム・パスを構築します。
2. プログラム・パスは、関連パスを実行させるプログラムの入力を生成します。

このアプローチでは、具体値で実行する際に、特定されたすべてのプログラムの状態をトリガーしうるという意味で誤検出が発生しません。 例えば、解析において整数のオーバーフローが特定された場合、このオーバーフローは確実に再現可能です。

### パス述語の具体例 {#path-predicate-example}

DSE の仕組みを理解するために、以下の例を考えてみましょう。

```solidity
function f(uint a){

  if (a == 65) {
      // A bug is present
  }

}
```

`f()`には 2 つのパスが含まれているため、DSE により、2 つの異なるパス述語が構築されます。

- 第 1 のパス： `a == 65`
- 第 2 のパス： `Not (a == 65)`

それぞれのパス述語は、いわゆる[SMT ソルバー](https://wikipedia.org/wiki/Satisfiability_modulo_theories)に投入できる数式であり、SMT ソルバーはこの等式を解決しようとします。 `第1のパス`では、ソルバーは、このパスが`a = 65`で探索可能だと返します。 `第2のパス`では、ソルバーは、`a`に対し、65 以外の任意の値を与えることができます（例： `a = 0`）。

### プロパティを検証する {#verifying-properties}

Manticore では、各パスの実行全体を完全に制御できます。 このため、ほぼすべての事項に対して任意の制限を加えることができます。 この制御を通じて、コントラクトのプロパティを作成することができます。

次の例を考えてみましょう：

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // no overflow protection
  return c;
}
```

この関数を探索するには、1 つのパスしか存在しません。

- パス 1： `c = a + b`

Manticore を使用することで、オーバーフローの有無を確認し、パス述語に制限を加えられます。

- `c = a + b AND (c < a OR c < b)`

上記の述語パスが実行可能となる`a`および`b`の値を見つけられる場合、オーバーフローが特定できたことになります。 例えば、ソルバーは、`a = 10 , b = MAXUINT256`という入力を生成できます。

次に、上記を修正したコードを見てみましょう：

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

オーバーフローを確認するために数式は、以下のようになるでしょう：

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

この数式は解くことができません。言い換えれば、`safe_add`において、`c`の値が常に増加することを**証明**しています。

このように、DSE はコード上の任意の制限について検証できるパワフルなツールです。

## Manticore で実行する {#running-under-manticore}

以下に、Manticore API を用いて、スマートコントラクトを探索する方法を紹介します。 対象となるスマートコントラクトは、[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

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

### スタンドアロンの探索を実行する {#run-a-standalone-exploration}

以下のコマンドから、スマートコントラクト上で直接 Manticore を実行できます（`project`は、Solidity ファイルでもプロジェクトディレクトリでも構いません）。

```bash
$ manticore project
```

実行すると、以下のようなテストケースが出力されます（順番は異なる可能性があります）：

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

Manticore は、追加情報が提供されない限り、新規のシンボリック・トランザクションを使って、コントラクト上で新規パスが発見されるまでコントラクトを探索します。 Manticore では、トランザクションが失敗した場合（例：状態が元に戻された後）は、新規のトランザクションを実行しません。

Manticore では、 `mcore_*`ディレクトリに情報を出力します。 このディレクトリには、以下が含まれます：

- `global.summary`：カバレッジとコンパイラに関する警告
- `test_XXXXX.summary`：テストケースごとのカバレッジ、最後の命令、およびアカウント残高
- `test_XXXXX.tx`：テストケースごとの詳細なトランザクションリスト

この例では、以下に該当する 7 つのテストケースが特定されました（ファイル名の順番は異なるかもしれません）：

|                      | トランザクション 0 | トランザクション 1 | トランザクション 2 |  結果  |
| :------------------: | :----------------: | :----------------: | ------------------ | :----: |
| **test_00000000.tx** | コントラクトの作成 |      f(!=65)       | f(!=65)            |  STOP  |
| **test_00000001.tx** | コントラクトの作成 | フォールバック関数 |                    | REVERT |
| **test_00000002.tx** | コントラクトの作成 |                    |                    | RETURN |
| **test_00000003.tx** | コントラクトの作成 |       f(65)        |                    | REVERT |
| **test_00000004.tx** | コントラクトの作成 |      f(!=65)       |                    |  STOP  |
| **test_00000005.tx** | コントラクトの作成 |      f(!=65)       | f(65)              | REVERT |
| **test_00000006.tx** | コントラクトの作成 |      f(!=65)       | フォールバック関数 | REVERT |

_探索サマリーにおける「f(!=65)」は、f が 65 以外の値で呼び出されたことを意味します。_

ご覧のように、Manticore では、すべての成功した／元に戻されたトランザクションにつき、固有のテストケースを生成します。

高速な探索を行いたい場合は、`--quick-mode`フラグを使用してください（バグ検出、ガス代計算等が省略されます）。

### Manticore API を使ってスマートコントラクトを操作する {#manipulate-a-smart-contract-through-the-api}

このセクションでは、Manticore Python API を使ってスマートコントラクトを操作する方法について詳しく説明します。 Python の拡張子である`*.py`を持つ新規ファイルを作成し、API コマンド（基本知識については以下で説明します）をファイルに追加して必要なコードを書いてから、`$ python3 *.py`コマンドで実行します。 また、Python のコンソールから直接コマンドを実行することもできます。コンソールを起動する際のコマンドは、`$ python3`です。

### アカウントを作成する {#creating-accounts}

まず、以下のコマンドを持つ新規のブロックチェーンを立ち上げる必要があります。

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

[m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)により、コントラクトではないアカウントが作成されます。

```python
user_account = m.create_account(balance=1000)
```

Solidity で作成したコントラクトについては、[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)でデプロイします。

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

- [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account)と[m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract)を使用して、ユーザーアカウントとコントラクトアカウントを作成できます。

### トランザクションを実行する {#executing-transactions}

Manticore は、2 種類のトランザクションに対応しています：

- 生トランザクション：すべての関数を探索します。
- 名前付きトランザクション：1 つの関数だけを探索します。

#### 生トランザクション {#raw-transaction}

生トランザクションは、[m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction)で実行されます。

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

呼び出し元、アドレス、データ、トランザクションの値は、具体値あるいはシンボリック値のどちらでも構いません：

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value)は、シンボリック値を生成します。
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer)は、シンボリックなバイト配列を生成します。

以下の例を確認してください：

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

データがシンボリック値の場合、Manticore は、トランザクションの実行時にコントラクトに含まれるすべての関数を探索します。 関数がどのように選択されるかを理解するには、[Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/)の記事におけるフォールバック関数についての説明を参照してください。

#### 名前付きトランザクション {#named-transaction}

関数は、名前から実行できます。 `f(uint var)`につき、シンボリック値を用いて、user_account から、0 ether で実行する場合、以下を使用します：

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

トランザクションの`value`を指定しない場合、デフォルトでは 0 になります。

#### まとめ {#summary-1}

- トランザクションの引数は、具体値またはシンボリック値のどちらでもよい。
- 生トランザクションは、すべての関数を探索する。
- 関数は、名前で呼び出すことができる。

### ワークスペース {#workspace}

`m.workspace`は、生成されたすべてのファイルにおける出力ディレクトリとして使用されるディレクトリです。

```python
print("Results are in {}".format(m.workspace))
```

### 探索を終了する {#terminate-the-exploration}

探索を停止するには、[m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)を使用します。 このメソッドが呼び出された時点で、さらにトランザクションは送信されなくなり、Manticore は探索済みの各パスにつきテストケースを生成します。

### Manticore を使った実行のまとめ {#summary-running-under-manticore}

上記のステップをまとめると、以下のようになります：

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
m.finalize() # stop the exploration
```

紹介したすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)でアクセスできます。

## スローイングパスを取得する {#getting-throwing-paths}

次に、 `f()`において例外を発生させるパスに対する、特定のインプットを生成します。 ここでも、対象となるスマートコントラクトは[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

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

### 状態情報を使用する {#using-state-information}

実行された各パスには、それぞれのブロックチェーンの状態が含まれています。 状態は、ready または killed のどちらかです。killed は、THROW または REVERT に達したことを意味します。

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing)：ready に該当する状態のリスト（REVERT/INVALID を実行しなかった状態）
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：killed に該当する状態のリスト
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：すべての状態

```python
for state in m.all_states:
    # do something with state
```

状態情報は、アクセス可能です。 以下の例をご覧ください：

- `state.platform.get_balance(account.address)`：アカウント残高
- `state.platform.transactions`：トランザクションのリスト
- `state.platform.transactions[-1].return_data`：最後のトランザクションで返されたデータ

最後のトランザクションによって返されるデータは配列ですが、以下のように ABI.deserialize で値に変換できます：

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### テストケースの生成方法 {#how-to-generate-testcase}

テストケースを生成するには、「[m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase)」を使用します。

```python
m.generate_testcase(state, 'BugFound')
```

### まとめ {#summary-2}

- 状態は、m.all_states でイテレートできる
- `state.platform.get_balance(account.address)`は、アカウント残高を返す
- `state.platform.transactions`は、トランザクションのリストを返す
- `transaction.return_data`は、返されたデータを示す
- `m.generate_testcase(state, name)`は、状態に対する入力を生成する

### スローイングパス取得のまとめ {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

紹介したすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)でアクセスできます。

_terminated_state が返したすべての状態は結果の値が REVERT または INVALID であるため、上記よりも簡略なスクリプトを作成することもできました。上記のスクリプト例は、Manticore API の操作方法を説明することを目的としたものです。_

## 制約を追加する {#adding-constraints}

次に、探索を制限する方法について確認しましょう。 ここでは、`f()`のドキュメンテーションにおいて、この関数は決して`a == 65`で呼び出されることはないと記載されていると想定します。このため、`a == 65`のバグは、実際にはバグではありません。 ここでも、対象のスマートコントラクトは[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)です。

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

[演算子](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py)モジュールは、制約を容易に操作する上で役立ちます。特に、以下の操作を提供します：

- Operators.AND
- Operators.OR
- Operators.UGT（符号なし大なり）
- Operators.UGE（符号なし以上）
- Operators.ULT（符号なし小なり）
- Operators.ULE（符号なし、以下）

このモジュールをインポートするには、以下を使用します：

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`は、配列に値を連結するために使用します。 例えば、トランザクションの return_data は、他の値に対して検証可能な値に変更する必要があります：

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 制約 {#state-constraint}

制約の対象は、グローバルあるいは特定の状態のみのどちらでも構いません。

#### グローバル制約 {#state-constraint}

グローバル制約を追加するには、`m.constraint(constraint)`を使用します。 例えば以下のように、シンボリックアドレスからコントラクトを呼び出し、このアドレスを特定の値に制限することができます：

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状態に対する制約 {#state-constraint}

特定の状態に対して制約を追加するには、[state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain)を使用します。 特定の状態における一部のプロパティをチェックしてから、状態に制限を追加することができます。

### 制約を確認する {#checking-constraint}

制約が実行可能かどうかを確認するには、`solver.check(state.constraints)`を使用します。 例えば以下では、symbolic_value が「65」以外の値でなければならないという制約を追加した上で、状態が実行可能かどうかをチェックします。

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### 制約追加のまとめ {#summary-adding-constraints}

これまでのコードに制約を追加すると、以下のようになります：

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # we do not consider the path were a == 65
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

ここで紹介したすべてのコードは、[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)からアクセスできます。
