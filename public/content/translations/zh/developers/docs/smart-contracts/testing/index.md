---
title: 测试智能合约
description: 测试以太坊智能合约的技术和注意事项概述
lang: zh
---

测试[智能合约](/developers/docs/smart-contracts/)是改善[智能合约安全](/developers/docs/smart-contracts/security/)的最重要措施之一。 与传统软件不同，智能合约通常在启动后便无法更新，因此在以太坊网络上部署合约之前必须进行严格测试。

## 什么是智能合约测试？ {#what-is-smart-contract-testing}

智能合约测试是指对智能合约进行详细的分析和评估，以在开发周期内评估其源代码的质量。 测试智能合约可以更容易地识别错误和漏洞，并降低出现软件错误的可能性，有利于避免代价高昂的漏洞利用。

智能合约测试有多种形式，不同的方法各有好处。 测试以太坊智能合约的策略可以分为两大类：**自动化测试**和**手动测试**。

### 自动化测试 {#automated-testing}

自动化测试涉及使用自动化工具对智能合约进行脚本测试。 该技术依赖于可以执行重复测试以发现智能合约缺陷的自动化软件。

与手动分析相比，自动化测试效率高，使用的资源更少，并且覆盖率更高。 自动化测试工具也可以配置测试数据，允许它们将预测的行为与实际结果进行比较。

### 手动测试 {#manual-testing}

手动测试是人工辅助的，涉及手动执行测试步骤的个人。 代码审计需要开发人员和/或审计人员检查每一行合约代码，是智能合约手动测试的一个例子。

智能合约的手动测试需要相当高的技能和大量的时间、金钱和精力投入。 此外，手动测试有时容易受到人为错误问题的影响。

然而，对智能合约应用手动测试也是有益的。 代码审计利用人类智能来发现合约代码中可能在自动化测试期间未被发现的缺陷。

手动测试你的智能合约也可以揭示代码之外存在，但仍然会影响代码的漏洞。 例如，智能合约审计可以发现因与链下组件进行有缺陷的交互而产生的漏洞。

## 为什么测试智能合约很重要？ {#benefits-of-smart-contract-testing}

测试智能合约很重要，原因如下：

### 1. 智能合约是高价值应用 {#smart-contracts-are-high-value-applications}

智能合约通常处理高价值金融资产，尤其是在[去中心化金融](/defi/)等行业，以及诸如[非同质化代币](/nft/)等有价值的项目。 因此，智能合约中的小漏洞可能而且通常会给用户带来巨大的、不可挽回的损失。 然而，综合测试可以暴露智能合约代码中的错误并降低部署前的安全风险。

### 2. 智能合约是不可变的 {#smart-contracts-are-immutable}

[以太坊虚拟机 (EVM)](/developers/docs/evm/) 中部署的智能合约默认是不可变的。 虽然传统开发者可能习惯于在发布后修复软件错误，但智能合约一旦在区块链上运行，以太坊开发就几乎没有修补安全漏洞的空间。

虽然智能合约存在可升级性机制，例如代理模式，但这些可能难以实施。 除了降低不可变性和引入复杂性之外，升级通常还需要复杂的治理流程。

在大多数情况下，升级应被视为最后的手段，除非必要，否则应避免。 在预发布阶段检测智能合约中的潜在漏洞和缺陷可减少对逻辑升级的需求。

## 智能合约的自动化测试 {#automated-testing-for-smart-contracts}

### 1. 功能测试 {#functional-testing}

功能测试验证智能合约的功能，并确保代码中的每个功能都按预期工作。 功能测试需要了解你的智能合约在特定条件下的行为方式。 然后，你可以通过使用选定值运行计算并将返回的输出与预期输出进行比较来测试每个函数。

功能测试涵盖三种方法：**单元测试**、**集成测试**和**系统测试**。

#### 单元测试

单元测试需要单独测试智能合约各个组件，确保其正确性。 单元测试简单、快速运行，并且可以清楚地了解测试失败时出了什么问题。

