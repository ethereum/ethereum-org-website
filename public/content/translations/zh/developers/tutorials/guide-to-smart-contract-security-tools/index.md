---
title: 智能合约安全工具指南
description: 三种不同测试与程序分析技术概述
author: "Trailofbits"
lang: zh
tags: ["solidity", "智能合约", "安全"]
skill: intermediate
breadcrumb: 安全工具
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

我们将使用三种截然不同的测试与程序分析技术：

- **使用 [斯莱瑟](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 进行静态分析。** 通过不同的程序表示形式（例如控制流图），同时对程序的所有路径进行近似处理和分析。
- **使用 [埃基德纳](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) 进行模糊测试。** 使用伪随机生成的交易来执行代码。模糊测试器将尝试寻找一系列交易来违反给定的属性。
- **使用 [曼蒂科尔](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/) 进行符号执行。** 一种形式化验证技术，它将每条执行路径转换为数学公式，并在此基础上检查约束条件。

每种技术都有其优点和缺陷，并在[特定情况](#determining-security-properties)下发挥作用：

| 技术 | 工具 | 用途 | 速度 | 遗漏的漏洞 | 误报 |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| 静态分析 | 斯莱瑟 | 命令行界面 (CLI) 与脚本 | 秒级 | 中等 | 低 |
| 模糊测试 | 埃基德纳 | Solidity 属性 | 分钟级 | 低 | 无 |
| 符号执行 | 曼蒂科尔 | Solidity 属性与脚本 | 小时级 | 无\* | 无 |

\* 如果在未超时的情况下探索了所有路径

**斯莱瑟**能在几秒钟内分析合约，然而，静态分析可能会导致误报，并且不太适合复杂的检查（例如算术检查）。通过 API 运行斯莱瑟，可以一键访问内置检测器，或者通过 API 进行用户自定义的检查。

**埃基德纳**需要运行几分钟，并且只会产生真正的阳性结果（无误报）。埃基德纳检查用户提供的、用 Solidity 编写的安全属性。由于它基于随机探索，因此可能会遗漏漏洞。

**曼蒂科尔**执行“最重量级”的分析。与埃基德纳一样，曼蒂科尔验证用户提供的属性。它需要更多时间来运行，但它可以证明属性的有效性，并且不会报告误报。

## 建议的工作流程 {#suggested-workflow}

从斯莱瑟的内置检测器开始，确保当前不存在或以后不会引入简单的漏洞。使用斯莱瑟检查与继承、变量依赖和结构问题相关的属性。随着代码库的增长，使用埃基德纳来测试状态机更复杂的属性。再次使用斯莱瑟来开发自定义检查，以实现 Solidity 无法提供的保护，例如防止函数被重写。最后，使用曼蒂科尔对关键安全属性（例如算术运算）执行有针对性的验证。

- 使用斯莱瑟的命令行界面 (CLI) 捕获常见问题
- 使用埃基德纳测试合约的高级安全属性
- 使用斯莱瑟编写自定义静态检查
- 当你需要对关键安全属性进行深入保证时，使用曼蒂科尔

**关于单元测试的注意事项**。单元测试对于构建高质量软件是必要的。然而，这些技术并不是发现安全漏洞的最佳选择。它们通常用于测试代码的预期行为（即代码在正常上下文中按预期工作），而安全漏洞往往存在于开发人员未考虑到的边缘情况中。在我们对数十个智能合约安全审查的研究中，[单元测试覆盖率对我们在客户代码中发现的安全漏洞的数量或严重程度没有影响](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/)。

## 确定安全属性 {#determining-security-properties}

为了有效地测试和验证你的代码，你必须确定需要关注的领域。由于你在安全上投入的资源是有限的，因此确定代码库中薄弱或高价值部分的范围对于优化你的工作非常重要。威胁建模可以提供帮助。考虑查阅：

- [快速风险评估](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)（时间紧迫时我们首选的方法）
- [以数据为中心的系统威胁建模指南](https://csrc.nist.gov/pubs/sp/800/154/ipd)（即 NIST 800-154）
- [Shostack 威胁建模](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [断言的使用](https://blog.regehr.org/archives/1091)

### 组件 {#components}

了解你想要检查的内容也将帮助你选择合适的工具。

经常与智能合约相关的广泛领域包括：

- **状态机。** 大多数合约都可以表示为状态机。考虑检查：(1) 无法达到无效状态；(2) 如果状态有效，则可以达到该状态；(3) 没有任何状态会使合约陷入困境。

  - 埃基德纳和曼蒂科尔是测试状态机规范的首选工具。

- **访问控制。** 如果你的系统有特权用户（例如所有者、控制者等），你必须确保：(1) 每个用户只能执行授权的操作；(2) 任何用户都不能阻止更高特权用户的操作。

  - 斯莱瑟、埃基德纳和曼蒂科尔可以检查访问控制是否正确。例如，斯莱瑟可以检查是否只有白名单函数缺少 onlyOwner 修饰符。埃基德纳和曼蒂科尔对于更复杂的访问控制很有用，例如仅当合约达到给定状态时才授予权限。

- **算术运算。** 检查算术运算的合理性至关重要。在各处使用 `SafeMath` 是防止溢出/下溢的好方法，但是，你仍然必须考虑其他算术缺陷，包括舍入问题和使合约陷入困境的缺陷。

  - 曼蒂科尔是这里的最佳选择。如果算术超出了 SMT 求解器的范围，则可以使用埃基德纳。

- **继承正确性。** Solidity 合约严重依赖多重继承。很容易引入诸如隐藏函数缺少 `super` 调用以及误解 C3 线性化顺序等错误。

  - 斯莱瑟是确保检测到这些问题的工具。

- **外部交互。** 合约相互交互，并且不应信任某些外部合约。例如，如果你的合约依赖于外部预言机，那么如果一半的可用预言机受到破坏，它还能保持安全吗？

  - 曼蒂科尔和埃基德纳是测试与你的合约进行外部交互的最佳选择。曼蒂科尔有一个内置机制来存根 (stub) 外部合约。

- **标准一致性。** 以太坊标准（例如 ERC-20）在设计上存在缺陷的历史。请注意你所构建的标准的局限性。
  - 斯莱瑟、埃基德纳和曼蒂科尔将帮助你检测偏离给定标准的情况。

### 工具选择备忘单 {#tool-selection-cheatsheet}

| 组件 | 工具 | 示例 |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 状态机 | 埃基德纳、曼蒂科尔 |
| 访问控制 | 斯莱瑟、埃基德纳、曼蒂科尔 | [斯莱瑟练习 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md)，[埃基德纳练习 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 算术运算 | 曼蒂科尔、埃基德纳 | [埃基德纳练习 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md)，[曼蒂科尔练习 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| 继承正确性 | 斯莱瑟 | [斯莱瑟练习 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| 外部交互 | 曼蒂科尔、埃基德纳 |
| 标准一致性 | 斯莱瑟、埃基德纳、曼蒂科尔 | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

根据你的目标，还需要检查其他领域，但这些粗粒度的重点领域对于任何智能合约系统来说都是一个良好的开端。

我们的公开审计包含已验证或已测试属性的示例。考虑阅读以下报告的 `Automated Testing and Verification` 部分，以查看现实世界中的安全属性：

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)