---
title: 如何使用 Manticore 发现智能合约中的漏洞
description: 如何使用 Manticore 自动发现智能合约中的漏洞
author: Trailofbits
lang: zh
tags: [ "Solidity", "智能合同", "安全性。", "测试", "形式化验证" ]
skill: advanced
published: 2020-01-13
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

本教程的目的是展示如何使用 Manticore 自动发现智能合约中的漏洞。

## 安装 {#installation}

Manticore 需要 Python 3.6 或更高版本。 它可以通过 pip 或使用 docker 来安装。

### 通过 docker 使用 Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一个命令在一个可访问你当前目录的 docker 中运行 eth-security-toolbox。 你可以从主机更改文件，并在 docker 中对文件运行工具_

在 docker 中，运行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 通过 pip 使用 Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

建议使用 solc 0.5.11。

### 运行脚本 {#running-a-script}

使用 python 3 运行 python 脚本：

```bash
python3 script.py
```

## 动态符号执行简介 {#introduction-to-dynamic-symbolic-execution}

### 动态符号执行简述 {#dynamic-symbolic-execution-in-a-nutshell}

动态符号执行 (DSE) 是一种程序分析技术，可利用高度的语义感知来探索状态空间。 这项技术基于对“程序路径”的发现，这些路径表示为称为`路径谓词`的数学公式。 从概念上讲，此技术分两步对路径谓词进行操作：

1. 它们是利用对程序输入的约束来构建的。
2. 它们被用来生成程序输入，从而导致相关路径的执行。

这种方法不会产生误报，因为所有被识别的程序状态都可以在具体执行过程中被触发。 例如，如果分析发现了一个整数溢出，就可以保证它是可重现的。

### 路径谓词示例 {#path-predicate-example}

为了了解 DSE 如何工作，请考虑以下示例：

```solidity
function f(uint a){

  if (a == 65) {
      // 存在一个漏洞
  }

}
```

由于 `f()` 包含两条路径，DSE 将构建两个不同的路径谓词：

- 路径 1：`a == 65`
- 路径 2：`Not (a == 65)`

