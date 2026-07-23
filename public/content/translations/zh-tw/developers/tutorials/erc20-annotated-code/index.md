---
title: "ERC-20 合約導覽"
description: "歐本齊柏林 (OpenZeppelin) ERC-20 合約中包含什麼？為什麼要這樣設計？"
author: "奧里·波梅蘭茨"
lang: zh-tw
tags: ["Solidity", "erc-20"]
skill: beginner
breadcrumb: "ERC-20 導覽"
published: 2021-03-09
---

## 簡介 {#introduction}

以太坊最常見的用途之一是讓一個群體建立可交易的代幣，從某種意義上來說，就是他們自己的貨幣。這些代幣通常遵循一個標準：[ERC-20](/developers/docs/standards/tokens/erc-20/)。這個標準使得編寫能與所有 ERC-20 代幣配合使用的工具（例如流動性池和錢包）成為可能。在本文中，我們將分析 [歐本齊柏林 (OpenZeppelin) 的 Solidity ERC-20 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)，以及其[介面定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)。

這是帶有註解的原始碼。如果你想實作 ERC-20，請[閱讀本教學](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## 介面 {#the-interface}

像 ERC-20 這樣標準的目的是允許許多代幣實作在各種應用程式（如錢包和去中心化交易所）之間是可互操作的。為了實現這一點，我們建立了一個[介面](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)。任何需要使用代幣合約的程式碼都可以使用介面中相同的定義，並與所有使用該介面的代幣合約相容，無論它是像梅塔馬斯克 (MetaMask) 這樣的錢包、像 etherscan.io 這樣的去中心化應用程式 (dapp)，還是像流動性池這樣的其他合約。

![Illustration of the ERC-20 interface](erc20_interface.png)

如果你是一位經驗豐富的程式設計師，你可能記得在 [Java](https://www.w3schools.com/java/java_interface.asp) 甚至 [C 標頭檔](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html)中看過類似的結構。

這是歐本齊柏林提供的 [ERC-20 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)定義。它是將[人類可讀的標準](https://eips.ethereum.org/EIPS/eip-20)翻譯成 Solidity 程式碼。當然，介面本身並不定義「如何」執行任何操作。這將在下面的合約原始碼中解釋。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity 檔案應該包含一個授權標識符。[你可以在這裡查看授權列表](https://spdx.org/licenses/)。如果你需要不同的授權，只需在註解中說明即可。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 語言仍在快速發展，新版本可能與舊程式碼不相容（[請見此處](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)）。因此，最好不僅指定語言的最低版本，還要指定最高版本，即你測試程式碼時使用的最新版本。

&nbsp;

```solidity
/**
 * @dev EIP 中定義的 ERC-20 標準介面。
 */
```

註解中的 `@dev` 是 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html)的一部分，用於從原始碼產生文件。

&nbsp;

```solidity
interface IERC20 {
```

按照慣例，介面名稱以 `I` 開頭。

&nbsp;

```solidity
    /**
     * @dev 回傳存在的代幣數量。
     */
    function totalSupply() external view returns (uint256);
```

這個函式是 `external`，這意味著[它只能從合約外部呼叫](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。它回傳合約中代幣的總供應量。這個值使用以太坊中最常見的型別回傳，即無號 256 位元整數（256 位元是 EVM 的原生字組大小）。這個函式也是一個 `view`，這意味著它不會改變狀態，因此它可以在單一節點上執行，而不需要區塊鏈中的每個節點都執行它。這種類型的函式不會產生交易，也不會消耗[燃料](/developers/docs/gas/)。

**注意：** 理論上，合約的建立者似乎可以透過回傳比實際值更小的總供應量來作弊，使每個代幣看起來比實際更有價值。然而，這種擔憂忽略了區塊鏈的真實本質。區塊鏈上發生的一切都可以被每個節點驗證。為了實現這一點，每個合約的機器語言程式碼和儲存空間在每個節點上都是可用的。雖然你不被強制要求發布合約的 Solidity 程式碼，但除非你發布原始碼以及編譯它所使用的 Solidity 版本，否則沒有人會認真對待你，因為這樣才能與你提供的機器語言程式碼進行驗證。例如，請參閱[這個合約](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)。

&nbsp;

```solidity
    /**
     * @dev 回傳 `account` 擁有的代幣數量。
     */
    function balanceOf(address account) external view returns (uint256);
```

顧名思義，`balanceOf` 回傳帳戶的餘額。在 Solidity 中，以太坊帳戶使用 `address` 型別來識別，該型別佔用 160 位元。它也是 `external` 和 `view`。

&nbsp;

```solidity
    /**
     * @dev 將 `amount` 數量的代幣從呼叫者的帳戶轉帳至 `recipient`。
     *
     * 回傳一個布林值來指示操作是否成功。
     *
     * 觸發 {Transfer} 事件。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 函式將代幣從呼叫者轉帳到不同的地址。這涉及狀態的改變，因此它不是 `view`。當使用者呼叫這個函式時，它會建立一筆交易並消耗燃料。它還會觸發一個事件 `Transfer`，以通知區塊鏈上的所有人該事件的發生。

該函式為兩種不同類型的呼叫者提供兩種類型的輸出：

- 直接從使用者介面呼叫該函式的使用者。通常，使用者提交交易後不會等待回應，因為這可能需要無限長的時間。使用者可以透過尋找交易收據（由交易雜湊值識別）或尋找 `Transfer` 事件來查看發生了什麼事。
- 其他合約，它們作為整體交易的一部分呼叫該函式。這些合約會立即獲得結果，因為它們在同一筆交易中執行，因此它們可以使用函式的回傳值。

其他改變合約狀態的函式也會產生相同類型的輸出。

&nbsp;

授權額度允許一個帳戶花費屬於不同擁有者的一些代幣。這非常有用，例如對於作為賣方的合約。合約無法監控事件，因此如果買方直接將代幣轉帳給賣方合約，該合約將不知道它已經收到付款。相反地，買方允許賣方合約花費特定金額，然後賣方轉帳該金額。這是透過賣方合約呼叫的函式來完成的，因此賣方合約可以知道它是否成功。

```solidity
    /**
     * @dev 回傳 `spender` 透過 {transferFrom} 被允許代表 `owner` 花費的剩餘代幣數量。預設為零。
     *
     * 當呼叫 {approve} 或 {transferFrom} 時，此數值會改變。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 函式讓任何人都可以查詢一個地址 (`owner`) 允許另一個地址 (`spender`) 花費的授權額度是多少。

&nbsp;

```solidity
    /**
     * @dev 將 `amount` 設定為 `spender` 對呼叫者代幣的授權額度。
     *
     * 回傳一個布林值來指示操作是否成功。
     *
     * 重要提示：請注意，使用此方法更改授權額度會帶來風險，因為不幸的交易順序可能導致某人同時使用舊的與新的授權額度。減輕此競爭條件的一種可能解決方案是先將花費者的授權額度降至 0，然後再設定所需的值：
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * 觸發 {Approval} 事件。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 函式建立一個授權額度。請務必閱讀有關它可能如何被濫用的訊息。在以太坊中，你可以控制自己交易的順序，但你無法控制其他人交易的執行順序，除非你等到看見對方的交易已經發生後才提交自己的交易。

&nbsp;

```solidity
    /**
     * @dev 使用授權額度機制將 `amount` 數量的代幣從 `sender` 轉帳至 `recipient`。隨後會從呼叫者的授權額度中扣除 `amount`。
     *
     * 回傳一個布林值來指示操作是否成功。
     *
     * 觸發 {Transfer} 事件。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最後，`transferFrom` 被花費者用來實際花費授權額度。

&nbsp;

```solidity

    /**
     * @dev 當 `value` 數量的代幣從一個帳戶（`from`）轉帳至另一個帳戶（`to`）時觸發。
     *
     * 請注意，`value` 可以為零。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev 當透過呼叫 {approve} 設定 `spender` 對 `owner` 的授權額度時觸發。`value` 為新的授權額度。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

當 ERC-20 合約的狀態改變時，會觸發這些事件。

## 實際的合約 {#the-actual-contract}

這是實作 ERC-20 標準的實際合約，[取自此處](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。它不應該被原封不動地使用，但你可以[繼承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)它，將其擴展為可用的東西。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### 匯入陳述式 {#import-statements}

除了上述的介面定義之外，合約定義還匯入了另外兩個檔案：

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` 是使用 [OpenGSN](https://opengsn.org/) 所需的定義，這是一個允許沒有以太幣的使用者使用區塊鏈的系統。請注意，這是一個舊版本，如果你想與 OpenGSN 整合，請[使用本教學](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMath 函式庫](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，它可以防止 Solidity 版本 **&lt;0.8.0** 的算術溢位/下溢。在 Solidity ≥0.8.0 中，算術運算在溢位/下溢時會自動回滾，使得 SafeMath 變得不必要。此合約使用 SafeMath 是為了與舊版編譯器向下相容。

&nbsp;

此註解解釋了合約的目的。

```solidity
/**
 * @dev {IERC20} 介面的實作。
 *
 * 此實作與代幣建立的方式無關。這意味著必須在衍生合約中使用 {_mint} 新增供應機制。
 * 如需通用機制，請參閱 {ERC20PresetMinterPauser}。
 *
 * 提示：如需詳細說明，請參閱我們的指南
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[如何實作供應機制]。
 *
 * 我們遵循了歐本齊柏林的一般準則：函式在失敗時會回復（revert）而不是回傳 `false`。儘管如此，這種行為是符合慣例的，並且不會與 ERC-20 應用程式的期望發生衝突。
 *
 * 此外，在呼叫 {transferFrom} 時會觸發 {Approval} 事件。
 * 這允許應用程式僅透過監聽上述事件來重建所有帳戶的授權額度。EIP 的其他實作可能不會觸發這些事件，因為規範並未要求。
 *
 * 最後，新增了非標準的 {decreaseAllowance} 與 {increaseAllowance}
 * 函式，以減輕設定授權額度時眾所周知的問題。請參閱 {IERC20-approve}。
 */

```

### 合約定義 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

這一行指定了繼承，在這種情況下，繼承自上面的 `IERC20` 和用於 OpenGSN 的 `Context`。

&nbsp;

```solidity

    using SafeMath for uint256;

```

這一行將 `SafeMath` 函式庫附加到 `uint256` 型別。你可以在[這裡](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)找到這個函式庫。

### 變數定義 {#variable-definitions}

這些定義指定了合約的狀態變數。這些變數被宣告為 `private`，但這僅意味著區塊鏈上的其他合約無法讀取它們。_區塊鏈上沒有秘密_，每個節點上的軟體都擁有每個區塊中每個合約的狀態。按照慣例，狀態變數的命名以 `_<something>` 開頭。

前兩個變數是[映射 (mappings)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，這意味著它們的行為與[關聯陣列](https://wikipedia.org/wiki/Associative_array)大致相同，只是鍵值是數值。儲存空間僅分配給值不同於預設值（零）的項目。

```solidity
    mapping (address => uint256) private _balances;
```

第一個映射 `_balances` 是地址及其各自擁有的此代幣餘額。要存取餘額，請使用此語法：`_balances[<address>]`。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

這個變數 `_allowances` 儲存了前面解釋過的授權額度。第一個索引是代幣的擁有者，第二個是獲得授權額度的合約。要存取地址 A 可以從地址 B 的帳戶中花費的金額，請使用 `_allowances[B][A]`。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

顧名思義，這個變數追蹤代幣的總供應量。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

這三個變數用於提高可讀性。前兩個不言自明，但 `_decimals` 則不然。

一方面，以太坊沒有浮點數或小數變數。另一方面，人類喜歡能夠分割代幣。人們選擇黃金作為貨幣的原因之一是，當有人想用一頭牛的價值來買一隻鴨子時，很難找零。

解決方案是追蹤整數，但計算的不是真實的代幣，而是一種幾乎毫無價值的小數代幣。以以太幣為例，小數代幣稱為 Wei，10^18 Wei 等於 1 ETH。在撰寫本文時，10,000,000,000,000 Wei 大約等於一美分或一歐分。

應用程式需要知道如何顯示代幣餘額。如果使用者有 3,141,000,000,000,000,000 Wei，那是 3.14 ETH 嗎？31.41 ETH？還是 3,141 ETH？在以太幣的情況下，定義為 10^18 Wei 等於 1 ETH，但對於你的代幣，你可以選擇不同的值。如果分割代幣沒有意義，你可以使用 `_decimals` 值為零。如果你想使用與 ETH 相同的標準，請使用值 **18**。

### 建構函式 {#the-constructor}

```solidity
    /**
     * @dev 設定 {name} 與 {symbol} 的值，並將 {decimals} 初始化為預設值 18。
     *
     * 若要為 {decimals} 選擇不同的值，請使用 {_setupDecimals}。
     *
     * 這三個值都是不可變的：它們只能在建構期間設定一次。
     */
    constructor (string memory name_, string memory symbol_) public {
        // 在 Solidity ≥0.7.0 中，'public' 是隱含的，可以省略。

        _name = name_;
        _symbol = symbol_;
        _decimals = 18;
    }
```

建構函式在合約首次建立時被呼叫。按照慣例，函式參數的命名以 `<something>_` 開頭。

### 使用者介面函式 {#user-interface-functions}

```solidity
    /**
     * @dev 回傳代幣的名稱。
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 回傳代幣的符號，通常是名稱的較短版本。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 回傳用於獲取其使用者表示形式的小數位數。
     * 例如，如果 `decimals` 等於 `2`，則 `505` 個代幣的餘額應向使用者顯示為 `5,05`（`505 / 10 ** 2`）。
     *
     * 代幣通常選擇 18 作為值，以模仿以太幣與 Wei 之間的關係。這是 {ERC-20} 使用的值，除非呼叫了 {_setupDecimals}。
     *
     * 注意：此資訊僅用於_顯示_目的：它絕不會影響合約的任何算術運算，包括 {IERC20-balanceOf} 與 {IERC20-transfer}。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

這些函式 `name`、`symbol` 和 `decimals` 幫助使用者介面了解你的合約，以便它們能夠正確顯示。

回傳型別是 `string memory`，這意味著回傳一個儲存在記憶體中的字串。變數（例如字串）可以儲存在三個位置：

|          | 生命週期 | 合約存取權限 | 燃料成本 |
| -------- | ------------- | --------------- | -------------------------------------------------------------- |
| 記憶體 (Memory)   | 函式呼叫期間 | 讀/寫      | 數十或數百（位置越高成本越高）                 |
| 呼叫資料 (Calldata) | 函式呼叫期間 | 唯讀       | 不能用作回傳型別，只能用作函式參數型別 |
| 儲存空間 (Storage)  | 直到被改變 | 讀/寫      | 高（讀取 800，寫入 20k）                             |

在這種情況下，`memory` 是最佳選擇。

### 讀取代幣資訊 {#read-token-information}

這些是提供有關代幣資訊的函式，包括總供應量或帳戶餘額。

```solidity
    /**
     * @dev 請參閱 {IERC20-totalSupply}。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 函式回傳代幣的總供應量。

&nbsp;

```solidity
    /**
     * @dev 請參閱 {IERC20-balanceOf}。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

讀取帳戶的餘額。請注意，任何人都可以取得任何其他人的帳戶餘額。試圖隱藏這些資訊是沒有意義的，因為它無論如何都可以在每個節點上取得。_區塊鏈上沒有秘密。_

### 轉帳代幣 {#transfer-tokens}

```solidity
    /**
     * @dev 請參閱 {IERC20-transfer}。
     *
     * 要求：
     *
     * - `recipient` 不能是零地址。
     * - 呼叫者必須擁有至少 `amount` 的餘額。
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
```

呼叫 `transfer` 函式將代幣從發送者的帳戶轉帳到另一個帳戶。請注意，即使它回傳一個布林值，該值也始終為 **true**。如果轉帳失敗，合約會回滾該呼叫。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 函式執行實際的工作。它是一個私有函式，只能由其他合約函式呼叫。按照慣例，私有函式的命名以 `_<something>` 開頭，與狀態變數相同。

通常在 Solidity 中，我們使用 `msg.sender` 作為訊息發送者。然而，這會破壞 [OpenGSN](https://opengsn.org/)。如果我們想允許我們的代幣進行無以太幣交易，我們需要使用 `_msgSender()`。對於一般交易，它回傳 `msg.sender`，但對於無以太幣交易，它回傳原始簽署者，而不是轉發訊息的合約。

### 授權額度函式 {#allowance-functions}

這些是實作授權額度功能的函式：`allowance`、`approve`、`transferFrom` 和 `_approve`。此外，歐本齊柏林 (OpenZeppelin) 的實作超越了基本標準，包含了一些提高安全性的功能：`increaseAllowance` 和 `decreaseAllowance`。

#### allowance 函式 {#allowance}

```solidity
    /**
     * @dev 請參閱 {IERC20-allowance}。
     */
    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return _allowances[owner][spender];
    }
```

`allowance` 函式允許每個人檢查任何授權額度。

#### approve 函式 {#approve}

```solidity
    /**
     * @dev 請參閱 {IERC20-approve}。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     */
    function approve(address spender, uint256 amount) public virtual override returns (bool) {
```

呼叫此函式來建立授權額度。它類似於上面的 `transfer` 函式：

- 該函式只是呼叫一個執行實際工作的內部函式（在本例中為 `_approve`）。
- 該函式要麼回傳 `true`（如果成功），要麼回滾（如果不成功）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

我們使用內部函式來盡量減少發生狀態改變的地方。_任何_改變狀態的函式都是潛在的安全風險，需要進行安全稽核。這樣我們出錯的機會就更少了。

#### transferFrom 函式 {#transferfrom}

這是花費者呼叫以花費授權額度的函式。這需要兩個操作：轉帳被花費的金額，並將授權額度減少該金額。

```solidity
    /**
     * @dev 請參閱 {IERC20-transferFrom}。
     *
     * 觸發 {Approval} 事件以指示更新後的授權額度。這不是 EIP 所要求的。請參閱 {ERC-20} 開頭的注意事項。
     *
     * 要求：
     *
     * - `sender` 與 `recipient` 不能是零地址。
     * - `sender` 必須擁有至少 `amount` 的餘額。
     * - 呼叫者對 ``sender`` 的代幣必須擁有至少 `amount` 的授權額度。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 函式呼叫做了兩件事。首先，它計算 `a-b`，這是新的授權額度。其次，它檢查這個結果是否為負數。如果是負數，呼叫將使用提供的訊息回滾。請注意，當呼叫回滾時，在該呼叫期間先前完成的任何處理都會被忽略，因此我們不需要復原 `_transfer`。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### 歐本齊柏林 (OpenZeppelin) 的安全附加功能 {#openzeppelin-safety-additions}

將非零的授權額度設定為另一個非零值是危險的，因為你只能控制自己交易的順序，而不能控制其他任何人的。想像你有兩個使用者，天真的 Alice 和不誠實的 Bill。Alice 想要 Bill 提供一些服務，她認為這需要花費五個代幣——所以她給了 Bill 五個代幣的授權額度。

然後情況發生了變化，Bill 的價格上漲到十個代幣。仍然想要該服務的 Alice 發送了一筆交易，將 Bill 的授權額度設定為十。當 Bill 在交易池中看到這筆新交易時，他發送了一筆花費 Alice 五個代幣的交易，並設定了高得多的 Gas 價格，以便它能更快被挖出。這樣一來，Bill 可以先花費五個代幣，然後一旦 Alice 的新授權額度被挖出，再花費十個代幣，總共花費十五個代幣，超過了 Alice 打算授權的數量。這種技術被稱為[搶跑](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)。

| Alice 交易 | Alice 隨機數 | Bill 交易              | Bill 隨機數 | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| ----------------- | ----------- | ----------------------------- | ---------- | ---------------- | ---------------------------- |
| approve(Bill, 5)  | 10          |                               |            | 5                | 0                            |
|                   |             | transferFrom(Alice, Bill, 5)  | 10,123     | 0                | 5                            |
| approve(Bill, 10) | 11          |                               |            | 10               | 5                            |
|                   |             | transferFrom(Alice, Bill, 10) | 10,124     | 0                | 15                           |

為了避免這個問題，這兩個函式（`increaseAllowance` 和 `decreaseAllowance`）允許你按特定金額修改授權額度。因此，如果 Bill 已經花費了五個代幣，他將只能再花費五個。根據時間點的不同，這有兩種運作方式，這兩種方式最終都只會讓 Bill 獲得十個代幣：

A：

| Alice 交易          | Alice 隨機數 | Bill 交易             | Bill 隨機數 | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| -------------------------- | ----------: | ---------------------------- | ---------: | ---------------: | ---------------------------- |
| approve(Bill, 5)           |          10 |                              |            |                5 | 0                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,123 |                0 | 5                            |
| increaseAllowance(Bill, 5) |          11 |                              |            |          0+5 = 5 | 5                            |
|                            |             | transferFrom(Alice, Bill, 5) |     10,124 |                0 | 10                           |

B：

| Alice 交易          | Alice 隨機數 | Bill 交易              | Bill 隨機數 | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| -------------------------- | ----------: | ----------------------------- | ---------: | ---------------: | ---------------------------: |
| approve(Bill, 5)           |          10 |                               |            |                5 |                            0 |
| increaseAllowance(Bill, 5) |          11 |                               |            |         5+5 = 10 |                            0 |
|                            |             | transferFrom(Alice, Bill, 10) |     10,124 |                0 |                           10 |

```solidity
    /**
     * @dev 原子性地增加呼叫者授予 `spender` 的授權額度。
     *
     * 這是 {approve} 的替代方案，可用作減輕 {IERC20-approve} 中描述之問題的對策。
     *
     * 觸發 {Approval} 事件以指示更新後的授權額度。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     */
    function increaseAllowance(address spender, uint256 addedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }
```

`a.add(b)` 函式是一個安全的加法。在極少數情況下，如果 `a`+`b`>=`2^256`，它不會像一般加法那樣發生溢位迴繞 (wrap around)。

```solidity

    /**
     * @dev 原子性地減少呼叫者授予 `spender` 的授權額度。
     *
     * 這是 {approve} 的替代方案，可用作減輕 {IERC20-approve} 中描述之問題的對策。
     *
     * 觸發 {Approval} 事件以指示更新後的授權額度。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     * - `spender` 對呼叫者必須擁有至少 `subtractedValue` 的授權額度。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 修改代幣資訊的函式 {#functions-that-modify-token-information}

這是執行實際工作的四個函式：`_transfer`、`_mint`、`_burn` 和 `_approve`。

#### _transfer 函式 {#transfer}

```solidity
    /**
     * @dev 將 `amount` 數量的代幣從 `sender` 轉帳至 `recipient`。
     *
     * 這個內部函式等同於 {transfer}，可用於例如實作自動代幣費用、削減機制等。
     *
     * 觸發 {Transfer} 事件。
     *
     * 要求：
     *
     * - `sender` 不能是零地址。
     * - `recipient` 不能是零地址。
     * - `sender` 必須擁有至少 `amount` 的餘額。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

這個函式 `_transfer` 將代幣從一個帳戶轉帳到另一個帳戶。它被 `transfer`（用於從發送者自己的帳戶轉帳）和 `transferFrom`（用於使用授權額度從其他人的帳戶轉帳）呼叫。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

在以太坊中，實際上沒有人擁有零地址（也就是說，沒有人知道其對應公鑰轉換為零地址的私鑰）。當人們使用該地址時，通常是軟體錯誤——因此，如果零地址被用作發送者或接收者，我們就會讓操作失敗。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

有兩種方法可以使用這個合約：

1. 將其用作你自己程式碼的範本
1. [繼承它](https://www.bitdegree.org/learn/solidity-inheritance)，並僅覆寫你需要修改的那些函式

第二種方法要好得多，因為歐本齊柏林 (OpenZeppelin) 的 ERC-20 程式碼已經過稽核並被證明是安全的。當你使用繼承時，你修改了哪些函式一目了然，為了信任你的合約，人們只需要稽核那些特定的函式。

每次代幣易手時執行一個函式通常很有用。然而，`_transfer` 是一個非常重要的函式，而且有可能寫得不安全（見下文），所以最好不要覆寫它。解決方案是 `_beforeTokenTransfer`，這是一個[掛鉤 (hook) 函式](https://wikipedia.org/wiki/Hooking)。你可以覆寫這個函式，它將在每次轉帳時被呼叫。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

這些是實際執行轉帳的程式碼行。請注意，它們之間**沒有任何東西**，而且我們在將轉帳金額加到接收者之前，先從發送者那裡減去它。這很重要，因為如果中間有對不同合約的呼叫，它可能會被用來欺騙這個合約。這樣一來，轉帳是原子性的 (atomic)，中間不會發生任何事情。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最後，觸發一個 `Transfer` 事件。智能合約無法存取事件，但在區塊鏈外部執行的程式碼可以監聽事件並對其做出反應。例如，錢包可以追蹤擁有者何時獲得更多代幣。

#### _mint 和 _burn 函式 {#mint-and-burn}

這兩個函式（`_mint` 和 `_burn`）修改代幣的總供應量。它們是內部函式，在這個合約中沒有呼叫它們的函式，因此只有當你繼承該合約並加入你自己的邏輯來決定在什麼條件下鑄造新代幣或銷毀現有代幣時，它們才有用。

**注意：** 每個 ERC-20 代幣都有自己的業務邏輯來決定代幣管理。例如，固定供應量的合約可能只在建構函式中呼叫 `_mint`，而從不呼叫 `_burn`。出售代幣的合約會在收到付款時呼叫 `_mint`，並可能在某個時候呼叫 `_burn` 以避免失控的通貨膨脹。

```solidity
    /** @dev 建立 `amount` 數量的代幣並將其分配給 `account`，增加總供應量。
     *
     * 觸發 {Transfer} 事件，並將 `from` 設定為零地址。
     *
     * 要求：
     *
     * - `to` 不能是零地址。
     */
    function _mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");
        _beforeTokenTransfer(address(0), account, amount);
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }
```

確保在代幣總數改變時更新 `_totalSupply`。

&nbsp;

```solidity
    /**
     * @dev 從 `account` 銷毀 `amount` 數量的代幣，減少總供應量。
     *
     * 觸發 {Transfer} 事件，並將 `to` 設定為零地址。
     *
     * 要求：
     *
     * - `account` 不能是零地址。
     * - `account` 必須擁有至少 `amount` 數量的代幣。
     */
    function _burn(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: burn from the zero address");

        _beforeTokenTransfer(account, address(0), amount);

        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }
```

`_burn` 函式與 `_mint` 幾乎相同，只是方向相反。

#### _approve 函式 {#approve-2}

這是實際指定授權額度的函式。請注意，它允許擁有者指定高於擁有者目前餘額的授權額度。這是可以的，因為餘額是在轉帳時檢查的，那時的餘額可能與建立授權額度時的餘額不同。

```solidity
    /**
     * @dev 將 `amount` 設定為 `spender` 對 `owner` 代幣的授權額度。
     *
     * 這個內部函式等同於 `approve`，可用於例如為某些子系統設定自動授權額度等。
     *
     * 觸發 {Approval} 事件。
     *
     * 要求：
     *
     * - `owner` 不能是零地址。
     * - `spender` 不能是零地址。
     */
    function _approve(address owner, address spender, uint256 amount) internal virtual {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
```

&nbsp;

觸發一個 `Approval` 事件。根據應用程式的編寫方式，花費者合約可以由擁有者或監聽這些事件的伺服器告知該授權。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 修改 Decimals 變數 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev 將 {decimals} 設定為預設值 18 以外的值。
     *
     * 警告：此函式只能從建構函式中呼叫。大多數與代幣合約互動的應用程式不會預期 {decimals} 會發生改變，如果改變可能會導致運作不正確。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

這個函式修改 `_decimals` 變數，該變數用於告訴使用者介面如何解釋金額。你應該從建構函式中呼叫它。在隨後的任何時間點呼叫它都是不誠實的，而且應用程式也不是設計來處理這種情況的。

### 掛鉤 (Hooks) {#hooks}

```solidity

    /**
     * @dev 在任何代幣轉帳之前呼叫的掛鉤（Hook）。這包括鑄造與銷毀。
     *
     * 呼叫條件：
     *
     * - 當 `from` 與 `to` 均非零時，``from`` 的 `amount` 數量代幣將被轉帳至 `to`。
     * - 當 `from` 為零時，將為 `to` 鑄造 `amount` 數量的代幣。
     * - 當 `to` 為零時，``from`` 的 `amount` 數量代幣將被銷毀。
     * - `from` 與 `to` 永遠不會同時為零。
     *
     * 若要了解有關掛鉤的更多資訊，請前往 xref:ROOT:extending-contracts.adoc#using-hooks[Using Hooks]。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

這是在轉帳期間要呼叫的掛鉤函式。它在這裡是空的，但如果你需要它做些什麼，只需覆寫它即可。

## 結論 {#conclusion}

作為複習，以下是這個合約中一些最重要的概念（在我看來，你的看法可能會有所不同）：

- _區塊鏈上沒有秘密_。智能合約可以存取的任何資訊對全世界都是公開的。
- 你可以控制自己交易的順序，但無法控制其他人的交易何時發生。這就是為什麼改變授權額度可能是危險的，因為它讓花費者可以花費兩個授權額度的總和。
- `uint256` 型別的值會發生溢位迴繞。換句話說，_0-1=2^256-1_。如果這不是預期的行為，你必須檢查它（或使用為你執行此操作的 SafeMath 函式庫）。請注意，這在 [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) 中發生了改變。
- 在特定的地方進行特定類型的所有狀態改變，因為這會使稽核變得更容易。這就是為什麼我們有例如 `_approve`，它被 `approve`、`transferFrom`、`increaseAllowance` 和 `decreaseAllowance` 呼叫的原因。
- 狀態改變應該是原子性的，中間沒有任何其他動作（正如你在 `_transfer` 中看到的）。這是因為在狀態改變期間，你會處於不一致的狀態。例如，在你從發送者的餘額中扣除到你加到接收者的餘額之間，存在的代幣比應該存在的要少。如果它們之間有操作，特別是對不同合約的呼叫，這可能會被潛在地濫用。

既然你已經看到了歐本齊柏林 (OpenZeppelin) ERC-20 合約是如何編寫的，特別是它是如何變得更安全的，現在去編寫你自己的安全合約和應用程式吧。

[點擊這裡查看我更多的作品](https://cryptodocguy.pro/)。
