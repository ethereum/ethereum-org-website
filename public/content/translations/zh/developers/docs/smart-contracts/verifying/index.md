---
title: "验证智能合约"
description: "以太坊智能合约源代码验证概述"
lang: zh
---

[智能合约](/developers/docs/smart-contracts/)被设计为“去信任”的，这意味着用户在与合约交互之前，不必信任第三方（例如，开发者和公司）。 去信任的一个必要条件就是用户和其他开发者必须能够验证智能合约的源代码。 而验证源代码能够向用户和开发者保证已发布的合约代码和以太坊区块链上运行的代码相同。

区分“源代码验证”和“[形式化验证](/developers/docs/smart-contracts/formal-verification/)”很重要。 源代码验证指的是验证用高级语言（例如 Solidity）编写的智能合约的给定源代码是否能编译成在合约地址执行的相同字节码，下文将会详细说明。 而形式化验证则是验证智能合约的正确性，即验证合约行为是否符合预期。 合约验证尽管要视上下文而定，但是通常是指源代码验证。

## 什么是源代码验证？ {#what-is-source-code-verification}

在将智能合约部署在[以太坊虚拟机 (EVM)](/developers/docs/evm/) 中前，开发者会[编译](/developers/docs/smart-contracts/compiling/)合约源代码（即用 [Solidity](/developers/docs/smart-contracts/languages/) 或其他高级编程语言编写的指令）成字节码。 不过，由于以太坊虚拟机无法解释高级指令，为了在以太坊虚拟机中执行合约逻辑，必须将源代码编译成字节码（即低级机器指令）。

为检测差异，源代码验证会对智能合约的源代码与合约创建过程中使用的编译字节码进行比较处理。 由于广告合约代码与区块链上运行的代码可能不同，因此验证智能合约极为重要。

通过智能合约验证，用户无需阅读机器代码就能通过编写合约所使用的高级语言来研究合约的行为。 函数、值以及变量名和评论与编译和部署的原始源代码一般是相同的。 这就让代码阅读变得更加容易了。 源代码验证还对代码文档做出了规定，以便最终用户了解智能合约的用途。

### 什么是完全验证？ 完全验证 {#full-verification}

源代码的某些部分不会影响编译好的字节码，如评论和变量名。 也就是说两段变量名和评论都不同的源代码能验证同一份合约。 这样一来，恶意行为者便能在源代码中添加欺骗性评论或给出误导性变量名，也能用与原始源代码不同的源代码来验证合约。

