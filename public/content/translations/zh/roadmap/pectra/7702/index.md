---
title: 佩克特拉 7702
metaTitle: 佩克特拉 7702 指南
description: 了解有关佩克特拉版本中 7702 的更多信息
lang: zh
---

## 摘要 {#abstract}

EIP-7702 定义了一种向外部拥有账户（EOA）添加代码的机制。该提案允许 EOA（传统的以太坊账户）获得短期的功能改进，从而提高应用程序的可用性。这是通过使用一种新的交易类型（类型 4）设置一个指向已部署代码的指针来实现的。

这种新的交易类型引入了一个授权列表。列表中的每个授权元组定义为

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** 是委托（EOA 将使用的已部署字节码）
**chain_id** 将授权锁定到特定链（或 0 表示所有链）
**nonce** 将授权锁定到特定账户随机数
(**y_parity, r, s**) 是授权元组的签名，定义为适用该授权的 EOA（也称为授权方）的私钥对 keccak(0x05 || rlp ([chain_id ,address, nonce])) 的签名

可以通过委托给空地址来重置委托。

委托后，EOA 的私钥保留对账户的完全控制权。例如，委托给 Safe 并不会使账户变成多重签名，因为仍然存在一个可以绕过任何签名策略的单一密钥。展望未来，开发者在设计时应假设系统中的任何参与者都可能是智能合约。对于智能合约开发者来说，假设 `tx.origin` 指代 EOA 已经不再安全。

## 最佳实践 {#best-practices}

**账户抽象**：委托合约应与以太坊更广泛的账户抽象（AA）标准保持一致，以最大限度地提高兼容性。特别是，它最好符合或兼容 ERC-4337。

