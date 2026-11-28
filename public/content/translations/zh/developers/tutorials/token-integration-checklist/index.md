---
title: "代币集成清单"
description: "与代币交互时需要考虑的检查清单"
author: "Trailofbits"
lang: zh
tags: ["Solidity", "智能合约", "安全", "代币"]
skill: intermediate
breadcrumb: "代币集成"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

在与任意代币交互时，请遵循此检查清单。确保你了解与每个项目相关的风险，并为任何例外情况提供合理的解释。

为了方便起见，所有 Slither [实用工具](https://github.com/crytic/slither#tools)都可以直接在代币地址上运行，例如：

[使用 Slither 教程](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

从 Etherscan 获取经过验证的源代码需要一个 [Etherscan API 密钥](https://docs.etherscan.io/set-up-your-api-key)（免费密钥即可）。通过 `--etherscan-apikey` 传递它，或者设置 `ETHERSCAN_API_KEY` 环境变量，Slither 也会读取该变量：

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

如果没有密钥，该命令将失败并显示 `Invalid etherscan API Key` 错误。

要遵循此检查清单，你需要从 Slither 获取该代币的以下输出：

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # 要求配置，并使用 Echidna
```

## 一般注意事项 {#general-considerations}

- **合约经过了安全审查。** 避免与缺乏安全审查的合约进行交互。检查评估的时长（即“工作量”）、安全公司的声誉以及发现问题的数量和严重程度。
- **你已联系开发人员。** 你可能需要向他们的团队报告安全事件。请在 [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts) 上寻找合适的联系人。
- **他们有用于发布重要公告的安全邮件列表。** 当发现严重问题或进行升级时，他们的团队应该通知用户（比如你！）。

## ERC 一致性 {#erc-conformity}

Slither 包含一个实用工具 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)，用于审查代币对许多相关 ERC 标准的符合性。使用 slither-check-erc 审查以下内容：

- **Transfer 和 transferFrom 返回一个布尔值。** 几个代币在这些函数上不返回布尔值。因此，它们在合约中的调用可能会失败。
- **如果使用了 name、decimals 和 symbol 函数，它们必须存在。** 这些函数在 ERC-20 标准中是可选的，可能不存在。
- **Decimals 返回一个 uint8。** 几个代币错误地返回 uint256。如果是这种情况，请确保返回的值低于 255。
- **代币缓解了已知的 [ERC-20 竞争条件](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)。** ERC-20 标准有一个已知的 ERC-20 竞争条件，必须加以缓解以防止攻击者窃取代币。
- **代币不是 ERC-777 代币，并且在 transfer 和 transferFrom 中没有外部函数调用。** 转账函数中的外部调用可能导致重入。

Slither 包含一个实用工具 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)，它可以生成单元测试和安全属性，从而发现许多常见的 ERC 缺陷。使用 slither-prop 审查以下内容：

- **合约通过了 slither-prop 的所有单元测试和安全属性。** 运行生成的单元测试，然后使用 [Echidna](https://github.com/crytic/echidna) 检查属性。

最后，某些特征很难自动识别。请手动审查以下情况：

- **Transfer 和 transferFrom 不应收取费用。** 通缩代币可能导致意外行为。
- **考虑了从代币中赚取的潜在利息。** 一些代币向代币持有者分配利息。如果不加以考虑，这些利息可能会被困在合约中。

## 合约构成 {#contract-composition}

- **合约避免了不必要的复杂性。** 代币应该是一个简单的合约；代码复杂的代币需要更高标准的审查。使用 Slither 的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)来识别复杂的代码。
- **合约使用经过检查的算术运算。** Solidity 0.8 及更高版本默认在溢出和下溢时回退；较旧的合约需要 SafeMath 来提供相同的保护。使用较旧版本编译且没有 SafeMath 的合约，或者使用 `unchecked` 块的合约，需要更高标准的审查。手动检查算术运算，特别是在 `unchecked` 块和内联汇编中。
- **合约只有少数与代币无关的函数。** 与代币无关的函数会增加合约出现问题的可能性。使用 Slither 的 [contract-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)来广泛审查合约中使用的代码。
- **代币只有一个地址。** 具有多个余额更新入口点的代币可能会破坏基于地址的内部记账（例如，`balances[token_address][msg.sender]` 可能无法反映实际余额）。

## 所有者权限 {#owner-privileges}

- **代币不可升级。** 可升级合约可能会随着时间的推移改变其规则。使用斯莱瑟的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)来确定合约是否可升级。
- **所有者具有有限的铸造能力。** 恶意或被入侵的所有者可能会滥用铸造能力。使用斯莱瑟的 [human-summary 打印工具](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)来审查铸造能力，并考虑手动审查代码。
- **代币不可暂停。** 恶意或被入侵的所有者可能会困住依赖可暂停代币的合约。手动识别可暂停的代码。
- **所有者不能将合约列入黑名单。** 恶意或被入侵的所有者可能会困住依赖带有黑名单功能代币的合约。手动识别黑名单功能。
- **代币背后的团队是公开的，并且可以对滥用行为负责。** 具有匿名开发团队或位于法律避风港的合约应需要更高标准的审查。

## 代币稀缺性 {#token-scarcity}

审查代币稀缺性问题需要手动审查。检查以下情况：

- **没有用户拥有大部分供应量。** 如果少数用户拥有大部分代币，他们可以根据代币的重新分配来影响操作。
- **总供应量充足。** 总供应量低的代币很容易被操纵。
- **代币分布在多个交易所。** 如果所有代币都在一个交易所，交易所被入侵可能会危及依赖该代币的合约。
- **用户了解大额资金或闪电贷的相关风险。** 依赖代币余额的合约必须仔细考虑拥有大额资金的攻击者或通过闪电贷发起的攻击。
- **代币不允许闪电铸造。** 闪电铸造可能导致余额和总供应量大幅波动，这需要在代币操作中进行严格且全面的溢出检查。
## 已知的非标准 ERC-20 代币 {#known-non-standard-erc20-tokens}

允许与任意代币集成的协议必须注意正确处理某些众所周知的非标准 ERC-20 代币。请参阅[非标准代币列表](https://secure-contracts.com/development-guidelines/non-standard-tokens.html)，了解带有额外风险的知名代币。

## ERC-721 代币 {#erc721-tokens}

### ERC-721 一致性检查 {#erc721-conformity-checks}

某些合约的行为可能与原始 ERC 规范不同。请手动审查以下情况：

- **向 0x0 地址转账代币会回退。** 一些代币允许向 0x0 转账，并认为发送到该地址的代币已被销毁；然而，ERC-721 标准要求此类转账必须回退。
- **`safeTransferFrom` 函数使用正确的签名实现。** 一些代币合约没有实现这些函数。将 NFT 转账到这些合约之一可能会导致资产丢失。
- **如果使用了 `name`、`decimals` 和 `symbol` 函数，它们必须存在。** 这些函数在 ERC-721 标准中是可选的，可能不存在。
- **如果使用了 `decimals`，它会返回一个 `uint8(0)`。** 其他值无效。
- **`name` 和 `symbol` 函数可以返回空字符串。** 标准允许这种行为。
- **如果 `tokenId` 无效或指向已销毁的代币，`ownerOf` 函数会回退。** 该函数不能返回 0x0。这是标准要求的行为，但可能并不总是正确实现。
- **NFT 的转账会清除其授权。** 这是标准要求的。
- **NFT 的代币 ID 在其生命周期内不能更改。** 这是标准要求的。

### ERC-721 标准的常见风险 {#common-risks-of-the-erc721-standard}

通过手动审查以下情况，缓解与 ERC-721 合约相关的风险：

- **考虑了 `onERC721Received` 回调。** 转账函数中的外部调用可能导致重入，特别是当回调不明确时（例如，在 [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code) 调用中）。
- **当铸造 NFT 时，它会被安全地转账到智能合约。** 如果存在铸造函数，它的行为应该类似于 `safeTransferFrom`，并正确处理将新代币铸造到智能合约的过程，以防止资产丢失。
- **销毁代币会清除其授权。** 如果存在销毁函数，它应该清除代币之前的授权。
