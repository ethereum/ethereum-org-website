---
title: "智能合约库"
description: "探索可重用的智能合约库和构建块，以加速你的以太坊开发项目。"
lang: zh
---

你不需要从头开始编写项目中的每一个智能合约。有许多开源的智能合约库可供使用，它们为你的项目提供可重用的构建块，让你不必重复造轮子。

## 前提条件 {#prerequisites}

在深入了解智能合约库之前，最好先对智能合约的结构有一个很好的了解。如果你还没有这样做，请前往阅读[智能合约剖析](/developers/docs/smart-contracts/anatomy/)。

## 库中包含什么 {#whats-in-a-library}

你通常可以在智能合约库中找到两种构建块：可以添加到合约中的可重用行为，以及各种标准的实现。

### 行为 {#behaviors}

在编写智能合约时，你很可能会发现自己一遍又一遍地编写类似的模式，例如分配一个_管理员 (admin)_地址来执行合约中受保护的操作，或者在发生意外问题时添加一个紧急_暂停 (pause)_按钮。

智能合约库通常以[库](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#libraries)的形式或通过 Solidity 中的[继承](https://solidity.readthedocs.io/en/v0.7.2/contracts.html#inheritance)来提供这些行为的可重用实现。

举个例子，以下是来自 [欧本齐柏林 (OpenZeppelin) 合约库](https://github.com/OpenZeppelin/openzeppelin-contracts)的 [`Ownable` 合约](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v3.2.0/contracts/access/Ownable.sol)的简化版本，它将一个地址指定为合约的所有者，并提供了一个修饰符，用于将方法的访问权限仅限制为该所有者。

```solidity
contract Ownable {
    address public owner;

    constructor() internal {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Ownable: caller is not the owner");
        _;
    }
}
```

要在你的合约中使用这样的构建块，你需要首先导入它，然后在你自己的合约中继承它。这将允许你使用基础 `Ownable` 合约提供的修饰符来保护你自己的函数。

```solidity
import ".../Ownable.sol"; // 导入库的路径

contract MyContract is Ownable {
    // 以下函数只能由所有者调用
    function secured() onlyOwner public {
        msg.sender.transfer(1 ether);
    }
}
```

另一个流行的例子是 [SafeMath](https://docs.openzeppelin.com/contracts/3.x/utilities#math) 或 [DsMath](https://dappsys.readthedocs.io/en/latest/ds_math.html)。这些是库（与基础合约相反），它们提供了带有溢出检查的算术函数，而这正是语言本身所不提供的。使用这些库中的任何一个来代替原生算术运算是一个很好的做法，可以保护你的合约免受溢出的影响，因为溢出可能会带来灾难性的后果！

### 标准 {#standards}

为了促进[可组合性和互操作性](/developers/docs/smart-contracts/composability/)，以太坊社区以 **ERC** 的形式定义了几个标准。你可以在[标准](/developers/docs/standards/)部分阅读更多关于它们的信息。

当将 ERC 作为合约的一部分包含在内时，最好寻找标准实现，而不是尝试自己编写。许多智能合约库都包含了最流行的 ERC 的实现。例如，无处不在的 [ERC-20 同质化代币标准](/developers/tutorials/understand-the-erc-20-token-smart-contract/)可以在 [HQ20](https://github.com/HQ20/contracts/blob/master/contracts/token/README.md)、[DappSys](https://github.com/dapphub/ds-token/) 和 [欧本齐柏林](https://docs.openzeppelin.com/contracts/3.x/erc20) 中找到。此外，一些 ERC 还提供规范实现作为 ERC 本身的一部分。

值得一提的是，有些 ERC 并不是独立的，而是对其他 ERC 的补充。例如，[ERC-2612](https://eips.ethereum.org/EIPS/eip-2612) 为 ERC-20 添加了一个扩展，以提高其可用性。

## 如何添加库 {#how-to}

请务必参考你所包含的库的文档，以获取有关如何将其包含在项目中的具体说明。一些 Solidity 合约库是使用 `npm` 打包的，因此你可以直接 `npm install` 它们。大多数用于[编译](/developers/docs/smart-contracts/compiling/)合约的工具都会在你的 `node_modules` 中查找智能合约库，因此你可以执行以下操作：

```solidity
// 这将从您的 node_modules 中加载 @openzeppelin/contracts 库
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract MyNFT is ERC721 {
    constructor() ERC721("MyNFT", "MNFT") public { }
}
```

无论你使用哪种方法，在包含库时，请始终注意[语言](/developers/docs/smart-contracts/languages/)版本。例如，如果你使用 Solidity 0.5 编写合约，则不能使用针对 Solidity 0.6 的库。

## 何时使用 {#when-to-use}

在项目中使用智能合约库有几个好处。首先也是最重要的一点，它为你提供了可以包含在系统中的现成构建块，从而节省了你的时间，而不必自己编写代码。

安全性也是一个主要优势。开源智能合约库通常也会受到严格审查。鉴于许多项目都依赖它们，社区有强烈的动机对它们进行持续审查。在应用程序代码中发现错误比在可重用合约库中发现错误要常见得多。一些库还会接受[外部审计](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/audits)以提高安全性。

然而，使用智能合约库会带来将你不熟悉的代码包含到项目中的风险。导入一个合约并将其直接包含到你的项目中是很诱人的，但是如果没有很好地理解该合约的作用，你可能会因为意外行为而在系统中无意中引入问题。在将其作为项目的一部分之前，请务必阅读你正在导入的代码的文档，然后审查代码本身！

最后，在决定是否包含一个库时，请考虑其整体使用情况。被广泛采用的库的好处是拥有更大的社区和更多的人来寻找问题。在使用智能合约进行构建时，安全性应该是你的首要关注点！

## 相关工具 {#related-tools}

**欧本齐柏林 (OpenZeppelin) 合约 -** **_用于安全智能合约开发的最受欢迎的库。_**

- [文档](https://docs.openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [社区论坛](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_安全、简单、灵活的智能合约构建块。_**

- [文档](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

**HQ20 -** **_一个包含合约、库和示例的 Solidity 项目，可帮助你构建适用于现实世界的全功能分布式应用程序。_**

- [GitHub](https://github.com/HQ20/contracts)

**thirdweb Solidity SDK -** **_提供高效构建自定义智能合约所需的工具_**

- [文档](https://portal.thirdweb.com/contracts/build/overview)
- [GitHub](https://github.com/thirdweb-dev/contracts)

## 相关教程 {#related-tutorials}

- [以太坊开发者的安全注意事项](/developers/docs/smart-contracts/security/) _– 一篇关于构建智能合约时安全注意事项的教程，包括库的使用。_
- [了解 ERC-20 代币智能合约](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– 关于 ERC-20 标准的教程，由多个库提供。_

## 延伸阅读 {#further-reading}

_知道对你有帮助的社区资源吗？编辑本页面并添加它！_