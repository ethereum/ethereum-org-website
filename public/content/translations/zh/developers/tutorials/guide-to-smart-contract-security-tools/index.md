---
title: 智能合约安全工具指南
description: 三种不同的测试和程序分析技术概述
author: "Trailofbits"
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "安全性"
skill: intermediate
published: 2020-09-07
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

我们将使用三种独特的测试和程序分析技术：

- **使用 [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 进行静态分析**。通过不同的程序演示（例如控制流程图），同时对程序的所有路径进行模拟和分析。
- **使用 [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) 进行模糊测试。** 代码是通过伪随机生成的交易来执行的， 模糊器将尝试找到一个违反某个给定的合约特性的交易序列。
- **使用 [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) 进行符号执行。** 一种正式的验证技术，它将每个路径转换为数学公式，在此基础上可对最重要的约束加以检查。

每种技术都有优缺点，在[特定情况](#determining-security-properties)下会很有用：

| 技术     | 工具      | 使用方法            | 速度 | 错误遗漏 | 误报 |
| -------- | --------- | ------------------- | ---- | -------- | ---- |
| 静态分析 | Slither   | CLI 和脚本          | 秒   | 中度     | 低   |
| 模糊测试 | Echidna   | Solidity 属性       | 分钟 | 低       | 无   |
| 符号执行 | Manticore | Solidity 属性和脚本 | 小时 | 无\*     | 无   |

\* 如果在没有超时情况下遍历所有路径

**Slither** 可以在几秒钟内分析合同，但是静态分析可能会导致误报，不太适合复杂的检查（例如算术检查）。 通过用于按钮访问内置检测器的 API 或用于用户自定义检查的 API 运行 Slither。

**Echidna** 需要运行几分钟，并且只会产生真阳性的测试结果。 Echidna 会检查用户提供的用 Solidity 编写的安全属性。 由于它的随机侦测的特性，它也许会错失一些漏洞。

**Manticore** 进行的是“最大权重”分析。 像 Echidna 一样，Manticore 会验证用户提供的特性。 它需要更多的时间来运行，但它可以证明某个特性的有效性，并且不会报告误报。

## 推荐工作流程 {#suggested-workflow}

从 Slither 的内置检测器开始，确保现在没有或以后不会引入简单的漏洞。 使用 Slither 检查与继承、变量依赖关系和结构问题相关的属性。 随着代码库的增大，可以使用 Echidna 来测试状态机更复杂的特性。 再次使用 Slither 开发专门用于那些 Solidity 不提供保护的自定义检查，比如防止某个函数被覆盖。 最后，使用 Manticore 对关键安全属性进行有针对性的验证，例如算术运算。

- 使用 Slither 的 CLI 来捕捉常见问题
- 使用 Echidna 测试合约的高级安全属性
- 使用 Slither 编写自定义静态检查
- 如果需要深入保证关键安全属性，请使用 Manticore

**关于单元测试的说明**。 单元测试是构建高质量软件的必要条件。 然而，要找出安全漏洞，这些技术并不是最合适的。 它们通常用来测试正向代码行为（例如：代码在正常情况下按预期工作）， 但安全漏洞往往存在于开发者未考虑的边缘情况。 在我们进行的数十次智能合约安全测试研究中，[单元测试覆盖率对于我们在客户端的代码中发现的安全漏洞的数量或者严重程度没有影响](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 确定安全属性 {#determining-security-properties}

为了有效测试和验证代码，您必须确定需要注意的地方。 因为花费在安全上的资源是有限的，只有划分出代码库中的薄弱和高价值部分，才能优化您的工作。 威胁建模可以提供帮助。 供考虑的审核方法有：

- [快速风险评估](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（时间紧迫时我们的首选方法）
- [数据中心系统威胁建模指南](https://csrc.nist.gov/publications/detail/sp/800-154/draft) (aka NIST 800-154)
- [Shostack 线程建模](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [使用断言](https://blog.regehr.org/archives/1091)

### 组件 {#components}

了解要检查的内容也有助于选择正确的工具。

通常与智能合约相关的领域比较广泛，包括：

- **状态机**。大多数合约都可以表示为状态机。 考虑检查以下几点：(1) 不能到达无效状态，(2) 如果状态有效则可以到达，以及 (3) 没有状态会限制合约。

  - Echidna 和 Manticore 是测试状态机规范的首选工具。

- **访问控制。**如果您的系统有特权用户（例如所有者、监管者等），您必须确保 (1) 每个用户只能执行授权操作，并且 (2) 没有用户可以阻止权限更大的用户的操作。

  - Slither、Echidna 和 Manticore 都可以检查访问控制正确与否。 例如，Slither 可以检查是否只有白名单上的函数缺少 onlyOwner 修饰符。 Echidna 和 Manticore 可用于更复杂的访问控制，例如仅当合约达到给定状态时才授予权限。

- **算术运算**。检查算术运算的可靠性至关重要。 在所有地方使用 `SafeMath` 是防止上溢/下溢很好的做法，但您还必需考虑其他算术缺陷，包括四舍五入和限制合约的缺陷。

  - 在这里，Manticore 是最佳选择。 如果算术超出 SMT 求解器的范围，则可以使用 Echidna。

- **继承的正确性**。Solidity 合约在很大程度上依赖于多重继承。 因此，很容易出现一些诸如像缺少`超级`调用的遮蔽函数和曲解了 C3 线性化的顺序之类的错误。

  - Slither 是确保检测出这些问题的工具。

- **外部交互**。这里指合约之间的互动，一些外部合约不应该被信任。 例如，如果您的合约依赖于外部预言机，那么如果现有预言机有一半被泄漏，它是否仍然是安全的？

  - Manticore 和 Echidna 是测试您的合约外部互动的最佳选择。 Manticore 有一个内置机制来存留外部合约。

- **标准一致性**。 以太坊标准（例如 ERC20）记录了他们在设计上的缺陷。 请注意您正在构建的标准的局限性。
  - Slither、Echidna 和 Manticore 可以帮助您发现偏离特定标准的情况。

### 工具选择备忘清单 {#tool-selection-cheatsheet}

| 组件         | 工具                        | 示例                                                                                                                                                                                                                                                   |
| ------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 状态机       | Echidna、Manticore          |                                                                                                                                                                                                                                                        |
| 访问控制     | Slither、Echidna、Manticore | [Slither 练习 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise2.md)、[Echidna 练习 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-2.md)      |
| 算术运算     | Manticore、Echidna          | [Echidna 练习 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/Exercise-1.md)、[Manticore 练习 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| 继承的正确性 | Slither                     | [Slither 练习 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/slither/exercise1.md)                                                                                                                                |
| 外部交互     | Manticore、Echidna          |                                                                                                                                                                                                                                                        |
| 标准一致性   | Slither、Echidna、Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                |

其他领域需要根据您的目标进行检查， 但以上囊括的大致重点领域对于所有智能合约系统来说都是一个良好的开端。

我们公开的审计包含了经过验证或测试的属性实例。 请考虑阅读以下报告的`自动测试和验证部分`，以查看实际安全属性：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [平衡器](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
