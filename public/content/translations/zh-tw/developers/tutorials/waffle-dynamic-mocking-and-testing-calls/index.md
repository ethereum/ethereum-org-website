---
title: "Waffle：動態模擬與測試合約呼叫"
description: "使用動態模擬與測試合約呼叫的進階 Waffle 教學"
author: "Daniel Izdebski"
tags: [ "waffle", "smart contracts", "solidity", "testing", "mocking" ]
skill: intermediate
lang: zh-tw
published: 2020-11-14
---

## 本教學的主題是什麼？ {#what-is-this-tutorial-about}

在本教學中，您將學習如何：

- 使用動態模擬
- 測試智能合約之間的互動

假設：

- 您已經知道如何用 `Solidity` 編寫簡單的智能合約
- 您熟悉 `JavaScript` 和 `TypeScript`
- 您已經完成其他 `Waffle` 教學，或對它略知一二

## 動態模擬 {#dynamic-mocking}

為什麼動態模擬很有用？ 嗯，它讓我們可以編寫單元測試，而不是整合測試。 這是什麼意思呢？ 這表示我們不必擔心智能合約的依賴性，因此我們可以在完全隔離的環境中測試所有合約。 讓我為您示範確切的做法。

### **1. 專案** {#1-project}

在開始之前，我們需要準備一個簡單的 node.js 專案：

```bash
mkdir dynamic-mocking
cd dynamic-mocking
mkdir contracts src

yarn init
# 或者如果您使用 npm
npm init
```

讓我們先加入 typescript 和測試依賴項 - mocha 和 chai：

```bash
yarn add --dev @types/chai @types/mocha chai mocha ts-node typescript
# 或者如果您使用 npm
npm install @types/chai @types/mocha chai mocha ts-node typescript --save-dev
```

現在，讓我們加入 `Waffle` 和 `ethers`：

```bash
yarn add --dev ethereum-waffle ethers
# 或者如果您使用 npm
npm install ethereum-waffle ethers --save-dev
```

您的專案結構現在應該如下所示：

```
.
├── contracts
├── package.json
└── test
```

### **2. 智能合約** {#2-smart-contract}

要開始動態模擬，我們需要一個有依賴項的智能合約。 別擔心，我已經為您準備好了！

這是一個用 `Solidity` 編寫的簡單智能合約，其唯一目的是檢查我們是否富有。 它使用 ERC20 代幣來檢查我們是否有足夠的代幣。 將它放在 `./contracts/AmIRichAlready.sol` 中。

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

因為我們要使用動態模擬，所以我們不需要完整的 ERC20，這就是為什麼我們只使用具有單一函數的 IERC20 介面。

