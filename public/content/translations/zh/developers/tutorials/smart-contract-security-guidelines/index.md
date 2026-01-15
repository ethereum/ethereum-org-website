---
title: "智能合约安全性准则"
description: "构建你的dapp时要考虑的安全准则清单"
author: "Trailofbits"
tags: [ "Solidity", "智能合同", "安全性。" ]
skill: intermediate
lang: zh
published: 2020-09-06
source: "构建安全的合约"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/guidelines.md
---

遵循这些高级建议，构建更安全的智能合约。

## 设计指南 {#design-guidelines}

编写代码之前，务必先讨论行智能合约的设计。

### 文档和规范 {#documentation-and-specifications}

文档可以在不同级别编写，在执行合约时应进行更新：

- **对系统的简明英文描述**，说明合约的功能以及对代码库的任何假设。
- **方案和架构图**，包括合约交互和系统的状态机。 [Slither printers](https://github.com/crytic/slither/wiki/Printer-documentation) 可以帮助生成这些方案。
- **详尽的代码文档**，Solidity 可以使用 [Natspec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)。

### 链上计算与链下计算 {#onchain-vs-offchain-computation}

- \*\*尽可能将代码放在链下。\*\*保持较小的链上层。 用链下代码预处理数据，从而简化链上验证。 是否需要已排序列表？ 在链下对列表进行排序，然后在链上只检查其顺序。

### 可升级性 {#upgradeability}

我们在[我们的博文](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)中讨论了不同的可升级性解决方案。 在编写任何代码之前，请慎重选择是否支持可升级性。 该决定将影响你如何构建你的代码。 一般来说，我们建议：

- \*\*优先选择[合约迁移](https://blog.trailofbits.com/2018/10/29/how-contract-migration-works/)，而非可升级性。\*\*迁移系统与可升级系统相比，具有许多相同优点，但没有其缺点。
- \*\*使用数据分离模式，而非 delegatecallproxy 模式。\*\*如果你的项目有明确的抽象分离，使用数据分离实现的可升级性将仅需少量调整。 delegatecallproxy需要EVM专业知识，并且非常容易出错。
- \*\*在部署前记录迁移/升级程序。\*\*如果你在毫无指导的情况下，必须顶着压力做出反应，就可能会犯错。 提前写好要遵循的程序。 其中应包括：
  - 启动新的智能合约的调用
  - 密钥存放在哪里以及如何获取它们
  - 如何检查部署！ 开发和测试部署后的脚本。

## 实施指南 {#implementation-guidelines}

\*\*力求简洁。\*\*始终使用最简单的解决方案来实现你的目的。 所有的团队成员都应当能够理解解决方案。

### 函数组合 {#function-composition}

使用便于检查的代码库架构， 避免选择不利于正确性验证的架构。

- **拆分系统逻辑**，既可以通过多个合约，也可以将相似的函数分组（例如，身份验证、算术运算……）。
- \*\*编写目的明确的小函数。\*\*这样便于审查，也可以对单个组件进行测试。

### 继承 {#inheritance}

- \*\*保持继承的可管理性。\*\*继承可用于划分逻辑，但是，你的项目应旨在尽量减小继承树的深度和宽度。
- \*\*使用 Slither 的 [inheritance printer](https://github.com/crytic/slither/wiki/Printer-documentation#inheritance-graph) 检查合约的层级结构。\*\*inheritance printer 将帮助你审查层级结构的大小。

### 事件 {#events}

- \*\*记录所有关键操作。\*\*事件将有助于在开发期间调试合约，并在部署后监控合约。

### 避免已知陷阱 {#avoid-known-pitfalls}

- \*\*了解最常见的安全问题。\*\*有很多在线资源可供学习常见问题，例如 [Ethernaut CTF](https://ethernaut.openzeppelin.com/)、[Capture the Ether](https://capturetheether.com/) 或 [Not so smart contracts](https://github.com/crytic/not-so-smart-contracts/)。
- \*\*留意 [Solidity 文档](https://docs.soliditylang.org/en/latest/)中的警告部分。\*\*警告部分会告知你该语言中一些不明显的行为。

### 依赖项 {#dependencies}

- \*\*使用经过充分测试的库。\*\*从经过充分测试的库导入代码会降低你编写错误代码的可能性。 如果你想编写 ERC20 合约，请使用 [OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
- \*\*使用依赖项管理器；避免复制粘贴代码。\*\*如果你依赖外部源，则必须使其与原始源保持同步。

### 测试和验证 {#testing-and-verification}

- \*\*编写详尽的单元测试。\*\*一个全面的测试套件对于构建高质量软件至关重要。
- \*\*编写 [Slither](https://github.com/crytic/slither)、[Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://github.com/trailofbits/manticore) 自定义检查和属性。\*\*自动化工具有助于确保你的合约安全。 查看本指南的其余部分，了解如何编写高效的检查和属性。
- **使用 [crytic.io](https://crytic.io/)**。Crytic 与 GitHub 集成，可访问私有 Slither 检测器，并运行来自 Echidna 的自定义属性检查。

### Solidity {#solidity}

- \*\*优先使用 Solidity 0.5，而非 0.4 和 0.6。\*\*我们认为，与 0.4 版本相比，Solidity 0.5 更安全，并且内置了更好的实践。 Solidity 0.6对于发布级产品而言过于不稳定，还需要时间才能趋于成熟。
- \*\*使用稳定版本进行编译；使用最新版本检查警告。\*\*确保你的代码在最新编译器版本下没有报告任何问题。 然而，Solidity 的发布周期很快，且有过编译器漏洞的历史，因此我们不建议使用最新版本进行部署（请参阅 Slither 的 [solc 版本建议](https://github.com/crytic/slither/wiki/Detector-Documentation#recommendation-33)）。
- \*\*不要使用内联汇编。\*\*汇编需要 EVM 专业知识。 如果你没有_精通_黄皮书，请不要编写 EVM 代码。

## 部署指南 {#deployment-guidelines}

合约开发和部署完成后：

- \*\*监控你的合约。\*\*关注日志，并准备好在合约或钱包受损时做出反应。
- \*\*将你的联系信息添加到 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)。\*\*如果发现安全漏洞，此列表可帮助第三方联系你。
- \*\*保护特权用户的钱包安全。\*\*如果你将密钥存储在硬件钱包中，请遵循我们的[最佳实践](https://blog.trailofbits.com/2018/11/27/10-rules-for-the-secure-use-of-cryptocurrency-hardware-wallets/)。
- \*\*制定事件响应计划。\*\*要考虑到你的智能合约可能被攻击。 即使合约本身没有错误，攻击者也可能有机会控制合约拥有者的密钥。
