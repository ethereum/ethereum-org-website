---
title: 使用 Waffle 程式庫測試簡單的智能合約
description: 初學者教學
author: Ewa Kowalska
tags: [ "智能合約", "穩固", "Waffle", "測試" ]
skill: beginner
lang: zh-tw
published: 2021-02-26
---

## 在本教學中，你將學會如何 {#in-this-tutorial-youll-learn-how-to}

- 測試錢包餘額的變動
- 使用指定的引數測試事件發出
- 斷言交易已被回復

## 假設 {#assumptions}

- 你可以建立一個新的 JavaScript 或 TypeScript 專案
- 你擁有基本的 JavaScript 測試經驗
- 你使用過一些套件管理器，例如 yarn 或 npm
- 你擁有智能合約和 Solidity 的基本知識

## 入門 {#getting-started}

本教學示範如何使用 yarn 設定和執行測試，但如果你偏好使用 npm 也沒有問題——我會提供 Waffle 官方[文件](https://ethereum-waffle.readthedocs.io/en/latest/index.html)的相應參考資料。

## 安裝相依性 {#install-dependencies}

將 ethereum-waffle 和 typescript 相依性[新增](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#installation)到你專案的開發相依性中。

```bash
yarn add --dev ethereum-waffle ts-node typescript @types/jest
```

## 智能合約範例 {#example-smart-contract}

在本教學中，我們將使用一個簡單的智能合約範例——EtherSplitter。 它的功能不多，只不過是讓任何人都能傳送一些 wei，並將其平均分配給兩個預先定義的接收者。
split 函式要求 wei 的數量必須是偶數，否則交易將會回復。 對於兩個接收者，它都會執行一筆 wei 轉帳，然後發出 Transfer 事件。

將 EtherSplitter 的程式碼片段放在 `src/EtherSplitter.sol` 中。

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
        require(msg.value % 2 == 0, '不允許奇數的 wei 金額');
        receiver1.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver1, msg.value / 2);
        receiver2.transfer(msg.value / 2);
        emit Transfer(msg.sender, receiver2, msg.value / 2);
    }
}
```

## 編譯合約 {#compile-the-contract}

若要[編譯](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#compiling-the-contract)合約，請將以下項目新增至 package.json 檔案中：

```json
"scripts": {
    "build": "waffle"
  }
```

接著，在專案的根目錄中建立 Waffle 設定檔——`waffle.json`——然後在其中貼上以下設定：

```json
{
  "compilerType": "solcjs",
  "compilerVersion": "0.6.2",
  "sourceDirectory": "./src",
  "outputDirectory": "./build"
}
```

執行 `yarn build`。 結果 `build` 目錄將會出現，其中包含 JSON 格式的已編譯 EtherSplitter 合約。

## 測試設定 {#test-setup}

使用 Waffle 進行測試需要使用 Chai 比對器和 Mocha，因此你需要將它們[新增](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)到你的專案中。 更新你的 package.json 檔案，並在 scripts 部分新增 `test` 項目：

```json
"scripts": {
    "build": "waffle",
    "test": "export NODE_ENV=test && mocha -r ts-node/register 'test/**/*.test.ts'"
  }
```

如果你想[執行](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#running-tests)你的測試，只要執行 `yarn test` 即可。

## 測試 {#testing}

現在建立 `test` 目錄，並建立新檔案 `test\EtherSplitter.test.ts`。
複製下方的程式碼片段並貼到我們的測試檔案中。

```ts
import { expect, use } from "chai"
import { Contract } from "ethers"
import { deployContract, MockProvider, solidity } from "ethereum-waffle"
import EtherSplitter from "../build/EtherSplitter.json"

use(solidity)

