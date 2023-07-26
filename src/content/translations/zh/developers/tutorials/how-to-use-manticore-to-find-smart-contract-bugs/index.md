---
title: 如何使用Manticore来发现智能合约漏洞
description: 如何使用Manticore来自动发现智能合约漏洞
author: Trailofbits
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "安全性"
  - "测试"
  - "形式化验证"
skill: intermediate
published: 2020-01-13
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore
---

本教程的目的是展示如何使用 Manticore 自动发现智能合约中的漏洞。

## 安装 {#installation}

Manticore 需要使用 python 3.6。 它可以通过 pip 或使用 docker 来安装。

### 使用 docker 的 Manticore {#manticore-through-docker}

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/training trailofbits/eth-security-toolbox
```

_最后一个命令在一个可访问您当前目录的 docker 中运行 eth-security 工具箱。 您可以更改您主机中的文件，并从 docker 中运行文件上的工具_

在 docker 中，运行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 使用 pip 的 Manticore {#manticore-through-pip}

```bash
pip3 install --user manticore
```

建议采用 solc 0.5.11。

### 运行脚本 {#running-a-script}

使用 python 3 运行一个 python 脚本：

```bash
python3 script.py
```

## 动态符号化执行简介 {#introduction-to-dynamic-symbolic-execution}

### Nutshell 中的动态符号化执行 {#dynamic-symbolic-execution-in-a-nutshell}

动态符号化执行(DSE)是一种程序分析技术，用于探究具有高度语义意识的状态空间。 这项技术是基于 "程序路径"的发现 ，以一种称为`path predicates`的数学公式表示。 就概念来说，这种技术对路径预测的操作分为两步：

1. 它们是利用对程序输入的约束来构建的。
2. 它们被用来生成程序输入，从而导致相关路径的执行。

这种方法不会产生误报，因为所有被识别的程序状态都可以在具体执行过程中被触发。 例如，如果分析发现了一个整数溢出，就可以保证它是可重现的

### 路径预测示例 {#path-predicate-example}

为了了解 DSE 如何工作，请考虑以下示例：

```solidity
f(uint a).

  if (aa== 65) }
      // bug 存在


}
```

因为 f()包含两个路径，DSE 将构建两个不同的路径预测：

- 路径 1： `a == 65`
- 路径 2: `Not (a == 65)`

每个路径预测都是一个数学公式，可以传递给所谓的 [SMT 求解器](https://wikipedia.org/wiki/Satisfiability_modulo_theories)，求解器将尝试解方程式。 对于`路径1`，求解器会说，可以用`a=65`探索路径。 对于`路径2`，求解器可以给`a`指定一个 65 以外的任何值，例如`a=0`。

### 验证属性 {#verifying-properties}

Manticore 允许完全控制每个路径的所有执行情况。 因此，它允许您在几乎任何东西上添加任意限制。 这种控制允许在合约上创建财产。

请考虑下面的示例：

```solidity
function unsafe_add(uint a, uint b) returns(uint c)。
  c = a + b；// no overflow protection
  return c；
}
```

函数中只有一个要探索的路径：

- 路径 1: `c = a + b`

使用 Manticore，您可以对溢出进行检查，并对路径预测加以限制：

- `c = a + b AND (c < a OR c < b)`

如果有可能找到一个`a`和`b`的估值，对于这个估值，上面的路径预测是可行的，这意味着您发现了一个溢出。 例如，求解器可以生成输入`a = 10 , b = MAXUINT256`。

如果您考虑一个固定版本：

```solidity
function safe_add(uint a, uint b) returns(uint c){
  c = a + b;
  require(c->=a);
  require(c)>=b);
  return c;
}
```

与溢出检查相关的公式是：

- `c = a + b AND (c >= a) AND (c=>b) AND (c < a OR c < b)`

这个公式无法得以解决；在其他领域，这是一个在`safe_add`中，`c`总会增加的**证明**。

因此，DSE 是一个强大的工具，可以验证您代码的任意限制。

## 在 Manticore 下运行 {#running-under-manticore}

我们将看到如何探索使用 Manticore API 的智能合约。 目标是以下智能合约[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

### 运行一个独立的探索方式 {#run-a-standalone-exploration}

您可以通过以下命令直接在智能合约上运行 Manticore（`project`可以是一个 Solidity 文件，或者是项目目录）：

```bash
$ manticore project
```

您将会获得像这个一样的测试案例输出（顺序可能有变）：

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

在没有额外信息的情况下，Manticore 将利用新的符号交易探索智能合约，直到它不再探索合约上的新途径为止。 Manticore 不会在失败后执行新的交易（如恢复原状后）。

Manticore 将在一个`mcore_*`目录中输出信息。 除其他外，您将在这个目录中找到：

- `global.summary`：覆盖面和编译器警告
- `test_XXXXX.summary`：覆盖面、前一次的说明、每次测试案例的帐户余额
- `test_XXXXX.tx`：每个测试案例的交易详细列表

在这里，Manticore 发现了 7 个测试案例，它们对应于（文件名顺序可能会改变）：

|                      |  交易 0  |  交易 1  | 交易 2   | 结果 |
| :------------------: | :------: | :------: | -------- | :--: |
| **test_00000000.tx** | 合约创建 | f(!=65)  | f(!=65)  | 停止 |
| **test_00000001.tx** | 合约创建 | 回退函数 |          | 撤销 |
| **test_00000002.tx** | 合约创建 |          |          | 返回 |
| **test_00000003.tx** | 合约创建 |  f(65)   |          | 撤销 |
| **test_00000004.tx** | 合约创建 | f(!=65)  |          | 停止 |
| **test_00000005.tx** | 合约创建 | f(!=65)  | f(65)    | 撤销 |
| **test_00000006.tx** | 合约创建 | f(!=65)  | 回退函数 | 撤销 |

_检索摘要 f(!=65)表示使用不同于 65 的任何值调用的调用的 f。_

正如您可以注意到的那样，Manticore 为每个成功或撤销的交易生成一个独特的测试案例。

如果您想要快速的代码检查，请使用`--quick-mode`标志（它禁用 bug 检测器、gas 计算...）

### 通过 API 操纵智能合约 {#manipulate-a-smart-contract-through-the-api}

本节介绍如何通过 Manticore Python API 操纵智能合约的细节。 您可以使用 python 扩展名`*.py`创建新文件，并通过将 API 命令（下面将介绍其基础内容）添加到这个文件中来写入必要的代码，然后使用`$ python3 *.py`命令运行它。 您也可以直接在 python 控制台中执行下面的指令，使用`$python3`命令来运行控制台。

### 创建帐户 {#creating-accounts}

首先，您要通过以下命令启动一个新的区块链：

```python
from manticore.ethereum import ManticoreEVM

