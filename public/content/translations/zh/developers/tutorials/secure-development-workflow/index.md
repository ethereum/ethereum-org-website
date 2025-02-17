---
title: 智能合约安全清单
description: 编写安全智能合约的推荐工作流程
author: "Trailofbits"
tags:
  - "智能合约"
  - "安全性"
  - "solidity"
skill: intermediate
lang: zh
published: 2020-09-07
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 智能合约开发清单 {#smart-contract-development-checklist}

这是一个高级别的过程，我们建议在你编写智能合约时遵循。

检查已知的安全问题：

- 使用 [Slither](https://github.com/crytic/slither) 审核你的合约。 该程序有 40 多个内置检测器，可以应对常见的脆弱性。 在每次签入时使用新代码运行它，确保它获得一个干净的报告（或使用分类模式来消除某些问题）。
- 使用 [Crytic](https://crytic.io/) 审核你的合约。 它可以检查 Slither 未涉及的 50 个问题。 Crytic 还可以帮助你的团队成员保持联系，通过在 GitHub 上的拉取请求轻松显示安全问题。

考虑你的智能合约的特殊功能：

- 你的合约是否可以升级？ 使用 [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 或 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/) 检查你的可升级代码是否有缺陷。 我们记录了 17 种升级可能出现的问题。
- 你的合约是否声明符合 ERC 的要求？ 使用 [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) 对它们进行审核。 这个工具能立即识别出六个常见规范的偏差。
- 你是否与第三方代币集成？ 在依赖外部合约之前，请先查看我们的[代币集成清单](/developers/tutorials/token-integration-checklist/)。

目视检查代码的关键安全功能。

- 查看 Slither 的 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) printer。 避免以外屏蔽和 C3 线性化问题。
- 查看 Slither 的 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) printer。 它报告功能可见性和访问控制。
- 查看 Slither 的 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) printer。 它报告了对状态变量的访问控制。

记录关键安全属性，并使用自动化测试生成器对其进行评估：

- 学习 [记录代码的安全属性](/developers/tutorials/guide-to-smart-contract-security-tools/)。 一开始是艰难的，但它是实现良好结果的最重要的活动。 这也是使用本教程中任何高级技术的先决条件。
- 在 Solidity 中定义安全属性，用于 [Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)。 重点是你的状态机、访问控制、算术运算、外部交互和标准一致性。
- 使用 [ Slither 的 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/) 定义安全属性。 重点是继承、变量依赖项、访问控制和其他结构问题。
- 在每次提交时，使用 [Crytic](https://crytic.io) 运行你的属性测试。 Crytic 可以使用和评估安全属性测试，因此团队中的每个人都可以轻松地看到他们通过 GitHub。 测试失败会阻止提交。

最后，请注意自动化工具无法轻易找到的问题：

- 缺乏隐私：当你的事务在池中排队时，其他所有人都可以看到你的事务
- 抢先提前交易
- 加密操作
- 与外部 DeFi 组件的风险互动

## 寻求帮助 {#ask-for-help}

[以太坊的办公时间](https://calendly.com/dan-trailofbits/ethereum-office-hours)为每周二下午。 这些 1 小时的 1 对 1 会议是一个机会，你可以向我们询问有关安全的任何问题，使用我们的工具进行故障排除，并获得专家对你当前方法的反馈。 我们将帮助你消化本指南。

加入我们的 Slack: [ Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw)。 如果你有任何问题，可以随时在 #crytic 和 #ethereum 频道上联系我们。
