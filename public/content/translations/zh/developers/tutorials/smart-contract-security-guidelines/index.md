---
title: "智能合约安全指南"
description: "构建去中心化应用程序 (dapp) 时需要考虑的安全指南清单"
author: "Trailofbits"
tags: ["Solidity", "智能合约", "安全"]
skill: intermediate
breadcrumb: "安全指南"
lang: zh
published: 2020-09-06
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

遵循这些高级别建议，以构建更安全的智能合约。

## 设计指南 {#design-guidelines}

在编写任何代码之前，应提前讨论合约的设计。

### 文档与规范 {#documentation-and-specifications}

文档可以在不同层面上编写，并且应在实现合约时进行更新：

- **系统的通俗描述**，说明合约的功能以及对代码库的任何假设。
- **模式和架构图**，包括合约交互和系统的状态机。[斯莱瑟 (Slither) 打印机](https://github.com/crytic/slither/wiki/Printer-documentation)可以帮助生成这些模式。
- **详尽的代码文档**，Solidity 可以使用 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)。

### 链上与链下计算 {#onchain-vs-offchain-computation}

- **尽可能将代码保持在链下。** 保持链上层小巧。在链下使用代码预处理数据，使得链上验证变得简单。你需要一个有序列表吗？在链下对列表进行排序，然后仅在链上检查其顺序。

### 可升级性 {#upgradeability}

我们在[博客文章](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)中讨论了不同的可升级性解决方案。在编写任何代码之前，请慎重选择是否支持可升级性。该决定将影响你构建代码的方式。通常，我们建议：

- **优先选择[合约迁移](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)而不是可升级性。** 迁移系统具有许多与可升级系统相同的优势，但没有其缺点。
- **使用数据分离模式而不是 delegatecall 代理模式。** 如果你的项目有清晰的抽象分离，使用数据分离的可升级性将只需要很少的调整。delegatecall 代理需要 EVM 专业知识，并且极易出错。
- **在部署之前记录迁移/升级过程。** 如果你必须在没有指南的情况下在压力下做出反应，你就会犯错。提前写下要遵循的程序。它应包括：
  - 启动新合约的调用
  - 密钥存储在哪里以及如何访问它们
  - 如何检查部署！开发并测试部署后脚本。

## 实现指南 {#implementation-guidelines}

**力求简单。** 始终使用符合你目的的最简单解决方案。你团队的任何成员都应该能够理解你的解决方案。

### 函数组合 {#function-composition}

代码库的架构应使你的代码易于审查。避免那些会降低推理其正确性能力的架构选择。

- **拆分系统的逻辑**，可以通过多个合约或将相似的函数分组在一起（例如，身份验证、算术等）。
- **编写目的明确的小型函数。** 这将有助于更轻松地进行审查，并允许测试各个组件。

### 继承 {#inheritance}

- **保持继承的可管理性。** 继承应用于划分逻辑，但是，你的项目应旨在最小化继承树的深度和宽度。
- **使用斯莱瑟的[继承打印机](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph)来检查合约的层次结构。** 继承打印机将帮助你审查层次结构的大小。

### 事件 {#events}

- **记录所有关键操作的日志。** 事件将有助于在开发期间调试合约，并在部署后对其进行监控。

### 避免已知陷阱 {#avoid-known-pitfalls}

- **了解最常见的安全问题。** 有许多在线资源可以了解常见问题，例如 [Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/) 或 [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)。
- **注意 [Solidity 文档](https://docs.soliditylang.org/en/latest/)中的警告部分。** 警告部分将告知你该语言中不明显的行为。

### 依赖项 {#dependencies}

- **使用经过充分测试的库。** 从经过充分测试的库中导入代码将降低编写错误代码的可能性。如果你想编写一个 ERC-20 合约，请使用 [欧本齐柏林 (OpenZeppelin)](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
- **使用依赖项管理器；避免复制粘贴代码。** 如果你依赖外部源，那么你必须使其与原始源保持同步更新。

### 测试与验证 {#testing-and-verification}

- **编写详尽的单元测试。** 广泛的测试套件对于构建高质量软件至关重要。
- **编写 [斯莱瑟](https://github.com/crytic/slither)、[埃基德纳](https://github.com/crytic/echidna) 和 [曼蒂科尔](https://github.com/trailofbits/manticore) 自定义检查和属性。** 自动化工具将有助于确保你的合约安全。查看本指南的其余部分，了解如何编写高效的检查和属性。
- **使用 [crytic.io](https://crytic.io/)。** Crytic 与 GitHub 集成，提供对私有斯莱瑟检测器的访问，并运行来自埃基德纳的自定义属性检查。

### Solidity {#solidity}

- **优先选择 Solidity 0.5 而不是 0.4 和 0.6。** 在我们看来，Solidity 0.5 比 0.4 更安全，并且具有更好的内置实践。事实证明，Solidity 0.6 对于生产环境来说过于不稳定，需要时间来成熟。
- **使用稳定版本进行编译；使用最新版本检查警告。** 检查你的代码在最新编译器版本中没有报告的问题。然而，Solidity 的发布周期很快，并且有编译器错误的历史，因此我们不建议使用最新版本进行部署（请参阅斯莱瑟的 [solc 版本建议](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)）。
- **不要使用内联汇编。** 汇编需要 EVM 专业知识。如果你还没有_精通_黄皮书，请不要编写 EVM 代码。

## 部署指南 {#deployment-guidelines}

一旦合约开发并部署完成：

- **监控你的合约。** 观察日志，并准备好在合约或钱包受损时做出反应。
- **将你的联系信息添加到 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)。** 如果发现安全漏洞，此列表可帮助第三方与你联系。
- **保护特权用户的钱包。** 如果你将密钥存储在硬件钱包中，请遵循我们的[最佳实践](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)。
- **制定事件响应计划。** 考虑到你的智能合约可能会受到损害。即使你的合约没有错误，攻击者也可能控制合约所有者的密钥。