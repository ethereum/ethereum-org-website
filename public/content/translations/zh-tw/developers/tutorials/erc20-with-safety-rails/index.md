---
title: 具備安全防護機制的 ERC-20
description: 如何幫助人們避免犯下愚蠢的錯誤
author: 奧里·波梅蘭茨
lang: zh-tw
tags: ["erc-20"]
skill: beginner
breadcrumb: ERC-20 安全性
published: 2022-08-15
---

## 簡介 {#introduction}

以太坊的一大優點是，沒有任何中央機構可以修改或撤銷你的交易。但以太坊的一大問題也是，沒有任何中央機構有權撤銷使用者的錯誤或非法交易。在本文中，你將了解使用者在使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代幣時常犯的一些錯誤，以及如何建立 ERC-20 合約來幫助使用者避免這些錯誤，或者賦予中央機構一些權力（例如凍結帳戶）。

請注意，雖然我們將使用 [歐本齊柏林 ERC-20 代幣合約](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)，但本文不會詳細解釋它。你可以在[這裡](/developers/tutorials/erc20-annotated-code)找到相關資訊。

如果你想查看完整的原始碼：

1. 開啟 [Remix IDE](https://remix.ethereum.org/)。
2. 點擊複製 GitHub 圖示 (![clone github icon](icon-clone.png))。
3. 複製 GitHub 儲存庫 `https://github.com/qbzzt/20220815-erc20-safety-rails`。
4. 開啟 **contracts > erc20-safety-rails.sol**。

## 建立 ERC-20 合約 {#creating-an-erc-20-contract}

在我們加入安全防護功能之前，我們需要一個 ERC-20 合約。在本文中，我們將使用 [歐本齊柏林合約精靈 (OpenZeppelin Contracts Wizard)](https://docs.openzeppelin.com/contracts/5.x/wizard)。在另一個瀏覽器中開啟它並按照以下指示操作：

1. 選擇 **ERC20**。
2. 輸入以下設定：

   | 參數 | 值 |
   | -------------- | ---------------- |
   | 名稱 | SafetyRailsToken |
   | 代號 | SAFE |
   | 預先鑄造 | 1000 |
   | 功能 | 無 |
   | 存取控制 | Ownable |
   | 可升級性 | 無 |

3. 向上捲動並點擊 **Open in Remix**（適用於 Remix）或 **Download** 以使用不同的環境。我將假設你使用的是 Remix，如果你使用其他環境，請進行相應的更改。
4. 我們現在有了一個功能齊全的 ERC-20 合約。你可以展開 `.deps` > `npm` 來查看匯入的程式碼。
5. 編譯、部署並試用該合約，以確認它作為 ERC-20 合約的功能正常。如果你需要學習如何使用 Remix，請[參考本教學](https://remix.ethereum.org/?#activate=udapp,solidity,LearnEth)。

## 常見錯誤 {#common-mistakes}

### 常見錯誤 {#the-mistakes}

使用者有時會將代幣發送到錯誤的地址。雖然我們無法讀心來知道他們原本想做什麼，但有兩種經常發生且容易偵測的錯誤類型：

1. 將代幣發送到合約本身的地址。例如，[Optimism 的 OP 代幣](https://optimism.mirror.xyz/qvd0WfuLKnePm1Gxb9dpGchPf5uDz5NSMEFdgirDS4c)在不到兩個月的時間內累積了[超過 120,000 顆](https://optimism.blockscout.com/address/0x4200000000000000000000000000000000000042) OP 代幣。這代表了一筆可觀的財富，大概就這樣被人們弄丟了。

2. 將代幣發送到一個空地址，也就是不屬於[外部擁有帳戶 (EOA)](/developers/docs/accounts/#externally-owned-accounts-and-key-pairs) 或[智能合約](/developers/docs/smart-contracts)的地址。雖然我沒有關於這種情況發生頻率的統計數據，但[曾有一次事件可能損失了 20,000,000 顆代幣](https://gov.optimism.io/t/message-to-optimism-community-from-wintermute/2595)。

### 防止轉帳 {#preventing-transfers}

歐本齊柏林 ERC-20 合約包含[一個掛鉤 (hook) `_beforeTokenTransfer`](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol#L364-L368)，它會在代幣轉帳之前被呼叫。預設情況下，這個掛鉤不會執行任何操作，但我們可以將自己的功能掛載在上面，例如在出現問題時進行回滾的檢查。

要使用這個掛鉤，請在建構函式之後加入此函式：

```solidity
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal virtual
        override(ERC20)
    {
        super._beforeTokenTransfer(from, to, amount);
    }
```

如果你對 Solidity 不是很熟悉，這個函式的某些部分對你來說可能是新的：

```solidity
        internal virtual
```

`virtual` 關鍵字表示，就像我們從 `ERC20` 繼承功能並覆寫了這個函式一樣，其他合約也可以繼承我們的合約並覆寫這個函式。

```solidity
        override(ERC20)
```

我們必須明確指定我們正在[覆寫](https://docs.soliditylang.org/en/v0.8.15/contracts.html#function-overriding) ERC20 代幣定義的 `_beforeTokenTransfer`。一般來說，從安全性的角度來看，明確的定義比隱含的定義要好得多——如果它就在你面前，你就不會忘記你做過什麼。這也是我們需要指定我們正在覆寫哪個父類別的 `_beforeTokenTransfer` 的原因。

```solidity
        super._beforeTokenTransfer(from, to, amount);
```

這一行呼叫了我們所繼承且具有該函式的合約的 `_beforeTokenTransfer` 函式。在這種情況下，只有 `ERC20` 有，`Ownable` 沒有這個掛鉤。即使目前 `ERC20._beforeTokenTransfer` 沒有執行任何操作，我們還是會呼叫它，以防未來加入新功能（然後我們決定重新部署合約，因為合約在部署後是不會改變的）。

### 編寫需求程式碼 {#coding-the-requirements}

我們希望在函式中加入以下要求：

- `to` 地址不能等於 `address(this)`，也就是 ERC-20 合約本身的地址。
- `to` 地址不能為空，它必須是以下兩者之一：
  - 外部擁有帳戶 (EOA)。我們無法直接檢查一個地址是否為 EOA，但我們可以檢查該地址的 ETH 餘額。EOA 幾乎總是有餘額，即使它們不再被使用——要將它們清空到最後一個 Wei 是很困難的。
  - 智能合約。測試一個地址是否為智能合約稍微困難一些。有一個檢查外部程式碼長度的操作碼，稱為 [`EXTCODESIZE`](https://www.evm.codes/#3b)，但它無法直接在 Solidity 中使用。我們必須為此使用 [Yul](https://docs.soliditylang.org/en/v0.8.15/yul.html)，也就是 EVM 組合語言。我們也可以使用 Solidity 中的其他值（[`<address>.code` 和 `<address>.codehash`](https://docs.soliditylang.org/en/v0.8.15/units-and-global-variables.html#members-of-address-types)），但它們會消耗更多燃料。

讓我們逐行檢視新的程式碼：

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

這就是我們檢查地址是否為合約的方法。我們無法直接從 Yul 接收輸出，因此我們定義了一個變數來保存結果（在此例中為 `isToContract`）。Yul 的運作方式是將每個操作碼視為一個函式。因此，我們首先呼叫 [`EXTCODESIZE`](https://www.evm.codes/#3b) 來取得合約大小，然後使用 [`GT`](https://www.evm.codes/#11) 來檢查它是否不為零（我們處理的是無號整數，所以它當然不能是負數）。然後我們將結果寫入 `isToContract`。

```solidity
        require(to.balance != 0 || isToContract, "Can't send tokens to an empty address");
```

最後，我們進行空地址的實際檢查。

## 管理存取權限 {#admin-access}

有時候，擁有一個可以撤銷錯誤的管理員是很有用的。為了減少濫用的可能性，這個管理員可以是一個[多方簽名](https://blog.logrocket.com/security-choices-multi-signature-wallets/)，這樣就需要多個人同意才能執行一項操作。在本文中，我們將擁有兩個管理功能：

1. 凍結和解凍帳戶。例如，當帳戶可能遭到入侵時，這會很有用。
2. 資產清理。

   有時詐騙者會將詐騙代幣發送到真實代幣的合約中以獲取合法性。例如，[請看這裡](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe?tab=holders)。合法的 ERC-20 合約是 [0x4200....0042](https://optimism.blockscout.com/token/0x4200000000000000000000000000000000000042)。而偽裝成它的詐騙合約則是 [0x234....bbe](https://optimism.blockscout.com/token/0x2348B1a1228DDCd2dB668c3d30207c3E1852fBbe)。

   人們也有可能不小心將合法的 ERC-20 代幣發送到我們的合約中，這也是我們希望有方法將它們取出的另一個原因。

歐本齊柏林提供了兩種機制來啟用管理存取權限：

- [`Ownable`](https://docs.openzeppelin.com/contracts/5.x/access-control#ownership-and-ownable) 合約擁有單一擁有者。帶有 `onlyOwner` [修飾符 (modifier)](https://www.tutorialspoint.com/solidity/solidity_function_modifiers.htm) 的函式只能由該擁有者呼叫。擁有者可以將所有權轉移給其他人，或完全放棄所有權。所有其他帳戶的權利通常是相同的。
- [`AccessControl`](https://docs.openzeppelin.com/contracts/5.x/access-control#role-based-access-control) 合約具有[基於角色的存取控制 (RBAC)](https://en.wikipedia.org/wiki/Role-based_access_control)。

為了簡單起見，在本文中我們使用 `Ownable`。

### 凍結和解凍合約 {#freezing-and-thawing-contracts}

凍結和解凍合約需要進行幾項更改：

- 一個從地址到[布林值](https://en.wikipedia.org/wiki/Boolean_data_type)的[映射 (mapping)](https://www.tutorialspoint.com/solidity/solidity_mappings.htm)，用來追蹤哪些地址被凍結。所有值最初都是零，對於布林值來說，這被解釋為 false。這正是我們想要的，因為預設情況下帳戶是不會被凍結的。

  ```solidity
      mapping(address => bool) public frozenAccounts;
  ```

- [事件](https://www.tutorialspoint.com/solidity/solidity_events.htm)，用於在帳戶被凍結或解凍時通知任何感興趣的人。從技術上講，這些操作不需要事件，但它有助於鏈下程式碼能夠監聽這些事件並了解正在發生的事情。當可能與其他人相關的事情發生時，智能合約發出事件被認為是一種良好的禮貌。

  這些事件被建立了索引，因此可以搜尋一個帳戶被凍結或解凍的所有時間點。

  ```solidity
    // 當帳戶被凍結或解凍時
    event AccountFrozen(address indexed _addr);
    event AccountThawed(address indexed _addr);
  ```

- 用於凍結和解凍帳戶的函式。這兩個函式幾乎完全相同，因此我們只會檢視凍結函式。

  ```solidity
      function freezeAccount(address addr)
        public
        onlyOwner
  ```

  標記為 [`public`](https://www.tutorialspoint.com/solidity/solidity_contracts.htm) 的函式可以從其他智能合約呼叫，或直接透過交易呼叫。

  ```solidity
    {
        require(!frozenAccounts[addr], "Account already frozen");
        frozenAccounts[addr] = true;
        emit AccountFrozen(addr);
    }  // freezeAccount
  ```

  如果帳戶已經被凍結，則回滾。否則，將其凍結並 `emit` 一個事件。

- 更改 `_beforeTokenTransfer` 以防止資金從被凍結的帳戶中移出。請注意，資金仍然可以轉帳到被凍結的帳戶中。

  ```solidity
       require(!frozenAccounts[from], "The account is frozen");
  ```

### 資產清理 {#asset-cleanup}

要釋放此合約持有的 ERC-20 代幣，我們需要呼叫它們所屬的代幣合約上的一個函式，即 [`transfer`](https://eips.ethereum.org/EIPS/eip-20#transfer) 或 [`approve`](https://eips.ethereum.org/EIPS/eip-20#approve)。在這種情況下，將燃料浪費在授權額度 (allowances) 上是沒有意義的，我們不如直接轉帳。

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

這是當我們收到地址時，為合約建立物件的語法。我們可以這樣做，因為我們將 ERC20 代幣的定義作為原始碼的一部分（見第 4 行），並且該檔案包含了[ IERC20 的定義](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/IERC20.sol)，也就是歐本齊柏林 ERC-20 合約的介面。

```solidity
        uint balance = token.balanceOf(address(this));
        token.transfer(dest, balance);
    }
```

這是一個清理函式，所以我們大概不想留下任何代幣。與其手動從使用者那裡獲取餘額，我們不如將這個過程自動化。

## 結論 {#conclusion}

這不是一個完美的解決方案——對於「使用者犯錯」的問題，沒有完美的解決方案。然而，使用這類檢查至少可以防止一些錯誤。凍結帳戶的能力雖然危險，但可以用來限制某些駭客攻擊的損害，藉由拒絕駭客存取被盜的資金。

[點擊這裡查看我更多的作品](https://cryptodocguy.pro/)。