m = ManticoreEVM()
```

使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 创建一个非合约账号：

```python
user_account = m.create_account(balance=1000)
```

可以使用 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 部署一个 Solidity 合约：

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

#### 概览 {#summary}

- 可以使用 [m.create_account](https://manticore.readthedocs.io/en/latest/evm.html?highlight=create_account#manticore.ethereum.ManticoreEVM.create_account) 和 [m.solidity_create_contract](https://manticore.readthedocs.io/en/latest/evm.html?highlight=solidity_create#manticore.ethereum.ManticoreEVM.create_contract) 创建用户账户和合约账户。

### 执行交易 {#executing-transactions}

Manticore 支持两种类型的交易：

- 原始交易：已探索所有函数
- 命名交易：只探索一个函数

#### 原始交易 {#raw-transaction}

使用 [m.transaction](https://manticore.readthedocs.io/en/latest/evm.html?highlight=transaction#manticore.ethereum.ManticoreEVM.transaction) 执行原始交易：

```python
m.transaction(caller=user_account,
              address=contract_account,
              data=data,
              value=value)
```

调用者、地址、数据或交易的值可以是具体的或抽象的：

- [m.make_symbolic_value](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_value#manticore.ethereum.ManticoreEVM.make_symbolic_value) 创建一个符号值。
- [mmmake_symbolic_buffer(size)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=make_symbolic_buffer#manticore.ethereum.ManticoreEVM.make_symbolic_buffer) 创建一个符号字节数组。

例如：

```python
symbolic_value = m.make_symbolic_value()
symbolic_data = m.make_symbolic_buffer(320)
m.transaction(caller=user_account,
              address=contract_address,
              data=symbolic_data,
              value=symbolic_value)
```

如果数据是象征性的，Manticore 将在交易执行期间探索合约中的所有函数。 查看[Hands on the Ethernaut CTF](https://blog.trailofbits.com/2017/11/06/hands-on-the-ethernaut-ctf/)文章中的回退函数解释，对于理解函数选择的工作原理会有所帮助。

#### 命名交易 {#named-transaction}

函数可以通过其的名称执行。 要使用 user_account 中的符号值以及 0 ether 执行`f(uint var)`，请使用：

```python
symbolic_var = m.make_symbolic_value()
contract_account.f(symbolic_var, caller=user_account, value=0)
```

如果没有指定交易的`value`，则默认为 0。

#### 概览 {#summary-1}

- 交易的参数可以是具体的或抽象的
- 原始交易将探索所有函数
- 函数可以通过其名称来调用

### 工作区 {#workspace}

`m.workspace`目录用作所有生成的文件的输出目录：

```python
print("Results are in {}".format(m.workspace))
```

### 终止探索 {#terminate-the-exploration}

要停止探索，请使用 [m.finalize()](https://manticore.readthedocs.io/en/latest/evm.html?highlight=finalize#manticore.ethereum.ManticoreEVM.finalize)。 一旦这个方法被调用，就不应该再发送任何交易，而且 Manticore 会针对所探索的每一条路径生成测试案例。

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
m.finalize() # stop the exploration
```

