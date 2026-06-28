---
title: "测试智能合约"
description: "测试以太坊智能合约的技术和注意事项概述。"
lang: zh
---

像以太坊这样的公共区块链是不可变的，这使得在部署后很难更改智能合约代码。虽然存在用于执行“虚拟升级”的[合约升级模式](/developers/docs/smart-contracts/upgrading/)，但这些模式难以实现且需要社会共识。此外，升级只能在发现错误*之后*修复错误——如果攻击者首先发现了漏洞，你的智能合约就有被利用的风险。

出于这些原因，在[部署](/developers/docs/smart-contracts/deploying/)到主网之前测试智能合约是[安全](/developers/docs/smart-contracts/security/)的最低要求。有许多技术可用于测试合约和评估代码正确性；你的选择取决于你的需求。尽管如此，由不同工具和方法组成的测试套件是捕获合约代码中次要和主要安全缺陷的理想选择。

## 前提条件 {#prerequisites}

本页面解释了在部署到以太坊网络之前如何测试智能合约。它假设你熟悉[智能合约](/developers/docs/smart-contracts/)。

## 什么是智能合约测试？ {#what-is-smart-contract-testing}

智能合约测试是验证智能合约代码是否按预期工作的过程。测试有助于检查特定的智能合约是否满足可靠性、可用性和安全性的要求。

