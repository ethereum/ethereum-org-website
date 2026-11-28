---
title: "具備安全防護機制的 ERC-20"
description: "如何幫助人們避免犯下愚蠢的錯誤"
author: "歐里·波梅蘭茨"
lang: zh-tw
tags: ["erc-20"]
skill: beginner
breadcrumb: "ERC-20 安全性"
published: 2022-08-15
---

## 簡介 {#introduction}

以太坊的一大優點是沒有中央機構可以修改或撤銷你的交易。但以太坊的一大問題也是沒有中央機構有權撤銷使用者的錯誤或非法交易。在本文中，你將了解使用者在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣時常犯的一些錯誤，以及如何建立 ERC-20 合約來幫助使用者避免這些錯誤，或者賦予中央機構一些權力（例如凍結帳戶）。

請注意，雖然我們將使用 [OpenZeppelin ERC-20 代幣合約](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不會詳細解釋它。你可以在[這裡](/developers/tutorials/erc20-annotated-code)找到相關資訊。

如果你想查看完整的原始碼：

1. 開啟 [Remix IDE](https://remix.ethereum.org/)。
2. 點擊複製 GitHub 圖示 (![clone github icon](icon-clone.png))。
3. 複製 GitHub 儲存庫 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 開啟 **contracts > erc20-safety-rails.sol**。

請注意，該儲存庫是為 OpenZeppelin Contracts 4.7.2 編寫的，其中本文覆寫的函式稱為 `_beforeTokenTransfer`。本文使用目前的 OpenZeppelin Contracts 5.x，你改為覆寫 `_update`，因此本文中的程式碼與儲存庫中的程式碼略有不同。

## 建立 ERC-20 合約 {#creating-an-erc-20-contract}

在我們加入安全防護功能之前，我們需要一個 ERC-20 合約。在本文中，我們將使用 [OpenZeppelin Contracts Wizard](https://docs.openzeppelin.com/contracts/5.x/wizard)。在另一個瀏覽器中開啟它並按照以下指示操作：

1. 選擇 **ERC20**。
2. 輸入這些設定：

   | 參數 | 值 |
   | -------------- | ------------------------- |
   | Name | SafetyRailsToken |
   | Symbol | SAFE |
   | Premint | 1000 |
   | Features | None（取消勾選 **Permit**） |
   | Access Control | Ownable |
   | Upgradability | None |

3. 向上捲動並點擊 **Open in Remix**（適用於 Remix）或 **Download** 以使用不同的環境。我將假設你使用的是 Remix，如果你使用其他環境，只需進行相應的更改即可。
4. 我們現在有了一個功能齊全的 ERC-20 合約。你可以展開 `.deps` > `npm` 來查看匯入的程式碼。
5. 編譯、部署並試用該合約，以確認它作為 ERC-20 合約的功能。如果你需要學習如何使用 Remix，請[使用本教學](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常見錯誤 {#common-mistakes}

### 錯誤類型 {#the-mistakes}

使用者有時會將代幣發送到錯誤的地址。雖然我們無法讀心來知道他們原本想做什麼，但有兩種經常發生且容易偵測的錯誤類型：

1. 將代幣發送到合約本身的地址。例如，[Optimism 的 OP 代幣](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到兩個月的時間內累積了[超過 120,000](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) 個 OP 代幣。這代表了一筆可觀的財富，大概就這樣被人們遺失了。

2. 將代幣發送到空地址，即不對應於[外部擁有帳戶 (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) 或[智能合約](/developers/docs/smart-contracts)的地址。雖然我沒有關於這種情況發生頻率的統計數據，但[一次事件就可能損失 20,000,000 個代幣](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 防止轉帳 {#preventing-transfers}

在 OpenZeppelin ERC-20 合約中，餘額的每一次變更，無論是轉帳、鑄造還是銷毀，都會經過[一個內部函式 `_update`](https://docs.openzeppelin.com/contracts/5.x/api/token/erc20#ERC20-_update-address-address-uint256-)。我們可以覆寫它以掛載我們自己的功能，例如在出現問題時回滾的檢查。

為此，請在建構函式之後加入此函式：

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        super._update(from, to, value);
    }
```

如果你對 Solidity 不是很熟悉，這個函式的某些部分可能是新的：

```solidity
        internal virtual
```

`virtual` 關鍵字表示，就像我們從 `ERC20` 繼承功能並覆寫此函式一樣，其他合約也可以繼承我們並覆寫此函式。

```solidity
        override(ERC20)
```

我們必須明確指定我們正在[覆寫](https://docs.soliditylang.org/en/latest/contracts.html#function-overriding) `_update` 的 ERC20 代幣定義。一般來說，從安全角度來看，明確的定義比隱含的定義好得多——如果它就在你面前，你就不會忘記你做過什麼。這也是我們需要指定我們正在覆寫哪個超類別的 `_update` 的原因。

```solidity
        super._update(from, to, value);
```

此行呼叫我們繼承的合約（或多個合約）中具有 `_update` 函式的合約。在這種情況下，只有 `ERC20`，`Ownable` 沒有此函式。與空掛鉤不同，`ERC20._update` 是實際移動代幣的函式，因此呼叫它是必不可少的。我們的檢查在此呼叫之前進行，因此它們可以在任何餘額變更之前回滾。

### 編寫需求程式碼 {#coding-the-requirements}

我們希望將這些要求加入到函式中。因為當代幣被銷毀時也會呼叫 `_update`，此時 `to` 設為 `address(0)`，所以我們只在 `to` 不是 `address(0)` 時才檢查它：

- `to` 地址不能等於 `address(this)`，即 ERC-20 合約本身的地址。
- `to` 地址不能為空，它必須是以下之一：
  - 外部擁有的帳戶 (EOA)。我們無法直接檢查地址是否為外部擁有的帳戶 (EOA)，但我們可以檢查地址的 ETH 餘額。外部擁有的帳戶 (EOA) 幾乎總是有餘額，即使它們不再被使用——很難將它們清空到最後一個 Wei。
  - 智能合約。測試地址是否為智能合約有點困難。有一個檢查外部程式碼長度的操作碼，稱為 [`EXTCODESIZE`](https://www.evm.codes/#3b)。在 Solidity 中，你可以使用 [`<address>.code.length`](https://docs.soliditylang.org/en/latest/units-and-global-variables.html#members-of-address-types) 取得它，編譯器會將其轉換為 `EXTCODESIZE`。在這裡，我們使用 [Yul](https://docs.soliditylang.org/en/latest/yul.html)（即 EVM 組合語言）來展示如何直接呼叫操作碼。請注意，自從 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 以來，外部擁有的帳戶 (EOA) 也可以有程式碼（對合約的委託），因此此檢查識別的是具有程式碼的帳戶，而不嚴格是合約。對於我們拒絕空地址的目的來說，這沒問題。

這是完整的函式：

```solidity
    function _update(address from, address to, uint256 value)
        internal virtual
        override(ERC20)
    {
        // 銷毀會將代幣發送至地址(0)，請勿區塊它
        if (to != address(0)) {
            require(to != address(this), "Can't send tokens to the contract address");

            bool isToContract;
            assembly {
               isToContract := gt(extcodesize(to), 0)
            }

            require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
        }

        super._update(from, to, value);
    }
```

讓我們逐行查看新程式碼：

```solidity
        require(to != address(this), "Can't send tokens to the contract address");
```

這是第一個要求，檢查 `to` 和 `this(address)` 是否不相同。

```solidity
        bool isToContract;
        assembly {
           isToContract := gt(extcodesize(to), 0)
        }
```

這就是我們檢查地址是否為合約的方法。我們無法直接從 Yul 接收輸出，因此我們定義一個變數來保存結果（在本例中為 `isToContract`）。Yul 的運作方式是將每個操作碼視為一個函式。因此，我們首先呼叫 [`EXTCODESIZE`](https://www.evm.codes/#3b) 來取得合約大小，然後使用 [`GT`](https://www.evm.codes/#11) 來檢查它是否不為零（我們處理的是無號整數，所以它當然不能是負數）。然後我們將結果寫入 `isToContract`。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

最後，我們對空地址進行實際檢查。

## 管理員存取權限 {#admin-access}

有時，擁有一個可以撤銷錯誤的管理員是很有用的。為了減少濫用的可能性，此管理員可以是一個[多方簽名](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，因此需要多人同意才能執行操作。在本文中，我們將擁有兩個管理功能：

1. 凍結和解凍帳戶。例如，當帳戶可能遭到入侵時，這會很有用。
2. 資產清理。

   有時詐騙者會將詐騙代幣發送到真實代幣的合約以獲得合法性。例如，[請看這裡](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。合法的 ERC-20 合約是 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)。假冒它的詐騙合約是 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)。

   人們也有可能錯誤地將合法的 ERC-20 代幣發送到我們的合約中，這也是我們希望有辦法將它們取出的另一個原因。

歐本齊柏林提供了兩種機制來啟用管理員存取權限：

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合約擁有單一擁有者。帶有 `onlyOwner` [修飾符 (modifier)](https://docs.soliditylang.org/en/latest/contracts.html#function-modifiers) 的函式只能由該擁有者呼叫。擁有者可以將所有權轉移給其他人或完全放棄。所有其他帳戶的權利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合約具有[基於角色的存取控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

為了簡單起見，在本文中我們使用 `Ownable`。

### 凍結和解凍合約 {#freezing-and-thawing-contracts}

凍結和解凍合約需要進行幾項變更：

- 從地址到[布林值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射 (mapping)](https://docs.soliditylang.org/en/latest/types.html#mapping-types)，以追蹤哪些地址被凍結。所有值最初都為零，對於布林值來說，這被解釋為 false。這正是我們想要的，因為預設情況下帳戶不會被凍結。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [事件](https://docs.soliditylang.org/en/latest/contracts.html#events)，用於在帳戶被凍結或解凍時通知任何感興趣的人。從技術上講，這些操作不需要事件，但它有助於鏈下程式碼能夠監聽這些事件並了解正在發生的事情。當發生可能與其他人相關的事情時，智能合約發出事件被認為是一種良好的禮貌。

  事件被索引，因此可以搜尋帳戶被凍結或解凍的所有時間。

  ```solidity
    // 當帳戶被凍結或解凍時
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用於凍結和解凍帳戶的函式。這兩個函式幾乎相同，因此我們只討論凍結函式。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  標記為 [`public`](https://docs.soliditylang.org/en/latest/contracts.html#function-visibility) 的函式可以從其他智能合約呼叫，或直接由交易呼叫。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // 凍結帳戶
  ```

  如果帳戶已被凍結，則回滾。否則，凍結它並 `emit` 一個事件。

- 變更 `_update` 以防止資金從被凍結的帳戶中移出。請注意，資金仍然可以轉帳到被凍結的帳戶中。將此行放在函式的開頭，在 `if` 區塊之外，這樣它也可以防止從被凍結的帳戶中銷毀代幣。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 資產清理 {#asset-cleanup}

要釋放此合約持有的 ERC-20 代幣，我們需要呼叫它們所屬的代幣合約上的一個函式，即 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。在這種情況下，將燃料浪費在配額 (allowances) 上是沒有意義的，我們不如直接轉帳。

```solidity
    function cleanupERC20(
        address erc20,
        address dest
    )
        public
        onlyOwner
    {
        IERC20 token = IERC20(erc20);
```

這是當我們收到地址時為合約建立物件的語法。要使用它，我們需要 [IERC20 的定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，這是 OpenZeppelin ERC-20 合約的介面。Wizard 的 `import {ERC20} from ...` 行只引入了 `ERC20`，因此請將此行加入到檔案頂部的其他匯入旁邊：

```solidity
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
```

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

這是一個清理函式，因此我們大概不想留下任何代幣。與其手動從使用者那裡取得餘額，我們不如將該過程自動化。

## 結論 {#conclusion}

這不是一個完美的解決方案——對於「使用者犯錯」的問題，沒有完美的解決方案。然而，使用這類檢查至少可以防止一些錯誤。凍結帳戶的能力雖然危險，但可用於拒絕駭客存取被盜資金，從而限制某些駭客攻擊的損害。

[請點擊這裡查看我的更多作品](https://cryptodocguy.pro/)。
