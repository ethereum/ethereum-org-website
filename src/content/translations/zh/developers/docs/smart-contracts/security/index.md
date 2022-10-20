---
title: 智能合约安全性
description: 以太坊开发者的安全考虑
lang: zh
---

以太坊智能合约是极为灵活的。它能够存储超过非常大量的虚拟货币（超过十亿美元），并且根据先前部署的智能合约运行不可修改的代码。 虽然这创造了一个充满活力和创造性的生态系统，但其中包含的无信任、相互关联的智能合约，也吸引了攻击者利用智能合约中的漏洞和以太坊中的未知错误来赚取利润。 智能合约代码*通常*无法修改来修复安全漏洞，因此从智能合约中被盗窃的资产是无法收回的，且被盗资产极难追踪。 由于智能合约问题而被盗取或丢失的价值总额很容易超过 10 亿美元。 一些因为智能合约代码编写错误导致较大经济损失的例子：

- [钱包问题 #1 - 3000 万美金损失](https://www.coindesk.com/30-million-ether-reported-stolen-parity-wallet-breach)
- [钱包问题 #2 - 3 亿美金锁定](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)
- [去中心化自治组织被黑，360 万以太币被盗！ 目前价值超过 10 亿美元](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)

## 先决条件 {#prerequisites}

这个章节将介绍智能合约安全问题，以确保您在处理安全问题之前熟悉[智能合约](/developers/docs/smart-contracts/)。

## 如何编写更安全的智能合约代码 {#how-to-write-more-secure-smart-contract-code}

在启动任何代码到主网之前，采取足够的预防措施来保护您的智能合约所委托的任何有价值的东西是很重要的。 在本文中，我们将讨论一些特定的攻击，提供学习了解更多攻击类型的资源，并为您提供一些基本工具和最佳做法，以确保您的合约正确、安全地运行。

## 审核不是完美的解决方案 {#audits-are-not-a-silver-bullet}

几年前，用于编写、编译、测试和部署智能合约的工具还非常不成熟，许多项目被随意地编写 Solidity 代码，并将其交给审查员，审查员将审查代码以确保其安全并按预期运行。 在 2020 年，编写 Solidity 代码的开发过程和工具得到了显著改善，不仅可以确保项目更易于管理，而且能够组成项目安全性的一部分。 仅仅在项目结束时对您的智能合约进行审计已经不足以成为项目的唯一安全考虑。 **安全性来源于适当的设计和开发过程**，所以在您编写第一行智能合约代码之前，安全性就应该被考虑。

## 智能合约开发过程 {#smart-contract-development-process}

最低安全限度：

- 所有代码应该被存在于一个版本控制系统当中，例如 git
- 所有的代码修改都应该通过拉取请求来进行
- 所有的拉取请求都应该有至少一个审核员。 _如果这是一个个人项目，请考虑寻找另一位个人作者和一个交易代码审核员。_
- 使用开发以太坊环境（请参阅：Truffle），只需一个命令就可以编译、部署和运行一套针对您的代码的测试
- 已经通过 Mythril 和 Sliter 等基本代码分析工具运行了代码，最好是在合并每个拉取请求之前，比较输出中的差异。
- Solidity 代码编辑器不会发出任何警告
- 您的代码有据可查

上面的这些条目是编写智能合约的一个良好的开始，但是在编写代码过程中还有很多要值得注意。 关于更多条目及其详细解释，请参阅[DeFiSafety 提供的过程质量检查清单](https://docs.defisafety.com/review-process-documentation/process-quality-audit-process)。 [DefiSafety](https://defisafety.com/) 是一个对各种大型的公开以太坊去中心化应用程序进行评论的非官方公共服务提供者。 DeFiSafete 对项目的安全评级等级的一部分包括该项目是否遵守了质量检查表。 遵循这些审核过程：

- 通过可复现的自动化测试，产生更安全的代码
- 审查员将能够更有效地审查您的项目
- 对新开发者友好
- 允许开发者快速迭代、测试并在修改时获得反馈
- 回滚代码的可能性较低

## 攻击和脆弱性 {#attacks-and-vulnerabilities}

既然您正在使用高效的开发过程编写 Solidity 代码，那么让我们看看一些常见的 Solidity 漏洞问题。

### 重入攻击 {#re-entrancy}

重入攻击时在编写智能合约代码时应该考虑的最大且最重要的安全问题。 虽然以太坊虚拟机不能同时运行多个合约，一个合约可以调用另一个合约来暂停一个合约的执行和内存状态，直到被重新调用。这时，代码将会继续被正常执行。 暂停和重新启动的过程可能会造成一种被称为“重入攻击”的漏洞。

这是一个容易受到重入攻击的合约：

```solidity
// THIS CONTRACT HAS INTENTIONAL VULNERABILITY, DO NOT COPY
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

为了让用户可以退回先前存储在智能合约里的以太币，这个功能会

1. 读取用户的余额
2. 发送用户的余额
3. 将余额重置为 0，因此它们不能再次提取余额。

如果从普通账户（例如您自己的 MetaMask 帐户）调用，此函数将按预期运行：msg.sender.call.value() 只是向您的帐户发送以太币。 但是，智能合约也能调用其他合约。 如果一个自制的恶意合约调用 `withdraw()`，msg.sender.call.value() 会不仅发送 `amount` 个以太币，还会暗中调用合约来开始执行代码。 想象这个恶意合约：

```solidity
contract Attacker {
    function beginAttack() external payable {
        Victim(VICTIM_ADDRESS).deposit.value(1 ether)();
        Victim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
    }
}
```

调用 Attacker.beginAttack() 会开始循环寻找一些像：

```
0.) Attacker's EOA calls Attacker.beginAttack() with 1 ETH
0.) Attacker.beginAttack() deposits 1 ETH into Victim

  1.) Attacker -> Victim.withdraw()
  1.) Victim reads balances[msg.sender]
  1.) Victim sends ETH to Attacker (which executes default function)
    2.) Attacker -> Victim.withdraw()
    2.) Victim reads balances[msg.sender]
    2.) Victim sends ETH to Attacker (which executes default function)
      3.) Attacker -> Victim.withdraw()
      3.) Victim reads balances[msg.sender]
      3.) Victim sends ETH to Attacker (which executes default function)
        4.) Attacker no longer has enough gas, returns without calling again
      3.) balances[msg.sender] = 0;
    2.) balances[msg.sender] = 0; (it was already 0)
  1.) balances[msg.sender] = 0; (it was already 0)
