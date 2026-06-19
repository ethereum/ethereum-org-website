---
title: 智能合约安全
description: 构建安全的以太坊智能合约的指南概述
lang: zh
---

智能合约非常灵活，能够控制大量的价值和数据，同时基于部署在区块链上的代码运行不可变的逻辑。这创造了一个充满活力的无须信任和去中心化应用生态系统，与传统系统相比，它们提供了许多优势。它们也为那些试图通过利用智能合约中的漏洞来获利的攻击者提供了机会。

像[以太坊](/)这样的公共区块链进一步使保护智能合约安全的问题复杂化。部署的合约代码_通常_无法更改以修补安全漏洞，而从智能合约中窃取的资产极难追踪，并且由于不可变性，大部分无法追回。

尽管数据各不相同，但据估计，由于智能合约中的安全缺陷而被盗或丢失的价值总额轻而易举地超过了 10 亿美元。这包括一些备受瞩目的事件，例如 [DAO 黑客攻击](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)（被盗 360 万个 ETH，按今天的价格计算价值超过 10 亿美元）、[Parity 多重签名钱包黑客攻击](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach)（黑客窃取了 3000 万美元）以及 [Parity 冻结钱包问题](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)（价值超过 3 亿美元的 ETH 被永久锁定）。

上述问题使得开发者必须投入精力构建安全、健壮且具有弹性的智能合约。智能合约安全是一项严肃的工作，也是每位开发者都应该好好学习的课题。本指南将涵盖以太坊开发者的安全注意事项，并探索用于提高智能合约安全性的资源。

## 先决条件 {#prerequisites}

在学习安全性之前，请确保你已熟悉[智能合约开发基础知识](/developers/docs/smart-contracts/)。

## 构建安全的以太坊智能合约的指南 {#smart-contract-security-guidelines}

### 1. 设计适当的访问控制 {#design-proper-access-controls}

在智能合约中，标记为 `public` 或 `external` 的函数可以被任何外部拥有账户 (EOA) 或合约账户调用。如果你希望其他人与你的合约进行交互，则必须为函数指定 public 可见性。然而，标记为 `private` 的函数只能被智能合约内部的函数调用，而不能被外部账户调用。让每个网络参与者都能访问合约函数可能会导致问题，特别是如果这意味着任何人都可以执行敏感操作（例如，铸造新代币）。

为了防止未经授权使用智能合约函数，有必要实施安全的访问控制。访问控制机制将智能合约中某些函数的使用权限限制为经过批准的实体，例如负责管理合约的账户。**Ownable 模式**和**基于角色的控制**是两种在智能合约中实现访问控制的有用模式：

#### Ownable 模式 {#ownable-pattern}

在 Ownable 模式中，在合约创建过程中，一个地址被设置为合约的“所有者”。受保护的函数被分配了一个 `OnlyOwner` 修饰符，这确保了合约在执行函数之前验证调用地址的身份。除了合约所有者之外，来自其他地址对受保护函数的调用总是会回退，从而防止不必要的访问。

#### 基于角色的访问控制 {#role-based-access-control}

在智能合约中将单个地址注册为 `Owner` 会引入中心化风险，并代表着单点故障。如果所有者的账户密钥被泄露，攻击者就可以攻击其拥有的合约。这就是为什么使用具有多个管理账户的基于角色的访问控制模式可能是更好的选择。

在基于角色的访问控制中，对敏感函数的访问权限分布在一组受信任的参与者之间。例如，一个账户可能负责铸造代币，而另一个账户执行升级或暂停合约。以这种方式去中心化访问控制消除了单点故障，并减少了用户的信任假设。

##### 使用多重签名钱包 {#use-require-assert-revert}

