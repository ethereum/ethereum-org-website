---
title: "如何使用斯莱瑟寻找智能合约漏洞"
description: "如何使用斯莱瑟自动寻找智能合约中的漏洞"
author: Trailofbits
lang: zh
tags: ["Solidity", "智能合约", "安全", "测试"]
skill: advanced
breadcrumb: "斯莱瑟"
published: 2020-06-09
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## 如何使用斯莱瑟 {#how-to-use-slither}

本教程旨在展示如何使用斯莱瑟自动寻找智能合约中的漏洞。

- [安装](#installation)
- [命令行用法](#command-line)
- [静态分析简介](#static-analysis)：静态分析的简要介绍
- [API](#api-basics)：Python API 说明

## 安装 {#installation}

斯莱瑟需要 Python >= 3.6。可以通过 pip 或使用 Docker 进行安装。

通过 pip 安装斯莱瑟：

```bash
pip3 install --user slither-analyzer
```

通过 Docker 安装斯莱瑟：

```bash
docker pull trailofbits/eth-security-toolbox
docker run -it -v "$PWD":/home/trufflecon trailofbits/eth-security-toolbox
```

_最后一条命令在可以访问你当前目录的 Docker 中运行 eth-security-toolbox。你可以更改主机上的文件，并在 Docker 中对这些文件运行工具_

在 Docker 内部，运行：

```bash
solc-select 0.5.11
cd /home/trufflecon/
```

### 运行脚本 {#running-a-script}

要使用 Python 3 运行 Python 脚本：

```bash
python3 script.py
```

### 命令行 {#command-line}

**命令行与用户定义脚本的对比。** 斯莱瑟附带了一组预定义的检测器，可以发现许多常见的漏洞。从命令行调用斯莱瑟将运行所有检测器，无需具备静态分析的详细知识：

```bash
slither project_paths
```

除了检测器之外，斯莱瑟还通过其[打印机 (printers)](https://github.com/crytic/slither#printers)和[工具](https://github.com/crytic/slither#tools)提供代码审查功能。

使用 [crytic.io](https://github.com/crytic) 获取私有检测器和 GitHub 集成。

## 静态分析 {#static-analysis}

斯莱瑟静态分析框架的功能和设计已在博客文章（[1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)、[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)）和一篇[学术论文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)中进行了描述。

静态分析有不同的类型。你很可能知道像 [clang](https://clang-analyzer.llvm.org/) 和 [gcc](https://lwn.net/Articles/806099/) 这样的编译器依赖于这些研究技术，但它也是（[Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](https://findbugs.sourceforge.net/) 以及基于形式化方法的工具如 [Frama-C](https://frama-c.com/) 和 [Polyspace](https://www.mathworks.com/products/polyspace.html) 的基础。

我们不会在这里详尽地回顾静态分析技术和研究。相反，我们将重点关注理解斯莱瑟工作原理所需的内容，以便你能更有效地使用它来寻找漏洞和理解代码。

- [代码表示](#code-representation)
- [代码分析](#analysis)
- [中间表示](#intermediate-representation)

### 代码表示 {#code-representation}

与推理单一执行路径的动态分析相反，静态分析会同时推理所有路径。为此，它依赖于不同的代码表示。最常见的两种是抽象语法树 (AST) 和控制流图 (CFG)。

### 抽象语法树 (AST) {#abstract-syntax-trees-ast}

每次编译器解析代码时都会使用 AST。它可能是执行静态分析最基础的结构。

简而言之，AST 是一棵结构化树，通常每个叶节点包含一个变量或常量，而内部节点是操作数或控制流操作。考虑以下代码：

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

斯莱瑟使用 solc 导出的 AST。

虽然构建简单，但 AST 是一种嵌套结构。有时，这并不是最直接的分析方式。例如，要识别表达式 `a + b <= a` 使用的操作，你必须首先分析 `<=`，然后分析 `+`。一种常见的方法是使用所谓的访问者模式 (visitor pattern)，它递归地遍历树。斯莱瑟在 [`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py) 中包含一个通用的访问者。

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

visitor = HasAddition(expression) # expression 是待测试的表达式
print(f'The expression {expression} has a addition: {visitor.result()}')
```

### 控制流图 (CFG) {#control-flow-graph-cfg}

第二种最常见的代码表示是控制流图 (CFG)。顾名思义，它是一种基于图的表示，暴露了所有的执行路径。每个节点包含一个或多个指令。图中的边代表控制流操作（if/then/else、循环等）。我们前面示例的 CFG 如下：

![CFG](./cfg.png)

CFG 是大多数分析构建其上的表示形式。

还存在许多其他代码表示形式。根据你想要执行的分析，每种表示形式都有其优缺点。

### 分析 {#analysis}

你可以使用斯莱瑟执行的最简单的分析类型是语法分析。

### 语法分析 {#syntax-analysis}

斯莱瑟可以遍历代码的不同组件及其表示，使用类似模式匹配的方法来发现不一致和缺陷。

例如，以下检测器寻找与语法相关的问题：

- [状态变量遮蔽 (State variable shadowing)](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：遍历所有状态变量，并检查是否有任何变量遮蔽了继承合约中的变量（[state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62)）

- [不正确的 ERC-20 接口](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：寻找不正确的 ERC-20 函数签名（[incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55)）

### 语义分析 {#semantic-analysis}

与语法分析相反，语义分析会更深入地分析代码的“含义”。这个系列包括一些广泛的分析类型。它们能产生更强大和有用的结果，但编写起来也更复杂。

语义分析用于最先进的漏洞检测。

#### 数据依赖分析 {#fixed-point-computation}

如果存在一条路径，使得 `variable_a` 的值受到 `variable_b` 的影响，则称变量 `variable_a` 数据依赖于 `variable_b`。

在以下代码中，`variable_a` 依赖于 `variable_b`：

```solidity
// ...
variable_a = variable_b + 1;
```

得益于其中间表示（在后面的部分讨论），斯莱瑟内置了[数据依赖](https://github.com/crytic/slither/wiki/data-dependency)功能。

数据依赖用法的一个示例可以在[危险的严格相等检测器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)中找到。在这里，斯莱瑟将寻找与危险值的严格相等比较（[incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87)），并通知用户应该使用 `>=` 或 `<=` 而不是 `==`，以防止攻击者困住合约。除此之外，该检测器会将调用 `balanceOf(address)` 的返回值视为危险（[incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64)），并使用数据依赖引擎来跟踪其使用情况。

#### 不动点计算 {#fixed-point-computation-2}

如果你的分析遍历 CFG 并沿着边前进，你很可能会看到已经访问过的节点。例如，如果出现如下所示的循环：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

你的分析需要知道何时停止。这里有两种主要策略：（1）对每个节点迭代有限次数，（2）计算所谓的_不动点 (fixpoint)_。不动点基本上意味着分析该节点不再提供任何有意义的信息。

使用不动点的一个示例可以在重入检测器中找到：斯莱瑟探索节点，并寻找外部调用、对存储的写入和读取。一旦达到不动点（[reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131)），它就会停止探索，并通过不同的重入模式（[reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)）分析结果以查看是否存在重入。

使用高效的不动点计算编写分析需要充分理解分析是如何传播其信息的。

### 中间表示 {#intermediate-representation}

中间表示 (IR) 是一种旨在比原始语言更适合静态分析的语言。斯莱瑟将 Solidity 转换为其自己的 IR：[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)。

如果你只想编写基本检查，则无需理解 SlithIR。但是，如果你计划编写高级语义分析，它将派上用场。[SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir) 和 [SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa) 打印机将帮助你理解代码是如何转换的。

## API 基础 {#api-basics}

斯莱瑟有一个 API，可让你探索合约及其函数的基本属性。

要加载代码库：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 探索合约和函数 {#exploring-contracts-and-functions}

`Slither` 对象具有：

- `contracts (list(Contract)`：合约列表
- `contracts_derived (list(Contract)`：未被其他合约继承的合约列表（合约的子集）
- `get_contract_from_name (str)`：根据名称返回合约

`Contract` 对象具有：

- `name (str)`：合约名称
- `functions (list(Function))`：函数列表
- `modifiers (list(Modifier))`：函数列表
- `all_functions_called (list(Function/Modifier))`：合约可访问的所有内部函数列表
- `inheritance (list(Contract))`：继承的合约列表
- `get_function_from_signature (str)`：根据签名返回函数
- `get_modifier_from_signature (str)`：根据签名返回修饰符
- `get_state_variable_from_name (str)`：根据名称返回状态变量

`Function` 或 `Modifier` 对象具有：

- `name (str)`：函数名称
- `contract (contract)`：声明该函数的合约
- `nodes (list(Node))`：构成函数/修饰符 CFG 的节点列表
- `entry_point (Node)`：CFG 的入口点
- `variables_read (list(Variable))`：读取的变量列表
- `variables_written (list(Variable))`：写入的变量列表
- `state_variables_read (list(StateVariable))`：读取的状态变量列表（读取变量的子集）
- `state_variables_written (list(StateVariable))`：写入的状态变量列表（写入变量的子集）