是時候建置這個合約了！ 為此，我們將使用 `Waffle`。 首先，我們要建立一個簡單的 `waffle.json` 設定檔，用來指定編譯選項。

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./contracts",
  "outputDirectory": "./build"
}
```

現在我們準備好用 Waffle 來建置合約了：

```bash
npx waffle
```

很簡單，對吧？ 在 `build/` 資料夾中，會出現兩個分別對應合約和介面的檔案。 我們稍後會用它們來進行測試。

### **3. 測試** {#3-testing}

讓我們建立一個名為 `AmIRichAlready.test.ts` 的檔案，用於實際測試。 首先，我們必須處理匯入的部分。 我們稍後會需要它們：

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

除了 JS 依賴項之外，我們還需要匯入建置好的合約和介面：

```typescript
import IERC20 from "../build/IERC20.json"
import AmIRichAlready from "../build/AmIRichAlready.json"
```

Waffle 使用 `chai` 進行測試。 不過，在使用之前，我們必須將 Waffle 的匹配器注入 chai 本身：

```typescript
use(solidity)
```

我們需要實作 `beforeEach()` 函數，它會在每次測試前重設合約的狀態。 讓我們先想一下我們需要什麼。 要部署合約，我們需要兩樣東西：一個錢包，以及一個已部署的 ERC20 合約，以便將它作為引數傳遞給 `AmIRichAlready` 合約。

首先，我們建立一個錢包：

```typescript
const [wallet] = new MockProvider().getWallets()
```

然後，我們需要部署一個 ERC20 合約。 棘手的部分來了——我們只有一個介面。 這就是 Waffle 派上用場的時候了。 Waffle 有一個神奇的 `deployMockContract()` 函數，它只用介面的 _abi_ 就能建立一個合約：

```typescript
const mockERC20 = await deployMockContract(wallet, IERC20.abi)
```

現在有了錢包和已部署的 ERC20，我們就可以繼續部署 `AmIRichAlready` 合約了：

```typescript
const contract = await deployContract(wallet, AmIRichAlready, [
  mockERC20.address,
])
```

這樣一來，我們的 `beforeEach()` 函數就完成了。 到目前為止，您的 `AmIRichAlready.test.ts` 檔案應該如下所示：

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

describe("我已經富有了嗎", () => {
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

讓我們為 `AmIRichAlready` 合約編寫第一個測試。 您認為我們的測試應該關於什麼？ 是的，您說對了！ 我們應該檢查我們是否已經富有了 :)

但請等一下。 我們的模擬合約要如何知道該傳回什麼值？ 我們還沒有為 `balanceOf()` 函數實作任何邏輯。 同樣地，Waffle 在這裡可以幫上忙。 我們的模擬合約現在有了一些酷炫的新功能：

```typescript
await mockERC20.mock.<nameOfMethod>.returns(<value>)
await mockERC20.mock.<nameOfMethod>.withArgs(<arguments>).returns(<value>)
```

有了這些知識，我們終於可以編寫我們的第一個測試了：

```typescript
it("如果錢包的代幣少於 1,000,000，則傳回 false", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

讓我們把這個測試分解成幾個部分：

1. 我們將模擬 ERC20 合約設定為一律傳回 999,999 枚代幣的餘額。
2. 檢查 `contract.check()` 方法是否傳回 `false`。

我們準備好來啟動這個大傢伙了：

![一個測試通過](./test-one.png)

所以測試成功了，但是…… 還有一些改進的空間。 `balanceOf()` 函數將一律傳回 99999。 我們可以透過指定函數應為哪個錢包傳回某些內容來改進它——就像一個真正的合約一樣：

```typescript
it("如果錢包的代幣少於 1,000,001，則傳回 false", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  expect(await contract.check()).to.be.equal(false)
})
```

到目前為止，我們只測試了我們不夠富有的情況。 讓我們來測試相反的情況：

```typescript
it("如果錢包至少有 1,000,001 個代幣，則傳回 true", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("1000001"))
  expect(await contract.check()).to.be.equal(true)
})
```

您執行測試……

![兩個測試通過](test-two.png)

……然後就完成了！ 我們的合約似乎如預期般運作 :)

## 測試合約呼叫 {#testing-contract-calls}

讓我們總結一下目前為止所做的事情。 我們已經測試了 `AmIRichAlready` 合約的功能，它似乎運作正常。 這表示我們完成了，對吧？ 不完全是！ Waffle 讓我們可以更進一步地測試合約。 但確切要怎麼做呢？ 嗯，在 Waffle 的工具箱裡，有 `calledOnContract()` 和 `calledOnContractWith()` 匹配器。 它們讓我們可以檢查我們的合約是否呼叫了 ERC20 模擬合約。 以下是使用其中一個匹配器的基本測試：

```typescript
it("檢查合約是否在 ERC20 代幣上呼叫了 balanceOf", async () => {
  await mockERC20.mock.balanceOf.returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContract(mockERC20)
})
```

我們可以更進一步，用我跟您提過的另一個匹配器來改進這個測試：

```typescript
it("檢查合約是否在 ERC20 代幣上用特定錢包呼叫了 balanceOf", async () => {
  await mockERC20.mock.balanceOf
    .withArgs(wallet.address)
    .returns(utils.parseEther("999999"))
  await contract.check()
  expect("balanceOf").to.be.calledOnContractWith(mockERC20, [wallet.address])
})
```

讓我們檢查測試是否正確：

![三個測試通過](test-three.png)

太好了，所有測試都顯示為綠色。

用 Waffle 測試合約呼叫非常簡單。 最棒的是。 這些匹配器對一般合約和模擬合約都有效！ 這是因為 Waffle 記錄並過濾 EVM 呼叫，而不是像其他技術的流行測試函式庫那樣注入程式碼。

## 終點線 {#the-finish-line}

恭喜！ 現在您知道如何使用 Waffle 來測試合約呼叫和動態模擬合約了。 還有更多有趣的功能等著您去發掘。 我建議您深入研究 Waffle 的文件。

Waffle 的文件可從[此處](https://ethereum-waffle.readthedocs.io/)取得。

本教學的原始程式碼可以在[這裡](https://github.com/EthWorks/Waffle/tree/master/examples/dynamic-mocking-and-testing-calls)找到。

您可能也會感興趣的教學：

- [用 Waffle 測試智能合約](/developers/tutorials/waffle-test-simple-smart-contract/)
