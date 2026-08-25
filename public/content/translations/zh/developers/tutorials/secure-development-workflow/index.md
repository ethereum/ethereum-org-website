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

以下是我们建议在编写智能合约时遵循的高级流程。

检查已知的安全问题：

- 使用 [斯莱瑟](https://github.com/crytic/slither) 审查你的合约。它内置了 40 多种常见漏洞检测器。在每次签入新代码时运行它，并确保获得干净的报告（或使用分类模式来忽略某些问题）。
- 使用 [Crytic](https://crytic.io/) 审查你的合约。它能检查出 50 个斯莱瑟无法发现的问题。Crytic 还可以通过在 GitHub 的拉取请求 (Pull Request) 中轻松显示安全问题，帮助你的团队相互监督。

考虑合约的特殊功能：

- 你的合约可升级吗？使用 [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 或 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) 审查你的可升级代码是否存在缺陷。我们记录了 17 种可能导致升级出现问题的情况。
- 你的合约声称符合 ERC 标准吗？使用 [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) 检查它们。该工具可以立即识别出与六种常见规范的偏差。
- 你是否集成了第三方代币？在依赖外部合约之前，请查阅我们的[代币集成检查清单](/developers/tutorials/token-integration-checklist/)。

直观地检查代码的关键安全特性：

- 查看斯莱瑟的 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph)（继承图）打印器。避免无意中的变量遮蔽和 C3 线性化问题。
- 查看斯莱瑟的 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary)（函数摘要）打印器。它会报告函数可见性和访问控制。
- 查看斯莱瑟的 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization)（变量与授权）打印器。它会报告状态变量的访问控制。

记录关键的安全属性，并使用自动化测试生成器来评估它们：

- 学习[为你的代码记录安全属性](/developers/tutorials/guide-to-smart-contract-security-tools/)。这在开始时可能很困难，但它是取得良好结果最重要的一项活动。这也是使用本教程中任何高级技术的先决条件。
- 在 Solidity 中定义安全属性，以便与 [埃基德纳](https://github.com/crytic/echidna) 和 [曼蒂科尔](https://manticore.readthedocs.io/en/latest/verifier.html) 一起使用。重点关注你的状态机、访问控制、算术运算、外部交互以及标准一致性。
- 使用 [斯莱瑟的 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 定义安全属性。重点关注继承、变量依赖、访问控制和其他结构性问题。
- 使用 [Crytic](https://crytic.io) 在每次提交时运行你的属性测试。Crytic 可以使用并评估安全属性测试，以便你团队中的每个人都能在 GitHub 上轻松看到它们已通过。未通过的测试可以阻止提交。

最后，请注意自动化工具难以发现的问题：

- 缺乏隐私：当你的交易在交易池中排队时，其他人都可以看到它们
- 抢跑交易
- 密码学操作
- 与外部去中心化金融 (DeFi) 组件的风险交互

## 寻求帮助 {#ask-for-help}

[以太坊办公时间](https://calendly.com/dan-trailofbits/office-hours)在每周二下午进行。这些为期 1 小时的一对一会议是一个好机会，你可以向我们提出任何关于安全的问题，使用我们的工具进行故障排除，并从专家那里获得关于你当前方法的反馈。我们将帮助你完成本指南。

加入我们的 Slack：[Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)。如果你有任何问题，我们随时在 #crytic 和 #ethereum 频道为你解答。