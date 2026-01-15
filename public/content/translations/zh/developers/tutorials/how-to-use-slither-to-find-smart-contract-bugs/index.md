---
title: 如何使用 Slither 查找智能合约漏洞
description: 如何使用 Slither 自动发现智能合约中的漏洞
author: Trailofbits
lang: zh
tags: [ "Solidity", "智能合同", "安全性。", "测试" ]
skill: advanced
published: 2020-06-09
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## 如何使用 Slither {#how-to-use-slither}

本教程的目的是演示如何使用 Slither 自动查找智能合约中的漏洞。

- [安装](#installation)
- [命令行用法](#command-line)
- [静态分析简介](#static-analysis)：静态分析简介
- [API](#api-basics)：Python API 说明

## 安装 {#installation}

Slither 需要 Python >= 3.6。 它可以通过 pip 或使用 docker 来安装。

通过 pip 安装 Slither：

```bash
pip3 install --user slither-analyzer
```

通过 docker 安装 Slither：

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最后一个命令在一个可访问你当前目录的 docker 中运行 eth-security-toolbox。 你可以从主机更改文件，并在 docker 中对文件运行工具_

在 docker 中，运行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 运行脚本 {#running-a-script}

使用 python 3 运行 python 脚本：

```bash
python3 script.py
```

### 命令行 {#command-line}

**命令行与用户定义的脚本。** Slither 带有一组预定义的探测器，可以找到许多常见的漏洞。 从命令行调用 Slither 将运行所有的检测器，不需要使用者具有详细的静态分析知识：

```bash
slither project_paths
```

除了探测器，Slither 还通过其[打印器](https://github.com/crytic/slither#printers)和[工具](https://github.com/crytic/slither#tools)提供代码审查功能。

使用 [crytic.io](https://github.com/crytic) 以获得对私有探测器和 GitHub 集成功能的访问权限。

## 静态分析 {#static-analysis}

Slither 静态分析框架的功能和设计已在博客文章（[1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)）和一篇[学术论文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)中进行了描述。

静态分析有多种形式。 您很可能意识到，像 [clang](https://clang-analyzer.llvm.org/) 和 [gcc](https://lwn.net/Articles/806099/) 这样的编译器依赖于这些研究技术，但它也是（[Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](http://findbugs.sourceforge.net/)）以及像 [Frama-C](https://frama-c.com/) 和 [Polyspace](https://www.mathworks.com/products/polyspace.html) 这类基于形式化方法的工具的基础。

我们不会在这里详尽地回顾静态分析技术和研究人员。 相反，我们将专注于了解 Slither 是如何工作的，以便你能更有效地利用它来发现漏洞和理解代码。

- [代码表示](#code-representation)
- [代码分析](#analysis)
- [中间表示](#intermediate-representation)

### 代码表示 {#code-representation}

与对单一执行路径进行推理的动态分析相反，静态分析会同时对所有路径进行推理。 为此，它依赖于不同的代码表示。 最常见的两种是抽象语法树 (AST) 和控制流图 (CFG)。

### 抽象语法树 (AST) {#abstract-syntax-trees-ast}

每当编译器解析代码时，都会使用 AST。 它可能是可以执行静态分析的最基本结构。

简而言之，AST 是一棵结构化树，通常每个叶子节点包含一个变量或一个常量，而内部节点是操作数或控制流操作。 请看以下代码：

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

相应的 AST 如下所示：

![AST](./ast.png)

Slither 使用由 solc 导出的 AST。

虽然构建简单，但 AST 是一个嵌套结构。 有时，这并不是最直接的分析方法。 例如，要识别表达式 `a + b <= a` 使用的操作，您必须先分析 `<=`，然后再分析 `+`。 一种常见的方法是使用所谓的访问者模式，该模式以递归方式遍历树。 Slither 在 [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) 中包含一个通用访问器。

以下代码使用 `ExpressionVisitor` 来检测表达式是否包含加法：

```python
from slither.visitors.expression.expression import ExpressionVisitor
from slither.core.expressions.binary_operation import BinaryOperationType

class HasAddition(ExpressionVisitor):

    def result(self):
        return self._result

    def _post_binary_operation(self, expression):
        if expression.type == BinaryOperationType.ADDITION:
            self._result = True

visitor = HasAddition(expression) # expression 是要测试的表达式
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 控制流图 (CFG) {#control-flow-graph-cfg}

第二种最常见的代码表示是控制流图 (CFG)。 顾名思义，它是一种基于图的表示方法，可以揭示所有执行路径。 每个节点包含一条或多条指令。 图中的边代表控制流操作（if/then/else、循环等）。 我们上一个例子的 CFG 是：

![CFG](./cfg.png)

CFG 是大多数分析所基于的表示形式。

还存在许多其他的代码表示形式。 根据您要执行的分析，每种表示形式都有其优缺点。

### 分析 {#analysis}

您可以用 Slither 执行的最简单的分析类型是语法分析。

### 语法分析 {#syntax-analysis}

Slither 可以遍历代码的不同组件及其表示，使用类似模式匹配的方法来查找不一致和缺陷。

例如，以下检测器会查找与语法相关的问题：

- [状态变量遮蔽](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：迭代所有状态变量，并检查是否有变量遮蔽了继承合约中的变量 ([state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62))

- [不正确的 ERC20 接口](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：查找不正确的 ERC20 函数签名 ([incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55))

### 语义分析 {#semantic-analysis}

与语法分析相比，语义分析将更深入地分析代码的“含义”。 该系列包括一些宽泛的分析类型。 它们可以带来更强大、更有用的结果，但编写起来也更复杂。

语义分析用于最先进的漏洞检测。

#### 数据依赖性分析 {#fixed-point-computation}

如果存在一条路径，使得变量 `variable_a` 的值受 `variable_b` 影响，则称变量 `variable_a` 数据依赖于 `variable_b`。

在下面的代码中，`variable_a` 依赖于 `variable_b`：

```solidity
// ...
variable_a = variable_b + 1;
```

Slither 具有内置的[数据依赖性](https://github.com/crytic/slither/wiki/data-dependency)功能，这要归功于它的中间表示（将在后面的章节中讨论）。

数据依赖性用法的一个示例可以在[危险严格相等检测器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)中找到。 这里 Slither 将查找与危险值的严格相等比较 ([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))，并通知用户应使用 `>=` 或 `<=` 而不是 `==`，以防止攻击者给合约设下陷阱。 此外，检测器会将对 `balanceOf(address)` 的调用的返回值视为危险值 ([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))，并使用数据依赖性引擎跟踪其用法。

#### 不动点计算 {#fixed-point-computation}

如果您的分析遍历 CFG 并沿边进行，您可能会看到已经访问过的节点。 例如，如果循环如下所示：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

您的分析将需要知道何时停止。 这里有两种主要策略：(1) 在每个节点上迭代有限次数，(2) 计算所谓的_不动点_。 不动点基本上意味着分析此节点不会提供任何有意义的信息。

在可重入检测器中可以找到使用不动点的示例：Slither 探索节点，并查找外部调用、存储写入和读取。 一旦达到不动点 ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))，它就会停止探索，并通过不同的可重入模式（[reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)）分析结果，以查看是否存在可重入。

使用高效的不动点计算编写分析需要很好地理解分析如何传播其信息。

### 中间表示 {#intermediate-representation}

中间表示 (IR) 是一种比原始语言更适合静态分析的语言。 Slither 将 Solidity 转换为其自己的 IR：[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)。

如果您只想编写基本的检查，则无需了解 SlithIR。 但是，如果您计划编写高级语义分析，它会派上用场。 [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) 和 [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) 打印器将帮助您了解代码是如何被翻译的。

## API 基础 {#api-basics}

Slither 有一个 API，可让您探索合约及其函数的基本属性。

加载代码库：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 探索合约和函数 {#exploring-contracts-and-functions}

一个 `Slither` 对象具有：

- `contracts (list(Contract)`: 合约列表
- `contracts_derived (list(Contract)`: 不被其他合约继承的合约列表（合约的子集）
- `get_contract_from_name (str)`: 根据名称返回合约

一个 `Contract` 对象具有：

- `name (str)`: 合约名称
- `functions (list(Function))`: 函数列表
- `modifiers (list(Modifier))`: 修饰符列表
- `all_functions_called (list(Function/Modifier))`: 合约可达的所有内部函数列表
- `inheritance (list(Contract))`: 继承的合约列表
- `get_function_from_signature (str)`: 根据签名返回一个函数
- `get_modifier_from_signature (str)`: 根据签名返回一个修饰符
- `get_state_variable_from_name (str)`: 根据名称返回一个状态变量

一个 `Function` 或 `Modifier` 对象具有：

- `name (str)`: 函数名称
- `contract (contract)`: 声明该函数的合约
- `nodes (list(Node))`: 组成函数/修饰符的 CFG 的节点列表
- `entry_point (Node)`: CFG 的入口点
- `variables_read (list(Variable))`: 读取的变量列表
- `variables_written (list(Variable))`: 写入的变量列表
- `state_variables_read (list(StateVariable))`: 读取的状态变量列表（`variables_read` 的子集）
- `state_variables_written (list(StateVariable))`: 写入的状态变量列表（`variables_written` 的子集）