describe("Ether 分配器", () => {
  const [sender, receiver1, receiver2] = new MockProvider().getWallets()
  let splitter: Contract

  beforeEach(async () => {
    splitter = await deployContract(sender, EtherSplitter, [
      receiver1.address,
      receiver2.address,
    ])
  })

  // 在此處新增測試
})
```

在我們開始之前，先說幾句話。
`MockProvider` 提供一個模擬版本的區塊鏈。 它也提供模擬錢包，我們將用它來測試 EtherSplitter 合約。 我們可以透過在提供者上呼叫 `getWallets()` 方法來取得最多十個錢包。 在這個範例中，我們取得三個錢包——一個給傳送者，兩個給接收者。

接著，我們宣告一個名為「splitter」的變數——這是我們的模擬 EtherSplitter 合約。 它會在每次執行單一測試前，由 `deployContract` 方法建立。 此方法會模擬從作為第一個參數傳入的錢包（在我們的案例中是傳送者的錢包）部署合約。 第二個參數是被測試合約的 ABI 和位元組碼——我們在此傳入 `build` 目錄中已編譯的 EtherSplitter 合約的 json 檔案。 第三個參數是一個包含合約建構函式引數的陣列，在我們的案例中，是兩個接收者的地址。

## changeBalances {#changebalances}

首先，我們將檢查 split 方法是否真的會改變接收者錢包的餘額。 如果我們從傳送者帳戶中分出 50 wei，我們預期兩個接收者的餘額都會增加 25 wei。 我們將使用 Waffle 的 `changeBalances` 比對器：

```ts
it("改變帳戶餘額", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalances(
    [receiver1, receiver2],
    [25, 25]
  )
})
```

我們將接收者錢包的陣列作為比對器的第一個參數傳入，並將對應帳戶的預期增額陣列作為第二個參數傳入。
如果我們想檢查某個特定錢包的餘額，我們也可以使用 `changeBalance` 比對器，它不需要傳入陣列，如下方範例所示：

```ts
it("改變帳戶餘額", async () => {
  await expect(() => splitter.split({ value: 50 })).to.changeBalance(
    receiver1,
    25
  )
})
```

請注意，在 `changeBalance` 和 `changeBalances` 的情況下，我們都將 split 函式作為回呼傳遞，因為比對器需要在呼叫前後存取餘額的狀態。

接下來，我們將測試每次轉移 wei 後是否發出了 Transfer 事件。 我們將使用 Waffle 的另一個比對器：

## Emit {#emit}

```ts
it("向第一個接收者轉帳時發出事件", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver1.address, 25)
})

it("向第二個接收者轉帳時發出事件", async () => {
  await expect(splitter.split({ value: 50 }))
    .to.emit(splitter, "Transfer")
    .withArgs(sender.address, receiver2.address, 25)
})
```

`emit` 比對器讓我們可以檢查合約在呼叫方法時是否發出了事件。 我們將預測會發出事件的模擬合約以及該事件的名稱，作為 `emit` 比對器的參數。 在我們的案例中，模擬合約是 `splitter`，事件名稱是 `Transfer`。 我們也可以驗證事件發出時所帶引數的確切值——我們傳遞給 `withArgs` 比對器的引數數量，與我們的事件宣告所預期的數量相同。 在 EtherSplitter 合約的案例中，我們傳入傳送者和接收者的地址以及轉帳的 wei 金額。

## revertedWith {#revertedwith}

作為最後一個範例，我們將檢查在 wei 數量為奇數的情況下，交易是否被回復。 我們將使用 `revertedWith` 比對器：

```ts
it("當 wei 金額為奇數時回復", async () => {
  await expect(splitter.split({ value: 51 })).to.be.revertedWith(
    "不允許奇數的 wei 金額"
  )
})
```

如果測試通過，將確保交易確實已被回復。 但是，我們在 `require` 陳述式中傳遞的訊息，必須與我們在 `revertedWith` 中預期的訊息完全相符。 如果我們回到 EtherSplitter 合約的程式碼，在針對 wei 金額的 `require` 陳述式中，我們提供的訊息是：「不允許奇數的 wei 金額」。 這與我們在測試中預期的訊息相符。 如果兩者不相等，測試就會失敗。

## 恭喜！ {#congratulations}

你已經邁出了使用 Waffle 測試智能合約的第一大步！
