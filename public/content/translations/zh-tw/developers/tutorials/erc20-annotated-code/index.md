---
title: "ERC-20 合約逐步解說"
description: OpenZeppelin 的 ERC-20 合約內容是什麼？這些內容又為何存在？
author: 作者：Ori Pomerantz
lang: zh-tw
tags: [ "穩固", "erc-20" ]
skill: beginner
published: 2021-03-09
---

## 介紹 {#introduction}

以太坊最常見的用處之一就是為一個團隊建立一種可交易的代幣。某種意義上，這是屬於他們自己的貨幣。 這些代幣通常會遵循一項標準，即 [ERC-20](/developers/docs/standards/tokens/erc-20/)。 這項標準讓開發能與所有 ERC-20 代幣相容的工具（例如流動性池和錢包）成為可能。 在本文中，我們將分析 [OpenZeppelin Solidity ERC20 實作](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) 以及 [介面定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)。

這是附有註解的原始碼。 如果您想實作 ERC-20，請[閱讀本教學](https://docs.openzeppelin.com/contracts/2.x/erc20-supply)。

## 介面 {#the-interface}

像 ERC-20 這樣的標準，其目的是為了讓許多代幣實作能夠在錢包和去中心化交易所等應用程式之間互通。 為了達成這個目標，我們建立一個[介面](https://www.geeksforgeeks.org/solidity/solidity-basics-of-interface/)。 任何需要使用代幣合約的程式碼，都可以使用介面中的相同定義，並與所有使用該介面的代幣合約相容，無論是像 MetaMask 這樣的錢包、etherscan.io 這樣的 dapp，或是像流動性池這樣的不同合約。

![ERC-20 介面圖解](erc20_interface.png)

如果你是有經驗的程式設計師，你可能還記得在 [Java](https://www.w3schools.com/java/java_interface.asp) 或甚至 [C 標頭檔](https://gcc.gnu.org/onlinedocs/cpp/Header-Files.html) 中看過類似的結構。

這是 OpenZeppelin 的 [ERC-20 介面](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol) 定義。 它是將[人類可讀標準](https://eips.ethereum.org/EIPS/eip-20)翻譯成 Solidity 程式碼的結果。 當然，介面本身並未定義要 _如何_ 做任何事。 這點會在下方的合約原始碼中解釋。

&nbsp;

```solidity
// SPDX-License-Identifier: MIT
```

Solidity 檔案應該要包含一個授權許可證識別碼。 [您可以在此處查看授權許可證清單](https://spdx.org/licenses/)。 如果您需要不同的授權許可證，只要在註解中說明即可。

&nbsp;

```solidity
pragma solidity >=0.6.0 <0.8.0;
```

Solidity 語言仍在快速發展，新版本可能與舊程式碼不相容（[請參見此處](https://docs.soliditylang.org/en/v0.7.0/070-breaking-changes.html)）。 因此，最好不僅指定語言的最低版本，還要指定最高版本，也就是您用來測試程式碼的最新版本。

&nbsp;

```solidity
/**
 * @dev EIP 中定義的 ERC20 標準介面。
 */
```

註解中的 `@dev` 是 [NatSpec 格式](https://docs.soliditylang.org/en/develop/natspec-format.html) 的一部分，用於從原始碼產生文件。

&nbsp;

```solidity
interface IERC20 {
```

按照慣例，介面名稱以 `I` 開頭。

&nbsp;

```solidity
    /**
     * @dev 傳回現存的代幣數量。
     */
    function totalSupply() external view returns (uint256);
```

此函式為 `external`，表示[它只能從合約外部呼叫](https://docs.soliditylang.org/en/v0.7.0/cheatsheet.html#index-2)。
它會傳回合約中的代幣總供應量。 此值使用以太坊中最常見的類型傳回，即無正負號 256 位元（256 位元是 EVM 的原生字組大小）。 此函式也是 `view`，表示它不會改變狀態，因此可以在單一節點上執行，而不需由區塊鏈中的每個節點都執行它。 這類函式不會產生交易，也不會花費 [Gas](/developers/docs/gas/)。

**注意：** 理論上，合約創建者似乎可以透過傳回比實際價值還小的總供應量來作弊，讓每個代幣看起來比實際更有價值。 然而，這種恐懼忽略了區塊鏈的真正本質。 區塊鏈上發生的每件事都可以由每個節點驗證。 為了達成這點，每個合約的機器語言程式碼和儲存空間在每個節點上都是可用的。 雖然您不需要為您的合約發布 Solidity 程式碼，但除非您發布原始碼以及編譯時所用的 Solidity 版本，否則沒有人會認真看待您的合約，這樣才能將其與您提供的機器語言程式碼進行驗證比對。
例如，請參見[此合約](https://eth.blockscout.com/address/0xa530F85085C6FE2f866E7FdB716849714a89f4CD?tab=contract)。

&nbsp;

```solidity
    /**
     * @dev 傳回 `account` 擁有的代幣數量。
     */
    function balanceOf(address account) external view returns (uint256);
```

如同其名，`balanceOf` 傳回帳戶的餘額。 以太坊帳戶在 Solidity 中使用 `address` 類型來識別，該類型持有 160 位元。
它也是 `external` 和 `view`。

&nbsp;

```solidity
    /**
     * @dev 將 `amount` 數量的代幣從呼叫者的帳戶轉移到 `recipient`。
     *
     * 傳回一個布林值，表示操作是否成功。
     *
     * 發出一個 {Transfer} 事件。
     */
    function transfer(address recipient, uint256 amount) external returns (bool);
```

`transfer` 函式將代幣從呼叫者轉移到一個不同的地址。 這涉及到狀態的改變，所以它不是一個 `view`。
當使用者呼叫此函式時，會建立一筆交易並花費 Gas。 它也會發出一個 `Transfer` 事件，通知區塊鏈上的每個人該事件的發生。

此函式針對兩種不同類型的呼叫者，有兩種輸出類型：

- 從使用者介面直接呼叫函式的使用者。 通常使用者提交交易後，不會等待回應，因為回應可能需要不確定的時間。 使用者可以透過查看交易收據（由交易哈希識別）或尋找 `Transfer` 事件來了解發生了什麼事。
- 其他合約，將函式呼叫作為整體交易的一部分。 這些合約會立即得到結果，因為它們在同一個交易中執行，所以它們可以使用函式的傳回值。

其他改變合約狀態的函式也會產生相同類型的輸出。

&nbsp;

授權額度允許一個帳戶花費屬於不同所有者的代幣。
舉例來說，這對於作為賣方的合約很有用。 合約無法監控事件，所以如果買方直接將代幣轉移給賣方合約，該合約不會知道它已收到款項。 取而代之的是，買方授權賣方合約花費一定金額，然後由賣方轉移該金額。
這是透過賣方合約呼叫的一個函式來完成的，因此賣方合約可以知道它是否成功。

```solidity
    /**
     * @dev 傳回 `spender` 將被允許透過 {transferFrom} 代表 `owner` 花費的
     * 剩餘代幣數量。預設為零。
     *
     * 當 {approve} 或 {transferFrom} 被呼叫時，此值會改變。
     */
    function allowance(address owner, address spender) external view returns (uint256);
```

`allowance` 函式讓任何人都可以查詢一個地址 (`owner`) 允許另一個地址 (`spender`) 花費的授權額度。

&nbsp;

```solidity
    /**
     * @dev 將 `spender` 對呼叫者代幣的授權額度設為 `amount`。
     *
     * 傳回一個布林值，表示操作是否成功。
     *
     * 重要：請注意，使用此方法更改授權額度存在風險，
     * 有人可能會因不幸的交易排序而同時使用舊的和新的授權額度。一種可能的解決方案是
     * 先將花費者的授權額度降至 0，然後再設定所需的值，以減輕這種競爭
     * 條件：
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * 發出一個 {Approval} 事件。
     */
    function approve(address spender, uint256 amount) external returns (bool);
```

`approve` 函式會建立一個授權額度。 請務必閱讀有關它如何被濫用的訊息。 在以太坊中，您可以控制自己交易的順序，但無法控制其他人交易的執行順序，除非您在看到對方的交易發生後才提交自己的交易。

&nbsp;

```solidity
    /**
     * @dev 使用授權額度機制將 `amount` 的代幣從 `sender` 轉移到 `recipient`。
     * 然後，`amount` 會從呼叫者的授權額度中扣除。
     *
     * 傳回一個布林值，表示操作是否成功。
     *
     * 發出一個 {Transfer} 事件。
     */
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

最後，`transferFrom` 由花費者用來實際花費授權額度。

&nbsp;

```solidity

    /**
     * @dev 當 `value` 數量的代幣從一個帳戶 (`from`) 移動到
     * 另一個帳戶 (`to`) 時發出。
     *
     * 請注意 `value` 可能為零。
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev 當 `owner` 的 `spender` 的授權額度透過
     * 呼叫 {approve} 設定時發出。`value` 是新的授權額度。
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

當 ERC-20 合約的狀態改變時，這些事件會被發出。

## 實際的合約 {#the-actual-contract}

這是實作 ERC-20 標準的實際合約，[取自此處](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol)。
它並非設計來直接使用，但您可以[繼承](https://www.tutorialspoint.com/solidity/solidity_inheritance.htm)它來擴展成可用的東西。

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;
```

&nbsp;

### 匯入陳述式 {#import-statements}

除了上述的介面定義外，合約定義還匯入了另外兩個檔案：

```solidity

import "../../GSN/Context.sol";
import "./IERC20.sol";
import "../../math/SafeMath.sol";
```

- `GSN/Context.sol` 是使用 [OpenGSN](https://www.opengsn.org/) 所需的定義，這是一個允許沒有以太幣的使用者使用區塊鏈的系統。 請注意這是舊版本，如果您想與 OpenGSN 整合，[請使用此教學](https://docs.opengsn.org/javascript-client/tutorial.html)。
- [SafeMath 程式庫](https://ethereumdev.io/using-safe-math-library-to-prevent-from-overflows/)，它能防止 Solidity 版本 **<0.8.0** 的算術溢位/下溢。 在 Solidity ≥0.8.0 中，算術運算會在溢位/下溢時自動還原，使得 SafeMath 不再必要。 此合約使用 SafeMath 以便向後相容於舊的編譯器版本。

&nbsp;

此註解說明了合約的用途。

```solidity
/**
 * @dev {IERC20} 介面的實作。
 *
 * 此實作與代幣的創建方式無關。這意味著
 * 必須在衍生合約中使用 {_mint} 新增供應機制。
 * 若要使用通用機制，請參閱 {ERC20PresetMinterPauser}。
 *
 * 提示：詳細說明請參閱我們的指南
 * https://forum.zeppelin.solutions/t/how-to-implement-erc20-supply-mechanisms/226[如何
 * 實作供應機制]。
 *
 * 我們遵循了一般的 OpenZeppelin 指南：函式在失敗時會還原
 * 而非傳回 `false`。此行為是常規的
 * 且不與 ERC20 應用程式的預期衝突。
 *
 * 此外，在呼叫 {transferFrom} 時會發出 {Approval} 事件。
 * 這允許應用程式僅透過監聽所述事件來重構所有帳戶的授權額度。
 * EIP 的其他實作可能不會發出這些事件，
 * 因為規範並未要求。
 *
 * 最後，新增了非標準的 {decreaseAllowance} 和 {increaseAllowance}
 * 函式來緩解圍繞設定授權額度的眾所周知的問題。
 * 請參閱 {IERC20-approve}。
 */

```

### 合約定義 {#contract-definition}

```solidity
contract ERC20 is Context, IERC20 {
```

此行指定了繼承關係，在此例中是繼承自上方的 `IERC20` 和用於 OpenGSN 的 `Context`。

&nbsp;

```solidity

    using SafeMath for uint256;

```

此行將 `SafeMath` 程式庫附加到 `uint256` 類型上。 您可以在[此處](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol)找到此程式庫。

### 變數定義 {#variable-definitions}

這些定義指定了合約的狀態變數。 這些變數被宣告為 `private`，但這只意味著區塊鏈上的其他合約無法讀取它們。 _區塊鏈上沒有秘密_，每個節點上的軟體都擁有每個合約在每個區塊的狀態。 按照慣例，狀態變數的命名方式為 `_<something>`。

前兩個變數是[映射](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，這意味著它們的行為大致與[關聯陣列](https://wikipedia.org/wiki/Associative_array)相同，只是鍵是數值。 只有值與預設值（零）不同的條目才會被分配儲存空間。

```solidity
    mapping (address => uint256) private _balances;
```

第一個映射 `_balances` 是地址及其對應的此代幣餘額。 要存取餘額，請使用此語法：`_balances[<address>]`。

&nbsp;

```solidity
    mapping (address => mapping (address => uint256)) private _allowances;
```

這個變數 `_allowances` 儲存了先前解釋過的授權額度。 第一個索引是代幣的所有者，第二個是擁有授權額度的合約。 要存取地址 A 可以從地址 B 帳戶花費的金額，請使用 `_allowances[B][A]`。

&nbsp;

```solidity
    uint256 private _totalSupply;
```

如同其名，這個變數追蹤代幣的總供應量。

&nbsp;

```solidity
    string private _name;
    string private _symbol;
    uint8 private _decimals;
```

這三個變數是用來提高可讀性的。 前兩個不言自明，但 `_decimals` 則不是。

一方面，以太坊沒有浮點數或分數變數。 另一方面，人類喜歡能夠分割代幣。 人們選擇黃金作為貨幣的一個原因是，當有人想用牛換取等值的鴨子時，很難找零。

解決方法是追蹤整數，但計算的不是實際的代幣，而是一個幾乎沒有價值的分數代幣。 以以太幣為例，分數代幣稱為 wei，而 10^18 wei 等於一 ETH。 在撰寫本文時，10,000,000,000,000 wei 約等於一美分或歐分。

應用程式需要知道如何顯示代幣餘額。 如果一個使用者有 3,141,000,000,000,000,000 wei，那是 3.14 ETH 嗎？ 31.41 ETH？ 3,141 ETH？ 以以太幣為例，定義是 10^18 wei 等於一 ETH，但對於您的代幣，您可以選擇不同的值。 如果分割代幣沒有意義，您可以使用 `_decimals` 值為零。 如果您想使用與 ETH 相同的標準，請使用值 **18**。

### 建構函式 {#the-constructor}

```solidity
    /**
     * @dev 設定 {name} 和 {symbol} 的值，並將 {decimals} 初始化為
     * 預設值 18。
     *
     * 要為 {decimals} 選擇不同的值，請使用 {_setupDecimals}。
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

建構函式在合約首次建立時被呼叫。 按照慣例，函式參數的命名方式為 `<something>_`。

### 使用者介面函式 {#user-interface-functions}

```solidity
    /**
     * @dev 傳回代幣的名稱。
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev 傳回代幣的符號，通常是名稱的較短版本。
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev 傳回用於獲取其使用者表示的小數位數。
     * 例如，如果 `decimals` 等於 `2`，`505` 代幣的餘額應
     * 對使用者顯示為 `5,05` (`505 / 10 ** 2`)。
     *
     * 代幣通常選擇值 18，模仿以太幣和 wei 之間的關係。這是 {ERC20} 使用的值，
     * 除非呼叫 {_setupDecimals}。
     *
     * 注意：此資訊僅用於 _顯示_ 目的：它在
     * 任何方面都不會影響合約的任何算術，包括
     * {IERC20-balanceOf} 和 {IERC20-transfer}。
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }
```

這些函式 `name`、`symbol` 和 `decimals` 幫助使用者介面了解您的合約，以便它們能夠正確顯示。

傳回類型是 `string memory`，意思是傳回一個儲存在記憶體中的字串。 變數，例如字串，可以儲存在三個位置：

|          | 生命週期 | 合約存取 | Gas 成本              |
| -------- | ---- | ---- | ------------------- |
| 記憶體      | 函式呼叫 | 讀/寫  | 數十或數百（位置越高，成本越高）    |
| Calldata | 函式呼叫 | 唯讀   | 不能作為傳回類型，只能作為函式參數類型 |
| 儲存       | 直到改變 | 讀/寫  | 高（讀取為 800，寫入為 2 萬）  |

在這種情況下，`memory` 是最佳選擇。

### 讀取代幣資訊 {#read-token-information}

這些是提供代幣資訊的函式，可以是總供應量或帳戶餘額。

```solidity
    /**
     * @dev 請參閱 {IERC20-totalSupply}。
     */
    function totalSupply() public view override returns (uint256) {
        return _totalSupply;
    }
```

`totalSupply` 函式傳回代幣的總供應量。

&nbsp;

```solidity
    /**
     * @dev 請參閱 {IERC20-balanceOf}。
     */
    function balanceOf(address account) public view override returns (uint256) {
        return _balances[account];
    }
```

讀取帳戶的餘額。 請注意，任何人都可以獲取任何其他人的帳戶餘額。 試圖隱藏這些資訊是沒有意義的，因為它在每個節點上都是可用的。 _區塊鏈上沒有秘密。_

### 轉移代幣 {#transfer-tokens}

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

`transfer` 函式被呼叫來將代幣從發送者的帳戶轉移到另一個帳戶。 請注意，即使它傳回一個布林值，該值也始終為 **true**。 如果轉帳失敗，合約會還原該呼叫。

&nbsp;

```solidity
        _transfer(_msgSender(), recipient, amount);
        return true;
    }
```

`_transfer` 函式執行實際的工作。 它是一個私有函式，只能由其他合約函式呼叫。 按照慣例，私有函式的命名方式與狀態變數相同，都是 `_<something>`。

通常在 Solidity 中，我們使用 `msg.sender` 來表示訊息發送者。 然而，這會破壞 [OpenGSN](http://opengsn.org/)。 如果我們想讓我們的代幣允許無以太幣的交易，我們需要使用 `_msgSender()`。 對於正常交易，它傳回 `msg.sender`，但對於無以太幣的交易，它傳回原始簽署者，而不是轉發訊息的合約。

### 授權額度函式 {#allowance-functions}

這些是實作授權額度功能的函式：`allowance`、`approve`、`transferFrom` 和 `_approve`。 此外，OpenZeppelin 的實作超越了基本標準，包含了一些提高安全性的功能：`increaseAllowance` 和 `decreaseAllowance`。

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

此函式被呼叫來建立一個授權額度。 它與上面的 `transfer` 函式相似：

- 此函式僅呼叫一個執行實際工作的內部函式（在本例中為 `_approve`）。
- 此函式要麼傳回 `true`（如果成功），要麼還原（如果不成功）。

&nbsp;

```solidity
        _approve(_msgSender(), spender, amount);
        return true;
    }
```

我們使用內部函式來最小化狀態變更發生的位置數量。 _任何_ 改變狀態的函式都是一個潛在的安全風險，需要進行安全審計。 這樣我們出錯的機會就更少了。

#### transferFrom 函式 {#transferFrom}

這是花費者呼叫來花費授權額度的函式。 這需要兩個操作：轉移花費的金額，並將授權額度減少該金額。

```solidity
    /**
     * @dev 請參閱 {IERC20-transferFrom}。
     *
     * 發出一個 {Approval} 事件，表示已更新的授權額度。這不是 EIP 所要求的。
     * 請參閱 {ERC20} 開頭的說明。
     *
     * 要求：
     *
     * - `sender` 和 `recipient` 不能是零地址。
     * - `sender` 必須擁有至少 `amount` 的餘額。
     * - 呼叫者對 ``sender`` 的代幣的授權額度必須至少為
     * `amount`。
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual
                                                override returns (bool) {
        _transfer(sender, recipient, amount);
```

&nbsp;

`a.sub(b, "message")` 函式呼叫做兩件事。 首先，它計算 `a-b`，即新的授權額度。
其次，它檢查此結果是否為負。 如果為負，則呼叫會以提供的訊息還原。 請註意，撤銷調用後，之前在調用中完成的任何處理都會被忽略，所以我們不需要撤消 _transfer。

```solidity
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount,
             "ERC20: transfer amount exceeds allowance"));
        return true;
    }
```

#### OpenZeppelin 安全性附加功能 {#openzeppelin-safety-additions}

將一個非零授權額度設定為另一個非零值是危險的，因為您只能控制自己交易的順序，而不能控制任何其他人的交易。 想像一下，您有兩個使用者，天真的 Alice 和不誠實的 Bill。 Alice 想要 Bill 的一些服務，她認為這需要五個代幣 - 所以她給了 Bill 五個代幣的授權額度。

然後情況有變，Bill 的價格漲到了十個代幣。 仍然想要服務的 Alice 發送了一筆交易，將 Bill 的授權額度設定為十。 Bill 一在交易池中看到這筆新交易，就立即發送一筆交易，花掉 Alice 的五個代幣，並設定更高的 Gas 價格，以便更快地被挖出。 這樣，Bill 可以先花掉五個代幣，然後，一旦 Alice 的新授權額度被挖出，再花掉十個，總共十五個代幣，超過了 Alice 想要授權的數量。 這種技術被稱為[預先交易](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/#front-running)

| Alice 的交易                            | Alice 的 Nonce | Bill 的交易                                         | Bill 的 Nonce | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| ------------------------------------ | ------------- | ------------------------------------------------ | ------------ | ---------- | ------------------- |
| approve(Bill, 5)  | 10            |                                                  |              | 5          | 0                   |
|                                      |               | transferFrom(Alice, Bill, 5)  | 10,123       | 0          | 5                   |
| approve(Bill, 10) | 11            |                                                  |              | 10         | 5                   |
|                                      |               | transferFrom(Alice, Bill, 10) | 10,124       | 0          | 15                  |

為避免此問題，這兩個函式（`increaseAllowance` 和 `decreaseAllowance`）允許您以特定數量修改授權額度。 因此，如果 Bill 已經花費了五個代幣，他將只能再花費五個。 根據時間點的不同，這有兩種可能的方式，但最終 Bill 都只會得到十個代幣：

A：

| Alice 的交易                                     | Alice 的 Nonce | Bill 的交易                                        | Bill 的 Nonce | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| --------------------------------------------- | ------------: | ----------------------------------------------- | -----------: | ---------: | ------------------- |
| approve(Bill, 5)           |            10 |                                                 |              |          5 | 0                   |
|                                               |               | transferFrom(Alice, Bill, 5) |       10,123 |          0 | 5                   |
| increaseAllowance(Bill, 5) |            11 |                                                 |              |    0+5 = 5 | 5                   |
|                                               |               | transferFrom(Alice, Bill, 5) |       10,124 |          0 | 10                  |

B：

| Alice 的交易                                     | Alice 的 Nonce | Bill 的交易                                         | Bill 的 Nonce | Bill 的授權額度 | Bill 從 Alice 獲得的總收入 |
| --------------------------------------------- | ------------: | ------------------------------------------------ | -----------: | ---------: | ------------------: |
| approve(Bill, 5)           |            10 |                                                  |              |          5 |                   0 |
| increaseAllowance(Bill, 5) |            11 |                                                  |              |   5+5 = 10 |                   0 |
|                                               |               | transferFrom(Alice, Bill, 10) |       10,124 |          0 |                  10 |

```solidity
    /**
     * @dev 以原子方式增加呼叫者授予 `spender` 的授權額度。
     *
     * 這是 {approve} 的替代方案，可用於緩解 {IERC20-approve} 中描述的問題。
     *
     * 發出一個 {Approval} 事件，表示已更新的授權額度。
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

`a.add(b)` 函式是安全的加法。 在 `a`+`b`>=`2^256` 的罕見情況下，它不會像正常加法那樣循環。

```solidity

    /**
     * @dev 以原子方式減少呼叫者授予 `spender` 的授權額度。
     *
     * 這是 {approve} 的替代方案，可用於緩解 {IERC20-approve} 中描述的問題。
     *
     * 發出一個 {Approval} 事件，表示已更新的授權額度。
     *
     * 要求：
     *
     * - `spender` 不能是零地址。
     * - `spender` 對呼叫者的授權額度必須至少為
     * `subtractedValue`。
     */
    function decreaseAllowance(address spender, uint256 subtractedValue) public virtual returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue,
                "ERC20: decreased allowance below zero"));
        return true;
    }
```

### 修改代幣資訊的函式 {#functions-that-modify-token-information}

這四個函式執行實際的工作：`_transfer`、`_mint`、`_burn` 和 `_approve`。

#### `_transfer` 函式 {#_transfer}

```solidity
    /**
     * @dev 將 `amount` 的代幣從 `sender` 轉移到 `recipient`。
     *
     * 這個內部函式相當於 {transfer}，可以用於
     * 例如，實作自動代幣費用、削減機制等。
     *
     * 發出一個 {Transfer} 事件。
     *
     * 要求：
     *
     * - `sender` 不能是零地址。
     * - `recipient` 不能是零地址。
     * - `sender` 必須擁有至少 `amount` 的餘額。
     */
    function _transfer(address sender, address recipient, uint256 amount) internal virtual {
```

這個函式 `_transfer` 將代幣從一個帳戶轉移到另一個帳戶。 它同時被 `transfer`（用於從發送者自己的帳戶轉帳）和 `transferFrom`（用於使用授權額度從別人的帳戶轉帳）呼叫。

&nbsp;

```solidity
        require(sender != address(0), "ERC20: transfer from the zero address");
        require(recipient != address(0), "ERC20: transfer to the zero address");
```

在以太坊中，沒有人實際擁有零地址（也就是說，沒有人知道其對應的公鑰轉換為零地址的私鑰）。 當人們使用該地址時，通常是軟體錯誤 - 所以如果零地址被用作發送者或接收者，我們會失敗。

&nbsp;

```solidity
        _beforeTokenTransfer(sender, recipient, amount);

```

有兩種方式可以使用此合約：

1. 將其作為您自己程式碼的範本
2. [繼承它](https://www.bitdegree.org/learn/solidity-inheritance)，並只覆寫您需要修改的函式

第二種方法要好得多，因為 OpenZeppelin ERC-20 程式碼已經過審計並被證明是安全的。 當您使用繼承時，您修改的函式會很清楚，要信任您的合約，人們只需要審計那些特定的函式。

每次代幣易手時執行一個函式通常很有用。 然而，`_transfer` 是一個非常重要的函式，而且有可能寫得不安全（見下文），所以最好不要覆寫它。 解決方案是 `_beforeTokenTransfer`，一個[鉤子函式](https://wikipedia.org/wiki/Hooking)。 您可以覆寫此函式，它將在每次轉帳時被呼叫。

&nbsp;

```solidity
        _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
```

這些是實際執行轉帳的程式碼行。 請注意，它們之間**沒有任何東西**，而且我們在將轉帳金額加到接收者之前，先從發送者那裡減去它。 這很重要，因為如果中間有呼叫到不同的合約，它可能會被用來欺騙此合約。 這樣，轉帳就是原子性的，中間不會發生任何事情。

&nbsp;

```solidity
        emit Transfer(sender, recipient, amount);
    }
```

最後，發出一個 `Transfer` 事件。 事件無法被智慧型合約存取，但在區塊鏈外執行的程式碼可以監聽事件並對其做出反應。 例如，錢包可以追蹤所有者何時獲得更多代幣。

#### `_mint` 和 `_burn` 函式 {#_mint-and-_burn}

這兩個函式（`_mint` 和 `_burn`）會修改代幣的總供應量。
它們是內部函式，且此合約中沒有函式會呼叫它們，所以只有在您繼承此合約並加入自己的邏輯，以決定在何種情況下鑄造新代幣或銷毀現有代幣時，它們才有用。

**注意：** 每個 ERC-20 代幣都有自己的商業邏輯來決定代幣管理。
例如，一個固定供應量的合約可能只在建構函式中呼叫 `_mint`，而永不呼叫 `_burn`。 一個銷售代幣的合約在收到付款時會呼叫 `_mint`，並可能在某個時間點呼叫 `_burn` 以避免失控的通貨膨脹。

```solidity
    /** @dev 建立 `amount` 數量的代幣並將其分配給 `account`，增加
     * 總供應量。
     *
     * 發出一個 `from` 設為零地址的 {Transfer} 事件。
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

當代幣總數變更時，請務必更新 `_totalSupply`。

&nbsp;

```solidity
    /**
     * @dev 從 `account` 銷毀 `amount` 數量的代幣，減少
     * 總供應量。
     *
     * 發出一個 `to` 設為零地址的 {Transfer} 事件。
     *
     * 要求：
     *
     * - `account` 不能是零地址。
     * - `account` 必須至少擁有 `amount` 數量的代幣。
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

#### `_approve` 函式 {#_approve}

這個函式實際上指定了授權額度。 注意，它允許所有者指定一個高於其目前餘額的授權額度。 這是可以的，因為餘額是在轉帳時檢查的，那時的餘額可能與建立授權額度時的餘額不同。

```solidity
    /**
     * @dev 將 `spender` 對 `owner` 代幣的授權額度設為 `amount`。
     *
     * 這個內部函式等同於 `approve`，可以用於例如
     * 為某些子系統設定自動授權額度等。
     *
     * 發出一個 {Approval} 事件。
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

發出一個 `Approval` 事件。 根據應用程式的寫法，花費者合約可以由所有者或監聽這些事件的伺服器來告知核准。

```solidity
        emit Approval(owner, spender, amount);
    }

```

### 修改小數位數變數 {#modify-the-decimals-variable}

```solidity


    /**
     * @dev 將 {decimals} 設為非預設值 18 的值。
     *
     * 警告：此函式只應在建構函式中呼叫。大多數
     * 與代幣合約互動的應用程式不會預期
     * {decimals} 會改變，如果改變了可能會運作不正確。
     */
    function _setupDecimals(uint8 decimals_) internal {
        _decimals = decimals_;
    }
```

此函式修改 `_decimals` 變數，該變數用於告知使用者介面如何解讀金額。
您應該從建構函式中呼叫它。 在之後的任何時間點呼叫它都是不誠實的，且應用程式並非設計來處理這種情況。

### 挂鈎 {#hooks}

```solidity

    /**
     * @dev 在任何代幣轉移之前呼叫的鉤子。這包括
     * 鑄造和銷毀。
     *
     * 呼叫條件：
     *
     * - 當 `from` 和 `to` 都非零時，`amount` 數量的 ``from`` 的代幣
     * 將被轉移到 `to`。
     * - 當 `from` 為零時，將為 `to` 鑄造 `amount` 數量的代幣。
     * - 當 `to` 為零時，`amount` 數量的 ``from`` 的代幣將被銷毀。
     * - `from` 和 `to` 永遠不會同時為零。
     *
     * 要了解更多關於鉤子的資訊，請前往 xref:ROOT:extending-contracts.adoc#using-hooks[使用鉤子]。
     */
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual { }
}
```

這是在轉帳期間被呼叫的鉤子函式。 這裡它是空的，但如果您需要它做些什麼，您只需要覆寫它即可。

## 結論 {#conclusion}

總結一下，以下是此合約中一些最重要的概念（在我看來，您的看法可能會有所不同）：

- _在區塊鏈上沒有秘密_。 智慧型合約可以存取的任何資訊對全世界都是可用的。
- 您可以控制自己交易的順序，但無法控制其他人交易的發生時間。 這就是為什麼更改授權額度可能很危險，因為它讓花費者可以花費兩個授權額度的總和。
- `uint256` 類型的值會循環。 換句話說，_0-1=2^256-1_。 如果這不是期望的行為，您必須對其進行檢查（或使用 SafeMath 程式庫為您代勞）。 請注意，這在 [Solidity 0.8.0](https://docs.soliditylang.org/en/breaking/080-breaking-changes.html) 中已有所改變。
- 將所有特定類型的狀態變更集中在一個特定地方處理，因為這樣更容易審計。
  這就是為什麼我們有 `_approve`，它被 `approve`、`transferFrom`、`increaseAllowance` 和 `decreaseAllowance` 呼叫。
- 狀態變更應該是原子性的，中間不應有任何其他操作（如您在 `_transfer` 中所見）。 這是因為在狀態變更期間，您會處於一個不一致的狀態。 例如，在您從發送者餘額中扣除和添加到接收者餘額之間的時間裡，存在的代幣數量少於應有的數量。 如果它們之間有操作，這點可能被濫用，特別是呼叫到一個不同的合約。

既然您已經了解 OpenZeppelin ERC-20 合約是如何編寫的，特別是它是如何變得更安全的，現在就去編寫您自己的安全合約和應用程式吧。

[在此查看我的更多作品](https://cryptodocguy.pro/)。