**无需许可和抗审查设计**：以太坊重视无需许可的参与。委托合约绝不能硬编码或依赖任何单一的“受信任”中继器或服务。如果中继器离线，这将导致账户变砖（无法使用）。像批量处理（例如 approve+transferFrom）这样的功能可以由 EOA 本身使用，而无需中继器。对于希望使用 7702 启用的高级功能（Gas 抽象、保护隐私的提款）的应用程序开发者，您将需要一个中继器。虽然存在不同的中继器架构，但我们的建议是使用指向至少 [入口点 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 的 [4337 捆绑器](https://www.erc4337.io/bundlers)，因为：

- 它们为中继提供了标准化接口
- 包含内置的代付合约系统
- 确保向前兼容性
- 可以通过[公共内存池](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)支持抗审查性
- 可以要求 init 函数只能从 [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 调用

换句话说，任何人只要提供来自账户所需的有效签名或用户操作（UserOperation），就应该能够充当交易赞助者/中继器。这确保了抗审查性：如果不需要自定义基础设施，用户的交易就不会被充当看门人的中继器任意阻止。例如，[梅塔马斯克的委托工具包](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0)明确支持任何链上的任何 ERC-4337 捆绑器或代付合约，而不是要求使用梅塔马斯克特定的服务器。

**通过钱包接口集成去中心化应用 (dapp)**：

鉴于钱包会将特定的 EIP-7702 委托合约列入白名单，dapp 不应期望直接请求 7702 授权。相反，集成应通过标准化的钱包接口进行：

- **ERC-5792 (`wallet_sendCalls`)**：允许 dapp 请求钱包执行批量调用，从而促进交易批量处理和 Gas 抽象等功能。

- **ERC-6900**：允许 dapp 通过钱包管理的模块利用模块化智能账户功能，例如会话密钥和账户恢复。

通过利用这些接口，dapp 可以访问 EIP-7702 提供的智能账户功能，而无需直接管理委托，从而确保跨不同钱包实现的兼容性和安全性。

> 注意：目前没有标准化的方法供 dapp 直接请求 7702 授权签名。dapp 必须依赖特定的钱包接口（如 ERC-6900）来利用 EIP-7702 的功能。

了解更多信息：

- [ERC-5792 规范](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 规范](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**避免供应商锁定**：与上述内容一致，一个好的实现应该是供应商中立且可互操作的。这通常意味着要遵守新兴的智能账户标准。例如，[Alchemy 的模块化账户](https://github.com/alchemyplatform/modular-account)使用 ERC-6900 标准来实现模块化智能账户，并在设计时考虑了“无需许可的可互操作使用”。

**隐私保护**：虽然链上隐私有限，但委托合约应努力将数据暴露和可链接性降至最低。这可以通过支持使用 ERC-20 代币支付 Gas（这样用户就不需要维持公开的 ETH 余额，从而改善隐私和用户体验）以及一次性会话密钥（减少对单一长期密钥的依赖）等功能来实现。例如，EIP-7702 允许通过赞助交易使用代币支付 Gas，一个好的实现将使集成此类代付合约变得容易，而不会泄露不必要的信息。此外，某些授权的链下委托（使用在链上验证的签名）意味着使用用户主密钥进行的链上交易更少，这有助于保护隐私。需要使用中继器的账户会迫使用户暴露其 IP 地址。公共内存池（PublicMempools）改善了这一点，当交易/用户操作（UserOp）在内存池中传播时，你无法分辨它是源自发送它的 IP，还是仅仅通过 p2p 协议通过它进行中继。

**可扩展性和模块化安全**：账户实现应该是可扩展的，以便它们能够随着新功能和安全改进而发展。EIP-7702 本身就支持可升级性（因为 EOA 始终可以在未来委托给新合约以升级其逻辑）。除了可升级性之外，一个好的设计还允许模块化——例如，用于不同签名方案或支出策略的插件模块——而无需完全重新部署。Alchemy 的 Account Kit 就是一个很好的例子，它允许开发者安装验证模块（用于 ECDSA、BLS 等不同签名类型）和用于自定义逻辑的执行模块。为了在启用 EIP-7702 的账户中实现更大的灵活性和安全性，鼓励开发者委托给代理合约，而不是直接委托给特定的实现。这种方法允许无缝升级和模块化，而无需为每次更改进行额外的 EIP-7702 授权。

代理模式的优点：

- **可升级性**：通过将代理指向新的实现合约来更新合约逻辑。

- **自定义初始化逻辑**：在代理中合并初始化函数，以安全地设置必要的状态变量。

例如，[SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) 演示了如何利用代理在兼容 EIP-7702 的账户中安全地初始化和管理委托。

代理模式的缺点：

- **依赖外部参与者**：你必须依赖外部团队不升级到不安全的合约。

## 安全注意事项 {#security-considerations}

**重入保护**：随着 EIP-7702 委托的引入，用户的账户可以在外部拥有账户（EOA）和智能合约（SC）之间动态切换。这种灵活性使账户既能发起交易，又能成为调用的目标。因此，在账户调用自身并进行外部调用的场景中，`msg.sender` 将等于 `tx.origin`，这破坏了以前依赖于 `tx.origin` 始终是 EOA 的某些安全假设。

对于智能合约开发者来说，假设 `tx.origin` 指代 EOA 已经不再安全。同样，使用 `msg.sender == tx.origin` 作为防范重入攻击的保护措施也不再是可靠的策略。

展望未来，开发者在设计时应假设系统中的任何参与者都可能是智能合约。或者，他们可以使用带有 `nonReentrant` 修饰符模式的重入保护来实现显式的重入保护。我们建议遵循经过审计的修饰符，例如 [OpenZeppelin 的重入保护](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol)。他们也可以使用[瞬态存储变量](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)。

**初始化安全注意事项**

实现 EIP-7702 委托合约会带来特定的安全挑战，特别是关于初始化过程。当初始化函数（`init`）与委托过程原子耦合时，就会出现一个严重的漏洞。在这种情况下，抢跑者可能会拦截委托签名并使用更改后的参数执行 `init` 函数，从而可能控制该账户。

当尝试将现有的智能合约账户（SCA）实现与 EIP-7702 一起使用而不修改其初始化机制时，这种风险尤为突出。

**缓解初始化漏洞的解决方案**

- 实现 `initWithSig`  
  将标准的 `init` 函数替换为要求用户对初始化参数进行签名的 `initWithSig` 函数。这种方法确保初始化只能在用户明确同意的情况下进行，从而降低未经授权的初始化风险。

- 利用 ERC-4337 的 EntryPoint  
  要求初始化函数只能从 ERC-4337 EntryPoint 合约调用。此方法利用了 ERC-4337 提供的标准化验证和执行框架，为初始化过程增加了一层额外的安全性。  
  _（参见：[Safe 文档](https://docs.safe.global/advanced/eip-7702/7702-safe)）_

通过采用这些解决方案，开发者可以增强 EIP-7702 委托合约的安全性，防范初始化阶段潜在的抢跑攻击。

**存储冲突**：委托代码不会清除现有的存储。当从一个委托合约迁移到另一个委托合约时，前一个合约的残留数据仍然存在。如果新合约使用相同的存储时隙但对其解释不同，则可能会导致意外行为。例如，如果最初的委托是给一个存储时隙代表 `bool` 的合约，而随后的委托是给一个相同时隙代表 `uint` 的合约，这种不匹配可能会导致不可预测的结果。

**网络钓鱼风险**：随着 EIP-7702 委托的实施，用户账户中的资产可能完全由智能合约控制。如果用户在不知情的情况下将其账户委托给恶意合约，攻击者就可以轻易获得控制权并窃取资金。当使用 `chain_id=0` 时，委托将应用于所有链 ID。只委托给不可变的合约（绝不委托给代理），并且只委托给使用 CREATE2（带有标准 initcode - 没有变形合约）部署的合约，这样部署者就不能在其他地方向同一地址部署不同的东西。否则，你的委托会使你的账户在所有其他 EVM 链上面临风险。

当用户执行委托签名时，应清晰醒目地显示接收委托的目标合约，以帮助降低网络钓鱼风险。

**最小化受信任面与安全性**：在提供灵活性的同时，委托合约应保持其核心逻辑最小化且可审计。该合约实际上是用户 EOA 的扩展，因此任何缺陷都可能是灾难性的。实现应遵循智能合约安全社区的最佳实践。例如，构造函数或初始化函数必须得到仔细保护——正如 Alchemy 所强调的，如果在 7702 下使用代理模式，不受保护的初始化器可能会让攻击者接管账户。团队应致力于保持链上代码简单：Ambire 的 7702 合约只有大约 200 行 Solidity 代码，刻意将复杂性降至最低以减少错误。必须在功能丰富的逻辑和易于审计的简单性之间取得平衡。

### 已知实现 {#known-implementations}

由于 EIP-7702 的性质，建议钱包在帮助用户委托给第三方合约时要谨慎。下面列出了一些经过审计的已知实现：

| 合约地址                                   | 来源                                                                                                                                       | 审计                                                                                                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [尤尼斯瓦普/calibur](https://github.com/Uniswap/calibur)                                                                                      | [审计](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account](https://github.com/alchemyplatform/modular-account)                                                      | [审计](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol)              | [审计](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                                          | [审计](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [以太坊基金会 AA 团队](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol) | [审计](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                                      | [审计](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## 硬件钱包指南 {#hardware-wallet-guidelines}

硬件钱包不应暴露任意委托。硬件钱包领域的共识是使用受信任的委托人合约列表。我们建议允许上面列出的已知实现，并根据具体情况考虑其他实现。由于将你的 EOA 委托给合约会赋予其对所有资产的控制权，因此硬件钱包在实现 7702 的方式上应保持谨慎。

### 配套应用的集成场景 {#integration-scenarios-for-companion-apps}

#### 惰性集成 {#lazy}

由于 EOA 仍像往常一样运行，因此无需执行任何操作。

注意：某些资产可能会被委托代码自动拒绝，例如 ERC-1155 NFT，支持团队应意识到这一点。

#### 感知集成 {#aware}

通过检查 EOA 的代码来通知用户该 EOA 已存在委托，并可选择提供移除委托的功能。

#### 通用委托 {#common-delegation}

硬件提供商将已知的委托合约列入白名单，并在软件配套应用中实现对它们的支持。建议选择完全支持 ERC-4337 的合约。

委托给其他合约的 EOA 将作为标准 EOA 处理。

#### 自定义委托 {#custom-delegation}

硬件提供商实现自己的委托合约，将其添加到列表中，并在软件配套应用中实现对其的支持。建议构建一个完全支持 ERC-4337 的合约。

委托给其他合约的 EOA 将作为标准 EOA 处理。