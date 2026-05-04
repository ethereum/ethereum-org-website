---
title: "以太坊 Pectra 升级：EIP-7702 指南"
description: "在pectra的发布中了解更多关于7702的信息"
lang: zh
---

# Pectra 7702

## 概要 {#abstract}

EIP 7702 定义了一种向外部账户添加代码的机制。 该提案允许外部帐户，即传统以太坊帐户，获得短期的功能改进，增加了应用程序的可用性。 这是借助新的交易类型 4，把账户关联到已部署的代码上实现的。

这种新的交易类型引入了授权列表。 在列表中的每个授权元组的规定为

```
[ chain_id, address, nonce, y_parity, r, s ]
```

**address** 字段表示委托目标（即已经部署好的字节码，外部账户会调用它）
**chain_id** 字段将授权限定在某一条特定链上（填 0 则表示适用于所有链）
**nonce** 将授权限定在某一个特定的账户 nonce 上
(**y_parity, r, s**) 是授权元组的签名，定义为 keccak(0x05 || rlp([chain_id, address, nonce]))，由发起授权的外部账户的私钥签发（这个签名也称为授权）

可以通过将委托权限分配给空地址来重置委托。

外部账户的私钥在委托后仍对账户拥有完全控制权。 例如，委托给 Safe 并不会使帐户变成多重签名帐户，因为仍然存在一个可以绕过任何签名策略的单一密钥。 未来，开发者在设计时应假设系统中的任何参与者都可能是一个智能合约。 对于智能合约开发者而言， `tx.origin` 不再能被视为一定指向一个外部账户。

## 最佳实践 {#best-practices}

**抽象账户**：委托合约应与以太坊更广泛的账户抽象（AA）标准保持一致，以实现最大兼容性。 尤其是，它理想情况下应当符合或兼容 ERC-4337 标准。