每个路径谓词都是一个数学公式，可以将其提供给所谓的 [SMT 求解器](https://wikipedia.org/wiki/Satisfiability_modulo_theories)，求解器会尝试求解该方程式。 对于“路径 1”，求解器会指出可以使用 `a = 65` 探索该路径。 对于“路径 2”，求解器可以为 `a` 指定一个 65 以外的任何值，例如 `a = 0`。

### 验证属性 {#verifying-properties}

Manticore 允许完全控制每个路径的所有执行情况。 因此，它允许你为几乎任何东西添加任意约束。 这种控制允许在合约上创建属性。

请考虑下面的示例：

```solidity
function unsafe_add(uint a, uint b) returns(uint c){
  c = a + b; // 没有溢出保护
  return c;
}
```

函数中只有一个要探索的路径：

- 路径 1：`c = a + b`

使用 Manticore，你可以检查溢出，并向路径谓词添加约束：

- `c = a + b AND (c < a OR c < b)`

如果可以为 `a` 和 `b` 找到一个使上述路径谓词可行的赋值，则意味着你发现了一个溢出。 例如，求解器可以生成输入 `a = 10, b = MAXUINT256`。

如果你考虑一个修复后的版本：

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c>=a);
  require(c>=b);
  return c;
}
```

与溢出检查相关的公式是：

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

这个公式无法求解；换句话说，这**证明**了在 `safe_add` 中，`c` 的值总是会增加。

因此，DSE 是一个强大的工具，可以验证你代码中的任意约束。

## 在 Manticore 下运行 {#running-under-manticore}

我们将了解如何使用 Manticore 应用程序接口来探索智能合约。 目标是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

你可以通过以下命令直接在智能合约上运行 Manticore（`project` 可以是一个 Solidity 文件，或者是项目目录）：

```bash
$ manticore project
```

你将会获得像下面这样的测试用例输出（顺序可能有变）：

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

在没有额外信息的情况下，Manticore 将利用新的符号交易探索合约，直到它不再探索合约上的新路径为止。 Manticore 不会在失败后（例如：回滚后）执行新的交易。

Manticore 将在一个 `mcore_*` 目录中输出信息。 除其他外，你将在这个目录中找到：

- `global.summary`：覆盖率和编译器警告
- `test_XXXXX.summary`：每个测试用例的覆盖率、最后一条指令、账户余额
- `test_XXXXX.tx`：每个测试用例的交易详细列表

在这里，Manticore 发现了 7 个测试用例，它们对应于（文件名顺序可能会改变）：

|                                                           | 交易 0 |            交易 1            | 交易 2                       |   结果   |
| :-------------------------------------------------------: | :--: | :------------------------: | -------------------------- | :----: |
| **test_00000000.tx** | 合约创建 | f(!=65) | f(!=65) |  STOP  |
| **test_00000001.tx** | 合约创建 |            回退函数            |                            | REVERT |
| **test_00000002.tx** | 合约创建 |                            |                            | RETURN |
| **test_00000003.tx** | 合约创建 |  f(65)  |                            | REVERT |
| **test_00000004.tx** | 合约创建 | f(!=65) |                            |  STOP  |
| **test_00000005.tx** | 合约创建 | f(!=65) | f(65)   | REVERT |
| **test_00000006.tx** | 合约创建 | f(!=65) | 回退函数                       | REVERT |

_探索摘要 f(!=65) 表示 f 是以任何非 65 的值调用的。_

正如你可以注意到的那样，Manticore 为每个成功或回滚的交易生成一个独特的测试用例。

如果你想要快速的代码探索，请使用 `--quick-mode` 标志（它会禁用漏洞检测器、燃料计算...）

### 通过应用程序接口操纵智能合约 {#manipulate-a-smart-contract-through-the-api}

本节详细介绍如何通过 Manticore Python 应用程序接口操纵智能合约。 你可以创建扩展名为 `*.py` 的新 Python 文件，通过将应用程序接口命令（下文会介绍其基础知识）添加到此文件中来编写必要的代码，然后使用 `$ python3 *.py` 命令运行它。 你也可以直接在 python 控制台中执行下面的命令，使用 `$ python3` 命令来运行控制台。

### 创建账户 {#creating-accounts}

首先，你要通过以下命令启动一个新的区块链：

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 创建一个非合约账户：

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
# 初始化合约
contract_account = m.solidity_create_contract(source_code, owner=user_account)
```

#### 总结 {#summary}

- 你可以使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 和 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 来创建用户账户和合约账户。

### 执行交易 {#executing-transactions}

Manticore 支持两种类型的交易：

- 原始交易：探索所有函数
- 命名交易：只探索一个函数

#### 原始交易 {#raw-transaction}

使用 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) 执行原始交易：

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

交易的调用者、地址、数据或值，既可以是具体的，也可以是符号的：

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

如果数据是符号的，Manticore 将在交易执行期间探索合约的所有函数。 查看[“Ethernaut CTF 实战”](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/)文章中的回退函数解释，对于理解函数选择的工作原理会有所帮助。

#### 命名交易 {#named-transaction}

函数可以通过其的名称执行。
要使用 `user_account` 中的符号值以及 0 ETH 执行 `f(uint var)`，请使用：

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

如果没有指定交易的 `value`，则默认为 0。

#### 总结 {#summary-1}

- 交易的参数可以是具体的或符号的
- 原始交易将探索所有函数
- 函数可以通过其名称来调用

### 工作区 {#workspace}

`m.workspace` 目录用作所有生成的文件的输出目录：

```python
print("Results are in {}".format(m.workspace))
```

### 终止探索 {#terminate-the-exploration}

