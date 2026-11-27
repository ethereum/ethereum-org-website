---
title: "智能合约安全检查清单"
description: "编写安全智能合约的建议工作流程"
author: "Trailofbits"
tags:
  - 智能合约
  - 安全
  - solidity
skill: intermediate
breadcrumb: "安全检查清单"
lang: zh
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 智能合约开发检查清单 {#smart-contract-development-checklist}

以下是我们建议您在编写智能合约时遵循的高级流程。

检查已知的安全问题：

- 使用 [斯莱瑟](https://github.com/crytic/slither) 审查您的合约。它内置了 100 多个常见漏洞检测器。在每次签入新代码时运行它，并确保获得干净的报告（或使用分类模式来忽略某些问题）。
- 在 CI 中运行斯莱瑟，例如在 GitHub 上使用 [slither-action](https://github.com/crytic/slither-action)，以便在拉取请求中发现安全问题。

考虑您合约的特殊功能：

- 您的合约可升级吗？使用 [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 审查您的可升级性代码是否存在缺陷。我们记录了 17 种升级可能出错的情况。
- 您的合约声称符合 ERC 标准吗？使用 [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) 检查它们。该工具可立即识别出与六种常见规范的偏差。
- 您是否集成了第三方代币？在依赖外部合约之前，请查看我们的[代币集成检查清单](/developers/tutorials/token-integration-checklist/)。

直观地检查代码的关键安全功能：

- 审查斯莱瑟的 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 打印器。避免无意中的变量遮蔽和 C3 线性化问题。
- 审查斯莱瑟的 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 打印器。它会报告函数可见性和访问控制。
- 审查斯莱瑟的 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 打印器。它会报告状态变量的访问控制。

记录关键的安全属性，并使用自动化测试生成器来评估它们：

- 学习[为您的代码记录安全属性](/developers/tutorials/guide-to-smart-contract-security-tools/)。这在开始时可能很困难，但它是取得良好结果的最重要活动。这也是使用本教程中任何高级技术的先决条件。
- 在 Solidity 中定义安全属性，以便与模糊测试工具（如 [埃基德纳](https://github.com/crytic/echidna) 和 [Medusa](https://github.com/crytic/medusa)）以及符号执行工具（如 [hevm](https://hevm.dev/)）一起使用。重点关注您的状态机、访问控制、算术运算、外部交互和标准一致性。
- 使用[斯莱瑟的 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 定义安全属性。重点关注继承、变量依赖、访问控制和其他结构性问题。
- 在 CI（例如 GitHub Actions）的每次提交中运行您的属性测试，以便团队中的每个人都能轻松看到它们通过。失败的测试可以阻止合并。

最后，请注意自动化工具无法轻易发现的问题：

- 缺乏隐私：当您的交易在池中排队时，其他人都可以看到它们
- 抢跑交易
- 密码学操作
- 与外部 DeFi 组件的风险交互

## 寻求帮助 {#ask-for-help}

[以太坊办公时间](https://meetings.hubspot.com/trailofbits/office-hours)在每周二下午进行。这些为期 1 小时的一对一会议是一个好机会，你可以向我们提出任何关于安全的问题，使用我们的工具进行故障排除，并从专家那里获得关于你当前方法的反馈。我们将帮助你完成本指南。

加入我们的 Slack：[Empire Hacking](https://slack.empirehacking.nyc/)。如果你有任何问题，我们随时在 #crytic 和 #ethereum 频道为你解答。