要想避免这种情况，可以在字节码中添加额外数据，作为源代码准确性的_加密保障_和编译信息的_指纹_。 必要的信息可以在 [Solidity 的合约元数据](https://docs.soliditylang.org/en/v0.8.15/metadata.html)中找到，并且此文件的哈希会附加到合约的字节码中。 你可以在[元数据演练场](https://playground.sourcify.dev)中查看它的实际运行情况。

元数据文件包含有关合约的编译信息，合约中包括源文件和源文件的哈希值。 也就是说，一旦有任何源文件中的编译设置甚至是某个字节有所更改，整个元数据文件也会发生变化。 因此，附在字节码上的元数据文件的哈希值也会变化。 也就意味着只要合约的字节码和所附元数据哈希值与给定的源代码和编译设置相匹配，我们就能确定这就是原始编译中所使用的源代码，丝毫不差。

这种利用元数据哈希的验证类型被称为\*\*“[完全验证](https://docs.sourcify.dev/docs/full-vs-partial-match/)”\*\*（也称“完美验证”）。 如果元数据哈希值不匹配或是未用于验证，那就叫做“部分验证”，也是目前更为常见的合约验证方法。 如果不进行完全验证，就可能[插入恶意代码](https://samczsun.com/hiding-in-plain-sight/)，而这些代码不会在已验证的源代码中反映出来。 由于大多数开发者不了解完全验证，也不会保留自己编译的元数据文件，因此部分验证实际上才是目前验证合约的常用方法。

## 为什么源代码验证如此重要？ 源代码验证的重要性 {#importance-of-source-code-verification}

### 去信任 {#trustlessness}

去信任可以说是智能合约和[去中心化应用程序 (dapps)](/developers/docs/dapps/) 最重要的前提。 智能合约是“不可变”的，无法更改；合约只会执行部署时代码中定义的业务逻辑。 这意味着开发者和企业在以太坊上部署合约后无法篡改合约代码。

为了让智能合约去信任，合约代码应可供独立验证。 虽然每份智能合约的编译字节码都可以在区块链上公开获取，但低级语言对于开发者和用户来说都难以理解。

项目通过公布其合约源代码来减少信任假设。 但这会导致另一个问题：很难验证发布的源代码是否与合约的字节码匹配。 在这种情况下，去信任的价值便不复存在，因为用户必须相信开发者在将合约部署到区块链上之前不会更改合约的业务逻辑（即更改字节码）。

源代码验证工具可保证智能合约的源代码文件与汇编代码一致。 这样就形成了一个去信任的生态系统，用户不会盲目信任第三方，而是先验证代码再将资金存入合约。

### 用户安全 {#user-safety}

智能合约通常涉及大量质押资金。 这就需要更高的安全保证，并在使用智能合约前对其逻辑进行验证。 问题在于，不法开发者可以通过在智能合约中插入恶意代码来欺骗用户。 若不经验证，恶意智能合约可能包含[后门](https://www.trustnodes.com/2018/11/10/concerns-rise-over-backdoored-smart-contracts)、有争议的访问控制机制、可利用的漏洞，以及其他危及用户安全却未被发现的问题。

公布智能合约的源代码文件可以让审查人员等相关人员更容易评估合约，预防潜在攻击向量。 通过多方独立验证智能合约，用户可以获得更加强有力的安全性保障。

## 如何验证以太坊智能合约的源代码 {#source-code-verification-for-ethereum-smart-contracts}

[在以太坊上部署智能合约](/developers/docs/smart-contracts/deploying/)需要向一个特殊地址发送一笔包含数据负载（已编译的字节码）的交易。 数据负载由编译源代码生成，合约实例的[构造函数参数](https://docs.soliditylang.org/en/v0.8.14/contracts.html#constructor)会附加到交易数据负载的末尾。 编译是确定性的，这意味着如果使用相同的源文件和编译设置（例如，编译器版本、优化器），它总是产生相同的输出（即合约字节码）。

![智能合约源代码验证示意图](./source-code-verification.png)

智能合约验证基本上包含以下步骤：

1. 向编译器输入源文件和编译设置。

2. 编译器输出合约字节码

3. 获取给定地址处已部署合约的字节码

4. 比较已部署的字节码与重新编译的字节码。 如果代码匹配，将通过给定的源代码和编译设置进行合约验证。

5. 此外，如果字节码末尾的元数据哈希值匹配，则将是完全匹配。

请注意，这只是对验证的简单描述，有很多例外情况（例如存在[不可变变量](https://docs.sourcify.dev/docs/immutables/)）不适用于此方法。

## 源代码验证工具 {#source-code-verification-tools}

传统的合约验证过程可能十分复杂。 因此我们需要工具来验证部署在以太坊上的智能合约源代码。 这些工具可以实现大部分源代码验证自动化，还可以管理已验证的合约，使用户受益。

### Etherscan {#etherscan}

虽然 Etherscan 主要作为[以太坊区块链浏览器](/developers/docs/data-and-analytics/block-explorers/)而闻名，但它也为智能合约开发者和用户提供[源代码验证服务](https://etherscan.io/verifyContract)。

Etherscan 允许你根据原始数据有效载荷（源代码、库地址、编译器设置、合约地址等）重新编译合约字节码。 如果重新编译的字节码与链上合约的字节码（和构造函数参数）匹配，则[该合约通过验证](https://info.etherscan.com/types-of-contract-verification/)。

一旦通过验证，你的合约源代码将获得“已验证”标签，并发布在 Etherscan 上供他人审查。 它还会被添加到[已验证合约](https://etherscan.io/contractsVerified/)部分——一个存储已验证源代码的智能合约的存储库。

Etherscan 是最常用的合约验证工具。 然而，Etherscan 的合约验证有一个缺点：它无法比较链上字节码和重新编译字节码的**元数据哈希**。 因此，Etherscan 中的匹配结果是部分匹配。

[更多关于在 Etherscan 上验证合约的信息](https://medium.com/etherscan-blog/verifying-contracts-on-etherscan-f995ab772327)。

### Blockscout {#blockscout}

[Blockscout](https://blockscout.com/) 是一个开源区块链浏览器，也为智能合约开发者和用户提供[合约验证服务](https://eth.blockscout.com/contract-verification)。 作为一个开源替代方案，Blockscout 提供了验证过程的透明性，并支持社区通过贡献来改进验证过程。

与其他验证服务类似，Blockscout 允许你通过重新编译字节码并将其与已部署的合约比较来验证合约的源代码。 一旦验证通过，你的合约将收到验证状态，并且源代码将被公开以便审计和交互。 已验证的合约也会在 Blockscout 的[已验证合约存储库](https://eth.blockscout.com/verified-contracts)中列出，以便轻松浏览和发现。

### Sourcify {#sourcify}

[Sourcify](https://sourcify.dev/#/verifier)是另一个用于验证合约的工具，它是开源和去中心化的。 它不是区块浏览器，只在[不同的基于 EVM 的网络](https://docs.sourcify.dev/docs/chains)上验证合约。 它可作为其他工具在其上构建的公共基础设施，旨在使用元数据文件中的[ABI](/developers/docs/smart-contracts/compiling/#web-applications) 和 [NatSpec](https://docs.soliditylang.org/en/v0.8.15/natspec-format.html) 注释，实现更方便用户的合约交互。

与 Etherscan 不同，Sourcify 支持与元数据哈希值完全匹配。 已验证的合约通过 HTTP 和 [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs) 在其[公共存储库](https://docs.sourcify.dev/docs/repository/)中提供，IPFS 是一种去中心化的[内容寻址](https://docs.storacha.network/concepts/content-addressing/)存储。 由于附加的元数据哈希值是 IPFS 哈希值，因此可以通过 IPFS 获取合约的元数据文件。

此外，人们还可以通过星际文件系统检索源代码文件，因为这些文件的星际文件系统哈希值也可以在元数据中找到。 可以通过其 API 或[用户界面](https://sourcify.dev/#/verifier)提供元数据文件和源文件，或使用插件来验证合约。 Sourcify 监控工具还会监查新区块上的合约创建情况，并尝试验证合约是否在 IPFS 上公布了元数据和源文件。

[更多关于在 Sourcify 上验证合约的信息](https://soliditylang.org/blog/2020/06/25/sourcify-faq/)。

### Tenderly {#tenderly}

[Tenderly 平台](https://tenderly.co/)使 Web3 开发者能够构建、测试、监控和操作智能合约。 Tenderly 将调试工具、可观测性和构建区块的基础设施相结合，帮助开发者加快智能合约的开发。 要完全启用 Tenderly 的功能，开发者需要使用多种方法来[执行源代码验证](https://docs.tenderly.co/monitoring/contract-verification)。

可以私下或公开验证合约。 如果是私下验证，智能合约只有你（和项目中的其他成员）可见。 而公开验证合约可让使用 Tenderly 平台的每个人都能看到。

你可以使用[仪表板](https://docs.tenderly.co/contract-verification)、[Tenderly Hardhat 插件](https://docs.tenderly.co/contract-verification/hardhat)或 [CLI](https://docs.tenderly.co/monitoring/smart-contract-verification/verifying-contracts-using-cli) 来验证你的合约。

通过仪表板验证合约时，需要导入源文件或 Solidity 编译器生成的元数据文件、地址/网络和编译器设置。

使用 Tenderly Hardhat 插件可以更轻松地控制验证过程，让你可以在自动（无代码）和手动（基于代码）验证之间做出选择。

## 扩展阅读{#further-reading}

- [验证合约源代码](https://programtheblockchain.com/posts/2018/01/16/verifying-contract-source-code/)
