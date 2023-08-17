---
title: 用 Waffle 库来测试简单的智能合约
description: 初学者教程
author: Ewa Kowalska
tags:
  - "智能合约"
  - "solidity"
  - "Waffle"
  - "测试"
skill: beginner
lang: zh
published: 2021-02-26
---

## 在本教程中，您将学习如何： {#in-this-tutorial-youll-learn-how-to}

- 测试钱包余额的变化
- 利用指定参数测试事件的触发
- 确认交易已回滚

## 前提条件 {#assumptions}

- 您能够创建一个新的 JavaScript 或 TypeScript 项目
- 您有一定的使用 JavaScript 来进行测试的基本经验
- 您使用过一些包管理器，如 yarn 或 npm
- 您拥有关于智能合约和 Solidity 的非常基础的知识

# 入门指南 {#getting-started}

该教程演示了如何使用 yarn 进行测试设置和运行，但如果您更喜欢使用 npm 也没有问题——我将为您提供官方 Waffle [文档](https://ethereum-waffle.readthedocs.io/en/latest/index.html)的参考链接。

## 安装依赖项 {#install-dependencies}

将 ethereum-waffle 和 typescript 依赖项[添加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)到您的项目的开发依赖项中。

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## 智能合约示例 {#example-smart-contract}

在本教程中，我们将使用一个简单的智能合约示例- EtherSplitter。 它的作用无非是允许任何人发送一些以 wei 为单位的以太币，并平均分配给两个预定义的接收者。 Split 函数需要 wei 的数量是偶数，否则会回滚。 对于两个接收者，它都会执行 wei 转账，然后触发 Transfer 转账事件。

将 EtherSplitter 代码片段放置在 `src/EtherSplitter.sol` 文件中。

```solidity
pragma solidity ^0.6.0;

contract EtherSplitter {
    address payable receiver1;
    address payable receiver2;

    event Transfer(address from, address to, uint256 amount);

    constructor(address payable _address1, address payable _address2) public {
        receiver1 = _address1;
        receiver2 = _address2;
    }

    function split() public payable {
        require(msg.value % 2 == 0, 'Uneven wei amount not allowed');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## 编译合约 {#compile-the-contract}

要[编译](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)该合约，请将以下条目添加到 package.json 文件中：

```json
"scripts": {
    "build": "waffle"
  }
```

接下来，在项目根目录中创建 Waffle 配置文件 - `waffle.json`，然后将以下配置粘贴进去：

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

运行 `yarn build`。 作为结果，将出现 `build` 目录，并包含以 JSON 格式编译的 EtherSplitter 合约。

## 测试设置 {#test-setup}

使用 Waffle 进行测试需要使用 Chai 匹配器和 Mocha，因此您需要将它们[添加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)到您的项目中。 请更新您的 package.json 文件，在 scripts 部分添加 `test` 条目：

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

如果您想要[执行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)您的测试，只需要运行 `yarn test`。

# 测试 {#testing}

现在创建 `test` 目录，并创建一个新文件 `test\EtherSplitter.test.ts`。 复制下面的代码片段，并粘贴到我们的测试文件中。

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether Splitter", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // add the tests here
})
```

在我们开始之前，先来说几句。 `MockProvider` 提供了该区块链的模拟版本。 它还提供了模拟钱包，这对我们测试 EtherSplitter 合约非常有用。 我们可以通过在提供者上调用 `getWallets()`方法来获取最多十个钱包。 在这个例子中，我们获取了三个钱包 - 一个给发送者，另外两个给接收者。

下一步，我们声明一个名为“splitter”的变量 - 这是我们的模拟 EtherSplitter 合约。 它在每次执行单个测试之前通过 `deployContract` 方法创建。 这个方法模拟了从钱包（作为第一个参数进行传递，在我们的例子中是发送者的钱包）部署合约的过程。 第二个参数是被测试合约的 ABI 和字节码，我们传入了从 `build` 目录中编译的 EtherSplitter 合约的 JSON 文件。 第三个参数是一个数组，包含合约的构造函数参数，在我们的例子中，它是接收者的两个地址。

## changeBalances {#changebalances}

首先，我们将检查 split 方法是否确实更改了接收者钱包的余额。 如果我们从发送者帐户中拆分 50 wei，我们预计两个接收者的余额都会增加 25 wei。 我们将使用 Waffle 的 `changeBalances` 匹配器：

```ts
it("Changes accounts balances", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

作为匹配器的第一个参数，我们传递接收者钱包的一个数组；作为第二个参数，我们传递相应帐户预期增加的数组。 如果我们想要检查某个特定钱包的余额，我们也可以使用 `changeBalance` 匹配器，它不需要像下面的示例中那样传递数组：

```ts
it("Changes account balance", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

注意，无论是 `changeBalance` 还是 `changeBalances`，在两种情况下，我们都将 split 函数作为回调函数传递，因为匹配器需要访问调用之前和之后的余额状态。

接下来，我们将测试是否在每次 wei 转账后触发了 Transfer 转账事件。 我们将转向 Waffle 中的另一个匹配器：

## Emit {#emit}

```ts
it("Emits event on the transfer to the first receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("Emits event on the transfer to the second receiver", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` 匹配器允许我们检查合约在调用方法时是否触发了事件。 作为 `emit` 匹配器的参数，我们提供我们预测将触发事件的模拟合约，以及该事件的名称。 在我们的例子中，模拟合约是 `splitter`，事件名称为 `Transfer`。 我们还可以验证事件触发时使用的具体参数值 - 我们向 `withArgs` 匹配器传递的参数数量应该与我们事件声明所期望的参数数量相同。 对于 EtherSplitter 合约，我们需要传递发送者和接收者的地址，以及转移的 wei 数量作为参数。

## revertedWith {#revertedwith}

作为最后一个例子，我们将检查如果 wei 数量拆分不均匀时是否回滚了交易。 我们将使用 `revertedWith` 匹配器：

```ts
it("Reverts when Vei amount uneven", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

如果测试通过，这将确保该交易确实已被回滚。 然而，在 `require` 语句中传递的消息和我们在 `revertedWith` 中期望的消息之间也必须完全匹配。 如果我们回到 EtherSplitter 合约的代码中，在关于 wei 数量的 `require` 语句中，我们提供了这样的信息：“Uneven wei amount not allowed”（不允许 wei 数量不均匀）。 这与我们在测试中期望的消息相匹配。 如果它们不相等，则测试将失败。

# 恭喜您！ {#congratulations}

您已经迈出了使用 Waffle 测试智能合约的第一步！ 您可能对其它的 Waffle 教程感兴趣：

- [使用 Waffle 测试 ERC20](/developers/tutorials/testing-erc-20-tokens-with-waffle/)
- [Waffle：动态模拟和测试合约调用](/developers/tutorials/waffle-dynamic-mocking-and-testing-calls/#gatsby-focus-wrapper)
- [Waffle 使用 hardhat 和 ethers 设置 hello world 的教程](/developers/tutorials/waffle-hello-world-with-buidler-tutorial/)
