---
title: 智能合约安全准则
description: 构建您的dapp时要考虑的安全准则清单
author: "Trailofbits"
tags:
  - "solidity"
  - "智能合约"
  - "安全性"
skill: intermediate
lang: zh
published: 2020-09-06
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

遵循这些高级建议，构建更安全的智能合约。

## 设计准则 {#design-guidelines}

编写代码之前，务必先讨论行智能合约的设计。

### 文档和规范 {#documentation-and-specifications}

文档可以在不同级别编写，在执行合约时应进行更新：

- **系统的简要英文描述**，描述合约的行为和所使用的代码库
- **数据模型和架构图**，包括合约的交互概述图和系统的状态转换图。 可以使用[Slither 打印机](https://github.com/crytic/slither/wiki/Printer-documentation)生成相关图示。
- **完整的代码文档**, 可以为 Solidity 使用[Natspec 格式](https://solidity.readthedocs.io/en/develop/natspec-format.html)。

### 链上计算与链下计算 {#on-chain-vs-off-chain-computation}

- **保持尽可能多的链下代码。** 保持链上代码层的最小化。 用链下代码的方式对数据进行预处理，使链上验证变得简单。 是否需要已排序列表？ 在链下对列表进行排序，然后在链上只检查其顺序。

### 升级 {#upgradeability}

我们在[我们的博客文章](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)中讨论了不同的升级解决方案。 在编写任何代码之前，请慎重选择是否支持可升级性。 该决定将影响您如何构建我们的代码。 一般来说，我们建议：

- **优先考虑[合约迁移](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)而不是可升级性。**迁移系统有许多与可升级系统相同的优点，不存在缺陷。
- **使用数据分离模式而不是 delegatecallproxy 模式。**如果您的项目有明确的抽象分离，则使用数据分离的可升级性只需要进行一些调整。 delegatecallproxy 需要 EVM 专业知识，并且非常容易出错。
- **在部署前记录迁移/升级程序。**如果您不得不在没有任何指导的情况下在压力下做出反应，您就会犯错。 提前写好要遵循的程序。 其中应包括：
  - 启动新的智能合约的调用
  - 密钥存放在哪里以及如何获取它们
  - 如何检查部署！ 开发和测试部署后的脚本。

## 实施指南 {#implementation-guidelines}

**力求简洁。** 尽可能使用最简单的解决方案来实现您的目的。 所有的团队成员都应当能够理解解决方案。

### 功能组成 {#function-composition}

使用便于检查的代码库架构， 避免选择不利于正确性验证的架构。

- 通过多个合约或将相似的功能分到一组（例如，身份验证、算术等）来**拆分您的系统逻辑**。
- **编写小的函数，并且目的明确。**这将便于审查并允许对单个组件进行测试。

### 继承 {#inheritance}

- **使继承易于管理。**继承应用于划分逻辑，但是，您的项目应以最小化继承树的深度和宽度为目标。
- **使用 Slother 的[inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph)检查合约层级结构。**inheritance printer 可帮助您审查层级结构的大小。

### 事件 {#events}

- **记录所有关键操作。**事件有助于在开发过程中调试合约，并在部署后对其进行监控。

### 规避已知漏洞 {#avoid-known-pitfalls}

- **了解最常见的安全问题。**有大量的用于常见问题的网络资源，例如[Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/)或[Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)。
- **了解[Solidity 文档](https://solidity.readthedocs.io/en/latest/)中的警告部分，** 警告部分将通知您该语言的非明显行为。

### 依赖关系 {#dependencies}

- **使用经过充分测试的库。**从经过充分测试的库中导入代码将降低编写错误代码的可能性。 如果您打算编写一个 ERC20 合约，请使用[OpenZepelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
- **使用依赖关系管理器，不要直接复制粘贴代码。** 如果依赖于外部来源，请保持与原始来源的的同步。

### 测试和验证 {#testing-and-verification}

- **编写详尽的单元测试。**全面的测试套件对于构建高质量的软件至关重要。
- **编写[Slither](https://github.com/crytic/slither)、[Echidna](https://github.com/crytic/echidna)和[Manticore](https://github.com/trailofbits/manticore)自定义检查和属性。**自动化工具将帮助确保您的合约安全。 查看本指南的其余部分，了解如何编写高效的检查和属性。
- **使用[crytic.io](https://crytic.io/)。**Crytic 与 Github 集成，提供对私有 Slither 探测器的访问，并从 Echidna 运行自定义属性检查。

### Solidity {#solidity}

- **使用 Solidity 0.5，而不是 0.4 和 0.6。**在我们看来，相较于 0.4，Solidity 0.5 更加安全，具有更好的内部实践。 Solidity 0.6 对于发布级产品而言过于不稳定，还需要时间才能趋于成熟。
- **使用稳定版本进行编译；使用最新版本进行警告检查。** 保证代码中不存在最新版本编译器报告的问题。 然而，Solidity 的发布周期很快，编译器中存在错误，所以我们不推荐最新版本进行部署（请参阅 Slither 的[solc 版本建议](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)）。
- **不要使用内联汇编。**使用汇编需要 EVM 专业知识。 如果对黄皮书没有很好的*理解*，请不要写 EVM 代码。

## 部署准则 {#deployment-guidelines}

合约开发和部署完成后：

- **监测合约。**关注日志，在合约或钱包发生异常时随时做出反应。
- **将联系信息添加到[blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)。**如果发现安全缺陷，此列表可以帮助第三方与您联系。
- **保护特权用户的钱包。** 如果使用硬件钱包存储密钥，请按照[最佳实践](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)进行操作。
- **制定事故响应计划。** 以合约可能发生错误为前提进行考量。 即使合约本身没有错误，攻击者也可能有机会控制合约拥有者的密钥。
