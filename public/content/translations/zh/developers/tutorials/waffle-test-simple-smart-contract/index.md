---
title: 用 Waffle 库测试简单的智能合约
description: 初学者教程
author: Ewa Kowalska
tags: [ "智能合同", "Solidity", "Waffle", "测试" ]
skill: beginner
lang: zh
published: 2021-02-26
---

## 在本教程中，你将学习如何 {#in-this-tutorial-youll-learn-how-to}

- 测试钱包余额的变化
- 利用指定参数测试事件的触发
- 断言交易已回滚

## 前提条件 {#assumptions}

- 你能够创建一个新的 JavaScript 或 TypeScript 项目
- 你拥有一些用 JavaScript 进行测试的基本经验
- 你使用过一些包管理器，如 yarn 或 npm
- 你拥有关于智能合约和 Solidity 的最基本的知识

## 入门 {#getting-started}

本教程演示了如何使用 yarn 设置和运行测试，但如果你更喜欢用 npm 也没问题——我会提供 Waffle 官方[文档](https://ethereum-waffle.readthedocs.io/en/latest/index.html)的正确参考资料。

## 安装依赖项 {#install-dependencies}

将 ethereum-waffle 和 typescript 依赖项[添加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)到你项目的开发依赖项中。

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## 智能合约示例 {#example-smart-contract}

在本教程中，我们将使用一个简单的智能合约示例——EtherSplitter。 它的功能不多，只是允许任何人发送一些 wei，并将其在两个预定义的接收者之间平均分配。
split 函数要求 wei 的数量为偶数，否则它将回滚。 对于两个接收者，它都会执行一次 wei 转账，然后触发 Transfer 事件。

将 EtherSplitter 代码片段放置在 `src/EtherSplitter.sol` 中。

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

要[编译](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)合约，请将以下条目添加到 package.json 文件中：

```json
"scripts": {
    "build": "waffle"
  }
```

接下来，在项目根目录中创建 Waffle 配置文件——`waffle.json`——然后将以下配置粘贴到其中：

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

运行 `yarn build`。 结果，`build` 目录将会出现，其中包含 JSON 格式的已编译的 EtherSplitter 合约。

## 测试设置 {#test-setup}

使用 Waffle 测试需要用到 Chai 匹配器和 Mocha，因此你需要将它们[添加](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)到你的项目中。 更新你的 package.json 文件，并在 scripts 部分添加 `test` 条目：

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

如果你想[执行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)测试，只需运行 `yarn test` 。

## 测试 {#testing}

现在创建 `test` 目录，并创建新文件 `test\EtherSplitter.test.ts`。
复制下面的代码片段，并粘贴到我们的测试文件中。

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

  // 在此处添加测试
})
```

在我们开始之前，先说几句。
`MockProvider` 提供了一个区块链的模拟版本。 它还提供了模拟钱包，我们可以用它来测试 EtherSplitter 合约。 通过在 provider 上调用 `getWallets()` 方法，我们最多可以获得十个钱包。 在本例中，我们得到三个钱包——一个给发送者，两个给接收者。

接下来，我们声明一个名为“splitter”的变量——这是我们的 EtherSplitter 模拟合约。 它在每次执行单个测试前，由 `deployContract` 方法创建。 此方法模拟从作为第一个参数传递的钱包（在我们的例子中是发送者的钱包）部署合约。 第二个参数是被测合约的 ABI 和字节码——我们在此传入 `build` 目录中已编译的 EtherSplitter 合约的 json 文件。 第三个参数是一个包含合约构造函数参数的数组，在我们的例子中，是两个接收者的地址。

## changeBalances {#changebalances}

首先，我们将检查 split 方法是否确实更改了接收者钱包的余额。 如果我们从发送者帐户中分出 50 wei，我们期望两个接收者的余额都增加 25 wei。 我们将使用 Waffle 的 `changeBalances` 匹配器：

```ts
it("更改账户余额", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

作为匹配器的第一个参数，我们传入一个接收者钱包的数组，作为第二个参数，则传入相应账户预期增加额的数组。
如果我们想检查某个特定钱包的余额，我们也可以使用 `changeBalance` 匹配器，它不需要传入数组，如下例所示：

```ts
it("更改账户余额", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

请注意，在 `changeBalance` 和 `changeBalances` 两种情况下，我们都将 split 函数作为回调传递，因为匹配器需要访问调用前后的余额状态。

接下来，我们将测试每次 wei 转账后是否都触发了 Transfer 事件。 我们将使用 Waffle 的另一个匹配器：

## Emit {#emit}

```ts
it("向第一个接收者转账时触发事件", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("向第二个接收者转账时触发事件", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` 匹配器允许我们检查合约在调用方法时是否触发了一个事件。 作为 `emit` 匹配器的参数，我们提供了我们预测将触发事件的模拟合约，以及该事件的名称。 在我们的例子中，模拟合约是 `splitter`，事件名称是 `Transfer`。 我们还可以验证事件触发时所带参数的精确值——我们向 `withArgs` 匹配器传入的参数数量与事件声明所期望的数量相同。 在 EtherSplitter 合约中，我们传入发送者和接收者的地址以及转账的 wei 数量。

## revertedWith {#revertedwith}

作为最后一个例子，我们将检查当 wei 数量为奇数时，交易是否被回滚。 我们将使用 `revertedWith` 匹配器：

```ts
it("当 Wei 数量为奇数时回滚", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "Uneven wei amount not allowed"
  )
})
```

如果测试通过，它将确保交易确实被回滚了。 但是，我们在 `require` 语句中传递的消息和我们在 `revertedWith` 中期望的消息必须完全匹配。 如果我们回到 EtherSplitter 合约的代码，在针对 wei 数量的 `require` 语句中，我们提供的消息是：‘Uneven wei amount not allowed’。 这与我们在测试中期望的消息相匹配。 如果它们不相等，测试就会失败。

## 恭喜！ {#congratulations}

你已经迈出了使用 Waffle 测试智能合约的第一大步！
