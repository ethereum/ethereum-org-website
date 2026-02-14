---
title: "為優化 Calldata 而設的精簡 ABI"
description: "為樂觀卷軸優化智能合約"
author: Ori Pomerantz
lang: zh-tw
tags: [ "Layer 2" ]
skill: intermediate
published: 2022-04-01
---

## 介紹 {#introduction}

在本文中，您將學習[樂觀卷軸](/developers/docs/scaling/optimistic-rollups)，了解其交易成本，以及這種不同的成本結構如何要求我們針對不同於以太坊主網的事物進行優化。
您也將學習如何實作此項優化。

### 利益揭露 {#full-disclosure}

我是 [Optimism](https://www.optimism.io/) 的全職員工，因此本文中的範例將在 Optimism 上運行。
然而，此處說明的技術也應同樣適用於其他卷軸。

### 術語 {#terminology}

在討論卷軸時，術語「第 1 層」(L1) 用於指代主網，也就是正式運作的以太坊網路。
術語「第 2 層」(L2) 用於指代卷軸或任何其他依賴 L1 安全性，但其大部分處理在鏈下進行的系統。

## 如何能進一步降低 L2 交易的成本？ {#how-can-we-further-reduce-the-cost-of-L2-transactions}

[樂觀卷軸](/developers/docs/scaling/optimistic-rollups) 必須保存每筆歷史交易的紀錄，以便任何人都能夠檢查它們並驗證當前狀態是否正確。
將資料寫入以太坊主網最便宜的方法，是將其寫為 calldata。
[Optimism](https://help.optimism.io/hc/en-us/articles/4413163242779-What-is-a-rollup-) 和 [Arbitrum](https://developer.offchainlabs.com/docs/rollup_basics#intro-to-rollups) 都選擇了這個解決方案。

### L2 交易的成本 {#cost-of-l2-transactions}

L2 交易的成本由兩部分組成：

1. L2 處理，通常非常便宜
2. L1 儲存，與主網的 gas 費用相關

在我撰寫本文時，Optimism 上的 L2 gas 成本為 0.001 [Gwei](/developers/docs/gas/#pre-london)。
另一方面，L1 的 gas 成本約為 40 gwei。
[您可以在此處查看目前價格](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)。

一個 calldata 位元組的成本為 4 gas (如果其值為零) 或 16 gas (如果其值為任何其他值)。
在 EVM 上最昂貴的操作之一是寫入儲存空間。
在 L2 上將一個 32 位元組的字詞寫入儲存空間的最高成本為 22100 gas。 目前，這相當於 22.1 gwei。
因此，如果我們能節省一個 calldata 的零位元組，我們將能寫入約 200 個位元組到儲存空間，而且仍然划算。

### ABI {#the-abi}

大多數交易從外部帳戶存取合約。
大多數合約都是用 Solidity 編寫的，並根據[應用程式二進位介面 (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) 來解譯其資料欄位。

然而，ABI 是為 L1 設計的，在 L1 上，一個 calldata 位元組的成本約等於四次算術運算，但在 L2 上，一個 calldata 位元組的成本超過一千次算術運算。
calldata 的劃分如下：

| 部分    | 長度 |   位元組 | 浪費的位元組 | 浪費的 gas | 必要的位元組 | 必要的 gas |
| ----- | -: | ----: | -----: | ------: | -----: | ------: |
| 函式選擇器 |  4 |   0-3 |      3 |      48 |      1 |      16 |
| 零值    | 12 |  4-15 |     12 |      48 |      0 |       0 |
| 目標地址  | 20 | 16-35 |      0 |       0 |     20 |     320 |
| 數量    | 32 | 36-67 |     17 |      64 |     15 |     240 |
| 總計    | 68 |       |        |     160 |        |     576 |

說明：

- **函式選擇器**：合約的函式少於 256 個，因此我們可以用單一位元組來區分它們。
  這些位元組通常為非零值，因此[成本為 16 gas](https://eips.ethereum.org/EIPS/eip-2028)。
- **零值**：這些位元組永遠為零，因為一個 20 位元組的地址並不需要一個 32 位元組的字詞來儲存它。
  儲存零值的位元組成本為 4 gas ([請參閱黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)，附錄 G，
  第 27 頁，`G`<sub>`txdatazero`</sub> 的值)。
- **數量**：如果我們假設在此合約中 `decimals` 為 18 (正常值)，而我們轉帳的代幣最大數量為 10<sup>18</sup>，那我們得到的最大數量就是 10<sup>36</sup>。
  256<sup>15</sup> &gt; 10<sup>36</sup>，所以 15 個位元組就夠了。

在 L1 上浪費 160 gas 通常可以忽略不計。 一筆交易至少花費 [21,000 gas](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)，所以額外的 0.8% 無關緊要。
然而，在 L2 上，情況就不同了。 幾乎整筆交易的成本都花在將其寫入 L1。
除了交易的 calldata，還有 109 個位元組的交易標頭 (目標地址、簽名等)。
因此總成本為 `109*16+576+160=2480`，我們浪費了其中約 6.5%。

## 在您無法控制目標的情況下降低成本 {#reducing-costs-when-you-dont-control-the-destination}

假設您無法控制目標合約，您仍然可以使用類似[這個](https://github.com/qbzzt/ethereum.org-20220330-shortABI)的解決方案。
讓我們來看看相關的檔案。

### Token.sol {#token-sol}

[這是目標合約](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
它是一個標準的 ERC-20 合約，帶有一個額外的功能。
這個 `faucet` 函式讓任何使用者都能取得一些代幣來使用。
它會讓一個生產環境的 ERC-20 合約變得無用，但當 ERC-20 只是為了方便測試而存在時，它能讓事情變得更簡單。

```solidity
    /**
     * @dev 讓呼叫者獲得 1000 個代幣使用
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[這個合約是預期交易會用較短的 calldata 來呼叫的合約](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
讓我們逐行檢視它。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

我們需要匯入代幣合約，才能知道如何呼叫它的函式。

```solidity
contract CalldataInterpreter {

    OrisUselessToken public immutable token;
```

我們作為代理的代幣地址。

```solidity

    /**
     * @dev 指定代幣地址
     * @param tokenAddr_ ERC-20 合約地址
     */
    constructor(
        address tokenAddr_
    )  {
        token = OrisUselessToken(tokenAddr_);
    }   // constructor
```

代幣地址是我們唯一需要指定的參數。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

從 calldata 讀取一個值。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal 長度限制為 32 位元組");

        require(length + startByte <= msg.data.length,
            "calldataVal 嘗試讀取超過 calldatasize");
```

我們將載入一個 32 位元組 (256 位元) 的字詞到記憶體中，並移除不屬於我們所需欄位的位元組。
這個演算法不適用於長度超過 32 位元組的值，當然我們也不能讀取超過 calldata 結尾的內容。
在 L1 上，可能需要跳過這些測試以節省 gas，但在 L2 上 gas 非常便宜，這使得我們可以進行任何能想到的健全性檢查。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

我們本可以從對 `fallback()` 的呼叫中複製資料 (見下文)，但使用 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) (EVM 的組合語言) 會更容易。

這裡我們使用 [CALLDATALOAD 操作碼](https://www.evm.codes/#35) 將從 `startByte` 到 `startByte+31` 的位元組讀入堆疊。
一般來說，Yul 中操作碼的語法是 `<操作碼名稱>(<第一個堆疊值，如果有的話>,<第二個堆疊值，如果有的話>...)`。

```solidity

        _retVal = _retVal >> (256-length*8);
```

只有最高有效位的 `length` 個位元組是欄位的一部分，所以我們[向右移位](https://en.wikipedia.org/wiki/Logical_shift)以去除其他值。
這還有一個額外的好處，就是將值移動到欄位的右側，這樣它就是值本身，而不是值乘以 256 的某次方。

```solidity

        return _retVal;
    }


    fallback() external {
```

當對 Solidity 合約的呼叫不符合任何函式簽章時，它會呼叫[ `fallback()` 函式](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function) (假設存在的話)。
對於 `CalldataInterpreter`，_任何_ 呼叫都會到達這裡，因為沒有其他 `external` 或 `public` 函式。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

讀取 calldata 的第一個位元組，它會告訴我們是哪個函式。
函式可能無法在此處使用的原因有二：

1. 為 `pure` 或 `view` 的函式不會改變狀態，也不會花費 gas (在鏈下呼叫時)。
   試圖降低它們的 gas 成本沒有意義。
2. 依賴 [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) 的函式。
   `msg.sender` 的值將是 `CalldataInterpreter` 的地址，而不是呼叫者的地址。

遺憾的是，[查看 ERC-20 規範](https://eips.ethereum.org/EIPS/eip-20)後，只剩下一個函式，`transfer`。
這讓我們只剩下兩個函式：`transfer` (因為我們可以呼叫 `transferFrom`) 和 `faucet` (因為我們可以將代幣轉回給呼叫我們的人)。

```solidity

        // 使用來自 calldata 的資訊
        // 呼叫代幣的狀態變更方法

        // faucet
        if (_func == 1) {
```

對 `faucet()` 的呼叫，它沒有參數。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

在我們呼叫 `token.faucet()` 之後，我們會得到代幣。 然而，作為代理合約，我們並**不**需要代幣。
呼叫我們的外部擁有帳戶 (EOA) 或合約才需要。
所以我們將我們所有的代幣轉給呼叫我們的人。

```solidity
        // transfer (假設我們有權限這麼做)
        if (_func == 2) {
```

轉帳代幣需要兩個參數：目標地址和數量。

```solidity
            token.transferFrom(
                msg.sender,
```

我們只允許呼叫者轉帳他們擁有的代幣

```solidity
                address(uint160(calldataVal(1, 20))),
```

目標地址從位元組 #1 開始 (位元組 #0 是函式)。
作為一個地址，它的長度是 20 位元組。

```solidity
                calldataVal(21, 2)
```

對於這個特定的合約，我們假設任何人都想轉帳的代幣最大數量可以用兩個位元組表示 (小於 65536)。

```solidity
            );
        }
```

總體而言，一次轉帳需要 35 個位元組的 calldata：

| 部分    | 長度 |   位元組 |
| ----- | -: | ----: |
| 函式選擇器 |  1 |     0 |
| 目標地址  | 32 |  1-32 |
| 數量    |  2 | 33-34 |

```solidity
    }   // fallback

}       // contract CalldataInterpreter
```

### test.js {#test-js}

[這個 JavaScript 單元測試](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js) 向我們展示了如何使用這個機制 (以及如何驗證它能正確運作)。
我將假設您了解 [chai](https://www.chaijs.com/) 和 [ethers](https://docs.ethers.io/v5/)，並只解釋專門適用於該合約的部分。

```js
const { expect } = require("chai");

describe("CalldataInterpreter", function () {
  it("Should let us use tokens", async function () {
    const Token = await ethers.getContractFactory("OrisUselessToken")
    const token = await Token.deploy()
    await token.deployed()
    console.log("Token addr:", token.address)

    const Cdi = await ethers.getContractFactory("CalldataInterpreter")
    const cdi = await Cdi.deploy(token.address)
    await cdi.deployed()
    console.log("CalldataInterpreter addr:", cdi.address)

    const signer = await ethers.getSigner()
```

我們首先部署這兩個合約。

```javascript
    // 取得代幣來使用
    const faucetTx = {
```

我們不能使用我們通常會使用的高階函式 (例如 `token.faucet()`) 來建立交易，因為我們沒有遵循 ABI。
相反地，我們必須自己建立交易然後再傳送它。

```javascript
      to: cdi.address,
      data: "0x01"
```

我們需要為交易提供兩個參數：

1. `to`，目標地址。
   這是 calldata 解譯器合約。
2. `data`，要傳送的 calldata。
   在 `faucet` 呼叫的情況下，資料是單一位元組 `0x01`。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

我們呼叫[簽署者的 `sendTransaction` 方法](https://docs.ethers.io/v5/api/signer/#Signer-sendTransaction)，因為我們已經指定了目標 (`faucetTx.to`) 且我們需要交易被簽署。

```javascript
// 檢查 faucet 是否正確提供代幣
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

在這裡我們驗證餘額。
`view` 函式不需要節省 gas，所以我們就正常執行它們。

```javascript
// 給予 CDI 額度 (核准無法被代理)
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

給予 calldata 解譯器一個額度以便能夠進行轉帳。

```javascript
// 轉帳代幣
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

建立一個轉帳交易。 第一個位元組是「0x02」，接著是目標地址，最後是數量 (0x0100，十進位為 256)。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 檢查我們是否少了 256 個代幣
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // 以及我們的目標是否收到了它們
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 在您能控制目標合約的情況下降低成本 {#reducing-the-cost-when-you-do-control-the-destination-contract}

如果您確實能控制目標合約，您可以建立繞過 `msg.sender` 檢查的函式，因為它們信任 calldata 解譯器。
[您可以在這裡的 `control-contract` 分支中看到一個範例](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。

如果合約只回應外部交易，我們只需要一個合約就夠了。
然而，那會破壞[可組合性](/developers/docs/smart-contracts/composability/)。
比較好的做法是，讓一個合約回應正常的 ERC-20 呼叫，另一個合約回應帶有短呼叫資料的交易。

### Token.sol {#token-sol-2}

在這個範例中，我們可以修改 `Token.sol`。
這讓我們可以擁有一些只有代理才能呼叫的函式。
以下是新的部分：

```solidity
    // 唯一允許指定 CalldataInterpreter 地址的地址
    address owner;

    // CalldataInterpreter 地址
    address proxy = address(0);
```

ERC-20 合約需要知道授權代理的身分。
但是，我們無法在建構函式中設定此變數，因為我們還不知道它的值。
這個合約會先被實例化，因為代理在其建構函式中需要代幣的地址。

```solidity
    /**
     * @dev 呼叫 ERC20 建構函式。
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

創建者的地址 (稱為 `owner`) 儲存在這裡，因為這是唯一允許設定代理的地址。

```solidity
    /**
     * @dev 設定代理 (CalldataInterpreter) 的地址。
     * 只能由 owner 呼叫一次
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "只能由 owner 呼叫");
        require(proxy == address(0), "代理已設定");

        proxy = _proxy;
    }    // function setProxy
```

代理具有特權存取權限，因為它可以繞過安全性檢查。
為確保我們可以信任代理，我們只讓 `owner` 呼叫此函式，而且只能呼叫一次。
一旦 `proxy` 有了真實的值 (非零)，該值就無法改變，所以即使 owner 決定變壞，或者其助記詞被洩露，我們仍然是安全的。

```solidity
    /**
     * @dev 有些函式可能只能由代理呼叫。
     */
    modifier onlyProxy {
```

這是一個 [`modifier` 函式](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)，它會修改其他函式的運作方式。

```solidity
      require(msg.sender == proxy);
```

首先，驗證我們是被代理呼叫的，而不是其他人。
如果不是，則 `revert`。

```solidity
      _;
    }
```

如果是，則執行我們修改的函式。

```solidity
   /* 允許代理實際為帳戶進行代理的函式 */

    function transferProxy(address from, address to, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _transfer(from, to, amount);
        return true;
    }

    function approveProxy(address from, address spender, uint256 amount)
        public virtual onlyProxy() returns (bool)
    {
        _approve(from, spender, amount);
        return true;
    }

    function transferFromProxy(
        address spender,
        address from,
        address to,
        uint256 amount
    ) public virtual onlyProxy() returns (bool)
    {
        _spendAllowance(from, spender, amount);
        _transfer(from, to, amount);
        return true;
    }
```

這三項操作通常要求訊息直接來自轉移代幣或批准額度的實體。
此處，我們有一個代理版本來執行這些操作，此代理：

1. 由 `onlyProxy()` 修改，因此不允許任何其他人控制它們。
2. 將通常是 `msg.sender` 的地址作為額外參數。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

此 calldata 解譯器幾乎與上面的解釋器相同，只是被代理的函式會接收 `msg.sender` 參數，且 `transfer` 不需要額度。

```solidity
        // transfer (不需額度)
        if (_func == 2) {
            token.transferProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // approve
        if (_func == 3) {
            token.approveProxy(
                msg.sender,
                address(uint160(calldataVal(1, 20))),
                calldataVal(21, 2)
            );
        }

        // transferFrom
        if (_func == 4) {
            token.transferFromProxy(
                msg.sender,
                address(uint160(calldataVal( 1, 20))),
                address(uint160(calldataVal(21, 20))),
                calldataVal(41, 2)
            );
        }
```

### Test.js {#test-js-2}

前面的測試程式碼和這段程式碼之間有一些變化。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

我們需要告訴 ERC-20 合約要信任哪個代理

```js
console.log("CalldataInterpreter addr:", cdi.address)

// 需要兩個簽署者來驗證額度
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

要檢查 `approve()` 和 `transferFrom()`，我們需要第二個簽署者。
我們稱它為 `poorSigner`，因為它不會得到我們的任何代幣 (當然它確實需要有 ETH)。

```js
// 轉帳代幣
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

因為 ERC-20 合約信任代理 (`cdi`)，所以我們不需要額度來中繼轉帳。

```js
// 核准與 transferFrom
const approveTx = {
  to: cdi.address,
  data: "0x03" + poorSigner.address.slice(2, 42) + "00FF",
}
await (await signer.sendTransaction(approveTx)).wait()

const destAddr2 = "0xE1165C689C0c3e9642cA7606F5287e708d846206"

const transferFromTx = {
  to: cdi.address,
  data: "0x04" + signer.address.slice(2, 42) + destAddr2.slice(2, 42) + "00FF",
}
await (await poorSigner.sendTransaction(transferFromTx)).wait()

// 檢查 approve / transferFrom 組合是否正確完成
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

測試這兩個新函式。
請注意，`transferFromTx` 需要兩個地址參數：額度的給予者和接收者。

## 結論 {#conclusion}

[Optimism](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92) 和 [Arbitrum](https://developer.offchainlabs.com/docs/special_features) 都在尋找方法來減少寫入 L1 的 calldata 大小，從而降低交易成本。
然而，作為尋求通用解決方案的基礎設施提供商，我們的能力有限。
身為去中心化應用程式開發者，您擁有應用程式特定的知識，這讓您能比我們在通用解決方案中更有效地優化您的 calldata。
希望本文能幫助您找到滿足您需求的理想解決方案。

[在此查看我的更多作品](https://cryptodocguy.pro/)。

