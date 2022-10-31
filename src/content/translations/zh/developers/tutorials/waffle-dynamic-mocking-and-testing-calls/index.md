---
title: "Waffle：动态模拟和测试合约调用"
description: 使用动态模拟和测试合约调用的高级 Waffle 教程
author: "Daniel Izdebski"
tags:
  - "waffle"
  - "智能合约"
  - "solidity"
  - "测试"
  - "模拟"
skill: intermediate
lang: zh
published: 2020-11-14
---

## 本教程是关于什么的？ {#what-is-this-tutorial-about}

在本教程中，您将学习如何：

- 使用动态模拟
- 测试智能合约之间的交互

本文假定：

- 您已经知道如何使用 `Solidity` 编写一个简单的智能合约
- 您熟悉 `JavaScript` 和 `TypeScript`
- 您已经完成其他 `Waffle` 教程或对其略知一二。

## 动态模拟 {#dynamic-mocking}

为什么动态模拟很有用？ 它允许我们编写单元测试，而不是集成测试。 这是什么意思呢？ 这意味着我们不必担心智能合约的依赖项，因此我们可以完全孤立地测试所有合约。 让我演示一下如何才能实现。

### **1. 项目** {#1-project}

在开始之前，我们需要准备一个简单的 node.js 项目：

```bash
$ mkdir dynamic-mocking
$ cd dynamic-mocking
$ mkdir contracts src

$ yarn init
# or if you're using npm
$ npm init
```

让我们从添加 typescript 和测试依赖项开始 -mocha & chai：

```bash
$ yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# or if you're using npm
$ npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

现在让我们添加 `Waffle` 和 `Ethers`：

```bash
$ yarn add --dev ethereum-waffle ethers
# or if you're using npm
$ npm install ethereum-waffle ethers --save-dev
```

您的项目结构现在应该如下所示：

```
.
├── contracts
├── package.json
└── test
```

### **2. 智能合约** {#2-smart-contract}

要开始动态模拟，我们需要一个包含依赖项的智能合约。 别担心，我会帮助您的！

这是一个用 `Solidity` 编写的简单智能合约，其唯一目的是检查我们是否有很多钱。 它使用 ERC20 代币来检查我们是否有足够的代币。 将其放在 `./contracts/AmIRichAlready.sol` 中。

```solidity
pragma solidity ^0.6.2;

interface IERC20 {
    function balanceOf(address account) external view returns (uint256);
}

contract AmIRichAlready {
    IERC20 private tokenContract;
    uint public richness = 1000000 * 10 ** 18;

    constructor (IERC20 _tokenContract) public {
        tokenContract = _tokenContract;
    }

    function check() public view returns (bool) {
        uint balance = tokenContract.balanceOf(msg.sender);
        return balance > richness;
    }
}
```

因为我们想使用动态模拟，所以我们不需要整个 ERC20，这就是为什么我们使用只有一个函数的 IERC20 接口的原因。

现在是构建这个合约的时候了！ 为此，我们将使用 `Waffle`。 首先，我们将创建一个简单的 `waffle.json` 配置文件，它指定了编译选项。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

现在我们已经准备好使用 Waffer 构建合约：

```bash
$ npx waffle
```

很简单，对吗？ 在 `build/` 文件夹中，出现了与合约和接口相对应的两个文件。 我们稍后将使用它们进行测试。

### **3. 测试** {#3-testing}

让我们创建一个名为 `AmIRichAlready.test.ts` 的文件来进行实际测试。 首先，我们必须处理导入。 我们稍后将需要它们：

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"
```

除了 JS 依赖项之外，我们需要导入我们创建的合约和接口。

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle 使用 `chai` 进行测试。 但是，在我们使用它之前，我们必须将 Waffle 的匹配器注入到 chai 本身：

```typescript
use(solidity)
```

我们需要实现 `beforeEach()` 函数，它将在每次测试前重置合约的状态。 让我们先想想我们需要什么。 要部署一个合约，我们需要两样东西：一个钱包和一个已部署的 ERC20 合约，以便将其作为 `AmIRichAlready` 合约的参数传递。

首先，我们创建一个钱包：

```typescript
const [wallet] = new MockProvider().getWallets()
```