```

攻击者帐户使用 1 个以太币调用 Attacker.beginAttack 函数将会重复攻击受害者帐户，并将赚取远超其提供以太币的数量（这些额外的以太币会从其他用户帐户的余额中赚取，这样会造成受害者帐户余额减少）

### 如何解决重入攻击（一种错误的方式） {#how-to-deal-with-re-entrancy-the-wrong-way}

防止重入攻击的一种简单方法便是让您的任何代码不与任何智能合约进行交互。 但当您搜索 stackoverflow 时，会发现这段被许多人使用的代码片段：

```solidity
function isContract(address addr) internal returns (bool) {
  uint size;
  assembly { size := extcodesize(addr) }
  return size > 0;
}
```

这似乎有道理：合约本身拥有一些代码，如果调用者还拥有其他代码，则不能允许合约代码去存储数据。 让我们加上它吧：

```solidity
// 该合约存在已知漏洞，请勿复制
contract ContractCheckVictim {
    mapping (address => uint256) public balances;

    function isContract(address addr) internal returns (bool) {
        uint size;
        assembly { size := extcodesize(addr) }
        return size > 0;
    }

    function deposit() external payable {
        require(!isContract(msg.sender)); // <- 新增行
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

现在为了要存入以太币，您的地址里不能有智能合约的代码。 然而，通过如下的攻击者合约可以很轻松地击败它：

```solidity
contract ContractCheckAttacker {
    constructor() public payable {
        ContractCheckVictim(VICTIM_ADDRESS).deposit(1 ether); // <- New line
    }

    function beginAttack() external payable {
        ContractCheckVictim(VICTIM_ADDRESS).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(VICTIM_ADDRESS).withdraw();
        }
   }
}
```

先前的攻击是对合约逻辑的攻击，而这一次则是对以太坊合约部署行为的攻击。 在部署过程中，合约尚未返回要在其地址部署完毕的代码，但在此过程中保留了完整的以太坊虚拟机控制阶段。

从技术上讲，可以使用以下代码来防止智能合约调用您的代码：

```solidity
require(tx.origin == msg.sender)
```

然而，这依旧不是一个很好的解决办法。 因为以太坊最令人兴奋的方面之一是它的可组合性，智能合约相互集成并融合、发展。 通过使用上面的代码，您会限制您项目的实用性。

### 如何解决重入攻击（一种正确的方式） {#how-to-deal-with-re-entrancy-the-right-way}

只需切换存储更新和外部调用的顺序，我们就可以防止启用攻击的重新进入条件。 虽然有可能，回调退却不会给攻击者带来好处，因为 `balances` 存储已经设置为 0。

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

上面的代码遵循“检查-效果-相互作用”设计模式，它有助于防止重入攻击。 您可以在这里 [阅读更多关于检查-生效-交互作用的信息](https://fravoll.github.io/solidity-patterns/checks_effects_interactions.html)

### 如何解决重入攻击（核心选择） {#how-to-deal-with-re-entrancy-the-nuclear-option}

任何时候您都会将 ETH 发送到一个不信任的地址或与一个未知合约进行交互（例如调用 `transfer()` 到用户提供的代币地址），您可以自行开启重入。 **通过设计既不发送以太币也不调用不信任合约的智能合约，您将防止重入攻击的可能性！**

## 更多攻击类型 {#more-attack-types}

上述攻击类型包括智能合约编码问题（重入）和以太坊奇数（在合约构造器内运行代码，合约地址才有编码）。 还有更多攻击类型需要注意，例如：

- 前台运行
- 以太币发送拒绝
- 整数上溢/下溢

延伸阅读:

- [Consensys 智能合约已知攻击](https://consensys.github.io/smart-contract-best-practices/attacks/) - 对最重要的漏洞进行深入浅出解释，并提供很多样本代码。
- [SWC 注册](https://swcregistry.io/docs/SWC-128) - 适用于以太坊和智能合约的 CWE 的管理列表

## 安全工具 {#security-tools}

虽然了解以太坊安全基础知识和聘请专业审计公司审查您的代码是无可替代的，但有许多工具可以帮助突出您的代码中的潜在问题。

### 智能合约安全性 {#smart-contract-security}

**Slither -** **_用 Python 3 编写的 Solidity 静态分析框架。_**

- [GitHub](https://github.com/crytic/slither)

**MythX -** **_以太坊智能合约的安全分析应用程序接口。_**

- [mythx.io](https://mythx.io/)
- [相关文档](https://docs.mythx.io/)

**Mythril -** **_以太坊虚拟机字节码安全分析工具。_**

- [mythril](https://github.com/ConsenSys/mythril)
- [相关文档](https://mythril-classic.readthedocs.io/en/master/about.html)

**Manticore -** **_在智能合约和二进制文件上使用符号执行工具的命令行界面。_**

- [GitHub](https://github.com/trailofbits/manticore)
- [相关文档](https://github.com/trailofbits/manticore/wiki)

**Securify -** **_以太坊智能合约安全分析工具。_**

- [securify.chainsecurity.com](https://securify.chainsecurity.com/)
- [Discord](https://discordapp.com/invite/nN77ckb)

**ERC20 Verifier -** **_用于检查合约是否符合 ERC20 标准的验证工具。_**

- [erc20-verifier.openzeppelin.com](https://erc20-verifier.openzeppelin.com)
- [论坛](https://forum.openzeppelin.com/t/online-erc20-contract-verifier/1575)

### 形式化验证 {#formal-verification}

**有关形式验证的信息**

- [智能合约的形式验证如何工作](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/) _July 20, 2018 - Brian Marick_
- [形式验证如何确保智能合约无懈可击](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1) _2018 年 1 月 29 日 - Bernard Mueller_

### 使用工具 {#using-tools}

智能合约安全分析最受欢迎的两个工具是：

- [Slither](https://github.com/crytic/slither) by [Trail of Bits](https://www.trailofbits.com/)（托管版本：[Crytic](https://crytic.io/)）
- [Mythril](https://github.com/ConsenSys/mythril) 来自 [ConsenSys](https://consensys.net/)（托管版本：[MythX](https://mythx.io/)）

两者都是分析代码和报告问题的实用工具。 每个人都有一个 [commercial] 托管版本，但也可以免费在本地运行。 下面是如何运行 Slither 的一个快速示例，这个示例是在方便的 Docker 映像 `trailofbits/eth-security-toolbox` 中提供的。 如果您还没有安装 ，您将需要 [安装 Docker](https://docs.docker.com/get-docker/)。

```bash
$ mkdir test-slither
$ curl https://gist.githubusercontent.com/epheph/460e6ff4f02c4ac582794a41e1f103bf/raw/9e761af793d4414c39370f063a46a3f71686b579/gistfile1.txt > bad-contract.sol
$ docker run -v `pwd`:/share  -it --rm trailofbits/eth-security-toolbox
docker$ cd /share
docker$ solc-select 0.5.11
docker$ slither bad-contract.sol
```

将生成此输出：

```bash
ethsec@1435b241ca60:/share$ slither bad-contract.sol
INFO:Detectors:
Reentrancy in Victim.withdraw() (bad-contract.sol#11-16):
    External calls:
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
    State variables written after the call(s):
    - balances[msg.sender] = 0 (bad-contract.sol#15)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities
INFO:Detectors:
Low level call in Victim.withdraw() (bad-contract.sol#11-16):
    - (success) = msg.sender.call.value(amount)() (bad-contract.sol#13)
Reference: https://github.com/crytic/slither/wiki/Detector-Documentation#low-level-calls
INFO:Slither:bad-contract.sol analyzed (1 contracts with 46 detectors), 2 result(s) found
INFO:Slither:Use https://crytic.io/ to get access to additional detectors and GitHub integration
```

Slither 已经在这里确定了重新进入的可能性。确定问题可能出现的关键行号，并为我们提供一个链接以获得有关问题的更多细节：

> 参考：https://github.com/crytic/slither/wiki/Detector-Documentation#reentrancy-vulnerabilities

允许您快速了解代码的潜在问题。 像所有自动化测试工具一样，Slither 并不完美，它在报告一侧出现了太多错误。 即使在不存在可开发的脆弱性的情况下，它也可以就潜在的重返提出警告。 在代码更改之间在 Slither 输出中查看 DIFERENER 常常非常有启发性，可以帮助发现比等待您的项目代码完成早得多的漏洞。

## 延伸阅读 {#further-reading}

**智能合约安全性最佳做法指南**

- [consensys.github.io/smart-contract-best-practices/](https://consensys.github.io/smart-contract-best-practices/)
- [GitHub](https://github.com/ConsenSys/smart-contract-best-practices/)
- [安全性建议和最佳做法合集](https://github.com/guylando/KnowledgeLists/blob/master/EthereumSmartContracts.md)

**智能合约安全验证标准 (SCSVS)**

- [securing.github.io/SCSVS/](https://securing.github.io/SCSVS/)

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关教程 {#related-tutorials}

- [安全的开发工作流程](/developers/tutorials/secure-development-workflow/)
- [如何使用 Slither 来查找智能合约漏洞](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [如何使用 Manticore 查找智能合约漏洞](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [安全准则](/developers/tutorials/smart-contract-security-guidelines/)
- [令牌安全](/developers/tutorials/token-integration-checklist/)
