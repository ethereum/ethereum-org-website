---
title: "使用 hardhat 和 ethers 的 Waffle hello world 教學"
description: 使用 hardhat 和 ethers.js 建立您的第一個 Waffle 專案
author: "MiZiet"
tags:
  [
    "waffle",
    "智能合約",
    "穩固",
    "測試",
    "hardhat",
    "ethers.js"
  ]
skill: beginner
lang: zh-tw
published: 2020-10-16
---

在本 [Waffle](https://ethereum-waffle.readthedocs.io) 教學中，我們將學習如何使用 [hardhat](https://hardhat.org/) 和 [ethers.js](https://docs.ethers.io/v5/) 設定一個簡單的「Hello world」智能合約專案。 然後，我們將學習如何為我們的智能合約新增功能，以及如何用 Waffle 進行測試。

讓我們從建立一個新專案開始：

```bash
yarn init
```

或

```bash
npm init
```

並安裝必要的套件：

```bash
yarn add -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

或

```bash
npm install -D hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

下一步是執行 `npx hardhat` 來建立一個範例 hardhat 專案。

```bash
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.3 👷‍

? What do you want to do? …
❯ Create a sample project
Create an empty hardhat.config.js
Quit
```

選擇 `Create a sample project`

我們專案的結構應該如下所示：

```
MyWaffleProject
├── contracts
│   └── Greeter.sol
├── node_modules
├── scripts
│   └── sample-script.js
├── test
│   └── sample-test.js
├── .gitattributes
├── .gitignore
├── hardhat.config.js
└── package.json
```

### 現在讓我們來談談其中一些檔案：{#now-lets-talk}

- Greeter.sol - 我們用 solidity 編寫的智能合約；

```solidity
contract Greeter {
string greeting;

constructor(string memory _greeting) public {
console.log("正在部署帶有問候語的 Greeter：", _greeting);
greeting = _greeting;
}

function greet() public view returns (string memory) {
return greeting;
}

function setGreeting(string memory _greeting) public {
console.log("正在將問候語從「%s」變更為「%s」", greeting, _greeting);
greeting = _greeting;
}
}
```

我們的智能合約可以分為三個部分：

1. constructor - 我們在這裡宣告一個名為 `greeting` 的字串類型變數，
2. function greet - 一個在被呼叫時會回傳 `greeting` 的函式，
3. function setGreeting - 一個讓我們可以變更 `greeting` 值的函式。

- sample-test.js - 我們的測試檔案

```js
describe("Greeter", function () {
  it("變更後應回傳新的問候語", async function () {
    const Greeter = await ethers.getContractFactory("Greeter")
    const greeter = await Greeter.deploy("Hello, world!")

    await greeter.deployed()
    expect(await greeter.greet()).to.equal("Hello, world!")

    await greeter.setGreeting("Hola, mundo!")
    expect(await greeter.greet()).to.equal("Hola, mundo!")
  })
})
```

### 下一步是編譯我們的合約並執行測試：{#compiling-and-testing}

Waffle 測試使用 Mocha (一個測試框架) 和 Chai (一個斷言庫)。 您只需執行 `npx hardhat test`，並等待以下訊息出現即可。

```bash
✓ 變更後應回傳新的問候語
```

### 目前為止一切看起來都很好，讓我們為專案增加一點複雜性吧 <Emoji text=":slightly_smiling_face:" size={1}/> {#adding-complexity}

想像一下，有人將一個空字串作為問候語新增進來。 那不會是個熱情的問候，對吧？  
讓我們確保這種情況不會發生：

當有人傳入空字串時，我們希望使用 solidity 的 `revert`。 好消息是，我們可以用 Waffle 的 chai 匹配器 `to.be.revertedWith()` 輕鬆地測試此功能。

```js
it("傳入空字串時應還原", async () => {
  const Greeter = await ethers.getContractFactory("Greeter")
  const greeter = await Greeter.deploy("Hello, world!")

  await greeter.deployed()
  await expect(greeter.setGreeting("")).to.be.revertedWith(
    "問候語不應為空"
  )
})
```

看來我們的新測試沒有通過：

```bash
正在部署帶有問候語的 Greeter：Hello, world!
正在將問候語從 'Hello, world!' 變更為 'Hola, mundo!'
    ✓ 變更後應回傳新的問候語 (1514ms)
正在部署帶有問候語的 Greeter：Hello, world!
正在將問候語從 'Hello, world!' 變更為 ''
    1) 傳入空字串時應還原


  1 個通過 (2s)
  1 個失敗
```

讓我們在智能合約中實作此功能：

```solidity
require(bytes(_greeting).length > 0, "問候語不應為空");
```

現在，我們的 setGreeting 函式看起來像這樣：

```solidity
function setGreeting(string memory _greeting) public {
require(bytes(_greeting).length > 0, "問候語不應為空");
console.log("正在將問候語從「%s」變更為「%s」", greeting, _greeting);
greeting = _greeting;
}
```

讓我們再執行一次測試：

```bash
✓ 變更後應回傳新的問候語 (1467ms)
✓ 傳入空字串時應還原 (276ms)

2 個通過 (2s)
```

恭喜！ 您做到了 :)

### 結論 {#conclusion}

我們用 Waffle、Hardhat 和 ethers.js 建立了一個簡單的專案。 我們學會了如何設定專案、新增測試和實作新功能。

想了解更多用於測試智能合約的強大 chai 匹配器，請查看 [Waffle 的官方文件](https://ethereum-waffle.readthedocs.io/en/latest/matchers.html)。