尽管方法各异，但大多数测试方法都需要使用它预期处理的一小部分数据样本来执行智能合约。如果合约对样本数据产生正确的结果，则假定其运行正常。大多数测试工具都提供了编写和执行[测试用例](https://en.m.wikipedia.org/wiki/Test_case)的资源，以检查合约的执行是否与预期结果相匹配。

### 为什么测试智能合约很重要？ {#importance-of-testing-smart-contracts}

由于智能合约通常管理高价值的金融资产，微小的编程错误可能会且经常会导致[用户遭受巨大损失](https://rekt.news/leaderboard/)。然而，严格的测试可以帮助你及早发现智能合约代码中的缺陷和问题，并在主网上线之前修复它们。

虽然在发现错误时可以升级合约，但升级很复杂，如果处理不当可能会[导致错误](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)。升级合约进一步否定了不可变性原则，并给用户增加了额外的信任假设。相反，全面的合约测试计划可以降低智能合约的安全风险，并减少在部署后执行复杂逻辑升级的需求。

## 测试智能合约的方法 {#methods-for-testing-smart-contracts}

测试以太坊智能合约的方法分为两大类：**自动化测试**和**手动测试**。自动化测试和手动测试提供了独特的优势和权衡，但你可以将两者结合起来，创建一个强大的合约分析计划。

### 自动化测试 {#automated-testing}

自动化测试使用自动检查智能合约代码执行错误的工具。自动化测试的好处在于使用[脚本](https://www.techtarget.com/whatis/definition/script?amp=1)来指导合约功能的评估。脚本化测试可以安排在最少的人工干预下重复运行，这使得自动化测试比手动测试方法更高效。

当测试具有重复性且耗时、难以手动执行、容易出现人为错误或涉及评估关键合约功能时，自动化测试特别有用。但自动化测试工具也有缺点——它们可能会遗漏某些错误并产生许多[误报](https://www.contrastsecurity.com/glossary/false-positive)。因此，将自动化测试与智能合约的手动测试结合起来是理想的选择。

### 手动测试 {#manual-testing}

手动测试是人工辅助的，在分析智能合约的正确性时，需要逐个执行测试套件中的每个测试用例。这与自动化测试不同，在自动化测试中，你可以同时对合约运行多个隔离的测试，并获得显示所有失败和通过测试的报告。

手动测试可以由单个人按照涵盖不同测试场景的书面测试计划来执行。作为手动测试的一部分，你也可以让多个人或团队在指定的时间段内与智能合约进行交互。测试人员将比较合约的实际行为与预期行为，将任何差异标记为错误。

有效的手动测试需要大量的资源（技能、时间、金钱和精力），并且由于人为错误，在执行测试时可能会遗漏某些错误。但手动测试也是有益的——例如，人工测试人员（如审计员）可能会利用直觉来检测自动化测试工具会遗漏的边缘情况。

## 智能合约的自动化测试 {#automated-testing-for-smart-contracts}

### 单元测试 {#unit-testing-for-smart-contracts}

单元测试单独评估合约功能，并检查每个组件是否正常工作。好的单元测试应该简单、运行速度快，并在测试失败时清楚地指出哪里出了问题。

单元测试有助于检查函数是否返回预期值，以及在函数执行后合约存储是否正确更新。此外，在对合约代码库进行更改后运行单元测试，可确保添加新逻辑不会引入错误。以下是运行有效单元测试的一些准则：

#### 智能合约单元测试准则 {#unit-testing-guidelines}

##### 1. 了解合约的业务逻辑和工作流程

在编写单元测试之前，了解智能合约提供哪些功能以及用户将如何访问和使用这些功能会很有帮助。这对于运行[正常路径测试](https://en.m.wikipedia.org/wiki/Happy_path)特别有用，该测试确定合约中的函数是否对有效的用户输入返回正确的输出。我们将使用这个（删减版的）[拍卖合约](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)示例来解释这个概念

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

这是一个简单的拍卖合约，旨在在竞标期间接收出价。如果 `highestBid` 增加，前一个最高出价者将收回他们的资金；一旦竞标期结束，`beneficiary` 将调用合约以获取他们的资金。

像这样的合约的单元测试将涵盖用户在与合约交互时可能调用的不同函数。例如，一个单元测试检查用户是否可以在拍卖进行时出价（即对 `bid()` 的调用成功），或者检查用户是否可以提出比当前 `highestBid` 更高的出价。

了解合约的操作工作流程也有助于编写检查执行是否满足要求的单元测试。例如，拍卖合约规定用户在拍卖结束时（即当 `auctionEndTime` 低于 `block.timestamp` 时）不能出价。因此，开发人员可能会运行一个单元测试，检查在拍卖结束时（即当 `auctionEndTime` > `block.timestamp` 时）对 `bid()` 函数的调用是成功还是失败。

##### 2. 评估与合约执行相关的所有假设

记录有关合约执行的任何假设并编写单元测试以验证这些假设的有效性非常重要。除了提供防止意外执行的保护之外，测试断言还迫使你思考可能破坏智能合约安全模型的操作。一个有用的提示是超越“正常用户测试”，编写负面测试来检查函数是否因错误的输入而失败。

许多单元测试框架允许你创建断言（说明合约能做什么和不能做什么的简单语句），并运行测试以查看这些断言在执行时是否成立。开发前面描述的拍卖合约的开发人员在运行负面测试之前，可以对其行为做出以下断言：

- 当拍卖结束或尚未开始时，用户不能出价。

- 如果出价低于可接受的阈值，拍卖合约将回退。

- 未能中标的用户将获退其资金

**注意**：测试假设的另一种方法是编写触发合约中[函数修饰符](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)的测试，特别是 `require`、`assert` 和 `if…else` 语句。

##### 3. 测量代码覆盖率

[代码覆盖率](https://en.m.wikipedia.org/wiki/Code_coverage)是一个测试指标，用于跟踪测试期间执行的代码中的分支、行和语句的数量。测试应该具有良好的代码覆盖率，以最大程度地降低未测试漏洞的风险。如果没有足够的覆盖率，你可能会错误地认为你的合约是安全的，因为所有测试都通过了，而未测试的代码路径中仍然存在漏洞。然而，记录高代码覆盖率可以确保智能合约中的所有语句/函数都经过了充分的正确性测试。

##### 4. 使用成熟的测试框架

用于运行智能合约单元测试的工具的质量至关重要。理想的测试框架是定期维护的；提供有用的功能（例如，日志记录和报告功能）；并且必须被其他开发人员广泛使用和审查过。

Solidity 智能合约的单元测试框架有不同的语言版本（主要是 JavaScript、Python 和 Rust）。请参阅以下一些指南，了解如何开始使用不同的测试框架运行单元测试：

- **[使用 Brownie 运行单元测试](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[使用 Foundry 运行单元测试](https://book.getfoundry.sh/forge/writing-tests)**
- **[使用 Waffle 运行单元测试](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[使用 Remix 运行单元测试](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[使用 Ape 运行单元测试](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[使用 Hardhat 运行单元测试](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[使用 Wake 运行单元测试](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 集成测试 {#integration-testing-for-smart-contracts}

虽然单元测试隔离地调试合约函数，但集成测试将智能合约的组件作为一个整体进行评估。集成测试可以检测由跨合约调用或同一智能合约中不同函数之间的交互引起的问题。例如，集成测试可以帮助检查[继承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和依赖注入等功能是否正常工作。

如果你的合约采用模块化架构或在执行期间与其他链上合约交互，则集成测试非常有用。运行集成测试的一种方法是在特定高度[分叉区块链](/glossary/#fork)（使用像 [Forge](https://book.getfoundry.sh/forge/fork-testing) 或 [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks) 这样的工具），并模拟你的合约与已部署合约之间的交互。

分叉的区块链的行为将类似于主网，并具有带有相关状态和余额的帐户。但它仅充当沙盒化的本地开发环境，这意味着你不需要真实的 ETH 进行交易，你的更改也不会影响真实的以太坊协议。

### 基于属性的测试 {#property-based-testing-for-smart-contracts}

基于属性的测试是检查智能合约是否满足某些已定义属性的过程。属性断言了关于合约行为的事实，这些事实在不同场景下都有望保持为真——智能合约属性的一个例子可能是“合约中的算术运算永远不会溢出或下溢”。

<strong>静态分析</strong>和**动态分析**是执行基于属性的测试的两种常见技术，两者都可以验证程序（在本例中为智能合约）的代码是否满足某些预定义的属性。一些基于属性的测试工具带有关于预期合约属性的预定义规则，并根据这些规则检查代码，而其他工具则允许你为智能合约创建自定义属性。

#### 静态分析 {#static-analysis}

静态分析器将智能合约的源代码作为输入，并输出声明合约是否满足属性的结果。与动态分析不同，静态分析不涉及执行合约来分析其正确性。相反，静态分析推理智能合约在执行期间可能采取的所有可能路径（即，通过检查源代码的结构来确定它在运行时的合约操作意味着什么）。

[代码检查 (Linting)](https://www.perforce.com/blog/qac/what-is-linting) 和[静态测试](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)是对合约运行静态分析的常用方法。两者都需要分析合约执行的低级表示，例如编译器输出的[抽象语法树](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)和[控制流图](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)。

在大多数情况下，静态分析有助于检测安全问题，例如在合约代码中使用不安全的结构、语法错误或违反编码标准。然而，众所周知，静态分析器在检测更深层次的漏洞时通常不够完善，并且可能会产生过多的误报。

#### 动态分析 {#dynamic-analysis}

动态分析生成符号输入（例如，在[符号执行](https://en.m.wikipedia.org/wiki/Symbolic_execution)中）或具体输入（例如，在[模糊测试](https://owasp.org/www-community/Fuzzing)中）到智能合约函数，以查看是否有任何执行跟踪违反了特定属性。这种形式的基于属性的测试与单元测试的不同之处在于，测试用例涵盖多个场景，并且由程序处理测试用例的生成。

[模糊测试](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing)是验证智能合约中任意属性的动态分析技术的一个例子。模糊测试器使用定义输入值的随机或格式错误的变体来调用目标合约中的函数。如果智能合约进入错误状态（例如，断言失败的状态），则会标记该问题，并在报告中生成将执行推向易受攻击路径的输入。

模糊测试对于评估智能合约的输入验证机制非常有用，因为对意外输入处理不当可能会导致意外执行并产生危险影响。这种形式的基于属性的测试在许多方面都是理想的：

1. **编写涵盖许多场景的测试用例很困难。** 属性测试只需要你定义一个行为和一个用于测试该行为的数据范围——程序会根据定义的属性自动生成测试用例。

2. **你的测试套件可能无法充分涵盖程序内的所有可能路径。** 即使覆盖率达到 100%，也有可能遗漏边缘情况。

3. **单元测试证明合约对样本数据执行正确，但合约对样本外输入是否执行正确仍然未知。** 属性测试使用给定输入值的多种变体执行目标合约，以查找导致断言失败的执行跟踪。因此，属性测试为合约对广泛的输入数据类别的正确执行提供了更多保证。

### 运行智能合约基于属性的测试的准则 {#running-property-based-tests}

运行基于属性的测试通常从定义要在智能合约中验证的属性（例如，不存在[整数溢出](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)）或属性集合开始。在编写属性测试时，你可能还需要定义一个值范围，程序可以在该范围内为交易输入生成数据。

正确配置后，属性测试工具将使用随机生成的输入执行你的智能合约函数。如果存在任何断言违规，你应该会收到一份报告，其中包含违反正在评估的属性的具体输入数据。请参阅以下一些指南，开始使用不同的工具运行基于属性的测试：

- **[使用斯莱瑟 (Slither) 对智能合约进行静态分析](https://github.com/crytic/slither)**
- **[使用 Wake 对智能合约进行静态分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[使用 Brownie 进行基于属性的测试](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[使用 Foundry 对合约进行模糊测试](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[使用埃基德纳 (Echidna) 对合约进行模糊测试](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[使用 Wake 对合约进行模糊测试](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[使用曼蒂科尔 (Manticore) 对智能合约进行符号执行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[使用 Mythril 对智能合约进行符号执行](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 智能合约的手动测试 {#manual-testing-for-smart-contracts}

智能合约的手动测试通常在运行自动化测试之后的开发周期后期进行。这种形式的测试将智能合约作为一个完全集成的产品进行评估，以查看其是否按照技术要求中的规定执行。

### 在本地区块链上测试合约 {#testing-on-local-blockchain}

虽然在本地开发环境中执行的自动化测试可以提供有用的调试信息，但你会想知道你的智能合约在生产环境中的表现如何。然而，部署到以太坊主链会产生 Gas 费用——更不用说如果你的智能合约仍然存在错误，你或你的用户可能会损失真金白银。

建议在本地区块链（也称为[开发网络](/developers/docs/development-networks/)）上测试你的合约，作为在主网上测试的替代方案。本地区块链是在你的计算机上本地运行的以太坊区块链的副本，它模拟了以太坊执行层的行为。因此，你可以对交易进行编程以与合约交互，而不会产生大量开销。

在本地区块链上运行合约作为一种手动集成测试形式可能很有用。[智能合约是高度可组合的](/developers/docs/smart-contracts/composability/)，允许你与现有协议集成——但你仍然需要确保这种复杂的链上交互产生正确的结果。

[更多关于开发网络的信息。](/developers/docs/development-networks/)

### 在测试网上测试合约 {#testing-contracts-on-testnets}

测试网络或测试网的工作方式与以太坊主网完全相同，只是它使用没有现实世界价值的以太币 (ETH)。在[测试网](/developers/docs/networks/#ethereum-testnets)上部署你的合约意味着任何人都可以与之交互（例如，通过去中心化应用 (dapp) 的前端），而不会使资金面临风险。

这种形式的手动测试有助于从用户的角度评估应用程序的端到端流程。在这里，Beta 测试人员还可以执行试运行，并报告合约业务逻辑和整体功能的任何问题。

在本地区块链上测试后部署在测试网上是理想的选择，因为前者更接近以太坊虚拟机的行为。因此，许多以太坊原生项目通常在测试网上部署 dapp，以评估智能合约在现实条件下的运行情况。

[更多关于以太坊测试网的信息。](/developers/docs/development-networks/#public-beacon-testchains)

## 测试与形式化验证 {#testing-vs-formal-verification}

虽然测试有助于确认合约对某些数据输入返回预期结果，但它无法最终证明测试期间未使用的输入也是如此。因此，测试智能合约不能保证“功能正确性”（即，它不能表明程序对*所有*输入值集都按要求运行）。

形式化验证是一种通过检查程序的正式模型是否与正式规范相匹配来评估软件正确性的方法。正式模型是程序的抽象数学表示，而正式规范定义了程序的属性（即关于程序执行的逻辑断言）。

因为属性是用数学术语编写的，所以可以使用逻辑推理规则来验证系统的正式（数学）模型是否满足规范。因此，据说形式化验证工具可以产生系统正确性的“数学证明”。

与测试不同，形式化验证可用于验证智能合约的执行是否满足*所有*执行的正式规范（即它没有错误），而无需使用样本数据执行它。这不仅减少了运行数十个单元测试所花费的时间，而且在捕获隐藏漏洞方面也更有效。话虽如此，形式化验证技术根据其实现难度和实用性而处于一个范围内。

[更多关于智能合约形式化验证的信息。](/developers/docs/smart-contracts/formal-verification)

## 测试与审计和漏洞赏金 {#testing-vs-audits-bug-bounties}

如前所述，严格的测试很少能保证合约中没有错误；形式化验证方法可以提供更强的正确性保证，但目前难以使用且会产生相当大的成本。

尽管如此，你仍然可以通过获得独立的代码审查来进一步增加捕获合约漏洞的可能性。[智能合约审计](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)和[漏洞赏金](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)是让其他人分析你的合约的两种方法。

审计由在发现智能合约中的安全缺陷和不良开发实践案例方面经验丰富的审计员执行。审计通常包括测试（可能还有形式化验证）以及对整个代码库的手动审查。

相反，漏洞赏金计划通常涉及向发现智能合约漏洞并将其披露给开发人员的个人（通常被称为[白帽黑客](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)提供财务奖励。漏洞赏金类似于审计，因为它涉及要求其他人帮助发现智能合约中的缺陷。

主要区别在于，漏洞赏金计划向更广泛的开发人员/黑客社区开放，并吸引了具有独特技能和经验的广泛类别的道德黑客和独立安全专业人员。与主要依赖可能拥有有限或狭窄专业知识的团队的智能合约审计相比，这可能是一个优势。

## 测试工具和库 {#testing-tools-and-libraries}

### 单元测试工具 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - *用于 Solidity 编写的智能合约的代码覆盖率工具。*

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - *用于高级智能合约开发和测试的框架（基于 Ethers.js）。*

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - *用于测试 Solidity 智能合约的工具。在 Remix IDE 的“Solidity 单元测试”插件下工作，该插件用于编写和运行合约的测试用例。*

- **[欧本齐柏林 (OpenZeppelin) 测试助手](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - *用于以太坊智能合约测试的断言库。确保你的合约按预期运行！*

- **[Brownie 单元测试框架](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - *Brownie 利用 Pytest，这是一个功能丰富的测试框架，可让你以最少的代码编写小型测试，非常适合大型项目，并且具有高度可扩展性。*

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - *Foundry 提供 Forge，这是一个快速灵活的以太坊测试框架，能够执行简单的单元测试、Gas 优化检查和合约模糊测试。*

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - *基于 Ethers.js、Mocha 和 Chai 的智能合约测试框架。*

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - *基于 Python 的针对以太坊虚拟机的智能合约开发和测试框架。*

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - *基于 Python 的单元测试和模糊测试框架，具有强大的调试功能和跨链测试支持，利用 pytest 和 Anvil 提供最佳的用户体验和性能。*

### 基于属性的测试工具 {#property-based-testing-tools}

#### 静态分析工具 {#static-analysis-tools}

- **[斯莱瑟 (Slither)](https://github.com/crytic/slither)** - *基于 Python 的 Solidity 静态分析框架，用于查找漏洞、增强代码理解以及为智能合约编写自定义分析。*

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - *用于强制执行 Solidity 智能合约编程语言的样式和安全最佳实践的代码检查工具。*

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - *基于 Rust 的静态分析器，专为 Web3 智能合约安全和开发而设计。*

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - *基于 Python 的静态分析框架，具有漏洞和代码质量检测器、用于从代码中提取有用信息的打印机以及对编写自定义子模块的支持。*

- **[Slippy](https://github.com/fvictorio/slippy)** - *一个简单而强大的 Solidity 代码检查工具。*

#### 动态分析工具 {#dynamic-analysis-tools}

- **[埃基德纳 (Echidna)](https://github.com/crytic/echidna/)** - *快速的合约模糊测试器，用于通过基于属性的测试检测智能合约中的漏洞。*

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - *自动模糊测试工具，可用于检测智能合约代码中的属性违规。*

- **[曼蒂科尔 (Manticore)](https://manticore.readthedocs.io/en/latest/index.html)** - *用于分析 EVM 字节码的动态符号执行框架。*

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - *EVM 字节码评估工具，用于使用污点分析、混合执行分析和控制流检查来检测合约漏洞。*

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - *Scribble 是一种规范语言和运行时验证工具，允许你使用属性注释智能合约，从而允许你使用 Diligence Fuzzing 或 MythX 等工具自动测试合约。*

## 相关教程 {#related-tutorials}

- [不同测试产品的概述和比较](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [如何使用埃基德纳 (Echidna) 测试智能合约](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用曼蒂科尔 (Manticore) 查找智能合约错误](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用斯莱瑟 (Slither) 查找智能合约错误](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何模拟 Solidity 合约进行测试](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何使用 Foundry 在 Solidity 中运行单元测试](https://www.rareskills.io/post/foundry-testing-solidity)

## 延伸阅读 {#further-reading}

- [测试以太坊智能合约的深入指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [如何测试以太坊智能合约](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO 的开发者单元测试指南](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [如何像摇滚明星一样测试智能合约](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## 教程：以太坊上的智能合约测试 {#tutorials}

- [如何在本地多客户端测试网上开发和测试 dApp](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 将智能合约部署到本地测试网并执行测试的演练。_
- [如何模拟 Solidity 智能合约进行测试](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– 关于如何使用模拟数据和实现单元测试的中级教程。_
- [如何使用埃基德纳 (Echidna) 测试智能合约](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– 模糊测试和智能合约测试的高级方法。_