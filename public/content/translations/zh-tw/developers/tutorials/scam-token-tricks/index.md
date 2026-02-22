---
title: "詐騙代幣使用的一些伎倆以及如何偵測它們"
description: "在本使用教學中，我們將剖析一個詐騙代幣，以了解詐騙者所玩的伎倆、他們如何實作這些伎倆，以及我們該如何偵測它們。"
author: Ori Pomerantz
tags:
  [
    "scam",
    "solidity",
    "erc-20",
    "javascript",
    "typescript"
  ]
skill: intermediate
published: 2023-09-15
lang: zh-tw
---

在本使用教學中，我們將剖析[一個詐騙代幣](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，以了解詐騙者所玩的伎倆以及他們如何實作這些伎倆。 在本使用教學結束時，您將對 ERC-20 代幣合約、其功能以及為何保持懷疑是必要的有更全面的了解。 然後我們會查看該詐騙代幣發出的事件，並了解如何自動識別它不是合法的。

## 詐騙代幣 - 它們是什麼、為什麼人們會做，以及如何避免它們 {#scam-tokens}

以太坊最常見的用處之一就是為一個團隊建立一種可交易的代幣。某種意義上，這是屬於他們自己的貨幣。 然而，任何能產生價值的正當使用案例中，就會有犯罪者嘗試竊取該價值納為已用。

您可以從使用者角度在 [ethereum.org 的其他地方](/guides/how-to-id-scam-tokens/)閱讀更多關於此主題的資訊。 本使用教學著重於剖析詐騙代幣，以了解其運作方式以及如何偵測。

### 我如何知道 wARB 是個詐騙？ {#warb-scam}

我們剖析的代幣是 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code)，它偽裝成與合法的 [ARB 代幣](https://etherscan.io/token/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1)等效。

要知道哪個是合法代幣，最簡單的方法是查看其發起組織 [Arbitrum](https://arbitrum.foundation/)。 合法的地址已在其[文件中](https://docs.arbitrum.foundation/deployment-addresses#token)指明。

### 為什麼原始碼是可用的？ {#why-source}

通常，我們期望試圖詐騙他人的人會行事隱密，而事實上許多詐騙代幣也沒有提供其程式碼 (例如，[這一個](https://optimistic.etherscan.io/token/0x15992f382d8c46d667b10dc8456dc36651af1452#code) 和 [這一個](https://optimistic.etherscan.io/token/0x026b623eb4aada7de37ef25256854f9235207178#code))。

然而，合法的代幣通常會公布其原始碼，因此為了看起來合法，詐騙代幣的作者有時也會這麼做。 [wARB](https://etherscan.io/token/0xb047c8032b99841713b8e3872f06cf32beb27b82#code) 是那些提供原始碼的代幣之一，這讓我們更容易理解它。

雖然合約部署者可以選擇是否公布原始碼，但他們_無法_公布錯誤的原始碼。 區塊瀏覽器會獨立編譯提供的原始碼，如果沒有得到完全相同的位元組碼，它就會拒絕該原始碼。 [您可以在 Etherscan 網站上閱讀更多相關資訊](https://etherscan.io/verifyContract)。

## 與合法的 ERC-20 代幣比較 {#compare-legit-erc20}

我們將把這個代幣與合法的 ERC-20 代幣進行比較。 如果您不熟悉合法的 ERC-20 代幣通常是如何編寫的，請[參見本使用教學](/developers/tutorials/erc20-annotated-code/)。

### 特權地址的常數 {#constants-for-privileged-addresses}

合約有時需要特權地址。 設計用於長期使用的合約允許某些特權地址更改這些地址，例如啟用新的多重簽名合約。 有幾種方法可以做到這一點。

[`HOP` 代幣合約](https://etherscan.io/address/0xc5102fe9359fd9a28f877a67e36b0f050d81a3cc#code) 使用 [`Ownable`](https://docs.openzeppelin.com/contracts/2.x/access-control#ownership-and-ownable) 模式。 特權地址保存在儲存空間中，位於一個名為 `_owner` 的欄位（請參見第三個檔案 `Ownable.sol`）。

```solidity
abstract contract Ownable is Context {
    address private _owner;
    .
    .
    .
}
```

[`ARB` 代幣合約](https://etherscan.io/address/0xad0c361ef902a7d9851ca7dcc85535da2d3c6fc7#code) 沒有直接的特權地址。 然而，它並不需要。 它位於[地址 `0xb50721bcf8d664c30412cfbc6cf7a15145234ad1`](https://etherscan.io/address/0xb50721bcf8d664c30412cfbc6cf7a15145234ad1#code) 的一個[`代理`](https://docs.openzeppelin.com/contracts/5.x/api/proxy) 後方。 該合約有一個可用於升級的特權地址 (請參見第四個檔案，`ERC1967Upgrade.sol`)。

```solidity
    /**
     * @dev 在 EIP1967 管理員時隙中儲存一個新地址。
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

[這個合約擁有者](https://etherscan.io/address/0xb40dE7b1beE84Ff2dc22B70a049A07A13a411A33) 不是一個可以在不同時間由不同帳戶控制的合約，而是一個[外部擁有的帳戶](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs)。 這意味著它可能是為個人短期使用而設計的，而不是作為控制一個將保持價值的 ERC-20 的長期解決方案。

事實上，如果我們在 Etherscan 上查看，會發現詐騙者在 2023 年 5 月 19 日期間只使用了這個合約 12 個小時（從[第一筆交易](https://etherscan.io/tx/0xf49136198c3f925fcb401870a669d43cecb537bde36eb8b41df77f06d5f6fbc2)到[最後一筆交易](https://etherscan.io/tx/0xdfd6e717157354e64bbd5d6adf16761e5a5b3f914b1948d3545d39633244d47b)）。

### 虛假的 `_transfer` 函數 {#the-fake-transfer-function}

標準做法是使用[一個內部 `_transfer` 函數](/developers/tutorials/erc20-annotated-code/#the-_transfer-function-_transfer) 來進行實際的傳送。

在 `wARB` 中，這個函數看起來幾乎是合法的：

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

如果合約擁有者傳送代幣，為什麼 `Transfer` 事件顯示它們來自 `deployer`？

然而，還有一個更重要的問題。 誰調用了這個 `_transfer` 函數？ 它不能從外部調用，因為它被標記為 `internal`。 而且我們擁有的程式碼不包含任何對 `_transfer` 的調用。 顯然，它在這裡是作為一個誘餌。

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

當我們查看被調用來傳送代幣的函數，`transfer` 和 `transferFrom` 時，我們發現它們調用了一個完全不同的函數，`_f_`。

### 真正的 `_f_` 函數 {#the-real-f-function}

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

這個函數中有兩個潛在的危險信號。

- 使用 [函數修飾符](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) `_mod_`。 然而，當我們查看原始碼時，我們發現 `_mod_` 實際上是無害的。

  ```solidity
  modifier _mod_(address sender, address recipient, uint256 amount){
    _;
  }
  ```

- 我們在 `_transfer` 中看到的同樣問題，就是當 `contract_owner` 傳送代幣時，它們看起來像是來自 `deployer`。

### 虛假事件函數 `dropNewTokens` {#the-fake-events-function-dropNewTokens}

現在我們來看一個看起來像實際詐騙的東西。 為了可讀性，我對函數做了一點編輯，但它在功能上是等效的。

```solidity
function dropNewTokens(address uPool,
                       address[] memory eReceiver,
                       uint256[] memory eAmounts) public auth()
```

這個函數有 `auth()` 修飾符，這意味著它只能被合約擁有者調用。

```solidity
modifier auth() {
    require(msg.sender == contract_owner, "Not allowed to interact");
    _;
}
```

這個限制完全合理，因為我們不希望隨機帳戶分發代幣。 然而，函數的其餘部分是可疑的。

```solidity
{
    for (uint256 i = 0; i < eReceiver.length; i++) {
        emit Transfer(uPool, eReceiver[i], eAmounts[i]);
    }
}
```

一個將資金從一個池帳戶轉移到一個接收者陣列並對應一個金額陣列的函數是完全合理的。 在許多使用案例中，您會希望將代幣從單一來源分發到多個目的地，例如薪資發放、空投等。 在單一交易中完成此操作比發出多個交易，或甚至在同一交易中從不同的合約多次調用 ERC-20 更便宜 (在 gas 方面)。

然而，`dropNewTokens` 並沒有這樣做。 它發出 [`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1)，但實際上並沒有傳送任何代幣。 沒有任何正當理由去告訴鏈外應用程式一筆並未真正發生的傳送，從而混淆它們。

### 銷毀的 `Approve` 函數 {#the-burning-approve-function}

ERC-20 合約應該有一個用於授權的 [`approve` 函數](/developers/tutorials/erc20-annotated-code/#approve)，而我們的詐騙代幣確實有這樣一個函數，而且它甚至是正確的。 然而，因為 Solidity 源自 C 語言，所以它區分大小寫。 "Approve" 和 "approve" 是不同的字串。

此外，其功能與 `approve` 無關。

```solidity
    function Approve(
        address[] memory holders)
```

這個函數被調用時，會傳入一個代幣持有者的地址陣列。

```solidity
    public approver() {
```

`approver()` 修飾符確保只有 `contract_owner` 能夠調用此函數（見下文）。

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

對於每個持有者地址，該函數將持有者的全部餘額轉移到地址 `0x00...01`，實際上是銷毀了它（標準中的實際 `burn` 也會改變總供應量，並將代幣傳送到 `0x00...00`）。 這意味著 `contract_owner` 可以移除任何使用者的資產。 這似乎不是您希望在管理體系代幣中看到的功能。

### 程式碼品質問題 {#code-quality-issues}

這些程式碼品質問題並不能_證明_這段程式碼是詐騙，但它們使其顯得可疑。 像 Arbitrum 這樣的有組織的公司通常不會發布這麼差的程式碼。

#### `mount` 函數 {#the-mount-function}

雖然在[標準](https://eips.ethereum.org/EIPS/eip-20)中沒有指定，但一般來說，創建新代幣的函數稱為[`mint`](https://ethereum.org/el/developers/tutorials/erc20-annotated-code/#the-_mint-and-_burn-functions-_mint-and-_burn)。

如果我們查看 `wARB` 的建構函式，我們會發現鑄幣函數由於某些原因被重新命名為 `mount`，並且為了效率，它被調用了五次，每次使用初始供應量的五分之一，而不是一次性處理全部金額。

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

`mount` 函數本身也很可疑。

```solidity
    function mount(address account, uint256 amount) public {
        require(msg.sender == contract_owner, "ERC20: mint to the zero address");
```

查看 `require`，我們看到只有合約擁有者被允許鑄幣。 這是合法的。 但錯誤訊息應該是 _only owner is allowed to mint_ 或類似的內容。 相反，它卻是無關的 _ERC20: mint to the zero address_。 對於鑄幣到零地址的正確測試是 `require(account != address(0), "<error message>")`，但該合約從未費心去檢查。

```solidity
        _totalSupply = _totalSupply.add(amount);
        _balances[contract_owner] = _balances[contract_owner].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

還有兩個與鑄幣直接相關的可疑事實：

- 有一個 `account` 參數，推測這應該是接收鑄幣金額的帳戶。 但增加的餘額實際上是 `contract_owner` 的。

- 雖然增加的餘額屬於 `contract_owner`，但發出的事件卻顯示了一筆到 `account` 的傳送。

### 為何同時有 `auth` 和 `approver`？ 為什麼要有個什麼都不做的 `mod`？ {#why-both-autho-and-approver-why-the-mod-that-does-nothing}

這個合約包含三個修飾符：`_mod_`、`auth` 和 `approver`。

```solidity
    modifier _mod_(address sender, address recipient, uint256 amount){
        _;
    }
```

`_mod_` 接受三個參數，但對它們沒有做任何事情。 為什麼要有它？

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

`auth` 和 `approver` 更有意義，因為它們檢查合約是否由 `contract_owner` 調用。 我們預期某些特權操作，例如鑄幣，會被限制在該帳戶。 然而，擁有兩個做_完全相同事情_的獨立函數有什麼意義呢？

## 我們可以自動偵測到什麼？ {#what-can-we-detect-automatically}

我們可以透過查看 Etherscan 發現 `wARB` 是一個詐騙代幣。 然而，那是一個中心化的解決方案。 理論上，Etherscan 可能被顛覆或駭入。 能夠獨立判斷一個代幣是否合法會更好。

我們可以透過查看 ERC-20 代幣發出的事件，來使用一些技巧識別它是否可疑（可能是詐騙或寫得很差）。

## 可疑的 `Approval` 事件 {#suspicious-approval-events}

[`Approval` 事件](https://eips.ethereum.org/EIPS/eip-20#approval) 只應該在直接請求下發生（相較之下，[`Transfer` 事件](https://eips.ethereum.org/EIPS/eip-20#transfer-1) 可能因為授權而發生）。 有關此問題以及為何請求需要直接而非透過合約中介的詳細解釋，請[參見 Solidity 文件](https://docs.soliditylang.org/en/v0.8.20/security-considerations.html#tx-origin)。

這意味著，授權從[外部擁有的帳戶](/developers/docs/accounts/#types-of-account)支出的 `Approval` 事件，必須來自源於該帳戶且目的地為 ERC-20 合約的交易。 任何其他來自外部擁有帳戶的授權都是可疑的。

這裡有一個[識別這類事件的程式](https://github.com/qbzzt/20230915-scam-token-detection)，它使用 [viem](https://viem.sh/) 和 [TypeScript](https://www.typescriptlang.org/docs/)（一種具有型別安全的 JavaScript 變體）。 若要執行它：

1. 將 `.env.example` 複製為 `.env`。
2. 編輯 `.env` 以提供以太坊主網節點的 URL。
3. 執行 `pnpm install` 來安裝必要的套件。
4. 執行 `pnpm susApproval` 來尋找可疑的授權。

以下是逐行解釋：

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

從 `viem` 導入型別定義、函數和鏈定義。

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

建立一個 Viem 用戶端。 我們只需要從區塊鏈讀取資料，所以這個用戶端不需要私密金鑰。

```typescript
const testedAddress = "0xb047c8032b99841713b8e3872f06cf32beb27b82"
const fromBlock = 16859812n
const toBlock = 16873372n
```

可疑的 ERC-20 合約地址，以及我們將在其中尋找事件的區塊範圍。 節點提供商通常會限制我們讀取事件的能力，因為頻寬可能很昂貴。 幸運的是，`wARB` 在長達十八小時的時間內並未使用，所以我們可以尋找所有事件（總共只有 13 個）。

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

這是向 Viem 請求事件資訊的方式。 當我們提供確切的事件簽章，包括欄位名稱時，它會為我們解析事件。

```typescript
const isContract = async (addr: Address): boolean =>
  await client.getBytecode({ address: addr })
```

我們的演算法只適用於外部擁有的帳戶。 如果 `client.getBytecode` 返回任何位元組碼，這意味著它是一個合約，我們應該直接跳過它。

如果您以前沒用過 TypeScript，這個函數定義可能會看起來有點奇怪。 我們不只告訴它第一個（也是唯一一個）參數叫做 `addr`，還告訴它這個參數的型別是 `Address`。 同樣地，`: boolean` 部分告訴 TypeScript 這個函數的返回值是一個布林值。

```typescript
const getEventTxn = async (ev: Event): TransactionReceipt =>
  await client.getTransactionReceipt({ hash: ev.transactionHash })
```

這個函數從事件中獲取交易收據。 我們需要收據來確保我們知道交易的目的地是什麼。

```typescript
const suspiciousApprovalEvent = async (ev : Event) : (Event | null) => {
```

這是最重要的函數，它實際決定了一個事件是否可疑。 返回類型 `(Event | null)` 告訴 TypeScript 這個函數可以返回 `Event` 或 `null`。 如果事件不可疑，我們返回 `null`。

```typescript
const owner = ev.args._owner
```

Viem 有欄位名稱，所以它為我們解析了事件。 `_owner` 是將被花費的代幣的所有者。

```typescript
// 合約的授權不可疑
if (await isContract(owner)) return null
```

如果擁有者是合約，則假設此授權不可疑。 要檢查合約的授權是否可疑，我們需要追蹤交易的完整執行過程，以查看它是否曾到達擁有者合約，以及該合約是否直接調用了 ERC-20 合約。 這比我們想做的要耗費更多資源。

```typescript
const txn = await getEventTxn(ev)
```

如果授權來自外部擁有的帳戶，則獲取引起它的交易。

```typescript
// 如果授權來自一個非交易 `from` 欄位的 EOA 擁有者，則該授權是可疑的
if (owner.toLowerCase() != txn.from.toLowerCase()) return ev
```

我們不能只檢查字串是否相等，因為地址是十六進位的，所以它們包含字母。 有時候，例如在 `txn.from` 中，這些字母都是小寫的。 在其他情況下，例如 `ev.args._owner`，地址是[混合大小寫以用於錯誤識別](https://eips.ethereum.org/EIPS/eip-55)。

但如果交易不是來自擁有者，且該擁有者是外部擁有的，那麼我們就有了一筆可疑的交易。

```typescript
// 如果交易的目的地不是我們正在
// 調查的 ERC-20 合約，那它也是可疑的
if (txn.to.toLowerCase() != testedAddress) return ev
```

同樣地，如果交易的 `to` 地址，也就是第一個被調用的合約，不是正在調查的 ERC-20 合約，那麼它就是可疑的。

```typescript
    // 如果沒有可疑的理由，返回 null。
    return null
}
```

如果兩個條件都不成立，那麼 `Approval` 事件就不可疑。

```typescript
const testPromises = approvalEvents.map((ev) => suspiciousApprovalEvent(ev))
const testResults = (await Promise.all(testPromises)).filter((x) => x != null)

console.log(testResults)
```

[一個 `async` 函數](https://www.w3schools.com/js/js_async.asp) 會返回一個 `Promise` 物件。 使用常見的語法 `await x()`，我們等待該 `Promise` 完成後再繼續處理。 這在程式設計上很簡單且容易理解，但效率不高。 當我們等待特定事件的 `Promise` 完成時，我們已經可以開始處理下一個事件了。

這裡我們使用 [`map`](https://www.w3schools.com/jsref/jsref_map.asp) 來建立一個 `Promise` 物件的陣列。 然後我們使用 [`Promise.all`](https://www.javascripttutorial.net/es6/javascript-promise-all/) 來等待所有這些 promise 完成。 然後我們 [`filter`](https://www.w3schools.com/jsref/jsref_filter.asp) 那些結果以移除不可疑的事件。

### 可疑的 `Transfer` 事件 {#suspicious-transfer-events}

識別詐騙代幣的另一種可能方法是查看它們是否有任何可疑的傳送。 例如，來自沒有那麼多代幣的帳戶的傳送。 您可以查看[如何實現此測試](https://github.com/qbzzt/20230915-scam-token-detection/blob/main/susTransfer.ts)，但 `wARB` 沒有這個問題。

## 結論 {#conclusion}

ERC-20 詐騙的自動偵測會受到[偽陰性](https://en.wikipedia.org/wiki/False_positives_and_false_negatives#False_negative_error)的影響，因為詐騙可以使用一個完全正常的 ERC-20 代幣合約，而該合約只是不代表任何真實的東西。 所以你應該總是嘗試_從可信賴的來源獲取代幣地址_。

自動偵測在某些情況下可以提供幫助，例如在 DeFi 領域，那裡有很多代幣需要自動處理。 但一如既往，[買者自負](https://www.investopedia.com/terms/c/caveatemptor.asp)，請自行研究，並鼓勵您的使用者也這樣做。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
