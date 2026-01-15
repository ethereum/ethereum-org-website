---
title: 智能合约安全工具指南
description: 三种不同的测试和程序分析技术概述
author: "Trailofbits"
lang: zh
tags: [ "Solidity", "智能合同", "安全性。" ]
skill: intermediate
published: 2020-09-07
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

我们将使用三种独特的测试和程序分析技术：

- **通过 [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 进行静态分析。** 通过不同的程序表示形式（例如控制流图），同时对程序的所有路径进行近似和分析。
- **使用 [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) 进行模糊测试。** 通过伪随机生成的交易来执行代码。 模糊器将尝试找到一个违反某个给定属性的交易序列。
- **使用 [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) 进行符号执行。** 这是一种形式化验证技术，可将每个执行路径转换为数学公式，在此基础上可检查约束条件。

每种技术都有其优缺点，并且在[特定案例](#determining-security-properties)中会很有用：

| 技术   | 工具        | 用法             | 速度 | 遗漏的漏洞 | 误报 |
| ---- | --------- | -------------- | -- | ----- | -- |
| 静态分析 | Slither   | CLI 和脚本        | 秒  | 中等    | 低  |
| 模糊测试 | Echidna   | Solidity 属性    | 分钟 | 低     | 无  |
| 符号执行 | Manticore | Solidity 属性和脚本 | 小时 | 无\*   | 无  |

\* 如果在没有超时的情况下探索了所有路径

**Slither** 可在数秒内分析合约，但是，静态分析可能会导致误报，并且不太适合复杂的检查（例如，算术检查）。 通过 API 运行 Slither，以便捷地访问内置探测器或进行用户自定义的检查。

**Echidna** 需要运行数分钟，且只会产生真阳性结果。 Echidna 会检查用户提供的、用 Solidity 编写的安全属性。 由于它基于随机探索，因此可能会遗漏某些漏洞。

**Manticore** 执行“最重量级”的分析。 与 Echidna 一样，Manticore 也可验证用户提供的属性。 它需要更长的运行时间，但能够证明属性的有效性，并且不会产生误报。

## 建议的工作流程 {#suggested-workflow}

从 Slither 的内置检测器入手，确保当前不存在或将来不会引入简单的漏洞。 使用 Slither 检查与继承、变量依赖和结构问题相关的属性。 随着代码库的增长，可使用 Echidna 测试状态机更复杂的属性。 再次使用 Slither，为 Solidity 未提供的保护（例如，防止函数被覆写）开发自定义检查。 最后，使用 Manticore 对关键安全属性（例如算术运算）执行针对性验证。

- 使用 Slither 的 CLI 捕获常见问题
- 使用 Echidna 测试合约的高级安全属性
- 使用 Slither 编写自定义静态检查
- 如果你希望深入确保关键安全属性，请使用 Manticore

**关于单元测试的说明**。 单元测试是构建高质量软件所必需的。 然而，这些技术并非是发现安全漏洞的最佳方法。 它们通常用于测试代码的积极行为（即，代码在正常情况下按预期工作），而安全漏洞往往存在于开发者没有考虑到的边缘情况。 在我们对数十个智能合约安全审计的研究中，我们发现[单元测试覆盖率对我们在客户代码中发现的安全漏洞的数量或严重性没有影响](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 确定安全属性 {#determining-security-properties}

为有效测试和验证你的代码，你必须确定需要关注的领域。 由于你在安全方面的资源有限，因此确定代码库中薄弱或高价值的部分对于优化你的工作至关重要。 威胁建模可以提供帮助。 请考虑审查：

- [快速风险评估](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（时间紧迫时我们的首选方法）
- [以数据为中心的系统威胁建模指南](https://csrc.nist.gov/pubs/sp/800/154/ipd) (又名 NIST 800-154)
- [Shostack 威胁建模](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [断言的使用](https://blog.regehr.org/archives/1091)

### 组件 {#components}

了解你想要检查的内容也有助于你选择正确的工具。

与智能合约经常相关的广泛领域包括：

- **状态机。** 大多数合约都可以表示为状态机。 考虑检查：(1) 无法达到无效状态；(2) 如果一个状态有效，则该状态可以达到；(3) 没有状态会使合约陷入陷阱。

  - Echidna 和 Manticore 是测试状态机规范的首选工具。

- **访问控制。** 如果你的系统有特权用户（例如所有者、控制者……） 你必须确保 (1) 每个用户只能执行授权的操作，以及 (2) 没有用户可以阻止更具特权的用户执行操作。

  - Slither、Echidna 和 Manticore 都可以检查访问控制的正确性。 例如，Slither 可以检查是否只有列入白名单的函数缺少 `onlyOwner` 修饰符。 Echidna 和 Manticore 对于更复杂的访问控制很有用，例如仅在合约达到特定状态时才授予权限。

- **算术运算。** 检查算术运算的可靠性至关重要。 处处使用 `SafeMath` 是防止溢出/下溢的好方法，但你仍必须考虑其他算术缺陷，包括舍入问题和使合约陷入陷阱的缺陷。

  - Manticore 是此处的最佳选择。 如果算术运算超出了 SMT 求解器的范围，则可以使用 Echidna。

- **继承的正确性。** Solidity 合约严重依赖多重继承。 诸如遮蔽函数缺少 `super` 调用以及对 c3 线性化顺序的误解等错误都很容易出现。

  - Slither 是确保检测这些问题的工具。

- **外部交互。** 合约之间会相互交互，某些外部合约不应被信任。 例如，如果你的合约依赖外部预言机，当一半可用预言机被攻破时，它是否仍然安全？

  - Manticore 和 Echidna 是测试你的合约与外部交互的最佳选择。 Manticore 有一个内置机制，可以为外部合约创建存根。

- **标准一致性。** 以太坊标准（例如 ERC20）的设计曾出现过缺陷。 请注意你所依据的标准的局限性。
  - Slither、Echidna 和 Manticore 将帮助你检测与特定标准的偏差。

### 工具选择备忘清单 {#tool-selection-cheatsheet}

| 组件     | 工具                        | 示例                                                                                                                                                                                                                                                               |
| ------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 状态机    | Echidna、Manticore         |                                                                                                                                                                                                                                                                  |
| 访问控制   | Slither、Echidna、Manticore | [Slither 练习 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md)、[Echidna 练习 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 算术运算   | Manticore、Echidna         | [Echidna 练习 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md)、[Manticore 练习 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)      |
| 继承的正确性 | Slither                   | [Slither 练习 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                  |
| 外部交互   | Manticore、Echidna         |                                                                                                                                                                                                                                                                  |
| 标准一致性  | Slither、Echidna、Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                          |

根据你的目标，可能还需要检查其他领域，但这些粗粒度的重点领域对于任何智能合约系统来说都是一个很好的起点。

我们的公开审计报告包含经过验证或测试的属性示例。 请考虑阅读以下报告的“自动化测试和验证”部分，以审查真实世界的安全属性：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
