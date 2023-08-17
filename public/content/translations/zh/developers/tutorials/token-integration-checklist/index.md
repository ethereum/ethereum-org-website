---
title: 通证集成检查清单
description: 与通证交互时需要考虑的事项检查清单
author: "Trailofbits"
lang: zh
tags:
  - "solidity"
  - "智能合同"
  - "安全性"
  - "通证"
skill: intermediate
published: 2020-08-13
source: 构建安全的合约
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

与任意通证交互时遵循此检查清单。 确保您了解与每一项相关的风险，并证明这些规则的任何例外都是合理的。

为方便起见，所有 Slither[实用程序](https://github.com/crytic/slither#tools)都可以直接在通证地址上运行，例如：

[使用 Slither 教程](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

要遵循此检查清单，您需要从 Slither 获得通证的以下输出：

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # requires configuration, and use of Echidna and Manticore
```

## 一般考虑因素 {#general-considerations}

- **合约包含安全审查。** 避免与缺少安全审查的合约发生互动。 检查评估的时间长度（也称为“努力程度”）、安全公司的声誉以及评估结果的数量和严重程度。
- **您已经联系了开发者。**您可能需要提醒他们的团队发生意外。 在[blockchain-security](https://github.com/crytic/blockchain-security-contacts)上寻找适当的联系人。
- **他们有一个用于重要公告的安全邮件列表。** 当发现关键问题或升级发生时，他们的团队应该向（像您一样的）用户提供建议。

## 符合 ERC 标准 {#erc-conformity}

Slither 包含一个实用程序[slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，用于检查通证是否符合许多相关的 ERC 标准。 使用 slither-check-erc 来检查：

- **Transfer 和 transferFrom 返回一个布尔值。** 一些通证不会在这些函数上返回布尔值。 因此，他们在合约中的调用可能会失败。
- **如果使用了名称、小数和符号函数，就会出现。**因为这些函数在 ERC20 标准中是可选的，所以也有可能不会出现。
- **Decimals 返回 uint8。**一些通证会错误地返回 uint256。 如果是这种情况，请确保返回的值低于 255。
- **该通证缓解了已知的[ERC20 条件竞争攻击](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC20 标准有一个已知的 ERC20 条件竞争攻击，必须加以修复，从而防止攻击者窃取通证。
- **该通证不是 ERC777 通证，在 transfer 和 transferFrom 中没有外部函数调用。** transfer 函数中的外部调用可能导致重入漏洞。

Slither 包括一个实用程序[slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，它可以生成单元测试和安全属性，可以发现许多常见的 ERC 缺陷。 使用 slither-prop 来检查：

- **合约通过了所有单元测试和 slither-prop 的安全属性测试。**运行生成的单元测试，然后用[Echidna](https://github.com/crytic/echidna)和[Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)检查属性。

最后，有一些特征是难以自动识别的。 手动检查这些条件：

- **Transfer 和 transferFrom 不收取费用。**通缩通证可能会导致意想不到的行为。
- **从通证中获得的潜在利息也被考虑在内。** 一些通证将利息分配给通证持有者。 如果不加以考虑，这种利息可能会被困于合约中。

## 合约构成 {#contract-composition}

- **合约避免了不必要的复杂性。**通证应该是一个简单的合约；一个具有复杂代码的通证需要更高的审查标准。 使用 Slither 的[human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)来识别复杂的代码。
- **合约使用了 SafeMath。**不使用 SafeMath 的合约需要更高的审查标准。 手动检查合约是否使用了 SafeMath。
- **合约中只有几个与通证无关的函数。**与通证无关的函数增加了合约中出现问题的可能性。 使用 Slither 的[contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来广泛审查合约中使用的代码。
- **该通证只有一个地址。**具有多个余额更新入口点的通证可能会破坏基于地址的内部记账（例如，`balances[token_address][msg.sender]`可能不反映实际余额）。

## 用户特权 {#owner-privileges}

- **通证无法升级。**可升级的合约可能会随着时间的推移改变其规则。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来确定合约是否可以升级。
- **所有者的铸币能力有限。**恶意的或受到影响的所有者可能会滥用铸币能力。 使用 Slither 的 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来审查铸币能力，并考虑手动审查代码。
- **通证不可暂停。**恶意的或受到影响的所有者可以依靠可暂停通证捕获合约。 手动识别可暂停的代码。
- **所有者不能将合约列入黑名单。**恶意的或受到影响的所有者可以使用黑名单捕获依赖通证的合约。 手动识别黑名单特征。
- **大家都知道通证背后的团队，他们对滥用负责。**匿名开发团队，或居住在法律管辖范围外的开发团队，他们开发的合约应该需要更高的审查标准。

## 通证稀缺性 {#token-scarcity}

对通证稀缺问题的审查需要人工审查。 检查这些情况：

- **没有用户拥有大部分的供应。**如果少数用户拥有大部分的通证，他们可以根据通证的再分配影响操作。
- **总供应量充足。**总供应量低的通证很容易被操纵。
- **通证位于多个交易所。**如果所有的通证都在一个交易所，那么交易所的危害就会影响到依赖通证的合约。
- **用户了解大额资金或闪电贷款的相关风险。**依靠通证余额的合约必须仔细考虑到拥有大额资金的攻击者或通过闪电贷款的攻击。
- **通证不允许闪电铸币**。 闪电铸币会导致余额和总供应量的大幅波动，这就需要在通证的运作中进行严格和全面的溢出检查。
