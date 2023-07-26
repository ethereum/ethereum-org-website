---
title: 如何使用Slither发现智能合约漏洞
description: 如何使用Slither自动发现智能合约中的漏洞
author: Trailofbits
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "安全性"
  - "测试"
  - "静态分析"
skill: intermediate
published: 2020-06-09
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither
---

## 如何使用 Slither {#how-to-use-slither}

本教程的目的是演示如何使用 Slither 自动查找智能合约中的漏洞。

- [安装](#installation)
- [命令行使用方法](#command-line)
- [静态分析简介](#static-analysis)：静态分析简介
- [API](#api-basics)：Python API 说明

## 安装 {#installation}

Slither 需要 Python3.6 及以上版本。 它可以通过 pip 安装或使用 docker。

通过 pip 安装 Slither：

```bash
pip3 install --user slither-analyzer
```

通过 docker 安装 Slither：

```bash
docker pull trailofbits/eth-securitytoolbox
docker run-it -v "$PWD":/home/trufflecon trailofbits/eth-securitytoolbox
```

_上文中最后一个命令在 docker 中运行 eth-security-toolbox 命令。该 eth-security-toolbox 命令需要能访问您的当前目录。 您可以从自己的主机更改文件，并在 docker 中运行针对文件这些工具。_

在 docker 中，运行如下命令：

```bash
sol-select 0.5.11
cd /home/trufflecon/
```

### 运行脚本 {#running-a-script}

使用 python 3 运行如下 python 脚本：

```bash
python3 script.py
```

### 命令行 {#command-line}

**命令行与用户定义的脚本。**Slither 带有一组预定义的探测器，可以找到许多常见的漏洞。 从命令行调用 Slither 将运行所有的检测器，不需要使用者具有详细的静态分析知识。

```bash
slither project_paths
```

除了检测器之外，Slither 还通过其[打印机](https://github.com/crytic/slither#printers)和[工具](https://github.com/crytic/slither#tools)提供代码审查功能。

使用 [crytic.io](https://github.com/crytic) 以获得对私有探测器和 GitHub 集成功能的访问权限。

## 静态分析 {#static-analysis}

Slither 静态分析框架的功能和设计已在博客文章（[1](https://blog.trailofbits.com/2018/10/19/slither-a-solidity-static-analysis-framework/)，[2](https://blog.trailofbits.com/2019/05/27/slither-the-leading-static-analyzer-for-smart-contracts/)）和一篇[学术论文](https://github.com/trailofbits/publications/blob/master/papers/wetseb19.pdf)中进行了描述。

静态分析有不同的风格。 您很可能意识到，像[clang](https://clang-analyzer.llvm.org/)和[gcc](https://lwn.net/Articles/806099/)这样的编译器依赖于上述这些研究技术，但它也是（[Infer](https://fbinfer.com/)、[CodeClimate](https://codeclimate.com/)、[FindBugs](http://findbugs.sourceforge.net/)和基于形式化方法的一些工具，比如[Frama-C](https://frama-c.com/)和[Polyspace](https://www.mathworks.com/products/polyspace.html)。

我们不会在这里详尽地回顾静态分析技术和研究人员。 相反，我们将专注于了解 Slither 是如何工作的，以便您能更有效地利用它来发现漏洞和理解代码。

- [代码表示](#code-representation)
- [代码分析](#analysis)
- [代码的中间表示](#intermediate-representation)

### 代码表示 {#code-representation}

与对单一的执行路径进行推理的动态分析相比，静态分析会对所有的执行路径进行一次性的推理。 为此，它依赖于一个不同的代码表示方式。 最常见的两个是抽象语法树(AST)和控制流图(CFG)。

### 抽象语法树(AST) {#abstract-syntax-trees-ast}

每次编译器解析代码时都会用到 AST 技术。 它可能是进行静态分析的最基本结构。

简而言之，AST 是一棵结构化的树，通常每片叶子包含一个变量或一个常量，而树的内部节点是操作符或控制流操作。 考虑以下代码：

```solidity
function safeAdd(uint a, uint b) pure internal returns(uint){
    if(a + b <= a){
        revert();
    }
    return a + b;
}
```

相应的 AST 如图所示：

![抽象语法树（AST）](./ast.png)

Slither 使用由 solc 工具导出的 AST。

虽然构建简单，但 AST 是一个嵌套结构。 有时，这并不是最直观的代码分析方法。 例如，为了确定表达式`a + b <= a`所使用的运算，您必须首先分析`<=`，然后分析`+`。 一个常见的方法是使用所谓的访问者模式，它以递归方式在树上进行遍历。 Slither 在[`ExpressionVisitor`](https://github.com/crytic/slither/blob/master/slither/visitors/expression/expression.py)中包含一个通用的访问者程序。

下面的代码使用`ExpressionVisitor`来检测一个表达式是否包含加法。

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

### 控制流图（CFG） {#control-flow-graph-cfg}

第二种最常见的代码表示是控制流图（CFG）。 顾名思义，它是一种基于图的表示方法，展现了所有的代码执行路径。 每个节点包含一条或多条指令。 图中的边代表控制流操作（if/then/else，循环，等等）。 我们上一个例子的 CFG 是：

![控制流图（CFG）](./cfg.png)

大多数的代码分析技术都是建立在 CFG 的基础表示之上。

也存在许多其他的代码表示方法。 根据您想进行的代码分析的不同场景，每种代码表示方法都有其优点和缺点。

### 分析 {#analysis}

您可以在 Slither 工具中进行的最简单类型的分析是语法分析。

### 语法分析 {#syntax-analysis}

Slither 可以浏览代码的不同组成部分及其表示方法，使用类似模式匹配的方法找到代码内部不一致的地方和代码缺陷。

例如，以下检测器可以寻找与语法有关的问题。

- [状态变量映射](https://github.com/crytic/slither/wiki/Detector-Documentation#state-variable-shadowing)：遍历所有的状态变量，并检查是否有任何变量映射来自于继承的合约（[state.py#L51-L62](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/shadowing/state.py#L51-L62)）的变量。

- [不正确的 ERC20 接口](https://github.com/crytic/slither/wiki/Detector-Documentation#incorrect-erc20-interface)：寻找不正确的 ERC20 函数签名（[incorrect_erc20_interface.py#L34-L55](https://github.com/crytic/slither/blob/0441338e055ab7151b30ca69258561a5a793f8ba/slither/detectors/erc/incorrect_erc20_interface.py#L34-L55)）。

### 语义分析 {#semantic-analysis}

与语法分析相比，语义分析将更深入地分析代码的 "含义"。 这个系列包括一些宽泛的分析类型。 这些分析会产生更强大和有用的分析结果，但编写起来也更复杂。

语义分析常常被用于最先进的代码漏洞检测。

#### 数据依赖性分析 {#fixed-point-computation}

如果变量`variable_a`的值受到变量`variable_b`的影响，那么就说变量`variable_a`是数据依赖于变量`variable_b`的。

在下面的代码中，变量`variable_a`是依赖于变量`variable_b`的。

```solidity
// ...
variable_a = variable_b + 1;
```

Slither 内置了[数据依赖](https://github.com/crytic/slither/wiki/data-dependency)分析功能，这要归功于它的中间表示法（在后面的部分讨论）。

在[严格平等危险的检测器](https://github.com/crytic/slither/wiki/Detector-Documentation#dangerous-strict-equalities)中可以找到一个数据依赖的使用例子。 这里 Slither 将对危险值进行严格平等比较([incorrect_strict_equality.py#L86-L87](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L86-L87))，同时，将通知用户应该使用`>=`或`<=`（而不是 `==`）去阻止攻击者使合约进入代码陷阱。 另外，这个检测器会认为`balanceOf(address)` 的调用结果值是一个潜在的危险([incorrect_strict_equality.py#L63-L64](https://github.com/crytic/slither/blob/6d86220a53603476f9567c3358524ea4db07fb25/slither/detectors/statements/incorrect_strict_equality.py#L63-L64))，同时，会使用数据依赖引擎来跟踪其使用情况。

#### 定点计算 {#fixed-point-computation}

如果您的分析在 CFG 的节点中遍历并沿着 CFG 的边进行，您可能会看到一些已经访问过的节点。 例如，出现如下所示的循环代码：

```solidity
for(uint i; i < range; ++){
    variable_a += 1
}
```

您的分析将需要知道何时停止。 这里有两种主要策略：1）在每个节点上迭代有限次数，2）通过计算所谓的*定点*。 一个定点基本上意味着分析此节点不会提供任何有意义的信息。

在代码可重入检测器中可以找到使用的定点的示例：Slither 探索这些节点，寻找外部调用、写入和读取存储。 一旦到达某个定点 ([reentrancy.py#L125-L131](https://github.com/crytic/slither/blob/master/slither/detectors/reentrancy/reentrancy.py#L125-L131))，分析器就会停止代码遍历，并通过不同的重入模式来分析结果，了解是否存在代码重入现象。（[reentrancy_benign.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_benign.py)、[reentrancy_read_before_write.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_read_before_write.py)、[reentrancy_eth.py](https://github.com/crytic/slither/blob/b275bcc824b1b932310cf03b6bfb1a1fef0ebae1/slither/detectors/reentrancy/reentrancy_eth.py)）。

使用高效的定点计算方法编写分析，需要很好地理解分析是如何传播其信息的。

### 代码的中间表示 {#intermediate-representation}

中间表示(IR)是一种比原始语言更适合进行静态分析的语言。 Slither 将 Solidity 转换为它自己的 IR：[SlithIR](https://github.com/crytic/slither/wiki/SlithIR)。

如果您只是想编写基本的代码检查，那么理解 SlithIR 不是必须的。 但是，如果您打算编写更高级的语义分析，对 SlithIR 的理解将派上用场。 [SlithIR](https://github.com/crytic/slither/wiki/Printer-documentation#slithir)和[SSA](https://github.com/crytic/slither/wiki/Printer-documentation#slithir-ssa)打印器工具将帮助您理解代码是如何被翻译的。

## API 基础知识 {#api-basics}

Slither 有一套 API，可让您探索合约的基本属性及其功能。

加载代码库：

```python
from slither import Slither
slither = Slither('/path/to/project')

```

### 探索合约和相关的函数 {#exploring-contracts-and-functions}

一个`Slither`对象具有：

- `contracts (list(Contract)`：合约列表
- `contracts_derived (list(Contract)`：未被其他合约继承的合约列表（合约的子集）
- `get_contract_from_name (str)`：从合约名称返回一个合约实例

一个`Contract`对象具有：

- `name (str)`：合约名称
- `functions (list(Function))`：函数列表
- `modifiers (list(Modifier))`：函数列表
- `all_functions_called (list(Function/Modifier))`：合约可访问的所有内部函数列表
- `inheritance (list(Contract))`：继承的合约的列表
- `get_function_from_signature (str)`：通过函数签名返回一个函数
- `get_modifier_from_signature (str)`：从函数签名返回一个修饰符
- `get_state_variable_from_name (str)`：从其名称返回一个状态变量

一个`Function`或`Modifier`对象具有：

- `name (str)`：函数的名称
- `contract (contract)`：声明该函数的合约
- `nodes (list(Node))`：组成该函数/修饰符的 CFG 的节点列表
- `entry_point (Node)`：CFG 的入口点
- `variables_read (list(Variable))`：所读取变量的列表
- `variables_written (list(Variable))`：所写入变量的列表
- `state_variables_read (list(StateVariable))`：所读取状态变量的列表（所读取变量的子集）
- `state_variables_written (list(StateVariable))`：所写入状态变量的列表(所写入变量的子集)