然后我们需要部署一个 ERC20 合约。 这里是棘手的部分 -- 我们只有一个接口。 这就是使用 Waffle 来帮助我们的部分。 Waffle 有一个神奇的 `deployMockContract()` 函数，它只使用接口的 _abi_ 来创建合约。

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

现在有了钱包和部署的 ERC20，我们就可以继续部署 `AmIRichAlready` 合约。

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

做完这些，我们的 `beforeEach()` 函数就完成了。 到目前为止，您的 `AmIRichAlready.test.ts` 文件看起来应如下所示：

```typescript
import { expect, use } from "chai"
import { Contract, utils, Wallet } from "ethers"
import {
  deployContract,
  deployMockContract,
  MockProvider,
  solidity,
} from "ethereum-waffle"

import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"

use(solidity)

describe("Am I Rich Already", () => {
  let mockERC20: Contract
  let contract: Contract
  let wallet: Wallet

  beforeEach(async () => {
    ;[wallet] = new MockProvider().getWallets()
    mockERC20 = await deployMockContract(wallet, IERC20.abi)
    contract = await deployContract(wallet, AmIRichAlready, [mockERC20.address])
  })
})
```

让我们为 `AmIRichAlready` 合约编写第一个测试。 您认为我们的测试应该是关于什么的？ 没错，您是对的！ 我们应该检查我们是否有很多钱：）

但是等一下。 我们的模拟合约怎么知道要返回哪些值呢？ 我们还没有实现 `balanceOf()` 函数的任何逻辑。 同样，Waffle 在这里也可以提供帮助。 我们的模拟合约现在有了一些新花招：

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

有了这些知识，我们终于可以编写出我们的第一个测试啦：

```typescript
it("returns false if the wallet has less than 1000000 tokens", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

让我们把这个测试分解成几个部分：

1. 将我们的模拟 ERC20 合约设置为始终返回 99999 个代币的余额。
2. 检查 `contract.check()` 方法是否返回 `false`。

我们已经准备好启动这个家伙了：

![一次测试通过](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-one.png)

所以这个测试是有效的，但是，还是有一些改进的余地。 `balanceOf()` 函数将始终返回 99999。 我们可以通过指定一个钱包来改进它，该函数应该为它返回一些东西 -- 就像一个真正的合约。

```typescript
it("returns false if the wallet has less than 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

到目前为止，我们只测试了我们不够有钱的情况。 让我们来测试一下相反的情况：

```typescript
it("returns true if the wallet has at least 1000001 tokens", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

您运行测试...

![两次测试通过](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-two.png)

...您已经到这儿啦！ 我们的合约似乎按计划进行 :)

## 测试合约调用 {#testing-contract-calls}

让我们总结一下到目前为止所做的事情。 我们已经测试了我们的 `AmIRichAlready` 合约的功能，它似乎正常工作。 这意味着我们已经完成了，对吧？ 并非如此！ Waffle 允许我们进一步测试合约。 但是具体怎么做呢？ 那么，在 Waffle 的武器库中，有一个 `calledOnContract()` 和 `calledOnContractWith()` 匹配器。 他们允许我们检查，我们的合约是否调用了 ERC20 模拟合约。 下面是使用其中一个匹配器的基本测试：

```typescript
it("checks if contract called balanceOf on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

我们可以更进一步，用我告诉您的另一个匹配器改进这个测试：

```typescript
it("checks if contract called balanceOf with certain wallet on the ERC20 token", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

让我们检查测试是否正确：

![三次测试通过](../../../../../developers/tutorials/waffle-dynamic-mocking-and-testing-calls/test-three.png)

太好了，所有测试都通过了。

用 Waffle 测试智能合约调用非常容易。 而这是最精彩的部分。 这些匹配器对正常合约和模拟合约都有效！ 这是因为 Waffle 记录并过滤 EVM 调用，而不是像其他技术的流行测试库那样注入代码。

## 最后 {#the-finish-line}

恭喜！ 现在您知道如何使用 Waffle 来测试合约调用和动态模拟智能合约了。 还有更多有趣的功能等着我们去发现。 我建议您深入研究 Waffle 文档。

Waffle 的文档可在[此处](https://ethereum-waffle.readthedocs.io/)获得。

本教程的源代码可以在[此处](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls)找到。

您可能还对这些教程感兴趣：

- [使用 Waffle 测试智能合约](/developers/tutorials/testing-smart-contract-with-waffle/)
