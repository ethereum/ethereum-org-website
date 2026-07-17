---
title: "詐騙代幣使用的一些伎倆以及如何偵測它們"
description: "在本教學中，我們將剖析一個詐騙代幣，看看詐騙者玩弄的一些伎倆、他們如何實作這些伎倆，以及我們如何偵測它們。"
author: "奧里·波梅蘭茨"
tags:
  - 詐騙
  - Solidity
  - ERC-20
  - JavaScript
  - TypeScript
skill: intermediate
breadcrumb: "詐騙代幣伎倆"
published: 2023-09-15
lang: zh-tw
---

在本教學中，我們將剖析[一個詐騙代幣](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，看看詐騙者玩弄的一些伎倆以及他們如何實作這些伎倆。在本教學結束時，你將對 ERC-20 代幣合約、它們的功能以及為何必須保持懷疑態度有更全面的了解。接著，我們將查看該詐騙代幣發出的事件，並了解如何自動識別它是不合法的。

## 詐騙代幣 - 它們是什麼、為什麼人們要製造它們，以及如何避免 {#scam-tokens}

以太坊最常見的用途之一是讓一個群體建立可交易的代幣，從某種意義上來說，就是他們自己的貨幣。然而，只要有帶來價值的合法使用案例，就會有犯罪分子試圖為自己竊取這些價值。

你可以從使用者角度在 [ethereum.org 的其他地方](/guides/how-to-id-scam-tokens/)閱讀更多關於此主題的資訊。本教學著重於剖析詐騙代幣，看看它是如何運作的以及如何偵測它。

### 我怎麼知道 wARB 是詐騙？ {#warb-scam}

我們剖析的代幣是 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，它假裝等同於合法的 [ARB 代幣](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)。

要知道哪個是合法代幣，最簡單的方法是查看發行組織 [Arbitrum](https://arbitrum.foundation/)。合法的地址已在[他們的文件中](https://docs.arbitrum.foundation/deployment-addresses#token)具體說明。

### 為什麼原始碼是公開的？ {#why-source}

通常我們會預期試圖詐騙他人的人會保持隱密，事實上許多詐騙代幣並沒有公開其程式碼（例如[這個](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code)和[這個](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code)）。

然而，合法的代幣通常會發布其原始碼，因此為了顯得合法，詐騙代幣的作者有時也會這樣做。[wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) 就是那些公開原始碼的代幣之一，這讓我們更容易了解它。

雖然合約部署者可以選擇是否發布原始碼，但他們「不能」發布錯誤的原始碼。區塊鏈瀏覽器會獨立編譯提供的原始碼，如果沒有得到完全相同的位元組碼，它就會拒絕該原始碼。[你可以在 Etherscan 網站上閱讀更多相關資訊](https://etherscan.io/verifyContract)。

## 與合法 ERC-20 代幣的比較 {#compare-legit-erc20}

我們將把這個代幣與合法的 ERC-20 代幣進行比較。如果你不熟悉合法的 ERC-20 代幣通常是如何編寫的，請[參閱本教學](/developers/tutorials/erc20-annotated-code/)。

### 特權地址的常數 {#constants-for-privileged-addresses}

合約有時需要特權地址。專為長期使用而設計的合約允許某些特權地址更改這些地址，例如啟用新的多方簽名合約。有幾種方法可以做到這一點。

[`HOP` 代幣合約](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code)使用了 [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) 模式。特權地址保存在儲存空間中，位於名為 `_owner` 的欄位（請參閱第三個檔案 `Ownable.sol`）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` 代幣合約](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code)沒有直接的特權地址。然而，它並不需要。它位於 [地址 `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) 的 [`proxy`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) 後方。該合約有一個可用於升級的特權地址（請參閱第四個檔案 `ERC1967Upgrade.sol`）。

```solidity
    /**
     * @dev 在 EIP1967 管理員槽位中儲存一個新地址。
     */
    function _setAdmin(address newAdmin) private {
        require(newAdmin != address(0), "ERC1967: new admin is the zero address");
        StorageSlot.getAddressSlot(_ADMIN_SLOT).value = newAdmin;
    }
```

相比之下，`wARB` 合約有一個硬編碼的 `contract_owner`。

```solidity
contract WrappedArbitrum is Context, IERC20 {
    .
    .
    .
    address deployer = 0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1;
    address public contract_owner = 0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33;
    .
    .
    .
}
```

[這個合約擁有者](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33)不是一個可以在不同時間由不同帳戶控制的合約，而是一個[外部擁有帳戶](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)。這意味著它可能是為個人短期使用而設計的，而不是作為控制將保持價值的 ERC-20 的長期解決方案。

事實上，如果我們查看 Etherscan，我們會發現詐騙者在 2023 年 5 月 19 日期間僅使用了這個合約 12 小時（從[第一筆交易](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)到[最後一筆交易](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)）。

### 假的 `_transfer` 函式 {#the-fake-transfer-function}

使用[內部 `_transfer` 函式](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer)來進行實際轉帳是標準做法。

在 `wARB` 中，這個函式看起來幾乎是合法的：

```solidity
    function _transfer(address sender, address recipient, uint256 amount)  internal virtual{
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

可疑的部分是：

```solidity
        if (sender == contract_owner){
            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
```

如果合約擁有者發送代幣，為什麼 `Transfer` 事件顯示它們來自 `deployer`？

然而，還有一個更重要的問題。誰呼叫了這個 `_transfer` 函式？它不能從外部呼叫，因為它被標記為 `internal`。而且我們擁有的程式碼中不包含任何對 `_transfer` 的呼叫。顯然，它在這裡只是作為誘餌。

```solidity
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(_msgSender(), recipient, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        _f_(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

當我們查看被呼叫來轉帳代幣的函式 `transfer` 和 `transferFrom` 時，我們發現它們呼叫了一個完全不同的函式 `_f_`。

### 真正的 `_f_` 函式 {#the-real-f-function}

```solidity
    function _f_(address sender, address recipient, uint256 amount) internal _mod_(sender,recipient,amount) virtual {
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");

        _beforeTokenTransfer(sender, recipient, amount);

        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        if (sender == contract_owner){

            sender = deployer;
        }
        emit Transfer(sender, recipient, amount);
    }
```

這個函式有兩個潛在的危險信號。

- 使用了[函式修飾詞](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`。然而，當我們查看原始碼時，我們發現 `_mod_` 實際上是無害的。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- 我們在 `_transfer` 中看到的相同問題，也就是當 `contract_owner` 發送代幣時，它們看起來像是來自 `deployer`。

### 假的事件函式 `dropNewTokens` {#the-fake-events-function-dropnewtokens}

現在我們來看一些看起來像是真正詐騙的東西。為了提高可讀性，我稍微編輯了這個函式，但它的功能是等效的。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

這個函式具有 `auth()` 修飾詞，這意味著它只能由合約擁有者呼叫。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

這個限制非常合理，因為我們不希望隨機帳戶來分發代幣。然而，函式的其餘部分卻很可疑。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

一個從資金池帳戶轉帳到接收者陣列和金額陣列的函式非常合理。在許多使用案例中，你會希望將代幣從單一來源分發到多個目的地，例如發放薪資、空投等。在單筆交易中執行此操作，比發出多筆交易，甚至在同一筆交易中從不同合約多次呼叫 ERC-20 更便宜（在燃料方面）。

然而，`dropNewTokens` 並沒有這樣做。它發出了 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)，但實際上並沒有轉帳任何代幣。沒有任何正當理由透過告訴鏈下應用程式一筆並未真正發生的轉帳來混淆它們。

### 銷毀的 `Approve` 函式 {#the-burning-approve-function}

ERC-20 合約應該有一個用於授權額度的 [`approve` 函式](/developers/tutorials/erc20-annotated-code/#approve)，而我們的詐騙代幣確實有這樣一個函式，而且它甚至是正確的。然而，因為 Solidity 源自 C 語言，所以它區分大小寫。「Approve」和「approve」是不同的字串。

此外，該功能與 `approve` 無關。

```solidity
    function Approve(
        address[] memory holders)
```

這個函式是使用代幣持有者的地址陣列來呼叫的。

```solidity
    public approver() {
```

`approver()` 修飾詞確保只有 `contract_owner` 被允許呼叫這個函式（見下文）。

```solidity
        for (uint256 i = 0; i < holders.length; i++) {
            uint256 amount = _balances[holders[i]];
            _beforeTokenTransfer(holders[i], 0x0000000000000000000000000000000000000001, amount);
            _balances[holders[i]] = _balances[holders[i]].sub(amount,
                "ERC20: burn amount exceeds balance");
            _balances[0x0000000000000000000000000000000000000001] =
                _balances[0x0000000000000000000000000000000000000001].add(amount);
        }
    }

```

對於每個持有者地址，該函式會將持有者的全部餘額移至地址 `0x00...01`，有效地將其銷毀（標準中實際的 `burn` 也會更改總供應量，並將代幣轉帳至 `0x00...00`）。這意味著 `contract_owner` 可以移除任何使用者的資產。這似乎不是你會希望在治理代幣中看到的功能。

### 程式碼品質問題 {#code-quality-issues}

這些程式碼品質問題並不能「證明」這段程式碼是詐騙，但它們讓它看起來很可疑。像 Arbitrum 這樣有組織的公司通常不會發布這麼糟糕的程式碼。

#### `mount` 函式 {#the-mount-function}

雖然[標準](https://eips.ethereum.org/EIPS/eip-20)中沒有具體說明，但一般來說，建立新代幣的函式稱為 [`mint`](/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)。

如果我們查看 `wARB` 建構函式，我們會發現鑄造函式出於某種原因被重新命名為 `mount`，並且被呼叫了五次，每次鑄造初始供應量的五分之一，而不是為了效率一次鑄造全部數量。

```solidity
    constructor () public {

        _name = "Wrapped Arbitrum";
        _symbol = "wARB";
        _decimals = 18;
        uint256 initialSupply = 1000000000000;

        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
        mount(deployer, initialSupply*(10**18)/5);
    }
```

`mount` 函式本身也很可疑。

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

查看 `require`，我們發現只有合約擁有者被允許鑄造。這是合法的。但錯誤訊息應該是 _only owner is allowed to mint_（只有擁有者被允許鑄造）或類似的內容。相反地，它卻是不相關的 _ERC20: mint to the zero address_（ERC20：鑄造到零地址）。測試是否鑄造到零地址的正確方法是 `require(account != address(0), "<error message>")`，而該合約根本懶得檢查。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

還有兩個與鑄造直接相關的可疑事實：

- 有一個 `account` 參數，這大概是應該接收鑄造數量的帳戶。但實際增加餘額的卻是 `contract_owner`。

- 雖然增加的餘額屬於 `contract_owner`，但發出的事件卻顯示轉帳給了 `account`。

### 為什麼同時有 `auth` 和 `approver`？為什麼有什麼都不做的 `mod`？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

這個合約包含三個修飾詞：`_mod_`、`auth` 和 `approver`。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` 接受三個參數，但沒有對它們做任何處理。為什麼要有它？

```solidity
    modifier auth() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }

    modifier approver() {
        require(msg.sender == contract_owner, "Not allowed to interact");
        _;
    }
```

`auth` 和 `approver` 比較合理，因為它們會檢查合約是否由 `contract_owner` 呼叫。我們會預期某些特權操作（例如鑄造）僅限於該帳戶。然而，有兩個執行「完全相同事情」的獨立函式有什麼意義呢？

## 我們可以自動偵測什麼？ {#what-can-we-detect-automatically}

我們可以透過查看 Etherscan 得知 `wARB` 是一個詐騙代幣。然而，這是一個中心化的解決方案。理論上，Etherscan 可能會被顛覆或駭客攻擊。最好能夠獨立判斷一個代幣是否合法。

我們可以透過查看 ERC-20 代幣發出的事件，使用一些技巧來識別它是否可疑（無論是詐騙還是寫得很糟糕）。

## 可疑的 `Approval` 事件 {#suspicious-approval-events}

[`Approval` 事件](https://eips.ethereum.org/EIPS/eip-20#approval)應該只在直接請求時發生（與可能因授權額度而發生的 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)相反）。[請參閱 Solidity 文件](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)，以了解此問題的詳細說明，以及為什麼請求需要是直接的，而不是由合約中介。

這意味著授權從[外部擁有帳戶](/developers/docs/accounts/#types-of-account)支出的 `Approval` 事件，必須來自源自該帳戶且目的地為 ERC-20 合約的交易。來自外部擁有帳戶的任何其他類型的授權都是可疑的。

這裡有[一個識別此類事件的程式](https://github.com/qbzzt/20230915-scam-token-detection)，它使用了 [Viem](https://viem.sh/) 和 [TypeScript](https://www.typescriptlang.org/docs/)（一種具有型別安全性的 JavaScript 變體）。要執行它：

1. 將 `.env.example` 複製到 `.env`。
2. 編輯 `.env` 以提供以太坊主網節點的 URL。
3. 執行 `pnpm install` 以安裝必要的套件。
4. 執行 `pnpm susApproval` 以尋找可疑的授權。

以下是逐行說明：

```typescript
import {
  Address,
  TransactionReceipt,
  createPublicClient,
  http,
  parseAbiItem,
} from "viem"
import { mainnet } from "viem/chains"
```

從 `viem` 匯入型別定義、函式和鏈定義。

```typescript
import { config } from "dotenv"
config()
```

讀取 `.env` 以取得 URL。

```typescript
const client = createPublicClient({
  chain: mainnet,
  transport: http(process.env.URL),
})
```

建立一個 Viem 客戶端。我們只需要從區塊鏈讀取資料，因此這個客戶端不需要私鑰。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

可疑 ERC-20 合約的地址，以及我們將在其中尋找事件的區塊。節點提供者通常會限制我們讀取事件的能力，因為頻寬可能會變得很昂貴。幸運的是，`wARB` 在 18 小時內沒有被使用，因此我們可以尋找所有事件（總共只有 13 個）。

```typescript
const approvalEvents = await client.getLogs({
  address: testedAddress,
  fromBlock,
  toBlock,
  event: parseAbiItem(
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
  ),
})
```

這是向 Viem 請求事件資訊的方法。當我們提供確切的事件簽章（包含欄位名稱）時，它會為我們解析事件。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

我們的演算法僅適用於外部擁有帳戶。如果 `client.getBytecode` 傳回任何位元組碼，這意味著這是一個合約，我們應該直接跳過它。

如果你以前沒有使用過 TypeScript，函式定義看起來可能會有點奇怪。我們不僅告訴它第一個（也是唯一一個）參數稱為 `addr`，還告訴它其型別為 `Address`。同樣地，`: boolean` 部分告訴 TypeScript 該函式的傳回值是一個布林值。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

這個函式從事件中取得交易收據。我們需要收據以確保我們知道交易的目的地是什麼。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

這是最重要的函式，它實際決定一個事件是否可疑。傳回型別 `(Event | null)` 告訴 TypeScript 這個函式可以傳回 `Event` 或 `null`。如果事件不可疑，我們傳回 `null`。

```typescript
const owner = ev.args._owner
```

Viem 擁有欄位名稱，因此它為我們解析了事件。`_owner` 是要支出的代幣擁有者。

```typescript
// 合約的授權並不可疑
if (await isContract(owner)) return null
```

如果擁有者是一個合約，則假設此授權不可疑。要檢查合約的授權是否可疑，我們需要追蹤交易的完整執行過程，看看它是否到達了擁有者合約，以及該合約是否直接呼叫了 ERC-20 合約。這比我們想要做的要耗費多得多的資源。

```typescript
const txn = await getEventTxn(ev)
```

如果授權來自外部擁有帳戶，則取得導致該授權的交易。

```typescript
// 如果授權來自非交易 `from` 的 EOA 擁有者，則該授權是可疑的
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

我們不能只檢查字串是否相等，因為地址是十六進位的，所以它們包含字母。有時，例如在 `txn.from` 中，這些字母都是小寫的。在其他情況下，例如 `ev.args._owner`，地址採用[混合大小寫以進行錯誤識別](https://eips.ethereum.org/EIPS/eip-55)。

但如果交易不是來自擁有者，且該擁有者是外部擁有的，那麼我們就遇到了一筆可疑的交易。

```typescript
// 這同樣是可疑的：如果交易目的地不是該 ERC-20 合約（我們正在
// 調查的）
if (txn.to.toLowerCase() != testedAddress) return ev
```

同樣地，如果交易的 `to` 地址（第一個被呼叫的合約）不是正在調查的 ERC-20 合約，那麼它就是可疑的。

```typescript
    // 如果沒有理由懷疑，則回傳 null。
    return null
}
```

如果兩個條件都不成立，那麼 `Approval` 事件就不可疑。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[`async` 函式](https://www.w3schools.com/js/js_async.asp)會傳回一個 `Promise` 物件。使用常見的語法 `await x()`，我們會等待該 `Promise` 實現後再繼續處理。這在程式設計和理解上很簡單，但效率也很低。當我們在等待特定事件的 `Promise` 實現時，我們已經可以開始處理下一個事件了。

在這裡，我們使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 來建立一個 `Promise` 物件陣列。然後我們使用 [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) 來等待所有這些 Promise 被解析。接著我們對這些結果進行 [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp)，以移除不可疑的事件。

### 可疑的 `Transfer` 事件 {#suspicious-transfer-events}

另一種識別詐騙代幣的可能方法是查看它們是否有任何可疑的轉帳。例如，從沒有那麼多代幣的帳戶進行轉帳。你可以查看[如何實作此測試](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)，但 `wARB` 沒有這個問題。

## 結論 {#conclusion}

自動偵測 ERC-20 詐騙會遇到[偽陰性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)的問題，因為詐騙可以使用一個完全正常的 ERC-20 代幣合約，只是它不代表任何真實的東西。因此，你應該始終嘗試「從受信任的來源取得代幣地址」。

自動偵測在某些情況下會有所幫助，例如去中心化金融 (DeFi) 領域，那裡有許多代幣且需要自動處理。但一如既往，[買家自行當心 (caveat emptor)](https://www.investopedia.com/terms/c/caveatemptor.asp)，請自行做好研究，並鼓勵你的使用者也這樣做。

[點擊此處查看我更多的作品](https://cryptodocguy.pro/)。