---
title: 测试智能合约
description: 测试以太坊智能合约的技术和注意事项概述。
lang: zh
---

公共区块链（如以太坊）是不可变的，这使得在部署后修改智能合约代码变得很困难。 虽然存在用于执行“虚拟升级”的[合约升级模式](/developers/docs/smart-contracts/upgrading/)，但这些模式很难实现，并且需要社会共识。 此外，升级只能修复_已_发现的错误 — 如果攻击者先发现了漏洞，你的智能合约就面临被利用的风险。

因此，在将智能合约[部署](/developers/docs/smart-contracts/deploying/)到主网之前进行测试是确保[安全性](/developers/docs/smart-contracts/security/)的最低要求。 有许多用于测试合约和评估代码正确性的技术，你可以根据需求进行选择。 然而，由不同工具和方法组成的测试套件很适合捕捉合约代码中的细微或重大安全缺陷。

## 前提条件 {#prerequisites}

本页面将解释如何在部署到以太坊网络之前进行智能合约测试。 我们假设你熟悉[智能合约](/developers/docs/smart-contracts/)。

## 什么是智能合约测试？ {#what-is-smart-contract-testing}

智能合约测试是验证智能合约代码是否按预期工作的过程。 测试对于检查特定智能合约是否满足可靠性、可用性和安全性的要求非常有用。