单元测试对于智能合约开发至关重要，尤其是当您需要向代码添加新逻辑时。 你可以验证每个函数的行为并确认它按预期执行。

运行单元测试通常需要创建*断言* — 简单、非正式的声明，指定智能合约的要求。 然后可以使用单元测试来测试每个断言，看看它在执行时是否成立。

与合约有关的断言的例子包括：

i. “只有管理员才能暂停合约”

ii. “非管理员无权铸造新的代币”

iii. “合约在出错时将会还原”

#### 集成测试

在测试层级中，集成测试的层级高于单元测试。 在集成测试中，会一起测试智能合约的独立组件们。

这种方法检测由合约的不同组件之间或跨多个合约的交互引起的错误。 如果你有一个具有多个功能的复杂合约或一个与其他合约交互的合约，你应该使用此方法。

集成测试有助于确保[继承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和依赖注入之类的功能能够正确工作。

#### 系统测试

系统测试是智能合约功能测试的最后阶段。 系统将智能合约作为一个完全集成的产品进行评估，以查看其是否按照技术要求中的规定执行。

你可以将此阶段视为从用户的角度检查智能合约的端到端流程。 对智能合约执行系统测试的一个好方法是将其部署在类似生产的环境中，例如[测试网](/developers/docs/networks/#ethereum-testnets)或[开发网络](/developers/docs/development-networks/)。

在这里，最终用户可以进行试运行并报告合约业务逻辑和整体功能的任何问题。 系统测试很重要，因为一旦合约部署到主以太网虚拟机环境中，你就无法更改代码。

### 2. 静态分析和动态分析 {#static-dynamic-analysis}

静态分析和动态分析是评估智能合约安全质量的两种自动化测试方法。 然而，这两种技术都使用不同的方法来查找合约代码中的缺陷。

#### 静态分析

静态分析在执行前检查智能合约的源代码或字节码。 这意味着你可以在不实际运行程序的情况下调试合约代码。 静态分析器可以检测以太坊智能合约中的常见漏洞并帮助遵守最佳做法。

#### 动态分析

动态分析技术需要在运行时环境中执行智能合约以识别代码中的问题。 动态代码分析器在执行期间观察合约行为，并生成已识别漏洞和属性违规的详细报告。

模糊测试是用于测试合约的动态分析技术的一个例子。 在模糊测试期间，模糊器向您的智能合约提供格式错误和无效的数据，并监控合约如何响应这些输入。

与任何程序一样，智能合约依赖于用户提供的输入来执行功能。 而且，虽然我们假设用户会提供正确的输入，但情况并非总是如此。

在某些情况下，向智能合约发送不正确的输入值可能会导致资源泄漏、崩溃，或者更糟糕的是，导致意外的代码执行。 模糊测试活动预先识别出此类问题，从而使你能够消除漏洞。

## 智能合约的手动测试 {#manual-testing-for-smart-contracts}

### 1. 代码审计 {#code-audits}

代码审计是对智能合约源代码的详细评估，以发现可能的故障点、安全漏洞和不良的开发实践。 虽然代码审计可以是自动化的，但我们在这里指的是人工辅助代码分析。

代码审计需要用攻击者的思维方式来绘制智能合约中可能的攻击向量。 即使你运行自动审计，分析每一行源代码也是编写安全智能合约的最低要求。

你还可以委托进行安全审计，为用户提供更高的智能合约安全保证。 审计受益于网络安全专业人员执行的广泛分析，并检测可能破坏智能合约功能的潜在漏洞或错误。

### 2. 漏洞奖金 {#bug-bounties}

漏洞奖金是给予个人在程序代码中发现漏洞或错误并向开发者报告的经济奖励。 漏洞奖金类似于审计，因为它涉及要求其他人帮助发现智能合约中的缺陷。 主要区别在于漏洞赏金计划对更广泛的开发人员/黑客社区开放。

漏洞赏金计划通常会吸引一大批具有独特技能和经验的道德黑客和独立安全专业人士。 与主要依赖可能拥有有限或狭窄专业知识的团队的智能合约审计相比，这可能是一个优势。

## 测试与形式化验证 {#testing-vs-formal-verification}

虽然测试有助于确认合约返回某些数据输入的预期结果，但它不能最终证明测试期间未使用的输入也是如此。 测试智能合约不能保证“功能正确性”，这意味着它不能表明程序的行为符合*所有*输入值和条件集的要求。

因此，我们鼓励开发者将**形式化验证**纳入他们评估智能合约正确性的方法中。 形式化验证使用[形式化方法](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) — 用于指定和验证软件的严格数学方法。

形式化验证被认为对智能合约很重要，因为它可以帮助开发者从形式上测试与智能合约相关的假设。 方法是创建描述智能合约属性的形式化规范并验证智能合约的形式化模型是否与规范匹配。 这种方法增加了对智能合约将仅执行其业务逻辑中定义的功能而不执行其他任何功能的信心。

[更多关于智能合约的形式化验证的信息](/developers/docs/smart-contracts/formal-verification)

## 测试工具和库 {#testing-tools-and-libraries}

### 单元测试工具 {#unit-testing-tools}

**Solid-coverage** - _适用于测试智能合约的 Solity 代码覆盖工具。_

- [GitHub](https://github.com/sc-forks/solidity-coverage)

**Waffle** - _高级智能合约开发和测试框架（基于 ethers.js）_。

- [相关文档](https://ethereum-waffle.readthedocs.io/en/latest/)
- [GitHub](https://github.com/TrueFiEng/Waffle)
- [网站](https://getwaffle.io/)

**Remix 测试** - _用于测试 Solidity 智能合约的工具。 在 Remix IDE 的“Solidity Unit Testing”插件下工作，该插件用于编写和运行合约的测试用例。_

- [相关文档](https://remix-ide.readthedocs.io/en/latest/unittesting.html)
- [GitHub](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)

**OpenZeppelin Test Helpers** - _用于以太坊智能合约测试的断言库。 确保你的合约按预期运行！_

- [GitHub](https://github.com/OpenZeppelin/openzeppelin-test-helpers)
- [相关文档](https://docs.openzeppelin.com/test-helpers)

**Truffle 智能合约测试框架** - _自动化测试框架让你的合约测试变得轻而易举。_

- [相关文档](https://trufflesuite.com/docs/truffle/testing/testing-your-contracts/)
- [网站](https://trufflesuite.com/)

**Brownie 单元测试框架** - _Brownie 利用 Pytest，一个功能丰富的测试框架，让你可以编写具有最少代码的小型测试，有效地扩展以用于大型项目，并保持高度可扩展性。_

- [相关文档](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)
- [GitHub](https://github.com/eth-brownie/brownie)

**Foundry 测试** - _Foundry 提供了 Forge，这是一个快速灵活的以太坊测试框架，能够执行简单的单元测试、燃料优化检查和合约模糊测试。_

- [GitHub](https://github.com/foundry-rs/foundry/tree/master/forge)
- [相关文档](https://book.getfoundry.sh/forge/)

**Etheno** - _全栈式以太坊测试工具，包括 JSON 远程过程调用多路复用器、分析工具包装器和测试集成工具。 Etheno 消除了在大型多合约项目中设置 Manticore 和 Echidna 等分析工具的复杂性。_

- [GitHub](https://github.com/crytic/etheno)

**Woke 开发和测试框架** - _利用类型提示、模糊测试工具、调试支持、代码覆盖和跨链测试，测试和部署 Python 脚本。_

- [相关文档](https://ackeeblockchain.com/woke/docs/latest/testing-framework/overview/)
- [Github](https://github.com/Ackee-Blockchain/woke)

### 静态分析工具 {#static-analysis-tools}

**Mythril** - _以太坊虚拟机字节码评估工具，用于使用污染分析、混合执行分析和控制流检查来检测合约漏洞。_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [相关文档](https://mythril-classic.readthedocs.io/en/master/about.html)

**Slither** - _基于 Python 的 Solidity 静态分析框架，用于查找漏洞、增强代码理解以及为智能合约编写自定义分析。_

- [GitHub](https://github.com/crytic/slither)

**Rattle** - _以太坊虚拟机字节码静态分析框架，旨在处理已部署的智能合约。_

- [GitHub](https://github.com/crytic/rattle)

### 动态分析工具 {#dynamic-analysis-tools}

**Echidna** - _快速合约模糊测试工具，利用基于属性的测试来检测智能合约中的漏洞。_

- [Github](https://github.com/crytic/echidna/)

**Harvey** - _自动化模糊测试工具，用于检测智能合约代码中的属性违规行为。_

- [网站](https://consensys.net/diligence/fuzzing/)

**Manticore** - _用于分析以太坊虚拟机字节码的动态符号执行框架。_

- [Github](https://github.com/trailofbits/manticore)
- [相关文档](https://github.com/trailofbits/manticore/wiki)

### 智能合约审计服务 {#smart-contract-auditing-services}

**ConsenSys Diligence** - _智能合约审计服务，帮助整个区块链生态系统中的项目确保其协议已准备好启动，并为保护用户而构建。_

- [网站](https://consensys.net/diligence/)

**CertiK** - _区块链安全公司，率先在智能合约和区块链网络上使用尖端的形式化验证技术。_

- [网站](https://www.certik.com/)

**Trail of Bits** - _网络安全公司，将安全研究与攻击者心态相结合，以降低风险并强化代码。_

- [网站](https://www.trailofbits.com/)

**PeckShield** - _区块链安全公司，为整个区块链生态系统的安全性、隐私性和可用性提供产品和服务。_

- [网站](https://peckshield.com/)

**QuantStamp** - _审计服务，通过安全和风险评估服务促使区块链技术的采用称为主流。_

- [网站](https://quantstamp.com/)

**OpenZeppelin** - _为分布式系统提供安全审计的智能合约安全公司。_

- [网站](https://www.openzeppelin.com/security-audits)

**Nethermind** - _Solidity 和 Cairo 审计服务，确保智能合约的完整性和跨以太坊和 Starknet 的用户安全。_

- [网站](https://nethermind.io/smart-contracts-audits)

### 漏洞奖金平台 {#bug-bounty-platforms}

**Immunefi** - _智能合约和去中心化金融项目的漏洞奖励平台，安全研究人员在该平台上审查代码、披露漏洞、获得报酬并使加密应用更加安全。_

- [网站](https://immunefi.com/)

**HackerOne** - _漏洞协调和漏洞赏金平台，将企业与渗透测试人员和网络安全研究人员联系起来。_

- [网站](https://www.hackerone.com/)

## 相关教程 {#related-tutorials}

- [Solidity 和 Truffle 持续集成设置](/developers/tutorials/solidity-and-truffle-continuous-integration-setup/)_ – 如何为 Truffle 测试设置 Travis 或 Circle CI 并搭配有用的插件。_
- [测试产品概述](/developers/tutorials/guide-to-smart-contract-security-tools/)_ — 不同测试产品的概述和比较。_
- [如何使用 Echidna 测试智能合约](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用 Manticore 查找智能合约漏洞](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用 Slither 发现智能合约漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何模拟 Solidity 合约以进行测试](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何从 Truffle 测试迁移至 OpenZeppelin 测试环境](https://docs.openzeppelin.com/test-environment/0.1/migrating-from-truffle)
- [如何在部署到网络后测试合约](https://fulldecent.blogspot.com/2019/04/testing-deployed-ethereum-contracts.html)
- [学习使用 JavaScript 开发区块链、Solidity 和全栈 Web3 (YouTube)](https://www.youtube.com/watch?v=gyMwXuJrbJQ)
- [Solidity、区块链和智能合约课程 (YouTube)](https://www.youtube.com/watch?v=M576WGiDBdQ)

## 延伸阅读 {#further-reading}

- [以太坊智能合约测试深度指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297) - _Ben Hauser_
- [如何测试以太坊智能合约](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d) - _Alex Roan_