使用 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize) 停止探索。 一旦这个方法被调用，就不应该再发送任何交易，而且 Manticore 会针对所探索的每一条路径生成测试用例。

### 总结：在 Manticore 下运行 {#summary-running-under-manticore}

将所有先前的步骤放在一起，我们就会得到：

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

以上所有代码都可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到

## 获取抛出路径 {#getting-throwing-paths}

我们现在将为路径生成特定的输入，以在 `f()` 中引发异常。 目标仍然是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

执行的每个路径都有其区块链的状态。 此状态要么是准备就绪，要么是被终止了，也就是说，它达到了 THROW 或 REVERT 指令状态。

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing)：准备就绪（它们没有执行 REVERT/INVALID）的状态列表
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：已终止状态的列表
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：所有状态

```python
for state in m.all_states:
    # 对状态执行某些操作
```

你可以访问状态信息。 例如：

- `state.platform.get_balance(account.address)`：账户的余额
- `state.platform.transactions`：交易列表
- `state.platform.transactions[-1].return_data`：最后一笔交易返回的数据

最后一笔交易返回的数据是一个数组，可以用 ABI.deserialize 转换为一个值，例如：

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 如何生成测试用例 {#how-to-generate-testcase}

使用 [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) 生成测试用例：

```python
m.generate_testcase(state, 'BugFound')
```

### 总结 {#summary-2}

- 你可以使用 m.all_states 迭代状态
- `state.platform.get_balance(account.address)` 返回账户的余额
- `state.platform.transactions` 返回交易列表
- `transaction.return_data` 是返回的数据
- `m.generate_testcase(state, name)` 为状态生成输入

### 总结：获取抛出路径 {#summary-getting-throwing-path}

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()

with open('example.sol') as f:
    source_code = f.read()

user_account = m.create_account(balance=1000)
contract_account = m.solidity_create_contract(source_code, owner=user_account)

symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var)

## 检查执行是否以 REVERT 或 INVALID 结束
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

以上所有代码都可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到

_请注意，我们本可以生成一个更简单的脚本，因为 terminated_state 返回的所有状态在其结果中都有 REVERT 或 INVALID：本示例仅用于演示如何操纵应用程序接口。_

## 添加约束 {#adding-constraints}

我们将看到如何对探索加以约束。 我们将作出这样的假设：`f()` 的文档指出，该函数从未在 `a == 65` 的情况下被调用，因此任何 `a == 65` 的错误都不是真正的错误。 目标仍然是以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

### 操作符 {#operators}

[Operators](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py) 模块有助于操纵约束，它提供了以下操作符：

- Operators.AND,
- Operators.OR,
- Operators.UGT（无符号大于），
- Operators.UGE（无符号大于等于），
- Operators.ULT（无符号小于），
- Operators.ULE（无符号小于等于）。

请使用以下代码导入模块：

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT` 用于将一个数组与一个值级联。 例如，一个交易的 return_data 需要转变为一个值，以便与另一个值进行检查对比：

```python
last_return = Operators.CONCAT(256, *last_return)
```

### 约束 {#state-constraint}

你可以在全局范围内或针对某个特定的状态使用约束。

#### 全局约束 {#state-constraint}

使用 `m.constrain(constraint)` 添加全局约束。
例如，你可以从一个符号地址调用合约，并将这个地址约束为特定的值：

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状态约束 {#state-constraint}

使用 [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) 为特定状态添加约束。
它可用于在探索状态后对其进行约束，以检查状态上的某些属性。

### 检查约束 {#checking-constraint}

使用 `solver.check(state.constraints)` 来了解约束是否仍然可行。
例如，以下代码将 `symbolic_value` 限定为不等于 65，并检查状态是否仍然可行：

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # 状态可行
```

### 总结：添加约束 {#summary-adding-constraints}

通过在前面的代码中添加约束，我们获得：

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

## 检查执行是否以 REVERT 或 INVALID 结束
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

以上所有代码都可以在 [`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py) 中找到