实现安全访问控制的另一种方法是使用[多重签名账户](/developers/docs/smart-contracts/#multisig)来管理合约。与常规 EOA 不同，多重签名账户由多个实体拥有，并且需要最少数量的账户（例如 5 个中的 3 个）的签名才能执行交易。

使用多重签名进行访问控制引入了额外的安全层，因为对目标合约的操作需要多方的同意。如果必须使用 Ownable 模式，这尤其有用，因为它使攻击者或恶意内部人员更难出于恶意目的操纵敏感的合约函数。

### 2. 使用 require()、assert() 和 revert() 语句来保护合约操作 {#test-smart-contracts-and-verify-code-correctness}

如前所述，一旦你的智能合约部署在区块链上，任何人都可以调用其中的公共函数。由于你无法提前知道外部账户将如何与合约交互，因此在部署之前实施针对有问题操作的内部保护措施是理想的选择。你可以通过使用 `require()`、`assert()` 和 `revert()` 语句来强制执行智能合约中的正确行为，如果执行未能满足某些要求，则触发异常并回退状态更改。

**`require()`**：`require` 定义在函数的开头，并确保在执行被调用的函数之前满足预定义的条件。`require` 语句可用于在继续执行函数之前验证用户输入、检查状态变量或验证调用账户的身份。

**`assert()`**：`assert()` 用于检测内部错误并检查代码中是否违反了“不变量”。不变量是关于合约状态的逻辑断言，对于所有函数执行都应保持为真。不变量的一个例子是代币合约的最大总供应量或余额。使用 `assert()` 可确保你的合约永远不会达到易受攻击的状态，如果确实如此，则对状态变量的所有更改都将回滚。

**`revert()`**：`revert()` 可用于 if-else 语句中，如果未满足所需条件，则触发异常。下面的示例合约使用 `revert()` 来保护函数的执行：

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // 执行购买。
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. 测试智能合约并验证代码正确性 {#get-independent-code-reviews}

在[以太坊虚拟机](/developers/docs/evm/)中运行的代码的不可变性意味着智能合约在开发阶段需要更高水平的质量评估。广泛测试你的合约并观察其是否有任何意外结果，将在很大程度上提高安全性，并从长远来看保护你的用户。

通常的方法是使用合约预期从用户那里接收的模拟数据编写小型单元测试。[单元测试](/developers/docs/smart-contracts/testing/#unit-testing)非常适合测试某些函数的功能并确保智能合约按预期工作。

不幸的是，如果单独使用，单元测试在提高智能合约安全性方面效果甚微。单元测试可能证明函数对于模拟数据执行正确，但单元测试的有效性仅取决于编写的测试。这使得很难检测到可能破坏智能合约安全性的遗漏边缘情况和漏洞。

更好的方法是将单元测试与使用[静态和动态分析](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)执行的基于属性的测试相结合。静态分析依赖于底层表示，例如[控制流图](https://en.wikipedia.org/wiki/Control-flow_graph)和[抽象语法树](https://deepsource.io/glossary/ast/)，来分析可达的程序状态和执行路径。同时，动态分析技术（例如[智能合约模糊测试](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)）使用随机输入值执行合约代码，以检测违反安全属性的操作。

[形式化验证](/developers/docs/smart-contracts/formal-verification)是另一种验证智能合约中安全属性的技术。与常规测试不同，形式化验证可以最终证明智能合约中不存在错误。这是通过创建一个捕获所需安全属性的形式化规范，并证明合约的形式化模型遵守该规范来实现的。

### 4. 寻求对你的代码进行独立审查 {#audits}

在测试你的合约之后，最好请其他人检查源代码是否存在任何安全问题。测试不会发现智能合约中的每一个缺陷，但获得独立审查会增加发现漏洞的可能性。

#### 审计 {#bug-bounties}

委托进行智能合约审计是进行独立代码审查的一种方式。审计员在确保智能合约安全且没有质量缺陷和设计错误方面发挥着重要作用。

话虽如此，你应该避免将审计视为灵丹妙药。智能合约审计不会捕获每一个错误，其主要目的是提供额外的一轮审查，这有助于检测开发人员在初始开发和测试期间遗漏的问题。你还应该遵循与审计员合作的最佳实践，例如正确记录代码并添加内联注释，以最大化智能合约审计的收益。

- [智能合约审计提示与技巧](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [充分利用你的审计](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### 漏洞赏金 {#follow-smart-contract-development-best-practices}

建立漏洞赏金计划是实施外部代码审查的另一种方法。漏洞赏金是给予发现应用程序漏洞的个人（通常是白帽黑客）的财务奖励。

如果使用得当，漏洞赏金会激励黑客社区的成员检查你的代码是否存在严重缺陷。一个真实的例子是“无限金钱漏洞”，该漏洞本可以让攻击者在 [Optimism](https://www.optimism.io/)（一个在以太坊上运行的[二层网络 (l2)](/layer-2/) 协议）上创建无限数量的以太币。幸运的是，一位白帽黑客[发现了这个缺陷](https://www.saurik.com/optimism.html)并通知了团队，[在此过程中获得了巨额奖金](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/)。

一个有用的策略是根据面临风险的资金数额按比例设置漏洞赏金计划的奖金。这种被称为“[可扩展漏洞赏金](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”的方法为个人提供了财务激励，鼓励他们负责任地披露漏洞而不是利用它们。

### 5. 在智能合约开发期间遵循最佳实践 {#implement-disaster-recovery-plans}

审计和漏洞赏金的存在并不能免除你编写高质量代码的责任。良好的智能合约安全性始于遵循适当的设计和开发流程：

- 将所有代码存储在版本控制系统中，例如 git

- 通过拉取请求 (pull request) 进行所有代码修改

- 确保拉取请求至少有一名独立的审查者——如果你独自在一个项目上工作，考虑寻找其他开发人员并交换代码审查

- 使用[开发环境](/developers/docs/frameworks/)来测试、编译、部署智能合约

- 通过基本的代码分析工具（例如 [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn)、Mythril 和 斯莱瑟）运行你的代码。理想情况下，你应该在合并每个拉取请求之前执行此操作，并比较输出的差异

- 确保你的代码编译没有错误，并且 Solidity 编译器不发出任何警告

- 正确记录你的代码（使用 [NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)）并用易于理解的语言描述有关合约架构的详细信息。这将使其他人更容易审计和审查你的代码。

### 6. 实施稳健的灾难恢复计划 {#contract-upgrades}

设计安全的访问控制、实现函数修饰符以及其他建议可以提高智能合约的安全性，但它们不能排除恶意利用的可能性。构建安全的智能合约需要“为失败做好准备”，并制定后备计划以有效应对攻击。适当的灾难恢复计划将包含以下部分或全部组件：

#### 合约升级 {#emergency-stops}

虽然以太坊智能合约默认是不可变的，但可以通过使用升级模式来实现某种程度的可变性。在严重缺陷导致旧合约无法使用且部署新逻辑是最可行选择的情况下，升级合约是必要的。

合约升级机制的工作方式各不相同，但“代理模式”是升级智能合约的更流行方法之一。[代理模式](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)将应用程序的状态和逻辑拆分到_两个_合约中。第一个合约（称为“代理合约”）存储状态变量（例如，用户余额），而第二个合约（称为“逻辑合约”）保存用于执行合约函数的代码。

账户与代理合约交互，代理合约使用 [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 底层调用将所有函数调用分派给逻辑合约。与常规消息调用不同，`delegatecall()` 确保在逻辑合约地址运行的代码在调用合约的上下文中执行。这意味着逻辑合约将始终写入代理的存储（而不是其自己的存储），并且保留了 `msg.sender` 和 `msg.value` 的原始值。

将调用委托给逻辑合约需要将其地址存储在代理合约的存储中。因此，升级合约的逻辑只需部署另一个逻辑合约并将新地址存储在代理合约中即可。由于随后对代理合约的调用会自动路由到新的逻辑合约，因此你无需实际修改代码即可“升级”合约。

[有关升级合约的更多信息](/developers/docs/smart-contracts/upgrading/)。

#### 紧急停止 {#event-monitoring}

如前所述，广泛的审计和测试不可能发现智能合约中的所有错误。如果在部署后你的代码中出现漏洞，则无法对其进行修补，因为你无法更改在合约地址运行的代码。此外，升级机制（例如，代理模式）可能需要时间来实施（它们通常需要不同方的批准），这只会给攻击者更多时间来造成更多损害。

终极手段是实现一个“紧急停止”函数，该函数阻止对合约中易受攻击函数的调用。紧急停止通常包括以下组件：

1. 一个全局布尔变量，指示智能合约是否处于停止状态。在设置合约时，此变量设置为 `false`，但一旦合约停止，它将恢复为 `true`。

2. 在执行中引用布尔变量的函数。当智能合约未停止时，可以访问此类函数，而当触发紧急停止功能时，这些函数将变得不可访问。

3. 有权访问紧急停止函数的实体，该函数将布尔变量设置为 `true`。为了防止恶意操作，可以将对此函数的调用限制为受信任的地址（例如，合约所有者）。

一旦合约激活紧急停止，某些函数将无法调用。这是通过将选定的函数包装在引用全局变量的修饰符中来实现的。下面是[一个示例](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)，描述了在合约中实现此模式：

```solidity
// 此代码未经专业审计，不对安全性或正确性作任何保证。使用风险自负。

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // 在此检查 msg.sender 的授权
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // 存款逻辑在此处执行
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // 紧急提款在此处执行
    }
}
```

此示例显示了紧急停止的基本特征：

- `isStopped` 是一个布尔值，在开始时计算结果为 `false`，当合约进入紧急模式时计算结果为 `true`。

- 函数修饰符 `onlyWhenStopped` 和 `stoppedInEmergency` 检查 `isStopped` 变量。`stoppedInEmergency` 用于控制当合约易受攻击时应无法访问的函数（例如，`deposit()`）。对这些函数的调用将直接回退。

`onlyWhenStopped` 用于在紧急情况下应可调用的函数（例如，`emergencyWithdraw()`）。此类函数可以帮助解决情况，因此将它们从“受限函数”列表中排除。

使用紧急停止功能为处理智能合约中的严重漏洞提供了有效的权宜之计。然而，这增加了用户信任开发人员不会出于自私原因激活它的需求。为此，通过将其置于链上投票机制、时间锁或多重签名钱包的批准之下，去中心化对紧急停止的控制是可能的解决方案。

#### 事件监控 {#design-secure-governance-systems}

[事件](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)允许你跟踪对智能合约函数的调用并监控状态变量的更改。理想的做法是编写智能合约，以便在某一方采取对安全至关重要的操作（例如，提取资金）时发出事件。

记录事件并在链下监控它们可以提供对合约操作的洞察，并有助于更快地发现恶意行为。这意味着你的团队可以更快地响应黑客攻击，并采取行动减轻对用户的影响，例如暂停函数或执行升级。

你还可以选择现成的监控工具，只要有人与你的合约交互，该工具就会自动转发警报。这些工具将允许你根据不同的触发器（例如交易量、函数调用频率或涉及的特定函数）创建自定义警报。例如，你可以编写一个警报，当单笔交易中提取的金额超过特定阈值时触发。

### 7. 设计安全的治理系统 {#reduce-code-complexity}

你可能希望通过将核心智能合约的控制权移交给社区成员来去中心化你的应用程序。在这种情况下，智能合约系统将包含一个治理模块——一种允许社区成员通过链上治理系统批准管理操作的机制。例如，将代理合约升级到新实现的提案可以由代币持有者投票表决。

去中心化治理可能是有益的，特别是因为它使开发人员和最终用户的利益保持一致。然而，如果实施不当，智能合约治理机制可能会引入新的风险。一个可能的情况是，如果攻击者通过获取[闪电贷](/defi/#flash-loans)获得了巨大的投票权（以持有的代币数量衡量），并强行通过了恶意提案。

防止与链上治理相关问题的一种方法是[使用时间锁](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)。时间锁可防止智能合约在特定时间过去之前执行某些操作。其他策略包括根据代币被锁定的时间长短为每个代币分配“投票权重”，或者测量地址在历史时期（例如，过去的 2-3 个区块）而不是当前区块的投票权。这两种方法都降低了快速积累投票权以左右链上投票的可能性。

在共享链接中了解更多关于[设计安全治理系统](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/)、[DAO 中的不同投票机制](https://hackernoon.com/governance-is-the-holy-grail-for-daos)以及[利用 DeFi 的常见 DAO 攻击向量](https://dacian.me/dao-governance-defi-attacks)的信息。

### 8. 将代码复杂性降至最低 {#mitigate-common-smart-contract-vulnerabilities}

传统软件开发人员熟悉 KISS（“保持简单，愚蠢”）原则，该原则建议不要在软件设计中引入不必要的复杂性。这遵循了长期以来的想法，即“复杂的系统以复杂的方式失败”，并且更容易出现代价高昂的错误。

鉴于智能合约可能控制着大量价值，在编写智能合约时保持简单尤为重要。在编写智能合约时实现简单性的一个技巧是尽可能重用现有的库，例如 [欧本齐柏林 Contracts](https://docs.openzeppelin.com/contracts/5.x/)。因为这些库已经过开发人员的广泛审计和测试，使用它们可以减少因从头开始编写新功能而引入错误的机会。

另一个常见的建议是编写小型函数，并通过将业务逻辑拆分到多个合约中来保持合约的模块化。编写更简单的代码不仅可以减少智能合约中的攻击面，还可以更容易地推断整个系统的正确性并及早发现可能的设计错误。

### 9. 防御常见的智能合约漏洞 {#reentrancy}

#### 重入 {#integer-underflows-and-overflows}

EVM 不允许并发，这意味着参与消息调用的两个合约不能同时运行。外部调用会暂停调用合约的执行和内存，直到调用返回，此时执行正常进行。这个过程可以正式描述为将[控制流](https://www.computerhope.com/jargon/c/contflow.htm)转移到另一个合约。

虽然大多数情况下是无害的，但将控制流转移到不受信任的合约可能会导致问题，例如重入。当恶意合约在原始函数调用完成之前回调易受攻击的合约时，就会发生重入攻击。这种类型的攻击最好用一个例子来解释。

考虑一个简单的智能合约（“Victim”），它允许任何人存入和提取以太币：

```solidity
// 此合约存在漏洞。请勿在生产环境中使用

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

该合约公开了一个 `withdraw()` 函数，允许用户提取先前存入合约的 ETH。在处理提款时，合约执行以下操作：

1. 检查用户的 ETH 余额
2. 将资金发送到调用地址
3. 将其余额重置为 0，防止用户进行额外的提款

`Victim` 合约中的 `withdraw()` 函数遵循“检查-交互-效果”模式。它_检查_执行所需的条件是否满足（即用户有正的 ETH 余额），并通过将 ETH 发送到调用者的地址来执行_交互_，然后再应用交易的_效果_（即减少用户的余额）。

如果从外部拥有账户 (EOA) 调用 `withdraw()`，该函数将按预期执行：`msg.sender.call.value()` 将 ETH 发送给调用者。但是，如果 `msg.sender` 是一个智能合约账户调用 `withdraw()`，使用 `msg.sender.call.value()` 发送资金也将触发存储在该地址的代码运行。

想象一下这是部署在合约地址的代码：

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

该合约旨在做三件事：

1. 接受来自另一个账户（可能是攻击者的 EOA）的存款
2. 将 1 ETH 存入 Victim 合约
3. 提取存储在智能合约中的 1 ETH

这里没有什么问题，除了 `Attacker` 有另一个函数，如果传入的 `msg.sender.call.value` 剩余的 Gas 超过 40,000，它会再次调用 `Victim` 中的 `withdraw()`。这使得 `Attacker` 能够重入 `Victim` 并在第一次调用 `withdraw` 完成_之前_提取更多资金。循环如下所示：

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

总结来说，因为调用者的余额直到函数执行完成才被设置为 0，所以后续的调用将会成功，并允许调用者多次提取其余额。这种攻击可用于耗尽智能合约的资金，就像在 [2016 年 DAO 黑客攻击](https://www.coindesk.com/learn/understanding-the-dao-attack)中发生的那样。正如[重入漏洞利用的公开列表](https://github.com/pcaversaccio/reentrancy-attacks)所示，重入攻击在今天仍然是智能合约的一个关键问题。

##### 如何防止重入攻击 {#oracle-manipulation}

处理重入的一种方法是遵循[检查-效果-交互模式](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)。这种模式对函数的执行进行排序，使得在继续执行之前执行必要检查的代码排在第一位，其次是操作合约状态的代码，最后是与其他合约或 EOA 交互的代码。

检查-效果-交互模式用于下面显示的 `Victim` 合约的修订版中：

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

该合约对用户的余额执行_检查_，应用 `withdraw()` 函数的_效果_（通过将用户的余额重置为 0），然后继续执行_交互_（将 ETH 发送到用户的地址）。这确保了合约在外部调用之前更新其存储，从而消除了促成第一次攻击的重入条件。`Attacker` 合约仍然可以回调 `NoLongerAVictim`，但由于 `balances[msg.sender]` 已设置为 0，额外的提款将抛出错误。

另一个选择是使用互斥锁（通常描述为“mutex”），它锁定合约状态的一部分，直到函数调用完成。这是使用一个布尔变量来实现的，该变量在函数执行之前设置为 `true`，并在调用完成后恢复为 `false`。如下面的示例所示，使用互斥锁可以保护函数在原始调用仍在处理时免受递归调用的影响，从而有效地阻止重入。

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // 此函数受互斥锁保护，因此来自 `msg.sender.call` 内部的重入调用无法再次调用 `withdraw`。
    //  `return` 语句的计算结果为 `true`，但仍会执行修饰符中的 `locked = false` 语句
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

你还可以使用[拉取支付](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment)系统，该系统要求用户从智能合约中提取资金，而不是将资金发送到账户的“推送支付”系统。这消除了在未知地址无意中触发代码的可能性（并且还可以防止某些拒绝服务攻击）。

#### 整数下溢和溢出 {#smart-contract-security-resources-for-developers}

当算术运算的结果超出可接受的值范围，导致其“翻转”到最低可表示值时，就会发生整数溢出。例如，`uint8` 只能存储高达 2^8-1=255 的值。导致值高于 `255` 的算术运算将溢出并将 `uint` 重置为 `0`，类似于汽车上的里程表一旦达到最大里程 (999999) 就会重置为 0。

整数下溢发生的原因类似：算术运算的结果低于可接受的范围。假设你尝试在 `uint8` 中递减 `0`，结果将直接翻转到最大可表示值 (`255`)。

整数溢出和下溢都可能导致合约状态变量发生意外更改，并导致计划外的执行。下面是一个示例，展示了攻击者如何利用智能合约中的算术溢出来执行无效操作：

```
pragma solidity ^0.7.6;

// 该合约旨在充当时间金库。
// 用户可以向该合约存款，但至少一周内无法提取。
// 用户还可以将等待时间延长至 1 周的等待期之后。

/*
1. 部署 TimeLock
2. 使用 TimeLock 的地址部署 Attack
3. 调用 Attack.attack 发送 1 ether。你将立即能够
   提取你的 ether。

发生了什么？
Attack 导致 TimeLock.lockTime 溢出，并能够在
1 周的等待期之前提取。
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        如果 t = 当前锁定时间，那么我们需要找到 x 使得
        x + t = 2**256 = 0
        所以 x = -t
        2**256 = type(uint).max + 1
        所以 x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### 如何防止整数下溢和溢出 {#code-analysis-tools}

从 0.8.0 版本开始，Solidity 编译器拒绝导致整数下溢和溢出的代码。但是，使用较低编译器版本编译的合约应该对涉及算术运算的函数执行检查，或者使用检查下溢/溢出的库（例如 [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math)）。

#### 预言机操纵 {#smart-contract-monitoring-tools}

[预言机](/developers/docs/oracles/)获取链下信息并将其发送到链上供智能合约使用。借助预言机，你可以设计与链下系统（例如资本市场）互操作的智能合约，从而极大地扩展其应用。

但是，如果预言机被破坏并将不正确的信息发送到链上，智能合约将根据错误的输入执行，这可能会导致问题。这是“预言机问题”的基础，该问题涉及确保来自区块链预言机的信息准确、最新且及时的任务。

一个相关的安全问题是使用链上预言机（例如去中心化交易所）来获取资产的现货价格。[去中心化金融 (DeFi)](/defi/) 行业的借贷平台通常这样做来确定用户抵押品的价值，以确定他们可以借多少钱。

DEX 价格通常是准确的，这在很大程度上归功于套利者恢复了市场的平价。然而，它们很容易被操纵，特别是如果链上预言机根据历史交易模式计算资产价格（通常情况如此）。

例如，攻击者可以在与你的借贷合约交互之前通过获取闪电贷来人为地抬高资产的现货价格。向 DEX 查询资产价格将返回高于正常值的值（由于攻击者的大量“买单”扭曲了对该资产的需求），从而允许他们借入比应有金额更多的资金。这种“闪电贷攻击”已被用于利用 DeFi 应用程序对价格预言机的依赖，导致协议损失数百万资金。

##### 如何防止预言机操纵 {#smart-contract-administration-tools}

[避免预言机操纵](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples)的最低要求是使用去中心化的预言机网络，该网络从多个来源查询信息以避免单点故障。在大多数情况下，去中心化预言机具有内置的加密经济激励措施，以鼓励预言机节点报告正确的信息，从而使它们比中心化预言机更安全。

如果你计划向链上预言机查询资产价格，请考虑使用实现时间加权平均价格 (TWAP) 机制的预言机。[TWAP 预言机](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)在两个不同的时间点（你可以修改）查询资产的价格，并根据获得的平均值计算现货价格。选择更长的时间段可以保护你的协议免受价格操纵，因为最近执行的大额订单无法影响资产价格。

## 开发者智能合约安全资源 {#smart-contract-auditing-services}

### 分析智能合约和验证代码正确性的工具 {#bug-bounty-platforms}

- **[测试工具和库](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _用于对智能合约执行单元测试、静态分析和动态分析的行业标准工具和库的集合。_

- **[形式化验证工具](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _用于验证智能合约功能正确性并检查不变量的工具。_

- **[智能合约审计服务](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _为以太坊开发项目提供智能合约审计服务的组织列表。_

- **[漏洞赏金平台](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _用于协调漏洞赏金并奖励负责任地披露智能合约中严重漏洞的平台。_

- **[Fork Checker](https://forkchecker.hashex.org/)** - _一个免费的在线工具，用于检查有关分叉合约的所有可用信息。_

- **[ABI 编码器](https://abi.hashex.org/)** - _一个免费的在线服务，用于对你的 Solidity 合约函数和构造函数参数进行编码。_

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _Solidity 静态分析器，通过遍历抽象语法树 (AST) 来精确定位可疑漏洞，并以易于阅读的 Markdown 格式打印出问题。_

### 监控智能合约的工具 {#common-smart-contract-vulnerabilities-and-exploits}

- **[Tenderly 实时警报](https://tenderly.co/monitoring)** - _一个在你的智能合约或钱包发生异常或意外事件时获取实时通知的工具。_

### 智能合约安全管理工具 {#challenges-for-learning-smart-contract-security}

- **[Safe](https://safe.global/)** - _运行在以太坊上的智能合约钱包，要求在交易发生前至少有一定数量的人授权 (M-of-N)。_

- **[欧本齐柏林合约](https://docs.openzeppelin.com/contracts/5.x/)** - _用于实现管理功能的合约库，包括合约所有权、升级、访问控制、治理、可暂停性等。_

### 智能合约审计服务 {#smart-contract-security-best-practices}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _智能合约审计服务，帮助整个区块链生态系统中的项目确保其协议已准备好发布，并旨在保护用户。_

- **[CertiK](https://www.certik.com/)** - _区块链安全公司，率先在智能合约和区块链网络上使用尖端的形式化验证技术。_

- **[Trail of Bits](https://www.trailofbits.com/)** - _将安全研究与攻击者思维相结合的网络安全公司，旨在降低风险并强化代码。_

- **[PeckShield](https://peckshield.com/)** - _区块链安全公司，为整个区块链生态系统的安全性、隐私和可用性提供产品和服务。_

- **[QuantStamp](https://quantstamp.com/)** - _通过安全和风险评估服务促进区块链技术主流采用的审计服务。_

- **[欧本齐柏林](https://www.openzeppelin.com/security-audits)** - _为分布式系统提供安全审计的智能合约安全公司。_

- **[Runtime Verification](https://runtimeverification.com/)** - _专门从事智能合约形式化建模和验证的安全公司。_

- **[Hacken](https://hacken.io)** - _Web3 网络安全审计机构，为区块链安全带来 360 度全方位的方法。_

- **[奈瑟曼德](https://www.nethermind.io/smart-contract-audits)** - _Solidity 和 Cairo 审计服务，确保以太坊和 Starknet 上智能合约的完整性以及用户的安全。_

- **[HashEx](https://hashex.org/)** - _HashEx 专注于区块链和智能合约审计以确保加密货币的安全，提供智能合约开发、渗透测试、区块链咨询等服务。_

- **[Code4rena](https://code4rena.com/)** - _竞争性审计平台，激励智能合约安全专家寻找漏洞并帮助使 Web3 更加安全。_

- **[CodeHawks](https://codehawks.com/)** - _竞争性审计平台，为安全研究人员举办智能合约审计竞赛。_

- **[Cyfrin](https://cyfrin.io)** - _Web3 安全巨头，通过产品和智能合约审计服务孵化加密安全。_

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _Web3 安全公司，通过经验丰富的审计师团队和一流的工具为区块链系统提供安全审计。_

- **[Oxorio](https://oxor.io/)** - _智能合约审计和区块链安全服务，在 EVM、Solidity、零知识证明、跨链技术方面拥有专业知识，服务于加密货币公司和去中心化金融 (DeFi) 项目。_

- **[Inference](https://inference.ag/)** - _安全审计公司，专门从事基于 EVM 的区块链的智能合约审计。得益于其专家审计师，他们能够在部署前识别潜在问题并提出可行的解决方案来修复它们。_

### 漏洞赏金平台 {#tutorials-on-smart-contract-security}

- **[Immunefi](https://immunefi.com/)** - _针对智能合约和去中心化金融 (DeFi) 项目的漏洞赏金平台，安全研究人员在这里审查代码、披露漏洞、获得报酬，并使加密货币更加安全。_

- **[HackerOne](https://www.hackerone.com/)** - _漏洞协调和漏洞赏金平台，将企业与渗透测试人员和网络安全研究人员联系起来。_

- **[HackenProof](https://hackenproof.com/)** - _针对加密项目（去中心化金融 (DeFi)、智能合约、钱包、中心化交易所等）的专家级漏洞赏金平台，安全专业人员在此提供分类服务，研究人员因提交相关且经过验证的漏洞报告而获得报酬。_

-  **[Sherlock](https://www.sherlock.xyz/)** - _Web3 智能合约安全的承保人，审计员的报酬通过智能合约进行管理，以确保相关漏洞得到公平的支付。_

-  **[CodeHawks](https://www.codehawks.com/)** - _竞争性漏洞赏金平台，审计员在此参与安全竞赛和挑战，并（很快）参与他们自己的私人审计。_

### 已知智能合约漏洞和漏洞利用的出版物

- **[ConsenSys：智能合约已知攻击](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _对最重大合约漏洞的初学者友好解释，大多数情况都附有示例代码。_

- **[SWC 注册表](https://swcregistry.io/)** - _适用于以太坊智能合约的常见弱点枚举 (CWE) 项目的精选列表。_

- **[Rekt](https://rekt.news/)** - _定期更新的关于备受瞩目的加密货币黑客攻击和漏洞利用的出版物，以及详细的事后分析报告。_

### 学习智能合约安全的挑战

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _区块链安全兵棋推演、挑战、[夺旗赛](https://www.webopedia.com/definitions/ctf-event/amp/)竞赛和解决方案文章的精选列表。_

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _用于学习去中心化金融 (DeFi) 智能合约攻击性安全并培养漏洞搜寻和安全审计技能的兵棋推演。_

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _基于 Web3/Solidity 的兵棋推演，其中每个级别都是一个需要被“黑客攻击”的智能合约。_

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _以奇幻冒险为背景的智能合约黑客挑战。成功完成挑战还可以获得参与私人漏洞赏金计划的权限。_

### 保护智能合约的最佳实践

- **[ConsenSys：以太坊智能合约安全最佳实践](https://consensys.github.io/smart-contract-best-practices/)** - _保护以太坊智能合约的综合指南列表。_

- **[Nascent：简单安全工具包](https://github.com/nascentxyz/simple-security-toolkit)** - _针对智能合约开发的实用安全指南和清单的集合。_

- **[Solidity 模式](https://fravoll.github.io/solidity-patterns/)** - _智能合约编程语言 Solidity 的安全模式和最佳实践的实用汇编。_

- **[Solidity 文档：安全注意事项](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _使用 Solidity 编写安全智能合约的指南。_

- **[智能合约安全验证标准](https://github.com/securing/SCSVS)** - _包含十四个部分的清单，旨在为开发人员、架构师、安全审查员和供应商标准化智能合约的安全性。_

- **[学习智能合约安全与审计](https://updraft.cyfrin.io/courses/security)** - _终极智能合约安全与审计课程，专为希望提升安全最佳实践并成为安全研究人员的智能合约开发人员而创建。_

### 智能合约安全教程

- [如何编写安全的智能合约](/developers/tutorials/secure-development-workflow/)

- [如何使用斯莱瑟查找智能合约漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [如何使用曼蒂科尔查找智能合约漏洞](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [智能合约安全指南](/developers/tutorials/smart-contract-security-guidelines/)

- [如何安全地将你的代币合约与任意代币集成](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - 智能合约安全与审计完整课程](https://updraft.cyfrin.io/courses/security)