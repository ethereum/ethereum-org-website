---
title: "用於最佳化呼叫資料的簡短 ABI"
description: "為 Optimistic 匯總最佳化智能合約"
author: "奧里·波梅蘭茨"
lang: zh-tw
tags: ["第二層 (L2)"]
skill: intermediate
breadcrumb: "簡短 ABI"
published: 2022-04-01
---

## 簡介 {#introduction}

在本文中，您將了解 [Optimistic 匯總](/developers/docs/scaling/optimistic-rollups)、其上的交易成本，以及這種不同的成本結構如何要求我們針對與以太坊主網不同的事物進行最佳化。
您還將學習如何實作這種最佳化。

### 利益揭露 {#full-disclosure}

我是 [Optimism](https://www.optimism.io/) 的全職員工，因此本文中的範例將在 Optimism 上執行。
然而，這裡解釋的技術應該同樣適用於其他匯總。

### 術語 {#terminology}

在討論匯總時，「第一層 (L1)」一詞用於主網，即生產環境的以太坊網路。
「第二層 (L2)」一詞用於匯總或任何其他依賴 L1 提供安全性，但將大部分處理工作放在鏈下進行的系統。

## 我們如何進一步降低 L2 交易的成本？ {#how-can-we-further-reduce-the-cost-of-l2-transactions}

[Optimistic 匯總](/developers/docs/scaling/optimistic-rollups)必須保留每筆歷史交易的記錄，以便任何人都能夠檢查它們並驗證當前狀態是否正確。
在撰寫本文時，將資料輸入以太坊主網最便宜的方法是將其寫入為呼叫資料。
[Optimism](https://docs.optimism.io/op-stack/protocol/overview) 和 [Arbitrum](https://docs.arbitrum.io/welcome/arbitrum-gentle-introduction) 都選擇了這個解決方案。
自 Dencun 升級（2024 年 3 月）以來，匯總可以改為將此資料發佈在[資料塊](/roadmap/danksharding/)中，這要便宜得多。

### L2 交易的成本 {#cost-of-l2-transactions}

L2 交易的成本由兩個部分組成：

1. L2 處理，通常非常便宜
2. L1 儲存，與主網燃料成本相關

當我在 2022 年撰寫本文時，在 Optimism 上 L2 燃料的成本為 0.001 [Gwei](/developers/docs/gas/#what-is-gas)。
另一方面，L1 燃料的成本約為 40 Gwei。

一個位元組的呼叫資料花費 4 燃料（如果為零）或 16 燃料（如果是任何其他值）。
EVM 上最昂貴的操作之一是寫入儲存。
在 L2 上將一個 32 位元組的字組寫入儲存的最大成本為 22100 燃料。當時，這相當於 22.1 Gwei。
因此，如果我們能節省一個零位元組的呼叫資料，我們就能夠將大約 200 個位元組寫入儲存，並且仍然划算。

#### L2 成本在 2024 年的變化 {#how-l2-costs-changed-in-2024}

自撰寫本文以來，OP Stack 的 [L1 資料費用](https://docs.optimism.io/op-stack/transactions/fees#l1-data-fee)公式已更改兩次：

- 隨著 [Ecotone 升級](https://docs.optimism.io/op-stack/transactions/fees#ecotone)（2024 年 3 月），OP Stack 鏈開始將交易資料發佈到資料塊，這些資料塊由獨立的（通常低得多）資料塊基礎費用定價。
- 隨著 [Fjord 升級](https://docs.optimism.io/op-stack/transactions/fees#fjord)（2024 年 7 月），L1 資料費用基於 [FastLZ](https://github.com/ariya/FastLZ) 壓縮後交易大小的估計值，每筆交易最少 100 個位元組（[請參閱規格](https://specs.optimism.io/protocol/fjord/exec-engine.html)）。

這在三個方面改變了本文其餘部分的分析：

1. 零位元組壓縮效果很好，因此它們幾乎是免費的。
   以下每個位元組 4 和 16 燃料的數字是 L1 呼叫資料的成本，而不是您今天在 OP Stack 鏈上為交易資料支付的費用。
2. 低於 100 位元組的最小值，較短的呼叫資料不會節省任何費用。
   例如，在 2026 年 10 月的 OP Mainnet 上，標準的 ERC-20 `transfer`（68 位元組的呼叫資料）和本文中 23 位元組的簡短版本將支付完全相同的 L1 資料費用，即最低費用，約為 1 Gwei（10<sup>-9</sup> ETH）。
3. 因為資料塊空間很便宜，L2 執行費用現在通常大於 L1 資料費用。
   在 L2 Gas 價格為 0.001 Gwei 時，1000 燃料花費 1 Gwei，與整個 L1 資料費用相同，因此透過代理合約的額外執行燃料成本可能超過它所節省的位元組成本。

原則仍然成立：較少的壓縮位元組意味著較低的 L1 資料費用。
簡短的 ABI 對於包含大量無法良好壓縮資料的交易，以及在 L1 資料昂貴的鏈上或時期，最具有意義。
若要查看特定交易將支付的費用，請使用未簽章的交易在 [`GasPriceOracle` 預先部署](https://specs.optimism.io/protocol/predeploys.html#gaspriceoracle)上呼叫 `getL1Fee`。
例如，使用 [Foundry](https://getfoundry.sh/introduction/installation/) 的 `cast`：

```sh
TX=$(cast mktx --raw-unsigned --from <your address> --chain 10 --nonce 0 --gas-limit 100000 \
  --priority-gas-price 1000000 --gas-price 1000000 <destination address> <calldata>)
cast call 0x420000000000000000000000000000000000000F "getL1Fee(bytes)(uint256)" $TX --rpc-url https://mainnet.optimism.io
```

結果以 Wei 為單位。

### ABI {#the-abi}

絕大多數交易都是從外部擁有的帳戶存取合約。
大多數合約都是用 Solidity 撰寫的，並根據[應用程式二進制介面 (ABI)](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding) 解譯其資料欄位。

然而，ABI 是為 L1 設計的，在 L1 中，一個位元組的呼叫資料成本大約等於四次算術運算，而不是 L2，在 L2 中（以 2022 年的價格計算），一個位元組的呼叫資料成本超過一千次算術運算。
呼叫資料的劃分如下：

| 區段 | 長度 | 位元組 | 浪費的位元組 | 浪費的燃料 | 必要的位元組 | 必要的燃料 |
| ------------------- | -----: | ----: | -----------: | ---------: | --------------: | ------------: |
| 函式選擇器 | 4 | 0-3 | 3 | 48 | 1 | 16 |
| 零 | 12 | 4-15 | 12 | 48 | 0 | 0 |
| 目的地地址 | 20 | 16-35 | 0 | 0 | 20 | 320 |
| 金額 | 32 | 36-67 | 17 | 68 | 15 | 240 |
| 總計 | 68 | | | 164 | | 576 |

說明：

- **函式選擇器**：合約的函式少於 256 個，因此我們可以用單個位元組來區分它們。
  這些位元組通常非零，因此[花費 16 燃料](https://eips.ethereum.org/EIPS/eip-2028)。
- **零**：這些位元組始終為零，因為 20 位元組的地址不需要 32 位元組的字組來容納它。
  值為零的位元組花費 4 燃料（[請參閱黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)，附錄 G，
  第 27 頁，`G`<sub>`txdatazero`</sub> 的值）。
- **金額**：如果我們假設在此合約中 `decimals` 為 18（正常值），並且我們轉帳的代幣最大數量為 10<sup>18</sup>，我們得到的最大金額為 10<sup>36</sup>。
  256<sup>15</sup> &gt; 10<sup>36</sup>，因此 15 個位元組就足夠了。

在 L1 上浪費 164 燃料通常可以忽略不計。一筆交易至少花費 [21,000 燃料](https://yakkomajuri.medium.com/blockchain-definition-of-the-week-ethereum-gas-2f976af774ed)，因此額外的 0.8% 無關緊要。
然而，在 2022 年的 L2 上，情況有所不同。交易的幾乎全部成本都在於將其寫入 L1。
除了交易呼叫資料之外，還有 109 個位元組的交易標頭（目的地地址、簽章等）。
因此總成本為 `109*16+576+164=2484`，而我們浪費了其中約 6.6%。

## 當您無法控制目的地時降低成本 {#reducing-costs-when-you-dont-control-the-destination}

假設您無法控制目的地合約，您仍然可以使用類似於[這個](https://github.com/qbzzt/ethereum.org-20220330-shortABI)的解決方案。

要執行它，您需要 [Node.js](https://nodejs.org/) 和 git：

```sh
git clone https://github.com/qbzzt/ethereum.org-20220330-shortABI.git
cd ethereum.org-20220330-shortABI
npm install
npx hardhat test
```

測試會將合約部署到 Hardhat 內建的本機網路，因此您不需要任何 ETH。
該儲存庫使用 Hardhat 2.9，因此在目前版本的 Node.js 上，它會警告不支援您的 Node.js 版本，但測試仍然會通過。

讓我們來看看相關的檔案。

### Token.sol {#token-sol}

[這是目的地合約](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/Token.sol)。
它是一個標準的 ERC-20 合約，具有一個額外的功能。
這個 `水龍頭` 函式讓任何使用者都能獲得一些代幣來使用。
這會使生產環境的 ERC-20 合約變得毫無用處，但當 ERC-20 僅為了方便測試而存在時，它會讓事情變得更簡單。

```solidity
    /**
     * @dev 給予呼叫者 1000 個代幣來遊玩
     */
    function faucet() external {
        _mint(msg.sender, 1000);
    }   // function faucet
```

### CalldataInterpreter.sol {#calldatainterpreter-sol}

[這是交易應該使用較短呼叫資料來呼叫的合約](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/contracts/CalldataInterpreter.sol)。
讓我們逐行查看。

```solidity
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


import { OrisUselessToken } from "./Token.sol";
```

我們需要代幣函式才能知道如何呼叫它。

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
    }   // 建構函式
```

代幣地址是我們唯一需要指定的參數。

```solidity
    function calldataVal(uint startByte, uint length)
        private pure returns (uint) {
```

從呼叫資料中讀取一個值。

```solidity
        uint _retVal;

        require(length < 0x21,
            "calldataVal length limit is 32 bytes");

        require(length + startByte <= msg.data.length,
            "calldataVal trying to read beyond calldatasize");
```

我們將把單個 32 位元組（256 位元）的字組載入記憶體，並移除不屬於我們所需欄位的位元組。
此演算法不適用於長度超過 32 位元組的值，當然我們也不能讀取超過呼叫資料結尾的內容。
在 L1 上，可能需要跳過這些測試以節省燃料，但在 L2 上燃料非常便宜，這使得我們能夠進行任何能想到的合理性檢查。

```solidity
        assembly {
            _retVal := calldataload(startByte)
        }
```

我們本可以從對 `fallback()` 的呼叫中複製資料（見下文），但使用 EVM 的組合語言 [Yul](https://docs.soliditylang.org/en/v0.8.12/yul.html) 會更容易。

這裡我們使用 [CALLDATALOAD 操作碼](https://www.evm.codes/#35)將位元組 `startByte` 到 `startByte+31` 讀入堆疊。
一般來說，Yul 中操作碼的語法是 `<opcode name>(<first stack value, if any>,<second stack value, if any>...)`。

```solidity

        _retVal = _retVal >> (256-length*8);
```

只有最高有效 `length` 位元組是欄位的一部分，因此我們[向右移位](https://en.wikipedia.org/wiki/Logical_shift)以去除其他值。
這還有一個額外的好處，就是將值移到欄位的右側，因此它是值本身，而不是值乘以 256<sup>某個數</sup>。

```solidity

        return _retVal;
    }


    fallback() external {
```

當對 Solidity 合約的呼叫與任何函式簽章都不匹配時，它會呼叫 [`fallback()` 函式](https://docs.soliditylang.org/en/v0.8.12/contracts.html#fallback-function)（假設存在）。
在 `CalldataInterpreter` 的情況下，_任何_呼叫都會到達這裡，因為沒有其他 `external` 或 `public` 函式。

```solidity
        uint _func;

        _func = calldataVal(0, 1);
```

讀取呼叫資料的第一個位元組，它告訴我們函式是什麼。
函式在這裡無法使用的原因有兩個：

1. `pure` 或 `view` 的函式不會改變狀態，也不會花費燃料（在鏈下呼叫時）。
   嘗試降低它們的燃料成本是沒有意義的。
2. 依賴於 [`msg.sender`](https://docs.soliditylang.org/en/v0.8.12/units-and-global-variables.html#block-and-transaction-properties) 的函式。
   `msg.sender` 的值將是 `CalldataInterpreter` 的地址，而不是呼叫者。

不幸的是，[查看 ERC-20 規格](https://eips.ethereum.org/EIPS/eip-20)，這只剩下一個標準函式 `transfer`（因為我們可以呼叫 `transferFrom`）。
我們的測試代幣也有 `faucet`，我們可以支援它，因為我們可以將代幣轉帳回給呼叫我們的任何人。

```solidity

        // 呼叫代幣的狀態變更方法，使用
        // 來自呼叫資料的資訊

        // 水龍頭
        if (_func == 1) {
```

對 `faucet()` 的呼叫，它沒有參數。

```solidity
            token.faucet();
            token.transfer(msg.sender,
                token.balanceOf(address(this)));
        }
```

在我們呼叫 `token.faucet()` 之後，我們會獲得代幣。然而，作為代理合約，我們不**需要**代幣。
呼叫我們的外部擁有的帳戶 (EOA) 或合約才需要。
因此，我們將所有代幣轉帳給呼叫我們的任何人。

```solidity
        // 轉帳（假設我們有其授權額度）
        if (_func == 2) {
```

轉帳代幣需要兩個參數：目的地地址和金額。

```solidity
            token.transferFrom(
                msg.sender,
```

我們只允許呼叫者轉帳他們擁有的代幣

```solidity
                address(uint160(calldataVal(1, 20))),
```

目的地地址從位元組 #1 開始（位元組 #0 是函式）。
作為一個地址，它的長度為 20 個位元組。

```solidity
                calldataVal(21, 2)
```

對於這個特定的合約，我們假設任何人想要轉帳的最大代幣數量適合兩個位元組（小於 65536）。

```solidity
            );
        }
```

總體而言，轉帳需要 23 個位元組的呼叫資料：

| 區段 | 長度 | 位元組 |
| ------------------- | -----: | ----: |
| 函式選擇器 | 1 | 0 |
| 目的地地址 | 20 | 1-20 |
| 金額 | 2 | 21-22 |

```solidity
    }   // 回退函式

}       // 合約 CalldataInterpreter
```

### test.js {#test-js}

[這個 JavaScript 單元測試](https://github.com/qbzzt/ethereum.org-20220330-shortABI/blob/master/test/test.js)向我們展示了如何使用這種機制（以及如何驗證它是否正確運作）。
我將假設您了解 [chai](https://www.chaijs.com/) 和 [ethers](https://docs.ethers.org/v5/)，並且只解釋專門適用於該合約的部分。

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
    // 獲取代幣來遊玩
    const faucetTx = {
```

我們不能使用通常會使用的高階函式（例如 `token.faucet()`）來建立交易，因為我們沒有遵循 ABI。
相反，我們必須自己建立交易，然後發送它。

```javascript
      to: cdi.address,
      data: "0x01"
```

我們需要為交易提供兩個參數：

1. `to`，目的地地址。這是呼叫資料解譯器合約。
2. `data`，要發送的呼叫資料。在水龍頭呼叫的情況下，資料是單個位元組 `0x01`。

```javascript

    }
    await (await signer.sendTransaction(faucetTx)).wait()
```

我們呼叫[簽署者的 `sendTransaction` 方法](https://docs.ethers.org/v5/api/signer/#Signer-sendTransaction)，因為我們已經指定了目的地（`faucetTx.to`），並且我們需要對交易進行簽章。

```javascript
// 檢查水龍頭是否正確提供代幣
expect(await token.balanceOf(signer.address)).to.equal(1000)
```

這裡我們驗證餘額。
沒有必要在 `view` 函式上節省燃料，因此我們只需正常執行它們即可。

```javascript
// 給予 CDI 授權額度（授權無法被代理）
const approveTX = await token.approve(cdi.address, 10000)
await approveTX.wait()
expect(await token.allowance(signer.address, cdi.address)).to.equal(10000)
```

給予呼叫資料解譯器授權額度，使其能夠進行轉帳。

```javascript
// 轉帳代幣
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
```

建立一筆轉帳交易。第一個位元組是 "0x02"，接著是目的地地址，最後是金額（0x0100，十進位為 256）。

```javascript
    await (await signer.sendTransaction(transferTx)).wait()

    // 檢查我們是否少了 256 個代幣
    expect (await token.balanceOf(signer.address)).to.equal(1000-256)

    // 並且我們的目的地收到了它們
    expect (await token.balanceOf(destAddr)).to.equal(256)
  })    // it
})      // describe
```

## 當您確實控制目的地合約時降低成本 {#reducing-the-cost-when-you-do-control-the-destination-contract}

如果您確實控制目的地合約，您可以建立繞過 `msg.sender` 檢查的函式，因為它們信任呼叫資料解譯器。
[您可以在此處的 `control-contract` 分支中看到其運作方式的範例](https://github.com/qbzzt/ethereum.org-20220330-shortABI/tree/control-contract)。
要執行它，請切換到您之前複製的儲存庫中的該分支，然後再次執行測試：

```sh
git checkout control-contract
npx hardhat test
```

如果合約僅回應外部交易，我們只需一個合約即可。
然而，這會破壞[可組合性](/developers/docs/smart-contracts/composability/)。
最好有一個回應正常 ERC-20 呼叫的合約，以及另一個回應具有簡短呼叫資料之交易的合約。

### Token.sol {#token-sol-2}

在這個範例中，我們可以修改 `Token.sol`。
這讓我們擁有一些只有代理可以呼叫的函式。
以下是新的部分：

```solidity
    // 唯一允許指定 CalldataInterpreter 地址的地址
    address owner;

    // CalldataInterpreter 地址
    address proxy = address(0);
```

ERC-20 合約需要知道授權代理的身分。
然而，我們不能在建構函式中設定這個變數，因為我們還不知道它的值。
這個合約首先被實例化，因為代理在其建構函式中預期會收到代幣的地址。

```solidity
    /**
     * @dev 呼叫 ERC-20 建構函式。
     */
    constructor(
    ) ERC20("Oris useless token-2", "OUT-2") {
        owner = msg.sender;
    }
```

建立者的地址（稱為 `owner`）儲存在這裡，因為那是唯一允許設定代理的地址。

```solidity
    /**
     * @dev 設定代理（CalldataInterpreter）的地址。
     * 只能由擁有者呼叫一次
     */
    function setProxy(address _proxy) external {
        require(msg.sender == owner, "Can only be called by owner");
        require(proxy == address(0), "Proxy is already set");

        proxy = _proxy;
    }    // function setProxy
```

代理具有特權存取權限，因為它可以繞過安全檢查。
為了確保我們可以信任代理，我們只讓 `owner` 呼叫此函式，而且只能呼叫一次。
一旦 `proxy` 有了實際值（非零），該值就無法更改，因此即使擁有者決定作惡，或者其助記詞被洩露，我們仍然是安全的。

```solidity
    /**
     * @dev 某些函式只能由代理呼叫。
     */
    modifier onlyProxy {
```

這是一個 [`modifier` 函式](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm)，它修改了其他函式的運作方式。

```solidity
      require(msg.sender == proxy);
```

首先，驗證我們是由代理呼叫的，而不是其他人。
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

這些是通常要求訊息直接來自轉帳代幣或核准授權額度之實體的三個操作。
這裡我們有這些操作的代理版本，它：

1. 由 `onlyProxy()` 修改，因此不允許其他人控制它們。
2. 取得通常為 `msg.sender` 的地址作為額外參數。

### CalldataInterpreter.sol {#calldatainterpreter-sol-2}

呼叫資料解譯器與上面的幾乎相同，除了被代理的函式會接收一個 `msg.sender` 參數，並且不需要為 `transfer` 提供授權額度。

```solidity
        // 轉帳（不需要授權額度）
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

之前的測試程式碼和這個測試程式碼之間有一些變化。

```js
const Cdi = await ethers.getContractFactory("CalldataInterpreter")
const cdi = await Cdi.deploy(token.address)
await cdi.deployed()
await token.setProxy(cdi.address)
```

我們需要告訴 ERC-20 合約要信任哪個代理

```js
console.log("CalldataInterpreter addr:", cdi.address)

// 需要兩個簽署者來驗證授權額度
const signers = await ethers.getSigners()
const signer = signers[0]
const poorSigner = signers[1]
```

為了檢查 `approve()` 和 `transferFrom()`，我們需要第二個簽署者。
我們稱之為 `poorSigner`，因為它沒有獲得我們的任何代幣（當然，它確實需要有 ETH）。

```js
// 轉帳代幣
const destAddr = "0xf5a6ead936fb47f342bb63e676479bddf26ebe1d"
const transferTx = {
  to: cdi.address,
  data: "0x02" + destAddr.slice(2, 42) + "0100",
}
await (await signer.sendTransaction(transferTx)).wait()
```

因為 ERC-20 合約信任代理（`cdi`），所以我們不需要授權額度來中繼轉帳。

```js
// 授權與 transferFrom
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

// 檢查 approve / transferFrom 組合是否正確執行
expect(await token.balanceOf(destAddr2)).to.equal(255)
```

測試這兩個新函式。
請注意，`transferFromTx` 需要兩個地址參數：授權額度的給予者和接收者。

## 結論 {#conclusion}

[Optimism](https://docs.optimism.io/op-stack/transactions/fees#fjord) 和 [Arbitrum](https://docs.arbitrum.io/how-arbitrum-works/deep-dives/gas-and-fees) 現在都會壓縮它們寫入 L1 的資料，並根據其壓縮後的大小對每筆交易收費，以降低交易成本。
然而，作為尋求通用解決方案的基礎設施供應商，我們的能力有限。
作為 dapp 開發人員，您擁有特定於應用程式的知識，這讓您能夠比我們在通用解決方案中更好地最佳化您的呼叫資料。
希望本文能幫助您找到符合您需求的理想解決方案。

[請在此處查看我的更多作品](https://cryptodocguy.pro/)。