虽然具体的方法可能各不相同，但大多数测试方法都要求使用合约要处理的少量样本数据执行智能合约。 如果合约样本数据能产生正确的结果，就可以认为合约能正常运行。 大多数测试工具提供了编写和执行[测试用例](https://en.m.wikipedia.org/wiki/Test_case)的资源，用于检查合约的执行是否与预期结果相符。

### 为什么测试智能合约很重要？ {#importance-of-testing-smart-contracts}

由于智能合约通常管理高价值的金融资产，因此即使是很小的编程错误也往往会导致[用户遭受巨大的损失](https://rekt.news/leaderboard/)。 但是严格的测试可以帮助你在部署到主网之前，及早发现智能合约代码中的缺陷和问题，并进行修复。

尽管发现错误后可以对合约进行升级，但升级很复杂，而且如果处理不当可能会[导致错误](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)。 进一步升级合约会削弱不可变性原则，并给用户增加额外的信任假设。 相反，对合约进行全面测试的计划可以减轻智能合约的安全风险，并减少在部署后执行复杂逻辑升级的需求。

## 测试智能合约的方法 {#methods-for-testing-smart-contracts}

以太坊智能合约的测试方法可以分为两大类：**自动化测试**和**手动测试**。 自动化测试和手动测试各有独特的优点和权衡，但你可以将二者结合起来，创建强大的测试计划来分析你的合约。

### 自动化测试 {#automated-testing}

自动化测试使用工具来自动检查智能合约代码的执行错误。 自动化测试的好处在于使用[脚本](https://www.techtarget.com/whatis/definition/script?amp=1)来指导对合约功能的评估。 脚本化测试可以按计划重复运行，人工干预极少，因此自动化测试比手动测试更高效。

自动化测试特别适用于以下情况：测试重复且耗时；手动执行困难时；容易出现人为错误时；或涉及评估关键合约功能时。 但是自动化测试工具可能存在缺陷 — 它们可能会忽略某些错误并产生一些[误报](https://www.contrastsecurity.com/glossary/false-positive)。 因此，理想的方法是结合自动化测试与手动测试。

### 手动测试 {#manual-testing}

手动测试需要人工辅助，在分析智能合约的正确性时，涉及逐个执行测试套件中的每个测试用例。 这与自动化测试不同，在自动化测试中，你可以同时在合约上运行多个独立的测试，并获得显示所有失败和通过的测试的报告。

手动测试可以由单个人员按照包含不同测试场景的书面测试计划进行。 你还可以在指定的时间段内，让多个个人或团体与智能合约进行交互，作为手动测试的一部分。 测试人员将对比合约的实际行为与预期行为，将任何差异标记为错误。

高效的手动测试需要大量的资源（技能、时间、金钱和精力），由于人为错误的存在，在执行测试时可能会错过某些错误。 但手动测试也有好处，例如，人工测试人员（例如审计员）可以凭直觉来检测自动化测试工具可能忽略的边缘情况。

## 智能合约的自动化测试 {#automated-testing-for-smart-contracts}

### 单元测试 {#unit-testing-for-smart-contracts}

单元测试对合约功能分别进行评估，并检查每个组件是否正常工作。 良好的单元测试应该简单、运行快速，并且在测试失败时清晰地说明出了什么问题。

单元测试对于检查函数返回预期值以及在函数执行后正确更新合约存储非常有用。 此外，在更改了合约代码库后运行单元测试，可以确保添加新逻辑不会引入错误。 以下是运行有效单元测试的一些准则：

#### 智能合约单元测试的准则 {#unit-testing-guidelines}

##### 1. 理解你的合约业务逻辑和工作流程

在编写单元测试之前，了解智能合约提供的功能以及用户如何访问和使用这些函数很有帮助。 这对于运行 [happy path 测试](https://en.m.wikipedia.org/wiki/Happy_path)特别有用，该测试用于确定合约中的函数是否对有效的用户输入返回正确的输出。 我们将使用这个（简化版）的[拍卖合约](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)示例来解释此概念。

```
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

这是一个简单的拍卖合约，用于在竞标期间接收竞标。 如果 `highestBid` 增加，先前的最高出价者将收到他们的钱；一旦竞标期结束，`beneficiary` 调用合约以收取他们的钱。

对这样的合约进行的单元测试将涵盖用户在与合约交互时可能调用的不同函数。 以单元测试为例，它会检查用户是否能够在拍卖进行期间出价（即调用 `bid()` 成功），或者检查用户是否能够出高于当前 `highestBid` 的价格。

了解合约的运行流程还有助于编写单元测试，以检查执行是否满足要求。 例如，拍卖合约规定，在拍卖结束时（即当 `auctionEndTime` 小于 `block.timestamp` 时），用户无法进行竞标。 因此，开发者可能会运行一个单元测试，检查当拍卖结束时（即当 `auctionEndTime` > `block.timestamp` 时）对 `bid()` 函数的调用成功还是失败。

##### 2. 评估与合约执行相关的所有假设

重要的是记录关于合约执行的任何假设，并编写单元测试来验证这些假设的有效性。 除了提供对意外执行的保护之外，测试断言还迫使你思考可能破坏智能合约安全模型的操作。 一个有用的技巧是不仅要进行“正向测试”，还要编写负面测试，检查函数对错误的输入是否会失败。

许多单元测试框架允许你创建断言，即简单的语句，用于说明合约的能力和限制，并运行测试以验证这些断言在执行过程中是否成立。 在运行负面测试之前，对之前描述的拍卖合约进行开发的开发者可以对其行为做出以下断言：

- 当拍卖结束或尚未开始时，用户无法进行竞标。

- 如果竞价低于可接受的阈值，合约将会回滚。

- 未能赢得竞标的用户将获得其资金的退款

**注意**：测试假设的另一种方法是编写测试，触发合约中的[函数修改器](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)，特别是 `require`、`assert` 和 `if...else` 语句。

##### 3. 度量代码覆盖率

[代码覆盖率](https://en.m.wikipedia.org/wiki/Code_coverage)是一种测试指标，用于跟踪在测试过程中执行的代码分支、行数和语句数量。 测试应该具有良好的代码覆盖率，否则你可能会遇到“误报”，即合约通过了所有的测试，但代码中仍存在漏洞。 记录高代码覆盖率，可以确保智能合约中的所有语句/函数都经过了足够的正确性测试。

##### 4. 使用完善的测试框架

运行智能合约单元测试时所使用的工具质量至关重要。 理想的测试框架需经常进行维护；提供有用的功能（例如，日志记录和报告功能）；并且必须经过其他开发者广泛使用和审核。

单元测试框架用于对 Solidity 智能合约进行单元测试，提供不同语言的选择（主要是 JavaScript、Python 和 Rust）。 请参阅下面的指南，了解如何开始使用不同的测试框架运行单元测试：

- **[使用 Brownie 运行单元测试](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[使用 Foundry 运行单元测试](https://book.getfoundry.sh/forge/writing-tests)**
- **[使用 Waffle 运行单元测试](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[使用 Remix 运行单元测试](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[使用 Ape 运行单元测试](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[使用安全帽运行单元测试](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[使用 Wake 运行单元测试](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 集成测试 {#integration-testing-for-smart-contracts}

虽然单元测试可以独立调试合约函数，但集成测试会将智能合约的各个组件作为一个整体进行评估。 集成测试可以检测到跨合约调用或同一智能合约中不同函数之间的交互引起的问题。 例如，集成测试可以帮助检查诸如[继承](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)和依赖注入等功能是否正常工作。

如果合约采用模块化架构或在执行过程中与其他链上合约进行接口交互，集成测试非常有用。 一种运行集成测试的方法是在特定的高度[让区块链分叉](/glossary/#fork)（使用 [Forge](https://book.getfoundry.sh/forge/fork-testing) 或[安全帽](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)等工具），并模拟你的合约与已部署合约之间的交互。

分叉的区块链将与主网的行为类似，其帐户具有关联的状态和余额。 但是它只是一个沙盒式的本地开发环境，举例来说这意味着你不需要真正的以太币进行交易，同时你的更改也不会影响真实的以太坊协议。

### 基于属性的测试 {#property-based-testing-for-smart-contracts}

基于属性的测试是一种检查智能合约是否满足一些定义的属性的过程。 属性是关于合约行为的断言，预期其行为在不同的场景中始终保持为真。智能合约属性的一个例子可以是“合约中的算术运算永不溢出或下溢”。

**静态分析**和**动态分析**是执行基于属性的测试的两种常见技术，它们都可以验证程序代码（此例中的智能合约）是否满足一些预定义的属性。 有些基于属性的测试工具提供预定义的合约属性规则，并根据这些规则检查代码，而其他工具则允许你为智能合约创建自定义属性。

#### 静态分析 {#static-analysis}

静态分析器接受智能合约的源代码作为输入，并输出结果，声明合约是否满足某个属性 与动态分析不同，静态分析不涉及执行合约来分析其正确性。 静态分析则可以推断智能合约在执行过程中可能采取的所有路径（即通过检查源代码的结构来确定合约在运行时的操作意义）。

[Linting](https://www.perforce.com/blog/qac/what-lint-code-and-why-linting-important) 和[静态测试](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)是对合约运行静态分析的常见方法。 两者都需要分析合约执行的低级表现，例如编译器输出的[抽象语法树](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)和[控制流图](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)。

在大多数情况下，静态分析对于检测合约代码中的安全问题非常有用，例如使用不安全的结构、语法错误或违反编码标准。 然而，静态分析器通常被认为在检测更深层次的漏洞方面不够准确，并且可能会产生过多的误报。

#### 动态分析 {#dynamic-analysis}

动态分析生成智能合约函数的符号输入（例如，在[symbolic execution](https://en.m.wikipedia.org/wiki/Symbolic_execution)中）或具体输入（例如，在[fuzzing](https://owasp.org/www-community/Fuzzing)中），以查看是否存在任何执行轨迹违反特定属性。 这种基于属性的测试形式与单元测试不同，因为测试用例涵盖多种场景，并且由程序处理测试用例的生成。

[模糊测试](https://halborn.com/what-is-fuzz-testing-fuzzing/)是一种用于验证智能合约中任意属性的动态分析技术的示例。 模糊测试工具使用随机或畸形的变化调用目标合约中的函数，以对预定义的输入值进行测试。 如果智能合约进入错误状态（例如，断言失败），问题会被标记，并在生成的报告中包含驱动执行进入脆弱路径的输入。

模糊测试对于评估智能合约的输入验证机制非常有用，因为对于非预期输入的处理不当可能导致意外执行并产生危险影响。 这种基于属性的测试形式可能非常理想，原因有多种：

1. **编写涵盖多种场景的测试用例很困难。**属性测试只需要你定义一个行为和一组用于测试该行为的数据范围，程序会根据定义的属性自动生成测试用例。

2. **你的测试套件可能无法充分覆盖程序中的所有可能路径。**即使达到了 100% 的覆盖率，仍然有可能忽略一些极端情况。

3. **单元测试证明合约对于样本数据的执行是正确的，但是对于样本之外的输入能否正确执行仍然未知。**属性测试使用多个变化的给定输入值针对目标合约执行，以找到导致断言失败的执行轨迹。 因此，属性测试为合约在广泛的输入数据类别下正确执行提供了更多的保证。

### 对智能合约运行基于属性的测试的准则 {#running-property-based-tests}

运行基于属性的测试通常始于定义你希望在智能合约中进行验证的一个属性（例如，[整数溢出](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)的缺失）或一组属性。 在编写属性测试时，你可能需要定义一个数值范围，程序可以在此范围生成用于交易输入的数据。

配置正确后，属性测试工具将使用随机生成的输入执行你的智能合约函数。 如果存在任何断言违规情况，你应该获得一份报告，其中包含违反正在评估的属性的具体输入数据。 请参阅下面的指南，了解如何使用不同的工具开始运行基于属性的测试：

- **[使用 Slither 进行智能合约静态分析](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/slither#slither)**
- **[使用 Wake 进行智能合约静态分析](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[使用 Brownie 进行基于属性的测试](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[使用 Foundry 进行合约模糊测试](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[使用 Echidna 进行合约模糊测试](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[使用 Wake 进行合约模糊测试](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[使用 Manticore 完成智能合约符号执行](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[使用 Mythril 完成智能合约符号执行](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 智能合约的手动测试 {#manual-testing-for-smart-contracts}

在开发后期，经常会进行智能合约手动测试，而这类测试通常在运行自动化测试之后进行。 这种测试形式将智能合约作为一个完全集成的产品进行评估，以验证其是否按照技术要求的规定顺利运行。

### 在本地区块链上测试合约 {#testing-on-local-blockchain}

虽然在本地开发环境中进行的自动化测试可以提供有用的调试信息，但你需要了解你的智能合约在生产环境中的行为。 然而，部署到以太坊主链上会产生燃料费用，更不用说如果你的智能合约仍然存在错误，你或你的用户可能会损失真金白银。

在本地区块链（也称为[开发网络](/developers/docs/development-networks/)）测试你的合约是在主网上测试的推荐替代方法。 本地区块链是在你的计算机本地运行的以太坊区块链副本，模拟以太坊执行层的行为。 因此，你可以编程交易与合约进行交互，而不会产生大量开销。

在本地区块链上运行合约可以作为一种有用的手动集成测试的方式。 [智能合约具有高度的可组合性](/developers/docs/smart-contracts/composability/)，使你能够与现有协议进行集成，但你仍需要确保这种复杂的链上交互能够产生正确的结果。

[更多关于开发网络的信息。](/developers/docs/development-networks/)

### 在测试网上测试合约 {#testing-contracts-on-testnets}

测试网络或测试网的运行方式与以太坊主网完全相同，唯一的区别在于它使用没有现实价值的以太币 (ETH)。 在[测试网](/developers/docs/networks/#ethereum-testnets)上部署你的合约意味着任何人都可以与之交互（例如，通过去中心化应用程序的前端界面），而无需承担资金风险。

这种手动测试形式对于从用户角度评估应用程序的端到端流程非常有用。 在这里，测试人员还可以进行试运行，并报告与合约的业务逻辑和整体功能有关的任何问题。

在本地区块链上进行测试后，部署到测试网是理想的选择，因为测试网更接近以太坊虚拟机的行为。 因此，许多以太坊原生项目通常会在测试网上部署去中心化应用程序，以在真实环境条件下评估智能合约的运行。

[更多关于以太坊测试网的信息。](/developers/docs/development-networks/#public-beacon-testchains)

## 测试与形式化验证 {#testing-vs-formal-verification}

虽然测试有助于确认合约返回某些数据输入的预期结果，但它不能最终证明测试期间未使用的输入也是如此。 因此，测试智能合约无法保证“功能正确性”（即无法证明程序在_所有_输入值集合上都按照要求运行）。

形式化验证是一种通过检查程序的形式模型是否与形式规范相匹配来评估软件正确性的方法。 形式模型是对程序的抽象数学表述，而形式规范则定义了程序的属性（即关于程序执行的逻辑断言）。

由于属性以数学术语编写，因此可以使用逻辑推理规则验证系统的形式（数学）模型是否满足规范。 因此，形式化验证工具被称为能够提供系统正确性的“数学证明”。

与测试不同，形式化验证可以用于验证智能合约的执行是否满足_所有_执行情况的形式规范的要求（即，没有缺陷），而无需使用样本数据来执行。 这不仅减少了运行数十个单元测试所花费的时间，而且在发现隐藏的漏洞方面也更加有效。 话虽如此，形式化验证技术在实施难度和实用性上存在一定的变化程度。

[更多关于智能合约的形式化验证的信息。](/developers/docs/smart-contracts/formal-verification)

## 测试与审计以及漏洞奖金计划 {#testing-vs-audits-bug-bounties}

正如前面提到的，严格的测试很少能够保证合约中没有错误；形式化验证方法可以提供更强的正确性保证，但目前使用起来困难且成本相当高昂。

尽管如此，你仍可通过进行独立的代码审查来进一步增加捕获合约漏洞的可能性。 [智能合约审查](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)和[漏洞奖励](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)是让他人分析你的合约的两种方式。

审查由具有在智能合约中发现安全漏洞和开发不良实践案例经验的审查人员进行。 审核通常包括对整个代码库进行测试（可能包括形式化验证）以及手动审查。

相反，漏洞奖励计划通常涉及向发现智能合约漏洞并向开发者披露的个人（通常称为[白帽黑客](https://en.wikipedia.org/wiki/White_hat_(computer_security))）提供财务奖励的做法。 漏洞奖励类似于审查，因为它涉及要求其他人帮助发现智能合约中的缺陷。

主要的区别在于漏洞奖励计划对更广泛的开发者/黑客社区开放，并吸引了一批具有独特技能和经验的道德黑客和独立安全专业人员。 与主要依赖可能拥有有限或狭窄专业知识的团队的智能合约审查相比，这可能是一个优势。

## 测试工具和库 {#testing-tools-and-libraries}

### 单元测试工具 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _用 Solidity 编写的智能合约的代码覆盖率工具。_

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _用于高级智能合约开发和测试的框架（基于 ethers.js）_。

- **[Remix 测试](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _用于测试 Solidity 智能合约的工具。 在 Remix IDE 的“Solidity Unit Testing”插件下工作，该插件用于编写和运行合约的测试用例。_

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _用于以太坊智能合约测试的断言库。 确保你的合约按预期运行！_

- **[Brownie 单元测试框架](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie 采用了 Pytest，这是一个功能丰富的测试框架，让你只需使用最少的代码即可编写小型测试，并能有效地扩展以用于大型项目，而且具有很强的可扩展性。_

- **[Foundry 测试](https://github.com/foundry-rs/foundry/tree/master/forge)** - _Foundry 提供了 Forge，这是一个快速灵活的以太坊测试框架，能够执行简单的单元测试、燃料优化检查和合约模糊测试。_

- **[Hardhat 测试](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _基于 ethers.js、Mocha 和 Chai 的智能合约测试框架。_

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _基于 Python 的智能合约开发和测试框架，针对太坊虚拟机。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _基于 Python 的单元测试和模糊测试框架，具有强大的调试功能和跨链测试支持，利用 pytest 和 Anvil 实现最佳用户体验和性能。_

### 基于属性测试的工具 {#property-based-testing-tools}

#### 静态分析工具 {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _基于 Python 的 Solidity 静态分析框架，用于查找漏洞、增强代码理解以及为智能合约编写自定义分析。_

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _用于执行Solidity 智能合约编程语言的风格和安全最佳实践的 Linter。_

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _基于 Rust 的静态分析器，专为 Web3 智能合约安全和开发而设计。_

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _基于 Python 的静态分析框架，具有漏洞和代码质量检测器，用于从代码中提取有用信息的打印机以及对编写自定义子模块的支持。_

#### 动态分析工具 {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _通过基于属性的测试来检测智能合约漏洞的快速合约模糊测试工具。_

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _自动化模糊测试工具，用于检测智能合约代码中的属性违规行为。_

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _用于分析以太坊虚拟机 (EVM) 字节码的动态符号执行框架。_

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _以太坊虚拟机 (EVM) 字节码评估工具，利用污点分析、混合执行分析和控制流检查来检测合约漏洞。_

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble 是一种规约语言和运行时验证工具，可让你为智能合约批注属性，从而使用 Diligence Fuzzing 或 MythX 等工具自动测试合约。_

## 相关教程 {#related-tutorials}

- [不同测试产品的概述和比较](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [如何使用 Echidna 测试智能合约](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [如何使用 Manticore 查找智能合约漏洞](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [如何使用 Slither 查找智能合约漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何模拟测试 Solidity 合约](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [如何利用 Foundry 在 Solidity 中运行单元测试](https://www.rareskills.io/post/foundry-testing-solidity)

## 延伸阅读 {#further-reading}

- [以太坊智能合约测试深度指南](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [如何测试以太坊智能合约](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO 开发者单元测试指南](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [如何像专家一样测试智能合约](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
