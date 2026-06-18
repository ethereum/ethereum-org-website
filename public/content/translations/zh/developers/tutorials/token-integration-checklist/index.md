---
title: 代币集成清单
description: 与代币交互时需要考虑的检查清单
author: "Trailofbits"
lang: zh
tags: ["solidity", "智能合约", "安全", "代币"]
skill: intermediate
breadcrumb: 代币集成
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

在与任意代币交互时，请遵循此清单。确保你了解与每个项目相关的风险，并为任何不符合这些规则的例外情况提供合理的解释。

为了方便起见，所有斯莱瑟（Slither）[实用工具](https://github.com/crytic/slither#tools)都可以直接在代币地址上运行，例如：

[使用斯莱瑟教程](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

要遵循此清单，你需要获取斯莱瑟针对该代币的以下输出：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 要求配置，并使用埃基德纳和曼蒂科尔
```

## 一般注意事项 {#general-considerations}

- **合约经过了安全审查。** 避免与缺乏安全审查的合约进行交互。检查评估的时长（即“工作量”）、安全公司的声誉以及发现问题的数量和严重程度。
- **你已联系开发人员。** 你可能需要向他们的团队报告安全事件。请在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上寻找合适的联系人。
- **他们有用于发布重要公告的安全邮件列表。** 当发现严重问题或进行升级时，他们的团队应该通知用户（比如你！）。

## ERC 合规性 {#erc-conformity}

斯莱瑟包含一个实用工具 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，用于审查代币对许多相关 ERC 标准的合规性。使用 slither-check-erc 审查以下内容：

- **transfer 和 transferFrom 返回布尔值。** 几个代币在这些函数上不返回布尔值。因此，合约中对它们的调用可能会失败。
- **如果使用了 name、decimals 和 symbol 函数，它们必须存在。** 这些函数在 ERC-20 标准中是可选的，可能并不存在。
- **decimals 返回 uint8。** 几个代币错误地返回了 uint256。如果是这种情况，请确保返回的值低于 255。
- **代币缓解了已知的 [ERC-20 竞争条件](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC-20 标准存在一个已知的 ERC-20 竞争条件，必须加以缓解以防止攻击者窃取代币。
- **该代币不是 ERC-777 代币，并且在 transfer 和 transferFrom 中没有外部函数调用。** 转账（transfer）函数中的外部调用可能会导致重入。

斯莱瑟包含一个实用工具 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，它可以生成单元测试和安全属性，从而发现许多常见的 ERC 缺陷。使用 slither-prop 审查以下内容：

- **合约通过了 slither-prop 的所有单元测试和安全属性。** 运行生成的单元测试，然后使用 [埃基德纳](https://github.com/crytic/echidna) 和 [曼蒂科尔](https://manticore.readthedocs.io/en/latest/verifier.html) 检查属性。

最后，某些特征很难自动识别。请手动审查以下情况：

- **transfer 和 transferFrom 不应收取费用。** 通缩型代币可能会导致意外行为。
- **考虑了从代币中赚取的潜在利息。** 一些代币会向代币持有者分配利息。如果不加以考虑，这些利息可能会被困在合约中。

## 合约构成 {#contract-composition}

- **合约避免了不必要的复杂性。** 代币应该是一个简单的合约；代码复杂的代币需要更高标准的审查。使用斯莱瑟的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)来识别复杂的代码。
- **合约使用了 SafeMath。** 不使用 SafeMath 的合约需要更高标准的审查。手动检查合约中 SafeMath 的使用情况。
- **合约只有少数与代币无关的函数。** 与代币无关的函数会增加合约出现问题的可能性。使用斯莱瑟的 [contract-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来广泛审查合约中使用的代码。
- **代币只有一个地址。** 具有多个余额更新入口点的代币可能会破坏基于地址的内部记账（例如，`balances[token_address][msg.sender]` 可能无法反映实际余额）。

## 所有者权限 {#owner-privileges}

- **代币不可升级。** 可升级合约可能会随着时间的推移改变其规则。使用斯莱瑟的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来确定合约是否可升级。
- **所有者具有有限的铸造能力。** 恶意或被入侵的所有者可能会滥用铸造能力。使用斯莱瑟的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来审查铸造能力，并考虑手动审查代码。
- **代币不可暂停。** 恶意或被入侵的所有者可能会困住依赖可暂停代币的合约。手动识别可暂停的代码。
- **所有者不能将合约列入黑名单。** 恶意或被入侵的所有者可能会困住依赖带有黑名单功能代币的合约。手动识别黑名单功能。
- **代币背后的团队是公开的，并且可以对滥用行为负责。** 具有匿名开发团队或位于法律避风港的合约应需要更高标准的审查。

## 代币稀缺性 {#token-scarcity}

审查代币稀缺性问题需要手动审查。检查以下情况：

- **没有用户拥有大部分供应量。** 如果少数用户拥有大部分代币，他们可以根据代币的重新分配来影响操作。
- **总供应量充足。** 总供应量较低的代币很容易被操纵。
- **代币分布在多个交易所中。** 如果所有代币都在一个交易所中，该交易所被入侵可能会危及依赖该代币的合约。
- **用户了解大额资金或闪电贷的相关风险。** 依赖代币余额的合约必须仔细考虑拥有大额资金的攻击者或通过闪电贷发起的攻击。
- **代币不允许闪电铸造。** 闪电铸造可能会导致余额和总供应量大幅波动，这需要在代币的操作中进行严格且全面的溢出检查。