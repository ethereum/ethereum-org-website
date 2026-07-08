---
title: "验证智能合约"
description: "以太坊智能合约源代码验证概述"
lang: zh
---

[智能合约](/developers/docs/smart-contracts/)被设计为“无须信任”的，这意味着用户在与合约交互之前不必信任第三方（例如开发者和公司）。作为去信任化的先决条件，用户和其他开发者必须能够验证智能合约的源代码。源代码验证向用户和开发者保证，发布的合约代码与在以太坊区块链上该合约地址运行的代码完全相同。

区分“源代码验证”和“[形式化验证](/developers/docs/smart-contracts/formal-verification/)”非常重要。源代码验证（将在下文详细解释）是指验证给定的高级语言（例如 Solidity）编写的智能合约源代码编译后，与在合约地址执行的字节码相同。然而，形式化验证描述的是验证智能合约的正确性，即合约的行为符合预期。尽管取决于上下文，但合约验证通常指的是源代码验证。

## 什么是源代码验证？ {#what-is-source-code-verification}

在[以太坊虚拟机 (EVM)](/developers/docs/evm/) 中部署智能合约之前，开发者需要将合约的源代码（[用 Solidity](/developers/docs/smart-contracts/languages/) 或其他高级编程语言编写的指令）[编译](/developers/docs/smart-contracts/compiling/)为字节码。由于 EVM 无法解释高级指令，因此将源代码编译为字节码（即低级机器指令）对于在 EVM 中执行合约逻辑是必要的。

源代码验证是比较智能合约的源代码与合约创建期间使用的已编译字节码，以检测是否存在任何差异。验证智能合约很重要，因为宣传的合约代码可能与区块链上实际运行的代码不同。

智能合约验证使得人们可以通过编写合约的高级语言来调查合约的功能，而无需阅读机器代码。函数、值以及通常的变量名和注释与编译和部署的原始源代码保持一致。这使得阅读代码变得容易得多。源代码验证还为代码文档提供了条件，以便最终用户了解智能合约的设计目的。

### 什么是完全验证？ {#full-verification}

源代码中有些部分不会影响编译后的字节码，例如注释或变量名。这意味着具有不同变量名和不同注释的两个源代码都能够验证同一个合约。因此，恶意行为者可以在源代码中添加欺骗性注释或给出误导性的变量名，并使用与原始源代码不同的源代码来验证合约。