以上所有代码都可以在[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)中找到。

## 获取投掷路径 {#getting-throwing-paths}

我们现在将为路径生成特定的输入，以在`f()`中引发异常。 目标仍为以下智能合约 [`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)。

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

- [m.ready_states](https://manticore.readthedocs.io/en/latest/states.html#accessing): 已准备就绪状态列表（他们没有执行 REVERT/INVALID）
- [m.killed_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：终止状态列表
- [m.all_states](https://manticore.readthedocs.io/en/latest/states.html#accessings)：所有状态

```python
for state in m.all_states:
    # do something with state
```

您可以访问状态信息。 例如：

- `state.platform.get_balance(account.address)`：帐户余额
- `state.platform.transactions`：交易列表
- `state.platform.transactions[-1].return_data`：最后一笔交易返回的数据

最后一笔交易返回的数据是一个数组，可以用 ABI.deserialize 转换为一个值，例如：

```python
data = state.platform.transactions[0].return_data
data = ABI.deserialize("uint", data)
```

### 如何生成测试案例 {#how-to-generate-testcase}

使用 [m.generate_testcase(state, name)](https://manticore.readthedocs.io/en/latest/evm.html?highlight=generate_testcase#manticore.ethereum.ManticoreEVM.generate_testcase) 生成测试案例：

```python
m. generate_testcase(state, 'BugFound')
```

### 概览 {#summary-2}

- 您可以使用 m.all_states 对状态进行迭代
- `state.platform.get_balance(account.adds)`返回帐户余额
- `state.platform.transactions`返回交易列表
- `transaction.return_data`是返回的数据
- `m.generate_testcase(state, name)`为状态生成输入

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

## Check if an execution ends with a REVERT or INVALID
for state in m.terminated_states:
    last_tx = state.platform.transactions[-1]
    if last_tx.result in ['REVERT', 'INVALID']:
        print('Throw found {}'.format(m.workspace))
        m.generate_testcase(state, 'ThrowFound')
```

以上所有代码都可以在[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)中找到。

_注意我们可以生成一个更简单的脚本，因为所有由 terminated_state 返回的状态在其结果中都有 REVERT 或 INVALID：这个例子只是为了演示如何操作 API。_

## 添加限制 {#adding-constraints}

我们将看到如何对探索加以约束。 我们将作出这样的假设：`f()`的文档指出，该函数从未在`a == 65`的情况下被调用，因此任何`a == 65`的错误都不是真正的错误。 目标仍为以下智能合约[`example.sol`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example.sol)：

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

[运算符](https://github.com/trailofbits/manticore/blob/master/manticore/core/smtlib/operators.py)模块使约束操作变得简便，除此之外，它还提供了其他功能：

- Operators.AND，
- Operators.OR，
- Operators.UGT（无符号大小），
- Operators.UGE（无符号大于或等于），
- Operators.ULT（无符号小于），
- Operators.ULE（无符号小于或等于）。

请使用以下代码导入模块：

```python
from manticore.core.smtlib import Operators
```

`Operators.CONCAT`用于将一个数组与一个值级联。 例如，一个交易的 return_data 需要转变为一个值，以便与另一个值进行检查对比：

```python
last_return = operators.CONCAT(256,*last_return)
```

### 约束 {#state-constraint}

您可以在全局范围内或针对某个特定的状态使用约束。

#### 全局约束 {#state-constraint}

使用 `m.constrain(constraint)` 添加全局约束。 例如，您可以从一个符号地址调用合约，并将这个地址约束为特定的值：

```python
symbolic_address = m.make_symbolic_value()
m.constraint(Operators.OR(symbolic == 0x41, symbolic_address == 0x42))
m.transaction(caller=user_account,
              address=contract_account,
              data=m.make_symbolic_buffer(320),
              value=0)
```

#### 状态约束 {#state-constraint}

使用 [state.constrain(constraint)](https://manticore.readthedocs.io/en/latest/states.html?highlight=StateBase#manticore.core.state.StateBase.constrain) 为一个特定状态添加约束。 该约束可用来在探索状态后对其进行约束，以检查状态上的某些属性。

### 检查约束 {#checking-constraint}

使用`solver.check(state.constracts)`来了解约束是否仍然可行。 例如，以下代码将 symbolic_value 限定为不等于 65 ，并检查状态是否仍然可行。

```python
state.constrain(symbolic_var != 65)
if solver.check(state.constraints):
    # state is feasible
```

### 摘要：添加限制因素 {#summary-adding-constraints}

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

以上所有代码都可以在[`example_run.py`](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/manticore/examples/example_run.py)中找到。