**无许可且抗审查的设计**：以太坊强调任何人都能自由参与。 委托合约**不得**硬编码或依赖任何单一的“可信”中继器或服务。 如果中继器离线，这将导致账户无法使用。 批量处理功能（例如批准+转账）可以由外部账户自身使用，无需中继器。 对于希望使用 7702 启用的高级功能（Gas代付、隐私保护提现）的应用程序开发者，您需要一个中继器。 虽然存在不同的中继器结构，我们仍推荐使用指向至少 [entry point 0.8](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 的 [4337 bundlers](https://www.erc4337.io/bundlers)，原因如下：

- 他们提供标准化的接口用于中继
- 包含内置的支付系统
- 确保向前兼容性
- 可通过[公共内存池](https://notes.ethereum.org/@yoav/unified-erc-4337-mempool)支持抗审查功能
- 可以要求初始化函数仅被 [EntryPoint](https://github.com/eth-infinitism/account-abstraction/releases/tag/v0.8.0) 调用

换句话说，只要能够提供账户所需的有效签名或UserOperation，任何人都可以担任交易发起人或中继者。 这确保了抗审查性：如果不需要自定义基础设施，用户的交易就不会被恶意中继随意阻断。 例如，[MetaMask 的委托工具包](https://github.com/MetaMask/delegation-framework/releases/tag/v1.3.0) 可以明确地与任意链上的任何 ERC-4337 打包器或支付代理配合使用，而无需依赖于 MetaMask 专用服务器。

**去中心化应用通过钱包接口集成**：

由于钱包只会将特定的委托合约列入白名单来支持 EIP-7702，因此 dApp 不应该指望自己能直接向用户请求 7702 授权。 相反，集成应通过标准化的钱包接口实现：

- **ERC-5792 (`wallet_sendCalls`)**：允许去中心化应用程序请求钱包执行批量调用，从而实现批量交易和 gas 抽象等功能。

- **ERC-6900**：允许去中心化应用程序通过钱包管理的模块利用模块化智能账户功能，例如会话密钥和账户恢复功能。

通过使用这些接口，去中心化应用程序可以访问由 EIP-7702 提供的智能合约帐户功能，而无需直接管理委托，这确保了不同钱包实现之间的兼容性和安全性。

> 注意：目前尚无标准化方法允许去中心化应用直接请求 7702 授权签名。 去中心化应用程序必须依赖特定的钱包接口（如ERC-6900）才能利用EIP-7702的特性。

更多有关信息：

- [ERC-5792 规范](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-5792.md)
- [ERC-6900 规范](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-6900.md)

**避免单一服务锁定**：与上述原则一致，一个良好的实现应当保持服务商中立并具备互操作性。 这通常意味着遵循智能账户的新兴标准。 例如，[Alchemy 的模块化帐户](https://github.com/alchemyplatform/modular-account) 使用 ERC-6900 标准构建模块化智能合约帐户，并以“无需许可的互操作性使用”作为其设计理念。

**隐私保护**：尽管链上隐私有限，委托合约仍应尽量减少数据暴露和可链接性。 这可以通过支持一些功能来实现，例如使用 ERC-20 代币支付 gas (用户无需持有公共 ETH 余额，这提升了隐私和用户体验) 以及一次性会话密钥 (减少对单一长期密钥的依赖)。 例如，EIP-7702 允许通过赞助交易使用代币支付 gas，而良好的实现将使此类支付代理易于集成，而不会泄露多余的信息。 此外，对某些批准进行链下委托 (使用在链上验证的签名) 意味着使用用户主密钥的链上交易更少，有助于保护隐私。 需要使用中继器的账户会迫使用户透露其 IP 地址。 公共内存池对这一点做出了改进，当一笔交易或 UserOp 在内存池中传播时，你无法判断它是源自发送它的 IP，还是仅通过 p2p 协议经过此 IP 中继的。

**可扩展性和模块安全性**：账户实现应具备可扩展性，以便能够随着新功能和安全改进的推出而不断演进。 EIP-7702 原生支持可升级性 (由于外部账户总是可以将委托给未来的新合约以升级其逻辑)。 除了可升级性，良好的设计还应该支持模块化——例如针对不同签名方案或花费策略的插件模块——而无需完全重新部署。 Alchemy 的账户套件就是一个典型的例子，它允许开发者安装验证模块（适用于不同类型的签名，如 ECDSA、BLS 等） 以及用于自定义逻辑的执行模块。 为了在启用 EIP-7702 的帐户中实现更高的灵活性和安全性，建议开发者委托至代理合约而非直接指向特定实现合约。 这种方法允许实现无缝升级和模块化，而无需为每次更改额外申请 EIP-7702 授权。

代理模式的优势：

- **可升级性**：通过将代理指向新的实现合约来更新合约逻辑。

- **自定义初始化逻辑**：在代理中加入初始化函数，以安全地设置非必要的状态变量。

例如，[SafeEIP7702Proxy](https://docs.safe.global/advanced/eip-7702/7702-safe) 展示了如何利用代理安全地初始化和管理 EIP-7702 兼容的帐户委托。

代理模式的缺点：

- **对外部方的依赖**：您必须依赖外部团队来避免升级到不安全的合约。

## 安全考量 {#security-considerations}

**重入保护**：随着 EIP-7702 委托的引入，用户的帐户可以在外部帐户 (EOA) 和智能合约 (SC) 之间动态切换。 这种灵活性使账户既能发起交易，又能成为调用的目标。 因此，在帐户调用自身并进行外部调用的场景中，`msg.sender` 将等于 `tx.origin`，这破坏了一些此前依赖于 `tx.origin` 始终为外部帐户的安全假设。

对于智能合约开发者而言，`tx.origin` 不再能被视为一定指向一个外部账户。 同样地，使用 `msg.sender == tx.origin` 作为防范重入攻击的防护措施，已不再是一种可靠的策略。

未来，开发者在设计时应假设系统中的任何参与者都可能是一个智能合约。 或者，他们可以使用带有 `nonReentrant` 修饰符模式的重入防护，来实现显示的重入保护。 我们建议使用经过审计的修饰符，如 [Open Zeppelin 的重入保护](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/ReentrancyGuard.sol)。 他们还可以使用一个[临时存储变量](https://docs.soliditylang.org/en/latest/internals/layout_in_storage.html)。

**初始化安全考虑事项**

实现 EIP-7702 委托合约会带来特定的安全挑战，尤其是与初始化过程相关的部分。 当初始化函数（`init`）与委托过程一起执行时，会出现一个关键漏洞。 在这种情况下，抢先交易者可能会截获委托签名，并使用篡改后的参数执行 `init` 函数，从而可能使其接管帐户。

在尝试在不修改初始化机制的情况下通过 EIP-7702 使用现有的智能合约帐户 (SCA) 实现时，这一风险尤为突出。

缓解初始化漏洞的解决方案

- 使用 `initWithSig`
  用 `initWithSig` 函数替换标准的 `init` 函数，该函数要求用户对初始化参数进行签名。 此方法确保初始化操作仅在获得用户明确同意后方可进行，从而降低未经授权的初始化风险。

- 使用 ERC-4337 的 EntryPoint  
  要求初始化函数只能由 ERC-4337 EntryPoint 合约调用。 该方法利用 ERC-4337 提供的标准化验证和执行框架，为初始化过程增添了一层额外的安全保障。  
  _(见: [Safe 文档](https://docs.safe.global/advanced/eip-7702/7702-safe))_

通过采用这些解决方案，开发者可以增强 EIP-7702 委托合约的安全性，防止在初始化阶段可能发生的抢先交易攻击。

**存储冲突** 委托代码不会清除现有存储。 在从一个委托合约迁移到另一个委托合约时，前一个合约的剩余数据将保留。 如果新合约使用相同的存储槽但对其进行不同解读，可能会导致意外行为。 例如，如果最初的委托指向一个存储插槽代表 `bool` 的合约，而后续的委托指向同一存储插槽代表 `uint` 的合约，这种不匹配可能导致不可预测的结果。

**钓鱼攻击风险** 随着 EIP-7702 委托机制的实施，用户账户中的资产可能完全由智能合约控制。 如果用户在不知情的情况下将账户授权给恶意合约，攻击者便可轻松获取控制权并盗取资金。 当使用 `chain_id=0` 时，委托将应用于所有链。 只能委托给不可变合约 (永远不要委托给代理合约)，并且只能委托给使用 CREATE2 部署的合约 (使用标准 initcode——非变形合约)，以确保部署者无法在其他地方向同一地址部署不同的合约。 否则，您的委托将使您的账户在所有其他 EVM 链上面临风险。

当用户执行委托签名时，接收委托的目标合约应以清晰醒目的方式显示，以帮助降低钓鱼攻击风险。

**最小化可信面与安全性**：在提供灵活性的同时，委托合约应该保持其核心逻辑简洁且可供审计。 该合约实际上是用户外部地址的扩展，因此任何漏洞都可能导致灾难性后果。 实现应遵循智能合约安全社区的最佳实践。 例如，构造函数或初始化函数必须小心保护——正如 Alchemy 所强调的，如果在 7702 下使用代理模式，未受保护的初始化函数可能允许攻击者接管帐户。 团队应努力保持链上代码的简洁性：Ambire 的 7702 合约仅包含约 200 行 Solidity 代码，通过刻意简化复杂性来减少 bug。 必须在功能丰富的逻辑与简洁易于审计之间取得平衡。

### 已知的实现 {#known-implementations}

由于EIP 7702的特性，建议钱包在协助用户将代币委托给第三方合约时保持谨慎。 以下是已知经过审计的实现列表：

| 合约地址                                       | 来源                                                                                                                            | 审计                                                                                                                                                        |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0x000000009B1D0aF20D8C6d0A44e162d11F9b8f00 | [Uniswap/calibur](https://github.com/Uniswap/calibur)                                                                         | [审计](https://github.com/Uniswap/calibur/tree/main/audits)                                                                                                 |
| 0x69007702764179f14F51cdce752f4f775d74E139 | [alchemyplatform/modular-account]                                         | [审计](https://github.com/alchemyplatform/modular-account/tree/develop/audits)                                                                              |
| 0x5A7FC11397E9a8AD41BF10bf13F22B0a63f96f6d | [AmbireTech/ambire-common](https://github.com/AmbireTech/ambire-common/blob/feature/eip-7702/contracts/AmbireAccount7702.sol) | [审计](https://github.com/AmbireTech/ambire-common/tree/feature/eip-7702/audits)                                                                            |
| 0x63c0c19a282a1b52b07dd5a65b58948a07dae32b | [MetaMask/delegation-framework](https://github.com/MetaMask/delegation-framework)                                             | [审计](https://github.com/MetaMask/delegation-framework/tree/main/audits)                                                                                   |
| 0x4Cd241E8d1510e30b2076397afc7508Ae59C66c9 | [以太坊基金会帐户抽象团队](https://github.com/eth-infinitism/account-abstraction/blob/develop/contracts/accounts/Simple7702Account.sol)   | [审计](https://github.com/eth-infinitism/account-abstraction/blob/develop/audits/SpearBit%20Account%20Abstraction%20Security%20Review%20-%20Mar%202025.pdf) |
| 0x17c11FDdADac2b341F2455aFe988fec4c3ba26e3 | [Luganodes/Pectra-Batch-Contract](https://github.com/Luganodes/Pectra-Batch-Contract)                                         | [审计](https://certificate.quantstamp.com/full/luganodes-pectra-batch-contract/23f0765f-969a-4798-9edd-188d276c4a2b/index.html)                             |

## 硬件钱包使用指南 {#hardware-wallet-guidelines}

硬件钱包不应随意开放委托功能。 硬件钱包领域的主流观点是使用一份可信的委托合约列表。 我们建议允许上述已知的实现方式，并根据具体情况考虑其他实现方式。 将您的外部账户委托给合约会赋予其对所有资产的控制权，因此硬件钱包在实现 7702 协议时应格外谨慎。

### 配套应用的集成场景 {#integration-scenarios-for-companion-apps}

#### 被动模式 {#lazy}

由于外部账户依然像往常一样运作，因此不需要做任何额外操作。

注意：某些资产可能会被委托代码自动拒绝，例如 ERC-1155 NFT，支持团队应该了解这一点。

#### 感知模式 {#aware}

通过检查代码，通知用户其外部账户当前存在委托关系，并可选择性地提供移除该委托的功能。

#### 普通委托 {#common-delegation}

硬件提供商会将已知的委托合约列入白名单，并在配套软件中实现对它们的支持。 建议选择完全支持 ERC-4337 的合约。

对于被委托到其他合约的外部账户，则会按标准外部账户来处理。

#### 自定义委托 {#custom-delegation}

硬件提供商使用自己的委托合约，并将其添加到列表中，同时在配套软件中实现对其支持。 建议构建一个完全支持 ERC 4337 的合约。

对于被委托到其他合约的外部账户，则会按标准外部账户来处理。