可以通过在字节码中附加额外数据来避免这种情况，这些数据可作为源代码准确性的_密码学保证_，以及编译信息的_指纹_。必要的信息可以在 [Solidity 的合约元数据](https://docs.soliditylang.org/en/v0.8.15/metadata.html)中找到，并且该文件的哈希被附加到合约的字节码中。你可以在 [metadata playground](https://playground.sourcify.dev) 中查看其实际效果。

元数据文件包含有关合约编译的信息，包括源文件及其哈希。这意味着，如果任何编译设置甚至源文件中的一个字节发生变化，元数据文件也会随之改变。因此，附加到字节码的元数据文件的哈希也会改变。这意味着如果合约的字节码加上附加的元数据哈希与给定的源代码和编译设置相匹配，我们就可以确定这与原始编译中使用的源代码完全相同，连一个字节都不差。

这种利用元数据哈希的验证类型被称为**“[完全验证](https://docs.sourcify.dev/docs/full-vs-partial-match/)”**（也称为“完美验证”）。如果元数据哈希不匹配或在验证中未被考虑，则属于“部分匹配”，这是目前验证合约更常见的方式。如果没有完全验证，就有可能[插入恶意代码](https://samczsun.com/hiding-in-plain-sight/)，而这些代码不会反映在已验证的源代码中。大多数开发者没有意识到完全验证，也没有保留他们编译的元数据文件，因此到目前为止，部分验证一直是验证合约的事实上的方法。

## 为什么源代码验证很重要？ {#importance-of-source-code-verification}

### 去信任化 {#trustlessness}

去信任化可以说是智能合约和[去中心化应用 (dapp)](/developers/docs/dapps/) 的最大前提。智能合约是“不可变的”且无法更改；合约只会执行部署时在代码中定义的业务逻辑。这意味着开发者和企业在以太坊上部署后无法篡改合约的代码。

为了使智能合约无须信任，合约代码应该可供独立验证。虽然每个智能合约的已编译字节码在区块链上都是公开可用的，但低级语言对于开发者和用户来说都很难理解。

项目通过发布其合约的源代码来减少信任假设。但这导致了另一个问题：很难验证发布的源代码是否与合约字节码匹配。在这种情况下，去信任化的价值就丧失了，因为用户必须信任开发者在将合约部署到区块链之前不会更改合约的业务逻辑（即通过更改字节码）。

源代码验证工具提供了智能合约的源代码文件与汇编代码相匹配的保证。结果是一个无须信任的生态系统，用户不会盲目信任第三方，而是在将资金存入合约之前验证代码。

### 用户安全 {#user-safety}

对于智能合约，通常涉及大量资金。这就要求在应用智能合约之前，对其逻辑进行更高的安全保证和验证。问题在于，不择手段的开发者可以通过在智能合约中插入恶意代码来欺骗用户。如果没有验证，恶意智能合约可能会存在[后门](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts)、有争议的访问控制机制、可利用的漏洞以及其他危及用户安全且无法被察觉的问题。

发布智能合约的源代码文件使得感兴趣的人（例如审计员）更容易评估合约是否存在潜在的攻击向量。通过多方独立验证智能合约，用户对其安全性有了更强的保证。

## 如何验证以太坊智能合约的源代码 {#source-code-verification-for-ethereum-smart-contracts}

[在以太坊上部署智能合约](/developers/docs/smart-contracts/deploying/)需要向一个特殊地址发送包含数据有效载荷（已编译字节码）的交易。数据有效载荷是通过编译源代码生成的，加上附加到交易数据有效载荷中的合约实例的[构造函数参数](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor)。编译是确定性的，这意味着如果使用相同的源文件和编译设置（例如编译器版本、优化器），它总是产生相同的输出（即合约字节码）。

![A diagram showing showing smart contract source code verification](./source-code-verification.png)

验证智能合约基本上包括以下步骤：

1. 将源文件和编译设置输入到编译器中。

2. 编译器输出合约的字节码。

3. 获取给定地址处已部署合约的字节码。

4. 将部署的字节码与重新编译的字节码进行比较。如果代码匹配，则使用给定的源代码和编译设置验证合约。

5. 此外，如果字节码末尾的元数据哈希匹配，则为完全匹配。

请注意，这是对验证的简化描述，有许多例外情况不适用于此，例如具有[不可变的变量](https://docs.sourcify.dev/docs/immutables/)。

## 源代码验证工具 {#source-code-verification-tools}

验证合约的传统过程可能很复杂。这就是为什么我们有工具来验证部署在以太坊上的智能合约的源代码。这些工具自动化了源代码验证的大部分工作，并为了用户的利益整理了已验证的合约。

### Etherscan {#etherscan}

尽管 Etherscan 主要作为[以太坊区块浏览器](/developers/docs/data-and-analytics/block-explorers/)而闻名，但它也为智能合约开发者和用户提供[源代码验证服务](https://etherscan.io/verifyContract)。

Etherscan 允许你从原始数据有效载荷（源代码、库地址、编译器设置、合约地址等）重新编译合约字节码。如果重新编译的字节码与链上合约的字节码（和构造函数参数）相关联，那么[合约就得到了验证](https://info.etherscan.com/types-of-contract-verification/)。

一旦验证通过，你的合约源代码将获得“已验证 (Verified)”标签，并在 Etherscan 上发布供他人审计。它还会被添加到[已验证合约](https://etherscan.io/contractsVerified/)部分——这是一个包含已验证源代码的智能合约库。

Etherscan 是最常用的合约验证工具。然而，Etherscan 的合约验证有一个缺点：它未能比较链上字节码和重新编译字节码的**元数据哈希**。因此，Etherscan 中的匹配是部分匹配。

[了解更多关于在 Etherscan 上验证合约的信息](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)。

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) 是一个开源的区块浏览器，它也为智能合约开发者和用户提供[合约验证服务](https://eth.blockscout.com/contract-verification)。作为一种开源替代方案，Blockscout 提供了验证执行方式的透明度，并允许社区做出贡献以改进验证过程。

与其他验证服务类似，Blockscout 允许你通过重新编译字节码并将其与已部署的合约进行比较来验证合约的源代码。一旦验证通过，你的合约将获得验证状态，并且源代码将公开可用以供审计和交互。已验证的合约也会列在 Blockscout 的[已验证合约库](https://eth.blockscout.com/verified-contracts)中，以便于浏览和发现。

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier) 是另一个用于验证合约的工具，它是开源且去中心化的。它不是一个区块浏览器，仅验证[不同基于 EVM 的网络](https://docs.sourcify.dev/docs/chains)上的合约。它作为公共基础设施，供其他工具在其之上构建，并旨在利用元数据文件中找到的 [ABI](/developers/docs/smart-contracts/compiling/#web-applications) 和 [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) 注释，实现更人性化的合约交互。

与 Etherscan 不同，Sourcify 支持与元数据哈希的完全匹配。已验证的合约通过 HTTP 和 [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) 在其[公共存储库](https://docs.sourcify.dev/docs/repository/)中提供，IPFS 是一种去中心化的[内容寻址](https://docs.storacha.network/concepts/content-addressing/)存储。这允许通过 IPFS 获取合约的元数据文件，因为附加的元数据哈希是一个 IPFS 哈希。

此外，人们还可以通过 IPFS 检索源代码文件，因为这些文件的 IPFS 哈希也可以在元数据中找到。可以通过其 API 或 [UI](https://sourcify.dev/#/verifier) 提供元数据文件和源文件，或者使用插件来验证合约。Sourcify 监控工具还会监听新区块上的合约创建，如果它们的元数据和源文件发布在 IPFS 上，则尝试验证这些合约。

[了解更多关于在 Sourcify 上验证合约的信息](https://soliditylang.org/blog/2020/06/25/sourcify-faq/)。

### Tenderly {#tenderly}

[Tenderly 平台](https://tenderly.co/)使 Web3 开发者能够构建、测试、监控和操作智能合约。通过将调试工具与可观测性和基础设施构建块相结合，Tenderly 帮助开发者加速智能合约的开发。为了完全启用 Tenderly 的功能，开发者需要使用几种方法[执行源代码验证](https://docs.tenderly.co/monitoring/contract-verification)。

可以私下或公开地验证合约。如果私下验证，智能合约仅对你（以及你项目中的其他成员）可见。公开验证合约会使其对使用 Tenderly 平台的所有人可见。

你可以使用[仪表板](https://docs.tenderly.co/contract-verification)、[Tenderly Hardhat 插件](https://docs.tenderly.co/contract-verification/hardhat)或 [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) 来验证你的合约。

通过仪表板验证合约时，你需要导入源文件或由 Solidity 编译器生成的元数据文件、地址/网络以及编译器设置。

使用 Tenderly Hardhat 插件可以让你以更少的精力对验证过程进行更多控制，使你能够在自动（无代码）和手动（基于代码）验证之间进行选择。

## 延伸阅读 {#further-reading}

- [验证合约源代码](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)