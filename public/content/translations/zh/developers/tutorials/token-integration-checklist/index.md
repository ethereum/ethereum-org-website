---
title: "代币集成核对清单"
description: "与代币交互时需要考虑的事项核对清单"
author: "Trailofbits"
lang: zh
tags: [ "Solidity", "智能合同", "安全性。", "通证" ]
skill: intermediate
published: 2020-08-13
source: "构建安全的合约"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

与任意代币交互时，请遵循此核对清单。 请确保你了解每个项目相关的风险，并证明对这些规则的任何例外情况都是合理的。

为方便起见，所有 Slither [实用程序](https://github.com/crytic/slither#tools)都可以直接在代币地址上运行，例如：

[使用 Slither 教程](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

要遵循此核对清单，你需要从 Slither 获取该代币的以下输出：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 需要配置，并使用 Echidna 和 Manticore
```

## 一般注意事项 {#general-considerations}

- \*\*合约已经过安全审查。\*\*避免与未经安全审查的合约进行交互。 检查评估的时长（也称为“工作量”）、安全公司的声誉以及发现问题的数量和严重性。
- \*\*你已联系开发者。\*\*你可能需要就某一事件提醒他们的团队。 在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上查找相应的联系人。
- \*\*他们有一个用于发布重要公告的安全邮件列表。\*\*他们的团队应该通知用户（例如你！） 当发现关键问题或进行升级时。

## ERC 合规性 {#erc-conformity}

Slither 包含一个实用程序 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，用于审查代币与许多相关 ERC 标准的合规性。 使用 slither-check-erc 审查以下内容：

- \*\*Transfer 和 transferFrom 返回一个布尔值。\*\*一些代币的这两个函数不返回布尔值。 因此，在合约中对它们的调用可能会失败。
- \*\*如果使用，name、decimals 和 symbol 函数必须存在。\*\*这些函数在 ERC20 标准中是可选的，可能不存在。
- **Decimals 返回一个 uint8。** 有些代币会错误地返回 uint256。 在这种情况下，请确保返回的值低于 255。
- **该代币缓解了已知的 [ERC20 竞争条件](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC20 标准有一个已知的竞争条件，必须加以缓解，以防止攻击者窃取代币。
- **该代币不是 ERC777 代币，并且在 transfer 和 transferFrom 中没有外部函数调用。** transfer 函数中的外部调用可能导致重入。

Slither 包含一个实用程序 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，它可以生成单元测试和安全属性，从而发现许多常见的 ERC 缺陷。 使用 slither-prop 审查以下内容：

- **合约通过了 slither-prop 的所有单元测试和安全属性。** 运行生成的单元测试，然后用 [Echidna](https://github.com/crytic/echidna) 和 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html) 检查属性。

最后，还有一些难以自动识别的特征。 人工审查这些情况：

- **Transfer 和 transferFrom 不应收取费用。** 通缩型代币可能导致意外行为。
- \*\*考虑从代币中获得的潜在利息。\*\*有些代币会向代币持有者分发利息。 如果不加以考虑，这些利息可能会被困在合约中。

## 合约构成 {#contract-composition}

- \*\*合约避免了不必要的复杂性。\*\*代币应该是一个简单的合约；代码复杂的代币需要更高的审查标准。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary) 来识别复杂代码。
- \*\*合约使用 SafeMath。\*\*不使用 SafeMath 的合约需要更高的审查标准。 人工检查合约是否使用了 SafeMath。
- \*\*合约只有少数与代币无关的函数。\*\*与代币无关的函数会增加合约出现问题的可能性。 使用 Slither 的 [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 来大致审查合约中使用的代码。
- \*\*代币只有一个地址。\*\*具有多个余额更新入口点的代币可能会破坏基于地址的内部记账（例如，`balances[token_address][msg.sender]` 可能无法反映实际余额）。

## 所有者权限 {#owner-privileges}

- \*\*代币不可升级。\*\*可升级的合约可能会随时间改变其规则。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 来确定合约是否可升级。
- \*\*所有者的铸造能力有限。\*\*恶意或被盗用的所有者可能会滥用铸造能力。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary) 来审查铸造能力，并考虑人工审查代码。
- \*\*代币不可暂停。\*\*恶意或被盗用的所有者可以利用可暂停的代币套住依赖这些代币的合约。 人工识别可暂停代码。
- \*\*所有者不能将合约列入黑名单。\*\*恶意或被盗用的所有者可以利用带有黑名单的代币套住依赖这些代币的合约。 人工识别黑名单功能。
- \*\*代币背后的团队是已知的，可以对滥用行为负责。\*\*由匿名开发团队开发的合约，或者位于法律庇护所的合约，需要更高的审查标准。

## 代币稀缺性 {#token-scarcity}

代币稀缺性问题的审查需要人工进行。 检查以下情况：

- \*\*没有用户拥有大部分供应量。\*\*如果少数用户拥有大部分代币，他们就可以根据代币的分布情况影响运营。
- \*\*总供应量充足。\*\*总供应量低的代币很容易被操纵。
- \*\*代币分布在多家交易所。\*\*如果所有代币都在一家交易所，那么该交易所被盗用可能会损害依赖该代币的合约。
- \*\*用户了解大额资金或闪电贷的相关风险。\*\*依赖代币余额的合约必须仔细考虑拥有大额资金的攻击者或通过闪电贷发起的攻击。
- **代币不允许闪电铸造**。 闪电铸造可能导致余额和总供应量的大幅波动，因此需要在代币操作中进行严格而全面的溢出检查。
