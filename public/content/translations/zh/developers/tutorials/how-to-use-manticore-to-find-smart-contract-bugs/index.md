---
title: "如何使用曼蒂科尔发现智能合约中的漏洞"
description: "如何使用曼蒂科尔自动发现智能合约中的漏洞"
author: Trailofbits
lang: zh
tags:
  ["Solidity", "智能合约", "安全", "测试", "形式化验证"]
skill: advanced
breadcrumb: "曼蒂科尔"
published: 2020-01-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

本教程旨在展示如何使用曼蒂科尔自动发现智能合约中的漏洞。

## 安装 {#installation}

曼蒂科尔需要 >= Python 3.6。可以通过 pip 或使用 Docker 进行安装。

### 通过 Docker 安装曼蒂科尔 {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一条命令在 Docker 中运行 eth-security-toolbox，该 Docker 可以访问你当前的目录。你可以从主机更改文件，并在 Docker 中对这些文件运行工具_

在 Docker 内部，运行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 通过 pip 安装曼蒂科尔 {#manticore-through-pip}

```bash
pip3 install --user manticore
```

推荐使用 solc 0.5.11。

### 运行脚本 {#running-a-script}

要使用 Python 3 运行 Python 脚本：

```bash
python3 script.py
```

## 动态符号执行简介 {#introduction-to-dynamic-symbolic-execution}

### 动态符号执行简述 {#dynamic-symbolic-execution-in-a-nutshell}

动态符号执行（DSE）是一种程序分析技术，它以高度的语义感知来探索状态空间。该技术基于对“程序路径”的发现，这些路径表示为称为 `path predicates` 的数学公式。从概念上讲，该技术分两步对路径谓词进行操作：

1. 它们是使用对程序输入的约束来构建的。
2. 它们用于生成将导致相关路径执行的程序输入。

这种方法不会产生误报，因为所有识别出的程序状态都可以在具体执行期间被触发。例如，如果分析发现整数溢出，则保证它是可重现的。

### 路径谓词示例 {#path-predicate-example}

为了深入了解 DSE 的工作原理，请考虑以下示例：

```solidity
function f(uint a){

  if (a == 65) {
      // 存在 bug
  }

}
```

由于 `f()` 包含两条路径，DSE 将构建两个不同的路径谓词：

- 路径 1：`a == 65`
- 路径 2：`Not (a == 65)`

每个路径谓词都是一个数学公式，可以将其提供给所谓的 [SMT 求解器](https://wikipedia.org/wiki/Satisfiability_modulo_theories)，求解器将尝试求解该方程。对于 `Path 1`，求解器会指出可以通过 `a = 65` 来探索该路径。对于 `Path 2`，求解器可以赋予 `a` 除 65 之外的任何值，例如 `a = 0`。

### 验证属性 {#verifying-properties}

曼蒂科尔允许完全控制每条路径的所有执行。因此，它允许你向几乎任何事物添加任意约束。这种控制允许在合约上创建属性。

考虑以下示例：

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // 没有溢出保护
  return c;
}
```

在这里，函数中只有一条路径需要探索：

- 路径 1：`c = a + b`

使用曼蒂科尔，你可以检查溢出，并向路径谓词添加约束：

- `c = a + b AND (c < a OR c < b)`

如果能够找到 `a` 和 `b` 的赋值，使得上述路径谓词可行，这意味着你发现了一个溢出。例如，求解器可以生成输入 `a = 10 , b = MAXUINT256`。

如果你考虑一个修复后的版本：

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

带有溢出检查的相关公式将是：

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

这个公式无法求解；换句话说，这**证明**了在 `safe_add` 中，`c` 将始终增加。

因此，DSE 是一个强大的工具，可以验证代码上的任意约束。

## 在曼蒂科尔下运行 {#running-under-manticore}

我们将了解如何使用曼蒂科尔 API 探索智能合约。目标是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

### 运行独立探索 {#run-a-standalone-exploration}

你可以通过以下命令直接在智能合约上运行曼蒂科尔（`project` 可以是 Solidity 文件，也可以是项目目录）：

```bash
$ manticore project
```

你将获得类似如下的测试用例输出（顺序可能会改变）：

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

在没有额外信息的情况下，曼蒂科尔将使用新的符号交易探索合约，直到它不再探索合约上的新路径。曼蒂科尔不会在失败的交易（例如：回退之后）之后运行新的交易。

曼蒂科尔将在 `mcore_*` 目录中输出信息。除其他外，你将在此目录中找到：

- `global.summary`：覆盖率和编译器警告
- `test_XXXXX.summary`：每个测试用例的覆盖率、最后一条指令、账户余额
- `test_XXXXX.tx`：每个测试用例的详细交易列表

在这里，曼蒂科尔发现了 7 个测试用例，它们对应于（文件名顺序可能会改变）：

|                      |   交易 0   |   交易 1   | 交易 2     | 结果 |
| :------------------: | :---------------: | :---------------: | ----------------- | :----: |
| **test_00000000.tx** | 创建合约 |      f(!=65)      | f(!=65)           |  STOP  |
| **test_00000001.tx** | 创建合约 | 回退函数 |                   | REVERT |
| **test_00000002.tx** | 创建合约 |                   |                   | RETURN |
| **test_00000003.tx** | 创建合约 |       f(65)       |                   | REVERT |
| **test_00000004.tx** | 创建合约 |      f(!=65)      |                   |  STOP  |
| **test_00000005.tx** | 创建合约 |      f(!=65)      | f(65)             | REVERT |
| **test_00000006.tx** | 创建合约 |      f(!=65)      | 回退函数 | REVERT |

_探索摘要 f(!=65) 表示使用不同于 65 的任何值调用 f。_

如你所见，曼蒂科尔为每笔成功或回退的交易生成一个唯一的测试用例。

如果你想要快速的代码探索，请使用 `--quick-mode` 标志（它会禁用漏洞检测器、Gas 计算等）

### 通过 API 操作智能合约 {#manipulate-a-smart-contract-through-the-api}

本节详细介绍如何通过曼蒂科尔 Python API 操作智能合约。你可以创建一个带有 Python 扩展名 `*.py` 的新文件，并通过将 API 命令（其基础知识将在下面描述）添加到此文件中来编写必要的代码，然后使用命令 `$ python3 *.py` 运行它。你也可以直接在 Python 控制台中执行以下命令，要运行控制台，请使用命令 `$ python3`。

### 创建账户 {#creating-accounts}

你应该做的第一件事是使用以下命令初始化一个新的区块链：

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 创建非合约账户：

```python
user_account = m.create_account(balance=1000)
```

可以使用 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 部署 Solidity 合约：

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

#### 摘要 {#summary}

- 你可以使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 和 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 创建用户和合约账户。

### 执行交易 {#executing-transactions}

曼蒂科尔支持两种类型的交易：

- 原始交易：探索所有函数
- 命名交易：仅探索一个函数

#### 原始交易 {#raw-transaction}

使用 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) 执行原始交易：

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

交易的调用者、地址、数据或值可以是具体的，也可以是符号的：

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) 创建一个符号值。
- [m.make_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) 创建一个符号字节数组。

例如：

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

如果数据是符号的，曼蒂科尔将在交易执行期间探索合约的所有函数。查看 [Ethernaut CTF 实践](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/) 文章中的回退函数解释，将有助于理解函数选择的工作原理。

#### 命名交易 {#named-transaction}

可以通过函数名称执行函数。
要从 user_account 以 0 以太币使用符号值执行 `f(uint var)`，请使用：

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

如果未指定交易的 `value`，则默认为 0。

#### 摘要 {#summary-1}

- 交易的参数可以是具体的，也可以是符号的
- 原始交易将探索所有函数
- 可以通过名称调用函数

### 工作区 {#workspace}

`m.workspace` 是用作所有生成文件的输出目录：

```python
print("Results are in {}".format(m.workspace))
```

### 终止探索 {#terminate-the-exploration}

要停止探索，请使用 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)。调用此方法后，不应发送任何进一步的交易，并且曼蒂科尔会为探索的每条路径生成测试用例。

### 摘要：在曼蒂科尔下运行 {#summary-running-under-manticore}

将前面的所有步骤放在一起，我们得到：

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
m.finalize() # 停止探索
```

你可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上面的所有代码

## 获取抛出异常的路径 {#getting-throwing-paths}

我们现在将为在 `f()` 中引发异常的路径生成特定输入。目标仍然是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

### 使用状态信息 {#using-state-information}

执行的每条路径都有其区块链状态。状态要么是就绪（ready），要么是被终止（killed），这意味着它到达了 THROW 或 REVERT 指令：

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing)：就绪状态的列表（它们没有执行 REVERT/INVALID）
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：被终止状态的列表
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：所有状态

```python
for state in m.all_states:
    # 对状态进行操作
```

你可以访问状态信息。例如：

- `state.platform.get_balance(account.address)`：账户的余额
- `state.platform.transactions`：交易列表
- `state.platform.transactions[-1].return_data`：上一笔交易返回的数据

上一笔交易返回的数据是一个数组，可以使用 ABI.deserialize 将其转换为值，例如：

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 如何生成测试用例 {#how-to-generate-testcase}

使用 [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) 生成测试用例：

```python
m.generate_testcase(state, 'BugFound')
```

### 摘要 {#summary-2}

- 你可以使用 m.all_states 遍历状态
- `state.platform.get_balance(account.address)` 返回账户的余额
- `state.platform.transactions` 返回交易列表
- `transaction.return_data` 是返回的数据
- `m.generate_testcase(state, name)` 为状态生成输入

### 摘要：获取抛出异常的路径 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 检查执行是否以回退或无效结束
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

你可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上面的所有代码

_注意，我们本可以生成一个简单得多的脚本，因为 terminated_state 返回的所有状态在其结果中都有 REVERT 或 INVALID：此示例仅用于演示如何操作 API。_

## 添加约束 {#adding-constraints}

我们将了解如何约束探索。我们假设 `f()` 的文档指出该函数永远不会使用 `a == 65` 调用，因此任何带有 `a == 65` 的漏洞都不是真正的漏洞。目标仍然是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

### 运算符 {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) 模块有助于操作约束，除其他外，它还提供：

- Operators.AND，
- Operators.OR，
- Operators.UGT（无符号大于），
- Operators.UGE（无符号大于或等于），
- Operators.ULT（无符号小于），
- Operators.ULE（无符号小于或等于）。

要导入该模块，请使用以下命令：

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` 用于将数组连接为值。例如，需要将交易的 return_data 更改为值，以便与另一个值进行检查：

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 约束 {#state-constraint}

你可以在全局或针对特定状态使用约束。

#### 全局约束 {#state-constraint-2}

使用 `m.constrain(constraint)` 添加全局约束。
例如，你可以从符号地址调用合约，并将此地址限制为特定值：

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状态约束 {#state-constraint-3}

使用 [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) 向特定状态添加约束。
它可用于在探索状态后对其进行约束，以检查其上的某些属性。

### 检查约束 {#checking-constraint}

使用 `solver.check(state.constraints)` 了解约束是否仍然可行。
例如，以下内容将约束 symbolic_value 不同于 65，并检查状态是否仍然可行：

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 状态是可行的
```

### 摘要：添加约束 {#summary-adding-constraints}

将约束添加到前面的代码中，我们得到：

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

## 检查执行是否以回退或无效结束
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        # 我们不考虑 a == 65 的路径
        condition = symbolic_var != 65
        if m.generate_testcase(state, name="BugFound", only_if=condition):
            print(f'Bug found, results are in {m.workspace}')
            no_bug_found = False

if no_bug_found:
    print(f'No bug found')
```

你可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到上面的所有代码